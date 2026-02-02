import { LayoutDashboard } from "lucide-react"
import { DashboardLayout } from "@/layouts/dashboard-layout"
import { t } from "@/lib/i18n"

export default function Dashboard() {
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
              Welcome to your dashboard.
            </p>
          </div>
        </div>

        {/* Placeholder content */}
        <div className="stat-card">
          <div className="text-center py-12">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <LayoutDashboard className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-1">Welcome</h3>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto">
              Your dashboard is ready. Start building your application.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}