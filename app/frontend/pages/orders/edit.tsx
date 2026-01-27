import { useState } from "react"
import { Head, useForm, router } from "@inertiajs/react"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"
import { DashboardLayout } from "@/layouts/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { t } from "@/lib/i18n"

interface Customer {
  id: number
  name: string
  email: string
}

interface CatalogItem {
  id: number
  name: string
  sku: string
  price: string | number
  stock: number
  category_name: string
}

interface OrderItem {
  id?: number
  product_name: string
  quantity: number
  price: number
  _destroy?: boolean
}

interface Order {
  id: number
  customer_id: number
  status: string
  notes: string
  items: OrderItem[]
}

interface EditOrderProps {
  order: Order
  customers: Customer[]
  catalog_items: CatalogItem[]
}

export default function EditOrder({ order, customers, catalog_items }: EditOrderProps) {
  const [items, setItems] = useState<OrderItem[]>(order.items)
  const [searchQuery, setSearchQuery] = useState("")

  const { data, setData, put, processing, errors } = useForm({
    customer_id: order.customer_id,
    status: order.status,
    notes: order.notes,
    total: 0,
  })

  const addItem = (catalogItem: CatalogItem) => {
    setItems([...items, {
      product_name: catalogItem.name,
      quantity: 1,
      price: Number(catalogItem.price)
    }])
    setSearchQuery("")
  }

  const removeItem = (index: number) => {
    const newItems = [...items]
    if (newItems[index].id) {
      newItems[index]._destroy = true
    } else {
      newItems.splice(index, 1)
    }
    setItems(newItems)
  }

  const updateItem = (index: number, field: keyof OrderItem, value: string | number) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    setItems(newItems)
  }

  const calculateTotal = () => {
    return items
      .filter(item => !item._destroy)
      .reduce((sum, item) => {
        return sum + (item.quantity * Number(item.price))
      }, 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const total = calculateTotal()
    put(`/orders/${order.id}`, {
      customer_id: data.customer_id,
      status: data.status,
      notes: data.notes,
      total: total,
      items_attributes: items,
    })
  }

  return (
    <DashboardLayout>
      <Head title={t("orders.edit")} />

      <div className="max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.visit(`/orders/${order.id}`)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">{t("orders.edit")} #{order.id}</h1>
            <p className="text-muted-foreground text-sm">
              {t("orders.subtitle")}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="stat-card space-y-6">
            {/* Customer Selection */}
            <div className="grid gap-2">
              <Label htmlFor="customer_id">{t("orders.customer")}</Label>
              <Select
                value={data.customer_id?.toString()}
                onValueChange={(value) => setData("customer_id", parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("orders.select_customer")} />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id.toString()}>
                      {customer.name} ({customer.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.customer_id && (
                <p className="text-sm text-destructive">{errors.customer_id}</p>
              )}
            </div>

            {/* Status */}
            <div className="grid gap-2">
              <Label htmlFor="status">{t("orders.status")}</Label>
              <Select
                value={data.status}
                onValueChange={(value) => setData("status", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">{t("orders.status_draft")}</SelectItem>
                  <SelectItem value="pending">{t("orders.status_pending")}</SelectItem>
                  <SelectItem value="sent">{t("orders.status_sent")}</SelectItem>
                  <SelectItem value="accepted">{t("orders.status_accepted")}</SelectItem>
                  <SelectItem value="rejected">{t("orders.status_rejected")}</SelectItem>
                  <SelectItem value="completed">{t("orders.status_completed")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Order Items */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>{t("orders.items")}</Label>
              </div>

              {/* Search and add items */}
              <div className="space-y-2">
                <Label>{t("orders.search_products")}</Label>
                <Input
                  placeholder={t("orders.search_products_placeholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <div className="border rounded-md max-h-48 overflow-y-auto">
                    {catalog_items
                      .filter(item =>
                        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.sku.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .slice(0, 10)
                      .map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          className="w-full text-left px-4 py-2 hover:bg-muted flex items-center justify-between"
                          onClick={() => addItem(item)}
                        >
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {item.sku} • {item.category_name}
                            </p>
                          </div>
                          <p className="font-medium">${Number(item.price).toFixed(2)}</p>
                        </button>
                      ))}
                  </div>
                )}
              </div>

              {/* Selected items */}
              {items.filter(item => !item._destroy).length > 0 && (
                <div className="space-y-2">
                  <Label>{t("orders.selected_items")}</Label>
                  {items.filter(item => !item._destroy).map((item, index) => (
                    <div key={index} className="grid grid-cols-12 gap-4 items-center p-3 border rounded-md">
                      <div className="col-span-5">
                        <p className="font-medium">{item.product_name}</p>
                      </div>
                      <div className="col-span-2">
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateItem(index, "quantity", parseInt(e.target.value))
                          }
                          required
                        />
                      </div>
                      <div className="col-span-3">
                        <p className="text-right font-medium">${(item.quantity * Number(item.price)).toFixed(2)}</p>
                      </div>
                      <div className="col-span-2 text-right">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(index)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-end pt-4 border-t">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">{t("orders.total")}</p>
                  <p className="text-2xl font-bold">${calculateTotal().toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="grid gap-2">
              <Label htmlFor="notes">{t("orders.notes")}</Label>
              <Textarea
                id="notes"
                value={data.notes}
                onChange={(e) => setData("notes", e.target.value)}
                placeholder={t("orders.notes_placeholder")}
                rows={4}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button type="submit" disabled={processing}>
              {t("orders.update_order")}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.visit(`/orders/${order.id}`)}
            >
              {t("orders.cancel")}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}
