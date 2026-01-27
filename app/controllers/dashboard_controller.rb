# frozen_string_literal: true

class DashboardController < InertiaController
  before_action :authenticate

  def index
    user = Current.session.user
    # TODO: Replace fake values with actual database queries once models are set up
    render inertia: "dashboard/index", props: {
      stats: {
        total_products: 248,
        orders_this_week: 56,
        catalog_views: 1429,
        products_trend: 12,
        orders_trend: 8,
        views_trend: -3
      }
    }
  end
end
