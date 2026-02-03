# frozen_string_literal: true

FactoryBot.define do
  factory :plan do
    sequence(:name) { |n| "Plan #{n}" }
    description { "A test plan" }
    price_cents { 2999 }
    interval { "month" }
    currency { "usd" }
    active { true }
    position { 1 }
    features { ["Feature 1", "Feature 2", "Feature 3"] }
    sequence(:stripe_product_id) { |n| "prod_test_#{n}" }
    sequence(:stripe_price_id) { |n| "price_test_#{n}" }

    trait :basic do
      name { "Plan Básico" }
      description { "Este es el plan mas barato" }
      price_cents { 2999 }
      interval { "month" }
      currency { "mxn" }
    end

    trait :pro do
      name { "Plan Pro" }
      description { "Plan profesional con todas las características" }
      price_cents { 9999 }
      interval { "month" }
      currency { "usd" }
    end

    trait :yearly do
      name { "Plan Anual" }
      description { "Plan anual con descuento" }
      price_cents { 99999 }
      interval { "year" }
      currency { "usd" }
    end

    trait :one_time do
      name { "Pago Único" }
      description { "Acceso de por vida" }
      price_cents { 29999 }
      interval { "one_time" }
      currency { "usd" }
    end

    trait :inactive do
      name { "Plan Inactivo" }
      description { "Este plan ya no está disponible" }
      active { false }
    end
  end
end
