import { useState, useEffect } from "react";
import { router, usePage } from "@inertiajs/react";
import { createConsumer } from "@rails/actioncable";
import type { SharedData } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, ArrowRight, Search, Sparkles, Loader2, Brain, FileText, ChevronLeft, ChevronRight, Clock, Music } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/layouts/dashboard-layout";
import { cn } from "@/lib/utils";

interface ProfileSearchItem {
  id: number;
  username: string;
  searched_at: string;
  name?: string;
  avatar?: string;
  is_business?: boolean;
  is_verified?: boolean;
  status?: string;
}

interface Filters {
  q?: string;
}

interface Pagination {
  current_page: number;
  total_pages: number;
  total_count: number;
  per_page: number;
}

interface IndexProps {
  searches: ProfileSearchItem[];
  pagination?: Pagination;
  filters?: Filters;
}

export default function TiktokIndex({ searches = [], pagination, filters }: IndexProps) {
  const { auth } = usePage<SharedData>().props;
  const creditsRemaining = auth?.user?.credits_remaining ?? 0;

  const [username, setUsername] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchedUsername, setSearchedUsername] = useState("");
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Subscribe to Action Cable for real-time updates
  const hasProcessingSearches = searches.some(s => s.status === "processing" || s.status === "pending");

  useEffect(() => {
    if (!hasProcessingSearches) return;

    const cable = createConsumer();
    const subscription = cable.subscriptions.create("TiktokSearchesChannel", {
      received(data: { type: string }) {
        if (data.type === "profile_ready") {
          router.reload();
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [hasProcessingSearches]);

  const loadingMessages = [
    // Process messages
    { text: "Conectando con TikTok...", icon: Music },
    { text: "Descargando información del perfil...", icon: Music },
    { text: "Analizando contenido reciente...", icon: FileText },
    // Value propositions
    { text: "💡 Descubre su estilo de comunicación preferido", icon: Brain },
    { text: "🎯 Identifica temas que le apasionan", icon: Sparkles },
    // More process
    { text: "Procesando patrones de contenido...", icon: FileText },
    { text: "Generando análisis de personalidad...", icon: Brain },
    // Value propositions
    { text: "💬 Obtén plantillas de mensajes personalizadas", icon: Sparkles },
    { text: "🤝 Prepárate para causar una gran primera impresión", icon: Brain },
    // More process
    { text: "Creando guía de preparación...", icon: Sparkles },
    { text: "Analizando tono y estilo...", icon: FileText },
    // Value propositions
    { text: "📊 Entiende qué contenido le interesa más", icon: Brain },
    { text: "✨ Encuentra puntos en común para conectar", icon: Sparkles },
    // Final process
    { text: "Preparando plantillas de mensajes...", icon: Sparkles },
    { text: "Finalizando insights personalizados...", icon: Sparkles },
    // More value
    { text: "🎯 Sabe qué temas evitar en la conversación", icon: Brain },
    { text: "💼 Ideal para reuniones de negocios o citas", icon: Sparkles },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSearch = async () => {
    if (!username.trim()) return;

    const cleanUsername = username.replace(/^@/, "");
    setSearchedUsername(cleanUsername);

    // Check credits for new searches
    if (creditsRemaining === 0) {
      const existingSearch = searches.find(s => s.username === cleanUsername);
      if (!existingSearch) {
        router.visit('/pricing');
        return;
      }
    }

    setIsSearching(true);
    setCarouselIndex(0);

    // Carousel message rotation
    const carouselInterval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);

    try {
      const response = await fetch("/tiktok/fetch_profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "",
        },
        body: JSON.stringify({ username: cleanUsername }),
      });

      if (!response.ok) {
        clearInterval(carouselInterval);
        setIsSearching(false);
        setCarouselIndex(0);
        alert("No se pudo encontrar el perfil. Verifica el nombre de usuario.");
        return;
      }

      clearInterval(carouselInterval);

      setTimeout(() => {
        router.post("/tiktok", { username: cleanUsername }, {
          onFinish: () => {
            setIsSearching(false);
            setCarouselIndex(0);
          }
        });
      }, 800);
    } catch {
      setIsSearching(false);
      setCarouselIndex(0);
      alert("Error al buscar el perfil.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <DashboardLayout>
      {/* Loading Overlay with Steps */}
      {isSearching && (
        <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="max-w-md w-full mx-4 space-y-8">
            <div className="text-center space-y-2">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Analizando perfil</h2>
              <p className="text-sm text-muted-foreground">@{searchedUsername || username.replace(/^@/, "")}</p>
            </div>

            {/* Carousel Message */}
            <div className="relative h-16 overflow-hidden">
              {loadingMessages.map((msg, idx) => {
                const MsgIcon = msg.icon;
                return (
                  <div
                    key={idx}
                    className={cn(
                      "absolute inset-0 flex items-center justify-center gap-3 transition-all duration-500",
                      idx === carouselIndex
                        ? "opacity-100 translate-y-0"
                        : idx < carouselIndex
                          ? "opacity-0 -translate-y-full"
                          : "opacity-0 translate-y-full"
                    )}
                  >
                    <MsgIcon className="h-5 w-5 text-primary" />
                    <p className="text-sm text-muted-foreground">{msg.text}</p>
                  </div>
                );
              })}
            </div>

            {/* Simple animated dots */}
            <div className="flex justify-center gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-2 w-2 rounded-full bg-primary animate-pulse"
                  style={{ animationDelay: `${i * 200}ms` }}
                />
              ))}
            </div>

            <p className="text-center text-xs text-muted-foreground mt-4">
              Esto puede tomar unos minutos...
            </p>
          </div>
        </div>
      )}

      <div className="p-6 max-w-2xl mx-auto space-y-8">
        {/* Search Section */}
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-2 text-primary">
            <Music className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">¿Qué perfil de TikTok quieres investigar?</h1>
            <p className="text-muted-foreground mt-1">Ingresa un nombre de usuario de TikTok para obtener insights</p>
          </div>

          <div className="flex gap-2 max-w-md mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="@username"
                className="pl-9"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isSearching}
              />
            </div>
            <Button onClick={handleSearch} disabled={isSearching || !username.trim()}>
              {isSearching ? "Buscando..." : "Analizar"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* History Section */}
        <div className="space-y-4">
          {/* Search input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre o usuario..."
              defaultValue={filters?.q || ""}
              className="pl-9"
              onChange={(e) => {
                const value = e.target.value;
                const timeout = setTimeout(() => {
                  router.get('/tiktok', {
                    q: value || undefined,
                    page: 1
                  }, { preserveState: true });
                }, 300);
                return () => clearTimeout(timeout);
              }}
            />
          </div>

          {searches.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Aún no hay búsquedas. Comienza buscando un perfil de TikTok arriba.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {searches.map((search) => {
                const isProcessing = search.status === "processing" || search.status === "pending";
                return (
                <div
                  key={search.id}
                  className={`block group ${isProcessing ? 'pointer-events-none opacity-75' : 'cursor-pointer'}`}
                  onClick={() => !isProcessing && router.visit(`/tiktok/${search.username}`)}
                >
                  <Card className={`transition-all h-full ${isProcessing ? '' : 'hover:border-primary/50 hover:bg-accent/50 cursor-pointer'}`}>
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center overflow-hidden shrink-0">
                        {search.avatar ? (
                          <img
                            src={search.avatar}
                            alt={search.name || search.username}
                            referrerPolicy="no-referrer"
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                        ) : null}
                        <User className={`h-5 w-5 text-muted-foreground ${search.avatar ? 'hidden' : ''}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        {search.name && (
                          <p className="font-medium text-foreground truncate">{search.name}</p>
                        )}
                        <p className={`text-muted-foreground truncate ${search.name ? 'text-sm' : 'font-medium text-foreground'}`}>
                          @{search.username}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">{formatDate(search.searched_at)}</p>
                      </div>
                      {isProcessing ? (
                        <Badge variant="secondary" className="shrink-0 gap-1">
                          <Clock className="h-3 w-3 animate-pulse" />
                          Procesando
                        </Badge>
                      ) : (
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                      )}
                    </CardContent>
                  </Card>
                </div>
              );
              })}
            </div>

          )}

          {/* Pagination */}
          {pagination && pagination.total_pages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.current_page <= 1}
                onClick={() => router.get('/tiktok', { page: pagination.current_page - 1 }, { preserveState: true })}
              >
                <ChevronLeft className="h-4 w-4" />
                Anterior
              </Button>
              <span className="text-sm text-muted-foreground px-4">
                Página {pagination.current_page} de {pagination.total_pages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.current_page >= pagination.total_pages}
                onClick={() => router.get('/tiktok', { page: pagination.current_page + 1 }, { preserveState: true })}
              >
                Siguiente
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
