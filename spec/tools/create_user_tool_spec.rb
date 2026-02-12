# frozen_string_literal: true

require "rails_helper"

RSpec.describe CreateUserTool do
  describe "#call" do
    let(:tool) { described_class.new }

    context "with valid parameters" do
      it "creates a new user successfully" do
        result = tool.call(
          name: "John Doe",
          email: "john@example.com",
          password: "password123"
        )

        expect(result[:success]).to be true
        expect(result[:message]).to eq("User created successfully")
        expect(result[:user]).to include(
          name: "John Doe",
          email: "john@example.com",
          role: "user",
          verified: false
        )
      end

      it "creates user with custom role" do
        result = tool.call(
          name: "Admin User",
          email: "admin@example.com",
          password: "password123",
          role: "admin"
        )

        expect(result[:success]).to be true
        expect(result[:user][:role]).to eq("admin")
      end

      it "creates user with default role when not specified" do
        result = tool.call(
          name: "Regular User",
          email: "regular@example.com",
          password: "password123"
        )

        expect(result[:success]).to be true
        expect(result[:user][:role]).to eq("user")
      end

      it "actually persists the user to database" do
        expect {
          tool.call(
            name: "Test User",
            email: "test@example.com",
            password: "password123"
          )
        }.to change(User, :count).by(1)
      end
    end

    context "with invalid parameters" do
      it "fails when email is already taken" do
        create(:user, email: "existing@example.com")

        result = tool.call(
          name: "New User",
          email: "existing@example.com",
          password: "password123"
        )

        expect(result[:success]).to be false
        expect(result[:message]).to eq("Failed to create user")
        expect(result[:errors]).to be_present
        expect(result[:errors].join).to match(/email|correo/i)
      end

      it "fails when password is too short" do
        result = tool.call(
          name: "Test User",
          email: "test@example.com",
          password: "short"
        )

        expect(result[:success]).to be false
        expect(result[:errors]).to be_present
        expect(result[:errors].join).to match(/password|contraseña/i)
      end

      it "fails when email is invalid" do
        result = tool.call(
          name: "Test User",
          email: "invalid-email",
          password: "password123"
        )

        expect(result[:success]).to be false
        expect(result[:errors]).to be_present
        expect(result[:errors].join).to match(/email|correo/i)
      end

      it "does not persist user when validation fails" do
        expect {
          tool.call(
            name: "Test User",
            email: "invalid",
            password: "short"
          )
        }.not_to change(User, :count)
      end
    end
  end

  describe "schema validation" do
    it "has valid input schema" do
      schema = described_class.input_schema_to_json

      expect(schema).to include(:properties)
      expect(schema[:properties]).to include(:name, :email, :password, :role)
    end

    it "has required parameters" do
      schema = described_class.input_schema_to_json

      expect(schema[:required]).to include("name", "email", "password")
    end

    it "has role as optional parameter" do
      schema = described_class.input_schema_to_json

      expect(schema[:required]).not_to include("role")
    end

    it "has descriptions for all parameters" do
      schema = described_class.input_schema_to_json

      expect(schema[:properties][:name][:description]).to eq("User's full name")
      expect(schema[:properties][:email][:description]).to eq("User's email address")
      expect(schema[:properties][:password][:description]).to eq("User's password (min 8 characters)")
      expect(schema[:properties][:role][:description]).to eq("User role (user, admin, super_admin)")
    end
  end

  describe "tool metadata" do
    it "has a description" do
      expect(described_class.description).to eq("Create a new user in the system")
    end
  end
end
