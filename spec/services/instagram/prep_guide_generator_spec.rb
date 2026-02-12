# frozen_string_literal: true

require "rails_helper"

RSpec.describe Instagram::PrepGuideGenerator do
  let(:instagram_profile) do
    create(:instagram_profile,
      username: "testuser",
      name: "Test User",
      bio: "Test bio",
      followers_count: 1000,
      insights_data: { "tone" => { "value" => "Friendly" } }
    )
  end

  let(:generator) { described_class.new(instagram_profile) }

  describe "#generate" do
    let(:mock_strategy) do
      {
        "sections" => [
          { "id" => "icebreakers", "question" => "What are good icebreakers?", "answer" => "Ask about travel", "icon" => "MessageSquare" }
        ]
      }
    end

    before do
      allow_any_instance_of(OpenaiService).to receive(:chat_json).and_return(mock_strategy)
    end

    it "generates and saves strategy data" do
      result = generator.generate

      expect(result).to eq(mock_strategy)
      expect(instagram_profile.reload.strategy_data).to eq(mock_strategy)
    end

    context "when strategy already exists and is fresh" do
      before do
        instagram_profile.update!(
          strategy_data: mock_strategy,
          insights_generated_at: 1.hour.ago
        )
      end

      it "returns existing strategy without calling API" do
        expect_any_instance_of(OpenaiService).not_to receive(:chat_json)

        result = generator.generate
        expect(result).to eq(mock_strategy)
      end
    end
  end
end
