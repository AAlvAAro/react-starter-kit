import { useState } from "react"
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Eye,
  TrendingUp,
  TrendingDown,
  QrCode,
  Download,
  Maximize2,
  X
} from "lucide-react"
import { DashboardLayout } from "@/layouts/dashboard-layout"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { t } from "@/lib/i18n"
import { QRCodeSVG } from "qrcode.react"

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

const getDefaultStats = () => [
  {
    title: t("dashboard.total_products"),
    value: "248",
    change: "+12%",
    trend: "up" as const,
    icon: Package,
  },
  {
    title: t("dashboard.orders_this_week"),
    value: "56",
    change: "+8%",
    trend: "up" as const,
    icon: ShoppingBag,
  },
  {
    title: t("dashboard.catalog_views"),
    value: "1,429",
    change: "-3%",
    trend: "down" as const,
    icon: Eye,
  },
]

export default function Dashboard({ stats }: DashboardProps) {
  // In real implementation, you'd use stats prop from Rails controller
  const displayStats = getDefaultStats()
  const catalogUrl = `${window.location.origin}/catalog`
  const [isQRModalOpen, setIsQRModalOpen] = useState(false)

  const downloadQRCode = () => {
    const svg = document.getElementById("catalog-qr-code")
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx?.drawImage(img, 0, 0)
      const pngFile = canvas.toDataURL("image/png")

      const downloadLink = document.createElement("a")
      downloadLink.download = "catalog-qr-code.png"
      downloadLink.href = pngFile
      downloadLink.click()
    }

    img.src = "data:image/svg+xml;base64," + btoa(svgData)
  }

  return (
    <DashboardLayout>
      <div className="animate-fade-up">
        {/* Page header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">{t("dashboard.title")}</h1>
            <p className="text-muted-foreground text-sm">
              {t("dashboard.subtitle")}
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

        {/* QR Code Section */}
        <div className="stat-card mb-8">
          <div className="flex items-center gap-3 mb-4">
            <QrCode className="w-5 h-5 text-muted-foreground" />
            <div>
              <h3 className="font-semibold">{t("dashboard.catalog_qr_code")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("dashboard.catalog_qr_code_hint")}
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="bg-white p-4 rounded-lg border-2 border-border">
              <QRCodeSVG
                id="catalog-qr-code"
                value={catalogUrl}
                size={200}
                level="H"
                includeMargin={true}
              />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-4">
                {t("dashboard.qr_code_description")}
              </p>
              <div className="space-y-2">
                <p className="text-xs font-mono bg-muted p-2 rounded">
                  {catalogUrl}
                </p>
                <div className="flex gap-2">
                  <Button onClick={downloadQRCode} variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    {t("dashboard.download_qr_code")}
                  </Button>
                  <Button onClick={() => setIsQRModalOpen(true)} variant="outline" size="sm">
                    <Maximize2 className="w-4 h-4 mr-2" />
                    {t("dashboard.fullscreen_qr_code")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fullscreen QR Code Modal */}
        <Dialog open={isQRModalOpen} onOpenChange={setIsQRModalOpen}>
          <DialogContent className="max-w-[95vw] sm:max-w-[600px] w-full">
            <DialogHeader>
              <DialogTitle>{t("dashboard.catalog_qr_code")}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="bg-white p-4 rounded-lg w-full max-w-[500px] aspect-square flex items-center justify-center">
                <QRCodeSVG
                  value={catalogUrl}
                  size={Math.min(500, typeof window !== 'undefined' ? window.innerWidth * 0.8 : 500)}
                  level="H"
                  includeMargin={true}
                  className="w-full h-full"
                />
              </div>
              <p className="text-sm text-muted-foreground text-center">
                {t("dashboard.qr_code_description")}
              </p>
              <p className="text-xs font-mono bg-muted p-3 rounded break-all w-full">
                {catalogUrl}
              </p>
            </div>
          </DialogContent>
        </Dialog>

        {/* Recent activity section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent orders */}
          <div className="stat-card">
            <h3 className="font-semibold mb-4">{t("dashboard.recent_orders")}</h3>
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
            <h3 className="font-semibold mb-4">{t("dashboard.top_products")}</h3>
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
            <h3 className="font-semibold mb-1">{t("dashboard.no_activity")}</h3>
            <p className="text-muted-foreground text-sm max-w-sm">
              {t("dashboard.no_activity_hint")}
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}