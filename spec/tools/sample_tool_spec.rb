# frozen_string_literal: true

require "rails_helper"

RSpec.describe SampleTool do
  describe "#call" do
    let(:tool) { described_class.new }
    let(:user) { create(:user, name: "John Doe") }

    it "returns greeting with user name and default prefix" do
      result = tool.call(id: user.id)

      expect(result).to eq("Hey #{user.name}!")
    end

    it "returns greeting with custom prefix" do
      result = tool.call(id: user.id, prefix: "Hello")

      expect(result).to eq("Hello #{user.name}!")
    end

    it "returns greeting with different custom prefix" do
      result = tool.call(id: user.id, prefix: "Welcome")

      expect(result).to eq("Welcome #{user.name}!")
    end

    it "raises error when user not found" do
      expect {
        tool.call(id: 99999)
      }.to raise_error(ActiveRecord::RecordNotFound)
    end
  end

  describe "schema validation" do
    it "has valid input schema" do
      schema = described_class.input_schema_to_json

      expect(schema).to include(:properties)
      expect(schema[:properties]).to include(:id, :prefix)
    end

    it "has id as required parameter" do
      schema = described_class.input_schema_to_json

      expect(schema[:required]).to include("id")
    end

    it "has prefix as optional parameter" do
      schema = described_class.input_schema_to_json

      expect(schema[:required]).not_to include("prefix")
    end

    it "has description for id parameter" do
      schema = described_class.input_schema_to_json

      expect(schema[:properties][:id][:description]).to eq("ID of the user to greet")
    end

    it "has description for prefix parameter" do
      schema = described_class.input_schema_to_json

      expect(schema[:properties][:prefix][:description]).to eq("Prefix to add to the greeting")
    end
  end

  describe "tool metadata" do
    it "has a description" do
      expect(described_class.description).to eq("Greet a user")
    end

    it "has annotations" do
      annotations = described_class.annotations

      expect(annotations).to include(
        title: "User Greeting",
        read_only_hint: true,
        open_world_hint: false
      )
    end
  end
end
