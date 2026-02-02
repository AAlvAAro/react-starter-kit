# frozen_string_literal: true

Stripe.api_key = ENV.fetch("STRIPE_SECRET_KEY", nil)

# Optional: Set API version for consistency
# Stripe.api_version = "2024-12-18.acacia"

# Stripe configuration module for easy access throughout the app
module StripeConfig
  class << self
    def publishable_key
      ENV.fetch("STRIPE_PUBLISHABLE_KEY", nil)
    end

    def webhook_secret
      ENV.fetch("STRIPE_WEBHOOK_SECRET", nil)
    end

    def payment_mode
      # Options: "payment" (one-time) or "subscription" (recurring)
      ENV.fetch("STRIPE_PAYMENT_MODE", "subscription")
    end

    def success_url
      ENV.fetch("STRIPE_SUCCESS_URL", "#{base_url}/billing/success?session_id={CHECKOUT_SESSION_ID}")
    end

    def cancel_url
      ENV.fetch("STRIPE_CANCEL_URL", "#{base_url}/pricing")
    end

    def base_url
      ENV.fetch("APP_URL") do
        raise "APP_URL environment variable is not set. Please configure it for Stripe redirects."
      end
    end

    def configured?
      ENV["STRIPE_SECRET_KEY"].present? && ENV["STRIPE_PUBLISHABLE_KEY"].present?
    end
  end
end
