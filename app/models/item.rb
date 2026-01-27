# frozen_string_literal: true

class Item < ApplicationRecord
  belongs_to :category
  belongs_to :user

  validates :name, presence: true
  validates :sku, presence: true, uniqueness: { scope: :user_id }
  validates :price, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :stock, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
end
