# frozen_string_literal: true

class Settings::BillingController < InertiaController
  before_action :authenticate
  before_action :set_user

  def show
    render inertia: "settings/billing/show", props: {
      current_plan: current_plan_json,
      subscription_status: @user.subscription_status,
      payments: fetch_payment_history,
      stripe_customer_id: @user.stripe_customer_id
    }
  end

  def cancel
    unless @user.stripe_subscription_id.present?
      return redirect_to settings_billing_path, alert: I18n.t("settings.billing.no_subscription")
    end

    begin
      Stripe::Subscription.update(
        @user.stripe_subscription_id,
        cancel_at_period_end: true
      )

      @user.update!(subscription_status: "canceling")
      redirect_to settings_billing_path, notice: I18n.t("settings.billing.subscription_canceled")
    rescue Stripe::StripeError => e
      redirect_to settings_billing_path, alert: I18n.t("settings.billing.cancel_failed", error: e.message)
    end
  end

  private

  def set_user
    @user = Current.user
  end

  def current_plan_json
    return nil unless @user.current_plan

    plan = @user.current_plan
    {
      id: plan.id,
      name: plan.name,
      description: plan.description,
      formatted_price: plan.formatted_price,
      interval: plan.interval
    }
  end

  def fetch_payment_history
    return [] unless @user.stripe_customer_id.present?

    begin
      charges = Stripe::Charge.list(
        customer: @user.stripe_customer_id,
        limit: 10
      )

      charges.data.map do |charge|
        {
          id: charge.id,
          amount: charge.amount,
          currency: charge.currency,
          status: charge.status,
          created: charge.created,
          description: charge.description || charge.metadata&.dig("plan_name") || "Payment"
        }
      end
    rescue Stripe::StripeError => e
      Rails.logger.error("Failed to fetch payment history: #{e.message}")
      []
    end
  end
end
