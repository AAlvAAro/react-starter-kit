import { Head, useForm, router } from "@inertiajs/react"
import { ArrowLeft, Plus } from "lucide-react"
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

interface Product {
  id: number | null
  name: string
  sku: string
  price: number
  category: string
  stock: number
  image: string | null
}

interface NewProductProps {
  product: Product
  categories: string[]
}

export default function NewProduct({ product, categories }: NewProductProps) {
  const { data, setData, post, processing, errors } = useForm({
    name: product.name,
    sku: product.sku,
    price: product.price,
    category: product.category,
    stock: product.stock,
    description: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post("/catalog")
  }

  return (
    <DashboardLayout>
      <Head title="New Product" />

      <div className="max-w-2xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.visit("/catalog")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">New Product</h1>
            <p className="text-muted-foreground text-sm">
              Add a new product to your catalog
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="stat-card space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                placeholder="Enter product name"
                required
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  value={data.sku}
                  onChange={(e) => setData("sku", e.target.value)}
                  placeholder="e.g., WH-001"
                  required
                />
                {errors.sku && (
                  <p className="text-sm text-destructive">{errors.sku}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={data.category}
                  onValueChange={(value) => setData("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-destructive">{errors.category}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={data.price}
                  onChange={(e) => setData("price", parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  required
                />
                {errors.price && (
                  <p className="text-sm text-destructive">{errors.price}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input
                  id="stock"
                  type="number"
                  min="0"
                  value={data.stock}
                  onChange={(e) => setData("stock", parseInt(e.target.value) || 0)}
                  placeholder="0"
                  required
                />
                {errors.stock && (
                  <p className="text-sm text-destructive">{errors.stock}</p>
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={data.description}
                onChange={(e) => setData("description", e.target.value)}
                placeholder="Enter product description"
                rows={4}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button type="submit" disabled={processing}>
              <Plus className="w-4 h-4 mr-2" />
              Create Product
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.visit("/catalog")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}
