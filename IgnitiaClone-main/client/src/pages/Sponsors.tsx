import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Mail, ExternalLink, Sparkles, Loader2 } from "lucide-react";
import type { Sponsor } from "@shared/schema";

type SponsorTier = "all" | "title" | "platinum" | "gold" | "silver";

const AnimatedBackground = () => {
  const particles = useMemo(() => 
    [...Array(60)].map((_, i) => ({
      left: Math.random() * 100,
      delay: Math.random() * 40,
      duration: 35 + Math.random() * 15,
      type: i % 3,
    })),
    []
  );

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div 
        className="absolute inset-0 bg-gradient-to-br from-[#1a0b2e] via-[#16213e] to-[#0f172a] bg-300% animate-gradient-shift"
      />
      
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute animate-float-up"
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        >
          {particle.type === 0 ? (
            <div className="w-2 h-2 bg-cyan-400/20 rounded-full blur-[1px]" />
          ) : particle.type === 1 ? (
            <div className="w-3 h-3 border border-cyan-400/20 rotate-45" />
          ) : (
            <svg width="12" height="14" viewBox="0 0 12 14" className="opacity-20">
              <path d="M6 0 L12 7 L6 14 L0 7 Z" fill="rgba(0,255,255,0.2)" />
            </svg>
          )}
        </div>
      ))}

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "2.5s" }} />
    </div>
  );
};

