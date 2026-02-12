# frozen_string_literal: true

require "rails_helper"

RSpec.describe Instagram::ChatPersonaGenerator do
  let(:instagram_profile) do
    create(:instagram_profile,
      username: "testuser",
      name: "Test User",
      bio: "Test bio",
      insights_data: { "tone" => { "value" => "Friendly" }, "personality" => { "traits" => [] } }
    )
  end

  let(:generator) { described_class.new(instagram_profile) }

  describe "#generate" do
    let(:mock_personas) do
      {
        "personas" => [
          { "id" => "friendly", "name" => "Warm & Open", "description" => "Happy to chat", "color" => "success", "systemPrompt" => "You are friendly" },
          { "id" => "tough", "name" => "Reserved", "description" => "Guarded", "color" => "warning", "systemPrompt" => "You are reserved" },
          { "id" => "irrational", "name" => "Distracted", "description" => "Busy", "color" => "destructive", "systemPrompt" => "You are distracted" }
        ]
      }
    end

    before do
      allow_any_instance_of(OpenaiService).to receive(:chat_json).and_return(mock_personas)
    end

    it "generates and saves personas data" do
      result = generator.generate

      expect(result).to eq(mock_personas)
      expect(instagram_profile.reload.personas_data).to eq(mock_personas)
    end

    context "when personas already exist and are fresh" do
      before do
        instagram_profile.update!(
          personas_data: mock_personas,
          insights_generated_at: 1.hour.ago
        )
      end

      it "returns existing personas without calling API" do
        expect_any_instance_of(OpenaiService).not_to receive(:chat_json)

        result = generator.generate
        expect(result).to eq(mock_personas)
      end
    end
  end
end
