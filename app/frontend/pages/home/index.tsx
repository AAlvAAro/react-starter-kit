import { Head, Link, usePage } from "@inertiajs/react"
import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Package, Zap, Shield, Code, Github, Mail, ArrowRight, Check, Bot, CreditCard, Send, Bug, MessageSquare, Cpu } from "lucide-react"

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
            entry.target.classList.remove("opacity-0", "translate-y-8")
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return ref
}

interface Plan {
  id: number
  name: string
  description: string
  price_cents: number
  interval: string
  currency: string
  features: string[]
  stripe_price_id: string
}

interface HomeProps {
  plans: Plan[]
}

export default function Home({ plans = [] }: HomeProps) {
  const { auth } = usePage().props as any
  const isLoggedIn = auth?.user != null

  const heroRef = useScrollReveal()
  const featuresRef = useScrollReveal()
  const aiRef = useScrollReveal()
  const pricingRef = useScrollReveal()

  const coreFeatures = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Built with Vite and React for blazing fast development and production builds.",
    },
    {
      icon: Shield,
      title: "Secure by Default",
      description: "Authentication, authorization, and security best practices built-in from day one.",
    },
    {
      icon: Code,
      title: "Modern Stack",
      description: "Rails, React, TypeScript, Inertia.js, and TailwindCSS working in perfect harmony.",
    },
    {
      icon: Package,
      title: "Production Ready",
      description: "Includes user management, sessions, email verification, and role-based access control.",
    },
  ]

  const aiFeatures = [
    {
      icon: Cpu,
      title: "FastMCP",
      description: "Model Context Protocol integration for AI assistants and tool calling.",
    },
    {
      icon: Bot,
      title: "ruby_llm",
      description: "Multi-provider LLM support: OpenAI, Anthropic, Google Gemini, and more.",
    },
    {
      icon: CreditCard,
      title: "Stripe",
      description: "Payment processing, subscriptions, and billing portal out of the box.",
    },
    {
      icon: Send,
      title: "Postmark",
      description: "Transactional email delivery with high deliverability rates.",
    },
    {
      icon: Bug,
      title: "Sentry",
      description: "Error tracking and performance monitoring for production.",
    },
    {
      icon: MessageSquare,
      title: "WhatsApp Ready",
      description: "Business API integration for conversational experiences.",
    },
  ]

  return (
    <>
      <Head title="Rails AI Kit - AI-Ready Rails SaaS Starter" />
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border">
          <div className="container mx-auto px-4 py-2 flex items-center justify-between">
            <div className="flex items-center">
              <img src="/icon.png" alt="Rails AI Kit" className="h-12" />
            </div>
            <nav className="flex items-center gap-4">
              <a
                href="https://github.com/AAlvAAro/rails-ai-kit"
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
        <section ref={heroRef} className="container mx-auto px-4 py-20 lg:py-32 opacity-0 translate-y-8 transition-all duration-700 ease-out">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-sm">
              <Zap className="w-4 h-4" />
              <span>Rails + React + TypeScript</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Build Modern Web Apps{" "}
              <span className="text-primary">Faster</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A production-ready starter kit combining the power of Ruby on Rails with the flexibility of React. Authentication, user management, and modern UI components included.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/docs" className="flex items-center gap-2">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href={isLoggedIn ? "/dashboard" : "/sign_in"}>
                  {isLoggedIn ? "Go to Dashboard" : "Sign In"}
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section ref={featuresRef} className="container mx-auto px-4 py-20 bg-muted/50 opacity-0 translate-y-8 transition-all duration-700 ease-out">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything You Need</h2>
              <p className="text-muted-foreground text-lg">
                Built with modern best practices and production-ready features
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreFeatures.map((feature) => (
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

        {/* AI Features Section */}
        <section ref={aiRef} className="container mx-auto px-4 py-20 opacity-0 translate-y-8 transition-all duration-700 ease-out">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-sm text-primary mb-4">
                <Bot className="w-4 h-4" />
                <span>AI-Powered</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">AI & Integrations</h2>
              <p className="text-muted-foreground text-lg">
                Pre-configured integrations to build AI-powered SaaS applications
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {aiFeatures.map((feature) => (
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

        {/* Pricing Section */}
        {plans.length > 0 && (
          <section ref={pricingRef} className="container mx-auto px-4 py-20 opacity-0 translate-y-8 transition-all duration-700 ease-out">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
                <p className="text-muted-foreground text-lg">
                  Choose the plan that works best for you
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className="bg-background rounded-lg p-8 border border-border hover:border-primary/50 transition-all hover:shadow-lg"
                  >
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground mb-6">{plan.description}</p>
                    <div className="mb-6">
                      <span className="text-4xl font-bold">
                        ${(plan.price_cents / 100).toFixed(2)}
                      </span>
                      <span className="text-muted-foreground">
                        /{plan.interval === "month" ? "mo" : plan.interval === "year" ? "yr" : ""}
                      </span>
                    </div>
                    <Button className="w-full mb-6" asChild>
                      <Link href="/pricing">Get Started</Link>
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
                ))}
              </div>
            </div>
          </section>
        )}


        {/* Footer */}
        <footer className="border-t border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col items-center justify-center">
              <img src="/logo.png" alt="Rails AI Kit" className="h-18" />
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}