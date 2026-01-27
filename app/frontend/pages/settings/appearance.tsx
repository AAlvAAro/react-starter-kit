import { Head } from "@inertiajs/react"

import AppearanceTabs from "@/components/appearance-tabs"
import HeadingSmall from "@/components/heading-small"
import { DashboardLayout } from "@/layouts/dashboard-layout"
import SettingsLayout from "@/layouts/settings/layout"
import { t } from "@/lib/i18n"
export default function Appearance() {
  return (
    <DashboardLayout>
      <Head title={t("settings.appearance")} />

      <SettingsLayout>
        <div className="space-y-6">
          <HeadingSmall
            title={t("settings.appearance.title")}
            description={t("settings.appearance.subtitle")}
          />
          <AppearanceTabs />
        </div>
      </SettingsLayout>
    </DashboardLayout>
  )
}
