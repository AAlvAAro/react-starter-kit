import { Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { t } from "@/lib/i18n"

const getPlans = () => [
  {
    name: t("landing.pricing.free.name"),
    price: t("landing.pricing.free.price"),
    period: t("landing.pricing.free.period"),
    description: t("landing.pricing.free.desc"),
    features: [
      t("landing.pricing.free.f1"),
      t("landing.pricing.free.f2"),
      t("landing.pricing.free.f3"),
      t("landing.pricing.free.f4"),
      t("landing.pricing.free.f5"),
    ],
    cta: t("landing.pricing.free.cta"),
    highlighted: false,
  },
  {
    name: t("landing.pricing.pro.name"),
    price: t("landing.pricing.pro.price"),
    period: t("landing.pricing.pro.period"),
    description: t("landing.pricing.pro.desc"),
    features: [
      t("landing.pricing.pro.f1"),
      t("landing.pricing.pro.f2"),
      t("landing.pricing.pro.f3"),
      t("landing.pricing.pro.f4"),
      t("landing.pricing.pro.f5"),
      t("landing.pricing.pro.f6"),
    ],
    cta: t("landing.pricing.pro.cta"),
    highlighted: true,
  },
  {
    name: t("landing.pricing.business.name"),
    price: t("landing.pricing.business.price"),
    period: t("landing.pricing.business.period"),
    description: t("landing.pricing.business.desc"),
    features: [
      t("landing.pricing.business.f1"),
      t("landing.pricing.business.f2"),
      t("landing.pricing.business.f3"),
      t("landing.pricing.business.f4"),
      t("landing.pricing.business.f5"),
      t("landing.pricing.business.f6"),
    ],
    cta: t("landing.pricing.business.cta"),
    highlighted: false,
  },
]

export function PricingSection() {
  const plans = getPlans()

  return (
    <section id="pricing" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("landing.pricing.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("landing.pricing.subtitle")}
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
                  {t("landing.pricing.most_popular")}
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