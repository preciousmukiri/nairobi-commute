import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Clock, ArrowRight, Search, Locate } from "lucide-react";

const RouteSearch = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    if (origin && destination) {
      setShowResults(true);
    }
  };

  const popularRoutes = [
    { from: "CBD", to: "Westlands", time: "25 min", fare: "KSh 50" },
    { from: "CBD", to: "Karen", time: "45 min", fare: "KSh 100" },
    { from: "Westlands", to: "JKIA", time: "40 min", fare: "KSh 150" },
  ];

  return (
    <div className="space-y-4">
      {/* Search Form */}
      <div className="space-y-3">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-traffic-clear" />
          <Input
            placeholder="Where are you starting from?"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="pl-11 h-12 bg-card border-border"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-md hover:bg-secondary transition-colors">
            <Locate className="w-4 h-4 text-primary" />
          </button>
        </div>

        <div className="relative">
          <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-traffic-congested" />
          <Input
            placeholder="Where are you going?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="pl-11 h-12 bg-card border-border"
          />
        </div>

        <Button onClick={handleSearch} variant="hero" className="w-full h-12">
          <Search className="w-5 h-5" />
          Find Best Route
        </Button>
      </div>

      {/* Search Results */}
      {showResults && (
        <div className="animate-slide-up space-y-3 pt-2">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-primary" />
            Recommended Routes
          </h3>
          <div className="space-y-2">
            {[
              { route: "Via Uhuru Highway", time: "35 min", traffic: "moderate", fare: "KSh 80" },
              { route: "Via Ngong Road", time: "45 min", traffic: "clear", fare: "KSh 70" },
              { route: "Via Mombasa Road", time: "40 min", traffic: "congested", fare: "KSh 90" },
            ].map((result, i) => (
              <div
                key={i}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                  i === 0
                    ? "bg-primary/5 border-primary/30"
                    : "bg-card border-border hover:border-primary/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{result.route}</span>
                      {i === 0 && (
                        <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                          Fastest
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {result.time}
                      </span>
                      <span
                        className={`capitalize ${
                          result.traffic === "clear"
                            ? "text-traffic-clear"
                            : result.traffic === "moderate"
                            ? "text-traffic-moderate"
                            : "text-traffic-congested"
                        }`}
                      >
                        {result.traffic}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-foreground">{result.fare}</div>
                    <div className="text-xs text-muted-foreground">Est. fare</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Popular Routes */}
      {!showResults && (
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-medium text-muted-foreground">Popular Routes</h3>
          <div className="space-y-2">
            {popularRoutes.map((route, i) => (
              <button
                key={i}
                onClick={() => {
                  setOrigin(route.from);
                  setDestination(route.to);
                }}
                className="w-full p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-left group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-foreground">{route.from}</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="font-medium text-foreground">{route.to}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {route.time} • {route.fare}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RouteSearch;
