# frozen_string_literal: true

class BillingController < InertiaController
  skip_before_action :authenticate, only: [:pricing]

  def pricing
    @plans = Plan.active.ordered
    render inertia: "billing/pricing", props: {
      plans: @plans.map { |plan| plan_json(plan) },
      stripe_publishable_key: StripeConfig.publishable_key,
      payment_mode: StripeConfig.payment_mode
    }
  end

  def checkout
    plan = Plan.find(params[:plan_id])

    session = create_checkout_session(plan)

    render json: { checkout_url: session.url }
  end

  def success
    session_id = params[:session_id]
    return redirect_to pricing_path, alert: I18n.t("flash.payment_failed") unless session_id

    begin
      session = Stripe::Checkout::Session.retrieve(session_id)
      handle_successful_checkout(session)
      redirect_to dashboard_path, notice: I18n.t("flash.subscription_activated")
    rescue Stripe::InvalidRequestError
      redirect_to pricing_path, alert: I18n.t("flash.payment_failed")
    end
  end

  def portal
    return redirect_to pricing_path unless Current.user.stripe_customer_id

    session = Stripe::BillingPortal::Session.create(
      customer: Current.user.stripe_customer_id,
      return_url: "#{StripeConfig.base_url}/dashboard"
    )

    redirect_to session.url, allow_other_host: true
  end

  private

  def plan_json(plan)
    {
      id: plan.id,
      name: plan.name,
      description: plan.description,
      price_cents: plan.price_cents,
      formatted_price: plan.formatted_price,
      interval: plan.interval,
      currency: plan.currency,
      features: plan.features_list,
      stripe_price_id: plan.stripe_price_id
    }
  end

  def create_checkout_session(plan)
    customer = find_or_create_stripe_customer

    session_params = {
      customer: customer.id,
      success_url: StripeConfig.success_url,
      cancel_url: StripeConfig.cancel_url,
      line_items: [{
        price: plan.stripe_price_id,
        quantity: 1
      }],
      metadata: {
        user_id: Current.user.id,
        plan_id: plan.id
      }
    }

    if plan.one_time?
      session_params[:mode] = "payment"
    else
      session_params[:mode] = "subscription"
    end

    Stripe::Checkout::Session.create(session_params)
  end

  def find_or_create_stripe_customer
    if Current.user.stripe_customer_id.present?
      Stripe::Customer.retrieve(Current.user.stripe_customer_id)
    else
      customer = Stripe::Customer.create(
        email: Current.user.email,
        name: Current.user.name,
        metadata: { user_id: Current.user.id }
      )
      Current.user.update!(stripe_customer_id: customer.id)
      customer
    end
  end

  def handle_successful_checkout(session)
    plan_id = session.metadata.plan_id
    plan = Plan.find(plan_id)

    update_params = { current_plan: plan }

    if session.mode == "subscription"
      update_params[:stripe_subscription_id] = session.subscription
      update_params[:subscription_status] = "active"
    else
      update_params[:subscription_status] = "one_time"
    end

    Current.user.update!(update_params)
  end
end
