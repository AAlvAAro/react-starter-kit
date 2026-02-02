# frozen_string_literal: true

class Webhooks::StripeController < ApplicationController
  skip_before_action :authenticate
  skip_before_action :verify_authenticity_token

  def create
    payload = request.body.read
    sig_header = request.env["HTTP_STRIPE_SIGNATURE"]

    begin
      event = Stripe::Webhook.construct_event(
        payload, sig_header, StripeConfig.webhook_secret
      )
    rescue JSON::ParserError
      render json: { error: "Invalid payload" }, status: :bad_request
      return
    rescue Stripe::SignatureVerificationError
      render json: { error: "Invalid signature" }, status: :bad_request
      return
    end

    handle_event(event)

    render json: { received: true }
  end

  private

  def handle_event(event)
    case event.type
    when "checkout.session.completed"
      handle_checkout_completed(event.data.object)
    when "customer.subscription.updated"
      handle_subscription_updated(event.data.object)
    when "customer.subscription.deleted"
      handle_subscription_deleted(event.data.object)
    when "invoice.payment_succeeded"
      handle_invoice_paid(event.data.object)
    when "invoice.payment_failed"
      handle_invoice_failed(event.data.object)
    end
  end

  def handle_checkout_completed(session)
    return unless session.metadata&.user_id

    user = User.find_by(id: session.metadata.user_id)
    return unless user

    plan = Plan.find_by(id: session.metadata.plan_id)
    return unless plan

    update_params = { current_plan: plan }

    if session.mode == "subscription"
      update_params[:stripe_subscription_id] = session.subscription
      update_params[:subscription_status] = "active"
    else
      update_params[:subscription_status] = "one_time"
    end

    user.update!(update_params)
  end

  def handle_subscription_updated(subscription)
    user = User.find_by(stripe_subscription_id: subscription.id)
    return unless user

    user.update!(subscription_status: subscription.status)
  end

  def handle_subscription_deleted(subscription)
    user = User.find_by(stripe_subscription_id: subscription.id)
    return unless user

    user.update!(
      subscription_status: "canceled",
      stripe_subscription_id: nil,
      current_plan: nil
    )
  end

  def handle_invoice_paid(invoice)
    return unless invoice.subscription

    user = User.find_by(stripe_subscription_id: invoice.subscription)
    return unless user

    user.update!(subscription_status: "active")
  end

  def handle_invoice_failed(invoice)
    return unless invoice.subscription

    user = User.find_by(stripe_subscription_id: invoice.subscription)
    return unless user

    user.update!(subscription_status: "past_due")
  end
end
