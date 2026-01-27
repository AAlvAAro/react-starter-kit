# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Home", type: :request do
  describe "GET /" do
    it "returns a successful response" do
      get root_path
      expect(response).to have_http_status(:ok)
    end

    it "renders the home page" do
      get root_path
      expect(response.body).to include("home/index")
    end

    context "when authenticated" do
      let(:user) { create(:user) }

      before { sign_in_as(user) }

      it "still returns a successful response" do
        get root_path
        expect(response).to have_http_status(:ok)
      end
    end
  end
end
