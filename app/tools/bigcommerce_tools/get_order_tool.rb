# frozen_string_literal: true

module BigcommerceTools
  class GetOrderTool < ApplicationTool
    description "Get detailed information about a specific BigCommerce order by ID"

    arguments do
      required(:order_id).filled(:integer).description("The order ID to retrieve")
    end

    def call(order_id:)
      client = ::Bigcommerce::Client.new
      response = client.orders.retrieve(order_id)
      order = response.body

      return { error: "Order ##{order_id} not found" } unless order

      {
        id: order[:id],
        status: order[:status],
        status_id: order[:status_id],
        customer_id: order[:customer_id],
        date_created: order[:date_created],
        date_modified: order[:date_modified],
        date_shipped: order[:date_shipped],
        total_inc_tax: order[:total_inc_tax],
        total_ex_tax: order[:total_ex_tax],
        subtotal_inc_tax: order[:subtotal_inc_tax],
        subtotal_ex_tax: order[:subtotal_ex_tax],
        shipping_cost_inc_tax: order[:shipping_cost_inc_tax],
        shipping_cost_ex_tax: order[:shipping_cost_ex_tax],
        handling_cost_inc_tax: order[:handling_cost_inc_tax],
        discount_amount: order[:discount_amount],
        coupon_discount: order[:coupon_discount],
        items_total: order[:items_total],
        items_shipped: order[:items_shipped],
        payment_method: order[:payment_method],
        payment_status: order[:payment_status],
        currency_code: order[:currency_code],
        billing_address: order[:billing_address],
        staff_notes: order[:staff_notes],
        customer_message: order[:customer_message],
        order_source: order[:order_source],
        ip_address: order[:ip_address]
      }
    rescue ::Bigcommerce::NotFoundError
      { error: "Order ##{order_id} not found" }
    rescue ::Bigcommerce::ApiError => e
      { error: "BigCommerce API error: #{e.message}" }
    rescue StandardError => e
      { error: "Failed to fetch order: #{e.message}" }
    end
  end
end
