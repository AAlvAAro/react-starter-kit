import { useState } from "react";
import { Link } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  BadgeCheck, Users, Image, TrendingUp, AlertTriangle, CheckCircle,
  BarChart3, BookOpen, User as UserIcon, MessageSquare, ShieldAlert,
  Handshake, Briefcase, Mail, Presentation, Scale,
  ArrowLeft, Heart, Music,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DashboardLayout } from "@/layouts/dashboard-layout";

function formatCount(count: number | undefined): string {
  if (!count) return "—";
  if (count >= 1000000) return (count / 1000000).toFixed(1) + "M";
  if (count >= 1000) return (count / 1000).toFixed(1) + "K";
  return count.toLocaleString();
}

interface TiktokProfile {
  name?: string;
  bio?: string;
  avatar?: string;
  avatar_hd?: string;
  is_verified?: boolean;
  is_private?: boolean;
  is_business?: boolean;
  posts_count?: number;
  followers_count?: number;
  following_count?: number;
  hearts_count?: number;
  bio_link?: string;
  language?: string;
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

interface InsightSet {
  insights?: InsightsData;
  strategy?: StrategySection[];
  message_templates?: MessageCategory[];
}

interface ProfileSearchData {
  id: number;
  username: string;
  tiktok_profile: TiktokProfile;
  business?: InsightSet;
  personal?: InsightSet;
  searched_at?: string;
}

type ViewMode = "business" | "personal";

interface ShowProps {
  profile_search: ProfileSearchData;
  active_tab: "overview" | "insights" | "strategy";
}

const iconMap: Record<string, React.ElementType> = {
  MessageSquare, ShieldAlert, Handshake, Briefcase, Mail, Presentation, Scale,
};

export default function TiktokShow({ profile_search, active_tab }: ShowProps) {
  const profile = profile_search.tiktok_profile;
  const profileUsername = profile_search.username;
  const [viewMode, setViewMode] = useState<ViewMode>(profile?.is_business ? "business" : "personal");

  const currentInsights = viewMode === "business" ? profile_search.business : profile_search.personal;

  const tabs = [
    { id: "overview", label: "Resumen", icon: UserIcon, href: `/tiktok/${profileUsername}` },
    { id: "insights", label: "Insights", icon: BarChart3, href: `/tiktok/${profileUsername}/insights` },
    { id: "strategy", label: "Preparación", icon: BookOpen, href: `/tiktok/${profileUsername}/strategy` },
  ];

  const userInitials = profile?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || profile_search.username.slice(0, 2).toUpperCase();

  return (
    <DashboardLayout>
      <div>
      {/* Back link */}
      <div className="mb-4">
        <Link
          href="/tiktok"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a búsquedas
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
                { icon: Users, label: "Seguidores", value: formatCount(profile?.followers_count) },
                { icon: Image, label: "Videos", value: formatCount(profile?.posts_count) },
                { icon: Heart, label: "Likes", value: formatCount(profile?.hearts_count) },
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

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="flex items-center gap-1 p-1 rounded-lg bg-muted/50 w-fit">
          {tabs.map((tab) => {
            const isActive = active_tab === tab.id;
            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all",
                  isActive
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* View Mode Toggle */}
      {active_tab !== "overview" && (
        <div className="mb-6 flex items-center gap-2">
          <div className="inline-flex items-center rounded-full border border-border bg-muted/50 p-1">
            <button
              onClick={() => setViewMode("business")}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                viewMode === "business"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Briefcase className="h-3.5 w-3.5" />
              Negocios
            </button>
            <button
              onClick={() => setViewMode("personal")}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                viewMode === "personal"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Heart className="h-3.5 w-3.5" />
              Personal
            </button>
          </div>
        </div>
      )}

      {/* Tab Content */}
      <div>
        {active_tab === "overview" && <OverviewTab profile={profile} username={profile_search.username} />}
        {active_tab === "insights" && <InsightsTab insights={currentInsights?.insights} />}
        {active_tab === "strategy" && (
          <StrategyTab
            username={profile_search.username}
            profile={profile}
            strategy={currentInsights?.strategy}
            messageTemplates={currentInsights?.message_templates}
          />
        )}
      </div>
      </div>
    </DashboardLayout>
  );
}

// Overview Tab Component
function OverviewTab({ profile, username }: { profile?: TiktokProfile; username: string }) {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Resumen del Perfil</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Este es un resumen del perfil de TikTok de @{username}. Navega a la pestaña de Análisis para un análisis detallado
            o a la pestaña de Preparación para estrategias de conversación.
          </p>
          {profile?.bio && (
            <div>
              <p className="text-xs text-muted-foreground mb-1">Biografía</p>
              <p className="text-sm text-foreground">{profile.bio}</p>
            </div>
          )}
          {profile?.bio_link && (
            <div>
              <p className="text-xs text-muted-foreground mb-1">Enlace</p>
              <a href={`https://${profile.bio_link}`} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                {profile.bio_link}
              </a>
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
                <span className="text-xs text-muted-foreground">Confianza</span>
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
  profile?: TiktokProfile;
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
          <h1 className="text-2xl font-bold text-foreground">Guía de Preparación</h1>
          <p className="text-muted-foreground mt-1">
            Consejos de conversación generados con IA basados en el perfil de @{username}
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
              <p className="text-muted-foreground">Generando guía de preparación...</p>
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
