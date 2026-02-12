# frozen_string_literal: true

require "rails_helper"

RSpec.describe DatabaseQueryTool do
  describe "#call" do
    let(:tool) { described_class.new }

    before do
      create_list(:user, 3)
      create_list(:plan, 2)
    end

    context "with valid SELECT query" do
      it "executes simple SELECT query" do
        result = tool.call(query: "SELECT COUNT(*) as count FROM users")

        expect(result[:success]).to be true
        expect(result[:results]).to be_an(Array)
        expect(result[:row_count]).to be >= 0
      end

      it "executes SELECT with WHERE clause" do
        user = User.first
        result = tool.call(query: "SELECT * FROM users WHERE id = #{user.id}")

        expect(result[:success]).to be true
        expect(result[:results]).not_to be_empty
      end

      it "executes SELECT with JOIN" do
        result = tool.call(query: "SELECT users.id, users.name FROM users")

        expect(result[:success]).to be true
        expect(result[:results]).to be_an(Array)
      end

      it "returns results array" do
        result = tool.call(query: "SELECT id, name, email FROM users LIMIT 1")

        expect(result[:success]).to be true
        expect(result[:results]).to be_an(Array)
      end

      it "returns row count" do
        result = tool.call(query: "SELECT * FROM users")

        expect(result[:success]).to be true
        expect(result[:row_count]).to eq(3)
      end
    end

    context "with case-insensitive SELECT" do
      it "accepts lowercase select" do
        result = tool.call(query: "select * from users")

        expect(result[:success]).to be true
      end

      it "accepts mixed case SELECT" do
        result = tool.call(query: "SeLeCt * FrOm users")

        expect(result[:success]).to be true
      end

      it "accepts SELECT with leading whitespace" do
        result = tool.call(query: "   SELECT * FROM users")

        expect(result[:success]).to be true
      end
    end

    context "with non-SELECT queries" do
      it "rejects INSERT query" do
        result = tool.call(query: "INSERT INTO users (name, email) VALUES ('Test', 'test@example.com')")

        expect(result[:success]).to be false
        expect(result[:error]).to eq("Only SELECT queries are allowed for security reasons")
      end

      it "rejects UPDATE query" do
        result = tool.call(query: 'UPDATE users SET name = "Hacked"')

        expect(result[:success]).to be false
        expect(result[:error]).to eq("Only SELECT queries are allowed for security reasons")
      end

      it "rejects DELETE query" do
        result = tool.call(query: "DELETE FROM users")

        expect(result[:success]).to be false
        expect(result[:error]).to eq("Only SELECT queries are allowed for security reasons")
      end

      it "rejects DROP query" do
        result = tool.call(query: "DROP TABLE users")

        expect(result[:success]).to be false
        expect(result[:error]).to eq("Only SELECT queries are allowed for security reasons")
      end

      it "rejects CREATE query" do
        result = tool.call(query: "CREATE TABLE test (id INT)")

        expect(result[:success]).to be false
        expect(result[:error]).to eq("Only SELECT queries are allowed for security reasons")
      end
    end

    context "with invalid SQL" do
      it "handles syntax errors gracefully" do
        result = tool.call(query: "SELECT * FROM nonexistent_table")

        expect(result[:success]).to be false
        expect(result[:error]).to be_present
      end

      it "handles malformed queries" do
        result = tool.call(query: "SELECT FROM WHERE")

        expect(result[:success]).to be false
        expect(result[:error]).to be_present
      end
    end
  end

  describe "schema validation" do
    it "has valid input schema" do
      schema = described_class.input_schema_to_json

      expect(schema).to include(:properties)
      expect(schema[:properties]).to include(:query)
    end

    it "has query as required parameter" do
      schema = described_class.input_schema_to_json

      expect(schema[:required]).to include("query")
    end

    it "has description for query parameter" do
      schema = described_class.input_schema_to_json

      expect(schema[:properties][:query][:description]).to eq("SQL SELECT query to execute")
    end
  end

  describe "tool metadata" do
    it "has a description" do
      expect(described_class.description).to eq("Execute a read-only SQL query against the database (SELECT queries only)")
    end
  end
end
