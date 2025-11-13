import { useState } from "react";
import EventCard from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { Code, Mic, BookOpen, Trophy, Cpu, Guitar, Palette, Brain } from "lucide-react";
import particle from "@assets/generated_images/Particle_effect_element_e11156f1.png";

const categories = ["All", "Technical", "Cultural", "Literary"] as const;
type Category = typeof categories[number];

const events = [
  {
    title: "Hackathon 2025",
    description: "24-hour coding marathon to build innovative solutions and win exciting prizes",
    category: "Technical" as const,
    date: "February 24, 2025",
    time: "9:00 AM - 9:00 AM (Next Day)",
    icon: Code,
  },
  {
    title: "Code Combat",
    description: "Competitive programming challenge testing algorithmic skills and speed",
    category: "Technical" as const,
    date: "February 24, 2025",
    time: "11:00 AM - 2:00 PM",
    icon: Cpu,
  },
  {
    title: "Tech Talk Series",
    description: "Industry experts share insights on latest technology trends and innovations",
    category: "Technical" as const,
    date: "February 25, 2025",
    time: "10:00 AM - 12:00 PM",
    icon: Trophy,
  },
  {
    title: "Battle of Bands",
    description: "Live music competition featuring college bands from across the region",
    category: "Cultural" as const,
    date: "February 24, 2025",
    time: "6:00 PM - 10:00 PM",
    icon: Guitar,
  },
  {
    title: "Dance Championship",
    description: "Showcase your moves in solo, duet, and group dance categories",
    category: "Cultural" as const,
    date: "February 25, 2025",
    time: "4:00 PM - 8:00 PM",
    icon: Mic,
  },
  {
    title: "Art Exhibition",
    description: "Display of creative artworks, paintings, and digital art by talented students",
    category: "Cultural" as const,
    date: "February 24-25, 2025",
    time: "All Day",
    icon: Palette,
  },
  {
    title: "Quiz Competition",
    description: "Test your knowledge across various domains in this intense quizzing battle",
    category: "Literary" as const,
    date: "February 24, 2025",
    time: "2:00 PM - 5:00 PM",
    icon: Brain,
  },
  {
    title: "Debate Tournament",
    description: "Parliamentary debate competition on contemporary issues and topics",
    category: "Literary" as const,
    date: "February 25, 2025",
    time: "11:00 AM - 3:00 PM",
    icon: BookOpen,
  },
];

const categoryBackgrounds = {
  Technical: "from-primary/20 via-background to-background",
  Cultural: "from-accent/20 via-background to-background",
  Literary: "from-chart-2/20 via-background to-background",
  All: "from-primary/10 via-accent/10 to-background",
};

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");

  const filteredEvents = selectedCategory === "All" 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  return (
    <div className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-b ${categoryBackgrounds[selectedCategory]} transition-all duration-700`} />
      
      <div className="absolute top-20 left-10 w-20 h-20 opacity-20 animate-float">
        <img src={particle} alt="" className="w-full h-full" />
      </div>
      <div className="absolute top-1/3 right-20 w-16 h-16 opacity-30 animate-float" style={{ animationDelay: "1s" }}>
        <img src={particle} alt="" className="w-full h-full" />
      </div>
      <div className="absolute bottom-1/4 left-1/4 w-24 h-24 opacity-15 animate-float" style={{ animationDelay: "2s" }}>
        <img src={particle} alt="" className="w-full h-full" />
      </div>
      <div className="absolute top-1/2 right-1/3 w-18 h-18 opacity-25 animate-float" style={{ animationDelay: "0.5s" }}>
        <img src={particle} alt="" className="w-full h-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Events</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our diverse range of technical, cultural, and literary events
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              data-testid={`button-filter-${category.toLowerCase()}`}
              className="backdrop-blur-sm"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, idx) => (
            <EventCard key={idx} {...event} />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No events found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
