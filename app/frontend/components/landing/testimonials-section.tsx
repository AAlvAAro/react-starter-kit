import { Star } from "lucide-react"
import { t } from "@/lib/i18n"

const getTestimonials = () => [
  {
    quote: t("landing.testimonials.quote1"),
    author: "María García",
    business: "Artesanías María",
    location: "Mexico City, MX",
    avatar: "MG",
  },
  {
    quote: t("landing.testimonials.quote2"),
    author: "Carlos Rodríguez",
    business: "Tech Accessories CR",
    location: "Bogotá, CO",
    avatar: "CR",
  },
  {
    quote: t("landing.testimonials.quote3"),
    author: "Ana Martínez",
    business: "Boutique Ana",
    location: "Buenos Aires, AR",
    avatar: "AM",
  },
]

export function TestimonialsSection() {
  const testimonials = getTestimonials()

  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("landing.testimonials.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("landing.testimonials.subtitle")}
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