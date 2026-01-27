import {
  Link,
  MessageCircle,
  ShoppingBag,
  User,
  Sparkles,
  LayoutDashboard,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { t } from "@/lib/i18n"

const getFeatures = () => [
  {
    icon: Link,
    title: t("landing.features.catalog_link.title"),
    description: t("landing.features.catalog_link.desc"),
  },
  {
    icon: MessageCircle,
    title: t("landing.features.whatsapp.title"),
    description: t("landing.features.whatsapp.desc"),
  },
  {
    icon: ShoppingBag,
    title: t("landing.features.meta_sync.title"),
    description: t("landing.features.meta_sync.desc"),
  },
  {
    icon: User,
    title: t("landing.features.profile.title"),
    description: t("landing.features.profile.desc"),
  },
  {
    icon: Sparkles,
    title: t("landing.features.insights.title"),
    description: t("landing.features.insights.desc"),
    badge: t("landing.features.insights.badge"),
  },
  {
    icon: LayoutDashboard,
    title: t("landing.features.dashboard.title"),
    description: t("landing.features.dashboard.desc"),
  },
]

export function FeaturesSection() {
  const features = getFeatures()

  return (
    <section id="features" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("landing.features.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("landing.features.subtitle")}
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