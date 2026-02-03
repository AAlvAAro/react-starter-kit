# frozen_string_literal: true

class Settings::ProfilesController < InertiaController
  before_action :authenticate
  before_action :set_user

  def show
  end

  def update
    locale_changed = user_params[:locale].present? && @user.locale != user_params[:locale]

    if @user.update(user_params)
      if locale_changed
        # Force full page reload by using regular redirect (not Inertia)
        redirect_to settings_profile_path, notice: I18n.t("flash.profile_updated"), allow_other_host: false
      else
        # Use Inertia redirect for smooth SPA experience
        redirect_to settings_profile_path, notice: I18n.t("flash.profile_updated")
      end
    else
      redirect_to settings_profile_path, inertia: {errors: @user.errors}
    end
  end

  private

  def set_user
    @user = Current.user
  end

  def user_params
    params.permit(:name, :locale)
  end
end
