import { useState } from "react";
import {
  AlertTriangle, IndianRupee, Clock, TrendingUp,
  Search, Check, Trash2, Plus, Eye, Download,
} from "lucide-react";
import {
  colors, typography, radius, shadows,
  Button, IconButton,
  StatusBadge, CategoryBadge, PriorityBadge, Tag, BlockchainTag,
  StatCard, KpiCard, Card, CardHeader,
  Input, Textarea, Select, SearchInput,
  Modal, InfoRow, InfoPanel,
  PageHeader, SectionLabel, Divider, LiveBadge,
  Table, THead, TBody, TRow, TCell, TableFooter,
  BlockchainStrip, ChainTag,
} from "../design-system";

const sampleRows = [
  { id: "CIV-1024", category: "Pothole", loc: "Anna Salai, Zone 1", status: "In Progress" as const, fund: "₹1.2 L" },
  { id: "CIV-1023", category: "Garbage", loc: "T. Nagar Market, Zone 2", status: "Open" as const, fund: "₹45,000" },
  { id: "CIV-1022", category: "Streetlight", loc: "Adyar Signal, Zone 3", status: "Resolved" as const, fund: "₹80,000" },
];

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="space-y-5">
      <div className="pb-4 border-b border-[#E2EAF4]">
        <h2 className="text-[#0B2447]" style={{ fontWeight: 700, fontSize: "1.125rem" }}>{title}</h2>
        {subtitle && <p className="text-[#8A9BBE] mt-1" style={{ fontSize: "0.8125rem" }}>{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

function Swatch({ name, hex, textLight = false }: { name: string; hex: string; textLight?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className="h-14 rounded-xl border border-black/10 shadow-sm"
        style={{ background: hex }}
      />
      <p className="text-[#0B2447]" style={{ fontWeight: 500, fontSize: "0.75rem" }}>{name}</p>
      <p className="text-[#8A9BBE] font-mono" style={{ fontSize: "0.6875rem" }}>{hex}</p>
    </div>
  );
}

export function DesignSystemPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="p-8 space-y-12 max-w-5xl">
      <PageHeader
        title="Design System"
        subtitle="CivicChain — Chennai Smart City · Component library, tokens, and usage guidelines."
        badge={<LiveBadge label="v1.0 · Live" />}
      />

      {/* ── COLOR PALETTE ─────────────────────────────────────────────────── */}
      <Section title="Color Palette" subtitle="All brand colors are defined in design-system/tokens.ts">
        <div className="space-y-5">
          <div>
            <SectionLabel>Brand — Navy</SectionLabel>
            <div className="grid grid-cols-4 gap-3 mt-3">
              <Swatch name="Navy Deep" hex={colors.navyDeep} />
              <Swatch name="Navy" hex={colors.navy} />
              <Swatch name="Navy Mid" hex={colors.navyMid} />
              <Swatch name="Navy Light" hex={colors.navyLight} />
            </div>
          </div>
          <div>
            <SectionLabel>Brand — Teal</SectionLabel>
            <div className="grid grid-cols-4 gap-3 mt-3">
              <Swatch name="Teal" hex={colors.teal} />
              <Swatch name="Teal Mid" hex={colors.tealMid} />
              <Swatch name="Teal Light" hex={colors.tealLight} />
              <Swatch name="Teal Pale" hex={colors.tealPale} />
            </div>
          </div>
          <div>
            <SectionLabel>Neutrals</SectionLabel>
            <div className="grid grid-cols-5 gap-3 mt-3">
              <Swatch name="Page BG" hex={colors.bgPage} />
              <Swatch name="Surface" hex={colors.bgSurface} />
              <Swatch name="Muted BG" hex={colors.bgMuted} />
              <Swatch name="Border" hex={colors.border} />
              <Swatch name="Input BG" hex={colors.bgInput} />
            </div>
          </div>
          <div>
            <SectionLabel>Semantic</SectionLabel>
            <div className="grid grid-cols-4 gap-3 mt-3">
              <Swatch name="Success" hex={colors.success} />
              <Swatch name="Warning" hex={colors.warning} />
              <Swatch name="Danger" hex={colors.danger} />
              <Swatch name="Info" hex={colors.info} />
            </div>
          </div>
        </div>
      </Section>

      {/* ── TYPOGRAPHY ────────────────────────────────────────────────────── */}
      <Section title="Typography" subtitle="Inter font family with a structured size and weight scale.">
        <Card padding="lg">
          <div className="space-y-5">
            {[
              { label: "3XL — 30px / Bold", size: "1.875rem", weight: 700, sample: "Chennai Smart City" },
              { label: "2XL — 24px / Bold", size: "1.5rem",   weight: 700, sample: "Home Dashboard" },
              { label: "XL — 20px / SemiBold", size: "1.25rem", weight: 600, sample: "Section Heading" },
              { label: "LG — 18px / SemiBold", size: "1.125rem",weight: 600, sample: "Card Title" },
              { label: "MD — 16px / Medium",   size: "1rem",   weight: 500, sample: "Subheading or Label" },
              { label: "Base — 14px / Regular",size: "0.875rem",weight: 400, sample: "Body text, table cells, paragraph content." },
              { label: "SM — 13px / Regular",  size: "0.8125rem",weight:400, sample: "Secondary info, table data, hints." },
              { label: "XS — 12px / Medium",   size: "0.75rem", weight: 500, sample: "BADGE · CAPTION · TIMESTAMP · LABEL" },
            ].map((t) => (
              <div key={t.label} className="flex items-baseline gap-6">
                <div className="w-52 flex-shrink-0">
                  <p className="text-[#8A9BBE]" style={{ fontSize: "0.6875rem", fontWeight: 600 }}>{t.label}</p>
                </div>
                <p className="text-[#0B2447]" style={{ fontSize: t.size, fontWeight: t.weight }}>
                  {t.sample}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      {/* ── BUTTONS ───────────────────────────────────────────────────────── */}
      <Section title="Buttons" subtitle="Six variants × four sizes. Use primary for main CTAs, teal for interactive accents.">
        <Card padding="lg">
          <div className="space-y-6">
            <div>
              <SectionLabel>Variants</SectionLabel>
              <div className="flex flex-wrap gap-3 mt-3">
                <Button variant="primary">Primary</Button>
                <Button variant="teal">Teal</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
              </div>
            </div>
            <Divider />
            <div>
              <SectionLabel>Sizes</SectionLabel>
              <div className="flex items-center flex-wrap gap-3 mt-3">
                <Button size="xs">Extra Small</Button>
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>
            <Divider />
            <div>
              <SectionLabel>With Icons</SectionLabel>
              <div className="flex flex-wrap gap-3 mt-3">
                <Button icon={<Plus className="w-4 h-4" />}>Add Issue</Button>
                <Button variant="teal" icon={<Check className="w-4 h-4" />}>Confirm</Button>
                <Button variant="outline" icon={<Download className="w-4 h-4" />} iconPosition="right">Export</Button>
                <Button variant="danger" icon={<Trash2 className="w-4 h-4" />}>Delete</Button>
                <Button loading>Submitting…</Button>
              </div>
            </div>
            <Divider />
            <div>
              <SectionLabel>Icon Buttons</SectionLabel>
              <div className="flex gap-2 mt-3">
                <IconButton label="View"><Eye className="w-4 h-4" /></IconButton>
                <IconButton variant="ghost" label="Search"><Search className="w-4 h-4" /></IconButton>
                <IconButton variant="danger" label="Delete"><Trash2 className="w-4 h-4" /></IconButton>
              </div>
            </div>
          </div>
        </Card>
      </Section>

      {/* ── BADGES ────────────────────────────────────────────────────────── */}
      <Section title="Badges & Tags" subtitle="Semantic status, category, and priority indicators.">
        <Card padding="lg">
          <div className="space-y-5">
            <div>
              <SectionLabel>Status</SectionLabel>
              <div className="flex flex-wrap gap-2 mt-3">
                <StatusBadge status="Open" />
                <StatusBadge status="In Progress" />
                <StatusBadge status="Resolved" />
                <StatusBadge status="Open" size="md" />
                <StatusBadge status="In Progress" dot={false} />
              </div>
            </div>
            <Divider />
            <div>
              <SectionLabel>Category</SectionLabel>
              <div className="flex flex-wrap gap-2 mt-3">
                <CategoryBadge category="Pothole" showEmoji />
                <CategoryBadge category="Garbage" showEmoji />
                <CategoryBadge category="Streetlight" showEmoji />
                <CategoryBadge category="Water Issue" showEmoji />
              </div>
            </div>
            <Divider />
            <div>
              <SectionLabel>Priority & Tags</SectionLabel>
              <div className="flex flex-wrap gap-3 mt-3 items-center">
                <PriorityBadge priority="High" />
                <PriorityBadge priority="Medium" />
                <PriorityBadge priority="Low" />
                <Tag label="Zone 5 – Velachery" bg="#EFF6FF" color="#1D4ED8" border="#BFDBFE" />
                <BlockchainTag hash="0x4a2f…e8b1" />
                <ChainTag hash="0x7c4f…b2e9" />
              </div>
            </div>
          </div>
        </Card>
      </Section>

      {/* ── CARDS ─────────────────────────────────────────────────────────── */}
      <Section title="Cards" subtitle="StatCard for KPIs, KpiCard for compact metrics, Card for content containers.">
        <div className="grid grid-cols-4 gap-4">
          <StatCard
            label="Total Issues Reported"
            value="1,847"
            change="+12% this month"
            changeType="positive"
            icon={<AlertTriangle className="w-5 h-5" />}
            iconBg="#FFF7ED"
            iconColor="#C2410C"
          />
          <StatCard
            label="Funds Allocated"
            value="₹6.2 Cr"
            change="+₹0.8 Cr this week"
            changeType="positive"
            icon={<IndianRupee className="w-5 h-5" />}
            iconBg="#EFF6FF"
            iconColor="#1D4ED8"
          />
          <StatCard
            label="Funds Released"
            value="₹4.1 Cr"
            change="66% utilization"
            changeType="neutral"
            icon={<TrendingUp className="w-5 h-5" />}
            iconBg="#D1FAE5"
            iconColor="#059669"
          />
          <StatCard
            label="Avg Resolution"
            value="7.6 Days"
            change="-1.8 days vs last month"
            changeType="negative"
            icon={<Clock className="w-5 h-5" />}
            iconBg="#F3E8FF"
            iconColor="#7C3AED"
          />
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <KpiCard label="Open Issues" value="312" sub="Awaiting assignment" valueColor="#EF4444" />
          <KpiCard label="Resolved" value="1,402" sub="Successfully closed" valueColor="#059669" />
          <KpiCard label="Avg Fund / Issue" value="₹33,591" sub="Per resolved issue" valueColor="#19A7CE" />
        </div>
        <Card padding="none" className="mt-4">
          <CardHeader
            title="Card with Header"
            subtitle="Example of a content card with title, subtitle and action"
            action={<Button size="sm" variant="outline">View All →</Button>}
          />
          <div className="px-6 py-5 text-[#4B5E78]" style={{ fontSize: "0.875rem" }}>
            Content area of the card goes here.
          </div>
        </Card>
      </Section>

      {/* ── FORM CONTROLS ─────────────────────────────────────────────────── */}
      <Section title="Form Controls" subtitle="Inputs, selects, and textareas with label, hint, and error states.">
        <Card padding="lg">
          <div className="grid grid-cols-2 gap-5">
            <Input label="Issue Title" placeholder="e.g. Pothole on Anna Salai" required />
            <Input label="Location" placeholder="Street address or landmark" prefixIcon={<Search className="w-4 h-4" />} />
            <Input label="Fund Amount" placeholder="Enter amount" prefix="₹" hint="Will be logged on blockchain." />
            <Input label="With Error" placeholder="e.g. CIV-1024" error="Issue ID already exists." />
            <Select
              label="Category"
              required
              placeholder="Select category"
              options={[
                { value: "pothole", label: "🕳️ Pothole" },
                { value: "garbage", label: "🗑️ Garbage" },
                { value: "streetlight", label: "💡 Streetlight" },
                { value: "water", label: "💧 Water Issue" },
              ]}
            />
            <SearchInput
              placeholder="Search issues, IDs, locations…"
              icon={<Search className="w-4 h-4" />}
            />
            <div className="col-span-2">
              <Textarea
                label="Description"
                placeholder="Describe the issue in detail…"
                rows={3}
                required
                showCount
                maxLen={500}
                value="Sample description text for the issue being reported."
              />
            </div>
          </div>
        </Card>
      </Section>

      {/* ── TABLE ─────────────────────────────────────────────────────────── */}
      <Section title="Data Table" subtitle="Fully composed from THead, TBody, TRow, TCell, TableFooter primitives.">
        <Table>
          <THead columns={["Issue ID", "Category", "Location", "Status", "Fund"]} />
          <TBody>
            {sampleRows.map((row) => (
              <TRow key={row.id}>
                <TCell><span style={{ fontWeight: 600 }}>{row.id}</span></TCell>
                <TCell><CategoryBadge category={row.category as any} showEmoji /></TCell>
                <TCell muted>{row.loc}</TCell>
                <TCell><StatusBadge status={row.status} /></TCell>
                <TCell><span style={{ fontWeight: 600 }}>{row.fund}</span></TCell>
              </TRow>
            ))}
          </TBody>
          <TableFooter
            left={`Showing ${sampleRows.length} records`}
            right="All secured on blockchain"
          />
        </Table>
      </Section>

      {/* ── MODAL ─────────────────────────────────────────────────────────── */}
      <Section title="Modal" subtitle="Used for fund allocation, issue details, and confirmations.">
        <Card padding="lg">
          <div className="flex gap-3">
            <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
          </div>
        </Card>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Issue Details"
          subtitle="CIV-1024 · Submitted Mar 1, 2026"
          footer={
            <div className="flex gap-3">
              <Button variant="secondary" fullWidth onClick={() => setModalOpen(false)}>
                Close
              </Button>
              <Button variant="teal" fullWidth>
                <Check className="w-4 h-4" />
                Confirm & Log on Chain
              </Button>
            </div>
          }
        >
          <InfoPanel>
            <InfoRow label="Issue ID" value="CIV-1024" />
            <InfoRow label="Category" value={<CategoryBadge category="Pothole" showEmoji />} />
            <InfoRow label="Status" value={<StatusBadge status="In Progress" />} />
            <InfoRow label="Location" value="Anna Salai, Zone 1 – T. Nagar" />
            <InfoRow label="Tx Hash" value={<ChainTag hash="0x4a2f…e8b1" />} />
          </InfoPanel>
        </Modal>
      </Section>

      {/* ── BLOCKCHAIN STRIP ──────────────────────────────────────────────── */}
      <Section title="Blockchain Strip" subtitle="Full-width status component displayed at the bottom of dashboard pages.">
        <BlockchainStrip blockNumber="#22,847,391" txHash="0x7c4f…b2e9" />
      </Section>
    </div>
  );
}
