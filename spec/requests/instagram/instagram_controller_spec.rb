# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Instagram::InstagramController", type: :request do
  let(:user) { create(:user, credits_remaining: 10) }

  before do
    sign_in_as(user)
  end

  describe "GET /instagram" do
    it "returns the index page" do
      get "/instagram"
      expect(response).to have_http_status(:ok)
    end

    it "includes recent searches" do
      profile = create(:instagram_profile)
      create(:profile_search, user: user, instagram_profile: profile)

      get "/instagram"
      expect(response).to have_http_status(:ok)
    end
  end

  describe "POST /instagram" do
    let(:api_response) do
      {
        "profile" => {
          "name" => "Test User",
          "bio" => "Test bio",
          "followers" => 1000
        },
        "posts" => []
      }
    end

    before do
      allow(Instagram::SearchApiService).to receive(:fetch_profile).and_return(api_response)
      allow(FetchInstagramProfileJob).to receive(:perform_later)
    end

    it "creates a profile search and redirects" do
      post "/instagram", params: { username: "testuser" }

      expect(response).to have_http_status(:redirect)
      expect(InstagramProfile.find_by(username: "testuser")).to be_present
    end

    context "when user has no credits and profile is new" do
      let(:user) { create(:user, credits_remaining: 0) }

      it "redirects to pricing" do
        post "/instagram", params: { username: "newuser" }
        expect(response).to redirect_to(pricing_path)
      end
    end
  end

  describe "GET /instagram/:username" do
    let!(:profile) do
      create(:instagram_profile,
        username: "testuser",
        business_insights_data: { "tone" => {} },
        business_strategy_data: { "sections" => [] },
        business_templates_data: { "templates" => [] },
        personal_insights_data: { "tone" => {} },
        personal_strategy_data: { "sections" => [] },
        personal_templates_data: { "templates" => [] },
        personas_data: { "personas" => [] },
        insights_generated_at: 1.hour.ago,
        last_fetched_at: 30.minutes.ago
      )
    end

    before do
      create(:profile_search, user: user, instagram_profile: profile)
    end

    it "returns the profile page" do
      get "/instagram/testuser"
      expect(response).to have_http_status(:ok)
    end
  end

  describe "GET /instagram/:username/insights" do
    let!(:profile) do
      create(:instagram_profile,
        username: "testuser",
        business_insights_data: { "tone" => {} },
        business_strategy_data: { "sections" => [] },
        business_templates_data: { "templates" => [] },
        personal_insights_data: { "tone" => {} },
        personal_strategy_data: { "sections" => [] },
        personal_templates_data: { "templates" => [] },
        insights_generated_at: 1.hour.ago,
        last_fetched_at: 30.minutes.ago
      )
    end

    before do
      create(:profile_search, user: user, instagram_profile: profile)
    end

    it "returns the insights page" do
      get "/instagram/testuser/insights"
      expect(response).to have_http_status(:ok)
    end
  end

  describe "GET /instagram/:username/strategy" do
    let!(:profile) do
      create(:instagram_profile,
        username: "testuser",
        business_insights_data: { "tone" => {} },
        business_strategy_data: { "sections" => [] },
        business_templates_data: { "templates" => [] },
        personal_insights_data: { "tone" => {} },
        personal_strategy_data: { "sections" => [] },
        personal_templates_data: { "templates" => [] },
        personas_data: { "personas" => [] },
        insights_generated_at: 1.hour.ago,
        last_fetched_at: 30.minutes.ago
      )
    end

    before do
      create(:profile_search, user: user, instagram_profile: profile)
    end

    it "returns the strategy page" do
      get "/instagram/testuser/strategy"
      expect(response).to have_http_status(:ok)
    end
  end

  describe "POST /instagram/:username/chat" do
    let!(:profile) do
      create(:instagram_profile,
        username: "testuser",
        business_insights_data: { "tone" => {} },
        personal_insights_data: { "tone" => {} },
        personas_data: {
          "personas" => [
            { "id" => "friendly", "systemPrompt" => "You are friendly" }
          ]
        },
        last_fetched_at: 30.minutes.ago
      )
    end

    before do
      create(:profile_search, user: user, instagram_profile: profile)
      allow_any_instance_of(OpenaiService).to receive(:chat).and_return("Hello!")
    end

    it "returns a chat response" do
      post "/instagram/testuser/chat", params: {
        persona_id: "friendly",
        message: "Hi there",
        messages: []
      }, as: :json

      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)["response"]).to eq("Hello!")
    end

    it "returns 404 for invalid persona" do
      post "/instagram/testuser/chat", params: {
        persona_id: "invalid",
        message: "Hi there"
      }, as: :json

      expect(response).to have_http_status(:not_found)
    end
  end

  describe "locale switching via lang param" do
    let(:user) { create(:user, credits_remaining: 10, locale: nil) }

    it "switches locale when lang param is provided" do
      get "/instagram?lang=es-MX"
      expect(response).to have_http_status(:ok)
      expect(I18n.locale).to eq(:"es-MX")
    end

    it "uses default locale when invalid lang is provided" do
      get "/instagram?lang=invalid"
      expect(response).to have_http_status(:ok)
    end
  end
end
