# frozen_string_literal: true

module AuthenticationHelpers
  extend ActiveSupport::Concern

  def sign_in(user)
    session = user.sessions.create!
    post sign_in_url, params: { email: user.email, password: user.password || "Secret1*3*5*" }
  end

  def sign_in_as(user)
    session = user.sessions.create!

    request = ActionDispatch::Request.new(Rails.application.env_config)
    cookies = request.cookie_jar
    cookies.signed.permanent[:session_token] = {value: session.id, httponly: true}
  end

  def sign_out(user = nil)
    if user
      user.sessions.destroy_all
    end
  end
end
