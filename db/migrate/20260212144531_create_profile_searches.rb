# frozen_string_literal: true

class CreateProfileSearches < ActiveRecord::Migration[8.1]
  def change
    create_table :profile_searches do |t|
      t.references :user, null: false, foreign_key: true
      t.string :username
      t.json :profile_data
      t.datetime :searched_at

      t.timestamps
    end
  end
end
