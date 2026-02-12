import type { ReactNode } from "react"
import { Link } from "@inertiajs/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Settings, LogOut } from "lucide-react"

interface InstagramLayoutProps {
  children: ReactNode
}

export function InstagramLayout({ children }: InstagramLayoutProps) {
  return (
    <div className="min-h-screen bg-background pb-24">
      {children}

      {/* User Menu - Fixed bottom right */}
      <nav className="fixed bottom-6 right-6 z-50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center justify-center w-12 h-12 rounded-full bg-card/90 backdrop-blur-md border border-border shadow-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
              <User className="h-5 w-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="end" className="w-48 mb-2">
            <DropdownMenuItem asChild>
              <Link href="/settings/profile" className="cursor-pointer">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings/profile" className="cursor-pointer">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href="/sessions"
                method="delete"
                as="button"
                className="w-full cursor-pointer text-destructive"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </div>
  )
}
