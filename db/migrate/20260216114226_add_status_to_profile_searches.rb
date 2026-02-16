# frozen_string_literal: true

class AddStatusToProfileSearches < ActiveRecord::Migration[8.1]
  def change
    add_column :profile_searches, :status, :string, default: "pending"
    add_column :profile_searches, :completed_at, :datetime
    add_column :profile_searches, :error_message, :text
  end
end
