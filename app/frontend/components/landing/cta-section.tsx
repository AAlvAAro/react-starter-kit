import { Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-3xl bg-primary p-8 md:p-16 text-center overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-primary-foreground blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-primary-foreground blur-3xl" />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
              Ready to start selling?
            </h2>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Create your free catalog in less than 5 minutes. No credit card
              required.
            </p>
            <Button size="lg" variant="secondary" className="text-base px-8" asChild>
              <Link href="/sign_up">
                Get started free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}