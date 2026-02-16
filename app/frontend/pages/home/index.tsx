import { Head, Link, usePage } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Sparkles, BarChart3, BookOpen, MessageCircle, Github, Mail, ArrowRight, Check, Megaphone, Heart, Handshake, Users } from "lucide-react"
import { t } from "@/lib/i18n"

interface Plan {
  id: number
  name: string
  description: string
  price_cents: number
  interval: string
  currency: string
  credits: number
  features: string[]
  stripe_price_id: string
}

interface HomeProps {
  plans: Plan[]
}

export default function Home({ plans = [] }: HomeProps) {
  const { auth } = usePage().props as any
  const isLoggedIn = auth?.user != null
  const features = [
    {
      icon: BarChart3,
      title: "Análisis de Perfil",
      description: "Entiende al instante la personalidad, intereses y estilo de comunicación de alguien a partir de su presencia social.",
    },
    {
      icon: BookOpen,
      title: "Guía de Preparación",
      description: "Obtén puntos de conversación personalizados, temas para mencionar y cosas que evitar antes de tu reunión.",
    },
    {
      icon: MessageCircle,
      title: "Plantillas de Mensajes",
      description: "Plantillas de DM y mensajes de apertura generados con IA, adaptados a la persona con la que quieres conectar.",
    },
  ]

  const benefits = [
    "Llega a cualquier reunión con confianza",
    "Encuentra puntos en común al instante",
    "Sabe qué temas tocar (y cuáles evitar)",
    "Obtén plantillas de mensajes listas para usar",
  ]

  return (
    <>
      <Head title="Instagram Stalker Pro - Insights de Perfiles de Instagram" />
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border sticky top-0 z-50 bg-card/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="font-semibold text-lg">Instagram Stalker Pro</span>
            </Link>
            <nav className="flex items-center gap-4">
              {isLoggedIn ? (
                <Button asChild>
                  <Link href="/instagram">Ir al Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button variant="ghost" asChild>
                    <Link href="/sign_in">Iniciar sesión</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/sign_up">Comenzar</Link>
                  </Button>
                </>
              )}
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Herramienta de Preparación Social</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Conoce a quien vas a ver{" "}
              <br />
              <span className="text-primary">antes de llegar</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Entiende la personalidad, intereses y estilo de conversación de alguien — para que cada primera impresión cuente.
            </p>
            <div className="flex justify-center">
              <Button size="lg" asChild>
                <Link href={isLoggedIn ? "/instagram" : "/sign_up"} className="flex items-center gap-2">
                  {isLoggedIn ? "Ir al Dashboard" : "Comenzar Gratis"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-20 border-t">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Todo lo que necesitas para prepararte</h2>
              <p className="text-muted-foreground text-lg">
                Desde análisis de perfil hasta práctica de conversación, te tenemos cubierto.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-card rounded-lg p-6 border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="container mx-auto px-4 py-20 bg-muted/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">¿Cómo puedes usarlo?</h2>
              <p className="text-muted-foreground text-lg">
                Casos de uso reales para profesionales y personas
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Megaphone,
                  title: "Marketing e Influencers",
                  description: "Analiza si un creador de contenido es compatible con tu marca antes de invertir en una colaboración.",
                  color: "text-violet-500",
                  bg: "bg-violet-500/10",
                },
                {
                  icon: Handshake,
                  title: "Networking Profesional",
                  description: "Prepárate para reuniones de negocios conociendo los intereses y estilo de comunicación de la otra persona.",
                  color: "text-blue-500",
                  bg: "bg-blue-500/10",
                },
                {
                  icon: Heart,
                  title: "Citas y Relaciones",
                  description: "Entiende la personalidad de alguien que te interesa y encuentra la mejor forma de iniciar una conversación.",
                  color: "text-pink-500",
                  bg: "bg-pink-500/10",
                },
                {
                  icon: Users,
                  title: "Reclutamiento",
                  description: "Conoce mejor a un candidato o empresa antes de una entrevista para causar la mejor impresión.",
                  color: "text-emerald-500",
                  bg: "bg-emerald-500/10",
                },
              ].map((useCase) => (
                <div
                  key={useCase.title}
                  className="bg-background rounded-lg p-6 border border-border hover:border-primary/50 transition-colors"
                >
                  <div className={`w-12 h-12 ${useCase.bg} rounded-lg flex items-center justify-center mb-4`}>
                    <useCase.icon className={`w-6 h-6 ${useCase.color}`} />
                  </div>
                  <h3 className="font-semibold mb-2">{useCase.title}</h3>
                  <p className="text-sm text-muted-foreground">{useCase.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">¿Por qué Instagram Stalker Pro?</h2>
              <p className="text-muted-foreground text-lg">
                Transforma cómo te preparas para conexiones significativas
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3 bg-muted/50 rounded-lg p-4 border border-border">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        {plans.length > 0 && (
          <section className="container mx-auto px-4 py-20">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">Precios Simples y Transparentes</h2>
                <p className="text-muted-foreground text-lg">
                  Elige el plan que mejor se adapte a ti
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {plans.map((plan, index) => {
                  const basePricePerCredit = plans[0]?.price_cents / (plans[0]?.credits || 1)
                  const pricePerCredit = plan.price_cents / (plan.credits || 1)
                  const savingsPercent = plan.credits > 1 ? Math.round((1 - pricePerCredit / basePricePerCredit) * 100) : 0

                  return (
                    <div
                      key={plan.id}
                      className={`bg-background rounded-lg p-8 border transition-all hover:shadow-lg ${
                        index === 1 ? "border-primary shadow-lg scale-105" : "border-border hover:border-primary/50"
                      }`}
                    >
                      {index === 1 && (
                        <span className="inline-block px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full mb-4">
                          Más popular
                        </span>
                      )}
                      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                      <p className="text-muted-foreground mb-4">{plan.description}</p>
                      <div className="mb-4">
                        <span className="text-4xl font-bold">
                          ${(plan.price_cents / 100).toFixed(2)}
                        </span>
                        <span className="text-muted-foreground ml-2">
                          {plan.interval === "month" ? "/mes" : plan.interval === "year" ? "/año" : "pago único"}
                        </span>
                      </div>

                      {/* Credits info */}
                      <div className="mb-6 p-3 rounded-lg bg-muted/50 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Créditos incluidos</span>
                          <span className="text-lg font-bold text-primary">{plan.credits || 1}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Precio por crédito</span>
                          <span className="text-sm font-medium">${(pricePerCredit / 100).toFixed(2)}</span>
                        </div>
                        {savingsPercent > 0 && (
                          <div className="flex items-center justify-between pt-1 border-t border-border/50">
                            <span className="text-sm text-muted-foreground">Ahorro</span>
                            <span className="text-sm font-bold text-green-500">-{savingsPercent}%</span>
                          </div>
                        )}
                      </div>

                      <Button className="w-full mb-6" variant={index === 1 ? "default" : "outline"} asChild>
                        <Link href="/pricing">Comenzar</Link>
                      </Button>
                      <div className="space-y-3">
                        {plan.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        )}


        {/* Footer */}
        <footer className="border-t border-border">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Instagram Stalker Pro © {new Date().getFullYear()}
                </span>
              </div>
              <div className="flex items-center gap-6">
                <a
                  href="https://github.com/AAlvAAro/instagram-profile-insights"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="mailto:hola@alvarodelgado.dev"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contacto
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}