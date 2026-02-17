# frozen_string_literal: true

class TiktokProfile < ApplicationRecord
  has_many :tiktok_searches, dependent: :nullify
  has_many :users, through: :tiktok_searches

  validates :username, presence: true, uniqueness: true

  scope :recent, -> { order(last_fetched_at: :desc) }

  def self.find_or_fetch(username)
    profile = find_by(username: username.downcase)

    if profile.nil? || profile.stale?
      data = Tiktok::SearchApiService.fetch_profile(username)
      profile = create_or_update_from_api(username, data)
    end

    profile
  end

  def self.create_or_update_from_api(username, data)
    profile_data = data["profile"] || data

    find_or_initialize_by(username: username.downcase).tap do |profile|
      profile.assign_attributes(
        name: profile_data["name"],
        bio: profile_data["bio"],
        avatar: profile_data["avatar"],
        avatar_hd: profile_data["avatar_hd"],
        is_verified: profile_data["is_verified"] || false,
        is_private: profile_data["is_private"] || false,
        is_business: profile_data["is_business"] || false,
        posts_count: profile_data["posts"],
        followers_count: profile_data["followers"],
        following_count: profile_data["following"],
        hearts_count: profile_data["hearts"],
        bio_link: profile_data["bio_link"],
        language: profile_data["language"],
        profile_created_at: profile_data["created_at"],
        raw_data: data,
        last_fetched_at: Time.current
      )
      profile.save!
    end
  end

  def stale?
    last_fetched_at.nil? || last_fetched_at < 1.hour.ago
  end

  def generate_all_insights!(locale: I18n.locale, purpose: "business")
    Tiktok::ProfileInsightsGenerator.new(self, locale: locale, purpose: purpose).generate
    Tiktok::PrepGuideGenerator.new(self, locale: locale, purpose: purpose).generate
    Tiktok::MessageTemplatesGenerator.new(self, locale: locale, purpose: purpose).generate
  end

  def generate_dual_insights!(locale: I18n.locale)
    generate_all_insights!(locale: locale, purpose: "business") if insights_stale?(purpose: "business")
    generate_all_insights!(locale: locale, purpose: "personal") if insights_stale?(purpose: "personal")
  end

  def insights_stale?(purpose: "business")
    data_column = "#{purpose}_insights_data"
    send(data_column).nil?
  end

  def insights_for(purpose)
    {
      insights: send("#{purpose}_insights_data"),
      strategy: send("#{purpose}_strategy_data")&.dig("sections"),
      message_templates: send("#{purpose}_templates_data")&.dig("templates")
    }
  end

  def dual_insights
    {
      business: insights_for("business"),
      personal: insights_for("personal")
    }
  end
end
