# frozen_string_literal: true

module Instagram
  class MessageTemplatesGenerator
    LOCALE_NAMES = {
      en: "English",
      "es-MX": "Spanish (Mexico)",
      pt: "Portuguese",
      ja: "Japanese",
      zh: "Chinese",
      it: "Italian",
      fr: "French",
      ar: "Arabic",
      hi: "Hindi"
    }.freeze

    SYSTEM_PROMPT = <<~PROMPT
      You are an expert at crafting personalized direct messages and opening lines for professional networking. Generate message templates to help someone reach out to an Instagram user.

      **IMPORTANT: Respond entirely in %{language}. All text values in the JSON must be in %{language}.**

      Always respond with valid JSON matching this exact structure:
      {
        "templates": [
          {
            "id": "casual",
            "category": "Casual Introduction",
            "icon": "MessageSquare",
            "messages": [
              {
                "title": "Brief title for this message",
                "content": "The actual message text...",
                "context": "When to use this message"
              }
            ]
          },
          {
            "id": "professional",
            "category": "Professional Outreach",
            "icon": "Briefcase",
            "messages": [
              {
                "title": "Brief title for this message",
                "content": "The actual message text...",
                "context": "When to use this message"
              }
            ]
          },
          {
            "id": "collaboration",
            "category": "Collaboration Request",
            "icon": "Handshake",
            "messages": [
              {
                "title": "Brief title for this message",
                "content": "The actual message text...",
                "context": "When to use this message"
              }
            ]
          },
          {
            "id": "followup",
            "category": "Follow-up Messages",
            "icon": "Mail",
            "messages": [
              {
                "title": "Brief title for this message",
                "content": "The actual message text...",
                "context": "When to use this message"
              }
            ]
          }
        ]
      }

      Guidelines:
      - Create 2-3 messages per category
      - Messages should be personalized based on their profile, interests, and content
      - Keep messages concise (2-4 sentences max)
      - Be authentic and avoid generic templates
      - Reference specific details from their posts or bio when possible
      - Match their communication style and tone
      - Available icons: MessageSquare, Briefcase, Handshake, Mail
    PROMPT

    def initialize(instagram_profile, locale: I18n.locale, purpose: "business")
      @profile = instagram_profile
      @locale = locale
      @purpose = purpose
    end

    def generate
      existing_data = @profile.send(data_column)
      return existing_data if existing_data.present?

      templates = openai.chat_json(messages)
      @profile.update!(data_column => templates)
      templates
    rescue OpenaiService::ApiError => e
      Rails.logger.error("Failed to generate message templates: #{e.message}")
      nil
    end

    private

    def data_column
      "#{@purpose}_templates_data"
    end

    def openai
      @openai ||= OpenaiService.new
    end

    def language_name
      LOCALE_NAMES[@locale.to_sym] || LOCALE_NAMES[@locale.to_s.to_sym] || "English"
    end

    def system_prompt_with_locale
      SYSTEM_PROMPT % { language: language_name }
    end

    def messages
      [
        { role: "system", content: system_prompt_with_locale },
        { role: "user", content: user_prompt }
      ]
    end

    def user_prompt
      insights_summary = build_insights_summary
      posts_summary = build_posts_summary

      <<~PROMPT
        Generate personalized DM templates for reaching out to this Instagram user:

        **Profile:**
        - Username: @#{@profile.username}
        - Name: #{@profile.name}
        - Bio: #{@profile.bio}
        - Followers: #{@profile.followers_count}
        - Verified: #{@profile.is_verified}
        - Business Account: #{@profile.is_business}

        **Personality Insights:**
        #{insights_summary}

        **Recent Posts:**
        #{posts_summary}

        Create authentic, personalized message templates that reference their specific interests and content.
      PROMPT
    end

    def build_insights_summary
      insights = @profile.insights_data
      return "No insights available" if insights.blank?

      parts = []
      parts << "Tone: #{insights.dig('tone', 'value')}" if insights.dig("tone", "value")
      parts << "Topics: #{insights.dig('topics', 'items')&.join(', ')}" if insights.dig("topics", "items")
      parts << "Interests: #{insights.dig('interests', 'items')&.join(', ')}" if insights.dig("interests", "items")
      parts << "Posture: #{insights.dig('posture', 'value')}" if insights.dig("posture", "value")

      parts.join("\n")
    end

    def build_posts_summary
      posts = @profile.posts_data || []
      return "No posts available" if posts.empty?

      posts.first(5).map.with_index do |post, i|
        caption = post["caption"] || "No caption"
        "#{i + 1}. #{caption.truncate(150)}"
      end.join("\n")
    end
  end
end
