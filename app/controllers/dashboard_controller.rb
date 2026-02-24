# frozen_string_literal: true

class DashboardController < InertiaController
  before_action :authenticate

  PER_PAGE = 10

  def index
    client = Bigcommerce::Client.new
    beginning_of_month = Time.current.beginning_of_month.strftime("%a, %d %b %Y %H:%M:%S %z")
    page = (params[:page] || 1).to_i.clamp(1, 1000)

    response = client.orders.list(limit: 250, min_date_created: beginning_of_month)
    all_orders = response.body || []

    total_count = all_orders.size
    total_pages = (total_count.to_f / PER_PAGE).ceil
    page = page.clamp(1, [total_pages, 1].max)

    offset = (page - 1) * PER_PAGE
    orders = all_orders[offset, PER_PAGE] || []

    render inertia: "dashboard/index", props: {
      orders: orders,
      all_orders: all_orders,
      month: Time.current.strftime("%B %Y"),
      pagination: {
        page: page,
        per_page: PER_PAGE,
        total_count: total_count,
        total_pages: total_pages
      }
    }
  rescue StandardError => e
    Rails.logger.error("Dashboard orders error: #{e.message}")
    render inertia: "dashboard/index", props: {
      orders: [],
      all_orders: [],
      month: Time.current.strftime("%B %Y"),
      pagination: { page: 1, per_page: PER_PAGE, total_count: 0, total_pages: 0 },
      error: e.message
    }
  end
end
