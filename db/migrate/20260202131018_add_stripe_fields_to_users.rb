# frozen_string_literal: true

class AddStripeFieldsToUsers < ActiveRecord::Migration[8.1]
  def change
    add_column :users, :stripe_customer_id, :string
    add_column :users, :subscription_status, :string
    add_column :users, :stripe_subscription_id, :string
    add_reference :users, :current_plan, foreign_key: { to_table: :plans }

    add_index :users, :stripe_customer_id, unique: true
    add_index :users, :stripe_subscription_id, unique: true
  end
end
