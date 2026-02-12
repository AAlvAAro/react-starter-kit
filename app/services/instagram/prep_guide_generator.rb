# frozen_string_literal: true

module Instagram
  class PrepGuideGenerator
    SYSTEM_PROMPT = <<~PROMPT
      You are an expert conversation coach and social skills trainer. Generate a prep guide to help someone have a great conversation with an Instagram user.

      Always respond with valid JSON matching this exact structure:
      {
        "sections": [
          {
            "id": "icebreakers",
            "question": "What are good icebreakers?",
            "answer": "Detailed advice...",
            "icon": "MessageSquare"
          },
          {
            "id": "avoid",
            "question": "What should I avoid talking about?",
            "answer": "Detailed advice...",
            "icon": "ShieldAlert"
          },
          {
            "id": "topics",
            "question": "What topics should I bring up?",
            "answer": "Detailed advice...",
            "icon": "Handshake"
          },
          {
            "id": "common",
            "question": "What do we have in common?",
            "answer": "Detailed advice...",
            "icon": "Briefcase"
          },
          {
            "id": "contact",
            "question": "How should I reach out?",
            "answer": "Detailed advice...",
            "icon": "Mail"
          },
          {
            "id": "impression",
            "question": "How to make a great first impression?",
            "answer": "Detailed advice...",
            "icon": "Presentation"
          },
          {
            "id": "followup",
            "question": "How to follow up after meeting?",
            "answer": "Detailed advice...",
            "icon": "Scale"
          }
        ]
      }

      Guidelines:
      - Be specific and reference actual content from their profile/posts
      - Give actionable, practical advice
      - Keep answers 2-4 sentences each
      - Be warm and encouraging in tone
      - Available icons: MessageSquare, ShieldAlert, Handshake, Briefcase, Mail, Presentation, Scale
    PROMPT

    def initialize(instagram_profile)
      @profile = instagram_profile
    end

    def generate
      return @profile.strategy_data if @profile.strategy_data.present? && !stale?

      strategy = openai.chat_json(messages)
      @profile.update!(strategy_data: strategy)
      strategy
    rescue OpenaiService::ApiError => e
      Rails.logger.error("Failed to generate prep guide: #{e.message}")
      nil
    end

    def regenerate
      strategy = openai.chat_json(messages)
      @profile.update!(strategy_data: strategy)
      strategy
    end

    private

    def stale?
      @profile.insights_generated_at.nil? || @profile.insights_generated_at < 24.hours.ago
    end

    def openai
      @openai ||= OpenaiService.new
    end

    def messages
      [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: user_prompt }
      ]
    end

    def user_prompt
      insights_summary = build_insights_summary
      posts_summary = build_posts_summary

      <<~PROMPT
        Generate a conversation prep guide for someone who wants to connect with this Instagram user:

        **Profile:**
        - Username: @#{@profile.username}
        - Name: #{@profile.name}
        - Bio: #{@profile.bio}
        - Followers: #{@profile.followers_count}
        - Verified: #{@profile.is_verified}

        **Insights about this person:**
        #{insights_summary}

        **Recent Posts:**
        #{posts_summary}

        Generate practical, specific advice for having a great conversation with this person.
      PROMPT
    end

    def build_insights_summary
      insights = @profile.insights_data
      return "No insights available yet" if insights.blank?

      parts = []
      parts << "Tone: #{insights.dig('tone', 'value')}" if insights.dig("tone", "value")
      parts << "Topics: #{insights.dig('topics', 'items')&.join(', ')}" if insights.dig("topics", "items")
      parts << "Interests: #{insights.dig('interests', 'items')&.join(', ')}" if insights.dig("interests", "items")
      parts << "Posture: #{insights.dig('posture', 'value')}" if insights.dig("posture", "value")

      if insights.dig("flags", "items")
        flags = insights.dig("flags", "items").map { |f| "- #{f['text']} (#{f['type']})" }
        parts << "Flags:\n#{flags.join("\n")}"
      end

      parts.join("\n\n")
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
