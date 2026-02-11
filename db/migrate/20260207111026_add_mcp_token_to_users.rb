# frozen_string_literal: true

class AddMcpTokenToUsers < ActiveRecord::Migration[8.1]
  def change
    add_column :users, :mcp_token, :string

    User.all.each(&:regenerate_mcp_token)
  end
end
