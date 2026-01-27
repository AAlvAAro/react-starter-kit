# frozen_string_literal: true

require "rails_helper"

RSpec.describe Customer, type: :model do
  describe "associations" do
    it { is_expected.to belong_to(:user) }
  end

  describe "validations" do
    subject { build(:customer) }

    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:email) }
    it { is_expected.to validate_uniqueness_of(:email).scoped_to(:user_id) }

    it "validates email format" do
      customer = build(:customer, email: "invalid-email")
      expect(customer).not_to be_valid
      expect(customer.errors[:email]).to be_present
    end

    it "accepts valid email format" do
      customer = build(:customer, email: "valid@example.com")
      expect(customer).to be_valid
    end
  end

  describe "normalizations" do
    it "normalizes email to lowercase and strips whitespace" do
      user = create(:user)
      customer = create(:customer, user: user, email: "  TEST@EXAMPLE.COM  ")
      expect(customer.email).to eq("test@example.com")
    end
  end

  describe "creation" do
    it "creates a valid customer" do
      user = create(:user)
      customer = build(:customer, user: user)
      expect(customer).to be_valid
    end

    it "requires a user" do
      customer = build(:customer, user: nil)
      expect(customer).not_to be_valid
    end
  end
end
