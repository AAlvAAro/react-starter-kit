# frozen_string_literal: true

class TiktokProfileReadyMailer < ApplicationMailer
  def notify
    @tiktok_search = params[:tiktok_search]
    @user = @tiktok_search.user
    @tiktok_profile = @tiktok_search.tiktok_profile
    @username = @tiktok_profile.username

    mail(
      to: @user.email,
      subject: "✨ Tu análisis de TikTok @#{@username} está listo"
    )
  end
end
