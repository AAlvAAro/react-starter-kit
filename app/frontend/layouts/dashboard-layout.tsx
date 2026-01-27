import { ReactNode, useState } from "react"
import { Link, usePage } from "@inertiajs/react"
import {
  Package,
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  Users,
  BarChart3,
  Github,
  FileText,
  ChevronDown,
  ChevronRight,
  Settings,
  LogOut,
  Menu,
  X,
  Layers,
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

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: BookOpen, label: "Catalog", href: "/catalog" },
  { icon: ClipboardList, label: "Orders", href: "/orders" },
  { icon: Users, label: "Customers", href: "/customers" },
  { icon: BarChart3, label: "Insights", href: "/insights" },
  { icon: Settings, label: "Settings", href: "/settings/profile", matchPrefix: "/settings" },
]

const pagesItems = [
  { icon: Layers, label: "Landing Page", href: "/" },
]

function PagesSubmenu({
  pathname,
  onNavigate
}: {
  pathname: string
  onNavigate: () => void
}) {
  const [open, setOpen] = useState(false)
  const isAnyActive = pagesItems.some((item) => pathname === item.href)

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "sidebar-link w-full justify-between",
          isAnyActive ? "sidebar-link-active" : "sidebar-link-inactive"
        )}
      >
        <span className="flex items-center gap-3">
          <Layers className="w-5 h-5" />
          Pages
        </span>
        <ChevronRight
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            open && "rotate-90"
          )}
        />
      </button>
      {open && (
        <div className="ml-4 mt-1 space-y-1 border-l border-sidebar-border pl-3">
          {pagesItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "sidebar-link text-sm",
                  isActive ? "sidebar-link-active" : "sidebar-link-inactive"
                )}
                onClick={onNavigate}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

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
            <span className="font-semibold">CatalogoPro</span>
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
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="section-label">Platform</div>
          <div className="px-3 space-y-1">
            {navItems.map((item) => {
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

        {/* Bottom links */}
        <div className="border-t border-sidebar-border py-4">
          <div className="px-3 space-y-1">
            <PagesSubmenu
              pathname={url}
              onNavigate={() => setSidebarOpen(false)}
            />
            <a
              href="https://github.com/yourusername/catalogopro"
              className="sidebar-link sidebar-link-inactive"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5" />
              Repository
            </a>
            <a
              href="#"
              className="sidebar-link sidebar-link-inactive"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText className="w-5 h-5" />
              Documentation
            </a>
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
                  <p className="text-sm font-medium">{user.name}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
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
                  Settings
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
                  Log out
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
            <span className="font-semibold">CatalogoPro</span>
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