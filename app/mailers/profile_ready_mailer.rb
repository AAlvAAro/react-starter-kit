# frozen_string_literal: true

class ProfileReadyMailer < ApplicationMailer
  def notify
    @profile_search = params[:profile_search]
    @user = @profile_search.user
    @instagram_profile = @profile_search.instagram_profile
    @username = @instagram_profile.username

    mail(
      to: @user.email,
      subject: "✨ Tu análisis de @#{@username} está listo"
    )
  end
end
