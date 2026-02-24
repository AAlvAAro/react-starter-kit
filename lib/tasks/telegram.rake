# frozen_string_literal: true

namespace :telegram do
  desc "Start the Telegram bot in long-polling mode (for development)"
  task bot: :environment do
    token = TELEGRAM_BOT_TOKEN

    if token.blank?
      puts "ERROR: TELEGRAM_BOT_TOKEN is not set."
      puts "Set it in your .env file or environment variables."
      exit 1
    end

    puts "Starting Telegram bot in polling mode..."
    puts "Press Ctrl+C to stop."

    service = TelegramBotService.new

    Telegram::Bot::Client.run(token) do |bot|
      bot.listen do |message|
        service.process_message(message)
      end
    end
  end

  desc "Set the Telegram webhook URL"
  task :set_webhook, [:url] => :environment do |_t, args|
    token = TELEGRAM_BOT_TOKEN

    if token.blank?
      puts "ERROR: TELEGRAM_BOT_TOKEN is not set."
      exit 1
    end

    url = args[:url]
    if url.blank?
      puts "Usage: rake telegram:set_webhook[https://yourdomain.com/telegram/webhook]"
      exit 1
    end

    api = Telegram::Bot::Api.new(token)
    result = api.set_webhook(url: url)
    puts "Webhook set to: #{url}"
    puts "Result: #{result}"
  end

  desc "Remove the Telegram webhook"
  task remove_webhook: :environment do
    token = TELEGRAM_BOT_TOKEN

    if token.blank?
      puts "ERROR: TELEGRAM_BOT_TOKEN is not set."
      exit 1
    end

    api = Telegram::Bot::Api.new(token)
    result = api.delete_webhook
    puts "Webhook removed."
    puts "Result: #{result}"
  end

  desc "Get current webhook info"
  task webhook_info: :environment do
    token = TELEGRAM_BOT_TOKEN

    if token.blank?
      puts "ERROR: TELEGRAM_BOT_TOKEN is not set."
      exit 1
    end

    api = Telegram::Bot::Api.new(token)
    result = api.get_webhook_info
    puts "Webhook info:"
    puts "  URL: #{result.url}"
    puts "  Pending updates: #{result.pending_update_count}"
    puts "  Last error: #{result.last_error_message}"
  end
end
