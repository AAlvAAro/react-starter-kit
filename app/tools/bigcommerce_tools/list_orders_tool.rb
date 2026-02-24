# frozen_string_literal: true

module BigcommerceTools
  class ListOrdersTool < ApplicationTool
    description "List orders from the BigCommerce store with optional filtering"

    arguments do
      optional(:limit).filled(:integer).description("Maximum number of orders to return (default: 50)")
      optional(:status_id).filled(:integer).description("Filter by order status ID")
      optional(:customer_id).filled(:integer).description("Filter by customer ID")
    end

    def call(limit: 50, status_id: nil, customer_id: nil)
      params = { limit: limit }
      params[:status_id] = status_id if status_id
      params[:customer_id] = customer_id if customer_id
      params[:sort] = "date_created:desc"

      client = ::Bigcommerce::Client.new
      response = client.orders.list(**params)

      orders = response.body || []

      {
        count: orders.size,
        orders: orders.map do |order|
          {
            id: order[:id],
            status: order[:status],
            status_id: order[:status_id],
            customer_id: order[:customer_id],
            date_created: order[:date_created],
            date_modified: order[:date_modified],
            total_inc_tax: order[:total_inc_tax],
            total_ex_tax: order[:total_ex_tax],
            items_total: order[:items_total],
            items_shipped: order[:items_shipped],
            payment_method: order[:payment_method],
            payment_status: order[:payment_status],
            currency_code: order[:currency_code],
            order_source: order[:order_source]
          }
        end
      }
    rescue ::Bigcommerce::ApiError => e
      { error: "BigCommerce API error: #{e.message}" }
    rescue StandardError => e
      { error: "Failed to fetch orders: #{e.message}" }
    end
  end
end
