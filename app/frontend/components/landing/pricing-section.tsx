import { Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    features: [
      "Up to 15 products",
      "Shareable catalog link",
      "Basic WhatsApp link",
      "Business profile",
      "Basic analytics",
    ],
    cta: "Get started free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "per month",
    description: "For growing businesses",
    features: [
      "Up to 50 products",
      "WhatsApp order notifications",
      "Meta catalog sync",
      "Custom domain",
      "Priority support",
      "Advanced analytics",
    ],
    cta: "Start Pro trial",
    highlighted: true,
  },
  {
    name: "Business",
    price: "$29",
    period: "per month",
    description: "For established stores",
    features: [
      "Unlimited products",
      "Everything in Pro",
      "TikTok catalog sync",
      "AI insights & suggestions",
      "Multiple catalogs",
      "Dedicated account manager",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start free, upgrade when you're ready. No hidden fees, no surprises.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={cn(
                "relative rounded-2xl p-8 border transition-all duration-300",
                plan.highlighted
                  ? "bg-primary text-primary-foreground border-primary shadow-xl scale-105"
                  : "bg-card border-border hover:border-primary/20 hover:shadow-lg"
              )}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-success text-success-foreground text-sm font-medium">
                  Most popular
                </div>
              )}

              <div className="mb-6">
                <h3
                  className={cn(
                    "text-xl font-semibold mb-2",
                    plan.highlighted
                      ? "text-primary-foreground"
                      : "text-foreground"
                  )}
                >
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span
                    className={cn(
                      "text-4xl font-bold",
                      plan.highlighted
                        ? "text-primary-foreground"
                        : "text-foreground"
                    )}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={cn(
                      "text-sm",
                      plan.highlighted
                        ? "text-primary-foreground/80"
                        : "text-muted-foreground"
                    )}
                  >
                    /{plan.period}
                  </span>
                </div>
                <p
                  className={cn(
                    "text-sm mt-2",
                    plan.highlighted
                      ? "text-primary-foreground/80"
                      : "text-muted-foreground"
                  )}
                >
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check
                      className={cn(
                        "w-4 h-4 flex-shrink-0",
                        plan.highlighted ? "text-success" : "text-success"
                      )}
                    />
                    <span
                      className={cn(
                        "text-sm",
                        plan.highlighted
                          ? "text-primary-foreground/90"
                          : "text-muted-foreground"
                      )}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                variant={plan.highlighted ? "secondary" : "default"}
                asChild
              >
                <Link href="/sign_up">{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}