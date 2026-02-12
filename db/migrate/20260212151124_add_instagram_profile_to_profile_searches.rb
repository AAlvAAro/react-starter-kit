# frozen_string_literal: true

class AddInstagramProfileToProfileSearches < ActiveRecord::Migration[8.1]
  def change
    add_reference :profile_searches, :instagram_profile, null: true, foreign_key: true
  end
end
