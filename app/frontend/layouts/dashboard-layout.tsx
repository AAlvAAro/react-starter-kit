import { ReactNode, useState } from "react"
import { Link, usePage } from "@inertiajs/react"
import { t } from "@/lib/i18n"
import {
  Package,
  ChevronDown,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { SharedData } from "@/types"

interface DashboardLayoutProps {
  children: ReactNode
}

const getNavItems = () => [
  { icon: Search, label: t("sidebar.searches"), href: "/instagram", matchPrefix: "/instagram" },
  { icon: Settings, label: t("nav.settings"), href: "/settings/profile", matchPrefix: "/settings" },
]

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const page = usePage<SharedData>()
  const { auth } = page.props
  const url = page.url
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const user = auth?.user ?? {
    name: "User",
    email: "user@example.com"
  }
  const userInitials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="min-h-screen flex bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-60 bg-sidebar border-r border-sidebar-border flex flex-col transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-sidebar-foreground">Profile Insights</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto">
          <nav className="py-4">
            <div className="section-label">{t("sidebar.platform")}</div>
            <div className="px-3 space-y-1">
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
                      isActive ? "sidebar-link-active" : "sidebar-link-inactive"
                    )}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </nav>

        </div>

        {/* Credits Badge */}
        <div className="px-4 pb-3">
          <div className="rounded-lg border border-sidebar-border bg-sidebar-accent/50 p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-muted-foreground">Créditos</span>
              <span className={cn(
                "text-sm font-bold",
                user.credits_remaining > 0 ? "text-primary" : "text-destructive"
              )}>
                {user.credits_remaining}
              </span>
            </div>
            {user.credits_remaining === 0 && (
              <Link
                href="/pricing"
                className="text-xs text-primary hover:underline"
              >
                Comprar créditos →
              </Link>
            )}
          </div>
        </div>

        {/* User profile */}
        <div className="border-t border-sidebar-border p-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-accent transition-colors">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-sidebar-foreground">{user.name}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-sidebar-foreground/50" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/settings/profile" className="cursor-pointer">
                  <Settings className="w-4 h-4 mr-2" />
                  {t("nav.settings")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/sessions"
                  method="delete"
                  as="button"
                  className="w-full cursor-pointer text-destructive"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  {t("nav.sign_out")}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <header className="lg:hidden h-16 border-b border-border flex items-center px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div className="ml-4 flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold">Profile Insights</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}