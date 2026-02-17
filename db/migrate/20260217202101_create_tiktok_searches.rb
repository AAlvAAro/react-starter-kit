# frozen_string_literal: true

class CreateTiktokSearches < ActiveRecord::Migration[8.1]
  def change
    create_table :tiktok_searches do |t|
      t.references :user, null: false, foreign_key: true
      t.references :tiktok_profile, null: false, foreign_key: true
      t.datetime :searched_at
      t.string :status, default: "pending"
      t.datetime :completed_at
      t.text :error_message

      t.timestamps
    end

    add_index :tiktok_searches, [:user_id, :tiktok_profile_id], unique: true
  end
end
