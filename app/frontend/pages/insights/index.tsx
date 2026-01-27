import {
  BarChart3,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users
} from "lucide-react"
import { DashboardLayout } from "@/layouts/dashboard-layout"
import { Skeleton } from "@/components/ui/skeleton"
import { t } from "@/lib/i18n"

interface InsightsProps {
  stats?: {
    totalRevenue: string
    totalOrders: number
    totalCustomers: number
    conversionRate: string
    revenueTrend: string
    ordersTrend: string
    customersTrend: string
    conversionTrend: string
  }
  topProducts?: Array<{
    id: number
    name: string
    category: string
    sales: string
  }>
}

const getDefaultStats = () => [
  {
    title: t("insights.total_revenue"),
    value: "$12,450",
    change: "+15%",
    icon: DollarSign,
  },
  {
    title: t("insights.total_orders"),
    value: "256",
    change: "+8%",
    icon: ShoppingCart,
  },
  {
    title: t("insights.total_customers"),
    value: "1,024",
    change: "+12%",
    icon: Users,
  },
  {
    title: t("insights.conversion_rate"),
    value: "3.2%",
    change: "+0.5%",
    icon: TrendingUp,
  },
]

export default function Insights({ stats, topProducts }: InsightsProps) {
  // In real implementation, use props from Rails controller
  const displayStats = getDefaultStats()

  return (
    <DashboardLayout>
      <div className="animate-fade-up">
        {/* Page header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">{t("insights.title")}</h1>
            <p className="text-muted-foreground text-sm">
              {t("insights.subtitle")}
            </p>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {displayStats.map((stat) => (
            <div key={stat.title} className="stat-card">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </span>
                <stat.icon className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-semibold">{stat.value}</span>
                <span className="text-sm text-success flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue chart placeholder */}
          <div className="stat-card">
            <h3 className="font-semibold mb-4">{t("insights.revenue_over_time")}</h3>
            <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  {t("insights.chart_placeholder")}
                </p>
              </div>
            </div>
          </div>

          {/* Orders chart placeholder */}
          <div className="stat-card">
            <h3 className="font-semibold mb-4">{t("insights.orders_by_status")}</h3>
            <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  {t("insights.chart_placeholder")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Top products */}
        <div className="stat-card">
          <h3 className="font-semibold mb-4">{t("insights.top_selling_products")}</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between pb-4 border-b border-border last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-muted-foreground w-6">
                    #{i}
                  </span>
                  <Skeleton className="w-10 h-10 rounded-lg" />
                  <div>
                    <Skeleton className="h-4 w-40 mb-1" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}