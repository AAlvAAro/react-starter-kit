# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Customers", type: :request do
  let(:user) { create(:user) }
  let(:customer) { create(:customer, user: user) }

  describe "GET /customers" do
    context "when authenticated" do
      before { sign_in_as(user) }

      it "returns a successful response" do
        get customers_path
        expect(response).to have_http_status(:ok)
      end

      it "renders the customers index page" do
        get customers_path
        expect(response.body).to include("customers/index")
      end
    end

    context "when not authenticated" do
      it "redirects to sign in" do
        get customers_path
        expect(response).to redirect_to(sign_in_path)
      end
    end
  end

  describe "GET /customers/:id" do
    context "when authenticated" do
      before { sign_in_as(user) }

      it "returns a successful response for valid customer" do
        get customer_path(id: customer.id)
        expect(response).to have_http_status(:ok)
      end

      it "renders the customer show page" do
        get customer_path(id: customer.id)
        expect(response.body).to include("customers/show")
      end

      it "redirects for invalid customer" do
        get customer_path(id: 999999)
        expect(response).to redirect_to(customers_path)
      end
    end
  end

  describe "GET /customers/new" do
    context "when authenticated" do
      before { sign_in_as(user) }

      it "returns a successful response" do
        get new_customer_path
        expect(response).to have_http_status(:ok)
      end

      it "renders the new customer page" do
        get new_customer_path
        expect(response.body).to include("customers/new")
      end
    end
  end

  describe "POST /customers" do
    context "when authenticated" do
      before { sign_in_as(user) }

      it "creates a new customer and redirects" do
        expect {
          post customers_path, params: {
            name: "John Doe",
            email: "john@example.com",
            phone: "+1 555 123 4567"
          }
        }.to change(Customer, :count).by(1)

        expect(response).to redirect_to(customers_path)
      end

      it "fails with invalid email" do
        post customers_path, params: {
          name: "John Doe",
          email: "invalid-email"
        }

        expect(response).to redirect_to(new_customer_path)
      end
    end
  end

  describe "GET /customers/:id/edit" do
    context "when authenticated" do
      before { sign_in_as(user) }

      it "returns a successful response for valid customer" do
        get edit_customer_path(id: customer.id)
        expect(response).to have_http_status(:ok)
      end

      it "renders the edit customer page" do
        get edit_customer_path(id: customer.id)
        expect(response.body).to include("customers/edit")
      end
    end
  end

  describe "PATCH /customers/:id" do
    context "when authenticated" do
      before { sign_in_as(user) }

      it "updates the customer and redirects" do
        patch customer_path(id: customer.id), params: {
          name: "Updated Name",
          email: customer.email
        }
        expect(response).to redirect_to(customers_path)
        expect(customer.reload.name).to eq("Updated Name")
      end
    end
  end

  describe "DELETE /customers/:id" do
    context "when authenticated" do
      before { sign_in_as(user) }

      it "deletes the customer and redirects" do
        customer_to_delete = create(:customer, user: user)

        expect {
          delete customer_path(id: customer_to_delete.id)
        }.to change(Customer, :count).by(-1)

        expect(response).to redirect_to(customers_path)
      end
    end
  end
end
