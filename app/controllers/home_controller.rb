# frozen_string_literal: true

class HomeController < InertiaController
  skip_before_action :authenticate, only: [:index]
  # before_action :perform_authentication

  def index
    render inertia: "home/index"
  end
end
