# frozen_string_literal: true

class RemoveSuperAdminFromUsers < ActiveRecord::Migration[8.1]
  def change
    remove_column :users, :super_admin, :boolean, default: false, null: false
  end
end
