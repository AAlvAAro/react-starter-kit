# frozen_string_literal: true

require "rails_helper"

RSpec.describe OrderItem, type: :model do
  describe "associations" do
    it { is_expected.to belong_to(:order) }
  end

  describe "validations" do
    it { is_expected.to validate_presence_of(:product_name) }
    it { is_expected.to validate_presence_of(:quantity) }
    it { is_expected.to validate_numericality_of(:quantity).is_greater_than(0).only_integer }
    it { is_expected.to validate_presence_of(:price) }
    it { is_expected.to validate_numericality_of(:price).is_greater_than_or_equal_to(0) }
  end

  describe "#subtotal" do
    it "calculates the subtotal correctly" do
      order = create(:order)
      order_item = build(:order_item, order: order, quantity: 3, price: 10.50)
      expect(order_item.subtotal).to eq(31.50)
    end

    it "returns zero when quantity or price is zero" do
      order = create(:order)
      order_item = build(:order_item, order: order, quantity: 0, price: 10.50)
      expect(order_item.subtotal).to eq(0)
    end
  end
end
