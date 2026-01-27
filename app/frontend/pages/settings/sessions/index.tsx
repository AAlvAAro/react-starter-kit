import { Head, Link, usePage } from "@inertiajs/react"

import HeadingSmall from "@/components/heading-small"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DashboardLayout } from "@/layouts/dashboard-layout"
import SettingsLayout from "@/layouts/settings/layout"
import { sessionPath } from "@/routes"
import type { Session } from "@/types"
import { t } from "@/lib/i18n"

interface SessionsProps {
  sessions: Session[]
}

function parseUserAgent(userAgent: string): string {
  // Extract device and browser info from user agent
  let device = "Unknown Device"
  let browser = ""

  // Detect device
  if (userAgent.includes("Macintosh")) {
    device = "MacBook"
  } else if (userAgent.includes("iPhone")) {
    device = "iPhone"
  } else if (userAgent.includes("iPad")) {
    device = "iPad"
  } else if (userAgent.includes("Windows")) {
    device = "Windows PC"
  } else if (userAgent.includes("Android")) {
    device = "Android"
  } else if (userAgent.includes("Linux")) {
    device = "Linux"
  }

  // Detect browser
  if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) {
    browser = "Chrome"
  } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
    browser = "Safari"
  } else if (userAgent.includes("Firefox")) {
    browser = "Firefox"
  } else if (userAgent.includes("Edg")) {
    browser = "Edge"
  }

  return browser ? `${device} • ${browser}` : device
}

export default function Sessions({ sessions }: SessionsProps) {
  const { auth } = usePage().props

  return (
    <DashboardLayout>
      <Head title={t("settings.sessions")} />

      <SettingsLayout>
        <div className="space-y-6">
          <HeadingSmall
            title={t("settings.sessions.title")}
            description={t("settings.sessions.subtitle")}
          />

          <div className="space-y-4">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="flex flex-col space-y-2 rounded-lg border p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">
                        {parseUserAgent(session.user_agent)}
                      </p>
                      {session.id === auth.session.id && (
                        <Badge variant="secondary">
                          {t("settings.sessions.current")}
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {new Date(session.created_at).toLocaleString()}
                    </p>
                  </div>
                  {session.id !== auth.session.id && (
                    <Button variant="destructive" asChild>
                      <Link
                        method="delete"
                        href={sessionPath({ id: session.id })}
                        as="button"
                      >
                        {t("settings.sessions.log_out")}
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </SettingsLayout>
    </DashboardLayout>
  )
}
