import { Head, useForm, router } from "@inertiajs/react"
import { ArrowLeft, Plus } from "lucide-react"
import { DashboardLayout } from "@/layouts/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Customer {
  id: number | null
  name: string
  email: string
  phone: string
  notes: string
}

interface NewCustomerProps {
  customer: Customer
}

export default function NewCustomer({ customer }: NewCustomerProps) {
  const { data, setData, post, processing, errors } = useForm({
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    notes: customer.notes,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post("/customers")
  }

  return (
    <DashboardLayout>
      <Head title="New Customer" />

      <div className="max-w-2xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.visit("/customers")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">New Customer</h1>
            <p className="text-muted-foreground text-sm">
              Add a new customer to your database
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="stat-card space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                placeholder="Enter customer name"
                required
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                placeholder="customer@example.com"
                required
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Phone (optional)</Label>
              <Input
                id="phone"
                type="tel"
                value={data.phone}
                onChange={(e) => setData("phone", e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea
                id="notes"
                value={data.notes}
                onChange={(e) => setData("notes", e.target.value)}
                placeholder="Add any notes about this customer"
                rows={4}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button type="submit" disabled={processing}>
              <Plus className="w-4 h-4 mr-2" />
              Create Customer
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.visit("/customers")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}
