# frozen_string_literal: true

FactoryBot.define do
  factory :customer do
    sequence(:name) { |n| "Customer #{n}" }
    sequence(:email) { |n| "customer#{n}@example.com" }
    phone { "+1 (555) 123-4567" }
    notes { "A valued customer" }
    association :user
  end
end
