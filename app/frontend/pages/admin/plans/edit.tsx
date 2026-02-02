import { Head, useForm, Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import AppLayout from "@/layouts/app-layout"
import { t } from "@/lib/i18n"

interface Plan {
  id: number
  name: string
  description: string
  stripe_price_id: string
  stripe_product_id: string
  price_cents: number
  interval: string
  currency: string
  features: string[]
  active: boolean
  position: number
}

interface EditPlanProps {
  plan: Plan
}

export default function EditPlan({ plan }: EditPlanProps) {
  const { data, setData, patch, processing, errors } = useForm({
    name: plan.name || "",
    description: plan.description || "",
    stripe_price_id: plan.stripe_price_id || "",
    stripe_product_id: plan.stripe_product_id || "",
    price_cents: plan.price_cents || 0,
    interval: plan.interval || "month",
    currency: plan.currency || "usd",
    active: plan.active ?? true,
    position: plan.position || 0,
    features: plan.features?.join("\n") || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    patch(`/dashboard/admin/plans/${plan.id}`)
  }

  return (
    <AppLayout>
      <Head title={t("admin.plans.edit")} />

      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{t("admin.plans.edit")}</h1>
            <p className="text-muted-foreground">{plan.name}</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t("admin.plans.edit")}</CardTitle>
            <CardDescription>{t("admin.plans.list_description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="name">{t("admin.plans.name")}</Label>
                <Input
                  id="name"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                  required
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">{t("admin.plans.description")}</Label>
                <Textarea
                  id="description"
                  value={data.description}
                  onChange={(e) => setData("description", e.target.value)}
                  rows={2}
                />
                {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price_cents">{t("admin.plans.price_cents")}</Label>
                  <Input
                    id="price_cents"
                    type="number"
                    value={data.price_cents}
                    onChange={(e) => setData("price_cents", parseInt(e.target.value) || 0)}
                    required
                  />
                  {errors.price_cents && <p className="text-sm text-destructive">{errors.price_cents}</p>}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="currency">{t("admin.plans.currency")}</Label>
                  <Select value={data.currency} onValueChange={(value) => setData("currency", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD</SelectItem>
                      <SelectItem value="mxn">MXN</SelectItem>
                      <SelectItem value="eur">EUR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="interval">{t("admin.plans.interval")}</Label>
                  <Select value={data.interval} onValueChange={(value) => setData("interval", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="month">{t("admin.plans.monthly")}</SelectItem>
                      <SelectItem value="year">{t("admin.plans.yearly")}</SelectItem>
                      <SelectItem value="one_time">{t("admin.plans.one_time")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="position">{t("admin.plans.position")}</Label>
                  <Input
                    id="position"
                    type="number"
                    value={data.position}
                    onChange={(e) => setData("position", parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="stripe_price_id">{t("admin.plans.stripe_price_id")}</Label>
                <Input
                  id="stripe_price_id"
                  value={data.stripe_price_id}
                  onChange={(e) => setData("stripe_price_id", e.target.value)}
                  placeholder="price_..."
                />
                {errors.stripe_price_id && <p className="text-sm text-destructive">{errors.stripe_price_id}</p>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="stripe_product_id">{t("admin.plans.stripe_product_id")}</Label>
                <Input
                  id="stripe_product_id"
                  value={data.stripe_product_id}
                  onChange={(e) => setData("stripe_product_id", e.target.value)}
                  placeholder="prod_..."
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="features">{t("admin.plans.features")}</Label>
                <Textarea
                  id="features"
                  value={data.features}
                  onChange={(e) => setData("features", e.target.value)}
                  rows={4}
                  placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                />
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  id="active"
                  checked={data.active}
                  onCheckedChange={(checked: boolean) => setData("active", checked)}
                />
                <Label htmlFor="active">{t("admin.plans.active")}</Label>
              </div>

              <div className="flex items-center gap-4">
                <Button type="submit" disabled={processing}>
                  {t("admin.plans.save")}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/dashboard/admin/plans">{t("actions.cancel")}</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
