# frozen_string_literal: true

module BigcommerceTools
  class GetOrderProductsTool < ApplicationTool
    description "Get the products/line items for a specific BigCommerce order"

    arguments do
      required(:order_id).filled(:integer).description("The order ID to get products for")
    end

    def call(order_id:)
      client = ::Bigcommerce::Client.new
      response = client.order_products.list(order_id: order_id)
      products = response.body || []

      {
        order_id: order_id,
        count: products.size,
        products: products.map do |p|
          {
            id: p[:id],
            name: p[:name],
            sku: p[:sku],
            quantity: p[:quantity],
            price_inc_tax: p[:price_inc_tax],
            price_ex_tax: p[:price_ex_tax],
            total_inc_tax: p[:total_inc_tax],
            total_ex_tax: p[:total_ex_tax],
            product_id: p[:product_id],
            variant_id: p[:variant_id]
          }
        end
      }
    rescue ::Bigcommerce::NotFoundError
      { error: "Order ##{order_id} not found" }
    rescue ::Bigcommerce::ApiError => e
      { error: "BigCommerce API error: #{e.message}" }
    rescue StandardError => e
      { error: "Failed to fetch order products: #{e.message}" }
    end
  end
end
