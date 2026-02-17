# frozen_string_literal: true

class CreateTiktokProfiles < ActiveRecord::Migration[8.1]
  def change
    create_table :tiktok_profiles do |t|
      t.string :username, null: false
      t.string :name
      t.text :bio
      t.string :avatar
      t.string :avatar_hd
      t.boolean :is_verified, default: false
      t.boolean :is_private, default: false
      t.boolean :is_business, default: false
      t.integer :posts_count
      t.integer :followers_count
      t.integer :following_count
      t.integer :hearts_count
      t.string :bio_link
      t.string :language
      t.datetime :profile_created_at
      t.json :raw_data
      t.datetime :last_fetched_at

      # Insights data
      t.json :business_insights_data
      t.json :business_strategy_data
      t.json :business_templates_data
      t.json :personal_insights_data
      t.json :personal_strategy_data
      t.json :personal_templates_data

      t.timestamps
    end

    add_index :tiktok_profiles, :username, unique: true
  end
end
