# frozen_string_literal: true

require "rails_helper"

RSpec.describe User, type: :model do
  describe "associations" do
    it { is_expected.to have_many(:sessions).dependent(:destroy) }
  end

  describe "validations" do
    subject { build(:user) }

    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:email) }
    it { is_expected.to validate_uniqueness_of(:email).case_insensitive }
    it "validates password length is at least 8" do
      user = build(:user, password: "short")
      expect(user).not_to be_valid
      expect(user.errors[:password]).to include("es demasiado corto (mínimo 8 caracteres)")
    end

    it "validates email format" do
      user = build(:user, email: "invalid-email")
      expect(user).not_to be_valid
      expect(user.errors[:email]).to be_present
    end

    it "accepts valid email format" do
      user = build(:user, email: "valid@example.com")
      expect(user).to be_valid
    end
  end

  describe "normalizations" do
    it "normalizes email to lowercase and strips whitespace" do
      user = User.new(
        name: "Test User",
        email: "  TEST@NORMALIZATION.COM  ",
        password: "Secret1*3*5*"
      )
      user.save!
      expect(user.email).to eq("test@normalization.com")
    end
  end

  describe "roles" do
    it "defaults to user role" do
      user = create(:user)
      expect(user.user?).to be true
      expect(user.role).to eq("user")
    end

    it "can be set to admin role" do
      user = create(:user, role: :admin)
      expect(user.admin?).to be true
      expect(user.role).to eq("admin")
    end

    it "can be set to super_admin role" do
      user = create(:user, role: :super_admin)
      expect(user.super_admin?).to be true
      expect(user.role).to eq("super_admin")
    end

    it "provides role query methods" do
      user = create(:user, role: :user)
      expect(user.user?).to be true
      expect(user.admin?).to be false
      expect(user.super_admin?).to be false

      admin = create(:user, role: :admin)
      expect(admin.user?).to be false
      expect(admin.admin?).to be true
      expect(admin.super_admin?).to be false

      super_admin = create(:user, role: :super_admin)
      expect(super_admin.user?).to be false
      expect(super_admin.admin?).to be false
      expect(super_admin.super_admin?).to be true
    end
  end

  describe "password security" do
    it "has secure password" do
      user = create(:user, password: "SecurePass123")
      expect(user.authenticate("SecurePass123")).to eq(user)
      expect(user.authenticate("wrong_password")).to be false
    end
  end

  describe "email verification token" do
    it "generates a token for email verification" do
      user = create(:user)
      token = user.generate_token_for(:email_verification)
      expect(token).to be_present
    end

    it "finds user by email verification token" do
      user = create(:user)
      token = user.generate_token_for(:email_verification)
      found_user = User.find_by_token_for(:email_verification, token)
      expect(found_user).to eq(user)
    end
  end

  describe "password reset token" do
    it "generates a token for password reset" do
      user = create(:user)
      token = user.generate_token_for(:password_reset)
      expect(token).to be_present
    end

    it "finds user by password reset token" do
      user = create(:user)
      token = user.generate_token_for(:password_reset)
      found_user = User.find_by_token_for(:password_reset, token)
      expect(found_user).to eq(user)
    end
  end

  describe "callbacks" do
    it "sets verified to false when email changes" do
      user = create(:user, verified: true)
      user.update(email: "newemail@example.com")
      expect(user.verified).to be false
    end

    it "deletes other sessions when password changes" do
      user = create(:user)
      session1 = user.sessions.create!
      session2 = user.sessions.create!
      Current.session = session1

      user.update(password: "NewSecurePassword123")

      expect(Session.exists?(session1.id)).to be true
      expect(Session.exists?(session2.id)).to be false
    end
  end
end
