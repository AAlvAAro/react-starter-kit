# frozen_string_literal: true

require "rails_helper"

RSpec.describe Current, type: :model do
  after do
    Current.reset
  end

  describe "attributes" do
    it "has session attribute" do
      user = create(:user)
      session = user.sessions.create!
      Current.session = session

      expect(Current.session).to eq(session)
    end

    it "has user_agent attribute" do
      Current.user_agent = "Test Browser"
      expect(Current.user_agent).to eq("Test Browser")
    end

    it "has ip_address attribute" do
      Current.ip_address = "127.0.0.1"
      expect(Current.ip_address).to eq("127.0.0.1")
    end
  end

  describe "#user" do
    it "delegates user to session" do
      user = create(:user)
      session = user.sessions.create!
      Current.session = session

      expect(Current.user).to eq(user)
    end

    it "returns nil when session is nil" do
      Current.session = nil
      expect(Current.user).to be_nil
    end
  end
end
