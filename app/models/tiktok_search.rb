# frozen_string_literal: true

class TiktokSearch < ApplicationRecord
  belongs_to :user
  belongs_to :tiktok_profile

  attribute :status, :string, default: "pending"

  STATUSES = %w[pending processing ready failed].freeze

  validates :status, inclusion: { in: STATUSES }

  delegate :username, to: :tiktok_profile

  scope :recent, -> { order(searched_at: :desc) }
  scope :for_user, ->(user) { where(user: user) }
  scope :pending, -> { where(status: "pending") }
  scope :processing, -> { where(status: "processing") }
  scope :ready, -> { where(status: "ready") }
  scope :failed, -> { where(status: "failed") }

  def ready?
    status == "ready"
  end

  def processing?
    status == "processing"
  end

  def failed?
    status == "failed"
  end
end
