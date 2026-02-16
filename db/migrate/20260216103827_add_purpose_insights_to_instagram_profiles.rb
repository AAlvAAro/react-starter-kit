# frozen_string_literal: true

class AddPurposeInsightsToInstagramProfiles < ActiveRecord::Migration[8.1]
  def change
    add_column :instagram_profiles, :business_insights_data, :json
    add_column :instagram_profiles, :business_strategy_data, :json
    add_column :instagram_profiles, :business_templates_data, :json
    add_column :instagram_profiles, :dating_insights_data, :json
    add_column :instagram_profiles, :dating_strategy_data, :json
    add_column :instagram_profiles, :dating_templates_data, :json
  end
end
