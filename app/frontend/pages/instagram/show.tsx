import { useState } from "react";
import { Link } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BadgeCheck, Users, Image, TrendingUp, AlertTriangle, CheckCircle,
  BarChart3, BookOpen, User as UserIcon, MessageSquare, ShieldAlert,
  Handshake, Briefcase, Mail, Presentation, Scale, Send, RotateCcw,
  Settings, LogOut, ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

function formatCount(count: number | undefined): string {
  if (!count) return "—";
  if (count >= 1000000) return (count / 1000000).toFixed(1) + "M";
  if (count >= 1000) return (count / 1000).toFixed(1) + "K";
  return count.toLocaleString();
}

interface InstagramProfile {
  name?: string;
  bio?: string;
  avatar?: string;
  avatar_hd?: string;
  is_verified?: boolean;
  is_business?: boolean;
  posts_count?: number;
  followers_count?: number;
  following_count?: number;
  external_link?: string;
  bio_links?: Array<{ title: string; url: string }>;
}

interface InsightsData {
  tone?: { label: string; value: string; score: number };
  topics?: { label: string; items: string[] };
  words?: { label: string; items: Array<{ word: string; count: number }> };
  personality?: { label: string; traits: Array<{ trait: string; score: number }> };
  posture?: { label: string; value: string };
  interests?: { label: string; items: string[] };
  flags?: { label: string; items: Array<{ text: string; type: "warning" | "success" }> };
}

interface StrategySection {
  id: string;
  question: string;
  answer: string;
  icon: string;
}

interface ChatPersona {
  id: string;
  name: string;
  description: string;
  color: "success" | "warning" | "destructive";
  systemPrompt: string;
}

interface ProfileSearchData {
  id: number;
  username: string;
  instagram_profile: InstagramProfile;
  insights?: InsightsData;
  strategy?: StrategySection[];
  personas?: ChatPersona[];
  searched_at?: string;
}

interface ShowProps {
  profile_search: ProfileSearchData;
  active_tab: "overview" | "insights" | "strategy";
}

const iconMap: Record<string, React.ElementType> = {
  MessageSquare, ShieldAlert, Handshake, Briefcase, Mail, Presentation, Scale,
};

type Message = { role: "user" | "assistant"; content: string };

