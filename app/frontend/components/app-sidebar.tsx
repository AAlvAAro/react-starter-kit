import { Link } from "@inertiajs/react"
import { BookOpen, CreditCard, Folder, LayoutGrid, Settings, Search } from "lucide-react"

import { NavFooter } from "@/components/nav-footer"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { dashboardPath, settingsProfilePath } from "@/routes"
import type { NavItem } from "@/types"
import { t } from "@/lib/i18n"

import AppLogo from "./app-logo"

const mainNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: dashboardPath(),
    icon: LayoutGrid,
  },
  {
    title: "Instagram",
    href: "/instagram",
    icon: Search,
  },
]

const footerNavItems: NavItem[] = [
  {
    title: t("nav.settings"),
    href: settingsProfilePath(),
    icon: Settings,
  },
  {
    title: t("sidebar.plans"),
    href: "/plans",
    icon: CreditCard,
  },
  {
    title: t("sidebar.repository"),
    href: "https://github.com/inertia-rails/react-starter-kit",
    icon: Folder,
  },
  {
    title: t("sidebar.documentation"),
    href: "https://inertia-rails.dev",
    icon: BookOpen,
  },
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={dashboardPath()} prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={mainNavItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavFooter items={footerNavItems} className="mt-auto" />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
