# frozen_string_literal: true

require "net/http"
require "uri"
require "json"

module Instagram
  class SearchApiService
    class ApiError < StandardError; end

    BASE_URL = "https://www.searchapi.io/api/v1/search"

    def self.fetch_profile(username)
      new(username).fetch_profile
    end

    def initialize(username)
      @username = username
    end

    def fetch_profile
      uri = URI.parse(BASE_URL)
      uri.query = URI.encode_www_form(params)

      response = Net::HTTP.get_response(uri)

      unless response.is_a?(Net::HTTPSuccess)
        raise ApiError, "SearchAPI request failed: #{response.code} #{response.message}"
      end

      JSON.parse(response.body)
    rescue JSON::ParserError => e
      raise ApiError, "Failed to parse SearchAPI response: #{e.message}"
    rescue StandardError => e
      raise ApiError, "SearchAPI request error: #{e.message}"
    end

    private

    def params
      {
        engine: "instagram_profile",
        username: @username,
        api_key: api_key
      }
    end

    def api_key
      Rails.application.credentials.dig(:searchapi, :api_key) ||
        ENV.fetch("SEARCHAPI_API_KEY", nil) ||
        raise(ApiError, "SearchAPI API key not configured")
    end
  end
end
