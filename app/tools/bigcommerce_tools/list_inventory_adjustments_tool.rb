# frozen_string_literal: true

module BigcommerceTools
  class ListInventoryAdjustmentsTool < ApplicationTool
    description "List inventory adjustments from the BigCommerce store"

    arguments do
      optional(:limit).filled(:integer).description("Maximum number of adjustments to return (default: 50)")
      optional(:sku).filled(:string).description("Filter by product SKU")
      optional(:reason).filled(:string).description("Filter by adjustment reason")
    end

    def call(limit: 50, sku: nil, reason: nil)
      client = ::Bigcommerce::Client.new
      params = { limit: limit }
      params[:sku] = sku if sku
      params[:reason] = reason if reason

      response = client.inventory_adjustments.list(**params)
      adjustments = response.body || []

      {
        count: adjustments.size,
        adjustments: adjustments
      }
    rescue ::Bigcommerce::ApiError => e
      { error: "BigCommerce API error: #{e.message}" }
    rescue StandardError => e
      { error: "Failed to fetch inventory adjustments: #{e.message}" }
    end
  end
end
