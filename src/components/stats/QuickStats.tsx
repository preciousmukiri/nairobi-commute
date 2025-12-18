import { Users, MapPin, Clock, TrendingUp } from "lucide-react";

const stats = [
  {
    label: "Active Users",
    value: "12,458",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    label: "Routes Tracked",
    value: "856",
    change: "+8%",
    trend: "up",
    icon: MapPin,
    color: "text-traffic-clear",
    bg: "bg-traffic-clear/10",
  },
  {
    label: "Avg. Time Saved",
    value: "18 min",
    change: "+5%",
    trend: "up",
    icon: Clock,
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    label: "Traffic Reports",
    value: "3,241",
    change: "+23%",
    trend: "up",
    icon: TrendingUp,
    color: "text-traffic-moderate",
    bg: "bg-traffic-moderate/10",
  },
];

const QuickStats = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-card rounded-2xl p-5 border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slide-up"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`p-2.5 rounded-xl ${stat.bg}`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <span className="text-xs font-medium text-traffic-clear bg-traffic-clear/10 px-2 py-1 rounded-full">
              {stat.change}
            </span>
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;
