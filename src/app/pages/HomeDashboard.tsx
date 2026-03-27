import { AlertTriangle, IndianRupee, Clock, TrendingUp, MapPin } from "lucide-react";
import {
  StatCard, Card, CardHeader,
  StatusBadge, CategoryBadge, PriorityBadge,
  PageHeader, LiveBadge,
  BlockchainStrip,
} from "../design-system";
import { Button } from "../design-system";
import { useEffect, useState } from "react";
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
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/issues")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a: any, b: any) => (b.votes || 0) - (a.votes || 0));
        setIssues(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching issues:", err);
        setLoading(false);
      });
  }, []);

  const handleUpvote = async (issueId: string) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.email) {
      alert("Please login to upvote");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/issues/${issueId}/upvote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail: user.email }),
      });

      if (response.ok) {
        const data = await fetch("http://localhost:5000/issues").then((r) => r.json());
        const sorted = data.sort((a: any, b: any) => (b.votes || 0) - (a.votes || 0));
        setIssues(sorted);
      } else {
        const error = await response.json();
        alert(error.error || "Failed to upvote");
      }
    } catch (error) {
      console.error("Upvote error:", error);
    }
  };

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
        {loading ? (
          <div className="px-6 py-8 text-center text-[#8A9BBE]">Loading issues...</div>
        ) : issues.length === 0 ? (
          <div className="px-6 py-8 text-center text-[#8A9BBE]">No issues yet</div>
        ) : (
          issues.map((issue, i) => (
            <div
              key={issue.id}
              className="px-6 py-4 flex items-center gap-4 transition-colors"
              style={{
                borderBottom: i < issues.length - 1 ? "1px solid #F4F7FB" : "none",
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
                  <span
                    className="inline-block px-2.5 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: issue.priority === "High" ? "#FEE2E2" : issue.priority === "Medium" ? "#FEF3C7" : "#D1FAE5",
                      color: issue.priority === "High" ? "#991B1B" : issue.priority === "Medium" ? "#92400E" : "#065F46",
                    }}
                  >
                    {issue.priority || "—"}
                  </span>
                </div>
              </div>

              {/* Title + Category + Location */}
              <div className="flex-1 min-w-0">
                <p className="text-[#0B2447] truncate" style={{ fontWeight: 500, fontSize: "0.875rem" }}>
                  {issue.title}
                  {(issue.votes || 0) >= 5 && " 🔥"}
                </p>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <span
                    className="inline-block px-2 py-0.5 rounded-full text-xs font-medium"
                    style={{
                      background: "#E0F2FE",
                      color: "#0369A1",
                    }}
                  >
                    {issue.category || "—"}
                  </span>
                  <span className="text-[#8A9BBE] flex items-center gap-1" style={{ fontSize: "0.75rem" }}>
                    <MapPin className="w-3 h-3" />
                    {issue.location || "—"}
                  </span>
                </div>
              </div>

              {/* Votes */}
              <div className="w-20 flex-shrink-0">
                <button
                  onClick={() => handleUpvote(issue.id)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-colors"
                  style={{
                    background: issue.upvotedBy?.includes(JSON.parse(localStorage.getItem("user") || "{}").email) ? "#D1FAE5" : "#F0F4FA",
                    color: issue.upvotedBy?.includes(JSON.parse(localStorage.getItem("user") || "{}").email) ? "#059669" : "#8A9BBE",
                    cursor: "pointer",
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                  }}
                  disabled={issue.upvotedBy?.includes(JSON.parse(localStorage.getItem("user") || "{}").email)}
                >
                  👍 {issue.votes || 0}
                </button>
              </div>

              {/* Status */}
              <div className="w-28 flex-shrink-0 flex justify-end">
                <span
                  className="inline-block px-2.5 py-1 rounded-full text-xs font-medium"
                  style={{
                    background: issue.status === "Open" ? "#FEE2E2" : issue.status === "In Progress" ? "#FEF3C7" : "#D1FAE5",
                    color: issue.status === "Open" ? "#991B1B" : issue.status === "In Progress" ? "#92400E" : "#065F46",
                  }}
                >
                  {issue.status}
                </span>
              </div>

              {/* Blockchain */}
              <div className="w-32 flex-shrink-0 text-right">
                <p className="text-xs font-mono text-[#8A9BBE]">
                  {issue.txHash && issue.txHash !== "Pending" ? (
                    <a
                      href={`https://sepolia.etherscan.io/tx/${issue.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                      title={issue.txHash}
                    >
                      ⛓️ {issue.txHash.substring(0, 10)}...
                    </a>
                  ) : (
                    <span>⏳ Pending</span>
                  )}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>

    {/* Blockchain Strip */}
    <BlockchainStrip blockNumber="#22,847,391" txHash="0x7c4f…b2e9" />
  </div>
  );
}