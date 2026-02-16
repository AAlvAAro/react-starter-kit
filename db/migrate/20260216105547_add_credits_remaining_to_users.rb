# frozen_string_literal: true

class AddCreditsRemainingToUsers < ActiveRecord::Migration[8.1]
  def change
    add_column :users, :credits_remaining, :integer, default: 0, null: false
  end
end
