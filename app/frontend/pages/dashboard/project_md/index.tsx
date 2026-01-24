import { Head, useForm } from "@inertiajs/react"
import { FileText, Palette, Type, Box, FileCode, Rocket } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import AppLayout from "@/layouts/app-layout"
import { dashboardProjectMdPath } from "@/routes"
import type { BreadcrumbItem } from "@/types"

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "PROJECT.md Generator",
    href: dashboardProjectMdPath(),
  },
]

interface FormData {
  project_name: string
  project_description: string
  primary_vertical: string
  primary_background: string
  secondary_background: string
  warm_background: string
  accent_background: string
  primary_button: string
  primary_button_text: string
  warm_button: string
  warm_button_text: string
  accent: string
  accent_alt: string
  text_primary: string
  text_secondary: string
  text_warm: string
  text_warm_secondary: string
  success: string
  success_warm: string
  warning: string
  danger: string
  border: string
  border_warm: string
  font_family: string
  font_family_alt: string
  domain_models: string
  page_guidelines: string
  example_prompts: string
  initial_setup_prompts: string
}

export default function ProjectMdGenerator() {
  const { data, setData, post, processing } = useForm<FormData>({
    project_name: "",
    project_description: "",
    primary_vertical: "",
    primary_background: "#FFFFFF",
    secondary_background: "#F9FAFB",
    warm_background: "#FFFDF9",
    accent_background: "#F5EDE4",
    primary_button: "#18181B",
    primary_button_text: "#FFFFFF",
    warm_button: "#3D2C1E",
    warm_button_text: "#FFFFFF",
    accent: "#D4A056",
    accent_alt: "#C4725D",
    text_primary: "#18181B",
    text_secondary: "#6B7280",
    text_warm: "#2D2A26",
    text_warm_secondary: "#6B5E54",
    success: "#16A34A",
    success_warm: "#5E8C61",
    warning: "#F59E0B",
    danger: "#DC2626",
    border: "#E5E7EB",
    border_warm: "#E8E0D8",
    font_family: "Inter, system-ui, sans-serif",
    font_family_alt: "'DM Sans', system-ui, sans-serif",
    domain_models: "",
    page_guidelines: "",
    example_prompts: "",
    initial_setup_prompts: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post(dashboardProjectMdPath())
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="PROJECT.md Generator" />

      <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-4 md:p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">PROJECT.md Generator</h1>
            <p className="text-muted-foreground text-sm">
              Generate a customized PROJECT.md file for your project
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileCode className="h-5 w-5 text-muted-foreground" />
                <CardTitle>Project Overview</CardTitle>
              </div>
              <CardDescription>
                Basic information about your project
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="project_name">Project Name</Label>
                  <Input
                    id="project_name"
                    placeholder="e.g., Catalog App"
                    value={data.project_name}
                    onChange={(e) => setData("project_name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="primary_vertical">Primary Vertical</Label>
                  <Input
                    id="primary_vertical"
                    placeholder="e.g., Coffee roasters"
                    value={data.primary_vertical}
                    onChange={(e) => setData("primary_vertical", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="project_description">Project Description</Label>
                <Textarea
                  id="project_description"
                  placeholder="Describe what your project does, its main features, and target audience..."
                  value={data.project_description}
                  onChange={(e) => setData("project_description", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-muted-foreground" />
                <CardTitle>Color System</CardTitle>
              </div>
              <CardDescription>
                Define your project's color palette
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="mb-3 text-sm font-medium">Backgrounds</h4>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <ColorInput
                    label="Primary Background"
                    value={data.primary_background}
                    onChange={(v) => setData("primary_background", v)}
                  />
                  <ColorInput
                    label="Secondary Background"
                    value={data.secondary_background}
                    onChange={(v) => setData("secondary_background", v)}
                  />
                  <ColorInput
                    label="Warm Background"
                    value={data.warm_background}
                    onChange={(v) => setData("warm_background", v)}
                  />
                  <ColorInput
                    label="Accent Background"
                    value={data.accent_background}
                    onChange={(v) => setData("accent_background", v)}
                  />
                </div>
              </div>

              <div>
                <h4 className="mb-3 text-sm font-medium">Buttons</h4>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <ColorInput
                    label="Primary Button"
                    value={data.primary_button}
                    onChange={(v) => setData("primary_button", v)}
                  />
                  <ColorInput
                    label="Primary Button Text"
                    value={data.primary_button_text}
                    onChange={(v) => setData("primary_button_text", v)}
                  />
                  <ColorInput
                    label="Warm Button"
                    value={data.warm_button}
                    onChange={(v) => setData("warm_button", v)}
                  />
                  <ColorInput
                    label="Warm Button Text"
                    value={data.warm_button_text}
                    onChange={(v) => setData("warm_button_text", v)}
                  />
                </div>
              </div>

              <div>
                <h4 className="mb-3 text-sm font-medium">Accents</h4>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <ColorInput
                    label="Accent"
                    value={data.accent}
                    onChange={(v) => setData("accent", v)}
                  />
                  <ColorInput
                    label="Accent Alt"
                    value={data.accent_alt}
                    onChange={(v) => setData("accent_alt", v)}
                  />
                </div>
              </div>

              <div>
                <h4 className="mb-3 text-sm font-medium">Text Colors</h4>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <ColorInput
                    label="Text Primary"
                    value={data.text_primary}
                    onChange={(v) => setData("text_primary", v)}
                  />
                  <ColorInput
                    label="Text Secondary"
                    value={data.text_secondary}
                    onChange={(v) => setData("text_secondary", v)}
                  />
                  <ColorInput
                    label="Text Warm"
                    value={data.text_warm}
                    onChange={(v) => setData("text_warm", v)}
                  />
                  <ColorInput
                    label="Text Warm Secondary"
                    value={data.text_warm_secondary}
                    onChange={(v) => setData("text_warm_secondary", v)}
                  />
                </div>
              </div>

              <div>
                <h4 className="mb-3 text-sm font-medium">Status Colors</h4>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <ColorInput
                    label="Success"
                    value={data.success}
                    onChange={(v) => setData("success", v)}
                  />
                  <ColorInput
                    label="Success Warm"
                    value={data.success_warm}
                    onChange={(v) => setData("success_warm", v)}
                  />
                  <ColorInput
                    label="Warning"
                    value={data.warning}
                    onChange={(v) => setData("warning", v)}
                  />
                  <ColorInput
                    label="Danger"
                    value={data.danger}
                    onChange={(v) => setData("danger", v)}
                  />
                </div>
              </div>

              <div>
                <h4 className="mb-3 text-sm font-medium">Borders</h4>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <ColorInput
                    label="Border"
                    value={data.border}
                    onChange={(v) => setData("border", v)}
                  />
                  <ColorInput
                    label="Border Warm"
                    value={data.border_warm}
                    onChange={(v) => setData("border_warm", v)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Type className="h-5 w-5 text-muted-foreground" />
                <CardTitle>Typography</CardTitle>
              </div>
              <CardDescription>
                Define your project's font families
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="font_family">Primary Font Family</Label>
                  <Input
                    id="font_family"
                    placeholder="Inter, system-ui, sans-serif"
                    value={data.font_family}
                    onChange={(e) => setData("font_family", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="font_family_alt">Alternative Font Family</Label>
                  <Input
                    id="font_family_alt"
                    placeholder="'DM Sans', system-ui, sans-serif"
                    value={data.font_family_alt}
                    onChange={(e) => setData("font_family_alt", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Box className="h-5 w-5 text-muted-foreground" />
                <CardTitle>Domain Models</CardTitle>
              </div>
              <CardDescription>
                Define your key data structures (TypeScript interfaces)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="domain_models">Domain Models</Label>
                <Textarea
                  id="domain_models"
                  className="min-h-[200px] font-mono text-sm"
                  placeholder={`### Product

\`\`\`tsx
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}
\`\`\``}
                  value={data.domain_models}
                  onChange={(e) => setData("domain_models", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <CardTitle>Page Guidelines</CardTitle>
              </div>
              <CardDescription>
                Specific layouts and patterns for different page types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="page_guidelines">Page-Specific Guidelines</Label>
                <Textarea
                  id="page_guidelines"
                  className="min-h-[200px]"
                  placeholder={`### Auth Pages (Sign In, Sign Up)

- Centered card layout, max-width 400px
- White background, full viewport height
- Logo at top of card

### Dashboard Pages

- Sidebar layout: 240px fixed sidebar + fluid main content
- Main content: light gray bg, padded`}
                  value={data.page_guidelines}
                  onChange={(e) => setData("page_guidelines", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Rocket className="h-5 w-5 text-muted-foreground" />
                <CardTitle>Prompts</CardTitle>
              </div>
              <CardDescription>
                Example prompts and initial setup prompts for AI assistants
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="example_prompts">Example Prompts</Label>
                <Textarea
                  id="example_prompts"
                  className="min-h-[200px]"
                  placeholder={`**Generate a component:**
\`\`\`
Create a ProductCard component in app/frontend/components/product-card.tsx.
Props: name, price, imageUrl. Use shadcn/ui Card as base.
\`\`\`

**Generate a page:**
\`\`\`
Create the Dashboard page at app/frontend/pages/dashboard/index.tsx.
Use AppLayout. Show stats cards at top, recent orders table below.
\`\`\``}
                  value={data.example_prompts}
                  onChange={(e) => setData("example_prompts", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="initial_setup_prompts">Initial Setup Prompts</Label>
                <Textarea
                  id="initial_setup_prompts"
                  className="min-h-[200px]"
                  placeholder={`### 1. Update Sidebar Navigation
\`\`\`
Update app/frontend/components/app-sidebar.tsx to show these nav items:
- Dashboard (LayoutDashboard icon)
- Products (Package icon)
- Orders (ShoppingCart icon)
\`\`\`

### 2. Create Dashboard Page
\`\`\`
Create the main Dashboard page at app/frontend/pages/dashboard/index.tsx.
Show 4 stats cards at top: Total Orders, Revenue, Products, Customers.
\`\`\``}
                  value={data.initial_setup_prompts}
                  onChange={(e) => setData("initial_setup_prompts", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={processing}>
              {processing ? "Generating..." : "Generate PROJECT.md"}
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  )
}

interface ColorInputProps {
  label: string
  value: string
  onChange: (value: string) => void
}

function ColorInput({ label, value, onChange }: ColorInputProps) {
  return (
    <div className="space-y-2">
      <Label className="text-xs">{label}</Label>
      <div className="flex gap-2">
        <div
          className="h-9 w-9 shrink-0 rounded-md border"
          style={{ backgroundColor: value }}
        />
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="font-mono text-xs"
        />
      </div>
    </div>
  )
}
