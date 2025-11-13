import HeroSection from "@/components/HeroSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Music, BookOpen } from "lucide-react";

const highlights = [
  {
    icon: Code,
    title: "Technical Events",
    description: "Hackathons, coding competitions, tech talks, and innovation challenges",
    color: "text-primary",
  },
  {
    icon: Music,
    title: "Cultural Shows",
    description: "Dance, music, drama performances, and star-studded celebrity nights",
    color: "text-accent",
  },
  {
    icon: BookOpen,
    title: "Literary Events",
    description: "Debates, quizzes, creative writing, and knowledge competitions",
    color: "text-chart-2",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              About <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Ignitia</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Ignitia is the flagship techno-cultural festival of PSIT Kanpur, bringing together the brightest minds for two days of innovation, creativity, and celebration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {highlights.map((highlight) => {
              const Icon = highlight.icon;
              return (
                <Card key={highlight.title} className="hover-elevate">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 ${highlight.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle>{highlight.title}</CardTitle>
                    <CardDescription>{highlight.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>

          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                    Join the Celebration
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Experience two days packed with electrifying music nights, cutting-edge technical competitions, vibrant cultural performances, and celebrity appearances that make Ignitia the highlight of the academic year.
                  </p>
                  <p className="text-muted-foreground">
                    From hackathons and tech talks to dance battles and music festivals, Ignitia offers something for everyone. Be part of this incredible celebration of talent, creativity, and innovation.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-6 rounded-lg bg-background/50 backdrop-blur-sm">
                    <p className="text-3xl font-bold text-primary mb-1">50+</p>
                    <p className="text-sm text-muted-foreground">Events</p>
                  </div>
                  <div className="p-6 rounded-lg bg-background/50 backdrop-blur-sm">
                    <p className="text-3xl font-bold text-accent mb-1">5000+</p>
                    <p className="text-sm text-muted-foreground">Participants</p>
                  </div>
                  <div className="p-6 rounded-lg bg-background/50 backdrop-blur-sm">
                    <p className="text-3xl font-bold text-primary mb-1">2</p>
                    <p className="text-sm text-muted-foreground">Days</p>
                  </div>
                  <div className="p-6 rounded-lg bg-background/50 backdrop-blur-sm">
                    <p className="text-3xl font-bold text-accent mb-1">20+</p>
                    <p className="text-sm text-muted-foreground">Prizes</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
