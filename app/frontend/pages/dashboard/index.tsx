import { Link } from "@inertiajs/react"
import { Instagram, Music, ArrowRight, Sparkles } from "lucide-react"
import { DashboardLayout } from "@/layouts/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="animate-fade-up max-w-3xl mx-auto">
        {/* Page header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 text-primary mb-4">
            <Sparkles className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold mb-2">¿Qué perfil quieres investigar?</h1>
          <p className="text-muted-foreground">
            Selecciona una plataforma para comenzar tu análisis
          </p>
        </div>

        {/* Platform selection */}
        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/instagram" className="block group">
            <Card className="h-full hover:border-primary/50 hover:bg-accent/30 transition-all cursor-pointer">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Instagram className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Instagram</h2>
                <p className="text-muted-foreground text-sm mb-4">
                  Analiza perfiles de Instagram para obtener insights de personalidad, intereses y estrategias de comunicación.
                </p>
                <div className="flex items-center gap-2 text-primary text-sm font-medium">
                  Comenzar análisis
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/tiktok" className="block group">
            <Card className="h-full hover:border-primary/50 hover:bg-accent/30 transition-all cursor-pointer">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-black flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Music className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-xl font-semibold mb-2">TikTok</h2>
                <p className="text-muted-foreground text-sm mb-4">
                  Analiza perfiles de TikTok para descubrir su estilo, temas de interés y cómo conectar con ellos.
                </p>
                <div className="flex items-center gap-2 text-primary text-sm font-medium">
                  Comenzar análisis
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  )
}