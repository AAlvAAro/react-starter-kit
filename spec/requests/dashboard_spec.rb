# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Dashboard", type: :request do
  describe "GET /dashboard" do
    context "when authenticated" do
      let(:user) { create(:user) }

      before { sign_in_as(user) }

      it "returns a successful response" do
        get dashboard_path
        expect(response).to have_http_status(:ok)
      end

      it "renders the dashboard page" do
        get dashboard_path
        expect(response.body).to include("dashboard/index")
      end
    end

    context "when not authenticated" do
      it "redirects to sign in" do
        get dashboard_path
        expect(response).to redirect_to(sign_in_path)
      end
    end
  end
end
