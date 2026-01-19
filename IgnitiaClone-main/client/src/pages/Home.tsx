import HeroSection from "@/components/HeroSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Music, BookOpen, Trophy, Calendar, Users, Zap, Star, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "wouter";

const highlights = [
  {
    icon: Code,
    title: "Technical Events",
    description: "Hackathons, coding competitions, tech talks, and innovation challenges that push the boundaries of technology",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
    features: ["24hr Hackathon", "Coding Contests", "Tech Talks", "Innovation Labs"]
  },
  {
    icon: Music,
    title: "Cultural Shows",
    description: "Dance, music, drama performances, and star-studded celebrity nights that celebrate creativity",
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderColor: "border-accent/20",
    features: ["Celebrity Nights", "Dance Battles", "Music Concerts", "Drama Competitions"]
  },
  {
    icon: BookOpen,
    title: "Literary Events",
    description: "Debates, quizzes, creative writing, and knowledge competitions for the intellectually curious",
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
    borderColor: "border-chart-2/20",
    features: ["Quiz Competitions", "Debate Tournaments", "Poetry Slams", "Creative Writing"]
  },
];

const stats = [
  { icon: Calendar, label: "Days of Excitement", value: "2", color: "text-primary" },
  { icon: Zap, label: "Thrilling Events", value: "50+", color: "text-accent" },
  { icon: Users, label: "Expected Participants", value: "5000+", color: "text-primary" },
  { icon: Trophy, label: "Prize Money", value: "₹10L+", color: "text-accent" },
];

const testimonials = [
  {
    name: "Arjun Sharma",
    role: "Winner, Hackathon 2025",
    content: "Ignitia provided the perfect platform to showcase my coding skills. The 24-hour hackathon was intense but incredibly rewarding!",
    avatar: "AS"
  },
  {
    name: "Priya Patel",
    role: "Cultural Event Participant",
    content: "The cultural nights at Ignitia are absolutely spectacular. The energy, the performances, everything is just perfect!",
    avatar: "PP"
  },
  {
    name: "Rahul Kumar",
    role: "Tech Talk Attendee",
    content: "The tech talks by industry experts opened my mind to new possibilities. Ignitia is where innovation meets inspiration.",
    avatar: "RK"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* About Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-primary animate-pulse" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">About the Festival</span>
              <Sparkles className="w-6 h-6 text-accent animate-pulse" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              About Ignitia
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Ignitia is the flagship techno-cultural festival of PSIT Kanpur, bringing together the brightest minds for two days of innovation, creativity, and celebration. Join us for an unforgettable experience that combines cutting-edge technology with vibrant cultural expressions.
            </p>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <Card 
                  key={highlight.title} 
                  className={`card-hover ${highlight.borderColor} bg-gradient-to-br from-card to-card/50 backdrop-blur-sm stagger-animation group`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <CardHeader className="pb-4">
                    <div className={`w-16 h-16 rounded-2xl ${highlight.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-8 h-8 ${highlight.color}`} />
                    </div>
                    <CardTitle className="text-xl font-bold" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                      {highlight.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {highlight.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {highlight.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className={`w-1.5 h-1.5 rounded-full ${highlight.bgColor.replace('/10', '/60')}`} />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={stat.label}
                  className="text-center p-6 rounded-2xl glass border border-primary/10 hover:border-primary/30 transition-all duration-300 group stagger-animation"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Icon className={`w-8 h-8 ${stat.color} mx-auto mb-3 group-hover:scale-110 transition-transform`} />
                  <p className={`text-3xl md:text-4xl font-bold ${stat.color} mb-1`}>{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* Main CTA Card */}
          <Card className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border-primary/20 backdrop-blur-sm animate-fade-in-up">
            <CardContent className="p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-6 gradient-text" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                    Join the Celebration
                  </h3>
                  <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                    Experience two days packed with electrifying music nights, cutting-edge technical competitions, vibrant cultural performances, and celebrity appearances that make Ignitia the highlight of the academic year.
                  </p>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    From hackathons and tech talks to dance battles and music festivals, Ignitia offers something for everyone. Be part of this incredible celebration of talent, creativity, and innovation.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/events">
                      <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transform hover:scale-105 transition-all duration-300 group">
                        <Zap className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                        Explore Events
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button variant="outline" className="border-primary/30 hover:border-primary hover:bg-primary/10 transform hover:scale-105 transition-all duration-300 group">
                        <Users className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                        Register Now
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 rounded-xl glass border border-primary/20 text-center group hover:border-primary/40 transition-all duration-300">
                    <p className="text-3xl font-bold text-primary mb-1 group-hover:scale-110 transition-transform">50+</p>
                    <p className="text-sm text-muted-foreground">Events</p>
                  </div>
                  <div className="p-6 rounded-xl glass border border-accent/20 text-center group hover:border-accent/40 transition-all duration-300">
                    <p className="text-3xl font-bold text-accent mb-1 group-hover:scale-110 transition-transform">5000+</p>
                    <p className="text-sm text-muted-foreground">Participants</p>
                  </div>
                  <div className="p-6 rounded-xl glass border border-primary/20 text-center group hover:border-primary/40 transition-all duration-300">
                    <p className="text-3xl font-bold text-primary mb-1 group-hover:scale-110 transition-transform">2</p>
                    <p className="text-sm text-muted-foreground">Days</p>
                  </div>
                  <div className="p-6 rounded-xl glass border border-accent/20 text-center group hover:border-accent/40 transition-all duration-300">
                    <p className="text-3xl font-bold text-accent mb-1 group-hover:scale-110 transition-transform">₹10L+</p>
                    <p className="text-sm text-muted-foreground">Prizes</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/20 to-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="w-6 h-6 text-primary animate-pulse" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Testimonials</span>
              <Star className="w-6 h-6 text-accent animate-pulse" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              What People Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Hear from past participants about their incredible Ignitia experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={testimonial.name}
                className="card-hover border-primary/10 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm stagger-animation"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex gap-1 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
