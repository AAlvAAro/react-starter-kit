# frozen_string_literal: true

require "rails_helper"

RSpec.describe Item, type: :model do
  describe "associations" do
    it { is_expected.to belong_to(:category) }
    it { is_expected.to belong_to(:user) }
  end

  describe "validations" do
    subject { build(:item) }

    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:sku) }
    it { is_expected.to validate_uniqueness_of(:sku).scoped_to(:user_id) }
    it { is_expected.to validate_presence_of(:price) }
    it { is_expected.to validate_numericality_of(:price).is_greater_than_or_equal_to(0) }
    it { is_expected.to validate_presence_of(:stock) }
    it { is_expected.to validate_numericality_of(:stock).only_integer.is_greater_than_or_equal_to(0) }
  end

  describe "creation" do
    it "creates a valid item" do
      user = create(:user)
      category = create(:category, user: user)
      item = build(:item, user: user, category: category)

      expect(item).to be_valid
    end

    it "requires a category" do
      item = build(:item, category: nil)
      expect(item).not_to be_valid
    end

    it "requires a user" do
      item = build(:item, user: nil)
      expect(item).not_to be_valid
    end
  end
end
