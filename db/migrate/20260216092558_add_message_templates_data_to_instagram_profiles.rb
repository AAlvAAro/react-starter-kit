# frozen_string_literal: true

class AddMessageTemplatesDataToInstagramProfiles < ActiveRecord::Migration[8.1]
  def change
    add_column :instagram_profiles, :message_templates_data, :json
  end
end
