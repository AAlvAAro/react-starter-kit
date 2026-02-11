# frozen_string_literal: true

class ListPlansTool < ApplicationTool
  description "List all subscription plans with their pricing and features"

  arguments do
    optional(:active_only).filled(:bool).description("Show only active plans")
  end

  def call(active_only: true)
    plans = active_only ? Plan.active : Plan.all
    plans = plans.ordered

    {
      count: plans.count,
      plans: plans.map do |plan|
        {
          id: plan.id,
          name: plan.name,
          description: plan.description,
          price: plan.formatted_price,
          price_cents: plan.price_cents,
          interval: plan.interval,
          currency: plan.currency,
          features: plan.features_list,
          active: plan.active,
          stripe_price_id: plan.stripe_price_id,
          stripe_product_id: plan.stripe_product_id
        }
      end
    }
  end
end
