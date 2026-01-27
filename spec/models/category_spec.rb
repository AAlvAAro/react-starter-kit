# frozen_string_literal: true

require "rails_helper"

RSpec.describe Category, type: :model do
  describe "associations" do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to have_many(:items).dependent(:destroy) }
  end

  describe "validations" do
    subject { build(:category) }

    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_uniqueness_of(:name).scoped_to(:user_id) }
  end

  describe "dependent destroy" do
    it "destroys associated items when category is destroyed" do
      user = create(:user)
      category = create(:category, user: user)
      item = create(:item, category: category, user: user)

      category.destroy

      expect(Item.exists?(item.id)).to be false
    end
  end
end
