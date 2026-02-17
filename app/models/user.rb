# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password
  has_secure_token :mcp_token

  enum :role, {user: 0, admin: 1, super_admin: 2}, default: :user

  generates_token_for :email_verification, expires_in: 2.days do
    email
  end

  generates_token_for :password_reset, expires_in: 20.minutes do
    password_salt.last(10)
  end


  has_many :sessions, dependent: :destroy
  has_many :profile_searches, dependent: :destroy
  has_many :instagram_profiles, through: :profile_searches
  has_many :tiktok_searches, dependent: :destroy
  has_many :tiktok_profiles, through: :tiktok_searches
  belongs_to :current_plan, class_name: "Plan", optional: true

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true, format: {with: URI::MailTo::EMAIL_REGEXP}
  validates :password, allow_nil: true, length: {minimum: 8}

  normalizes :email, with: -> { _1.strip.downcase }

  before_validation if: :email_changed?, on: :update do
    self.verified = false
  end

  after_update if: :password_digest_previously_changed? do
    sessions.where.not(id: Current.session).delete_all
  end

  def has_credits?
    credits_remaining > 0
  end

  def use_credit!
    raise "No credits remaining" unless has_credits?
    decrement!(:credits_remaining)
  end

  def add_credits!(amount)
    increment!(:credits_remaining, amount)
  end
end
