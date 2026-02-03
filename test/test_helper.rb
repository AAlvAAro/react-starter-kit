# frozen_string_literal: true

ENV["RAILS_ENV"] ||= "test"
require_relative "../config/environment"
require "rails/test_help"
require "ostruct"

module ActiveSupport
  class TestCase
    # Run tests in parallel with specified workers
    parallelize(workers: :number_of_processors)

    # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
    fixtures :all

    # Add more helper methods to be used by all tests here...
  end
end

module ActionDispatch
  class IntegrationTest
    def sign_in(user)
      session = ::Session.create!(user: user)
      # Set the session token in cookies for authentication
      post sign_in_url, params: { email: user.email, password: "password" }
    end

    def sign_out(user)
      # Clear the session by deleting all sessions for the user
      user.sessions.destroy_all
    end
  end
end
