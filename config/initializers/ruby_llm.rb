# frozen_string_literal: true

RubyLLM.configure do |config|
  config.openai_api_key = Rails.application.credentials.dig(:openai, :api_key) ||
                          ENV.fetch("OPENAI_API_KEY", nil)
end
