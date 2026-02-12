# frozen_string_literal: true

require "rails_helper"

RSpec.describe ListUsersTool do
  describe "#call" do
    let(:tool) { described_class.new }

    before do
      create(:user, name: "Alice", role: :user, verified: true)
      create(:user, name: "Bob", role: :admin, verified: false)
      create(:user, name: "Charlie", role: :super_admin, verified: true)
    end

    context "without filters" do
      it "returns all users with default limit" do
        result = tool.call

        expect(result[:total_count]).to eq(3)
        expect(result[:filtered_count]).to eq(3)
        expect(result[:users].length).to eq(3)
      end

      it "returns users with complete structure" do
        result = tool.call
        user = result[:users].first

        expect(user).to include(
          :id, :name, :email, :role,
          :verified, :locale, :created_at
        )
      end
    end

    context "with role filter" do
      it "filters users by user role" do
        result = tool.call(role: "user")

        expect(result[:filtered_count]).to eq(1)
        expect(result[:users]).to all(include(role: "user"))
      end

      it "filters users by admin role" do
        result = tool.call(role: "admin")

        expect(result[:filtered_count]).to eq(1)
        expect(result[:users]).to all(include(role: "admin"))
      end

      it "filters users by super_admin role" do
        result = tool.call(role: "super_admin")

        expect(result[:filtered_count]).to eq(1)
        expect(result[:users]).to all(include(role: "super_admin"))
      end

      it "returns empty array for non-existent role" do
        result = tool.call(role: "non_existent")

        expect(result[:filtered_count]).to eq(0)
        expect(result[:users]).to be_empty
      end
    end

    context "with limit" do
      it "limits the number of results to 2" do
        result = tool.call(limit: 2)

        expect(result[:users].length).to eq(2)
        expect(result[:total_count]).to eq(3)
      end

      it "limits the number of results to 1" do
        result = tool.call(limit: 1)

        expect(result[:users].length).to eq(1)
      end

      it "returns all users when limit exceeds total" do
        result = tool.call(limit: 100)

        expect(result[:users].length).to eq(3)
      end
    end

    context "with combined filters" do
      before do
        create_list(:user, 5, role: :user)
      end

      it "applies both role and limit filters" do
        result = tool.call(role: "user", limit: 3)

        expect(result[:users]).to all(include(role: "user"))
        expect(result[:users].length).to eq(3)
        # filtered_count is the count of the limited query result, not the total matching the filter
        expect(result[:filtered_count]).to eq(3)
      end
    end
  end

  describe "schema validation" do
    it "has valid input schema" do
      schema = described_class.input_schema_to_json

      expect(schema).to include(:properties)
      expect(schema[:properties]).to include(:limit, :role)
    end

    it "has description for limit parameter" do
      schema = described_class.input_schema_to_json

      expect(schema[:properties][:limit][:description]).to eq("Maximum number of users to return")
    end

    it "has description for role parameter" do
      schema = described_class.input_schema_to_json

      expect(schema[:properties][:role][:description]).to eq("Filter by role (user, admin, super_admin)")
    end
  end

  describe "tool metadata" do
    it "has a description" do
      expect(described_class.description).to eq("List all users in the system with their details")
    end
  end
end
