import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, MapPin, Bus, Star, ArrowRight, Search, Filter } from "lucide-react";
import { useState } from "react";

interface RouteData {
  id: number;
  name: string;
  from: string;
  to: string;
  distance: string;
  avgTime: string;
  fare: string;
  status: "clear" | "moderate" | "congested";
  operators: number;
  rating: number;
}

const routes: RouteData[] = [
  {
    id: 1,
    name: "Route 23",
    from: "CBD",
    to: "Westlands",
    distance: "8.5 km",
    avgTime: "25 min",
    fare: "KSh 50",
    status: "clear",
    operators: 45,
    rating: 4.5,
  },
  {
    id: 2,
    name: "Route 58",
    from: "CBD",
    to: "Karen",
    distance: "18 km",
    avgTime: "45 min",
    fare: "KSh 100",
    status: "moderate",
    operators: 32,
    rating: 4.2,
  },
  {
    id: 3,
    name: "Route 111",
    from: "Westlands",
    to: "JKIA",
    distance: "22 km",
    avgTime: "50 min",
    fare: "KSh 150",
    status: "congested",
    operators: 28,
    rating: 3.8,
  },
  {
    id: 4,
    name: "Route 45",
    from: "CBD",
    to: "Thika Town",
    distance: "45 km",
    avgTime: "1h 15min",
    fare: "KSh 200",
    status: "clear",
    operators: 65,
    rating: 4.6,
  },
  {
    id: 5,
    name: "Route 17",
    from: "Eastleigh",
    to: "CBD",
    distance: "6 km",
    avgTime: "20 min",
    fare: "KSh 40",
    status: "moderate",
    operators: 52,
    rating: 4.0,
  },
  {
    id: 6,
    name: "Route 33",
    from: "CBD",
    to: "Ngong",
    distance: "25 km",
    avgTime: "55 min",
    fare: "KSh 120",
    status: "congested",
    operators: 38,
    rating: 3.9,
  },
];

const statusStyles = {
  clear: "bg-traffic-clear/10 text-traffic-clear border-traffic-clear/30",
  moderate: "bg-traffic-moderate/10 text-traffic-moderate border-traffic-moderate/30",
  congested: "bg-traffic-congested/10 text-traffic-congested border-traffic-congested/30",
};

const RoutesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const filteredRoutes = routes.filter((route) => {
    const matchesSearch =
      route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.to.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = !selectedFilter || route.status === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <Helmet>
        <title>Public Transport Routes - MAPEMA NDO BEST</title>
        <meta
          name="description"
          content="Browse all public transport routes in Nairobi. View real-time status, fares, and travel times."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Public Transport Routes</h1>
              <p className="text-muted-foreground">
                Browse and search through all available routes in Nairobi and surrounding areas.
              </p>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search routes, locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 h-12"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={selectedFilter === null ? "default" : "outline"}
                  onClick={() => setSelectedFilter(null)}
                >
                  All
                </Button>
                <Button
                  variant={selectedFilter === "clear" ? "default" : "outline"}
                  onClick={() => setSelectedFilter("clear")}
                  className={selectedFilter === "clear" ? "" : "text-traffic-clear border-traffic-clear/30"}
                >
                  Clear
                </Button>
                <Button
                  variant={selectedFilter === "moderate" ? "default" : "outline"}
                  onClick={() => setSelectedFilter("moderate")}
                  className={selectedFilter === "moderate" ? "" : "text-traffic-moderate border-traffic-moderate/30"}
                >
                  Moderate
                </Button>
                <Button
                  variant={selectedFilter === "congested" ? "default" : "outline"}
                  onClick={() => setSelectedFilter("congested")}
                  className={selectedFilter === "congested" ? "" : "text-traffic-congested border-traffic-congested/30"}
                >
                  Heavy
                </Button>
              </div>
            </div>

            {/* Routes Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRoutes.map((route) => (
                <div
                  key={route.id}
                  className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
                >
                  {/* Route Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Bus className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground">{route.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Star className="w-3 h-3 text-accent fill-accent" />
                          <span>{route.rating}</span>
                        </div>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full border capitalize ${
                        statusStyles[route.status]
                      }`}
                    >
                      {route.status}
                    </span>
                  </div>

                  {/* Route Path */}
                  <div className="flex items-center gap-2 mb-4 p-3 bg-secondary/50 rounded-xl">
                    <MapPin className="w-4 h-4 text-traffic-clear shrink-0" />
                    <span className="font-medium text-foreground truncate">{route.from}</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span className="font-medium text-foreground truncate">{route.to}</span>
                  </div>

                  {/* Route Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-foreground">{route.avgTime}</div>
                      <div className="text-xs text-muted-foreground">Avg. Time</div>
                    </div>
                    <div className="text-center border-x border-border">
                      <div className="text-lg font-bold text-foreground">{route.fare}</div>
                      <div className="text-xs text-muted-foreground">Fare</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-foreground">{route.operators}</div>
                      <div className="text-xs text-muted-foreground">Operators</div>
                    </div>
                  </div>

                  {/* View Button */}
                  <Button variant="outline" className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    View Route Details
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            {filteredRoutes.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto bg-secondary rounded-2xl flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No routes found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default RoutesPage;
