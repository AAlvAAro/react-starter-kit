import { Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import { t } from "@/lib/i18n"

export function HeroSection() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
              {t("landing.hero.badge")}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              {t("landing.hero.title")}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              {t("landing.hero.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" asChild className="text-base px-8">
                <Link href="/sign_up">
                  {t("landing.hero.cta_primary")}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base">
                <Play className="w-4 h-4 mr-2" />
                {t("landing.hero.cta_secondary")}
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              {t("landing.hero.free_note")}
            </p>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Browser Mockup */}
              <div className="bg-card rounded-2xl shadow-2xl border border-border overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 bg-muted border-b border-border">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-destructive/60" />
                    <div className="w-3 h-3 rounded-full bg-warning/60" />
                    <div className="w-3 h-3 rounded-full bg-success/60" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-background rounded-md px-3 py-1 text-xs text-muted-foreground text-center">
                      catalogo.pro/tu-tienda
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-background">
                  {/* Mock Catalog Preview */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                        MT
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">
                          Mi Tienda
                        </div>
                        <div className="text-sm text-muted-foreground">
                          @mitienda • 24 productos
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="rounded-xl bg-muted aspect-square flex items-center justify-center"
                        >
                          <div className="text-center">
                            <div className="w-12 h-12 mx-auto mb-2 bg-secondary rounded-lg" />
                            <div className="text-xs text-muted-foreground">
                              Producto {i}
                            </div>
                            <div className="text-sm font-semibold text-foreground">
                              $299
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full" size="sm">
                      Ver catálogo completo
                    </Button>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -right-4 top-1/4 bg-card rounded-xl shadow-lg border border-border p-3 hidden lg:block">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                    <span className="text-success text-sm">✓</span>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">
                      Nuevo pedido
                    </div>
                    <div className="text-sm font-semibold text-foreground">
                      $1,250 MXN
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -left-4 bottom-1/4 bg-card rounded-xl shadow-lg border border-border p-3 hidden lg:block">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-info/20 flex items-center justify-center">
                    <span className="text-info text-sm">📱</span>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">WhatsApp</div>
                    <div className="text-sm font-semibold text-foreground">
                      12 mensajes
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}