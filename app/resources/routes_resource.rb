# frozen_string_literal: true

class RoutesResource < ApplicationResource
  uri "app://routes"
  resource_name "Application Routes"
  description "List of all available routes in the Rails application"
  mime_type "application/json"

  def content
    routes = Rails.application.routes.routes.map do |route|
      {
        verb: route.verb,
        path: route.path.spec.to_s,
        controller_action: "#{route.defaults[:controller]}##{route.defaults[:action]}",
        name: route.name
      }
    end.compact.select { |r| r[:controller_action] != "#" }

    {
      count: routes.count,
      routes: routes
    }.to_json
  end
end
