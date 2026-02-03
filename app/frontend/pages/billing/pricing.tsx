import { Head, Link, router } from "@inertiajs/react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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

export default function Pricing({ plans, stripe_publishable_key, payment_mode }: PricingProps) {
  const handleCheckout = (planId: number) => {
    // Create a form and submit it to trigger a full page navigation
    const form = document.createElement('form')
    form.method = 'POST'
    form.action = '/billing/checkout'

    // Add CSRF token
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
    if (csrfToken) {
      const csrfInput = document.createElement('input')
      csrfInput.type = 'hidden'
      csrfInput.name = 'authenticity_token'
      csrfInput.value = csrfToken
      form.appendChild(csrfInput)
    }

    // Add plan_id
    const planInput = document.createElement('input')
    planInput.type = 'hidden'
    planInput.name = 'plan_id'
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
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">R</span>
              </div>
              <span className="font-semibold">React Starter Kit</span>
            </Link>
            <nav className="flex items-center gap-4">
              <Link href="/sign_in" className="text-sm text-muted-foreground hover:text-foreground">
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
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">{t("pricing.title")}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("pricing.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={plan.id}
                className={`relative ${index === 1 ? "border-primary shadow-lg scale-105" : ""}`}
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
                    <span className="text-4xl font-bold">{plan.formatted_price}</span>
                    <span className="text-muted-foreground ml-2">
                      {getIntervalLabel(plan.interval)}
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
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
        <footer className="border-t border-border py-8">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>{t("pricing.secure_payments")}</p>
          </div>
        </footer>
      </div>
    </>
  )
}
