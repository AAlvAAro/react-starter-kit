# frozen_string_literal: true

# Plans
plans = [
  {
    name: "Starter",
    description: "Perfecto para probar el servicio con un perfil.",
    price_cents: 900,
    currency: "usd",
    interval: "one_time",
    credits: 1,
    position: 1,
    features: [
      "1 análisis de perfil",
      "Insights de personalidad",
      "Guía de preparación",
      "Plantillas de mensajes",
      "Análisis para negocios o citas"
    ].to_json
  },
  {
    name: "Pro",
    description: "Ideal para quienes buscan analizar varios perfiles.",
    price_cents: 2900,
    currency: "usd",
    interval: "one_time",
    credits: 5,
    position: 2,
    features: [
      "5 análisis de perfil",
      "Insights de personalidad",
      "Guía de preparación",
      "Plantillas de mensajes",
      "Análisis para negocios o citas",
      "Ahorra 42% por perfil"
    ].to_json
  },
  {
    name: "Business",
    description: "Para profesionales que necesitan análisis frecuentes.",
    price_cents: 4900,
    currency: "usd",
    interval: "one_time",
    credits: 10,
    position: 3,
    features: [
      "10 análisis de perfil",
      "Insights de personalidad",
      "Guía de preparación",
      "Plantillas de mensajes",
      "Análisis para negocios o citas",
      "Ahorra 46% por perfil",
      "Soporte prioritario"
    ].to_json
  }
]

plans.each do |plan_attrs|
  plan = Plan.find_or_initialize_by(name: plan_attrs[:name])
  plan.assign_attributes(plan_attrs)
  plan.save!
  puts "  Plan '#{plan.name}' - $#{plan.price} (#{plan.credits} créditos)"
end

puts "Seed completed!"
