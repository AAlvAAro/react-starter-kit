# frozen_string_literal: true

require "test_helper"

class Settings::BillingControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
    @plan = plans(:basic)
    sign_in @user
  end

  test "should get show" do
    get settings_billing_url
    assert_response :success
  end

  test "should display current plan when user has one" do
    @user.update!(current_plan: @plan, subscription_status: "active")

    get settings_billing_url
    assert_response :success
  end

  test "should not cancel when no subscription exists" do
    @user.update!(stripe_subscription_id: nil)

    post cancel_settings_billing_url
    assert_redirected_to settings_billing_url
    assert_not_nil flash[:alert]
  end

  test "should require authentication" do
    sign_out @user

    get settings_billing_url
    assert_redirected_to sign_in_url
  end
end
