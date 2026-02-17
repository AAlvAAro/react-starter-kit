# frozen_string_literal: true

module Instagram
  class InstagramController < InertiaController
    before_action :authenticate
    before_action :set_profile_search, only: [:show, :insights, :strategy, :chat]

    def index
      page = (params[:page] || 1).to_i
      per_page = 6
      query_filter = params[:q].to_s.strip.downcase.presence

      searches = Current.user.profile_searches.includes(:instagram_profile).recent

      if query_filter.present?
        searches = searches.joins(:instagram_profile).where(
          "LOWER(instagram_profiles.username) LIKE :q OR LOWER(instagram_profiles.name) LIKE :q",
          q: "%#{query_filter}%"
        )
      end

      total_count = searches.count
      total_pages = (total_count.to_f / per_page).ceil
      paginated_searches = searches.offset((page - 1) * per_page).limit(per_page)

      render inertia: "instagram/index", props: {
        searches: paginated_searches.map do |s|
          {
            id: s.id,
            username: s.username,
            searched_at: s.searched_at,
            name: s.instagram_profile&.name,
            avatar: proxy_image_url(s.instagram_profile&.avatar),
            is_business: s.instagram_profile&.is_business,
            status: s.status
          }
        end,
        filters: {
          q: query_filter
        },
        pagination: {
          current_page: page,
          total_pages: total_pages,
          total_count: total_count,
          per_page: per_page
        }
      }
    end

    def show
      render inertia: "instagram/show", props: {
        profile_search: profile_search_json,
        active_tab: "overview"
      }
    end

    def create
      username = params[:username].to_s.strip.downcase.delete_prefix("@")

      # Find or create the instagram profile record (basic info only)
      instagram_profile = InstagramProfile.find_or_initialize_by(username: username)
      instagram_profile.save! if instagram_profile.new_record?

      # Check if this is a new search (costs a credit) or revisiting an existing one
      profile_search = Current.user.profile_searches.find_by(
        instagram_profile: instagram_profile
      )

      if profile_search
        # Existing search - just update timestamp, no credit needed
        profile_search.update!(searched_at: Time.current)

        redirect_to instagram_profile_path(username: username)
      else
        # New search - requires a credit
        unless Current.user.has_credits?
          redirect_to pricing_path, alert: "No tienes créditos disponibles. Adquiere un plan para continuar."
          return
        end

        Current.user.use_credit!
        profile_search = Current.user.profile_searches.create!(
          instagram_profile: instagram_profile,
          searched_at: Time.current,
          status: "processing"
        )

        # Enqueue background job to fetch profile and generate both insight sets
        FetchInstagramProfileJob.perform_later(profile_search.id)

        redirect_to instagram_index_path,
                    notice: "¡Perfil en proceso! Te enviaremos un correo cuando el análisis de @#{username} esté listo."
      end
    rescue StandardError => e
      redirect_to instagram_index_path, alert: "Error al procesar la solicitud: #{e.message}"
    end

    def fetch_profile
      username = params[:username].to_s.strip.downcase.delete_prefix("@")

      instagram_profile = InstagramProfile.find_or_fetch(username)

      render json: {
        success: true,
        username: instagram_profile.username,
        name: instagram_profile.name,
        avatar: proxy_image_url(instagram_profile.avatar)
      }
    rescue Instagram::SearchApiService::ApiError => e
      render json: { success: false, error: e.message }, status: :unprocessable_entity
    end

    def insights
      render inertia: "instagram/show", props: {
        profile_search: profile_search_json,
        active_tab: "insights"
      }
    end

    def strategy
      render inertia: "instagram/show", props: {
        profile_search: profile_search_json,
        active_tab: "strategy"
      }
    end

    def chat
      persona_id = params[:persona_id]
      message = params[:message]
      messages_history = params[:messages] || []

      persona = @instagram_profile.personas_data&.dig("personas")&.find { |p| p["id"] == persona_id }

      unless persona
        return render json: { error: "Persona not found" }, status: :not_found
      end

      system_prompt = persona["systemPrompt"]

      openai_messages = [
        { role: "system", content: system_prompt }
      ]

      messages_history.each do |msg|
        openai_messages << { role: msg["role"], content: msg["content"] }
      end

      openai_messages << { role: "user", content: message }

      response = OpenaiService.new.chat(openai_messages, temperature: 0.9)

      render json: { response: response }
    rescue OpenaiService::ApiError => e
      render json: { error: e.message }, status: :unprocessable_entity
    end

    private

    def set_profile_search
      username = params[:username].to_s.downcase
      @instagram_profile = InstagramProfile.find_by(username: username)

      # If profile doesn't exist or is stale, fetch fresh data
      if @instagram_profile.nil? || @instagram_profile.stale?
        @instagram_profile = InstagramProfile.find_or_fetch(username)
      end

      @profile_search = Current.user.profile_searches.find_by(instagram_profile: @instagram_profile)

      # Generate both business and personal insights if missing
      @instagram_profile.generate_dual_insights!
    rescue Instagram::SearchApiService::ApiError, OpenaiService::ApiError => e
      redirect_to instagram_index_path, alert: e.message
    end

    def profile_search_json
      dual = @instagram_profile.dual_insights

      {
        id: @instagram_profile.id,
        username: @instagram_profile.username,
        instagram_profile: {
          name: @instagram_profile.name,
          bio: @instagram_profile.bio,
          avatar: proxy_image_url(@instagram_profile.avatar),
          avatar_hd: proxy_image_url(@instagram_profile.avatar_hd),
          is_verified: @instagram_profile.is_verified,
          is_business: @instagram_profile.is_business,
          posts_count: @instagram_profile.posts_count,
          followers_count: @instagram_profile.followers_count,
          following_count: @instagram_profile.following_count,
          external_link: @instagram_profile.external_link,
          bio_links: @instagram_profile.bio_links
        },
        business: {
          insights: dual[:business][:insights],
          strategy: dual[:business][:strategy],
          message_templates: dual[:business][:message_templates]
        },
        personal: {
          insights: dual[:personal][:insights],
          strategy: dual[:personal][:strategy],
          message_templates: dual[:personal][:message_templates]
        },
        searched_at: @profile_search&.searched_at
      }
    end

    def proxy_image_url(url)
      return nil if url.blank?
      "/images/proxy?url=#{CGI.escape(url)}"
    end
  end
end
