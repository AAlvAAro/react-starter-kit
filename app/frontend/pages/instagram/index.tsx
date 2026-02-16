import { useState } from "react";
import { Link, router } from "@inertiajs/react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { History, User, ArrowRight, Search, Sparkles, Briefcase, Heart, Loader2, Instagram, Brain, FileText, CheckCircle2 } from "lucide-react";
import { InstagramLayout } from "@/layouts/instagram-layout";
import { cn } from "@/lib/utils";

interface ProfileSearchItem {
  id: number;
  username: string;
  searched_at: string;
  name?: string;
  avatar?: string;
}

interface IndexProps {
  searches: ProfileSearchItem[];
}

type SearchPurpose = "business" | "dating";

interface LoadingStep {
  id: string;
  label: string;
  icon: React.ElementType;
  status: "pending" | "active" | "completed";
}

export default function InstagramIndex({ searches = [] }: IndexProps) {
  const [username, setUsername] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showPurposeModal, setShowPurposeModal] = useState(false);
  const [searchedUsername, setSearchedUsername] = useState("");
  const [currentStep, setCurrentStep] = useState(0);

  const loadingSteps: LoadingStep[] = [
    { id: "fetch", label: "Obteniendo información de Instagram", icon: Instagram, status: currentStep === 0 ? "active" : currentStep > 0 ? "completed" : "pending" },
    { id: "analyze", label: "Analizando y organizando datos", icon: FileText, status: currentStep === 1 ? "active" : currentStep > 1 ? "completed" : "pending" },
    { id: "ai", label: "Generando insights con IA", icon: Brain, status: currentStep === 2 ? "active" : currentStep > 2 ? "completed" : "pending" },
    { id: "prepare", label: "Preparando resultados personalizados", icon: Sparkles, status: currentStep === 3 ? "active" : currentStep > 3 ? "completed" : "pending" },
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

    setSearchedUsername(username.replace(/^@/, ""));
    setShowPurposeModal(true);
  };

  const handlePurposeSelect = async (purpose: SearchPurpose) => {
    setShowPurposeModal(false);
    setIsSearching(true);
    setCurrentStep(0);

    // Simulate step progression for visual feedback
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < 3) return prev + 1;
        return prev;
      });
    }, 2000);

    try {
      // First fetch the profile
      const response = await fetch("/instagram/fetch_profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "",
        },
        body: JSON.stringify({ username: searchedUsername }),
      });

      if (!response.ok) {
        clearInterval(stepInterval);
        setIsSearching(false);
        setCurrentStep(0);
        alert("No se pudo encontrar el perfil. Verifica el nombre de usuario.");
        return;
      }

      // Complete all steps visually
      setCurrentStep(4);
      clearInterval(stepInterval);

      // Small delay to show completion, then redirect
      setTimeout(() => {
        router.post("/instagram", { username: searchedUsername, purpose });
      }, 800);
    } catch {
      clearInterval(stepInterval);
      setIsSearching(false);
      setCurrentStep(0);
      alert("Error al buscar el perfil.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <InstagramLayout>
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

            <div className="space-y-3">
              {loadingSteps.map((step) => {
                const StepIcon = step.icon;
                const isActive = step.status === "active";
                const isCompleted = step.status === "completed";

                return (
                  <div
                    key={step.id}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-lg border transition-all duration-300",
                      isActive && "bg-primary/5 border-primary/30",
                      isCompleted && "bg-muted/50 border-border",
                      !isActive && !isCompleted && "bg-muted/20 border-border/50 opacity-50"
                    )}
                  >
                    <div className={cn(
                      "h-10 w-10 rounded-full flex items-center justify-center shrink-0 transition-all",
                      isActive && "bg-primary/20",
                      isCompleted && "bg-green-500/20",
                      !isActive && !isCompleted && "bg-muted"
                    )}>
                      {isCompleted ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : isActive ? (
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                      ) : (
                        <StepIcon className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={cn(
                        "text-sm font-medium",
                        isActive && "text-foreground",
                        isCompleted && "text-muted-foreground",
                        !isActive && !isCompleted && "text-muted-foreground"
                      )}>
                        {step.label}
                      </p>
                    </div>
                    {isCompleted && (
                      <span className="text-xs text-green-500 font-medium">Listo</span>
                    )}
                  </div>
                );
              })}
            </div>

            <p className="text-center text-xs text-muted-foreground">
              Esto puede tomar unos segundos...
            </p>
          </div>
        </div>
      )}

      {/* Purpose Selection Modal */}
      <Dialog open={showPurposeModal} onOpenChange={setShowPurposeModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>¿Cuál es tu objetivo?</DialogTitle>
            <DialogDescription>
              Selecciona el propósito de tu búsqueda para obtener insights personalizados
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-4">
            <Button
              variant="outline"
              className="h-auto p-4 justify-start gap-4"
              onClick={() => handlePurposeSelect("business")}
            >
              <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                <Briefcase className="h-5 w-5 text-blue-500" />
              </div>
              <div className="text-left">
                <p className="font-medium">Negocios</p>
                <p className="text-sm text-muted-foreground">Reunión profesional, networking o colaboración</p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 justify-start gap-4"
              onClick={() => handlePurposeSelect("dating")}
            >
              <div className="h-10 w-10 rounded-full bg-pink-500/10 flex items-center justify-center shrink-0">
                <Heart className="h-5 w-5 text-pink-500" />
              </div>
              <div className="text-left">
                <p className="font-medium">Citas</p>
                <p className="text-sm text-muted-foreground">Conocer mejor a alguien que te interesa</p>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="p-6 max-w-2xl mx-auto space-y-8">
        {/* Search Section */}
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-2 text-primary">
            <Sparkles className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">¿Con quién te vas a reunir?</h1>
            <p className="text-muted-foreground mt-1">Ingresa un nombre de usuario de Instagram para conocer más sobre ellos</p>
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
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
              <History className="h-4 w-4 text-accent-foreground" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Búsquedas Recientes</h2>
          </div>

          {searches.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Aún no hay búsquedas. Comienza buscando un perfil de Instagram arriba.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {searches.map((search) => (
                <Link
                  key={search.id}
                  href={`/instagram/${search.username}`}
                  className="block group"
                >
                  <Card className="hover:border-primary/50 hover:bg-accent/50 transition-all cursor-pointer h-full">
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
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </InstagramLayout>
  );
}
