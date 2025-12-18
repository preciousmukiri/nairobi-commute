import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, MapPin, Bell, Filter, CheckCircle, XCircle, Info } from "lucide-react";
import { useState } from "react";

interface Alert {
  id: number;
  type: "incident" | "roadwork" | "event" | "info";
  severity: "high" | "medium" | "low";
  title: string;
  description: string;
  location: string;
  time: string;
  status: "active" | "resolved";
}

const alerts: Alert[] = [
  {
    id: 1,
    type: "incident",
    severity: "high",
    title: "Major Accident - Uhuru Highway",
    description: "Multi-vehicle collision near Kenyatta Avenue junction. Two lanes blocked. Emergency services on scene.",
    location: "Uhuru Highway, near Kenyatta Ave",
    time: "15 min ago",
    status: "active",
  },
  {
    id: 2,
    type: "roadwork",
    severity: "medium",
    title: "Road Works - Ngong Road",
    description: "Scheduled road repairs in progress. Single lane operating between Adams Arcade and Prestige Plaza.",
    location: "Ngong Road, Adams Arcade",
    time: "1 hour ago",
    status: "active",
  },
  {
    id: 3,
    type: "event",
    severity: "medium",
    title: "Marathon Event - CBD",
    description: "Nairobi Marathon this Sunday. Multiple road closures expected in CBD and surrounding areas.",
    location: "CBD, Uhuru Gardens",
    time: "2 hours ago",
    status: "active",
  },
  {
    id: 4,
    type: "incident",
    severity: "high",
    title: "Flooding - Mombasa Road",
    description: "Heavy rain causing flooding near JKIA. Vehicles advised to use alternative routes.",
    location: "Mombasa Road, near JKIA",
    time: "3 hours ago",
    status: "active",
  },
  {
    id: 5,
    type: "info",
    severity: "low",
    title: "New Bus Stop - Westlands",
    description: "New bus stop operational at Sarit Centre. Additional routes now serving this location.",
    location: "Westlands, Sarit Centre",
    time: "5 hours ago",
    status: "active",
  },
  {
    id: 6,
    type: "incident",
    severity: "medium",
    title: "Broken Down Vehicle - Thika Road",
    description: "Stalled truck removed from outer lane. Traffic flow resuming to normal.",
    location: "Thika Road, Kasarani",
    time: "6 hours ago",
    status: "resolved",
  },
];

const typeIcons = {
  incident: AlertTriangle,
  roadwork: Info,
  event: Bell,
  info: Info,
};

const severityStyles = {
  high: {
    bg: "bg-traffic-congested/10",
    border: "border-traffic-congested/30",
    icon: "text-traffic-congested",
  },
  medium: {
    bg: "bg-traffic-moderate/10",
    border: "border-traffic-moderate/30",
    icon: "text-traffic-moderate",
  },
  low: {
    bg: "bg-primary/10",
    border: "border-primary/30",
    icon: "text-primary",
  },
};

const AlertsPage = () => {
  const [filterType, setFilterType] = useState<string | null>(null);
  const [showResolved, setShowResolved] = useState(false);

  const filteredAlerts = alerts.filter((alert) => {
    const matchesType = !filterType || alert.type === filterType;
    const matchesStatus = showResolved || alert.status === "active";
    return matchesType && matchesStatus;
  });

  const activeCount = alerts.filter((a) => a.status === "active").length;

  return (
    <>
      <Helmet>
        <title>Traffic Alerts - MAPEMA NDO BEST</title>
        <meta
          name="description"
          content="Real-time traffic alerts for Nairobi. Stay informed about accidents, road works, and events affecting your commute."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Traffic Alerts</h1>
                <p className="text-muted-foreground">
                  Stay updated with real-time traffic incidents and announcements.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-2 px-4 py-2 bg-traffic-congested/10 text-traffic-congested rounded-full text-sm font-medium">
                  <span className="w-2 h-2 bg-traffic-congested rounded-full animate-pulse" />
                  {activeCount} Active Alerts
                </span>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Button
                variant={filterType === null ? "default" : "outline"}
                onClick={() => setFilterType(null)}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={filterType === "incident" ? "default" : "outline"}
                onClick={() => setFilterType("incident")}
                size="sm"
              >
                <AlertTriangle className="w-4 h-4 mr-1" />
                Incidents
              </Button>
              <Button
                variant={filterType === "roadwork" ? "default" : "outline"}
                onClick={() => setFilterType("roadwork")}
                size="sm"
              >
                <Info className="w-4 h-4 mr-1" />
                Road Works
              </Button>
              <Button
                variant={filterType === "event" ? "default" : "outline"}
                onClick={() => setFilterType("event")}
                size="sm"
              >
                <Bell className="w-4 h-4 mr-1" />
                Events
              </Button>
              <div className="flex-1" />
              <Button
                variant={showResolved ? "secondary" : "outline"}
                onClick={() => setShowResolved(!showResolved)}
                size="sm"
              >
                {showResolved ? <CheckCircle className="w-4 h-4 mr-1" /> : <XCircle className="w-4 h-4 mr-1" />}
                {showResolved ? "Showing Resolved" : "Show Resolved"}
              </Button>
            </div>

            {/* Alerts List */}
            <div className="space-y-4">
              {filteredAlerts.map((alert) => {
                const Icon = typeIcons[alert.type];
                const styles = severityStyles[alert.severity];

                return (
                  <div
                    key={alert.id}
                    className={`p-5 rounded-2xl border ${styles.border} ${styles.bg} transition-all duration-200 hover:shadow-md ${
                      alert.status === "resolved" ? "opacity-60" : ""
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                          alert.status === "resolved" ? "bg-muted" : styles.bg
                        }`}
                      >
                        <Icon
                          className={`w-6 h-6 ${alert.status === "resolved" ? "text-muted-foreground" : styles.icon}`}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="font-semibold text-foreground">{alert.title}</h3>
                          <div className="flex items-center gap-2 shrink-0">
                            {alert.status === "resolved" ? (
                              <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground">
                                Resolved
                              </span>
                            ) : (
                              <span
                                className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${
                                  alert.severity === "high"
                                    ? "bg-traffic-congested/20 text-traffic-congested"
                                    : alert.severity === "medium"
                                    ? "bg-traffic-moderate/20 text-traffic-moderate"
                                    : "bg-primary/20 text-primary"
                                }`}
                              >
                                {alert.severity}
                              </span>
                            )}
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-3">{alert.description}</p>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {alert.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {alert.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredAlerts.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto bg-secondary rounded-2xl flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-traffic-clear" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No alerts found</h3>
                <p className="text-muted-foreground">
                  {showResolved
                    ? "No alerts match your current filters."
                    : "All clear! No active alerts at the moment."}
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default AlertsPage;
