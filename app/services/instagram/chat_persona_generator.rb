# frozen_string_literal: true

module Instagram
  class ChatPersonaGenerator
    SYSTEM_PROMPT = <<~PROMPT
      You are an expert at creating realistic conversation personas for roleplay practice. Generate 3 chat personas based on an Instagram user's profile and personality.

      Always respond with valid JSON matching this exact structure:
      {
        "personas": [
          {
            "id": "friendly",
            "name": "Warm & Open",
            "description": "Brief description of this mood/state",
            "color": "success",
            "systemPrompt": "You are [Name]. [Detailed instructions for how to respond in this persona...]"
          },
          {
            "id": "tough",
            "name": "Reserved & Cautious",
            "description": "Brief description of this mood/state",
            "color": "warning",
            "systemPrompt": "You are [Name]. [Detailed instructions for how to respond in this persona...]"
          },
          {
            "id": "irrational",
            "name": "Distracted & Busy",
            "description": "Brief description of this mood/state",
            "color": "destructive",
            "systemPrompt": "You are [Name]. [Detailed instructions for how to respond in this persona...]"
          }
        ]
      }

      Guidelines for system prompts:
      - Use the person's actual name and personality traits
      - Include specific details from their profile/interests
      - Describe how they communicate in this mood
      - Include 2-3 example phrases they might use
      - Make it realistic and nuanced
      - Keep system prompts 3-5 sentences

      Colors: "success" for positive, "warning" for neutral/cautious, "destructive" for difficult
    PROMPT

    def initialize(instagram_profile)
      @profile = instagram_profile
    end

    def generate
      return @profile.personas_data if @profile.personas_data.present? && !stale?

      personas = openai.chat_json(messages)
      @profile.update!(personas_data: personas)
      personas
    rescue OpenaiService::ApiError => e
      Rails.logger.error("Failed to generate personas: #{e.message}")
      nil
    end

    def regenerate
      personas = openai.chat_json(messages)
      @profile.update!(personas_data: personas)
      personas
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

      <<~PROMPT
        Generate 3 chat personas for practicing conversations with this Instagram user:

        **Profile:**
        - Username: @#{@profile.username}
        - Name: #{@profile.name || @profile.username}
        - Bio: #{@profile.bio}

        **Personality Insights:**
        #{insights_summary}

        Create realistic personas that capture how this specific person might act in different moods:
        1. Warm & Open - They're in a great mood and happy to chat
        2. Reserved & Cautious - They're a bit guarded and need to warm up
        3. Distracted & Busy - They're preoccupied and hard to engage

        Make the system prompts specific to this person's actual personality and interests.
      PROMPT
    end

    def build_insights_summary
      insights = @profile.insights_data
      return "No insights available" if insights.blank?

      parts = []
      parts << "Tone: #{insights.dig('tone', 'value')}" if insights.dig("tone", "value")

      if insights.dig("personality", "traits")
        traits = insights.dig("personality", "traits").map { |t| "#{t['trait']}: #{t['score']}" }
        parts << "Personality: #{traits.join(', ')}"
      end

      parts << "Interests: #{insights.dig('interests', 'items')&.join(', ')}" if insights.dig("interests", "items")
      parts << "Posture: #{insights.dig('posture', 'value')}" if insights.dig("posture", "value")

      parts.join("\n")
    end
  end
end
