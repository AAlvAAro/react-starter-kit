# frozen_string_literal: true

class RenameDatingToPersonalInInstagramProfiles < ActiveRecord::Migration[8.1]
  def change
    rename_column :instagram_profiles, :dating_insights_data, :personal_insights_data
    rename_column :instagram_profiles, :dating_strategy_data, :personal_strategy_data
    rename_column :instagram_profiles, :dating_templates_data, :personal_templates_data
  end
end
