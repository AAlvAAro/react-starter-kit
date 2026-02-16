# frozen_string_literal: true

class OpenaiService
  class ApiError < StandardError; end

  DEFAULT_MODEL = "gpt-4-turbo"

  def initialize(model: DEFAULT_MODEL)
    @model = model
  end

  def chat(messages, temperature: 0.7)
    chat_instance = RubyLLM.chat(model: @model)

    # Set system message if present
    system_msg = messages.find { |m| m[:role] == "system" || m["role"] == "system" }
    if system_msg
      chat_instance.with_instructions(system_msg[:content] || system_msg["content"])
    end

    # Add conversation history (excluding system messages)
    user_messages = messages.reject { |m| (m[:role] || m["role"]) == "system" }

    # Get the last user message to ask
    last_message = user_messages.last
    return nil unless last_message

    # Add previous messages to history
    user_messages[0...-1].each do |msg|
      role = msg[:role] || msg["role"]
      content = msg[:content] || msg["content"]
      chat_instance.ask(content) if role == "user"
    end

    # Ask the final question
    response = chat_instance.ask(last_message[:content] || last_message["content"])
    response.content
  rescue RubyLLM::Error => e
    raise ApiError, "RubyLLM request error: #{e.message}"
  rescue StandardError => e
    raise ApiError, "LLM request error: #{e.message}"
  end

  def chat_json(messages, temperature: 0.7)
    response = chat(messages, temperature: temperature)
    clean_json = extract_json(response)
    JSON.parse(clean_json)
  rescue JSON::ParserError => e
    Rails.logger.error("JSON parse error. Raw response: #{response}")
    raise ApiError, "Failed to parse JSON response: #{e.message}"
  end

  private

  def extract_json(response)
    return response if response.nil?

    # Remove markdown code blocks if present
    cleaned = response.strip
    cleaned = cleaned.gsub(/\A```(?:json)?\s*\n?/, "")
    cleaned = cleaned.gsub(/\n?```\s*\z/, "")
    cleaned.strip
  end
end
