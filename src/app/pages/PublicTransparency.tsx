import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid,
} from "recharts";
import { TrendingDown, Award, MapPin } from "lucide-react";
import {
  Card, CardHeader, KpiCard,
  PageHeader,
  Table, THead, TBody, TRow, TCell, TableFooter,
  Tag,
  colors,
} from "../design-system";

const fundData = [
  { month: "Sep", allocated: 42, released: 29 },
  { month: "Oct", allocated: 58, released: 45 },
  { month: "Nov", allocated: 61, released: 53 },
  { month: "Dec", allocated: 77, released: 64 },
  { month: "Jan", allocated: 85, released: 72 },
  { month: "Feb", allocated: 94, released: 81 },
  { month: "Mar", allocated: 62, released: 41 },
];

const resolutionData = [
  { month: "Sep", avgDays: 15.8 },
  { month: "Oct", avgDays: 13.4 },
  { month: "Nov", avgDays: 11.9 },
  { month: "Dec", avgDays: 10.6 },
  { month: "Jan", avgDays: 9.1 },
  { month: "Feb", avgDays: 7.9 },
  { month: "Mar", avgDays: 7.2 },
];

const categoryBreakdown = [
  { name: "Pothole",     value: 41, color: "#F97316" },
  { name: "Garbage",     value: 28, color: "#EF4444" },
  { name: "Streetlight", value: 18, color: "#EAB308" },
  { name: "Water Issue", value: 13, color: "#19A7CE" },
];

const zoneData = [
  { zone: "Zone 1 – T. Nagar",     issues: 187, resolved: 174, fund: "₹68.4 L", resTime: "5.8d", score: 97 },
  { zone: "Zone 2 – Anna Nagar",   issues: 152, resolved: 139, fund: "₹55.2 L", resTime: "6.5d", score: 93 },
  { zone: "Zone 3 – Adyar",        issues: 134, resolved: 118, fund: "₹48.0 L", resTime: "7.9d", score: 88 },
  { zone: "Zone 4 – Mylapore",     issues: 98,  resolved: 82,  fund: "₹35.5 L", resTime: "9.2d", score: 84 },
  { zone: "Zone 5 – Velachery",    issues: 211, resolved: 170, fund: "₹91.3 L", resTime: "10.4d", score: 81 },
  { zone: "Zone 7 – Guindy",       issues: 143, resolved: 105, fund: "₹52.1 L", resTime: "12.0d", score: 76 },
  { zone: "Zone 8 – Chromepet",    issues: 119, resolved: 80,  fund: "₹38.7 L", resTime: "13.8d", score: 70 },
  { zone: "Zone 9 – Perambur",     issues: 96,  resolved: 58,  fund: "₹27.3 L", resTime: "15.1d", score: 63 },
];

const issueLocations = [
  { x: 42, y: 28, label: "T. Nagar",     category: "Pothole",     status: "Resolved",    color: colors.success },
  { x: 62, y: 20, label: "Anna Nagar",   category: "Streetlight", status: "Resolved",    color: colors.success },
  { x: 52, y: 62, label: "Adyar",        category: "Water Issue", status: "In Progress", color: colors.warning },
  { x: 68, y: 55, label: "Mylapore",     category: "Garbage",     status: "Open",        color: colors.danger },
  { x: 75, y: 72, label: "Velachery",    category: "Pothole",     status: "In Progress", color: colors.warning },
  { x: 28, y: 45, label: "Anna Nagar W", category: "Garbage",     status: "Open",        color: colors.danger },
  { x: 55, y: 40, label: "Guindy",       category: "Streetlight", status: "Resolved",    color: colors.success },
  { x: 82, y: 40, label: "Tambaram",     category: "Pothole",     status: "Open",        color: colors.danger },
];

const scoreStyle = (s: number) =>
  s >= 90 ? "bg-emerald-100 text-emerald-700" :
  s >= 80 ? "bg-blue-100 text-blue-700" :
  s >= 70 ? "bg-amber-100 text-amber-700" :
  "bg-red-100 text-red-700";

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

