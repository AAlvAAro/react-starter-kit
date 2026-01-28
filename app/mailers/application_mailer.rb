# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: "hola@alvarodelgado.dev"
  layout "mailer"
end
