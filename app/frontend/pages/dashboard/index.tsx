import { LayoutDashboard } from "lucide-react"
import { DashboardLayout } from "@/layouts/dashboard-layout"
import { t } from "@/lib/i18n"

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="animate-fade-up">
        {/* Page header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-lg">
            <LayoutDashboard className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">{t("dashboard.title")}</h1>
            <p className="text-muted-foreground text-sm">
              {t("dashboard.subtitle")}
            </p>
          </div>
        </div>

        {/* Placeholder content */}
        <div className="stat-card">
          <div className="py-12 text-center">
            <div className="bg-muted mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
              <LayoutDashboard className="text-muted-foreground h-6 w-6" />
            </div>
            <h3 className="mb-1 font-semibold">{t("dashboard.welcome")}</h3>
            <p className="text-muted-foreground mx-auto max-w-sm text-sm">
              {t("dashboard.welcome_message")}
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