const SponsorCard = ({ sponsor, tier }: { sponsor: Sponsor; tier: string }) => {
  const tierConfig = {
    title: {
      glow: "shadow-[0_0_40px_rgba(255,215,0,0.3)]",
      border: "border-yellow-500/30",
      hoverGlow: "hover:shadow-[0_0_60px_rgba(255,215,0,0.5)]",
      height: "min-h-[300px]",
      iconColor: "text-yellow-400",
    },
    platinum: {
      glow: "shadow-[0_0_30px_rgba(192,192,192,0.25)]",
      border: "border-gray-300/20",
      hoverGlow: "hover:shadow-[0_0_50px_rgba(192,192,192,0.4)]",
      height: "min-h-[240px]",
      iconColor: "text-gray-300",
    },
    gold: {
      glow: "shadow-[0_0_25px_rgba(218,165,32,0.2)]",
      border: "border-yellow-600/20",
      hoverGlow: "hover:shadow-[0_0_45px_rgba(218,165,32,0.35)]",
      height: "min-h-[200px]",
      iconColor: "text-yellow-600",
    },
    silver: {
      glow: "shadow-[0_0_20px_rgba(135,206,235,0.15)]",
      border: "border-sky-300/15",
      hoverGlow: "hover:shadow-[0_0_40px_rgba(135,206,235,0.3)]",
      height: "min-h-[180px]",
      iconColor: "text-sky-400",
    },
  };

  const config = tierConfig[tier as keyof typeof tierConfig];

  return (
    <Card 
      className={`
        relative backdrop-blur-lg bg-white/5 border ${config.border} ${config.glow} ${config.hoverGlow}
        ${config.height} p-8 flex flex-col items-center justify-center gap-4
        transition-all duration-300 hover:-translate-y-1 group overflow-visible
      `}
      data-testid={`card-sponsor-${sponsor.id}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-md" />
      
      <div className="relative z-10 flex flex-col items-center justify-center gap-4 w-full">
        <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center backdrop-blur-sm">
          <Sparkles className={`w-10 h-10 ${config.iconColor}`} />
        </div>
        
        <h3 
          className="text-xl font-semibold text-white text-center"
          data-testid={`text-sponsor-name-${sponsor.id}`}
        >
          {sponsor.name}
        </h3>
        
        {sponsor.websiteUrl && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white/80 hover:text-white"
            data-testid={`button-visit-${sponsor.id}`}
          >
            Visit Website
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </Card>
  );
};

const SponsorCardSkeleton = ({ height }: { height: string }) => (
  <Card className={`backdrop-blur-lg bg-white/5 border border-white/10 ${height} p-8 flex flex-col items-center justify-center gap-4`}>
    <Skeleton className="w-20 h-20 rounded-full bg-white/10" />
    <Skeleton className="w-32 h-6 bg-white/10" />
    <Skeleton className="w-24 h-4 bg-white/10" />
  </Card>
);

export default function SponsorsPage() {
  const [selectedTier, setSelectedTier] = useState<SponsorTier>("all");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: sponsorsData = [], isLoading } = useQuery<Sponsor[]>({
    queryKey: ["/api/sponsors"],
  });

  const filteredSponsors = selectedTier === "all" 
    ? sponsorsData 
    : sponsorsData.filter(s => s.tier === selectedTier);

  const titleSponsors = filteredSponsors.filter(s => s.tier === "title");
  const platinumSponsors = filteredSponsors.filter(s => s.tier === "platinum");
  const goldSponsors = filteredSponsors.filter(s => s.tier === "gold");
  const silverSponsors = filteredSponsors.filter(s => s.tier === "silver");

  return (
    <div className="min-h-screen relative text-white">
      <AnimatedBackground />
      
      <div className="relative z-10">
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 
              className={`text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}
              data-testid="text-page-title"
            >
              Our Sponsors
            </h1>
            <p 
              className={`text-lg md:text-xl text-white/80 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: "0.1s" }}
              data-testid="text-page-subtitle"
            >
              Partners Making Ignitia 2K26 Possible
            </p>
            
            <div 
              className={`flex justify-center pt-8 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: "0.2s" }}
            >
              <Tabs 
                value={selectedTier} 
                onValueChange={(value) => setSelectedTier(value as SponsorTier)}
                className="w-full max-w-2xl"
              >
                <TabsList className="w-full backdrop-blur-lg bg-white/10 border border-white/20 p-1 h-auto flex-wrap gap-2">
                  <TabsTrigger 
                    value="all" 
                    className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70 flex-1 min-w-[80px]"
                    data-testid="tab-all"
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger 
                    value="title" 
                    className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-200 text-white/70 flex-1 min-w-[80px]"
                    data-testid="tab-title"
                  >
                    Title
                  </TabsTrigger>
                  <TabsTrigger 
                    value="platinum" 
                    className="data-[state=active]:bg-gray-300/20 data-[state=active]:text-gray-200 text-white/70 flex-1 min-w-[80px]"
                    data-testid="tab-platinum"
                  >
                    Platinum
                  </TabsTrigger>
                  <TabsTrigger 
                    value="gold" 
                    className="data-[state=active]:bg-yellow-600/20 data-[state=active]:text-yellow-300 text-white/70 flex-1 min-w-[80px]"
                    data-testid="tab-gold"
                  >
                    Gold
                  </TabsTrigger>
                  <TabsTrigger 
                    value="silver" 
                    className="data-[state=active]:bg-sky-400/20 data-[state=active]:text-sky-200 text-white/70 flex-1 min-w-[80px]"
                    data-testid="tab-silver"
                  >
                    Silver
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 pb-24 space-y-24">
          {(selectedTier === "all" || selectedTier === "title") && (
            <section className="space-y-8">
              <div className="text-center">
                <Badge className="mb-4 bg-yellow-500/20 text-yellow-200 border-yellow-500/30 text-lg px-4 py-2" data-testid="badge-tier-title">
                  Title Sponsor
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-white" data-testid="heading-title-sponsors">
                  Premier Partner
                </h2>
              </div>
              <div className="flex justify-center">
                <div className="w-full max-w-2xl">
                  {isLoading ? (
                    <SponsorCardSkeleton height="min-h-[300px]" />
                  ) : titleSponsors.length > 0 ? (
                    titleSponsors.map((sponsor, index) => (
                      <div
                        key={sponsor.id}
                        className={mounted ? 'animate-fade-in-up' : 'opacity-0'}
                        style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                      >
                        <SponsorCard sponsor={sponsor} tier="title" />
                      </div>
                    ))
                  ) : null}
                </div>
              </div>
            </section>
          )}

          {(selectedTier === "all" || selectedTier === "platinum") && (
            <section className="space-y-8">
              <div className="text-center">
                <Badge className="mb-4 bg-gray-300/20 text-gray-200 border-gray-300/30 text-lg px-4 py-2" data-testid="badge-tier-platinum">
                  Platinum Sponsors
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-white" data-testid="heading-platinum-sponsors">
                  Elite Partners
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {isLoading ? (
                  <>
                    {[1, 2, 3].map((i) => (
                      <SponsorCardSkeleton key={i} height="min-h-[240px]" />
                    ))}
                  </>
                ) : platinumSponsors.length > 0 ? (
                  platinumSponsors.map((sponsor, index) => (
                    <div
                      key={sponsor.id}
                      className={mounted ? 'animate-fade-in-up' : 'opacity-0'}
                      style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                    >
                      <SponsorCard sponsor={sponsor} tier="platinum" />
                    </div>
                  ))
                ) : null}
              </div>
            </section>
          )}

          {(selectedTier === "all" || selectedTier === "gold") && (
            <section className="space-y-8">
              <div className="text-center">
                <Badge className="mb-4 bg-yellow-600/20 text-yellow-300 border-yellow-600/30 text-lg px-4 py-2" data-testid="badge-tier-gold">
                  Gold Sponsors
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-white" data-testid="heading-gold-sponsors">
                  Premier Partners
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {isLoading ? (
                  <>
                    {[1, 2, 3, 4].map((i) => (
                      <SponsorCardSkeleton key={i} height="min-h-[200px]" />
                    ))}
                  </>
                ) : goldSponsors.length > 0 ? (
                  goldSponsors.map((sponsor, index) => (
                    <div
                      key={sponsor.id}
                      className={mounted ? 'animate-fade-in-up' : 'opacity-0'}
                      style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                    >
                      <SponsorCard sponsor={sponsor} tier="gold" />
                    </div>
                  ))
                ) : null}
              </div>
            </section>
          )}

          {(selectedTier === "all" || selectedTier === "silver") && (
            <section className="space-y-8">
              <div className="text-center">
                <Badge className="mb-4 bg-sky-400/20 text-sky-200 border-sky-400/30 text-lg px-4 py-2" data-testid="badge-tier-silver">
                  Silver Sponsors
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-white" data-testid="heading-silver-sponsors">
                  Supporting Partners
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {isLoading ? (
                  <>
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <SponsorCardSkeleton key={i} height="min-h-[180px]" />
                    ))}
                  </>
                ) : silverSponsors.length > 0 ? (
                  silverSponsors.map((sponsor, index) => (
                    <div
                      key={sponsor.id}
                      className={mounted ? 'animate-fade-in-up' : 'opacity-0'}
                      style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                    >
                      <SponsorCard sponsor={sponsor} tier="silver" />
                    </div>
                  ))
                ) : null}
              </div>
            </section>
          )}
        </div>

        <section className="max-w-4xl mx-auto px-4 pb-24">
          <Card 
            className="backdrop-blur-lg bg-white/5 border border-white/10 p-12 text-center space-y-6"
            data-testid="card-cta"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-md" />
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white" data-testid="heading-cta">
                Interested in Sponsoring Ignitia 2K26?
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto" data-testid="text-cta-description">
                Join us in making this event extraordinary. Partner with Ignitia 2K26 to reach thousands of students, showcase your brand, and support innovation.
              </p>
              <div className="flex flex-wrap gap-4 justify-center pt-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0"
                  data-testid="button-contact-us"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Us for Sponsorship
                </Button>
              </div>
              <div className="pt-6 flex flex-wrap justify-center gap-8 text-sm text-white/60">
                <div data-testid="stat-sponsors">
                  <div className="text-2xl font-bold text-white">{sponsorsData.length}+</div>
                  <div>Proud Sponsors</div>
                </div>
                <div data-testid="stat-date">
                  <div className="text-2xl font-bold text-white">2026</div>
                  <div>Event Year</div>
                </div>
                <div data-testid="stat-reach">
                  <div className="text-2xl font-bold text-white">10K+</div>
                  <div>Expected Attendees</div>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
