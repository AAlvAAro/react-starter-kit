# frozen_string_literal: true

class AddPurposeToProfileSearches < ActiveRecord::Migration[8.1]
  def change
    add_column :profile_searches, :purpose, :string
  end
end
