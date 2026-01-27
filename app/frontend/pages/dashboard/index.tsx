import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Eye,
  TrendingUp,
  TrendingDown
} from "lucide-react"
import { DashboardLayout } from "@/layouts/dashboard-layout"
import { Skeleton } from "@/components/ui/skeleton"

interface DashboardProps {
  stats?: {
    totalProducts: number
    ordersThisWeek: number
    catalogViews: number
    productsTrend: number
    ordersTrend: number
    viewsTrend: number
  }
}

const defaultStats = [
  {
    title: "Total Products",
    value: "248",
    change: "+12%",
    trend: "up" as const,
    icon: Package,
  },
  {
    title: "Orders This Week",
    value: "56",
    change: "+8%",
    trend: "up" as const,
    icon: ShoppingBag,
  },
  {
    title: "Catalog Views",
    value: "1,429",
    change: "-3%",
    trend: "down" as const,
    icon: Eye,
  },
]

export default function Dashboard({ stats }: DashboardProps) {
  // In real implementation, you'd use stats prop from Rails controller
  const displayStats = defaultStats

  return (
    <DashboardLayout>
      <div className="animate-fade-up">
        {/* Page header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-muted-foreground text-sm">
              Welcome back! Here's what's happening with your store.
            </p>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {displayStats.map((stat) => (
            <div key={stat.title} className="stat-card">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </span>
                <stat.icon className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-semibold">{stat.value}</span>
                <div
                  className={`flex items-center gap-1 text-sm ${
                    stat.trend === "up" ? "text-success" : "text-destructive"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent activity section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent orders */}
          <div className="stat-card">
            <h3 className="font-semibold mb-4">Recent Orders</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 pb-4 border-b border-border last:border-0 last:pb-0"
                >
                  <Skeleton className="w-10 h-10 rounded-lg" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
          </div>

          {/* Top products */}
          <div className="stat-card">
            <h3 className="font-semibold mb-4">Top Products</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 pb-4 border-b border-border last:border-0 last:pb-0"
                >
                  <Skeleton className="w-10 h-10 rounded-lg" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-40 mb-2" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <Skeleton className="h-4 w-12" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Empty state example */}
        <div className="mt-8">
          <div className="empty-state">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
              <Package className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-1">No recent activity</h3>
            <p className="text-muted-foreground text-sm max-w-sm">
              When you start receiving orders and catalog views, they'll appear here.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}