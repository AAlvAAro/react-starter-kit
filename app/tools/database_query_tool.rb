# frozen_string_literal: true

class DatabaseQueryTool < ApplicationTool
  description "Execute a read-only SQL query against the database (SELECT queries only)"

  arguments do
    required(:query).filled(:string).description("SQL SELECT query to execute")
  end

  def call(query:)
    # Security: Only allow SELECT queries
    unless query.strip.match?(/\A\s*SELECT/i)
      return {
        success: false,
        error: "Only SELECT queries are allowed for security reasons"
      }
    end

    begin
      results = ActiveRecord::Base.connection.execute(query)

      {
        success: true,
        row_count: results.count,
        results: results.to_a
      }
    rescue ActiveRecord::StatementInvalid => e
      {
        success: false,
        error: "SQL Error: #{e.message}"
      }
    rescue StandardError => e
      {
        success: false,
        error: "Error: #{e.message}"
      }
    end
  end
end
