# frozen_string_literal: true

FactoryBot.define do
  factory :order do
    association :user
    association :customer
    status { "draft" }
    total { 100.00 }
    notes { "Test order notes" }
  end
end
