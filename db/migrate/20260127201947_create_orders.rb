# frozen_string_literal: true

class CreateOrders < ActiveRecord::Migration[8.1]
  def change
    create_table :orders do |t|
      t.references :user, null: false, foreign_key: true
      t.references :customer, null: false, foreign_key: true
      t.string :status
      t.decimal :total
      t.text :notes

      t.timestamps
    end
  end
end
