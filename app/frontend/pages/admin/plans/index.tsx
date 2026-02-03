import { Head, Link, router } from "@inertiajs/react"
import { Plus, Pencil, Trash2, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { DashboardLayout } from "@/layouts/dashboard-layout"
import { t } from "@/lib/i18n"

interface Plan {
  id: number
  name: string
  description: string
  stripe_price_id: string
  stripe_product_id: string
  price_cents: number
  formatted_price: string
  interval: string
  currency: string
  features: string[]
  active: boolean
  position: number
}

interface PlansIndexProps {
  plans: Plan[]
}

export default function PlansIndex({ plans }: PlansIndexProps) {
  const handleDelete = (planId: number) => {
    router.delete(`/plans/${planId}`)
  }

  const getIntervalLabel = (interval: string) => {
    switch (interval) {
      case "month":
        return t("admin.plans.monthly")
      case "year":
        return t("admin.plans.yearly")
      case "one_time":
        return t("admin.plans.one_time")
      default:
        return interval
    }
  }

  return (
    <DashboardLayout>
      <Head title={t("admin.plans.title")} />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{t("admin.plans.title")}</h1>
            <p className="text-muted-foreground">{t("admin.plans.subtitle")}</p>
          </div>
          <Button asChild>
            <Link href="/plans/new">
              <Plus className="w-4 h-4 mr-2" />
              {t("admin.plans.new")}
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t("admin.plans.list")}</CardTitle>
            <CardDescription>{t("admin.plans.list_description")}</CardDescription>
          </CardHeader>
          <CardContent>
            {plans.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {t("admin.plans.empty")}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("admin.plans.name")}</TableHead>
                    <TableHead>{t("admin.plans.price")}</TableHead>
                    <TableHead>{t("admin.plans.interval")}</TableHead>
                    <TableHead>{t("admin.plans.status")}</TableHead>
                    <TableHead>{t("admin.plans.stripe_id")}</TableHead>
                    <TableHead className="text-right">{t("admin.plans.actions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {plans.map((plan) => (
                    <TableRow key={plan.id}>
                      <TableCell className="font-medium">{plan.name}</TableCell>
                      <TableCell>{plan.formatted_price}</TableCell>
                      <TableCell>{getIntervalLabel(plan.interval)}</TableCell>
                      <TableCell>
                        {plan.active ? (
                          <Badge variant="default" className="bg-green-500">
                            <Check className="w-3 h-3 mr-1" />
                            {t("admin.plans.active")}
                          </Badge>
                        ) : (
                          <Badge variant="secondary">
                            <X className="w-3 h-3 mr-1" />
                            {t("admin.plans.inactive")}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {plan.stripe_price_id || "-"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/plans/${plan.id}/edit`}>
                              <Pencil className="w-4 h-4" />
                            </Link>
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>{t("admin.plans.delete_confirm_title")}</AlertDialogTitle>
                                <AlertDialogDescription>
                                  {t("admin.plans.delete_confirm_description", { name: plan.name })}
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>{t("actions.cancel")}</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(plan.id)}>
                                  {t("actions.delete")}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
