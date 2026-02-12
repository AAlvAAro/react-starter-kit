# frozen_string_literal: true

require "rails_helper"

RSpec.describe InstagramProfile, type: :model do
  describe "validations" do
    it { is_expected.to validate_presence_of(:username) }
    it { is_expected.to validate_uniqueness_of(:username) }
  end

  describe "associations" do
    it { is_expected.to have_many(:profile_searches).dependent(:nullify) }
  end

  describe ".find_or_fetch" do
    let(:username) { "testuser" }

    context "when profile exists and is fresh" do
      let!(:profile) do
        create(:instagram_profile, username: username, last_fetched_at: 30.minutes.ago)
      end

      it "returns existing profile without API call" do
        expect(Instagram::SearchApiService).not_to receive(:fetch_profile)
        result = described_class.find_or_fetch(username)
        expect(result).to eq(profile)
      end
    end

    context "when profile exists but is stale" do
      let!(:profile) do
        create(:instagram_profile, username: username, last_fetched_at: 2.hours.ago)
      end

      let(:api_response) do
        {
          "profile" => {
            "name" => "Updated Name",
            "bio" => "Updated bio",
            "followers" => 5000
          }
        }
      end

      before do
        allow(Instagram::SearchApiService).to receive(:fetch_profile).and_return(api_response)
      end

      it "fetches fresh data from API" do
        result = described_class.find_or_fetch(username)
        expect(result.name).to eq("Updated Name")
      end
    end

    context "when profile does not exist" do
      let(:api_response) do
        {
          "profile" => {
            "name" => "New User",
            "bio" => "New bio",
            "followers" => 1000
          },
          "posts" => []
        }
      end

      before do
        allow(Instagram::SearchApiService).to receive(:fetch_profile).and_return(api_response)
      end

      it "creates a new profile from API data" do
        result = described_class.find_or_fetch(username)
        expect(result).to be_persisted
        expect(result.username).to eq(username)
        expect(result.name).to eq("New User")
      end
    end
  end

  describe "#stale?" do
    it "returns true when last_fetched_at is nil" do
      profile = build(:instagram_profile, last_fetched_at: nil)
      expect(profile.stale?).to be true
    end

    it "returns true when last_fetched_at is more than 1 hour ago" do
      profile = build(:instagram_profile, last_fetched_at: 2.hours.ago)
      expect(profile.stale?).to be true
    end

    it "returns false when last_fetched_at is within 1 hour" do
      profile = build(:instagram_profile, last_fetched_at: 30.minutes.ago)
      expect(profile.stale?).to be false
    end
  end

  describe "#insights_stale?" do
    it "returns true when insights_generated_at is nil" do
      profile = build(:instagram_profile, insights_generated_at: nil)
      expect(profile.insights_stale?).to be true
    end

    it "returns true when insights_generated_at is more than 24 hours ago" do
      profile = build(:instagram_profile, insights_generated_at: 25.hours.ago)
      expect(profile.insights_stale?).to be true
    end

    it "returns false when insights_generated_at is within 24 hours" do
      profile = build(:instagram_profile, insights_generated_at: 12.hours.ago)
      expect(profile.insights_stale?).to be false
    end
  end

  describe "#generate_all_insights!" do
    let(:profile) { create(:instagram_profile) }

    before do
      allow_any_instance_of(Instagram::ProfileInsightsGenerator).to receive(:generate)
      allow_any_instance_of(Instagram::PrepGuideGenerator).to receive(:generate)
      allow_any_instance_of(Instagram::ChatPersonaGenerator).to receive(:generate)
    end

    it "calls all three generators" do
      expect_any_instance_of(Instagram::ProfileInsightsGenerator).to receive(:generate)
      expect_any_instance_of(Instagram::PrepGuideGenerator).to receive(:generate)
      expect_any_instance_of(Instagram::ChatPersonaGenerator).to receive(:generate)

      profile.generate_all_insights!
    end
  end
end
