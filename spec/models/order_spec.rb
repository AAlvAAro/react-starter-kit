# frozen_string_literal: true

require "rails_helper"

RSpec.describe Order, type: :model do
  describe "associations" do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:customer) }
    it { is_expected.to have_many(:order_items).dependent(:destroy) }
  end

  describe "validations" do
    it { is_expected.to validate_presence_of(:status) }
    it { is_expected.to validate_presence_of(:total) }
    it { is_expected.to validate_numericality_of(:total).is_greater_than_or_equal_to(0) }
  end

  describe "enums" do
    it { is_expected.to define_enum_for(:status).with_values(draft: "draft", pending: "pending", sent: "sent", accepted: "accepted", rejected: "rejected", completed: "completed").backed_by_column_of_type(:string) }
  end

  describe "default values" do
    it "sets status to draft by default" do
      user = create(:user)
      customer = create(:customer, user: user)
      order = Order.new(user: user, customer: customer, total: 0)
      expect(order.status).to eq("draft")
    end
  end

  describe "creation" do
    it "creates a valid order" do
      user = create(:user)
      customer = create(:customer, user: user)
      order = build(:order, user: user, customer: customer)
      expect(order).to be_valid
    end

    it "requires a user" do
      customer = create(:customer)
      order = build(:order, user: nil, customer: customer)
      expect(order).not_to be_valid
    end

    it "requires a customer" do
      user = create(:user)
      order = build(:order, user: user, customer: nil)
      expect(order).not_to be_valid
    end
  end
end