export function PublicTransparency() {
  const totalIssues   = zoneData.reduce((s, z) => s + z.issues, 0);
  const totalResolved = zoneData.reduce((s, z) => s + z.resolved, 0);
  const resRate       = Math.round((totalResolved / totalIssues) * 100);

  return (
    <div className="p-8 space-y-7">
      <PageHeader
        title="Public Transparency Dashboard"
        subtitle="Open data on Chennai civic fund usage and issue resolution. All records are on-chain and publicly verifiable."
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

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <KpiCard label="Total Issues"       value={totalIssues.toLocaleString()} sub="Across all zones"        valueColor={colors.navy} />
        <KpiCard label="Resolved"           value={totalResolved.toLocaleString()} sub="Successfully closed"  valueColor={colors.success} />
        <KpiCard label="Total Funds Allocated" value="₹4.17 Cr" sub="To date this year"                       valueColor={colors.teal} />
        <KpiCard label="Avg Resolution"     value="7.6 Days"    sub="-52% vs. 2 years ago"                     valueColor="#7C3AED" />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-3 gap-5">
        {/* Fund Utilization */}
        <Card padding="none" className="col-span-2">
          <CardHeader
            title="Fund Utilization"
            subtitle="Allocated vs Released (₹ in Lakhs)"
            action={
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#0B2447]" /><span className="text-[#8A9BBE]" style={{ fontSize: "0.6875rem" }}>Allocated</span></div>
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#19A7CE]" /><span className="text-[#8A9BBE]" style={{ fontSize: "0.6875rem" }}>Released</span></div>
              </div>
            }
          />
          <div className="px-6 pb-6 pt-2">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={fundData} barSize={11} barGap={3}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F4F7FB" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#8A9BBE" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#8A9BBE" }} unit="L" />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="allocated" name="Allocated" fill="#0B2447" radius={[4, 4, 0, 0]} />
                <Bar dataKey="released"  name="Released"  fill="#19A7CE" radius={[4, 4, 0, 0]} />
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
                <Pie data={categoryBreakdown} cx="50%" cy="50%" innerRadius={42} outerRadius={68} paddingAngle={3} dataKey="value">
                  {categoryBreakdown.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip formatter={(v) => [`${v}%`, ""]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-1">
              {categoryBreakdown.map((c) => (
                <div key={c.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: c.color }} />
                    <span className="text-[#4B5E78]" style={{ fontSize: "0.75rem" }}>{c.name}</span>
                  </div>
                  <span className="text-[#0B2447]" style={{ fontWeight: 700, fontSize: "0.75rem" }}>{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-3 gap-5">
        {/* Resolution Line */}
        <Card padding="none" className="col-span-2">
          <CardHeader
            title="Avg Issue Resolution Time"
            subtitle="Monthly trend — days from report to closure"
            action={
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: "#D1FAE5" }}>
                <TrendingDown className="w-3.5 h-3.5" style={{ color: colors.success }} />
                <span style={{ color: "#059669", fontSize: "0.75rem", fontWeight: 600 }}>Improving</span>
              </div>
            }
          />
          <div className="px-6 pb-6 pt-2">
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={resolutionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F4F7FB" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#8A9BBE" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#8A9BBE" }} unit="d" domain={[4, 20]} />
                <Tooltip formatter={(v) => [`${v} days`, "Avg Resolution"]} />
                <Line type="monotone" dataKey="avgDays" stroke="#19A7CE" strokeWidth={2.5}
                  dot={{ fill: "#19A7CE", r: 4, strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: "#0B2447" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Map */}
        <Card padding="none">
          <CardHeader title="Issue Heatmap" subtitle="Chennai zone map" />
          <div className="px-4 pb-4">
            <div className="relative rounded-xl overflow-hidden" style={{ height: 200, background: "#E8F4FD" }}>
              {/* Grid */}
              <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                {[20,40,60,80].map((v) => (
                  <g key={v}>
                    <line x1={v} y1="0" x2={v} y2="100" stroke="#19A7CE" strokeWidth="0.5" />
                    <line x1="0" y1={v} x2="100" y2={v} stroke="#19A7CE" strokeWidth="0.5" />
                  </g>
                ))}
              </svg>
              {/* Chennai coastline shape */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M15 92 Q18 75 14 55 Q20 30 30 18 Q45 8 65 12 Q80 16 85 32 Q88 50 80 72 Q68 90 48 94 Q30 96 15 92Z" fill="#C8E6F5" stroke="#A0CBE8" strokeWidth="0.5" />
                {/* Bay of Bengal indicator */}
                <path d="M80 20 Q92 35 90 58 Q85 78 75 88" fill="none" stroke="#A0CBE8" strokeWidth="0.8" strokeDasharray="3,2" />
              </svg>
              {/* Pins */}
              {issueLocations.map((loc, i) => (
                <div
                  key={i}
                  className="absolute flex flex-col items-center group"
                  style={{ left: `${loc.x}%`, top: `${loc.y}%`, transform: "translate(-50%,-100%)" }}
                >
                  <div
                    className="w-3.5 h-3.5 rounded-full border-2 border-white shadow-md cursor-pointer"
                    style={{ background: loc.color }}
                    title={`${loc.label}: ${loc.category} (${loc.status})`}
                  />
                  <div className="w-0.5 h-1.5 opacity-60" style={{ background: loc.color }} />
                  <div className="absolute bottom-full mb-1 hidden group-hover:block bg-[#0B2447] text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap z-10 shadow-lg">
                    {loc.label}: {loc.category}
                  </div>
                </div>
              ))}
              {/* Legend */}
              <div className="absolute bottom-2 left-2 flex items-center gap-2 rounded-lg px-2 py-1" style={{ background: "rgba(255,255,255,0.85)" }}>
                {[{ c: colors.success, l: "Resolved" }, { c: colors.warning, l: "Progress" }, { c: colors.danger, l: "Open" }].map((leg) => (
                  <div key={leg.l} className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full" style={{ background: leg.c }} />
                    <span className="text-[#4B5E78]" style={{ fontSize: "0.5625rem" }}>{leg.l}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-[#8A9BBE] mt-2 flex items-center gap-1" style={{ fontSize: "0.6875rem" }}>
              <MapPin className="w-3 h-3" />{issueLocations.length} active zones tracked
            </p>
          </div>
        </Card>
      </div>

      {/* Zone Leaderboard */}
      <Table>
        <THead columns={["Rank", "Zone", "Issues", "Resolved", "Fund Allocated", "Avg Res. Time", "Score"]} />
        <TBody>
          {zoneData.map((z, i) => (
            <TRow key={z.zone}>
              <TCell>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
                    i === 0 ? "bg-yellow-100 text-yellow-700" :
                    i === 1 ? "bg-gray-100 text-gray-600" :
                    i === 2 ? "bg-orange-100 text-orange-700" :
                    "bg-[#F0F4FA] text-[#8A9BBE]"
                  }`}
                  style={{ fontWeight: 700 }}
                >
                  {i + 1}
                </div>
              </TCell>
              <TCell><span style={{ fontWeight: 500 }}>{z.zone}</span></TCell>
              <TCell><span style={{ fontWeight: 700 }}>{z.issues}</span></TCell>
              <TCell>
                <span style={{ color: colors.success, fontWeight: 700 }}>{z.resolved}</span>
                <span className="text-[#8A9BBE] ml-1" style={{ fontSize: "0.75rem" }}>
                  ({Math.round((z.resolved / z.issues) * 100)}%)
                </span>
              </TCell>
              <TCell><span style={{ fontWeight: 700 }}>{z.fund}</span></TCell>
              <TCell muted>{z.resTime}</TCell>
              <TCell>
                <span className={`px-3 py-1 rounded-full text-sm ${scoreStyle(z.score)}`} style={{ fontWeight: 700 }}>
                  {z.score}
                </span>
              </TCell>
            </TRow>
          ))}
        </TBody>
        <TableFooter
          left={
            <div className="flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-[#19A7CE]" />
              Zone Performance Leaderboard — Ranked by Accountability Score
            </div>
          }
          right="⛓️ All data verified and immutably logged on-chain"
        />
      </Table>
    </div>
  );
}
