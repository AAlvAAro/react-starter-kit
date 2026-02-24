# frozen_string_literal: true

class TelegramWebhooksController < ApplicationController
  skip_before_action :verify_authenticity_token
  skip_before_action :authenticate, if: -> { defined?(authenticate) }

  def create
    update = Telegram::Bot::Types::Update.new(params.permit!.to_h)
    message = update.message || update.edited_message

    if message
      TelegramBotService.new.process_message(message)
    end

    head :ok
  rescue StandardError => e
    Rails.logger.error("Telegram webhook error: #{e.message}")
    head :ok
  end
end
