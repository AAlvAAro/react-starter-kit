import { Head, Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Package, Zap, Shield, Code, Github, Mail, ArrowRight } from "lucide-react"
import { t } from "@/lib/i18n"

export default function Home() {
  const features = [
    {
      icon: Zap,
      title: t("landing.features.fast.title"),
      description: t("landing.features.fast.description"),
    },
    {
      icon: Shield,
      title: t("landing.features.secure.title"),
      description: t("landing.features.secure.description"),
    },
    {
      icon: Code,
      title: t("landing.features.modern.title"),
      description: t("landing.features.modern.description"),
    },
    {
      icon: Package,
      title: t("landing.features.production.title"),
      description: t("landing.features.production.description"),
    },
  ]

  return (
    <>
      <Head title="React Starter Kit - Modern Rails + React Template" />
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg">React Starter Kit</span>
            </div>
            <nav className="flex items-center gap-4">
              <a
                href="https://github.com/AAlvAAro/react-starter-kit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <Github className="w-5 h-5" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
              <a
                href="mailto:hola@alvarodelgado.dev"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                <span className="hidden sm:inline">Contact</span>
              </a>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-sm">
              <Zap className="w-4 h-4" />
              <span>{t("landing.badge")}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              {t("landing.hero.title")}{" "}
              <span className="text-primary">{t("landing.hero.title_highlight")}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("landing.hero.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/sign_up" className="flex items-center gap-2">
                  {t("landing.hero.get_started")}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/sign_in">{t("landing.hero.sign_in")}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-20 bg-muted/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t("landing.features.title")}</h2>
              <p className="text-muted-foreground text-lg">
                {t("landing.features.subtitle")}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-background rounded-lg p-6 border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Footer */}
        <footer className="border-t border-border">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
                  <Package className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-sm text-muted-foreground">
                  {t("landing.footer.copyright")} © {new Date().getFullYear()}
                </span>
              </div>
              <div className="flex items-center gap-6">
                <a
                  href="https://github.com/AAlvAAro/react-starter-kit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("landing.footer.github")}
                </a>
                <a
                  href="mailto:hola@alvarodelgado.dev"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("landing.footer.contact")}
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}