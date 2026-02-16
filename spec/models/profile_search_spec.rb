# frozen_string_literal: true

require "rails_helper"

RSpec.describe ProfileSearch, type: :model do
  describe "associations" do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:instagram_profile) }
  end

  describe "delegations" do
    it "delegates username to instagram_profile" do
      profile = create(:instagram_profile, username: "testuser")
      search = create(:profile_search, instagram_profile: profile)

      expect(search.username).to eq("testuser")
    end
  end

  describe "scopes" do
    describe ".recent" do
      it "orders by searched_at descending" do
        user = create(:user)
        profile = create(:instagram_profile)

        old_search = create(:profile_search, user: user, instagram_profile: profile, searched_at: 2.days.ago)
        new_search = create(:profile_search, user: user, instagram_profile: create(:instagram_profile), searched_at: 1.hour.ago)

        expect(ProfileSearch.recent.first).to eq(new_search)
        expect(ProfileSearch.recent.last).to eq(old_search)
      end
    end

    describe ".for_user" do
      it "returns searches for a specific user" do
        user1 = create(:user)
        user2 = create(:user)

        search1 = create(:profile_search, user: user1)
        search2 = create(:profile_search, user: user2)

        expect(ProfileSearch.for_user(user1)).to include(search1)
        expect(ProfileSearch.for_user(user1)).not_to include(search2)
      end
    end
  end
end
