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

ActiveRecord::Schema[8.1].define(version: 2026_02_07_111026) do
  create_table "plans", force: :cascade do |t|
    t.boolean "active", default: true, null: false
    t.datetime "created_at", null: false
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

  create_table "receipts", force: :cascade do |t|
    t.datetime "cancelled_at"
    t.datetime "created_at", null: false
    t.string "customer_id"
    t.string "dining_option"
    t.string "employee_id"
    t.json "line_items", default: []
    t.string "loyverse_id"
    t.text "note"
    t.string "order"
    t.json "payments", default: []
    t.decimal "points_balance"
    t.decimal "points_deducted"
    t.decimal "points_earned"
    t.string "pos_device_id"
    t.datetime "receipt_date"
    t.string "receipt_number"
    t.string "receipt_type"
    t.string "refund_for"
    t.string "source"
    t.string "store_id"
    t.decimal "surcharge"
    t.decimal "tip"
    t.decimal "total_discount"
    t.json "total_discounts", default: []
    t.decimal "total_money"
    t.decimal "total_tax"
    t.json "total_taxes", default: []
    t.datetime "updated_at", null: false
    t.integer "user_id", null: false
    t.index ["loyverse_id"], name: "index_receipts_on_loyverse_id", unique: true
    t.index ["receipt_date"], name: "index_receipts_on_receipt_date"
    t.index ["receipt_type"], name: "index_receipts_on_receipt_type"
    t.index ["user_id"], name: "index_receipts_on_user_id"
  end

  create_table "sessions", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "ip_address"
    t.datetime "updated_at", null: false
    t.string "user_agent"
    t.integer "user_id", null: false
    t.index ["user_id"], name: "index_sessions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.integer "current_plan_id"
    t.string "email", null: false
    t.string "locale", default: "es-MX"
    t.string "mcp_token"
    t.string "name", null: false
    t.string "password_digest", null: false
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

  add_foreign_key "receipts", "users"
  add_foreign_key "sessions", "users"
  add_foreign_key "users", "plans", column: "current_plan_id"
end
