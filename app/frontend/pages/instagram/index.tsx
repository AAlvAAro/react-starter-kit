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
            <h1 className="text-2xl font-bold text-foreground">Who are you meeting?</h1>
            <p className="text-muted-foreground mt-1">Enter an Instagram username to learn about them</p>
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
              {isSearching ? "Searching..." : "Analyze"}
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
            <h2 className="text-lg font-semibold text-foreground">Recent Searches</h2>
          </div>

          {searches.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-sm text-muted-foreground">
                  No searches yet. Start by searching for an Instagram profile above.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-2">
              {searches.map((search) => (
                <Link
                  key={search.id}
                  href={`/instagram/${search.username}`}
                  className="block"
                >
                  <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        <User className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">@{search.username}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(search.searched_at)}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
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