export default function InstagramShow({ profile_search, active_tab }: ShowProps) {
  const profile = profile_search.instagram_profile;
  const profileUsername = profile_search.username;

  // Strategy state
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || !selectedPersona || isLoading) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(`/instagram/${profileUsername}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "",
        },
        body: JSON.stringify({
          persona_id: selectedPersona,
          message: input,
          messages: messages,
        }),
      });

      const data = await response.json();

      if (data.response) {
        const aiMsg: Message = { role: "assistant", content: data.response };
        setMessages((prev) => [...prev, aiMsg]);
      }
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) {
      handleSend();
    }
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: UserIcon, href: `/instagram/${profileUsername}` },
    { id: "insights", label: "Insights", icon: BarChart3, href: `/instagram/${profileUsername}/insights` },
    { id: "strategy", label: "Prep", icon: BookOpen, href: `/instagram/${profileUsername}/strategy` },
  ];

  const userInitials = profile?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || profile_search.username.slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Back link */}
      <div className="p-4">
        <Link
          href="/instagram"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to searches
        </Link>
      </div>

      {/* Profile Header */}
      <div className="px-6 pb-6">
        <Card>
          <CardContent className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6">
            <Avatar className="h-16 w-16">
              <AvatarImage src={profile?.avatar_hd || profile?.avatar} />
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-foreground">{profile?.name || profile_search.username}</h2>
                {profile?.is_verified && <BadgeCheck className="h-5 w-5 text-primary" />}
              </div>
              <p className="text-sm text-muted-foreground">@{profile_search.username}</p>
              <p className="text-sm text-foreground">{profile?.bio}</p>
            </div>
            <div className="flex gap-6 text-center">
              {[
                { icon: Users, label: "Followers", value: formatCount(profile?.followers_count) },
                { icon: Image, label: "Posts", value: formatCount(profile?.posts_count) },
                { icon: TrendingUp, label: "Following", value: formatCount(profile?.following_count) },
              ].map((s) => (
                <div key={s.label} className="space-y-1">
                  <s.icon className="h-4 w-4 mx-auto text-muted-foreground" />
                  <p className="text-lg font-bold text-foreground">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tab Content */}
      <div className="px-6">
        {active_tab === "overview" && <OverviewTab profile={profile} username={profile_search.username} />}
        {active_tab === "insights" && <InsightsTab insights={profile_search.insights} />}
        {active_tab === "strategy" && (
          <StrategyTab
            username={profile_search.username}
            strategy={profile_search.strategy}
            personas={profile_search.personas}
            selectedPersona={selectedPersona}
            setSelectedPersona={setSelectedPersona}
            messages={messages}
            input={input}
            setInput={setInput}
            handleSend={handleSend}
            handleReset={handleReset}
            handleKeyDown={handleKeyDown}
            isLoading={isLoading}
          />
        )}
      </div>

      {/* Floating Tab Navigation */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-1 px-2 py-2 rounded-full bg-card/90 backdrop-blur-md border border-border shadow-lg">
          {tabs.map((tab) => {
            const isActive = active_tab === tab.id;
            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <tab.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </Link>
            );
          })}

          {/* User Menu Drop-up */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-3 py-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
                <UserIcon className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="end" className="w-48 mb-2">
              <DropdownMenuItem asChild>
                <Link href="/settings/profile" className="cursor-pointer">
                  <UserIcon className="h-4 w-4 mr-2" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings/profile" className="cursor-pointer">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href="/sessions"
                  method="delete"
                  as="button"
                  className="w-full cursor-pointer text-destructive"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </div>
  );
}

// Overview Tab Component
function OverviewTab({ profile, username }: { profile?: InstagramProfile; username: string }) {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Profile Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            This is an overview of @{username}'s Instagram profile. Navigate to the Insights tab for detailed analysis
            or the Prep tab for conversation strategies.
          </p>
          {profile?.bio && (
            <div>
              <p className="text-xs text-muted-foreground mb-1">Bio</p>
              <p className="text-sm text-foreground">{profile.bio}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Insights Tab Component
function InsightsTab({ insights }: { insights?: InsightsData }) {
  if (!insights) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Generating insights...</p>
      </div>
    );
  }

  const maxWordCount = insights.words?.items?.[0]?.count || 100;

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Tone */}
        {insights.tone && (
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-base">{insights.tone.label}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{insights.tone.value}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Confidence</span>
                <Progress value={insights.tone.score} className="flex-1" />
                <span className="text-xs font-medium text-foreground">{insights.tone.score}%</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Topics */}
        {insights.topics && (
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-base">{insights.topics.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {insights.topics.items.map((t) => (
                  <Badge key={t} variant="secondary">{t}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Most Used Words */}
        {insights.words && (
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-base">{insights.words.label}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {insights.words.items.map((w) => (
                <div key={w.word} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-foreground w-16">{w.word}</span>
                  <Progress value={(w.count / maxWordCount) * 100} className="flex-1" />
                  <span className="text-xs text-muted-foreground w-8 text-right">{w.count}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Personality */}
        {insights.personality && (
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-base">{insights.personality.label}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {insights.personality.traits.map((t) => (
                <div key={t.trait} className="flex items-center gap-3">
                  <span className="text-sm text-foreground w-36">{t.trait}</span>
                  <Progress value={t.score} className="flex-1" />
                  <span className="text-xs font-medium text-foreground w-8 text-right">{t.score}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Posture */}
        {insights.posture && (
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-base">{insights.posture.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{insights.posture.value}</p>
            </CardContent>
          </Card>
        )}

        {/* Interests */}
        {insights.interests && (
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-base">{insights.interests.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {insights.interests.items.map((i) => (
                  <Badge key={i} variant="outline">{i}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Flags */}
      {insights.flags && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{insights.flags.label}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {insights.flags.items.map((f, i) => (
              <div key={i} className="flex items-start gap-2 rounded-md border p-3">
                {f.type === "warning" ? (
                  <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle className="h-4 w-4 text-success shrink-0 mt-0.5" />
                )}
                <span className="text-sm text-foreground">{f.text}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Strategy Tab Component
interface StrategyTabProps {
  username: string;
  strategy?: StrategySection[];
  personas?: ChatPersona[];
  selectedPersona: string | null;
  setSelectedPersona: (id: string | null) => void;
  messages: Message[];
  input: string;
  setInput: (value: string) => void;
  handleSend: () => void;
  handleReset: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
}

function StrategyTab({
  username,
  strategy,
  personas,
  selectedPersona,
  setSelectedPersona,
  messages,
  input,
  setInput,
  handleSend,
  handleReset,
  handleKeyDown,
  isLoading,
}: StrategyTabProps) {
  // Chat view when persona is selected
  if (selectedPersona && personas) {
    const persona = personas.find((p) => p.id === selectedPersona);
    if (!persona) return null;

    return (
      <div className="max-w-2xl mx-auto h-[calc(100vh-20rem)] flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-lg font-bold text-foreground">Chatting as: {persona.name}</h1>
            <p className="text-xs text-muted-foreground">{persona.description}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reset
            </Button>
            <Button variant="ghost" size="sm" onClick={() => { setSelectedPersona(null); handleReset(); }}>
              Change persona
            </Button>
          </div>
        </div>

        <Card className="flex-1 flex flex-col overflow-hidden">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-3">
              {messages.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Start typing to begin the conversation...
                </p>
              )}
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                      m.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    )}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="border-t p-3 flex gap-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button size="icon" onClick={handleSend}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Default view: Prep Guide + Persona selection
  return (
    <div className="space-y-8">
      {/* Prep Guide Section */}
      <section className="max-w-3xl mx-auto space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Prep Guide</h1>
          <p className="text-muted-foreground mt-1">
            AI-generated conversation tips based on @{username}'s profile
          </p>
        </div>

        {strategy && strategy.length > 0 ? (
          <Card>
            <CardContent className="p-0">
              <Accordion type="single" collapsible className="w-full">
                {strategy.map((qa) => {
                  const Icon = iconMap[qa.icon] || MessageSquare;
                  return (
                    <AccordionItem key={qa.id} value={qa.id} className="px-4">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-md bg-accent flex items-center justify-center shrink-0">
                            <Icon className="h-4 w-4 text-accent-foreground" />
                          </div>
                          <span className="text-sm font-medium text-foreground text-left">{qa.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground pl-11 pb-2">{qa.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">Generating prep guide...</p>
            </CardContent>
          </Card>
        )}
      </section>

      {/* Icebreaker Practice Section */}
      <section className="max-w-3xl mx-auto space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Icebreaker Practice</h2>
          <p className="text-muted-foreground mt-1">
            Practice starting a conversation with @{username} in different moods
          </p>
        </div>

        {personas && personas.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-3">
            {personas.map((p) => (
              <Card
                key={p.id}
                className="cursor-pointer hover:border-primary/50 transition-colors h-full"
                onClick={() => setSelectedPersona(p.id)}
              >
                <CardHeader className="pb-2">
                  <Badge
                    variant={p.color === "success" ? "default" : p.color === "warning" ? "secondary" : "destructive"}
                    className="w-fit mb-2"
                  >
                    {p.name}
                  </Badge>
                  <CardDescription className="text-xs">{p.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">Generating personas...</p>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}
