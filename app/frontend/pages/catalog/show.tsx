import { Head, Link, router } from "@inertiajs/react"
import { ArrowLeft, Pencil, Trash2, Package } from "lucide-react"
import { DashboardLayout } from "@/layouts/dashboard-layout"
import { Button } from "@/components/ui/button"

interface Product {
  id: number
  name: string
  sku: string
  price: number
  category: string
  stock: number
  image: string | null
  description?: string
}

interface ShowProductProps {
  product: Product
  categories: string[]
}

export default function ShowProduct({ product }: ShowProductProps) {
  const handleDelete = () => {
    router.delete(`/catalog/${product.id}`)
  }

  return (
    <DashboardLayout>
      <Head title={product.name} />

      <div className="max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.visit("/catalog")}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-semibold">{product.name}</h1>
              <p className="text-muted-foreground text-sm">
                SKU: {product.sku}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href={`/catalog/${product.id}/edit`}>
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

        {/* Product details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Image */}
          <div className="stat-card">
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center text-muted-foreground">
                  <Package className="w-16 h-16 mb-2" />
                  <span className="text-sm">No image</span>
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div className="stat-card">
              <h3 className="font-semibold mb-4">Product Information</h3>
              <dl className="space-y-4">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Name</dt>
                  <dd className="font-medium">{product.name}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">SKU</dt>
                  <dd className="font-medium">{product.sku}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Category</dt>
                  <dd>
                    <span className="bg-muted px-2 py-1 rounded text-sm">
                      {product.category}
                    </span>
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Price</dt>
                  <dd className="font-semibold text-lg">
                    ${product.price.toFixed(2)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Stock</dt>
                  <dd className="font-medium">{product.stock} units</dd>
                </div>
              </dl>
            </div>

            {product.description && (
              <div className="stat-card">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{product.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
