# frozen_string_literal: true

class ListUsersTool < ApplicationTool
  description "List all users in the system with their details"

  arguments do
    optional(:limit).filled(:integer).description("Maximum number of users to return")
    optional(:role).filled(:string).description("Filter by role (user, admin, super_admin)")
  end

  def call(limit: 10, role: nil)
    users = User.all
    users = users.where(role: role) if role.present?
    users = users.limit(limit)

    {
      total_count: User.count,
      filtered_count: users.count,
      users: users.map do |user|
        {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          verified: user.verified,
          locale: user.locale,
          created_at: user.created_at.iso8601
        }
      end
    }
  end
end
