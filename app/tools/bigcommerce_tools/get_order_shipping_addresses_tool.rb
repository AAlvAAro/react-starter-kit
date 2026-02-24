# frozen_string_literal: true

module BigcommerceTools
  class GetOrderShippingAddressesTool < ApplicationTool
    description "Get the shipping addresses for a specific BigCommerce order"

    arguments do
      required(:order_id).filled(:integer).description("The order ID to get shipping addresses for")
    end

    def call(order_id:)
      client = ::Bigcommerce::Client.new
      response = client.order_shipping_addresses.list(order_id: order_id)
      addresses = response.body || []

      {
        order_id: order_id,
        count: addresses.size,
        addresses: addresses
      }
    rescue ::Bigcommerce::NotFoundError
      { error: "Order ##{order_id} not found" }
    rescue ::Bigcommerce::ApiError => e
      { error: "BigCommerce API error: #{e.message}" }
    rescue StandardError => e
      { error: "Failed to fetch shipping addresses: #{e.message}" }
    end
  end
end
