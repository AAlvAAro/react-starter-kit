# frozen_string_literal: true

module Instagram
  class InstagramController < InertiaController
    before_action :authenticate
    before_action :set_profile_search, only: [:show, :insights, :strategy, :chat]

    def index
      searches = Current.user.profile_searches.includes(:instagram_profile).recent.limit(20)
      render inertia: "instagram/index", props: {
        searches: searches.map do |s|
          {
            id: s.id,
            username: s.username,
            searched_at: s.searched_at,
            name: s.instagram_profile&.name,
            avatar: proxy_image_url(s.instagram_profile&.avatar)
          }
        end
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
      purpose = params[:purpose].to_s.presence || "business"

      instagram_profile = InstagramProfile.find_or_fetch(username)

      # Find or create the user's search record for this profile + purpose combination
      profile_search = Current.user.profile_searches.find_or_initialize_by(
        instagram_profile: instagram_profile,
        purpose: purpose
      )
      profile_search.update!(searched_at: Time.current)

      redirect_to instagram_profile_path(username: username)
    rescue Instagram::SearchApiService::ApiError => e
      redirect_to instagram_index_path, alert: e.message
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
      @purpose = @profile_search&.purpose || "business"

      # Generate AI insights if missing for this purpose
      @instagram_profile.generate_all_insights!(purpose: @purpose) if @instagram_profile.insights_stale?(purpose: @purpose)
    rescue Instagram::SearchApiService::ApiError, OpenaiService::ApiError => e
      redirect_to instagram_index_path, alert: e.message
    end

    def profile_search_json
      purpose_insights = @instagram_profile.insights_for(@purpose)

      {
        id: @instagram_profile.id,
        username: @instagram_profile.username,
        purpose: @purpose,
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
        insights: purpose_insights[:insights],
        strategy: purpose_insights[:strategy],
        message_templates: purpose_insights[:message_templates],
        searched_at: @profile_search&.searched_at
      }
    end

    def proxy_image_url(url)
      return nil if url.blank?
      "/images/proxy?url=#{CGI.escape(url)}"
    end
  end
end
