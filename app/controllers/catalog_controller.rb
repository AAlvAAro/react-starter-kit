# frozen_string_literal: true

class CatalogController < InertiaController
  before_action :authenticate
  before_action :set_item, only: [:show, :edit, :update, :destroy]

  def index
    items = current_user.items.includes(:category).map do |item|
      item_to_hash(item)
    end

    render inertia: "catalog/index", props: {
      products: items,
      categories: ["All"] + current_user.categories.pluck(:name)
    }
  end

  def show
    render inertia: "catalog/show", props: {
      product: item_to_hash(@item),
      categories: current_user.categories.pluck(:name)
    }
  end

  def new
    render inertia: "catalog/new", props: {
      product: { id: nil, name: "", sku: "", price: 0, category: "", stock: 0, image: nil },
      categories: current_user.categories.pluck(:name)
    }
  end

  def create
    category = current_user.categories.find_or_create_by!(name: item_params[:category])
    @item = current_user.items.build(item_params.except(:category).merge(category: category))

    if @item.save
      redirect_to catalog_index_path, notice: "Product created successfully"
    else
      redirect_to new_catalog_path, alert: @item.errors.full_messages.join(", ")
    end
  end

  def edit
    render inertia: "catalog/edit", props: {
      product: item_to_hash(@item),
      categories: current_user.categories.pluck(:name)
    }
  end

  def update
    category = current_user.categories.find_or_create_by!(name: item_params[:category])

    if @item.update(item_params.except(:category).merge(category: category))
      redirect_to catalog_index_path, notice: "Product updated successfully"
    else
      redirect_to edit_catalog_path(@item), alert: @item.errors.full_messages.join(", ")
    end
  end

  def destroy
    @item.destroy
    redirect_to catalog_index_path, notice: "Product deleted successfully"
  end

  private

  def current_user
    Current.session.user
  end

  def set_item
    @item = current_user.items.find_by(id: params[:id])
    redirect_to catalog_index_path, alert: "Product not found" unless @item
  end

  def item_params
    params.permit(:name, :sku, :description, :price, :stock, :image, :category)
  end

  def item_to_hash(item)
    {
      id: item.id,
      name: item.name,
      sku: item.sku,
      price: item.price.to_f,
      category: item.category.name,
      stock: item.stock,
      image: item.image,
      description: item.description
    }
  end
end
