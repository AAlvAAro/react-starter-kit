# frozen_string_literal: true

class AddAiDataToInstagramProfiles < ActiveRecord::Migration[8.1]
  def change
    add_column :instagram_profiles, :posts_data, :json
    add_column :instagram_profiles, :insights_data, :json
    add_column :instagram_profiles, :strategy_data, :json
    add_column :instagram_profiles, :personas_data, :json
    add_column :instagram_profiles, :insights_generated_at, :datetime
  end
end
