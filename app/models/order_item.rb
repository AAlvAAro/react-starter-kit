# frozen_string_literal: true

class OrderItem < ApplicationRecord
  belongs_to :order

  validates :product_name, presence: true
  validates :quantity, presence: true, numericality: {greater_than: 0, only_integer: true}
  validates :price, presence: true, numericality: {greater_than_or_equal_to: 0}

  def subtotal
    quantity * price
  end
end
