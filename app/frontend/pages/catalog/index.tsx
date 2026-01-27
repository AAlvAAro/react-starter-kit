import { useState } from "react"
import { Head, Link, router } from "@inertiajs/react"
import { t } from "@/lib/i18n"
import {
  BookOpen,
  Search,
  Filter,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"

interface Product {
  id: number
  name: string
  sku: string
  price: number
  category: string
  stock: number
  image: string | null
}

interface CatalogProps {
  products: Product[]
  categories: string[]
}

export default function Catalog({ products, categories }: CatalogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(t("catalog.all"))

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === t("catalog.all") || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <DashboardLayout>
      <Head title={t("catalog.title")} />

      <div className="space-y-6">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">{t("catalog.title")}</h1>
              <p className="text-muted-foreground text-sm">
                {t("catalog.subtitle")}
              </p>
            </div>
          </div>
          <Button asChild>
            <Link href="/catalog/new">
              <Plus className="w-4 h-4 mr-2" />
              {t("catalog.new_product")}
            </Link>
          </Button>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={t("catalog.search_products")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder={t("catalog.category")} />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="stat-card group hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => router.visit(`/catalog/${product.id}`)}
            >
              {/* Product image placeholder */}
              <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <Skeleton className="w-full h-full rounded-lg" />
                )}
              </div>

              {/* Product info */}
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.sku}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-semibold">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                      {product.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t("catalog.stock")}: {product.stock} {t("catalog.units")}
                  </p>
                </div>

                {/* Actions dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/catalog/${product.id}/edit`}>
                        <Pencil className="w-4 h-4 mr-2" />
                        {t("catalog.edit")}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => router.delete(`/catalog/${product.id}`)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      {t("catalog.delete")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="empty-state">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-1">{t("catalog.no_products")}</h3>
            <p className="text-muted-foreground text-sm max-w-sm">
              {searchQuery || selectedCategory !== t("catalog.all")
                ? t("catalog.no_products_search")
                : t("catalog.no_products_hint")}
            </p>
            {!searchQuery && selectedCategory === t("catalog.all") && (
              <Button className="mt-4" asChild>
                <Link href="/catalog/new">
                  <Plus className="w-4 h-4 mr-2" />
                  {t("catalog.add_product")}
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
