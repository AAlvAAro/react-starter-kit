import { t } from "@/lib/i18n"

export function SocialProofBar() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 border-y border-border bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-sm text-muted-foreground mb-8">
          {t("landing.social_proof.trusted_by")}{" "}
          <span className="font-semibold text-foreground">500+</span>{" "}
          {t("landing.social_proof.businesses")}
        </p>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {["TiendaMX", "ShopCO", "VentasRD", "ComercioAR", "MercadoBR"].map(
            (name, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-muted-foreground/60 hover:text-muted-foreground transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                  <span className="text-xs font-bold">{name.slice(0, 2)}</span>
                </div>
                <span className="font-medium text-sm hidden sm:inline">
                  {name}
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  )
}