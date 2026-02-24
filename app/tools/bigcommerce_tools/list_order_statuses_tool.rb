# frozen_string_literal: true

module BigcommerceTools
  class ListOrderStatusesTool < ApplicationTool
    description "List all available order statuses in the BigCommerce store"

    def call
      client = ::Bigcommerce::Client.new
      response = client.order_statuses.list
      statuses = response.body || []

      {
        count: statuses.size,
        statuses: statuses
      }
    rescue ::Bigcommerce::ApiError => e
      { error: "BigCommerce API error: #{e.message}" }
    rescue StandardError => e
      { error: "Failed to fetch order statuses: #{e.message}" }
    end
  end
end
