import { Link, usePage } from "@inertiajs/react"
import { BookOpen, FileText, Folder, LayoutGrid } from "lucide-react"

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
import { dashboardPath, dashboardProjectMdPath } from "@/routes"
import type { NavItem, SharedData } from "@/types"

import AppLogo from "./app-logo"

const mainNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: dashboardPath(),
    icon: LayoutGrid,
  },
]

const superAdminFooterNavItems: NavItem[] = [
  {
    title: "PROJECT.md Generator",
    href: dashboardProjectMdPath(),
    icon: FileText,
  },
  {
    title: "Repository",
    href: "https://github.com/inertia-rails/react-starter-kit",
    icon: Folder,
  },
  {
    title: "Documentation",
    href: "https://inertia-rails.dev",
    icon: BookOpen,
  },
]

export function AppSidebar() {
  const { auth } = usePage<SharedData>().props
  const isSuperAdmin = auth.user?.super_admin

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
        {isSuperAdmin && <NavFooter items={superAdminFooterNavItems} className="mt-auto" />}
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
