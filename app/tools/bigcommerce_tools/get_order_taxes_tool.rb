# frozen_string_literal: true

module BigcommerceTools
  class GetOrderTaxesTool < ApplicationTool
    description "Get tax information for a specific order"

    arguments do
      required(:order_id).filled(:integer).description("The order ID to get taxes for")
    end

    def call(order_id:)
      client = ::Bigcommerce::Client.new
      response = client.order_taxes.list(order_id: order_id)
      taxes = response.body || []

      {
        order_id: order_id,
        count: taxes.size,
        taxes: taxes.map do |tax|
          {
            id: tax[:id],
            order_id: tax[:order_id],
            order_address_id: tax[:order_address_id],
            tax_rate_id: tax[:tax_rate_id],
            tax_class_id: tax[:tax_class_id],
            name: tax[:name],
            class: tax[:class],
            rate: tax[:rate],
            priority: tax[:priority],
            priority_amount: tax[:priority_amount],
            line_amount: tax[:line_amount]
          }
        end
      }
    rescue ::Bigcommerce::ApiError => e
      { error: "BigCommerce API error: #{e.message}" }
    rescue StandardError => e
      { error: "Failed to fetch order taxes: #{e.message}" }
    end
  end
end
