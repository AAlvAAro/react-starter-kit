# frozen_string_literal: true

class DashboardController < InertiaController
  before_action :authenticate

  def index
    render inertia: "dashboard/index"
  end
end
