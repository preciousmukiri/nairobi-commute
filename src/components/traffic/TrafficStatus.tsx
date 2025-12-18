import { TrendingUp, TrendingDown, Minus, Clock, Car, AlertTriangle } from "lucide-react";

interface TrafficRoute {
  name: string;
  status: "clear" | "moderate" | "congested";
  avgTime: string;
  change: number;
}

const trafficRoutes: TrafficRoute[] = [
  { name: "Uhuru Highway", status: "congested", avgTime: "45 min", change: 15 },
  { name: "Mombasa Road", status: "moderate", avgTime: "35 min", change: 5 },
  { name: "Thika Road", status: "clear", avgTime: "20 min", change: -10 },
  { name: "Ngong Road", status: "congested", avgTime: "40 min", change: 20 },
  { name: "Waiyaki Way", status: "moderate", avgTime: "30 min", change: 0 },
];

const statusConfig = {
  clear: {
    bg: "bg-traffic-clear/10",
    text: "text-traffic-clear",
    border: "border-traffic-clear/30",
    label: "Clear",
    icon: TrendingDown,
  },
  moderate: {
    bg: "bg-traffic-moderate/10",
    text: "text-traffic-moderate",
    border: "border-traffic-moderate/30",
    label: "Moderate",
    icon: Minus,
  },
  congested: {
    bg: "bg-traffic-congested/10",
    text: "text-traffic-congested",
    border: "border-traffic-congested/30",
    label: "Congested",
    icon: TrendingUp,
  },
};

const TrafficStatus = () => {
  const congestedCount = trafficRoutes.filter((r) => r.status === "congested").length;
  const clearCount = trafficRoutes.filter((r) => r.status === "clear").length;

  return (
    <div className="space-y-4">
      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-traffic-clear/10 rounded-xl p-3 text-center">
          <div className="text-2xl font-bold text-traffic-clear">{clearCount}</div>
          <div className="text-xs text-muted-foreground">Clear Routes</div>
        </div>
        <div className="bg-traffic-moderate/10 rounded-xl p-3 text-center">
          <div className="text-2xl font-bold text-traffic-moderate">
            {trafficRoutes.filter((r) => r.status === "moderate").length}
          </div>
          <div className="text-xs text-muted-foreground">Moderate</div>
        </div>
        <div className="bg-traffic-congested/10 rounded-xl p-3 text-center">
          <div className="text-2xl font-bold text-traffic-congested">{congestedCount}</div>
          <div className="text-xs text-muted-foreground">Congested</div>
        </div>
      </div>

      {/* Route List */}
      <div className="space-y-2">
        {trafficRoutes.map((route) => {
          const config = statusConfig[route.status];
          const StatusIcon = config.icon;

          return (
            <div
              key={route.name}
              className={`p-3 rounded-xl border ${config.border} ${config.bg} transition-all duration-200 hover:scale-[1.02] cursor-pointer`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-8 rounded-full ${config.text} bg-current`} />
                  <div>
                    <h4 className="font-semibold text-foreground">{route.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{route.avgTime}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${config.bg} ${config.text}`}>
                    {config.label}
                  </span>
                  <div className={`flex items-center gap-1 ${config.text}`}>
                    <StatusIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {route.change > 0 ? "+" : ""}
                      {route.change}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Alert Banner */}
      {congestedCount >= 2 && (
        <div className="flex items-center gap-3 p-4 bg-traffic-congested/10 border border-traffic-congested/30 rounded-xl">
          <AlertTriangle className="w-5 h-5 text-traffic-congested shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">High Traffic Alert</p>
            <p className="text-xs text-muted-foreground">
              Multiple routes experiencing heavy congestion. Consider alternative routes.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrafficStatus;
