# frozen_string_literal: true

class Order < ApplicationRecord
  belongs_to :user
  belongs_to :customer
  has_many :order_items, dependent: :destroy

  accepts_nested_attributes_for :order_items, allow_destroy: true

  validates :status, presence: true
  validates :total, presence: true, numericality: {greater_than_or_equal_to: 0}

  enum :status, {
    draft: "draft",
    pending: "pending",
    sent: "sent",
    accepted: "accepted",
    rejected: "rejected",
    completed: "completed"
  }, default: :draft
end
