# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Catalog", type: :request do
  let(:user) { create(:user) }
  let(:category) { create(:category, user: user) }
  let(:item) { create(:item, user: user, category: category) }

  describe "GET /catalog" do
    context "when authenticated" do
      before { sign_in_as(user) }

      it "returns a successful response" do
        get catalog_index_path
        expect(response).to have_http_status(:ok)
      end

      it "renders the catalog index page" do
        get catalog_index_path
        expect(response.body).to include("catalog/index")
      end
    end

    context "when not authenticated" do
      it "redirects to sign in" do
        get catalog_index_path
        expect(response).to redirect_to(sign_in_path)
      end
    end
  end

  describe "GET /catalog/:id" do
    context "when authenticated" do
      before { sign_in_as(user) }

      it "returns a successful response for valid product" do
        get catalog_path(id: item.id)
        expect(response).to have_http_status(:ok)
      end

      it "renders the catalog show page" do
        get catalog_path(id: item.id)
        expect(response.body).to include("catalog/show")
      end

      it "redirects for invalid product" do
        get catalog_path(id: 999999)
        expect(response).to redirect_to(catalog_index_path)
      end
    end
  end

  describe "GET /catalog/new" do
    context "when authenticated" do
      before { sign_in_as(user) }

      it "returns a successful response" do
        get new_catalog_path
        expect(response).to have_http_status(:ok)
      end

      it "renders the new product page" do
        get new_catalog_path
        expect(response.body).to include("catalog/new")
      end
    end
  end

  describe "POST /catalog" do
    context "when authenticated" do
      before { sign_in_as(user) }

      it "creates a new item and redirects to catalog index" do
        expect {
          post catalog_index_path, params: {
            name: "Test Product",
            sku: "TP-001",
            price: 29.99,
            stock: 10,
            category: "Electronics"
          }
        }.to change(Item, :count).by(1)

        expect(response).to redirect_to(catalog_index_path)
      end

      it "creates a category if it doesn't exist" do
        expect {
          post catalog_index_path, params: {
            name: "Test Product",
            sku: "TP-002",
            price: 29.99,
            stock: 10,
            category: "New Category"
          }
        }.to change(Category, :count).by(1)
      end
    end
  end

  describe "GET /catalog/:id/edit" do
    context "when authenticated" do
      before { sign_in_as(user) }

      it "returns a successful response for valid product" do
        get edit_catalog_path(id: item.id)
        expect(response).to have_http_status(:ok)
      end

      it "renders the edit product page" do
        get edit_catalog_path(id: item.id)
        expect(response.body).to include("catalog/edit")
      end
    end
  end

  describe "PATCH /catalog/:id" do
    context "when authenticated" do
      before { sign_in_as(user) }

      it "updates the item and redirects to catalog index" do
        patch catalog_path(id: item.id), params: {
          name: "Updated Product",
          sku: item.sku,
          price: item.price,
          stock: item.stock,
          category: category.name
        }
        expect(response).to redirect_to(catalog_index_path)
        expect(item.reload.name).to eq("Updated Product")
      end
    end
  end

  describe "DELETE /catalog/:id" do
    context "when authenticated" do
      before { sign_in_as(user) }

      it "deletes the item and redirects to catalog index" do
        item_to_delete = create(:item, user: user, category: category)

        expect {
          delete catalog_path(id: item_to_delete.id)
        }.to change(Item, :count).by(-1)

        expect(response).to redirect_to(catalog_index_path)
      end
    end
  end
end
