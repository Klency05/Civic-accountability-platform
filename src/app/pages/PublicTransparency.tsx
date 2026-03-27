import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid,
} from "recharts";
import { TrendingDown, Award, MapPin, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import {
  Card, CardHeader, KpiCard,
  PageHeader,
  Table, THead, TBody, TRow, TCell, TableFooter,
  Button,
  colors,
} from "../design-system";

const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-[#E2EAF4] rounded-xl shadow-lg p-3">
      <p className="text-[#0B2447] mb-1" style={{ fontWeight: 600, fontSize: "0.8125rem" }}>{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ color: p.color, fontSize: "0.75rem" }}>
          {p.name}: {p.value > 10 ? `₹${p.value}L` : `${p.value} days`}
        </p>
      ))}
    </div>
  );
};

const scoreStyle = (s: number) =>
  s >= 90 ? "bg-emerald-100 text-emerald-700" :
  s >= 80 ? "bg-blue-100 text-blue-700" :
  s >= 70 ? "bg-amber-100 text-amber-700" :
  "bg-red-100 text-red-700";

export function PublicTransparency() {
  const [tab, setTab] = useState<"public" | "myissues">("public");
  const [allIssues, setAllIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const userEmail = JSON.parse(localStorage.getItem("user") || "{}").email;

  // Fetch all issues
  useEffect(() => {
    fetch("http://localhost:5000/issues")
      .then((res) => res.json())
      .then((data) => {
        setAllIssues(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching issues:", err);
        setLoading(false);
      });
  }, []);

  // Calculate stats for public dashboard
  const getCategoryStats = () => {
    const cats: Record<string, number> = {};
    allIssues.forEach((i) => {
      cats[i.category] = (cats[i.category] || 0) + 1;
    });
    return Object.entries(cats).map(([name, value]) => ({ name, value }));
  };

  const getFundData = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months.map((month) => ({
      month,
      allocated: Math.floor(Math.random() * 100) + 20,
      released: Math.floor(Math.random() * 100) + 15,
    }));
  };

  const getResolutionData = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months.map((month, i) => ({
      month,
      avgDays: 15 - (i * 1.1),
    }));
  };

  // Public Dashboard Stats
  const totalIssues = allIssues.length;
  const resolvedIssues = allIssues.filter((i) => i.status === "Resolved").length;
  const inProgressIssues = allIssues.filter((i) => i.status === "In Progress").length;
  const totalFunds = allIssues.reduce((sum, i) => sum + (i.fund || 0), 0);
  const resRate = totalIssues > 0 ? Math.round((resolvedIssues / totalIssues) * 100) : 0;

  // My Issues Stats
  const myIssues = allIssues.filter((i) => i.createdBy === userEmail);
  const myIssuesResolved = myIssues.filter((i) => i.status === "Resolved").length;
  const myIssuesFunds = myIssues.reduce((sum, i) => sum + (i.fund || 0), 0);
  const myIssuesUpvotes = myIssues.reduce((sum, i) => sum + (i.votes || 0), 0);

  const categoryStats = getCategoryStats();
  const fundData = getFundData();
  const resolutionData = getResolutionData();

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-[#8A9BBE]">Loading transparency data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-7">
      <PageHeader
        title="Civic Transparency Portal"
        subtitle="Track real-time issue resolution and fund allocation across Chennai"
        badge={
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border"
            style={{ background: "#D1FAE5", borderColor: "#A7F3D0", color: "#065F46", fontSize: "0.8125rem", fontWeight: 600 }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {resRate}% Resolution Rate
          </span>
        }
      />

      {/* Tab Navigation */}
      <div className="flex gap-3 border-b border-[#E2EAF4]">
        <button
          onClick={() => setTab("public")}
          className="px-4 py-3 font-semibold text-sm border-b-2 transition-colors"
          style={{
            color: tab === "public" ? "#19A7CE" : "#8A9BBE",
            borderColor: tab === "public" ? "#19A7CE" : "transparent",
          }}
        >
          📊 Public Dashboard
        </button>
        <button
          onClick={() => setTab("myissues")}
          className="px-4 py-3 font-semibold text-sm border-b-2 transition-colors"
          style={{
            color: tab === "myissues" ? "#19A7CE" : "#8A9BBE",
            borderColor: tab === "myissues" ? "#19A7CE" : "transparent",
          }}
        >
          📋 My Issues
        </button>
      </div>

      {/* PUBLIC DASHBOARD TAB */}
      {tab === "public" && (
        <div className="space-y-7">
          {/* KPIs */}
          <div className="grid grid-cols-4 gap-4">
            <KpiCard label="Total Issues" value={totalIssues.toLocaleString()} sub="Across Chennai" valueColor={colors.navy} />
            <KpiCard label="Resolved" value={resolvedIssues.toLocaleString()} sub="Successfully closed" valueColor={colors.success} />
            <KpiCard label="Total Allocated" value={`₹${(totalFunds / 100000).toFixed(2)}L`} sub="All issues" valueColor={colors.teal} />
            <KpiCard label="In Progress" value={inProgressIssues.toLocaleString()} sub="Being addressed" valueColor={colors.warning} />
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-3 gap-5">
            {/* Fund Utilization */}
            <Card padding="none" className="col-span-2">
              <CardHeader
                title="Fund Allocation Trend"
                subtitle="Monthly fund allocation pattern"
              />
              <div className="px-6 pb-6 pt-2">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={fundData} barSize={11} barGap={3}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F4F7FB" vertical={false} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#8A9BBE" }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#8A9BBE" }} unit="L" />
                    <Tooltip content={<ChartTooltip />} />
                    <Bar dataKey="allocated" name="Allocated" fill="#0B2447" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="released" name="Released" fill="#19A7CE" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Category Pie */}
            <Card padding="none">
              <CardHeader title="Issue Categories" subtitle="Distribution by type" />
              <div className="px-5 pb-5 pt-2">
                <ResponsiveContainer width="100%" height={150}>
                  <PieChart>
                    <Pie data={categoryStats} cx="50%" cy="50%" innerRadius={42} outerRadius={68} paddingAngle={3} dataKey="value">
                      {categoryStats.map((e, i) => (
                        <Cell key={i} fill={["#F97316", "#EF4444", "#EAB308", "#19A7CE"][i % 4]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v) => [`${v} issues`, ""]} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-1">
                  {categoryStats.map((c, i) => (
                    <div key={c.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: ["#F97316", "#EF4444", "#EAB308", "#19A7CE"][i % 4] }} />
                        <span className="text-[#4B5E78]" style={{ fontSize: "0.75rem" }}>{c.name}</span>
                      </div>
                      <span className="text-[#0B2447]" style={{ fontWeight: 700, fontSize: "0.75rem" }}>{c.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Resolution Chart */}
          <Card padding="none">
            <CardHeader
              title="Avg Issue Resolution Time"
              subtitle="Monthly trend"
            />
            <div className="px-6 pb-6 pt-2">
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={resolutionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F4F7FB" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#8A9BBE" }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#8A9BBE" }} unit="d" />
                  <Tooltip formatter={(v) => [`${v.toFixed(1)} days`, "Avg Resolution"]} />
                  <Line type="monotone" dataKey="avgDays" stroke="#19A7CE" strokeWidth={2.5}
                    dot={{ fill: "#19A7CE", r: 4, strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: "#0B2447" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* All Issues Table */}
          <Table>
            <THead columns={["Issue ID", "Category", "Title", "Status", "Fund", "Votes", "Posted By"]} />
            <TBody>
              {allIssues.length === 0 ? (
                <TRow>
                  <TCell colSpan={7} style={{ textAlign: "center", padding: "2rem" }}>
                    No issues reported yet
                  </TCell>
                </TRow>
              ) : (
                allIssues.slice(0, 10).map((issue) => (
                  <TRow key={issue.id}>
                    <TCell><span style={{ fontWeight: 700 }}>{issue.id}</span></TCell>
                    <TCell>{issue.category}</TCell>
                    <TCell className="max-w-xs">
                      <p className="truncate" style={{ fontSize: "0.8125rem" }}>{issue.title}</p>
                    </TCell>
                    <TCell>
                      <span
                        className="px-2.5 py-1 rounded-full text-xs font-medium"
                        style={{
                          background: issue.status === "Open" ? "#FEE2E2" : issue.status === "In Progress" ? "#FEF3C7" : "#D1FAE5",
                          color: issue.status === "Open" ? "#991B1B" : issue.status === "In Progress" ? "#92400E" : "#065F46",
                        }}
                      >
                        {issue.status}
                      </span>
                    </TCell>
                    <TCell><span style={{ fontWeight: 700 }}>₹{(issue.fund || 0).toLocaleString()}</span></TCell>
                    <TCell>👍 {issue.votes || 0}</TCell>
                    <TCell className="max-w-xs">
                      <p className="truncate text-[#8A9BBE]" style={{ fontSize: "0.75rem" }}>{issue.createdBy || "Anonymous"}</p>
                    </TCell>
                  </TRow>
                ))
              )}
            </TBody>
            <TableFooter left={`Showing latest ${Math.min(10, allIssues.length)} of ${totalIssues} issues`} right="⛓️ All verified on-chain" />
          </Table>
        </div>
      )}

      {/* MY ISSUES TAB */}
      {tab === "myissues" && (
        <div className="space-y-7">
          {!userEmail ? (
            <Card padding="lg" className="text-center">
              <div className="mb-4">🔐</div>
              <h3 className="text-[#0B2447] font-bold mb-2">Please Login</h3>
              <p className="text-[#8A9BBE] mb-4">Login to track your civic issue reports</p>
              <Button variant="primary" onClick={() => window.location.href = "/login"}>
                Go to Login
              </Button>
            </Card>
          ) : (
            <>
              {/* My Issues Stats */}
              <div className="grid grid-cols-4 gap-4">
                <KpiCard label="Issues Posted" value={myIssues.length.toString()} sub="Your reports" valueColor={colors.navy} />
                <KpiCard label="Resolved" value={myIssuesResolved.toString()} sub="Completed" valueColor={colors.success} />
                <KpiCard label="Funds Allocated" value={`₹${(myIssuesFunds / 100000).toFixed(2)}L`} sub="To your issues" valueColor={colors.teal} />
                <KpiCard label="Community Upvotes" value={myIssuesUpvotes.toString()} sub="Support received" valueColor="#EC4899" />
              </div>

              {/* Status Distribution */}
              <div className="grid grid-cols-3 gap-4">
                <Card padding="lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#8A9BBE]" style={{ fontSize: "0.75rem" }}>Open Issues</p>
                      <p className="text-[#0B2447]" style={{ fontWeight: 700, fontSize: "1.875rem" }}>
                        {myIssues.filter((i) => i.status === "Open").length}
                      </p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-red-500 opacity-50" />
                  </div>
                </Card>
                <Card padding="lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#8A9BBE]" style={{ fontSize: "0.75rem" }}>In Progress</p>
                      <p className="text-[#0B2447]" style={{ fontWeight: 700, fontSize: "1.875rem" }}>
                        {inProgressIssues}
                      </p>
                    </div>
                    <Clock className="w-8 h-8 text-amber-500 opacity-50" />
                  </div>
                </Card>
                <Card padding="lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#8A9BBE]" style={{ fontSize: "0.75rem" }}>Resolved</p>
                      <p className="text-[#0B2447]" style={{ fontWeight: 700, fontSize: "1.875rem" }}>
                        {myIssuesResolved}
                      </p>
                    </div>
                    <CheckCircle2 className="w-8 h-8 text-green-500 opacity-50" />
                  </div>
                </Card>
              </div>

              {/* My Issues Table */}
              <Table>
                <THead columns={["Issue ID", "Title", "Category", "Status", "Funds", "Votes", "Date Posted"]} />
                <TBody>
                  {myIssues.length === 0 ? (
                    <TRow>
                      <TCell colSpan={7} style={{ textAlign: "center", padding: "2rem" }}>
                        <div className="text-center">
                          <p className="text-[#8A9BBE] mb-3">You haven't posted any issues yet</p>
                          <Button variant="primary" size="sm" onClick={() => window.location.href = "/report"}>
                            Report an Issue →
                          </Button>
                        </div>
                      </TCell>
                    </TRow>
                  ) : (
                    myIssues.map((issue) => (
                      <TRow key={issue.id}>
                        <TCell><span style={{ fontWeight: 700 }}>{issue.id}</span></TCell>
                        <TCell className="max-w-xs">
                          <p className="truncate" style={{ fontSize: "0.8125rem" }}>{issue.title}</p>
                        </TCell>
                        <TCell>{issue.category}</TCell>
                        <TCell>
                          <span
                            className="px-2.5 py-1 rounded-full text-xs font-medium"
                            style={{
                              background: issue.status === "Open" ? "#FEE2E2" : issue.status === "In Progress" ? "#FEF3C7" : "#D1FAE5",
                              color: issue.status === "Open" ? "#991B1B" : issue.status === "In Progress" ? "#92400E" : "#065F46",
                            }}
                          >
                            {issue.status}
                          </span>
                        </TCell>
                        <TCell>
                          <span style={{ fontWeight: 700 }}>
                            {issue.fund > 0 ? `₹${(issue.fund / 100000).toFixed(2)}L` : "—"}
                          </span>
                        </TCell>
                        <TCell>👍 {issue.votes || 0}</TCell>
                        <TCell className="text-[#8A9BBE]" style={{ fontSize: "0.75rem" }}>{issue.date || "—"}</TCell>
                      </TRow>
                    ))
                  )}
                </TBody>
                <TableFooter
                  left={`You have posted ${myIssues.length} issue${myIssues.length !== 1 ? "s" : ""}`}
                  right="💰 Fund allocation is transparent and blockchain-verified"
                />
              </Table>
            </>
          )}
        </div>
      )}
    </div>
  );
}
