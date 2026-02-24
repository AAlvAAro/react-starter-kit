import { usePage, router } from "@inertiajs/react"
import { LayoutDashboard, ShoppingCart, DollarSign, Package, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react"
import { DashboardLayout } from "@/layouts/dashboard-layout"
import { Head } from "@inertiajs/react"
import { Button } from "@/components/ui/button"

interface Order {
  id: number
  status: string
  status_id: number
  customer_id: number
  date_created: string
  total_inc_tax: string
  total_ex_tax: string
  items_total: number
  payment_method: string
  payment_status: string
  currency_code: string
}

interface Pagination {
  page: number
  per_page: number
  total_count: number
  total_pages: number
}

interface DashboardProps {
  orders: Order[]
  all_orders: Order[]
  month: string
  pagination: Pagination
  error?: string
}

export default function Dashboard() {
  const { orders, all_orders, month, pagination, error } = usePage<{ props: DashboardProps }>().props as unknown as DashboardProps

  const totalRevenue = all_orders.reduce((sum, o) => sum + parseFloat(o.total_inc_tax || "0"), 0)
  const totalOrders = all_orders.length
  const totalItems = all_orders.reduce((sum, o) => sum + (o.items_total || 0), 0)
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

  const goToPage = (page: number) => {
    router.get("/dashboard", { page }, { preserveState: true, preserveScroll: true })
  }

  const statusCounts: Record<string, number> = {}
  all_orders.forEach((o) => {
    statusCounts[o.status] = (statusCounts[o.status] || 0) + 1
  })

  return (
    <DashboardLayout>
      <Head title="Dashboard" />
      <div className="animate-fade-up">
        {/* Page header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-muted-foreground text-sm">
              Orders for {month}
            </p>
          </div>
        </div>

        {error && (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 mb-6">
            <p className="text-sm text-destructive">Failed to load orders: {error}</p>
          </div>
        )}

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="rounded-xl border bg-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-blue-500" />
              </div>
              <span className="text-sm text-muted-foreground">Total Orders</span>
            </div>
            <p className="text-3xl font-bold">{totalOrders}</p>
          </div>

          <div className="rounded-xl border bg-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-500" />
              </div>
              <span className="text-sm text-muted-foreground">Revenue</span>
            </div>
            <p className="text-3xl font-bold">${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>

          <div className="rounded-xl border bg-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Package className="w-5 h-5 text-purple-500" />
              </div>
              <span className="text-sm text-muted-foreground">Items Sold</span>
            </div>
            <p className="text-3xl font-bold">{totalItems}</p>
          </div>

          <div className="rounded-xl border bg-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-orange-500" />
              </div>
              <span className="text-sm text-muted-foreground">Avg Order Value</span>
            </div>
            <p className="text-3xl font-bold">${avgOrderValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
        </div>

        {/* Order status breakdown */}
        {Object.keys(statusCounts).length > 0 && (
          <div className="rounded-xl border bg-card p-6 mb-8">
            <h3 className="font-semibold mb-4">Order Status Breakdown</h3>
            <div className="flex flex-wrap gap-3">
              {Object.entries(statusCounts).map(([status, count]) => (
                <div key={status} className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2">
                  <span className="text-sm font-medium">{status}</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders table */}
        <div className="rounded-xl border bg-card overflow-hidden">
          <div className="p-6 border-b">
            <h3 className="font-semibold">Recent Orders</h3>
          </div>
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No orders this month</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3">Order</th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3">Date</th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3">Status</th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3">Payment</th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3">Items</th>
                    <th className="text-right text-xs font-medium text-muted-foreground px-6 py-3">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium">#{order.id}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {new Date(order.date_created).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{order.payment_method}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{order.items_total}</td>
                      <td className="px-6 py-4 text-sm font-medium text-right">
                        ${parseFloat(order.total_inc_tax).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {pagination.total_pages > 1 && (
            <div className="p-4 border-t flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {((pagination.page - 1) * pagination.per_page) + 1} to {Math.min(pagination.page * pagination.per_page, pagination.total_count)} of {pagination.total_count} orders
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(pagination.page - 1)}
                  disabled={pagination.page <= 1}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
                <span className="text-sm px-3">
                  Page {pagination.page} of {pagination.total_pages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(pagination.page + 1)}
                  disabled={pagination.page >= pagination.total_pages}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}