# frozen_string_literal: true

class CreateUserTool < ApplicationTool
  description "Create a new user in the system"

  arguments do
    required(:name).filled(:string).description("User's full name")
    required(:email).filled(:string).description("User's email address")
    required(:password).filled(:string).description("User's password (min 8 characters)")
    optional(:role).filled(:string).description("User role (user, admin, super_admin)")
  end

  def call(name:, email:, password:, role: "user")
    user = User.new(
      name: name,
      email: email,
      password: password,
      role: role,
      verified: false
    )

    if user.save
      {
        success: true,
        message: "User created successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          verified: user.verified
        }
      }
    else
      {
        success: false,
        message: "Failed to create user",
        errors: user.errors.full_messages
      }
    end
  end
end
