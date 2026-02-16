# frozen_string_literal: true

namespace :stripe do
  desc "Sync plans with Stripe - creates products and prices if they don't exist"
  task sync_plans: :environment do
    puts "Syncing plans with Stripe..."

    Plan.find_each do |plan|
      puts "\nProcessing: #{plan.name}"

      # Skip if already has a valid stripe_price_id
      if plan.stripe_price_id.present?
        puts "  ✓ Already has stripe_price_id: #{plan.stripe_price_id}"
        next
      end

      # Create or find the product in Stripe
      product = find_or_create_stripe_product(plan)

      puts "  Product ID: #{product.id}"
      plan.update!(stripe_product_id: product.id) unless plan.stripe_product_id == product.id

      # Create the price in Stripe
      price = Stripe::Price.create({
        product: product.id,
        unit_amount: plan.price_cents,
        currency: plan.currency || "usd",
        metadata: { plan_id: plan.id }
      })

      puts "  Price ID: #{price.id}"
      plan.update!(stripe_price_id: price.id)

      puts "  ✓ Plan synced successfully!"
    end

    puts "\n✅ All plans synced with Stripe!"
  end

  def find_or_create_stripe_product(plan)
    if plan.stripe_product_id.present?
      begin
        Stripe::Product.retrieve(plan.stripe_product_id)
      rescue Stripe::InvalidRequestError
        puts "  Product not found in Stripe, creating new one..."
        create_stripe_product(plan)
      end
    else
      create_stripe_product(plan)
    end
  end

  def create_stripe_product(plan)
    Stripe::Product.create({
      name: plan.name,
      description: plan.description,
      metadata: { plan_id: plan.id }
    })
  end
end
