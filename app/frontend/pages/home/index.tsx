import { Head, Link, usePage } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Sparkles, BarChart3, BookOpen, MessageCircle, Github, Mail, ArrowRight, Check } from "lucide-react"
import { t } from "@/lib/i18n"

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
  const features = [
    {
      icon: BarChart3,
      title: "Profile Snapshot",
      description: "Instantly understand someone's personality, interests, and communication style from their social presence.",
    },
    {
      icon: BookOpen,
      title: "Conversation Prep",
      description: "Get tailored talking points, topics to bring up, and things to avoid before your meeting.",
    },
    {
      icon: MessageCircle,
      title: "Icebreaker Simulator",
      description: "Practice starting conversations with AI personas so you feel confident walking in.",
    },
  ]

  const benefits = [
    "Walk into any meeting with confidence",
    "Find common ground instantly",
    "Know what topics to bring up (and avoid)",
    "Practice icebreakers before going live",
  ]

  return (
    <>
      <Head title="MeetIQ - Instagram Profile Insights" />
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border sticky top-0 z-50 bg-card/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="font-semibold text-lg">MeetIQ</span>
            </Link>
            <nav className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link href="/sign_in">Sign in</Link>
              </Button>
              <Button asChild>
                <Link href="/sign_up">Get Started</Link>
              </Button>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Social Preparation Tool</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Know who you're meeting{" "}
              <br />
              <span className="text-primary">before you walk in</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Understand someone's personality, interests, and conversation style — so every first impression counts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/sign_up" className="flex items-center gap-2">
                  Start Preparing
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href={isLoggedIn ? "/instagram" : "/sign_in"}>
                  {isLoggedIn ? "View Demo" : "Sign In"}
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-20 border-t">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything you need to prepare</h2>
              <p className="text-muted-foreground text-lg">
                From profile analysis to conversation practice, we've got you covered.
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

        {/* Benefits Section */}
        <section className="container mx-auto px-4 py-20 bg-muted/50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why MeetIQ?</h2>
              <p className="text-muted-foreground text-lg">
                Transform how you prepare for meaningful connections
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3 bg-background rounded-lg p-4 border border-border">
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
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  MeetIQ © {new Date().getFullYear()}
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
                  Contact
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}