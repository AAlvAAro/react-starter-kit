# frozen_string_literal: true

class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  before_action :set_current_request_details
  before_action :set_locale
  before_action :authenticate

  private

  def authenticate
    redirect_to sign_in_path unless perform_authentication
  end

  def require_no_authentication
    return unless perform_authentication

    flash[:notice] = "You are already signed in"
    redirect_to root_path
  end

  def perform_authentication
    Current.session ||= Session.find_by_id(cookies.signed[:session_token])
  end

  def set_current_request_details
    Current.user_agent = request.user_agent
    Current.ip_address = request.ip
  end

  def set_locale
    I18n.locale = extract_locale || I18n.default_locale
  end

  def extract_locale
    # 1. Check user preference (if logged in) - highest priority
    locale_from_user ||
      # 2. Check URL parameter (for temporary overrides)
      locale_from_params ||
      # 3. Check Accept-Language header
      locale_from_header
  end

  def locale_from_params
    locale = params[:locale]
    return unless locale.present?
    return unless I18n.available_locales.map(&:to_s).include?(locale.to_s)

    locale
  end

  def locale_from_user
    return unless Current.user

    locale = Current.user.locale
    return unless locale.present?
    return unless I18n.available_locales.map(&:to_s).include?(locale.to_s)

    locale
  end

  def locale_from_header
    return unless request.env["HTTP_ACCEPT_LANGUAGE"]

    header = request.env["HTTP_ACCEPT_LANGUAGE"]
    locales = header.scan(/[a-z]{2}(-[A-Z]{2})?/).map { |match| match[0] }

    locales.find { |locale| I18n.available_locales.map(&:to_s).include?(locale) }
  end

  def default_url_options
    {locale: I18n.locale}
  end
end
