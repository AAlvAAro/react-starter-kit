# frozen_string_literal: true

require "rails_helper"

RSpec.describe Session, type: :model do
  describe "associations" do
    it { is_expected.to belong_to(:user) }
  end

  describe "callbacks" do
    it "sets user_agent from Current on create" do
      user = create(:user)
      Current.user_agent = "Mozilla/5.0 Test Browser"
      Current.ip_address = "192.168.1.1"

      session = user.sessions.create!

      expect(session.user_agent).to eq("Mozilla/5.0 Test Browser")
    end

    it "sets ip_address from Current on create" do
      user = create(:user)
      Current.user_agent = "Test Browser"
      Current.ip_address = "10.0.0.1"

      session = user.sessions.create!

      expect(session.ip_address).to eq("10.0.0.1")
    end
  end

  describe "user relationship" do
    it "belongs to a user" do
      user = create(:user)
      session = user.sessions.create!

      expect(session.user).to eq(user)
    end

    it "is destroyed when user is destroyed" do
      user = create(:user)
      session = user.sessions.create!
      session_id = session.id

      user.destroy

      expect(Session.exists?(session_id)).to be false
    end
  end
end
