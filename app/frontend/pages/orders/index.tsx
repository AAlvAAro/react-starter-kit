import { useState } from "react"
import { Head, Link, router } from "@inertiajs/react"
import { t } from "@/lib/i18n"
import {
  ShoppingCart,
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  MoreHorizontal,
} from "lucide-react"
import { DashboardLayout } from "@/layouts/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Order {
  id: number
  customer_name: string
  customer_email: string
  status: string
  total: string | number
  created_at: string
}

interface OrdersProps {
  orders: Order[]
}

const statusColors: Record<string, string> = {
  draft: "bg-gray-100 text-gray-800",
  pending: "bg-yellow-100 text-yellow-800",
  sent: "bg-blue-100 text-blue-800",
  accepted: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  completed: "bg-purple-100 text-purple-800",
}

export default function Orders({ orders }: OrdersProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer_email.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  const getStatusLabel = (status: string) => {
    return t(`orders.status_${status}`)
  }

  return (
    <DashboardLayout>
      <Head title={t("orders.title")} />

      <div className="space-y-6">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">{t("orders.title")}</h1>
              <p className="text-muted-foreground text-sm">
                {t("orders.subtitle")}
              </p>
            </div>
          </div>
          <Button asChild>
            <Link href="/orders/new">
              <Plus className="w-4 h-4 mr-2" />
              {t("orders.new_order")}
            </Link>
          </Button>
        </div>

        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={t("orders.search_orders")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Orders table */}
        {filteredOrders.length > 0 && (
          <div className="stat-card overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    {t("orders.customer")}
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    {t("orders.status")}
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    {t("orders.total")}
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    {t("orders.date")}
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                    {t("orders.actions")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-border last:border-0 hover:bg-muted/50 cursor-pointer"
                    onClick={() => router.visit(`/orders/${order.id}`)}
                  >
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{order.customer_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.customer_email}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="secondary"
                        className={statusColors[order.status]}
                      >
                        {getStatusLabel(order.status)}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 font-medium">
                      ${Number(order.total).toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/orders/${order.id}`}>
                              <Eye className="w-4 h-4 mr-2" />
                              {t("orders.view")}
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/orders/${order.id}/edit`}>
                              <Pencil className="w-4 h-4 mr-2" />
                              {t("orders.edit")}
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={(e) => {
                              e.stopPropagation()
                              if (confirm(t("orders.delete") + "?")) {
                                router.delete(`/orders/${order.id}`)
                              }
                            }}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            {t("orders.delete")}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Empty state */}
        {filteredOrders.length === 0 && (
          <div className="empty-state">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
              <ShoppingCart className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-1">{t("orders.no_orders")}</h3>
            <p className="text-muted-foreground text-sm max-w-sm">
              {t("orders.no_orders_hint")}
            </p>
            {!searchQuery && (
              <Button className="mt-4" asChild>
                <Link href="/orders/new">
                  <Plus className="w-4 h-4 mr-2" />
                  {t("orders.add_order")}
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
