# frozen_string_literal: true

FactoryBot.define do
  factory :order_item do
    association :order
    product_name { "Test Product" }
    quantity { 2 }
    price { 25.50 }
  end
end
