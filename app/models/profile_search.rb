# frozen_string_literal: true

class ProfileSearch < ApplicationRecord
  belongs_to :user
  belongs_to :instagram_profile

  delegate :username, to: :instagram_profile

  scope :recent, -> { order(searched_at: :desc) }
  scope :for_user, ->(user) { where(user: user) }
end
