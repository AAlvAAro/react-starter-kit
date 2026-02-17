# frozen_string_literal: true

module Tiktok
  class TiktokController < InertiaController
    before_action :authenticate
    before_action :set_tiktok_search, only: [:show, :insights, :strategy]

    def index
      page = (params[:page] || 1).to_i
      per_page = 6
      query_filter = params[:q].to_s.strip.downcase.presence

      searches = Current.user.tiktok_searches.includes(:tiktok_profile).recent

      if query_filter.present?
        searches = searches.joins(:tiktok_profile).where(
          "LOWER(tiktok_profiles.username) LIKE :q OR LOWER(tiktok_profiles.name) LIKE :q",
          q: "%#{query_filter}%"
        )
      end

      total_count = searches.count
      total_pages = (total_count.to_f / per_page).ceil
      paginated_searches = searches.offset((page - 1) * per_page).limit(per_page)

      render inertia: "tiktok/index", props: {
        searches: paginated_searches.map do |s|
          {
            id: s.id,
            username: s.username,
            searched_at: s.searched_at,
            name: s.tiktok_profile&.name,
            avatar: proxy_image_url(s.tiktok_profile&.avatar),
            is_business: s.tiktok_profile&.is_business,
            is_verified: s.tiktok_profile&.is_verified,
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
      render inertia: "tiktok/show", props: {
        profile_search: profile_search_json,
        active_tab: "overview"
      }
    end

    def create
      username = params[:username].to_s.strip.downcase.delete_prefix("@")

      # Find or create the tiktok profile record (basic info only)
      tiktok_profile = TiktokProfile.find_or_initialize_by(username: username)
      tiktok_profile.save! if tiktok_profile.new_record?

      # Check if this is a new search (costs a credit) or revisiting an existing one
      tiktok_search = Current.user.tiktok_searches.find_by(
        tiktok_profile: tiktok_profile
      )

      if tiktok_search
        # Existing search - just update timestamp, no credit needed
        tiktok_search.update!(searched_at: Time.current)

        redirect_to tiktok_profile_path(username: username)
      else
        # New search - requires a credit
        unless Current.user.has_credits?
          redirect_to pricing_path, alert: "No tienes créditos disponibles. Adquiere un plan para continuar."
          return
        end

        Current.user.use_credit!
        tiktok_search = Current.user.tiktok_searches.create!(
          tiktok_profile: tiktok_profile,
          searched_at: Time.current,
          status: "processing"
        )

        # Enqueue background job to fetch profile and generate both insight sets
        FetchTiktokProfileJob.perform_later(tiktok_search.id)

        redirect_to tiktok_index_path,
                    notice: "¡Perfil en proceso! Te enviaremos un correo cuando el análisis de @#{username} esté listo."
      end
    rescue StandardError => e
      redirect_to tiktok_index_path, alert: "Error al procesar la solicitud: #{e.message}"
    end

    def fetch_profile
      username = params[:username].to_s.strip.downcase.delete_prefix("@")

      tiktok_profile = TiktokProfile.find_or_fetch(username)

      render json: {
        success: true,
        username: tiktok_profile.username,
        name: tiktok_profile.name,
        avatar: proxy_image_url(tiktok_profile.avatar)
      }
    rescue Tiktok::SearchApiService::ApiError => e
      render json: { success: false, error: e.message }, status: :unprocessable_entity
    end

    def insights
      render inertia: "tiktok/show", props: {
        profile_search: profile_search_json,
        active_tab: "insights"
      }
    end

    def strategy
      render inertia: "tiktok/show", props: {
        profile_search: profile_search_json,
        active_tab: "strategy"
      }
    end

    private

    def set_tiktok_search
      username = params[:username].to_s.downcase
      @tiktok_profile = TiktokProfile.find_by(username: username)

      # If profile doesn't exist or is stale, fetch fresh data
      if @tiktok_profile.nil? || @tiktok_profile.stale?
        @tiktok_profile = TiktokProfile.find_or_fetch(username)
      end

      @tiktok_search = Current.user.tiktok_searches.find_by(tiktok_profile: @tiktok_profile)

      # Generate both business and personal insights if missing
      @tiktok_profile.generate_dual_insights!
    rescue Tiktok::SearchApiService::ApiError, OpenaiService::ApiError => e
      redirect_to tiktok_index_path, alert: e.message
    end

    def profile_search_json
      dual = @tiktok_profile.dual_insights

      {
        id: @tiktok_profile.id,
        username: @tiktok_profile.username,
        tiktok_profile: {
          name: @tiktok_profile.name,
          bio: @tiktok_profile.bio,
          avatar: proxy_image_url(@tiktok_profile.avatar),
          avatar_hd: proxy_image_url(@tiktok_profile.avatar_hd),
          is_verified: @tiktok_profile.is_verified,
          is_private: @tiktok_profile.is_private,
          is_business: @tiktok_profile.is_business,
          posts_count: @tiktok_profile.posts_count,
          followers_count: @tiktok_profile.followers_count,
          following_count: @tiktok_profile.following_count,
          hearts_count: @tiktok_profile.hearts_count,
          bio_link: @tiktok_profile.bio_link,
          language: @tiktok_profile.language
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
        searched_at: @tiktok_search&.searched_at
      }
    end

    def proxy_image_url(url)
      return nil if url.blank?
      "/images/proxy?url=#{CGI.escape(url)}"
    end
  end
end
