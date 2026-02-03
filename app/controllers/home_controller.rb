# frozen_string_literal: true

class HomeController < InertiaController
  skip_before_action :authenticate, only: [:index]
  before_action :perform_authentication

  def index
    @plans = Plan.active.ordered
    render inertia: "home/index", props: {
      plans: @plans.map { |plan| plan_json(plan) }
    }
  end

  private

  def plan_json(plan)
    {
      id: plan.id,
      name: plan.name,
      description: plan.description,
      price_cents: plan.price_cents,
      interval: plan.interval,
      currency: plan.currency,
      features: plan.features_list,
      stripe_price_id: plan.stripe_price_id
    }
  end
end
