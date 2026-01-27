# frozen_string_literal: true

class InsightsController < InertiaController
  before_action :authenticate

  def index
    # TODO: Replace with actual data once Order model is set up
    render inertia: "insights/index", props: {
      stats: {
        total_revenue: "$12,450.00",
        total_orders: 156,
        total_customers: current_user.customers.count,
        conversion_rate: 3.2,
        revenue_trend: "+15%",
        orders_trend: "+8%",
        customers_trend: "+12%",
        conversion_trend: "+0.5%"
      },
      top_products: fake_top_products
    }
  end

  private

  def current_user
    Current.session.user
  end

  def fake_top_products
    current_user.items.limit(5).map do |item|
      {
        id: item.id,
        name: item.name,
        category: item.category&.name || "Uncategorized",
        sales: "$#{(rand(100..2000)).to_f}"
      }
    end
  end
end