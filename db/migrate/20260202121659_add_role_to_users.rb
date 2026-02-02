# frozen_string_literal: true

class AddRoleToUsers < ActiveRecord::Migration[8.1]
  def change
    # Remove the old super_admin boolean column
    remove_column :users, :super_admin, :boolean, default: false, null: false

    # Add the new role integer column (0: user, 1: admin, 2: super_admin)
    add_column :users, :role, :integer, default: 0, null: false
    add_index :users, :role
  end
end
