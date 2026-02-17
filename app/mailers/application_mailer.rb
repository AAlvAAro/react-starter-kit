# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: "hey@socialtoolkit.co"
  layout "mailer"
end
