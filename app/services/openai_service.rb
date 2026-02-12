# frozen_string_literal: true

require "net/http"
require "uri"
require "json"

class OpenaiService
  class ApiError < StandardError; end

  BASE_URL = "https://api.openai.com/v1/chat/completions"
  DEFAULT_MODEL = "gpt-4o-mini"

  def initialize(model: DEFAULT_MODEL)
    @model = model
  end

  def chat(messages, response_format: nil, temperature: 0.7)
    uri = URI.parse(BASE_URL)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http.read_timeout = 120

    request = Net::HTTP::Post.new(uri.path)
    request["Content-Type"] = "application/json"
    request["Authorization"] = "Bearer #{api_key}"

    body = {
      model: @model,
      messages: messages,
      temperature: temperature
    }

    body[:response_format] = response_format if response_format

    request.body = body.to_json

    response = http.request(request)

    unless response.is_a?(Net::HTTPSuccess)
      raise ApiError, "OpenAI request failed: #{response.code} #{response.body}"
    end

    result = JSON.parse(response.body)
    result.dig("choices", 0, "message", "content")
  rescue JSON::ParserError => e
    raise ApiError, "Failed to parse OpenAI response: #{e.message}"
  rescue StandardError => e
    raise ApiError, "OpenAI request error: #{e.message}"
  end

  def chat_json(messages, temperature: 0.7)
    response = chat(messages, response_format: { type: "json_object" }, temperature: temperature)
    JSON.parse(response)
  rescue JSON::ParserError => e
    raise ApiError, "Failed to parse JSON response: #{e.message}"
  end

  private

  def api_key
    Rails.application.credentials.dig(:openai, :api_key) ||
      ENV.fetch("OPENAI_API_KEY", nil) ||
      raise(ApiError, "OpenAI API key not configured")
  end
end
