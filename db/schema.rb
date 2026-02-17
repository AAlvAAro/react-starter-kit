# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_02_17_202101) do
  create_table "instagram_profiles", force: :cascade do |t|
    t.string "avatar"
    t.string "avatar_hd"
    t.text "bio"
    t.json "bio_links"
    t.json "business_insights_data"
    t.json "business_strategy_data"
    t.json "business_templates_data"
    t.datetime "created_at", null: false
    t.string "external_link"
    t.integer "followers_count"
    t.integer "following_count"
    t.json "insights_data"
    t.datetime "insights_generated_at"
    t.boolean "is_business"
    t.boolean "is_verified"
    t.datetime "last_fetched_at"
    t.json "message_templates_data"
    t.string "name"
    t.json "personal_insights_data"
    t.json "personal_strategy_data"
    t.json "personal_templates_data"
    t.json "personas_data"
    t.integer "posts_count"
    t.json "posts_data"
    t.json "raw_data"
    t.json "strategy_data"
    t.datetime "updated_at", null: false
    t.string "username"
    t.index ["username"], name: "index_instagram_profiles_on_username", unique: true
  end

  create_table "plans", force: :cascade do |t|
    t.boolean "active", default: true, null: false
    t.datetime "created_at", null: false
    t.integer "credits"
    t.string "currency", default: "usd"
    t.text "description"
    t.text "features"
    t.string "interval", default: "month"
    t.string "name", null: false
    t.integer "position", default: 0
    t.integer "price_cents", default: 0, null: false
    t.string "stripe_price_id"
    t.string "stripe_product_id"
    t.datetime "updated_at", null: false
    t.index ["active"], name: "index_plans_on_active"
    t.index ["position"], name: "index_plans_on_position"
    t.index ["stripe_price_id"], name: "index_plans_on_stripe_price_id", unique: true
  end

  create_table "profile_searches", force: :cascade do |t|
    t.datetime "completed_at"
    t.datetime "created_at", null: false
    t.text "error_message"
    t.integer "instagram_profile_id", null: false
    t.string "purpose"
    t.datetime "searched_at"
    t.string "status", default: "pending"
    t.datetime "updated_at", null: false
    t.integer "user_id", null: false
    t.index ["instagram_profile_id"], name: "index_profile_searches_on_instagram_profile_id"
    t.index ["user_id"], name: "index_profile_searches_on_user_id"
  end

  create_table "sessions", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "ip_address"
    t.datetime "updated_at", null: false
    t.string "user_agent"
    t.integer "user_id", null: false
    t.index ["user_id"], name: "index_sessions_on_user_id"
  end

  create_table "tiktok_profiles", force: :cascade do |t|
    t.string "avatar"
    t.string "avatar_hd"
    t.text "bio"
    t.string "bio_link"
    t.json "business_insights_data"
    t.json "business_strategy_data"
    t.json "business_templates_data"
    t.datetime "created_at", null: false
    t.integer "followers_count"
    t.integer "following_count"
    t.integer "hearts_count"
    t.boolean "is_business", default: false
    t.boolean "is_private", default: false
    t.boolean "is_verified", default: false
    t.string "language"
    t.datetime "last_fetched_at"
    t.string "name"
    t.json "personal_insights_data"
    t.json "personal_strategy_data"
    t.json "personal_templates_data"
    t.integer "posts_count"
    t.datetime "profile_created_at"
    t.json "raw_data"
    t.datetime "updated_at", null: false
    t.string "username", null: false
    t.index ["username"], name: "index_tiktok_profiles_on_username", unique: true
  end

  create_table "tiktok_searches", force: :cascade do |t|
    t.datetime "completed_at"
    t.datetime "created_at", null: false
    t.text "error_message"
    t.datetime "searched_at"
    t.string "status", default: "pending"
    t.integer "tiktok_profile_id", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id", null: false
    t.index ["tiktok_profile_id"], name: "index_tiktok_searches_on_tiktok_profile_id"
    t.index ["user_id", "tiktok_profile_id"], name: "index_tiktok_searches_on_user_id_and_tiktok_profile_id", unique: true
    t.index ["user_id"], name: "index_tiktok_searches_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.integer "credits_remaining", default: 0, null: false
    t.integer "current_plan_id"
    t.string "email", null: false
    t.string "locale", default: "es-MX"
    t.string "mcp_token"
    t.string "name", null: false
    t.string "password_digest", null: false
    t.string "phone"
    t.integer "role", default: 0, null: false
    t.string "stripe_customer_id"
    t.string "stripe_subscription_id"
    t.string "subscription_status"
    t.datetime "updated_at", null: false
    t.boolean "verified", default: false, null: false
    t.index ["current_plan_id"], name: "index_users_on_current_plan_id"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["role"], name: "index_users_on_role"
    t.index ["stripe_customer_id"], name: "index_users_on_stripe_customer_id", unique: true
    t.index ["stripe_subscription_id"], name: "index_users_on_stripe_subscription_id", unique: true
  end

  add_foreign_key "profile_searches", "instagram_profiles"
  add_foreign_key "profile_searches", "users"
  add_foreign_key "sessions", "users"
  add_foreign_key "tiktok_searches", "tiktok_profiles"
  add_foreign_key "tiktok_searches", "users"
  add_foreign_key "users", "plans", column: "current_plan_id"
end
