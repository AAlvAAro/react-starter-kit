import { Link, usePage } from "@inertiajs/react"
import {
  ChevronDown,
  CreditCard,
  FileText,
  Github,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Settings,
  X,
} from "lucide-react"
import { useState } from "react"
import type { ReactNode } from "react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { t } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import type { SharedData } from "@/types"

interface DashboardLayoutProps {
  children: ReactNode
}

const getNavItems = () => [
  { icon: LayoutDashboard, label: t("nav.dashboard"), href: "/dashboard" },
  {
    icon: Settings,
    label: t("nav.settings"),
    href: "/settings/profile",
    matchPrefix: "/settings",
  },
]

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const page = usePage<SharedData>()
  const { auth } = page.props
  const url = page.url
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const user = auth?.user ?? {
    name: "User",
    email: "user@example.com",
  }
  const userInitials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="bg-background flex min-h-screen">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="bg-foreground/20 fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "bg-sidebar border-sidebar-border fixed inset-y-0 left-0 z-50 flex w-60 transform flex-col border-r transition-transform duration-200 ease-in-out lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Logo */}
        <div className="border-sidebar-border flex h-16 items-center justify-between border-b px-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
              <Package className="text-primary-foreground h-5 w-5" />
            </div>
            <span className="font-semibold">React Starter Kit</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto">
          <nav className="py-4">
            <div className="section-label">{t("sidebar.platform")}</div>
            <div className="space-y-1 px-3">
              {getNavItems().map((item) => {
                const isActive = item.matchPrefix
                  ? url.startsWith(item.matchPrefix)
                  : url === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "sidebar-link",
                      isActive
                        ? "sidebar-link-active"
                        : "sidebar-link-inactive",
                    )}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </nav>
        </div>

        {/* Bottom links */}
        <div className="border-sidebar-border border-t py-4">
          <div className="space-y-1 px-3">
            <Link href="/plans" className="sidebar-link sidebar-link-inactive">
              <CreditCard className="h-5 w-5" />
              {t("sidebar.plans")}
            </Link>
            <a
              href="https://github.com/AAlvAAro"
              className="sidebar-link sidebar-link-inactive"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
              {t("sidebar.repository")}
            </a>
            <a
              href="#"
              className="sidebar-link sidebar-link-inactive"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText className="h-5 w-5" />
              {t("sidebar.documentation")}
            </a>
          </div>
        </div>

        {/* User profile */}
        <div className="border-sidebar-border border-t p-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="hover:bg-sidebar-accent flex w-full items-center gap-3 rounded-lg p-2 transition-colors">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium">{user.name}</p>
                </div>
                <ChevronDown className="text-muted-foreground h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-muted-foreground text-xs">{user.email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/settings/profile" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  {t("nav.settings")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/sessions"
                  method="delete"
                  as="button"
                  className="text-destructive w-full cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {t("nav.sign_out")}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile header */}
        <header className="border-border flex h-16 items-center border-b px-4 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="ml-4 flex items-center gap-2">
            <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
              <Package className="text-primary-foreground h-5 w-5" />
            </div>
            <span className="font-semibold">React Starter Kit</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
