# frozen_string_literal: true

class OrdersController < InertiaController
  before_action :set_order, only: [:show, :edit, :update, :destroy]

  def index
    @orders = Current.user.orders.includes(:customer).order(created_at: :desc)
    render inertia: "orders/index", props: {
      orders: @orders.map { |order|
        {
          id: order.id,
          customer_name: order.customer.name,
          customer_email: order.customer.email,
          status: order.status,
          total: order.total,
          created_at: order.created_at
        }
      }
    }
  end

  def show
    render inertia: "orders/show", props: {
      order: {
        id: @order.id,
        customer: {
          id: @order.customer.id,
          name: @order.customer.name,
          email: @order.customer.email,
          phone: @order.customer.phone
        },
        status: @order.status,
        total: @order.total,
        notes: @order.notes,
        created_at: @order.created_at,
        items: @order.order_items.map { |item|
          {
            id: item.id,
            product_name: item.product_name,
            quantity: item.quantity,
            price: item.price,
            subtotal: item.subtotal
          }
        }
      }
    }
  end

  def new
    @customers = Current.user.customers.order(:name)
    @items = Current.user.items.includes(:category).order(:name)
    render inertia: "orders/new", props: {
      order: {
        customer_id: nil,
        status: "draft",
        notes: "",
        items: []
      },
      customers: @customers.map { |customer|
        {
          id: customer.id,
          name: customer.name,
          email: customer.email
        }
      },
      catalog_items: @items.map { |item|
        {
          id: item.id,
          name: item.name,
          sku: item.sku,
          price: item.price,
          stock: item.stock,
          category_name: item.category.name
        }
      }
    }
  end

  def create
    debugg
    @order = Current.user.orders.build(order_params)
    debugger

    if @order.save
      redirect_to order_path(@order), notice: t("flash.order_created")
    else
      redirect_to new_order_path, inertia: {errors: @order.errors}
    end
  end

  def edit
    @customers = Current.user.customers.order(:name)
    @items = Current.user.items.includes(:category).order(:name)
    render inertia: "orders/edit", props: {
      order: {
        id: @order.id,
        customer_id: @order.customer_id,
        status: @order.status,
        notes: @order.notes,
        items: @order.order_items.map { |item|
          {
            id: item.id,
            product_name: item.product_name,
            quantity: item.quantity,
            price: item.price
          }
        }
      },
      customers: @customers.map { |customer|
        {
          id: customer.id,
          name: customer.name,
          email: customer.email
        }
      },
      catalog_items: @items.map { |item|
        {
          id: item.id,
          name: item.name,
          sku: item.sku,
          price: item.price,
          stock: item.stock,
          category_name: item.category.name
        }
      }
    }
  end

  def update
    if @order.update(order_params)
      redirect_to order_path(@order), notice: t("flash.order_updated")
    else
      redirect_to edit_order_path(@order), inertia: {errors: @order.errors}
    end
  end

  def destroy
    @order.destroy
    redirect_to orders_path, notice: t("flash.order_deleted")
  end

  private

  def set_order
    @order = Current.user.orders.find(params[:id])
  end

  def order_params
    params.permit(:customer_id, :status, :total, :notes, items_attributes: [:id, :product_name, :quantity, :price, :_destroy])
  end
end
