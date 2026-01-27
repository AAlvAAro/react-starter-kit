# frozen_string_literal: true

FactoryBot.define do
  factory :item do
    sequence(:name) { |n| "Product #{n}" }
    sequence(:sku) { |n| "SKU-#{n.to_s.rjust(3, '0')}" }
    description { "A test product description" }
    price { 29.99 }
    stock { 10 }
    image { nil }
    association :category
    association :user

    after(:build) do |item|
      item.category.user = item.user if item.category && item.user
    end
  end
end
