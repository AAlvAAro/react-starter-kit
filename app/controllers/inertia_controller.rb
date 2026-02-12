# frozen_string_literal: true

class InertiaController < ApplicationController
  inertia_config default_render: true
  inertia_share auth: {
        user: -> { Current.user.as_json(only: %i[id name email verified role locale created_at updated_at]) },
        session: -> { Current.session.as_json(only: %i[id]) }
      },
      locale: -> { I18n.locale.to_s },
      available_locales: -> { I18n.available_locales.map(&:to_s) },
      translations: -> { translations_for_frontend }

  private

  def translations_for_frontend
    {
      common: I18n.t("common", default: {}),
      nav: I18n.t("nav", default: {}),
      instagram: I18n.t("instagram", default: {}),
      auth: I18n.t("auth", default: {})
    }
  end
end
