# frozen_string_literal: true

class DatabaseStatsResource < ApplicationResource
  uri "app://database/stats"
  resource_name "Database Statistics"
  description "Statistics about the database tables and records"
  mime_type "application/json"

  def content
    stats = {
      total_users: User.count,
      verified_users: User.where(verified: true).count,
      total_plans: Plan.count,
      active_plans: Plan.active.count,
      users_by_role: User.group(:role).count,
      plans_by_interval: Plan.group(:interval).count,
      recent_users: User.order(created_at: :desc).limit(5).pluck(:email, :created_at).map do |email, created_at|
        { email: email, created_at: created_at.iso8601 }
      end
    }

    stats.to_json
  end
end
