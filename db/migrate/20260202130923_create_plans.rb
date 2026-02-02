# frozen_string_literal: true

class CreatePlans < ActiveRecord::Migration[8.1]
  def change
    create_table :plans do |t|
      t.string :name, null: false
      t.string :stripe_price_id
      t.string :stripe_product_id
      t.integer :price_cents, default: 0, null: false
      t.string :interval, default: "month"
      t.text :features
      t.boolean :active, default: true, null: false
      t.integer :position, default: 0
      t.string :currency, default: "usd"
      t.text :description

      t.timestamps
    end

    add_index :plans, :stripe_price_id, unique: true
    add_index :plans, :active
    add_index :plans, :position
  end
end
