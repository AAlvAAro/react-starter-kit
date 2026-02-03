# frozen_string_literal: true

class StripePlanService
  class StripeError < StandardError; end

  def self.create_product_and_price(plan)
    new(plan).create_product_and_price
  end

  def initialize(plan)
    @plan = plan
  end

  def create_product_and_price
    # 1. Create a Product
    product = Stripe::Product.create({
      name: @plan.name,
      description: @plan.description
    })

    # 2. Create a Price
    price_params = {
      product: product.id,
      unit_amount: @plan.price_cents,
      currency: @plan.currency
    }

    # Add recurring interval for subscriptions
    unless @plan.one_time?
      price_params[:recurring] = { interval: @plan.interval }
    end

    price = Stripe::Price.create(price_params)

    # 3. Save Stripe IDs to database
    @plan.update!(
      stripe_product_id: product.id,
      stripe_price_id: price.id
    )

    { product: product, price: price }
  rescue Stripe::StripeError => e
    raise StripeError, "Failed to create Stripe product/price: #{e.message}"
  end
end
