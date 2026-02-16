# frozen_string_literal: true

class DashboardController < InertiaController
  before_action :authenticate

  def index
    redirect_to instagram_index_path
  end
end
