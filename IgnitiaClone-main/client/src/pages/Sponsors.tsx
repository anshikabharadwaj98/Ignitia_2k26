import { useState } from "react";
import SponsorCard from "@/components/SponsorCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const sponsors = {
  title: [
    { name: "Tech Giants Inc.", tier: "Title" as const },
  ],
  platinum: [
    { name: "Innovation Labs", tier: "Platinum" as const },
    { name: "Digital Solutions", tier: "Platinum" as const },
    { name: "Future Tech", tier: "Platinum" as const },
  ],
  gold: [
    { name: "Cloud Systems", tier: "Gold" as const },
    { name: "Smart Corp", tier: "Gold" as const },
    { name: "Tech Vision", tier: "Gold" as const },
    { name: "Code Masters", tier: "Gold" as const },
  ],
  silver: [
    { name: "Startup Hub", tier: "Silver" as const },
    { name: "Dev Tools", tier: "Silver" as const },
    { name: "Data Analytics", tier: "Silver" as const },
    { name: "AI Innovations", tier: "Silver" as const },
    { name: "Web Solutions", tier: "Silver" as const },
    { name: "Mobile First", tier: "Silver" as const },
  ],
};

export default function Sponsors() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Sponsors</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We are grateful to our sponsors for making Ignitia 2K25 possible
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-5 mb-12">
            <TabsTrigger value="all" data-testid="tab-all">All</TabsTrigger>
            <TabsTrigger value="title" data-testid="tab-title">Title</TabsTrigger>
            <TabsTrigger value="platinum" data-testid="tab-platinum">Platinum</TabsTrigger>
            <TabsTrigger value="gold" data-testid="tab-gold">Gold</TabsTrigger>
            <TabsTrigger value="silver" data-testid="tab-silver">Silver</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-16">
            <div>
              <h2 className="text-2xl font-bold text-center mb-8 text-primary" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                Title Sponsor
              </h2>
              <div className="max-w-md mx-auto">
                {sponsors.title.map((sponsor, idx) => (
                  <SponsorCard key={idx} {...sponsor} />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-center mb-8" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                Platinum Sponsors
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {sponsors.platinum.map((sponsor, idx) => (
                  <SponsorCard key={idx} {...sponsor} />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-center mb-8" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                Gold Sponsors
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {sponsors.gold.map((sponsor, idx) => (
                  <SponsorCard key={idx} {...sponsor} />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-center mb-8" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                Silver Sponsors
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {sponsors.silver.map((sponsor, idx) => (
                  <SponsorCard key={idx} {...sponsor} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="title">
            <div className="max-w-md mx-auto">
              {sponsors.title.map((sponsor, idx) => (
                <SponsorCard key={idx} {...sponsor} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="platinum">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sponsors.platinum.map((sponsor, idx) => (
                <SponsorCard key={idx} {...sponsor} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="gold">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {sponsors.gold.map((sponsor, idx) => (
                <SponsorCard key={idx} {...sponsor} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="silver">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {sponsors.silver.map((sponsor, idx) => (
                <SponsorCard key={idx} {...sponsor} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Interested in sponsoring Ignitia 2K25?
          </p>
          <a href="/contact" className="text-primary hover:underline font-semibold">
            Contact us for sponsorship opportunities
          </a>
        </div>
      </div>
    </div>
  );
}
