import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/hero/HeroSection";
import QuickStats from "@/components/stats/QuickStats";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bus, Users, BarChart3, Shield, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: MapPin,
    title: "Real-Time Tracking",
    description: "Track public transport vehicles and traffic conditions live across Nairobi's major routes.",
  },
  {
    icon: BarChart3,
    title: "AI Route Optimization",
    description: "Intelligent algorithms analyze traffic patterns to suggest the fastest routes for your journey.",
  },
  {
    icon: Users,
    title: "Operator Coordination",
    description: "Secure communication channels for matatu operators to coordinate and share traffic updates.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "End-to-end encrypted communications and reliable data handling for peace of mind.",
  },
  {
    icon: Clock,
    title: "Time Savings",
    description: "Save an average of 18 minutes per trip with optimized routing and real-time updates.",
  },
  {
    icon: Bus,
    title: "Public Transport Focus",
    description: "Purpose-built for Kenya's public transport ecosystem including matatus and buses.",
  },
];

const Index = () => {
  return (
    <>
      <Helmet>
        <title>MAPEMA NDO BEST - Smart Traffic Management for Nairobi</title>
        <meta
          name="description"
          content="Real-time traffic updates, AI-powered route optimization, and seamless operator coordination for Nairobi's public transport system."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-16">
          {/* Hero Section */}
          <HeroSection />

          {/* Stats Section */}
          <section className="py-16 bg-secondary/30">
            <div className="container mx-auto px-4">
              <QuickStats />
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                  Transforming Urban Mobility
                </h2>
                <p className="text-muted-foreground text-lg">
                  MAPEMA NDO BEST combines cutting-edge technology with deep understanding of 
                  Kenya's public transport needs.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, i) => (
                  <div
                    key={i}
                    className="group p-6 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-hero relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(255,255,255,0.1) 10px,
                rgba(255,255,255,0.1) 20px
              )`
            }} />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-6">
                  Ready to Beat the Traffic?
                </h2>
                <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
                  Join thousands of commuters and operators already using MAPEMA NDO BEST 
                  to navigate Nairobi smarter.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/map">
                    <Button variant="glass" size="xl">
                      Open Live Map
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="xl"
                    className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    Contact Us
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-12 bg-card border-t border-border">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-hero rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <span className="text-lg font-bold text-foreground">MAPEMA NDO BEST</span>
                    <p className="text-xs text-muted-foreground">Smart Traffic for Nairobi</p>
                  </div>
                </div>
                <div className="flex gap-6 text-sm text-muted-foreground">
                  <a href="#" className="hover:text-foreground transition-colors">About</a>
                  <a href="#" className="hover:text-foreground transition-colors">Features</a>
                  <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
                  <a href="#" className="hover:text-foreground transition-colors">Terms</a>
                </div>
                <p className="text-sm text-muted-foreground">
                  © 2024 MAPEMA NDO BEST. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
};

export default Index;
