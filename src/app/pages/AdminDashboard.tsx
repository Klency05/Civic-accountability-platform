import { useEffect, useState } from "react";
import { Search, Filter, IndianRupee, CheckCircle2, Eye } from "lucide-react";
import {
  Button, IconButton,
  StatusBadge, CategoryBadge,
  Card, KpiCard,
  Input,
  Modal, InfoRow, InfoPanel,
  PageHeader,
  Table, THead, TBody, TRow, TCell, TableEmpty, TableFooter,
  ChainTag,
  colors,
} from "../design-system";

type IssueStatus = "Open" | "In Progress" | "Resolved";

type Issue = {
  id: string; category: string; title: string; location: string;
  status: IssueStatus; fund: number; date: string; reporter: string; txHash: string;
};



function fmtFund(n: number) {
  if (n === 0) return "—";
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

export function AdminDashboard() {
  console.log("✅ AdminDashboard mounted");
  const [issues, setIssues] = useState<Issue[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [allocAmount, setAllocAmount] = useState("");
  const [modalType, setModalType] = useState<"allocate" | "view" | null>(null);
  useEffect(() => {
  fetch("http://localhost:5000/issues")
    .then((res) => res.json())
    .then((data) => {
      setIssues(data);
    })
    .catch((err) => console.error("Error fetching issues:", err));
}, []);
  const filtered = issues.filter((i) => {
    const matchSearch =
      i.id.toLowerCase().includes(search.toLowerCase()) ||
      i.title.toLowerCase().includes(search.toLowerCase()) ||
      i.location.toLowerCase().includes(search.toLowerCase()) ||
      i.category.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || i.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const updateStatus = async (id: string, status: IssueStatus) => {
  await fetch(`http://localhost:5000/issues/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  // Refresh data
  fetch("http://localhost:5000/issues")
    .then((res) => res.json())
    .then((data) => setIssues(data));
};
  const allocateFund = async () => {
  if (!selectedIssue || !allocAmount) return;

  const amt = parseInt(allocAmount, 10);
  if (isNaN(amt)) return;

  await fetch(`http://localhost:5000/issues/${selectedIssue.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fund: amt }),
  });

  // Refresh data
  fetch("http://localhost:5000/issues")
    .then((res) => res.json())
    .then((data) => setIssues(data));

  closeModal();
};

  const closeModal = () => { setModalType(null); setSelectedIssue(null); setAllocAmount(""); };

  const totalFunds = issues.reduce((s, i) => s + i.fund, 0);
  const openCount = issues.filter((i) => i.status === "Open").length;
  const resolvedCount = issues.filter((i) => i.status === "Resolved").length;
  const inProgressCount = issues.filter((i) => i.status === "In Progress").length;

  return (
    <div className="p-8 space-y-6">
      <PageHeader
        title="Admin Dashboard"
        subtitle="Manage Chennai civic issues, allocate funds, and update resolution statuses."
        actions={
          <Button variant="teal" size="sm">
            <IndianRupee className="w-4 h-4" />
            Export Report
          </Button>
        }
      />

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <KpiCard label="Open Issues"    value={String(openCount)}        sub="Awaiting action"         valueColor={colors.danger} />
        <KpiCard label="In Progress"    value={String(inProgressCount)}  sub="Actively being addressed" valueColor={colors.warning} />
        <KpiCard label="Resolved"       value={String(resolvedCount)}    sub="Successfully closed"      valueColor={colors.success} />
        <KpiCard label="Total Allocated" value={fmtFund(totalFunds)}     sub="Across all issues"        valueColor={colors.teal} />
      </div>

      {/* Search + Filters */}
      <Card padding="md" className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A9BBE]" />
          <input
            type="text"
            placeholder="Search by ID, title, category, location…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none text-[#0B2447] border border-transparent focus:border-[#19A7CE] transition-colors"
            style={{ background: colors.bgInput, fontSize: "0.875rem" }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#8A9BBE]" />
          {["All", "Open", "In Progress", "Resolved"].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className="px-3 py-2 rounded-xl text-sm transition-all"
              style={{
                background: filterStatus === s ? colors.navy : colors.bgInput,
                color: filterStatus === s ? "#fff" : colors.textSecondary,
                fontWeight: filterStatus === s ? 600 : 400,
                fontSize: "0.8125rem",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </Card>

      {/* Table */}
      <Table>
        <THead columns={["Issue ID", "Category", "Title & Location", "Status", "Fund", "Reporter", "Actions"]} />
        <TBody>
          {filtered.length === 0 ? (
            <TableEmpty message="No issues found matching your search or filter." />
          ) : (
            filtered.map((issue) => (
              <TRow key={issue.id}>
                <TCell><span style={{ fontWeight: 700 }}>{issue.id}</span></TCell>
                <TCell><CategoryBadge category={issue.category as any} showEmoji /></TCell>
                <TCell className="max-w-xs">
                  <p className="truncate" style={{ fontWeight: 500, fontSize: "0.8125rem", color: colors.textPrimary }}>{issue.title}</p>
                  <p style={{ fontSize: "0.75rem", color: colors.textMuted, marginTop: 2 }}>{issue.location}</p>
                </TCell>
                <TCell>
                  <select
                    value={issue.status}
                    onChange={(e) => updateStatus(issue.id, e.target.value as IssueStatus)}
                    className="rounded-full border-0 focus:outline-none cursor-pointer px-2.5 py-1"
                    style={{
                      background: issue.status === "Open" ? "#FEE2E2" : issue.status === "In Progress" ? "#FEF3C7" : "#D1FAE5",
                      color: issue.status === "Open" ? "#991B1B" : issue.status === "In Progress" ? "#92400E" : "#065F46",
                      fontWeight: 500,
                      fontSize: "0.75rem",
                    }}
                  >
                    <option value="Open">● Open</option>
                    <option value="In Progress">● In Progress</option>
                    <option value="Resolved">● Resolved</option>
                  </select>
                </TCell>
                <TCell>
                  {issue.fund > 0
                    ? <span style={{ fontWeight: 700 }}>{fmtFund(issue.fund)}</span>
                    : <span style={{ color: colors.textMuted, fontSize: "0.75rem" }}>Not allocated</span>
                  }
                </TCell>
                <TCell>
                  <p style={{ fontWeight: 500 }}>{issue.reporter}</p>
                  <p style={{ fontSize: "0.75rem", color: colors.textMuted }}>{issue.date}</p>
                </TCell>
                <TCell>
                  <div className="flex items-center gap-1.5">
                    <IconButton
                      size="sm"
                      label="View details"
                      onClick={() => { setSelectedIssue(issue); setModalType("view"); }}
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </IconButton>
                    <Button
                      size="xs"
                      variant="primary"
                      icon={<IndianRupee className="w-3 h-3" />}
                      onClick={() => { setSelectedIssue(issue); setAllocAmount(issue.fund > 0 ? String(issue.fund) : ""); setModalType("allocate"); }}
                    >
                      Allocate
                    </Button>
                  </div>
                </TCell>
              </TRow>
            ))
          )}
        </TBody>
        <TableFooter
          left={`Showing ${filtered.length} of ${issues.length} issues`}
          right="⛓️ All records secured on blockchain"
        />
      </Table>

      {/* View Modal */}
      <Modal
        open={modalType === "view" && !!selectedIssue}
        onClose={closeModal}
        title="Issue Details"
        subtitle={`${selectedIssue?.id} · Submitted ${selectedIssue?.date}`}
        footer={<Button variant="primary" fullWidth onClick={closeModal}>Close</Button>}
      >
        {selectedIssue && (
          <InfoPanel>
            <InfoRow label="Issue ID"  value={<span style={{ fontWeight: 700 }}>{selectedIssue.id}</span>} />
            <InfoRow label="Category"  value={<CategoryBadge category={selectedIssue.category as any} showEmoji />} />
            <InfoRow label="Title"     value={selectedIssue.title} />
            <InfoRow label="Location"  value={selectedIssue.location} />
            <InfoRow label="Status"    value={<StatusBadge status={selectedIssue.status} />} />
            <InfoRow label="Reporter"  value={selectedIssue.reporter} />
            <InfoRow label="Fund"      value={fmtFund(selectedIssue.fund)} />
            <InfoRow label="Tx Hash"   value={<ChainTag hash={selectedIssue.txHash} />} />
          </InfoPanel>
        )}
      </Modal>

      {/* Allocate Modal */}
      <Modal
        open={modalType === "allocate" && !!selectedIssue}
        onClose={closeModal}
        title="Allocate Fund"
        subtitle={`Assign budget for ${selectedIssue?.id}`}
        footer={
          <div className="flex gap-3">
            <Button variant="secondary" fullWidth onClick={closeModal}>Cancel</Button>
            <Button variant="teal" fullWidth onClick={allocateFund} icon={<CheckCircle2 className="w-4 h-4" />}>
              Confirm & Log on Chain
            </Button>
          </div>
        }
      >
        {selectedIssue && (
          <>
            <InfoPanel>
              <InfoRow label="Issue"    value={selectedIssue.title} />
              <InfoRow label="Location" value={selectedIssue.location} />
              <InfoRow label="Status"   value={<StatusBadge status={selectedIssue.status} />} />
            </InfoPanel>
            <Input
              label="Fund Amount (₹)"
              type="number"
              placeholder="Enter amount in rupees"
              prefix="₹"
              required
              value={allocAmount}
              onChange={(e) => setAllocAmount(e.target.value)}
              hint="This allocation will be permanently recorded as a blockchain transaction."
            />
          </>
        )}
      </Modal>
    </div>
  );
}
