import { AlertTriangle, IndianRupee, Clock, TrendingUp, MapPin } from "lucide-react";
import {
  StatCard, Card, CardHeader,
  StatusBadge, CategoryBadge, PriorityBadge,
  PageHeader, LiveBadge,
  BlockchainStrip,
} from "../design-system";
import { Button } from "../design-system";

const stats = [
  {
    label: "Total Issues Reported",
    value: "1,847",
    change: "+14% this month",
    changeType: "positive" as const,
    icon: <AlertTriangle className="w-5 h-5" />,
    iconBg: "#FFF7ED",
    iconColor: "#C2410C",
  },
  {
    label: "Funds Allocated",
    value: "₹6.2 Cr",
    change: "+₹0.8 Cr this week",
    changeType: "positive" as const,
    icon: <IndianRupee className="w-5 h-5" />,
    iconBg: "#EFF6FF",
    iconColor: "#1D4ED8",
  },
  {
    label: "Funds Released",
    value: "₹4.1 Cr",
    change: "66% utilization rate",
    changeType: "neutral" as const,
    icon: <TrendingUp className="w-5 h-5" />,
    iconBg: "#D1FAE5",
    iconColor: "#059669",
  },
  {
    label: "Avg Resolution Time",
    value: "7.6 Days",
    change: "-1.8 days vs last month",
    changeType: "negative" as const,
    icon: <Clock className="w-5 h-5" />,
    iconBg: "#F3E8FF",
    iconColor: "#7C3AED",
  },
];

type IssueStatus = "Open" | "In Progress" | "Resolved";

const recentIssues: {
  id: string; title: string; category: string;
  location: string; status: IssueStatus;
  date: string; fund: string; priority: "High" | "Medium" | "Low";
}[] = [
  { id: "CIV-1024", title: "Deep pothole on Anna Salai causing vehicle damage", category: "Pothole", location: "Anna Salai, Zone 1 – T. Nagar", status: "In Progress", date: "Mar 1, 2026", fund: "₹1,20,000", priority: "High" },
  { id: "CIV-1023", title: "Overflowing garbage bins near T. Nagar bus stand", category: "Garbage", location: "T. Nagar Market, Zone 2", status: "Open", date: "Feb 28, 2026", fund: "₹48,000", priority: "Medium" },
  { id: "CIV-1022", title: "Street lights non-functional — 6 units out", category: "Streetlight", location: "Adyar Signal, Zone 3", status: "Resolved", date: "Feb 27, 2026", fund: "₹90,000", priority: "Low" },
  { id: "CIV-1021", title: "Water main burst flooding Mylapore street", category: "Water Issue", location: "Mylapore, Zone 4", status: "In Progress", date: "Feb 27, 2026", fund: "₹2,80,000", priority: "High" },
  { id: "CIV-1020", title: "Road cave-in near Velachery MRTS station", category: "Pothole", location: "Velachery, Zone 5", status: "Resolved", date: "Feb 26, 2026", fund: "₹3,80,000", priority: "High" },
];

export function HomeDashboard() {
  return (
    <div className="p-8 space-y-7">
      <PageHeader
        title="Home Dashboard"
        subtitle="Welcome back! Here's what's happening across Chennai today."
        badge={<LiveBadge label="Live · Mar 2, 2026" />}
      />

      {/* Stats */}
      <div className="grid grid-cols-4 gap-5">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Recent Issues */}
      <Card padding="none">
        <CardHeader
          title="Recent Issues"
          subtitle="Latest civic complaints submitted by Chennai citizens"
          action={<Button variant="ghost" size="sm">View All →</Button>}
        />
        <div>
          {recentIssues.map((issue, i) => (
            <div
              key={issue.id}
              className="px-6 py-4 flex items-center gap-4 transition-colors"
              style={{
                borderBottom: i < recentIssues.length - 1 ? "1px solid #F4F7FB" : "none",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#F8FAFD"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = ""; }}
            >
              {/* ID + Priority */}
              <div className="w-28 flex-shrink-0">
                <p className="text-[#0B2447]" style={{ fontWeight: 700, fontSize: "0.8125rem" }}>
                  {issue.id}
                </p>
                <div className="mt-0.5">
                  <PriorityBadge priority={issue.priority} />
                </div>
              </div>

              {/* Title + Category + Location */}
              <div className="flex-1 min-w-0">
                <p className="text-[#0B2447] truncate" style={{ fontWeight: 500, fontSize: "0.875rem" }}>
                  {issue.title}
                </p>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <CategoryBadge category={issue.category as any} showEmoji />
                  <span className="text-[#8A9BBE] flex items-center gap-1" style={{ fontSize: "0.75rem" }}>
                    <MapPin className="w-3 h-3" />
                    {issue.location}
                  </span>
                </div>
              </div>

              {/* Fund */}
              <div className="text-right w-28 flex-shrink-0">
                <p className="text-[#0B2447]" style={{ fontWeight: 700, fontSize: "0.875rem" }}>
                  {issue.fund}
                </p>
                <p className="text-[#8A9BBE] mt-0.5" style={{ fontSize: "0.6875rem" }}>Allocated</p>
              </div>

              {/* Status */}
              <div className="w-28 flex-shrink-0 flex justify-end">
                <StatusBadge status={issue.status} />
              </div>

              {/* Date */}
              <div className="w-24 flex-shrink-0 text-right">
                <p className="text-[#8A9BBE]" style={{ fontSize: "0.75rem" }}>{issue.date}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Blockchain Strip */}
      <BlockchainStrip blockNumber="#22,847,391" txHash="0x7c4f…b2e9" />
    </div>
  );
}
