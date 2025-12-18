import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Clock, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  { icon: MapPin, text: "Real-time traffic updates" },
  { icon: Clock, text: "Smart route optimization" },
  { icon: Shield, text: "Secure operator comms" },
  { icon: Zap, text: "AI-powered predictions" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-5" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
              <span className="w-2 h-2 bg-traffic-clear rounded-full animate-pulse" />
              <span className="text-sm font-medium text-primary">Live Traffic Updates</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-foreground">Navigate Nairobi</span>
              <br />
              <span className="text-gradient-hero">Smarter & Faster</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg">
              MAPEMA NDO BEST revolutionizes public transport in Kenya with real-time traffic intelligence, 
              AI-powered route optimization, and seamless operator coordination.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/map">
                <Button variant="hero" size="xl">
                  View Live Map
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button variant="outline" size="xl">
                Learn More
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 animate-fade-in"
                  style={{ animationDelay: `${(i + 1) * 150}ms` }}
                >
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Map Preview */}
          <div className="relative animate-fade-in" style={{ animationDelay: "300ms" }}>
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-2xl blur-xl" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/20 rounded-2xl blur-xl" />
              
              {/* Map Card */}
              <div className="relative bg-card rounded-3xl shadow-2xl overflow-hidden border border-border">
                {/* Mock Map Image */}
                <div className="aspect-square bg-gradient-to-br from-sidebar to-sidebar-accent relative">
                  {/* Grid overlay */}
                  <div 
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                      `,
                      backgroundSize: '40px 40px'
                    }}
                  />
                  
                  {/* Mock route */}
                  <svg className="absolute inset-0 w-full h-full">
                    <path
                      d="M 50 150 Q 150 100, 200 180 T 350 250"
                      stroke="hsl(var(--primary))"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                      className="animate-pulse"
                    />
                    <path
                      d="M 100 300 Q 200 280, 280 200"
                      stroke="hsl(var(--traffic-congested))"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 280 80 Q 320 150, 380 200"
                      stroke="hsl(var(--traffic-clear))"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* Mock location markers */}
                  <div className="absolute top-[30%] left-[20%] w-4 h-4 bg-traffic-clear rounded-full border-2 border-card shadow-lg animate-pulse" />
                  <div className="absolute top-[45%] left-[50%] w-5 h-5 bg-primary rounded-full border-2 border-card shadow-glow" />
                  <div className="absolute top-[60%] left-[70%] w-4 h-4 bg-traffic-congested rounded-full border-2 border-card shadow-lg" />
                  <div className="absolute top-[25%] left-[80%] w-4 h-4 bg-traffic-moderate rounded-full border-2 border-card shadow-lg animate-pulse" />
                </div>

                {/* Bottom Stats Bar */}
                <div className="p-4 bg-card border-t border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-traffic-clear rounded-full animate-pulse" />
                      <span className="text-sm font-medium text-foreground">Live Traffic</span>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-traffic-clear rounded-full" />
                        <span className="text-muted-foreground">Clear</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-traffic-moderate rounded-full" />
                        <span className="text-muted-foreground">Moderate</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-traffic-congested rounded-full" />
                        <span className="text-muted-foreground">Heavy</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
