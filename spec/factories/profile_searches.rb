# frozen_string_literal: true

FactoryBot.define do
  factory :profile_search do
    user
    instagram_profile
    searched_at { Time.current }
  end
end
