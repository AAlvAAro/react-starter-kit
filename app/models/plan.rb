# frozen_string_literal: true

class Plan < ApplicationRecord
  has_many :users, foreign_key: :current_plan_id, dependent: :nullify

  validates :name, presence: true
  validates :stripe_price_id, uniqueness: true, allow_nil: true

  scope :active, -> { where(active: true) }
  scope :ordered, -> { order(position: :asc) }

  serialize :features, coder: JSON

  def price
    price_cents / 100.0
  end

  def formatted_price
    "$#{format("%.2f", price)}"
  end

  def monthly?
    interval == "month"
  end

  def yearly?
    interval == "year"
  end

  def one_time?
    interval == "one_time"
  end

  def features_list
    features.is_a?(Array) ? features : []
  end
end
