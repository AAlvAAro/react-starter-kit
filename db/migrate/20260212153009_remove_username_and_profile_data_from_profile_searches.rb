# frozen_string_literal: true

class RemoveUsernameAndProfileDataFromProfileSearches < ActiveRecord::Migration[8.1]
  def change
    # First, delete any profile_searches without an instagram_profile
    ProfileSearch.where(instagram_profile_id: nil).delete_all

    # Remove redundant columns
    remove_column :profile_searches, :username, :string
    remove_column :profile_searches, :profile_data, :json

    # Make instagram_profile_id required
    change_column_null :profile_searches, :instagram_profile_id, false
  end
end
