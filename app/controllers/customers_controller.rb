# frozen_string_literal: true

class CustomersController < InertiaController
  before_action :authenticate
  before_action :set_customer, only: [:show, :edit, :update, :destroy]

  def index
    customers = current_user.customers.map do |customer|
      customer_to_hash(customer)
    end

    render inertia: "customers/index", props: {
      customers: customers
    }
  end

  def show
    render inertia: "customers/show", props: {
      customer: customer_to_hash(@customer)
    }
  end

  def new
    render inertia: "customers/new", props: {
      customer: { id: nil, name: "", email: "", phone: "", notes: "" }
    }
  end

  def create
    @customer = current_user.customers.build(customer_params)

    if @customer.save
      redirect_to customers_path, notice: "Customer created successfully"
    else
      redirect_to new_customer_path, alert: @customer.errors.full_messages.join(", ")
    end
  end

  def edit
    render inertia: "customers/edit", props: {
      customer: customer_to_hash(@customer)
    }
  end

  def update
    if @customer.update(customer_params)
      redirect_to customers_path, notice: "Customer updated successfully"
    else
      redirect_to edit_customer_path(@customer), alert: @customer.errors.full_messages.join(", ")
    end
  end

  def destroy
    @customer.destroy
    redirect_to customers_path, notice: "Customer deleted successfully"
  end

  private

  def current_user
    Current.session.user
  end

  def set_customer
    @customer = current_user.customers.find_by(id: params[:id])
    redirect_to customers_path, alert: "Customer not found" unless @customer
  end

  def customer_params
    params.permit(:name, :email, :phone, :notes)
  end

  def customer_to_hash(customer)
    {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      notes: customer.notes,
      orders_count: 0,
      total_spent: 0.0,
      created_at: customer.created_at.iso8601
    }
  end
end
