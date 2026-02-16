import { useState } from "react";
import { Link, router } from "@inertiajs/react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { History, User, ArrowRight, Search, Sparkles } from "lucide-react";
import { InstagramLayout } from "@/layouts/instagram-layout";

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

export default function InstagramIndex({ searches = [] }: IndexProps) {
  const [username, setUsername] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSearch = () => {
    if (username.trim()) {
      setIsSearching(true);
      router.post("/instagram", { username: username.replace(/^@/, "") });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <InstagramLayout>
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
