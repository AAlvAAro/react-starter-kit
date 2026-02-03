import { Head, router, usePage } from "@inertiajs/react"
import { CreditCard, Calendar, DollarSign, AlertCircle } from "lucide-react"

import HeadingSmall from "@/components/heading-small"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DashboardLayout } from "@/layouts/dashboard-layout"
import SettingsLayout from "@/layouts/settings/layout"
import { t } from "@/lib/i18n"

interface Plan {
  id: number
  name: string
  description: string
  formatted_price: string
  interval: string
}

interface Payment {
  id: string
  amount: number
  currency: string
  status: string
  created: number
  description: string
}

interface BillingProps {
  current_plan: Plan | null
  subscription_status: string | null
  payments: Payment[]
  stripe_customer_id: string | null
  [key: string]: any
}

export default function Billing() {
  const { current_plan, subscription_status, payments, stripe_customer_id } = usePage<BillingProps>().props

  const handleCancelSubscription = () => {
    if (!confirm(t("settings.billing.cancel_confirm"))) {
      return
    }

    router.post("/settings/billing/cancel", {}, {
      onSuccess: () => {
        alert(t("settings.billing.cancel_success"))
      },
      onError: () => {
        alert(t("settings.billing.cancel_error"))
      }
    })
  }

  const handleManageBilling = () => {
    router.post("/billing/portal", {}, {
      preserveScroll: true
    })
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString()
  }

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase()
    }).format(amount / 100)
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      active: "default",
      succeeded: "default",
      canceled: "secondary",
      past_due: "destructive",
      incomplete: "outline",
      canceling: "secondary",
      one_time: "default"
    }

    const translatedStatus = t(`settings.billing.status.${status}`)
    return <Badge variant={variants[status] || "outline"}>{translatedStatus}</Badge>
  }

  const getIntervalLabel = (interval: string) => {
    const labels: Record<string, string> = {
      month: t("settings.billing.monthly"),
      year: t("settings.billing.yearly"),
      one_time: t("settings.billing.one_time")
    }
    return labels[interval] || interval
  }

  return (
    <DashboardLayout>
      <Head title={t("settings.billing.title")} />

      <SettingsLayout>
        <div className="space-y-6">
          <HeadingSmall
            title={t("settings.billing.title")}
            description={t("settings.billing.subtitle")}
          />

          {/* Current Plan */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                {t("settings.billing.current_plan")}
              </CardTitle>
              <CardDescription>{t("settings.billing.current_plan_description")}</CardDescription>
            </CardHeader>
            <CardContent>
              {current_plan ? (
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{current_plan.name}</h3>
                      <p className="text-sm text-muted-foreground">{current_plan.description}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-2xl font-bold">{current_plan.formatted_price}</span>
                        <span className="text-sm text-muted-foreground">
                          {getIntervalLabel(current_plan.interval)}
                        </span>
                      </div>
                    </div>
                    {subscription_status && (
                      <div>
                        {getStatusBadge(subscription_status)}
                      </div>
                    )}
                  </div>

                  {subscription_status === "active" && (
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={handleManageBilling}>
                        {t("settings.billing.manage_billing")}
                      </Button>
                      <Button variant="destructive" onClick={handleCancelSubscription}>
                        {t("settings.billing.cancel_subscription")}
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground mb-4">{t("settings.billing.no_plan")}</p>
                  <Button asChild>
                    <a href="/pricing">{t("settings.billing.view_plans")}</a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                {t("settings.billing.payment_history")}
              </CardTitle>
              <CardDescription>{t("settings.billing.payment_history_description")}</CardDescription>
            </CardHeader>
            <CardContent>
              {payments && payments.length > 0 ? (
                <div className="space-y-4">
                  {payments.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0"
                    >
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">{payment.description || t("settings.billing.payment")}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(payment.created)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatAmount(payment.amount, payment.currency)}</p>
                        {getStatusBadge(payment.status)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">{t("settings.billing.no_payments")}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Info Alert */}
          {stripe_customer_id && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {t("settings.billing.stripe_info")}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </SettingsLayout>
    </DashboardLayout>
  )
}
