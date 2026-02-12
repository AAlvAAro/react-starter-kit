# frozen_string_literal: true

# FastMcp - Model Context Protocol for Rails
# This initializer sets up the MCP middleware in your Rails application.
#
# In Rails applications, you can use:
# - ActionTool::Base as an alias for FastMcp::Tool
# - ActionResource::Base as an alias for FastMcp::Resource
#
# All your tools should inherit from ApplicationTool which already uses ActionTool::Base,
# and all your resources should inherit from ApplicationResource which uses ActionResource::Base.

# Mount the MCP middleware in your Rails application
# You can customize the options below to fit your needs.
require 'fast_mcp'

fast_mcp_options = {
  name: Rails.application.class.module_parent_name.underscore.dasherize,
  version: '1.0.0',
  path_prefix: '/mcp',
  messages_route: 'messages',
  sse_route: 'sse'
}

if Rails.env.development?
  # In development, allow localhost and ngrok for easier testing
  fast_mcp_options[:allowed_origins] = ['localhost', '127.0.0.1', '[::1]', /.*\.ngrok-free\.app/, /.*\.ngrok\.io/]
  fast_mcp_options[:localhost_only] = false
else
  # In non-development environments, require authentication
  fast_mcp_options[:authenticate] = true
  fast_mcp_options[:auth_token] =
    ENV.fetch('FAST_MCP_AUTH_TOKEN') do
      Rails.application.credentials.dig(:fast_mcp, :auth_token)
    end
end

FastMcp.mount_in_rails(
  Rails.application,
  **fast_mcp_options
) do |server|
  Rails.application.config.after_initialize do
    # Eager load tools and resources in development to ensure they're discovered
    Rails.autoloaders.main.eager_load_dir(Rails.root.join("app/tools")) if Rails.env.development?
    Rails.autoloaders.main.eager_load_dir(Rails.root.join("app/resources")) if Rails.env.development?

    # FastMcp will automatically discover and register:
    # - All classes that inherit from ApplicationTool (which uses ActionTool::Base)
    # - All classes that inherit from ApplicationResource (which uses ActionResource::Base)
    server.register_tools(*ApplicationTool.descendants)
    server.register_resources(*ApplicationResource.descendants)
    # alternatively, you can register tools and resources manually:
    # server.register_tool(MyTool)
    # server.register_resource(MyResource)
  end
end
