# frozen_string_literal: true

class Customer < ApplicationRecord
  belongs_to :user

  validates :name, presence: true
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :email, uniqueness: { scope: :user_id }

  normalizes :email, with: -> { _1.strip.downcase }
end
