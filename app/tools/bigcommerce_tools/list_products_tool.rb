# frozen_string_literal: true

module BigcommerceTools
  class ListProductsTool < ApplicationTool
    description "List products from the BigCommerce store catalog"

    arguments do
      optional(:limit).filled(:integer).description("Maximum number of products to return (default: 50)")
    end

    def call(limit: 50)
      client = ::Bigcommerce::Client.new
      response = client.connection.get("v2/products", limit: limit)
      products = response.body || []

      {
        count: products.size,
        products: products.map do |product|
          {
            id: product[:id] || product["id"],
            name: product[:name] || product["name"],
            sku: product[:sku] || product["sku"],
            type: product[:type] || product["type"],
            price: product[:price] || product["price"],
            sale_price: product[:sale_price] || product["sale_price"],
            retail_price: product[:retail_price] || product["retail_price"],
            cost_price: product[:cost_price] || product["cost_price"],
            inventory_level: product[:inventory_level] || product["inventory_level"],
            is_visible: product[:is_visible] || product["is_visible"],
            categories: product[:categories] || product["categories"],
            date_created: product[:date_created] || product["date_created"],
            total_sold: product[:total_sold] || product["total_sold"]
          }
        end
      }
    rescue ::Bigcommerce::ApiError => e
      { error: "BigCommerce API error: #{e.message}" }
    rescue StandardError => e
      { error: "Failed to fetch products: #{e.message}" }
    end
  end
end
