import { Package, Share2, Bell } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Package,
    title: "Create your catalog",
    description:
      "Add your products, prices, and photos. Organize by category. It takes just minutes to get started.",
  },
  {
    number: "02",
    icon: Share2,
    title: "Share your link",
    description:
      "Send your catalog link via WhatsApp, add it to your Instagram bio, or print a QR code for your store.",
  },
  {
    number: "03",
    icon: Bell,
    title: "Receive orders",
    description:
      "Customers browse, add to cart, and order via WhatsApp. You get notified instantly on your phone.",
  },
]

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-muted/30"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Up and running in 3 steps
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            No technical skills required. If you can use WhatsApp, you can use
            CatalogoPro.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-border" />
              )}

              <div className="relative bg-card rounded-2xl p-8 border border-border text-center hover:shadow-lg transition-shadow">
                {/* Step number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                  {index + 1}
                </div>

                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-6 mt-2">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}