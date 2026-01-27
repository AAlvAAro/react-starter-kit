import { Star } from "lucide-react"

const testimonials = [
  {
    quote:
      "CatalogoPro changed how I run my business. I used to spend hours managing orders on WhatsApp — now everything is automated.",
    author: "María García",
    business: "Artesanías María",
    location: "Mexico City, MX",
    avatar: "MG",
  },
  {
    quote:
      "My customers love how easy it is to browse and order. Sales increased 40% in the first month after switching to CatalogoPro.",
    author: "Carlos Rodríguez",
    business: "Tech Accessories CR",
    location: "Bogotá, CO",
    avatar: "CR",
  },
  {
    quote:
      "Finally, a tool that understands how we actually sell in Latin America. WhatsApp integration is exactly what we needed.",
    author: "Ana Martínez",
    business: "Boutique Ana",
    location: "Buenos Aires, AR",
    avatar: "AM",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Loved by small businesses
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join hundreds of entrepreneurs who've simplified their online sales
            with CatalogoPro.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-warning text-warning"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.business}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}