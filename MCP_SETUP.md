# MCP Server Setup Guide

This Rails application is configured as an MCP (Model Context Protocol) server using FastMCP, allowing AI assistants like Claude to interact with your application.

## What's Included

### Tools (Actions AI can perform)
- **ListUsersTool** - List users with optional filtering by role
- **ListPlansTool** - List subscription plans
- **CreateUserTool** - Create new users
- **DatabaseQueryTool** - Execute read-only SQL queries (SELECT only)

### Resources (Data AI can read)
- **AppInfoResource** (`app://info`) - Application metadata
- **RoutesResource** (`app://routes`) - All application routes

## Testing the MCP Server

### 1. Start Your Rails Server
```bash
bin/dev
# or
rails s
```

### 2. Test MCP Endpoints

#### Check Server Status
```bash
curl http://localhost:3000/mcp/sse
```

#### List Available Tools
```bash
curl -X POST http://localhost:3000/mcp/messages \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/list"
  }'
```

#### Call a Tool (List Users)
```bash
curl -X POST http://localhost:3000/mcp/messages \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "tools/call",
    "params": {
      "name": "list_users",
      "arguments": {
        "limit": 5
      }
    }
  }'
```

#### Read a Resource
```bash
curl -X POST http://localhost:3000/mcp/messages \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 3,
    "method": "resources/read",
    "params": {
      "uri": "app://info"
    }
  }'
```

## Connect to Claude Desktop

Add this to your Claude Desktop config file:

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "react-starter-kit": {
      "command": "curl",
      "args": [
        "-N",
        "-H",
        "Accept: text/event-stream",
        "http://localhost:3000/mcp/sse"
      ],
      "transport": "sse"
    }
  }
}
```

**Note:** Your Rails server must be running on port 3000 for Claude to connect.

## Creating Custom Tools

Create a new tool in `app/tools/`:

```ruby
# app/tools/my_custom_tool.rb
class MyCustomTool < ApplicationTool
  description "What this tool does"
  
  argument :param_name, type: :string, description: "Parameter description", required: true
  
  def call(param_name:)
    # Your logic here
    { result: "success" }
  end
end
```

## Creating Custom Resources

Create a new resource in `app/resources/`:

```ruby
# app/resources/my_resource.rb
class MyResource < ApplicationResource
  uri "app://my-resource"
  name "My Resource"
  description "What this resource provides"
  mime_type "application/json"
  
  def read
    { data: "your data" }.to_json
  end
end
```

## Security Notes

- The MCP server is configured to only accept connections from localhost by default
- DatabaseQueryTool only allows SELECT queries for security
- Consider enabling authentication in production (see `config/initializers/fast_mcp.rb`)

## Troubleshooting

### Tools not appearing
1. Restart your Rails server
2. Check that your tool class inherits from `ApplicationTool`
3. Check Rails logs for errors

### Claude can't connect
1. Ensure Rails server is running on port 3000
2. Check `claude_desktop_config.json` syntax
3. Restart Claude Desktop after config changes
4. Check Rails logs for connection attempts
