import { useState } from "react";
import { Link } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
  Handshake, Briefcase, Mail, Presentation, Scale,
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

interface MessageTemplate {
  title: string;
  content: string;
  context: string;
}

interface MessageCategory {
  id: string;
  category: string;
  icon: string;
  messages: MessageTemplate[];
}

interface ProfileSearchData {
  id: number;
  username: string;
  instagram_profile: InstagramProfile;
  insights?: InsightsData;
  strategy?: StrategySection[];
  message_templates?: MessageCategory[];
  searched_at?: string;
}

interface ShowProps {
  profile_search: ProfileSearchData;
  active_tab: "overview" | "insights" | "strategy";
}

const iconMap: Record<string, React.ElementType> = {
  MessageSquare, ShieldAlert, Handshake, Briefcase, Mail, Presentation, Scale,
};

export default function InstagramShow({ profile_search, active_tab }: ShowProps) {
  const profile = profile_search.instagram_profile;
  const profileUsername = profile_search.username;

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
              {(profile?.avatar_hd || profile?.avatar) ? (
                <img
                  src={profile?.avatar_hd || profile?.avatar}
                  alt={profile?.name || profile_search.username}
                  referrerPolicy="no-referrer"
                  className="aspect-square h-full w-full object-cover rounded-full"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : null}
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
            profile={profile}
            strategy={profile_search.strategy}
            messageTemplates={profile_search.message_templates}
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
          <CardTitle className="text-base">Resumen del Perfil</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Este es un resumen del perfil de Instagram de @{username}. Navega a la pestaña de Análisis para un análisis detallado
            o a la pestaña de Preparación para estrategias de conversación.
          </p>
          {profile?.bio && (
            <div>
              <p className="text-xs text-muted-foreground mb-1">Biografía</p>
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
  profile?: InstagramProfile;
  strategy?: StrategySection[];
  messageTemplates?: MessageCategory[];
}

function StrategyTab({
  username,
  profile,
  strategy,
  messageTemplates,
}: StrategyTabProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

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

      {/* Message Templates Section */}
      <section className="max-w-3xl mx-auto space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Plantillas de Mensajes</h2>
          <p className="text-muted-foreground mt-1">
            Plantillas de DM generadas por IA para contactar a @{username}
          </p>
        </div>

        {messageTemplates && messageTemplates.length > 0 ? (
          <div className="space-y-4">
            {messageTemplates.map((category) => {
              const Icon = iconMap[category.icon] || MessageSquare;
              return (
                <Card key={category.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-md bg-accent flex items-center justify-center">
                        <Icon className="h-4 w-4 text-accent-foreground" />
                      </div>
                      <CardTitle className="text-base">{category.category}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {category.messages.map((msg, idx) => {
                      const msgId = `${category.id}-${idx}`;
                      return (
                        <div
                          key={idx}
                          className="p-3 rounded-lg bg-muted/50 border border-border/50 space-y-2"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-sm font-medium text-foreground">{msg.title}</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 px-2 text-xs"
                              onClick={() => copyToClipboard(msg.content, msgId)}
                            >
                              {copiedId === msgId ? (
                                <>
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Copiado
                                </>
                              ) : (
                                <>
                                  <Mail className="h-3 w-3 mr-1" />
                                  Copiar
                                </>
                              )}
                            </Button>
                          </div>
                          <p className="text-sm text-foreground bg-background p-2 rounded border">
                            {msg.content}
                          </p>
                          <p className="text-xs text-muted-foreground italic">
                            {msg.context}
                          </p>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">Generando plantillas de mensajes...</p>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}
