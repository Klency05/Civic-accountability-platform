import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  badge?: React.ReactNode;
}

export function PageHeader({ title, subtitle, actions, badge }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        <div className="flex items-center gap-3">
          <h2
            className="text-[#0B2447]"
            style={{ fontWeight: 700, fontSize: "1.375rem", lineHeight: "1.3" }}
          >
            {title}
          </h2>
          {badge && <div>{badge}</div>}
        </div>
        {subtitle && (
          <p className="text-[#4B5E78] mt-1.5" style={{ fontSize: "0.875rem" }}>
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-3 flex-shrink-0">{actions}</div>}
    </div>
  );
}

// ─── Section Label ────────────────────────────────────────────────────────────
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[#8A9BBE] uppercase"
      style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.07em" }}
    >
      {children}
    </p>
  );
}

// ─── Divider ──────────────────────────────────────────────────────────────────
export function Divider({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-px bg-[#E2EAF4]" />
      {label && (
        <span className="text-[#8A9BBE] flex-shrink-0" style={{ fontSize: "0.75rem" }}>
          {label}
        </span>
      )}
      <div className="flex-1 h-px bg-[#E2EAF4]" />
    </div>
  );
}

// ─── Live Indicator ───────────────────────────────────────────────────────────
export function LiveBadge({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-xl border border-[#E2EAF4] shadow-sm">
      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      <span className="text-[#4B5E78]" style={{ fontSize: "0.8125rem" }}>
        {label}
      </span>
    </div>
  );
}
