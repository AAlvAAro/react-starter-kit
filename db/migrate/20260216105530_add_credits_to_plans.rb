# frozen_string_literal: true

class AddCreditsToPlans < ActiveRecord::Migration[8.1]
  def change
    add_column :plans, :credits, :integer
  end
end
