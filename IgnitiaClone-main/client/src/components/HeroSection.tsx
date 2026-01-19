import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Calendar, MapPin, Users, Zap, Star, Sparkles } from "lucide-react";
import heroImage from "@assets/generated_images/Hero_background_techno_festival_ed84d769.png";
import rotatingCircle from "@assets/generated_images/Rotating_neon_circle_graphic_146cf3db.png";
import dateBadge from "@assets/generated_images/Festival_date_badge_graphic_268e2f27.png";
import particle from "@assets/generated_images/Particle_effect_element_e11156f1.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Enhanced Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'float 20s ease-in-out infinite'
        }} />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-4 h-4 bg-primary/30 rounded-full animate-float blur-sm" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-accent/40 rounded-full animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-primary/20 rounded-full animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-20 right-1/3 w-5 h-5 bg-accent/30 rounded-full animate-float" style={{ animationDelay: "0.5s" }} />
        <div className="absolute top-1/2 left-20 w-1 h-1 bg-primary/50 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-40 w-1 h-1 bg-accent/60 rounded-full animate-pulse" style={{ animationDelay: "1.5s" }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center">
        {/* Rotating Background Circle */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 md:w-[700px] md:h-[700px] opacity-10 pointer-events-none">
          <img
            src={rotatingCircle}
            alt=""
            className="w-full h-full animate-spin-slow"
          />
        </div>

        <div className="relative space-y-8">
          {/* Date Badge with Enhanced Animation */}
          <div className="inline-block mb-6 animate-fade-in-down">
            <div className="relative">
              <img
                src={dateBadge}
                alt="Festival Dates"
                className="h-32 md:h-40 w-auto mx-auto animate-pulse-glow"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-xl animate-pulse" />
            </div>
          </div>

          {/* Main Title with Typewriter Effect */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h1
              className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold gradient-text-slow mb-4"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
              data-testid="text-hero-title"
            >
              IGNITIA 2K26
            </h1>
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-primary animate-pulse" />
              <span className="text-lg md:text-xl text-primary font-semibold animate-gradient-shift bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                The Ultimate Experience
              </span>
              <Sparkles className="w-6 h-6 text-accent animate-pulse" style={{ animationDelay: "0.5s" }} />
            </div>
          </div>

          {/* Subtitle with Stagger Animation */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <p className="text-xl md:text-3xl text-foreground/90 max-w-4xl mx-auto font-medium mb-4" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              Techno-Cultural Festival
            </p>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Experience electrifying music nights, cutting-edge technical events, vibrant cultural showcases, and star-studded performances at PSIT Kanpur
            </p>
          </div>

          {/* Stats Cards */}
          <div className="animate-fade-in-up grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8" style={{ animationDelay: "0.6s" }}>
            <div className="glass p-4 rounded-xl border border-primary/20 hover:border-primary/40 transition-all duration-300 group">
              <div className="flex items-center justify-center mb-2">
                <Calendar className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-2xl font-bold text-primary">2</p>
              <p className="text-xs text-muted-foreground">Days</p>
            </div>
            <div className="glass p-4 rounded-xl border border-accent/20 hover:border-accent/40 transition-all duration-300 group">
              <div className="flex items-center justify-center mb-2">
                <Zap className="w-6 h-6 text-accent group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-2xl font-bold text-accent">50+</p>
              <p className="text-xs text-muted-foreground">Events</p>
            </div>
            <div className="glass p-4 rounded-xl border border-primary/20 hover:border-primary/40 transition-all duration-300 group">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-2xl font-bold text-primary">5K+</p>
              <p className="text-xs text-muted-foreground">Participants</p>
            </div>
            <div className="glass p-4 rounded-xl border border-accent/20 hover:border-accent/40 transition-all duration-300 group">
              <div className="flex items-center justify-center mb-2">
                <Star className="w-6 h-6 text-accent group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-2xl font-bold text-accent">₹10L+</p>
              <p className="text-xs text-muted-foreground">Prizes</p>
            </div>
          </div>

          {/* CTA Buttons with Enhanced Styling */}
          <div className="animate-fade-in-up flex flex-col sm:flex-row items-center justify-center gap-4 pt-6" style={{ animationDelay: "0.8s" }}>
            <Link href="/events">
              <Button
                size="lg"
                className="px-8 py-6 text-lg font-semibold rounded-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transform hover:scale-105 transition-all duration-300 shadow-glow hover:shadow-glow-lg btn-glow group"
                data-testid="button-explore-events"
              >
                <Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Explore Events
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg font-semibold rounded-full border-2 border-primary/30 hover:border-primary hover:bg-primary/10 transform hover:scale-105 transition-all duration-300 group"
                data-testid="button-register-now"
              >
                <Users className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Register Now
              </Button>
            </Link>
          </div>

          {/* Location Info */}
          <div className="animate-fade-in-up flex items-center justify-center gap-2 text-muted-foreground mt-8" style={{ animationDelay: "1s" }}>
            <MapPin className="w-4 h-4" />
            <span className="text-sm">PSIT Kanpur • March 2026</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
