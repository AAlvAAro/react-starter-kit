import { Head, Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Terminal,
  Key,
  Server,
  CreditCard,
  Bot,
  Mail,
  Bug,
  Rocket,
} from "lucide-react"

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
      <div className="bg-background min-h-screen">
        {/* Header */}
        <header className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b backdrop-blur">
          <div className="container mx-auto flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Link>
              </Button>
              <span className="text-lg font-semibold">Documentation</span>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar */}
          <aside className="border-border sticky top-[65px] hidden h-[calc(100vh-65px)] w-64 shrink-0 overflow-y-auto border-r lg:block">
            <nav className="space-y-1 p-4">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="text-muted-foreground hover:text-foreground hover:bg-muted flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors"
                >
                  <section.icon className="h-4 w-4" />
                  {section.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <div className="mx-auto max-w-4xl flex-1 px-4 py-12">
            {/* Introduction */}
            <section className="mb-16">
              <h1 className="mb-4 text-4xl font-bold">Getting Started</h1>
              <p className="text-muted-foreground mb-8 text-lg">
                Rails AI Kit is a production-ready starter kit that combines
                Ruby on Rails with React, TypeScript, and AI integrations.
                Follow this guide to customize it for your project.
              </p>
            </section>

            {/* Quick Start */}
            <section id="quick-start" className="mb-16 scroll-mt-20">
              <div className="mb-6 flex items-center gap-3">
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                  <Terminal className="text-primary h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold">Quick Start</h2>
              </div>
              <div className="bg-muted space-y-4 rounded-lg p-6">
                <pre className="overflow-x-auto text-sm">
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
              <div className="mb-6 flex items-center gap-3">
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                  <Key className="text-primary h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold">Environment Variables</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Create a{" "}
                <code className="bg-muted rounded px-2 py-1">.env</code> file in
                the root directory with the following variables:
              </p>
              <div className="bg-muted space-y-4 rounded-lg p-6">
                <pre className="overflow-x-auto text-sm">
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
              <div className="mb-6 flex items-center gap-3">
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                  <CreditCard className="text-primary h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold">Stripe Configuration</h2>
              </div>
              <div className="text-muted-foreground space-y-4">
                <p>
                  Stripe is pre-configured for subscriptions and one-time
                  payments. The configuration is in{" "}
                  <code className="bg-muted rounded px-2 py-1">
                    config/initializers/stripe.rb
                  </code>
                  .
                </p>
                <h3 className="text-foreground mt-6 text-lg font-semibold">
                  Setup Steps:
                </h3>
                <ol className="ml-4 list-inside list-decimal space-y-2">
                  <li>
                    Create a Stripe account at{" "}
                    <a
                      href="https://stripe.com"
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      stripe.com
                    </a>
                  </li>
                  <li>Get your API keys from the Stripe Dashboard</li>
                  <li>Create products and prices in Stripe</li>
                  <li>
                    Set up a webhook endpoint pointing to{" "}
                    <code className="bg-muted rounded px-2 py-1">
                      /webhooks/stripe
                    </code>
                  </li>
                  <li>Add the webhook secret to your environment variables</li>
                </ol>
                <h3 className="text-foreground mt-6 text-lg font-semibold">
                  Creating Plans:
                </h3>
                <div className="bg-muted rounded-lg p-4">
                  <pre className="overflow-x-auto text-sm">
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
                    className="text-primary text-sm hover:underline"
                  >
                    Stripe Documentation →
                  </a>
                </div>
              </div>
            </section>

            {/* AI Integration */}
            <section id="ai" className="mb-16 scroll-mt-20">
              <div className="mb-6 flex items-center gap-3">
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                  <Bot className="text-primary h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold">AI Integration</h2>
              </div>
              <div className="text-muted-foreground space-y-6">
                <div>
                  <h3 className="text-foreground mb-2 text-lg font-semibold">
                    ruby_llm
                  </h3>
                  <p className="mb-2">
                    Multi-provider LLM support for OpenAI, Anthropic, and Google
                    Gemini.
                  </p>
                  <div className="bg-muted rounded-lg p-4">
                    <pre className="overflow-x-auto text-sm">
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
                      className="text-primary text-sm hover:underline"
                    >
                      ruby_llm Documentation →
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="text-foreground mb-2 text-lg font-semibold">
                    FastMCP
                  </h3>
                  <p className="mb-2">
                    Model Context Protocol for AI assistants. Create tools in{" "}
                    <code className="bg-muted rounded px-2 py-1">
                      app/tools/
                    </code>{" "}
                    that inherit from{" "}
                    <code className="bg-muted rounded px-2 py-1">
                      ApplicationTool
                    </code>
                    .
                  </p>
                  <div className="bg-muted rounded-lg p-4">
                    <pre className="overflow-x-auto text-sm">
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
                      className="text-primary text-sm hover:underline"
                    >
                      FastMCP Documentation →
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Email Configuration */}
            <section id="email" className="mb-16 scroll-mt-20">
              <div className="mb-6 flex items-center gap-3">
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                  <Mail className="text-primary h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold">Email (Postmark)</h2>
              </div>
              <div className="text-muted-foreground space-y-4">
                <p>
                  Postmark is configured for transactional emails. Set your{" "}
                  <code className="bg-muted rounded px-2 py-1">
                    POSTMARK_API_TOKEN
                  </code>{" "}
                  in the environment.
                </p>
                <p>
                  In development, emails are opened in your browser using{" "}
                  <code className="bg-muted rounded px-2 py-1">
                    letter_opener
                  </code>
                  .
                </p>
                <div className="mt-2 text-right">
                  <a
                    href="https://postmarkapp.com/developer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-sm hover:underline"
                  >
                    Postmark Documentation →
                  </a>
                </div>
              </div>
            </section>

            {/* Deployment */}
            <section id="deployment" className="mb-16 scroll-mt-20">
              <div className="mb-6 flex items-center gap-3">
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                  <Rocket className="text-primary h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold">Deployment (Kamal)</h2>
              </div>
              <div className="text-muted-foreground space-y-4">
                <p>
                  This project uses Kamal for zero-downtime deployments. Update
                  the following files:
                </p>
                <h3 className="text-foreground mt-6 text-lg font-semibold">
                  config/deploy.yml
                </h3>
                <div className="bg-muted rounded-lg p-4">
                  <pre className="overflow-x-auto text-sm">
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

                <h3 className="text-foreground mt-6 text-lg font-semibold">
                  .kamal/secrets
                </h3>
                <div className="bg-muted rounded-lg p-4">
                  <pre className="overflow-x-auto text-sm">
                    {`# Set these secrets:
KAMAL_REGISTRY_PASSWORD=your_dockerhub_token
RAILS_MASTER_KEY=your_master_key
POSTMARK_API_TOKEN=your_postmark_token
OPENAI_API_KEY=your_openai_key`}
                  </pre>
                </div>

                <h3 className="text-foreground mt-6 text-lg font-semibold">
                  Rails Master Key
                </h3>
                <p className="mb-2">
                  The master key is used to decrypt Rails credentials. It's
                  stored in{" "}
                  <code className="bg-muted rounded px-2 py-1">
                    config/master.key
                  </code>{" "}
                  (gitignored).
                </p>
                <div className="bg-muted mb-4 rounded-lg p-4">
                  <pre className="overflow-x-auto text-sm">
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
                <p className="mb-4 text-sm">
                  <strong className="text-foreground">Important:</strong> Never
                  commit{" "}
                  <code className="bg-muted rounded px-2 py-1">
                    config/master.key
                  </code>{" "}
                  to git. Share it securely with team members and store it in
                  your deployment secrets.
                </p>

                <h3 className="text-foreground mt-6 text-lg font-semibold">
                  Secrets Management
                </h3>
                <p className="mb-2">
                  For secure secrets storage, consider using a secrets manager:
                </p>
                <ul className="mb-4 ml-4 list-inside list-disc space-y-2">
                  <li>
                    <a
                      href="https://bitwarden.com/help/secrets-manager/"
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Bitwarden Secrets Manager
                    </a>{" "}
                    - Open source, self-hostable option
                  </li>
                  <li>
                    <a
                      href="https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html"
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      AWS Secrets Manager
                    </a>{" "}
                    - Enterprise-grade with rotation support
                  </li>
                  <li>
                    <a
                      href="https://kamal-deploy.org/docs/commands/secrets/"
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Kamal Secrets Documentation
                    </a>{" "}
                    - How to integrate secrets managers with Kamal
                  </li>
                </ul>

                <h3 className="text-foreground mt-6 text-lg font-semibold">
                  Deploy Commands
                </h3>
                <div className="bg-muted rounded-lg p-4">
                  <pre className="overflow-x-auto text-sm">
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
                    className="text-primary text-sm hover:underline"
                  >
                    Kamal Documentation →
                  </a>
                </div>
              </div>
            </section>

            {/* Error Tracking */}
            <section id="sentry" className="mb-16 scroll-mt-20">
              <div className="mb-6 flex items-center gap-3">
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                  <Bug className="text-primary h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold">Error Tracking (Sentry)</h2>
              </div>
              <div className="text-muted-foreground space-y-4">
                <p>
                  Sentry is included for error tracking and performance
                  monitoring. Set your{" "}
                  <code className="bg-muted rounded px-2 py-1">SENTRY_DSN</code>{" "}
                  in the environment to enable it.
                </p>
                <div className="mt-2 text-right">
                  <a
                    href="https://docs.sentry.io/platforms/ruby/guides/rails/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-sm hover:underline"
                  >
                    Sentry Documentation →
                  </a>
                </div>
              </div>
            </section>

            {/* Server Configuration */}
            <section id="ssr" className="mb-16 scroll-mt-20">
              <div className="mb-6 flex items-center gap-3">
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                  <Server className="text-primary h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold">
                  Server-Side Rendering (SSR)
                </h2>
              </div>
              <div className="text-muted-foreground space-y-4">
                <p>To enable SSR, uncomment the following in your files:</p>
                <h3 className="text-foreground mt-4 text-lg font-semibold">
                  app/frontend/entrypoints/inertia.tsx
                </h3>
                <div className="bg-muted rounded-lg p-4">
                  <pre className="overflow-x-auto text-sm">
                    {`if (el.hasChildNodes()) {
  hydrateRoot(el, createElement(App, props))
  return
}`}
                  </pre>
                </div>
                <h3 className="text-foreground mt-4 text-lg font-semibold">
                  config/deploy.yml
                </h3>
                <div className="bg-muted rounded-lg p-4">
                  <pre className="overflow-x-auto text-sm">
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
            <footer className="border-border mt-16 border-t pt-8">
              <div className="flex flex-col items-center justify-center">
                <img src="/logo.png" alt="Rails AI Kit" className="mb-4 h-16" />
                <p className="text-muted-foreground text-sm">
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
