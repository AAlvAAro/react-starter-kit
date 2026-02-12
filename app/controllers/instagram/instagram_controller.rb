# frozen_string_literal: true

module Instagram
  class InstagramController < InertiaController
    before_action :authenticate
    before_action :set_profile_search, only: [:show, :insights, :strategy, :chat]

    def index
      searches = Current.user.profile_searches.includes(:instagram_profile).recent.limit(20)
      render inertia: "instagram/index", props: {
        searches: searches.map { |s| { id: s.id, username: s.username, searched_at: s.searched_at } }
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

      instagram_profile = InstagramProfile.find_or_fetch(username)

      Current.user.profile_searches.create!(
        instagram_profile: instagram_profile,
        searched_at: Time.current
      )

      redirect_to instagram_profile_path(username: username)
    rescue Instagram::SearchApiService::ApiError => e
      redirect_to instagram_index_path, alert: e.message
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

      # If profile doesn't exist, try to fetch it
      if @instagram_profile.nil?
        @instagram_profile = InstagramProfile.find_or_fetch(username)
      end

      # Generate AI insights if stale or missing
      @instagram_profile.generate_all_insights! if @instagram_profile.insights_stale?

      @profile_search = Current.user.profile_searches.find_by(instagram_profile: @instagram_profile)
    rescue Instagram::SearchApiService::ApiError, OpenaiService::ApiError => e
      redirect_to instagram_index_path, alert: e.message
    end

    def profile_search_json
      {
        id: @instagram_profile.id,
        username: @instagram_profile.username,
        instagram_profile: {
          name: @instagram_profile.name,
          bio: @instagram_profile.bio,
          avatar: @instagram_profile.avatar,
          avatar_hd: @instagram_profile.avatar_hd,
          is_verified: @instagram_profile.is_verified,
          is_business: @instagram_profile.is_business,
          posts_count: @instagram_profile.posts_count,
          followers_count: @instagram_profile.followers_count,
          following_count: @instagram_profile.following_count,
          external_link: @instagram_profile.external_link,
          bio_links: @instagram_profile.bio_links
        },
        insights: @instagram_profile.insights_data,
        strategy: @instagram_profile.strategy_data&.dig("sections"),
        personas: @instagram_profile.personas_data&.dig("personas"),
        searched_at: @profile_search&.searched_at
      }
    end
  end
end
