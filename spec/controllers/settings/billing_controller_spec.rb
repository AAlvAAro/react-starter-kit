# frozen_string_literal: true

require "rails_helper"

RSpec.describe Settings::BillingController, type: :request do
  let(:user) { create(:user) }
  let(:plan) { create(:plan, :basic) }

  before do
    sign_in user
  end

  describe "GET #show" do
    it "returns success" do
      get settings_billing_path
      expect(response).to have_http_status(:success)
    end

    context "when user has a current plan" do
      before do
        user.update!(current_plan: plan, subscription_status: "active")
      end

      it "displays the current plan" do
        get settings_billing_path
        expect(response).to have_http_status(:success)
      end
    end
  end

  describe "POST #cancel" do
    context "when no subscription exists" do
      before do
        user.update!(stripe_subscription_id: nil)
      end

      it "redirects to billing page with alert" do
        post cancel_settings_billing_path
        expect(response).to redirect_to(settings_billing_path)
        expect(flash[:alert]).to be_present
      end
    end
  end

  describe "authentication" do
    it "requires authentication" do
      sign_out user

      get settings_billing_path
      expect(response).to redirect_to(sign_in_path)
    end
  end
end
