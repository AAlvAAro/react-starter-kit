import { Head, Link, router } from "@inertiajs/react"
import { ArrowLeft, Pencil, Trash2, User, Mail, Phone } from "lucide-react"
import { DashboardLayout } from "@/layouts/dashboard-layout"
import { Button } from "@/components/ui/button"
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

interface ShowCustomerProps {
  customer: Customer
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export default function ShowCustomer({ customer }: ShowCustomerProps) {
  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete ${customer.name}?`)) {
      router.delete(`/customers/${customer.id}`)
    }
  }

  return (
    <DashboardLayout>
      <Head title={customer.name} />

      <div className="max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.visit("/customers")}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Avatar className="h-12 w-12">
              <AvatarFallback className="text-lg">
                {getInitials(customer.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-semibold">{customer.name}</h1>
              <p className="text-muted-foreground text-sm">{customer.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href={`/customers/${customer.id}/edit`}>
                <Pencil className="w-4 h-4 mr-2" />
                Edit
              </Link>
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>

        {/* Customer details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Info */}
          <div className="stat-card">
            <h3 className="font-semibold mb-4">Contact Information</h3>
            <dl className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Name</dt>
                  <dd className="font-medium">{customer.name}</dd>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Email</dt>
                  <dd className="font-medium">{customer.email}</dd>
                </div>
              </div>
              {customer.phone && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">Phone</dt>
                    <dd className="font-medium">{customer.phone}</dd>
                  </div>
                </div>
              )}
            </dl>
          </div>

          {/* Stats */}
          <div className="stat-card">
            <h3 className="font-semibold mb-4">Customer Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-2xl font-bold">{customer.orders_count}</p>
                <p className="text-sm text-muted-foreground">Total Orders</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-2xl font-bold">
                  ${customer.total_spent.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">Total Spent</p>
              </div>
            </div>
          </div>

          {/* Notes */}
          {customer.notes && (
            <div className="stat-card lg:col-span-2">
              <h3 className="font-semibold mb-2">Notes</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {customer.notes}
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
