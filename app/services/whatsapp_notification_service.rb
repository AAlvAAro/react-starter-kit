# frozen_string_literal: true

class WhatsappNotificationService
  def initialize(user)
    @user = user
    @client = Twilio::REST::Client.new(
      Rails.application.credentials.dig(:twilio, :account_sid),
      Rails.application.credentials.dig(:twilio, :auth_token)
    )
    @from_number = Rails.application.credentials.dig(:twilio, :whatsapp_number)
  end

  def profile_ready(profile_search)
    return unless @user.phone.present? && @from_number.present?

    username = profile_search.instagram_profile.username
    url = Rails.application.routes.url_helpers.instagram_profile_url(
      username: username,
      host: Rails.application.credentials.dig(:app, :host) || "localhost:3000"
    )

    message = <<~MSG
      ✨ *MeetIQ* - Tu análisis está listo

      Hola #{@user.name}! El análisis del perfil @#{username} ya está disponible.

      📊 Incluye:
      • Análisis de personalidad
      • Guía de preparación
      • Plantillas de mensajes

      👉 Ver análisis: #{url}
    MSG

    send_whatsapp(message)
  rescue StandardError => e
    Rails.logger.error("WhatsApp notification failed: #{e.message}")
  end

  private

  def send_whatsapp(body)
    @client.messages.create(
      from: "whatsapp:#{@from_number}",
      to: "whatsapp:#{@user.phone}",
      body: body
    )
  end
end
