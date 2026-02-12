# frozen_string_literal: true

class InstagramProfile < ApplicationRecord
  has_many :profile_searches, dependent: :nullify

  validates :username, presence: true, uniqueness: true

  scope :recent, -> { order(last_fetched_at: :desc) }

  def self.find_or_fetch(username)
    profile = find_by(username: username.downcase)

    if profile.nil? || profile.stale?
      data = Instagram::SearchApiService.fetch_profile(username)
      profile = create_or_update_from_api(username, data)
    end

    profile
  end

  def self.create_or_update_from_api(username, data)
    profile_data = data["profile"] || data
    posts_data = data["posts"] || []

    find_or_initialize_by(username: username.downcase).tap do |profile|
      profile.assign_attributes(
        name: profile_data["name"] || profile_data["full_name"],
        bio: profile_data["bio"] || profile_data["biography"],
        avatar: profile_data["avatar"] || profile_data["profile_pic_url"],
        avatar_hd: profile_data["avatar_hd"] || profile_data["profile_pic_url_hd"],
        is_verified: profile_data["is_verified"] || false,
        is_business: profile_data["is_business"] || false,
        posts_count: profile_data["posts"] || profile_data["media_count"],
        followers_count: profile_data["followers"] || profile_data["follower_count"],
        following_count: profile_data["following"] || profile_data["following_count"],
        external_link: profile_data["external_link"],
        bio_links: profile_data["bio_links"],
        posts_data: posts_data,
        raw_data: data,
        last_fetched_at: Time.current
      )
      profile.save!
    end
  end

  def stale?
    last_fetched_at.nil? || last_fetched_at < 1.hour.ago
  end

  def generate_all_insights!
    Instagram::ProfileInsightsGenerator.new(self).generate
    Instagram::PrepGuideGenerator.new(self).generate
    Instagram::ChatPersonaGenerator.new(self).generate
  end

  def insights_stale?
    insights_generated_at.nil? || insights_generated_at < 24.hours.ago
  end
end
