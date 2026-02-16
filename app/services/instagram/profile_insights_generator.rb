# frozen_string_literal: true

module Instagram
  class ProfileInsightsGenerator
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
      You are an expert social media analyst and psychologist. Analyze Instagram profiles to generate detailed insights about a person's communication style, interests, and personality.

      **IMPORTANT: Respond entirely in %{language}. All text values in the JSON must be in %{language}.**

      Always respond with valid JSON matching this exact structure:
      {
        "tone": {
          "label": "Tone & Voice",
          "value": "Description of their communication style",
          "score": 85
        },
        "topics": {
          "label": "Topics of Interest",
          "items": ["Topic1", "Topic2", "Topic3"]
        },
        "words": {
          "label": "Most Used Words",
          "items": [
            {"word": "example", "count": 50},
            {"word": "another", "count": 40}
          ]
        },
        "personality": {
          "label": "Personality",
          "traits": [
            {"trait": "Openness", "score": 80},
            {"trait": "Conscientiousness", "score": 70},
            {"trait": "Extraversion", "score": 65},
            {"trait": "Agreeableness", "score": 75},
            {"trait": "Emotional Stability", "score": 72}
          ]
        },
        "posture": {
          "label": "Thoughts & Posture",
          "value": "Description of their values and worldview"
        },
        "interests": {
          "label": "Interests",
          "items": ["Interest1", "Interest2", "Interest3"]
        },
        "flags": {
          "label": "Flags",
          "items": [
            {"text": "Warning or positive observation", "type": "warning"},
            {"text": "Another observation", "type": "success"}
          ]
        }
      }

      Guidelines:
      - Tone score is confidence level (0-100)
      - Personality traits use Big Five model with scores 0-100
      - Include 5-8 topics and interests
      - Include 6-10 most used words with realistic counts
      - Include 3-5 flags (mix of warnings and positive signals)
      - Be specific and actionable in your analysis
      - Base everything on the actual content provided
    PROMPT

    def initialize(instagram_profile, locale: I18n.locale, purpose: "business")
      @profile = instagram_profile
      @locale = locale
      @purpose = purpose
    end

    def generate
      existing_data = @profile.send(data_column)
      return existing_data if existing_data.present?

      insights = openai.chat_json(messages)
      @profile.update!(data_column => insights)
      insights
    rescue OpenaiService::ApiError => e
      Rails.logger.error("Failed to generate insights: #{e.message}")
      nil
    end

    private

    def data_column
      "#{@purpose}_insights_data"
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
      posts_summary = build_posts_summary

      <<~PROMPT
        Analyze this Instagram profile and generate insights:

        **Profile:**
        - Username: @#{@profile.username}
        - Name: #{@profile.name}
        - Bio: #{@profile.bio}
        - Followers: #{@profile.followers_count}
        - Following: #{@profile.following_count}
        - Posts: #{@profile.posts_count}
        - Verified: #{@profile.is_verified}
        - Business Account: #{@profile.is_business}
        - External Link: #{@profile.external_link}

        **Recent Posts:**
        #{posts_summary}

        Generate comprehensive insights about this person's communication style, interests, and personality.
      PROMPT
    end

    def build_posts_summary
      posts = @profile.posts_data || []
      return "No posts available" if posts.empty?

      posts.first(10).map.with_index do |post, i|
        caption = post["caption"] || "No caption"
        likes = post["likes"] || 0
        comments = post["comments"] || 0
        tagged = (post["tagged_users"] || []).map { |u| "@#{u['username']}" }.join(", ")

        "#{i + 1}. #{caption.truncate(200)} (#{likes} likes, #{comments} comments#{tagged.present? ? ", tagged: #{tagged}" : ""})"
      end.join("\n")
    end
  end
end
