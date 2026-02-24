# frozen_string_literal: true

module BigcommerceTools
  class ListAbandonedCartsTool < ApplicationTool
    description "List abandoned carts from the BigCommerce store"

    arguments do
      optional(:limit).filled(:integer).description("Maximum number of abandoned carts to return (default: 50)")
      optional(:min_date_created).filled(:string).description("Filter by minimum creation date (RFC 2822 format)")
      optional(:max_date_created).filled(:string).description("Filter by maximum creation date (RFC 2822 format)")
    end

    def call(limit: 50, min_date_created: nil, max_date_created: nil)
      client = ::Bigcommerce::Client.new
      params = { limit: limit }
      params[:min_date_created] = min_date_created if min_date_created
      params[:max_date_created] = max_date_created if max_date_created

      response = client.abandoned_carts.list(**params)
      carts = response.body || []

      {
        count: carts.size,
        abandoned_carts: carts.map do |cart|
          {
            id: cart[:id],
            customer_id: cart[:customer_id],
            email: cart[:email],
            cart_value: cart[:cart_value],
            items_count: cart[:items_count],
            date_created: cart[:date_created],
            date_modified: cart[:date_modified]
          }
        end
      }
    rescue ::Bigcommerce::ApiError => e
      { error: "BigCommerce API error: #{e.message}" }
    rescue StandardError => e
      { error: "Failed to fetch abandoned carts: #{e.message}" }
    end
  end
end
