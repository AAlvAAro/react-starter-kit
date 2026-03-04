import { Head, Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Terminal, Key, Server, CreditCard, Bot, Mail, Bug, Rocket } from "lucide-react"

const sections = [
  { id: "quick-start", label: "Quick Start", icon: Terminal },
  { id: "environment", label: "Environment Variables", icon: Key },
  { id: "stripe", label: "Stripe", icon: CreditCard },
  { id: "ai", label: "AI Integration", icon: Bot },
  { id: "email", label: "Email (Postmark)", icon: Mail },
  { id: "deployment", label: "Deployment", icon: Rocket },
  { id: "sentry", label: "Error Tracking", icon: Bug },
  { id: "ssr", label: "SSR", icon: Server },
]

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" })
  }
}

export default function Docs() {
  return (
    <>
      <Head title="Documentation - Rails AI Kit" />
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Link>
              </Button>
              <span className="font-semibold text-lg">Documentation</span>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0 border-r border-border sticky top-[65px] h-[calc(100vh-65px)] overflow-y-auto">
            <nav className="p-4 space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors text-left"
                >
                  <section.icon className="w-4 h-4" />
                  {section.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <div className="flex-1 px-4 py-12 max-w-4xl mx-auto">
          {/* Introduction */}
          <section className="mb-16">
            <h1 className="text-4xl font-bold mb-4">Getting Started</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Rails AI Kit is a production-ready starter kit that combines Ruby on Rails with React, TypeScript, and AI integrations. Follow this guide to customize it for your project.
            </p>
          </section>

          {/* Quick Start */}
          <section id="quick-start" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Terminal className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Quick Start</h2>
            </div>
            <div className="bg-muted rounded-lg p-6 space-y-4">
              <pre className="text-sm overflow-x-auto">
{`# Clone the repository
git clone https://github.com/AAlvAAro/rails-ai-kit.git
cd rails-ai-kit

# Install dependencies and setup database
bin/setup

# Start the development server
bin/dev

# Open http://localhost:3000`}
              </pre>
            </div>
          </section>

          {/* Environment Variables */}
          <section id="environment" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Key className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Environment Variables</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Create a <code className="bg-muted px-2 py-1 rounded">.env</code> file in the root directory with the following variables:
            </p>
            <div className="bg-muted rounded-lg p-6 space-y-4">
              <pre className="text-sm overflow-x-auto">
{`# Application
APP_URL=http://localhost:3000

# Stripe (Payments)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PAYMENT_MODE=subscription  # or "payment" for one-time

# Postmark (Email)
POSTMARK_API_TOKEN=your_postmark_token

# OpenAI (LLM)
OPENAI_API_KEY=sk-...

# Anthropic (Optional)
ANTHROPIC_API_KEY=sk-ant-...

# Google Gemini (Optional)
GEMINI_API_KEY=...

# FastMCP (Production only)
FAST_MCP_AUTH_TOKEN=your_secure_token

# Sentry (Error Tracking)
SENTRY_DSN=https://...@sentry.io/...`}
              </pre>
            </div>
          </section>

          {/* Stripe Configuration */}
          <section id="stripe" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Stripe Configuration</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Stripe is pre-configured for subscriptions and one-time payments. The configuration is in{" "}
                <code className="bg-muted px-2 py-1 rounded">config/initializers/stripe.rb</code>.
              </p>
              <h3 className="text-lg font-semibold text-foreground mt-6">Setup Steps:</h3>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Create a Stripe account at <a href="https://stripe.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">stripe.com</a></li>
                <li>Get your API keys from the Stripe Dashboard</li>
                <li>Create products and prices in Stripe</li>
                <li>Set up a webhook endpoint pointing to <code className="bg-muted px-2 py-1 rounded">/webhooks/stripe</code></li>
                <li>Add the webhook secret to your environment variables</li>
              </ol>
              <h3 className="text-lg font-semibold text-foreground mt-6">Creating Plans:</h3>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm overflow-x-auto">
{`# In Rails console
Plan.create!(
  name: "Pro",
  description: "For professionals",
  price_cents: 2900,
  interval: "month",
  currency: "usd",
  stripe_price_id: "price_xxx",
  features: ["Feature 1", "Feature 2"],
  active: true,
  position: 1
)`}
                </pre>
              </div>
              <div className="mt-2 text-right">
                <a
                  href="https://stripe.com/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  Stripe Documentation →
                </a>
              </div>
            </div>
          </section>

          {/* AI Integration */}
          <section id="ai" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">AI Integration</h2>
            </div>
            <div className="space-y-6 text-muted-foreground">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">ruby_llm</h3>
                <p className="mb-2">Multi-provider LLM support for OpenAI, Anthropic, and Google Gemini.</p>
                <div className="bg-muted rounded-lg p-4">
                  <pre className="text-sm overflow-x-auto">
{`# Basic usage
chat = RubyLLM.chat(model: "gpt-4o-mini")
response = chat.ask("Hello, world!")

# With streaming
chat.ask("Tell me a story") do |chunk|
  print chunk.content
end`}
                  </pre>
                </div>
                <div className="mt-2 text-right">
                  <a
                    href="https://github.com/crmne/ruby_llm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    ruby_llm Documentation →
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">FastMCP</h3>
                <p className="mb-2">
                  Model Context Protocol for AI assistants. Create tools in{" "}
                  <code className="bg-muted px-2 py-1 rounded">app/tools/</code> that inherit from{" "}
                  <code className="bg-muted px-2 py-1 rounded">ApplicationTool</code>.
                </p>
                <div className="bg-muted rounded-lg p-4">
                  <pre className="text-sm overflow-x-auto">
{`# app/tools/weather_tool.rb
class WeatherTool < ApplicationTool
  description "Get weather for a location"

  arguments do
    required(:location).filled(:string).description("City name")
  end

  def call(location:)
    # Your implementation
    { temperature: 72, condition: "sunny" }
  end
end`}
                  </pre>
                </div>
                <div className="mt-2 text-right">
                  <a
                    href="https://github.com/yjacquin/fast-mcp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    FastMCP Documentation →
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Email Configuration */}
          <section id="email" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Email (Postmark)</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Postmark is configured for transactional emails. Set your{" "}
                <code className="bg-muted px-2 py-1 rounded">POSTMARK_API_TOKEN</code> in the environment.
              </p>
              <p>
                In development, emails are opened in your browser using{" "}
                <code className="bg-muted px-2 py-1 rounded">letter_opener</code>.
              </p>
              <div className="mt-2 text-right">
                <a
                  href="https://postmarkapp.com/developer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  Postmark Documentation →
                </a>
              </div>
            </div>
          </section>

          {/* Deployment */}
          <section id="deployment" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Rocket className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Deployment (Kamal)</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                This project uses Kamal for zero-downtime deployments. Update the following files:
              </p>
              <h3 className="text-lg font-semibold text-foreground mt-6">config/deploy.yml</h3>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm overflow-x-auto">
{`# Update these values:
service: your_app_name
image: your_dockerhub_username/your_app_name

servers:
  web:
    - YOUR_SERVER_IP

registry:
  username: your_dockerhub_username

volumes:
  - "your_app_name:/rails/storage"

builder:
  cache:
    image: your_dockerhub_username/your_app_name-build-cache`}
                </pre>
              </div>

              <h3 className="text-lg font-semibold text-foreground mt-6">.kamal/secrets</h3>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm overflow-x-auto">
{`# Set these secrets:
KAMAL_REGISTRY_PASSWORD=your_dockerhub_token
RAILS_MASTER_KEY=your_master_key
POSTMARK_API_TOKEN=your_postmark_token
OPENAI_API_KEY=your_openai_key`}
                </pre>
              </div>

              <h3 className="text-lg font-semibold text-foreground mt-6">Rails Master Key</h3>
              <p className="mb-2">
                The master key is used to decrypt Rails credentials. It's stored in{" "}
                <code className="bg-muted px-2 py-1 rounded">config/master.key</code> (gitignored).
              </p>
              <div className="bg-muted rounded-lg p-4 mb-4">
                <pre className="text-sm overflow-x-auto">
{`# View your master key (keep this secret!)
cat config/master.key

# Edit credentials (opens in editor)
EDITOR=vim bin/rails credentials:edit

# If you lose master.key, you must regenerate credentials:
rm config/credentials.yml.enc
EDITOR=vim bin/rails credentials:edit
# This creates a new master.key and credentials.yml.enc

# For production, add master key to .kamal/secrets:
RAILS_MASTER_KEY=your_32_character_hex_key`}
                </pre>
              </div>
              <p className="text-sm mb-4">
                <strong className="text-foreground">Important:</strong> Never commit{" "}
                <code className="bg-muted px-2 py-1 rounded">config/master.key</code> to git.
                Share it securely with team members and store it in your deployment secrets.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6">Secrets Management</h3>
              <p className="mb-2">
                For secure secrets storage, consider using a secrets manager:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>
                  <a
                    href="https://bitwarden.com/help/secrets-manager/"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Bitwarden Secrets Manager
                  </a>
                  {" "}- Open source, self-hostable option
                </li>
                <li>
                  <a
                    href="https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    AWS Secrets Manager
                  </a>
                  {" "}- Enterprise-grade with rotation support
                </li>
                <li>
                  <a
                    href="https://kamal-deploy.org/docs/commands/secrets/"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Kamal Secrets Documentation
                  </a>
                  {" "}- How to integrate secrets managers with Kamal
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mt-6">Deploy Commands</h3>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm overflow-x-auto">
{`# First deployment
bin/kamal setup

# Subsequent deployments
bin/kamal deploy

# Useful aliases
bin/kamal console  # Rails console
bin/kamal logs     # Tail logs
bin/kamal shell    # SSH into container`}
                </pre>
              </div>
              <div className="mt-2 text-right">
                <a
                  href="https://kamal-deploy.org/docs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  Kamal Documentation →
                </a>
              </div>
            </div>
          </section>

          {/* Error Tracking */}
          <section id="sentry" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Bug className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Error Tracking (Sentry)</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Sentry is included for error tracking and performance monitoring. Set your{" "}
                <code className="bg-muted px-2 py-1 rounded">SENTRY_DSN</code> in the environment to enable it.
              </p>
              <div className="mt-2 text-right">
                <a
                  href="https://docs.sentry.io/platforms/ruby/guides/rails/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  Sentry Documentation →
                </a>
              </div>
            </div>
          </section>

          {/* Server Configuration */}
          <section id="ssr" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Server className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Server-Side Rendering (SSR)</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>To enable SSR, uncomment the following in your files:</p>
              <h3 className="text-lg font-semibold text-foreground mt-4">app/frontend/entrypoints/inertia.tsx</h3>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm overflow-x-auto">
{`if (el.hasChildNodes()) {
  hydrateRoot(el, createElement(App, props))
  return
}`}
                </pre>
              </div>
              <h3 className="text-lg font-semibold text-foreground mt-4">config/deploy.yml</h3>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm overflow-x-auto">
{`servers:
  vite_ssr:
    hosts:
      - YOUR_SERVER_IP
    cmd: bundle exec vite ssr
    options:
      network-alias: vite_ssr

env:
  clear:
    INERTIA_SSR_ENABLED: true
    INERTIA_SSR_URL: "http://vite_ssr:13714"

builder:
  dockerfile: Dockerfile-ssr`}
                </pre>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t border-border pt-8 mt-16">
            <div className="flex flex-col items-center justify-center">
              <img src="/logo.png" alt="Rails AI Kit" className="h-16 mb-4" />
              <p className="text-sm text-muted-foreground">
                Built with Rails, React, and TypeScript
              </p>
            </div>
          </footer>
          </div>
        </div>
      </div>
    </>
  )
}
