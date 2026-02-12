# frozen_string_literal: true

require "rails_helper"

RSpec.describe OpenaiService do
  let(:service) { described_class.new }

  describe "#chat" do
    let(:messages) { [{ role: "user", content: "Hello" }] }

    context "when API call is successful" do
      before do
        stub_request(:post, "https://api.openai.com/v1/chat/completions")
          .to_return(
            status: 200,
            body: {
              choices: [{ message: { content: "Hello! How can I help you?" } }]
            }.to_json,
            headers: { "Content-Type" => "application/json" }
          )
      end

      it "returns the response content" do
        response = service.chat(messages)
        expect(response).to eq("Hello! How can I help you?")
      end
    end

    context "when API call fails" do
      before do
        stub_request(:post, "https://api.openai.com/v1/chat/completions")
          .to_return(status: 500, body: "Internal Server Error")
      end

      it "raises an ApiError" do
        expect { service.chat(messages) }.to raise_error(OpenaiService::ApiError)
      end
    end
  end

  describe "#chat_json" do
    let(:messages) { [{ role: "user", content: "Return JSON" }] }

    context "when API returns valid JSON" do
      before do
        stub_request(:post, "https://api.openai.com/v1/chat/completions")
          .to_return(
            status: 200,
            body: {
              choices: [{ message: { content: '{"key": "value"}' } }]
            }.to_json,
            headers: { "Content-Type" => "application/json" }
          )
      end

      it "returns parsed JSON" do
        response = service.chat_json(messages)
        expect(response).to eq({ "key" => "value" })
      end
    end

    context "when API returns invalid JSON" do
      before do
        stub_request(:post, "https://api.openai.com/v1/chat/completions")
          .to_return(
            status: 200,
            body: {
              choices: [{ message: { content: "not valid json" } }]
            }.to_json,
            headers: { "Content-Type" => "application/json" }
          )
      end

      it "raises an ApiError" do
        expect { service.chat_json(messages) }.to raise_error(OpenaiService::ApiError)
      end
    end
  end
end
