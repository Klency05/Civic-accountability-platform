import { statusStyles, categoryStyles, priorityStyles } from "./tokens";

// ─── Status Badge ────────────────────────────────────────────────────────────
type Status = "Open" | "In Progress" | "Resolved";

interface StatusBadgeProps {
  status: Status;
  dot?: boolean;
  size?: "sm" | "md";
}

export function StatusBadge({ status, dot = true, size = "sm" }: StatusBadgeProps) {
  const s = statusStyles[status];
  const padding = size === "sm" ? "px-2.5 py-0.5" : "px-3 py-1";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full ${padding}`}
      style={{
        background: s.bg,
        color: s.text,
        fontWeight: 500,
        fontSize: size === "sm" ? "0.75rem" : "0.8125rem",
        lineHeight: "1.5",
      }}
    >
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: s.dot }}
        />
      )}
      {status}
    </span>
  );
}

// ─── Category Badge ──────────────────────────────────────────────────────────
type Category = "Pothole" | "Garbage" | "Streetlight" | "Water Issue";

interface CategoryBadgeProps {
  category: Category;
  showEmoji?: boolean;
  size?: "sm" | "md";
}

export function CategoryBadge({ category, showEmoji = false, size = "sm" }: CategoryBadgeProps) {
  const s = categoryStyles[category];
  const padding = size === "sm" ? "px-2.5 py-0.5" : "px-3 py-1";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border ${padding}`}
      style={{
        background: s.bg,
        color: s.text,
        borderColor: s.border,
        fontWeight: 500,
        fontSize: size === "sm" ? "0.75rem" : "0.8125rem",
        lineHeight: "1.5",
      }}
    >
      {showEmoji && <span>{s.emoji}</span>}
      {category}
    </span>
  );
}

// ─── Priority Badge ──────────────────────────────────────────────────────────
type Priority = "High" | "Medium" | "Low";

interface PriorityBadgeProps {
  priority: Priority;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const s = priorityStyles[priority];
  return (
    <span
      className="inline-flex items-center gap-1 text-xs"
      style={{ color: s.color, fontWeight: 600 }}
    >
      ● {priority}
    </span>
  );
}

// ─── Generic Tag ─────────────────────────────────────────────────────────────
interface TagProps {
  label: string;
  color?: string;
  bg?: string;
  border?: string;
  dot?: string;
}

export function Tag({ label, color = "#4B5E78", bg = "#F0F4FA", border, dot }: TagProps) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs"
      style={{
        background: bg,
        color,
        border: border ? `1px solid ${border}` : "none",
        fontWeight: 500,
        lineHeight: "1.5",
      }}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: dot }} />}
      {label}
    </span>
  );
}

// ─── Blockchain Tag ───────────────────────────────────────────────────────────
export function BlockchainTag({ hash }: { hash: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-mono"
      style={{
        background: "#EFF6FF",
        color: "#1D4ED8",
        fontWeight: 500,
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
      {hash}
    </span>
  );
}
