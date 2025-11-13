import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/Hero_background_techno_festival_ed84d769.png";
import rotatingCircle from "@assets/generated_images/Rotating_neon_circle_graphic_146cf3db.png";
import dateBadge from "@assets/generated_images/Festival_date_badge_graphic_268e2f27.png";
import particle from "@assets/generated_images/Particle_effect_element_e11156f1.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background" />

      <div className="absolute top-20 left-10 w-16 h-16 opacity-40 animate-float">
        <img src={particle} alt="" className="w-full h-full" />
      </div>
      <div className="absolute top-40 right-20 w-12 h-12 opacity-50 animate-float" style={{ animationDelay: "1s" }}>
        <img src={particle} alt="" className="w-full h-full" />
      </div>
      <div className="absolute bottom-32 left-1/4 w-10 h-10 opacity-30 animate-float" style={{ animationDelay: "2s" }}>
        <img src={particle} alt="" className="w-full h-full" />
      </div>
      <div className="absolute bottom-20 right-1/3 w-14 h-14 opacity-40 animate-float" style={{ animationDelay: "0.5s" }}>
        <img src={particle} alt="" className="w-full h-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 md:w-[600px] md:h-[600px] opacity-20 pointer-events-none">
          <img
            src={rotatingCircle}
            alt=""
            className="w-full h-full animate-spin-slow"
          />
        </div>

        <div className="relative space-y-8">
          <div className="inline-block mb-4">
            <img
              src={dateBadge}
              alt="Festival Dates"
              className="h-32 md:h-40 w-auto mx-auto animate-pulse-glow"
            />
          </div>

          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
            data-testid="text-hero-title"
          >
            IGNITIA 2K25
          </h1>

          <p className="text-lg md:text-2xl text-foreground/80 max-w-3xl mx-auto font-medium">
            The Ultimate Techno-Cultural Fest
          </p>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience electrifying music nights, cutting-edge technical events, vibrant cultural showcases, and star-studded performances at PSIT Kanpur
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link href="/events">
              <Button
                size="lg"
                className="px-8 py-6 text-lg font-semibold rounded-full"
                data-testid="button-explore-events"
              >
                Explore Events
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg font-semibold rounded-full backdrop-blur-md bg-background/50"
                data-testid="button-contact-us"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
