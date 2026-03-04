import { Head, Link } from "@inertiajs/react"
import { Check } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { t } from "@/lib/i18n"

interface Plan {
  id: number
  name: string
  description: string
  price_cents: number
  formatted_price: string
  interval: string
  currency: string
  features: string[]
  stripe_price_id: string
}

interface PricingProps {
  plans: Plan[]
  stripe_publishable_key: string
  payment_mode: string
}

export default function Pricing({ plans }: PricingProps) {
  const handleCheckout = (planId: number) => {
    // Create a form and submit it to trigger a full page navigation
    const form = document.createElement("form")
    form.method = "POST"
    form.action = "/billing/checkout"

    // Add CSRF token
    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      ?.getAttribute("content")
    if (csrfToken) {
      const csrfInput = document.createElement("input")
      csrfInput.type = "hidden"
      csrfInput.name = "authenticity_token"
      csrfInput.value = csrfToken
      form.appendChild(csrfInput)
    }

    // Add plan_id
    const planInput = document.createElement("input")
    planInput.type = "hidden"
    planInput.name = "plan_id"
    planInput.value = planId.toString()
    form.appendChild(planInput)

    document.body.appendChild(form)
    form.submit()
  }

  const getIntervalLabel = (interval: string) => {
    switch (interval) {
      case "month":
        return t("pricing.per_month")
      case "year":
        return t("pricing.per_year")
      case "one_time":
        return t("pricing.one_time")
      default:
        return ""
    }
  }

  return (
    <>
      <Head title={t("pricing.title")} />
      <div className="bg-background min-h-screen">
        {/* Header */}
        <header className="border-border border-b">
          <div className="container mx-auto flex items-center justify-between px-4 py-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
                <span className="text-primary-foreground text-sm font-bold">
                  R
                </span>
              </div>
              <span className="font-semibold">React Starter Kit</span>
            </Link>
            <nav className="flex items-center gap-4">
              <Link
                href="/sign_in"
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                {t("auth.sign_in")}
              </Link>
              <Button asChild size="sm">
                <Link href="/sign_up">{t("auth.sign_up")}</Link>
              </Button>
            </nav>
          </div>
        </header>

        {/* Pricing Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="mb-16 text-center">
            <h1 className="mb-4 text-4xl font-bold">{t("pricing.title")}</h1>
            <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
              {t("pricing.subtitle")}
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <Card
                key={plan.id}
                className={`relative ${index === 1 ? "border-primary scale-105 shadow-lg" : ""}`}
              >
                {index === 1 && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                    {t("pricing.popular")}
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">
                      {plan.formatted_price}
                    </span>
                    <span className="text-muted-foreground ml-2">
                      {getIntervalLabel(plan.interval)}
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="text-primary h-4 w-4" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={index === 1 ? "default" : "outline"}
                    onClick={() => handleCheckout(plan.id)}
                  >
                    {t("pricing.get_started")}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-border border-t py-8">
          <div className="text-muted-foreground container mx-auto px-4 text-center text-sm">
            <p>{t("pricing.secure_payments")}</p>
          </div>
        </footer>
      </div>
    </>
  )
}
