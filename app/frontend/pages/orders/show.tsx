import { Head, Link, router } from "@inertiajs/react"
import { ArrowLeft, Mail, MessageSquare, Pencil, Trash2 } from "lucide-react"
import { DashboardLayout } from "@/layouts/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { t } from "@/lib/i18n"

interface OrderItem {
  id: number
  product_name: string
  quantity: number
  price: string | number
  subtotal: string | number
}

interface Customer {
  id: number
  name: string
  email: string
  phone: string | null
}

interface Order {
  id: number
  customer: Customer
  status: string
  total: string | number
  notes: string | null
  created_at: string
  items: OrderItem[]
}

interface ShowOrderProps {
  order: Order
}

const statusColors: Record<string, string> = {
  draft: "bg-gray-100 text-gray-800",
  pending: "bg-yellow-100 text-yellow-800",
  sent: "bg-blue-100 text-blue-800",
  accepted: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  completed: "bg-purple-100 text-purple-800",
}

export default function ShowOrder({ order }: ShowOrderProps) {
  const handleDelete = () => {
    if (confirm(t("orders.delete") + "?")) {
      router.delete(`/orders/${order.id}`)
    }
  }

  const handleSendEmail = () => {
    alert(t("orders.send_via_email") + " - " + "Transactional notifications will be set up later")
  }

  const handleSendWhatsApp = () => {
    alert(t("orders.send_via_whatsapp") + " - " + "Transactional notifications will be set up later")
  }

  const getStatusLabel = (status: string) => {
    return t(`orders.status_${status}`)
  }

  return (
    <DashboardLayout>
      <Head title={`${t("orders.title")} #${order.id}`} />

      <div className="max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.visit("/orders")}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-semibold">
                {t("orders.title")} #{order.id}
              </h1>
              <p className="text-muted-foreground text-sm">
                {new Date(order.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleSendEmail}>
              <Mail className="w-4 h-4 mr-2" />
              {t("orders.send_via_email")}
            </Button>
            <Button variant="outline" onClick={handleSendWhatsApp}>
              <MessageSquare className="w-4 h-4 mr-2" />
              {t("orders.send_via_whatsapp")}
            </Button>
            <Button variant="outline" asChild>
              <Link href={`/orders/${order.id}/edit`}>
                <Pencil className="w-4 h-4 mr-2" />
                {t("orders.edit")}
              </Link>
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="w-4 h-4 mr-2" />
              {t("orders.delete")}
            </Button>
          </div>
        </div>

        {/* Order details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Customer Info */}
          <div className="stat-card">
            <h3 className="font-semibold mb-4">{t("orders.customer")}</h3>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">{t("customers.name")}</p>
                <p className="font-medium">{order.customer.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("customers.email")}</p>
                <p className="font-medium">{order.customer.email}</p>
              </div>
              {order.customer.phone && (
                <div>
                  <p className="text-sm text-muted-foreground">{t("customers.phone")}</p>
                  <p className="font-medium">{order.customer.phone}</p>
                </div>
              )}
            </div>
          </div>

          {/* Order Status */}
          <div className="stat-card">
            <h3 className="font-semibold mb-4">{t("orders.status")}</h3>
            <Badge
              variant="secondary"
              className={`${statusColors[order.status]} text-base px-4 py-2`}
            >
              {getStatusLabel(order.status)}
            </Badge>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">{t("orders.total")}</p>
              <p className="text-2xl font-bold">${Number(order.total).toFixed(2)}</p>
            </div>
          </div>

          {/* Order Items */}
          <div className="stat-card lg:col-span-2">
            <h3 className="font-semibold mb-4">{t("orders.items")}</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-2 text-sm font-medium text-muted-foreground">
                      {t("orders.product")}
                    </th>
                    <th className="text-center py-2 px-2 text-sm font-medium text-muted-foreground">
                      {t("orders.quantity")}
                    </th>
                    <th className="text-right py-2 px-2 text-sm font-medium text-muted-foreground">
                      {t("orders.price")}
                    </th>
                    <th className="text-right py-2 px-2 text-sm font-medium text-muted-foreground">
                      {t("orders.subtotal")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item.id} className="border-b border-border last:border-0">
                      <td className="py-3 px-2">{item.product_name}</td>
                      <td className="py-3 px-2 text-center">{item.quantity}</td>
                      <td className="py-3 px-2 text-right">${Number(item.price).toFixed(2)}</td>
                      <td className="py-3 px-2 text-right font-medium">
                        ${Number(item.subtotal).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={3} className="py-3 px-2 text-right font-semibold">
                      {t("orders.total")}:
                    </td>
                    <td className="py-3 px-2 text-right font-bold text-lg">
                      ${Number(order.total).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Notes */}
          {order.notes && (
            <div className="stat-card lg:col-span-2">
              <h3 className="font-semibold mb-2">{t("orders.notes")}</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {order.notes}
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
