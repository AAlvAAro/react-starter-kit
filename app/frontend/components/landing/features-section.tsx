import {
  Link,
  MessageCircle,
  ShoppingBag,
  User,
  Sparkles,
  LayoutDashboard,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

const features = [
  {
    icon: Link,
    title: "Shareable Catalog Link",
    description:
      "Create a beautiful product catalog and share it anywhere — WhatsApp, Instagram bio, or printed QR codes.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Ordering",
    description:
      "Customers add to cart and checkout via WhatsApp. You receive orders instantly, no payment integration needed.",
  },
  {
    icon: ShoppingBag,
    title: "Meta & TikTok Sync",
    description:
      "Publish your catalog directly to Instagram Shop, Facebook Shop, and TikTok with one click.",
  },
  {
    icon: User,
    title: "Business Profile",
    description:
      "Showcase your brand with logo, description, contact info, and social links — like a digital business card.",
  },
  {
    icon: Sparkles,
    title: "AI Insights",
    description:
      "Get smart suggestions to improve your catalog, optimize pricing, and boost sales.",
    badge: "Coming soon",
  },
  {
    icon: LayoutDashboard,
    title: "Simple Dashboard",
    description:
      "Track orders, views, and top products from one clean dashboard. No spreadsheets required.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything you need to sell online
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From catalog creation to order management, we've got you covered
            with tools designed for simplicity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/20 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg text-foreground">
                      {feature.title}
                    </h3>
                    {feature.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {feature.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}