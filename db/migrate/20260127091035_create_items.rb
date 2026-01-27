# frozen_string_literal: true

class CreateItems < ActiveRecord::Migration[8.1]
  def change
    create_table :items do |t|
      t.string :name
      t.string :sku
      t.text :description
      t.decimal :price, precision: 10, scale: 2
      t.integer :stock
      t.string :image
      t.references :category, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
