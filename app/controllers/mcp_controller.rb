# frozen_string_literal: true

class McpController < ApplicationController
  def index
    # Initialize MCP client connection
    begin
      client = RubyLLM::MCP.client(
        name: "filesystem-server",
        transport_type: :stdio,
        config: {
          command: "npx",
          args: ["@modelcontextprotocol/server-filesystem", Rails.root.to_s]
        }
      )

      # Check if connection is alive
      is_alive = client.alive?

      # Get server info
      server_info = {
        name: "filesystem-server",
        alive: is_alive,
        status: is_alive ? "connected" : "disconnected",
        message: "Hello from MCP! This is a Model Context Protocol server connection.",
        root_path: Rails.root.to_s
      }

      render json: server_info
    rescue StandardError => e
      render json: {
        error: "MCP connection failed",
        message: e.message,
        status: "error"
      }, status: :internal_server_error
    end
  end
end
