import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import MapView from "@/components/map/MapView";
import TrafficStatus from "@/components/traffic/TrafficStatus";
import RouteSearch from "@/components/search/RouteSearch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Route, AlertTriangle, Clock } from "lucide-react";

const MapPage = () => {
  return (
    <>
      <Helmet>
        <title>Live Traffic Map - MAPEMA NDO BEST</title>
        <meta
          name="description"
          content="View real-time traffic conditions across Nairobi. Get optimized routes and live updates for public transport."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-16 h-screen flex flex-col">
          <div className="flex-1 flex flex-col lg:flex-row">
            {/* Sidebar */}
            <aside className="w-full lg:w-[400px] bg-card border-r border-border overflow-y-auto">
              <div className="p-4">
                <Tabs defaultValue="search" className="w-full">
                  <TabsList className="w-full grid grid-cols-3 mb-4">
                    <TabsTrigger value="search" className="flex items-center gap-2">
                      <Route className="w-4 h-4" />
                      <span className="hidden sm:inline">Routes</span>
                    </TabsTrigger>
                    <TabsTrigger value="traffic" className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span className="hidden sm:inline">Traffic</span>
                    </TabsTrigger>
                    <TabsTrigger value="alerts" className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="hidden sm:inline">Alerts</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="search" className="mt-0">
                    <RouteSearch />
                  </TabsContent>

                  <TabsContent value="traffic" className="mt-0">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h2 className="font-semibold text-foreground">Traffic Status</h2>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          Updated just now
                        </div>
                      </div>
                      <TrafficStatus />
                    </div>
                  </TabsContent>

                  <TabsContent value="alerts" className="mt-0">
                    <div className="space-y-4">
                      <h2 className="font-semibold text-foreground">Active Alerts</h2>
                      
                      {/* Alert Items */}
                      <div className="space-y-3">
                        <div className="p-4 bg-traffic-congested/10 border border-traffic-congested/30 rounded-xl">
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-traffic-congested shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-foreground">Heavy Traffic - Uhuru Highway</h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                Accident reported near Kenyatta Avenue junction. Expect delays of 20+ minutes.
                              </p>
                              <span className="text-xs text-muted-foreground mt-2 block">15 min ago</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-traffic-moderate/10 border border-traffic-moderate/30 rounded-xl">
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-traffic-moderate shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-foreground">Road Works - Ngong Road</h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                Single lane operating near Adams Arcade. Moderate delays expected.
                              </p>
                              <span className="text-xs text-muted-foreground mt-2 block">1 hour ago</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-primary/10 border border-primary/30 rounded-xl">
                          <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-foreground">New Route Available</h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                Alternative route via Langata Road now showing reduced travel times.
                              </p>
                              <span className="text-xs text-muted-foreground mt-2 block">2 hours ago</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </aside>

            {/* Map Area */}
            <div className="flex-1 relative">
              <MapView className="h-full min-h-[400px]" />
              
              {/* Map Legend */}
              <div className="absolute bottom-6 left-6 bg-card/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-border">
                <h4 className="text-sm font-semibold text-foreground mb-3">Traffic Legend</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-1 bg-traffic-clear rounded-full" />
                    <span className="text-sm text-muted-foreground">Clear</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-1 bg-traffic-moderate rounded-full" />
                    <span className="text-sm text-muted-foreground">Moderate</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-1 bg-traffic-congested rounded-full" />
                    <span className="text-sm text-muted-foreground">Heavy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default MapPage;
