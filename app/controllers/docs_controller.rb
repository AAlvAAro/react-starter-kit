# frozen_string_literal: true

class DocsController < ApplicationController
  skip_before_action :authenticate, only: [:index]

  def index
    render inertia: "docs/index"
  end
end
