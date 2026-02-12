# frozen_string_literal: true

FactoryBot.define do
  factory :instagram_profile do
    sequence(:username) { |n| "testuser#{n}" }
    name { "Test User" }
    bio { "Test bio" }
    avatar { "https://example.com/avatar.jpg" }
    avatar_hd { "https://example.com/avatar_hd.jpg" }
    is_verified { false }
    is_business { false }
    posts_count { 50 }
    followers_count { 1000 }
    following_count { 200 }
    external_link { "https://example.com" }
    bio_links { [] }
    raw_data { {} }
    posts_data { [] }
    insights_data { nil }
    strategy_data { nil }
    personas_data { nil }
    insights_generated_at { nil }
    last_fetched_at { Time.current }
  end
end
