# frozen_string_literal: true

require "rails_helper"

RSpec.describe OpenaiService do
  let(:service) { described_class.new }

  describe "#chat" do
    let(:messages) { [{ role: "user", content: "Hello" }] }

    context "when API call is successful" do
      let(:mock_response) { double("Response", content: "Hello! How can I help you?") }
      let(:mock_chat) { double("Chat") }

      before do
        allow(RubyLLM).to receive(:chat).and_return(mock_chat)
        allow(mock_chat).to receive(:with_instructions).and_return(mock_chat)
        allow(mock_chat).to receive(:ask).and_return(mock_response)
      end

      it "returns the response content" do
        response = service.chat(messages)
        expect(response).to eq("Hello! How can I help you?")
      end
    end

    context "when API call fails" do
      before do
        allow(RubyLLM).to receive(:chat).and_raise(StandardError.new("API Error"))
      end

      it "raises an ApiError" do
        expect { service.chat(messages) }.to raise_error(OpenaiService::ApiError)
      end
    end
  end

  describe "#chat_json" do
    let(:messages) { [{ role: "user", content: "Return JSON" }] }

    context "when API returns valid JSON" do
      let(:mock_response) { double("Response", content: '{"key": "value"}') }
      let(:mock_chat) { double("Chat") }

      before do
        allow(RubyLLM).to receive(:chat).and_return(mock_chat)
        allow(mock_chat).to receive(:with_instructions).and_return(mock_chat)
        allow(mock_chat).to receive(:ask).and_return(mock_response)
      end

      it "returns parsed JSON" do
        response = service.chat_json(messages)
        expect(response).to eq({ "key" => "value" })
      end
    end

    context "when API returns invalid JSON" do
      let(:mock_response) { double("Response", content: "not valid json") }
      let(:mock_chat) { double("Chat") }

      before do
        allow(RubyLLM).to receive(:chat).and_return(mock_chat)
        allow(mock_chat).to receive(:with_instructions).and_return(mock_chat)
        allow(mock_chat).to receive(:ask).and_return(mock_response)
      end

      it "raises an ApiError" do
        expect { service.chat_json(messages) }.to raise_error(OpenaiService::ApiError)
      end
    end
  end
end
