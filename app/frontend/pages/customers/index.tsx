import { useState } from "react"
import { Head, Link, router } from "@inertiajs/react"
import {
  Users,
  Search,
  Plus,
  Pencil,
  Trash2,
  MoreHorizontal,
} from "lucide-react"
import { DashboardLayout } from "@/layouts/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Customer {
  id: number
  name: string
  email: string
  phone: string | null
  notes: string | null
  orders_count: number
  total_spent: number
  created_at: string
}

interface CustomersProps {
  customers: Customer[]
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export default function Customers({ customers }: CustomersProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  return (
    <DashboardLayout>
      <Head title="Customers" />

      <div className="space-y-6">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">Customers</h1>
              <p className="text-muted-foreground text-sm">
                Manage your customer relationships
              </p>
            </div>
          </div>
          <Button asChild>
            <Link href="/customers/new">
              <Plus className="w-4 h-4 mr-2" />
              New Customer
            </Link>
          </Button>
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Customers table */}
        {filteredCustomers.length > 0 && (
          <div className="stat-card overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Customer
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Email
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Orders
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Total Spent
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-b border-border last:border-0 hover:bg-muted/50 cursor-pointer"
                    onClick={() => router.visit(`/customers/${customer.id}`)}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {getInitials(customer.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{customer.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {customer.email}
                    </td>
                    <td className="py-3 px-4">{customer.orders_count}</td>
                    <td className="py-3 px-4">
                      ${customer.total_spent.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/customers/${customer.id}/edit`}>
                              <Pencil className="w-4 h-4 mr-2" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={(e) => {
                              e.stopPropagation()
                              router.delete(`/customers/${customer.id}`)
                            }}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Empty state */}
        {filteredCustomers.length === 0 && (
          <div className="empty-state">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-1">No customers found</h3>
            <p className="text-muted-foreground text-sm max-w-sm">
              {searchQuery
                ? "Try adjusting your search criteria."
                : "Get started by adding your first customer."}
            </p>
            {!searchQuery && (
              <Button className="mt-4" asChild>
                <Link href="/customers/new">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Customer
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
