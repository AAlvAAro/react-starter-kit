# frozen_string_literal: true

class CreateInstagramProfiles < ActiveRecord::Migration[8.1]
  def change
    create_table :instagram_profiles do |t|
      t.string :username
      t.string :name
      t.text :bio
      t.string :avatar
      t.string :avatar_hd
      t.boolean :is_verified
      t.boolean :is_business
      t.integer :posts_count
      t.integer :followers_count
      t.integer :following_count
      t.string :external_link
      t.json :bio_links
      t.json :raw_data
      t.datetime :last_fetched_at

      t.timestamps
    end
    add_index :instagram_profiles, :username, unique: true
  end
end
