# frozen_string_literal: true

class ProfileSearch < ApplicationRecord
  belongs_to :user
  belongs_to :instagram_profile

  attribute :purpose, :string, default: "business"

  PURPOSES = %w[business dating].freeze
  validates :purpose, inclusion: { in: PURPOSES }, allow_nil: true

  delegate :username, to: :instagram_profile

  scope :recent, -> { order(searched_at: :desc) }
  scope :for_user, ->(user) { where(user: user) }
end
