# frozen_string_literal: true

require "rails_helper"

RSpec.describe Instagram::ProfileInsightsGenerator do
  let(:instagram_profile) do
    create(:instagram_profile,
      username: "testuser",
      name: "Test User",
      bio: "Test bio",
      followers_count: 1000,
      posts_count: 50,
      posts_data: [{ "caption" => "Test post", "likes" => 100 }]
    )
  end

  let(:generator) { described_class.new(instagram_profile) }

  describe "#generate" do
    let(:mock_insights) do
      {
        "tone" => { "label" => "Tone & Voice", "value" => "Friendly", "score" => 85 },
        "topics" => { "label" => "Topics", "items" => ["Travel", "Food"] },
        "words" => { "label" => "Words", "items" => [{ "word" => "love", "count" => 10 }] },
        "personality" => { "label" => "Personality", "traits" => [{ "trait" => "Openness", "score" => 80 }] },
        "posture" => { "label" => "Posture", "value" => "Open-minded" },
        "interests" => { "label" => "Interests", "items" => ["Photography"] },
        "flags" => { "label" => "Flags", "items" => [{ "text" => "Positive", "type" => "success" }] }
      }
    end

    before do
      allow_any_instance_of(OpenaiService).to receive(:chat_json).and_return(mock_insights)
    end

    it "generates and saves insights" do
      result = generator.generate

      expect(result).to eq(mock_insights)
      expect(instagram_profile.reload.insights_data).to eq(mock_insights)
      expect(instagram_profile.insights_generated_at).to be_present
    end

    context "when insights already exist and are fresh" do
      before do
        instagram_profile.update!(
          insights_data: mock_insights,
          insights_generated_at: 1.hour.ago
        )
      end

      it "returns existing insights without calling API" do
        expect_any_instance_of(OpenaiService).not_to receive(:chat_json)

        result = generator.generate
        expect(result).to eq(mock_insights)
      end
    end
  end

  describe "#regenerate" do
    let(:mock_insights) do
      { "tone" => { "label" => "Tone", "value" => "New tone", "score" => 90 } }
    end

    before do
      allow_any_instance_of(OpenaiService).to receive(:chat_json).and_return(mock_insights)
    end

    it "always regenerates insights" do
      instagram_profile.update!(
        insights_data: { "old" => "data" },
        insights_generated_at: 1.minute.ago
      )

      result = generator.regenerate

      expect(result).to eq(mock_insights)
      expect(instagram_profile.reload.insights_data).to eq(mock_insights)
    end
  end
end
