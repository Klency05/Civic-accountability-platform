import React from "react";
import { ArrowUpRight, TrendingUp, TrendingDown } from "lucide-react";

// ─── Base Card ────────────────────────────────────────────────────────────────
interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg" | "none";
  hover?: boolean;
}

export function Card({ children, className = "", padding = "md", hover = false }: CardProps) {
  const paddings = { none: "", sm: "p-4", md: "p-5", lg: "p-6" };
  return (
    <div
      className={[
        "bg-white rounded-2xl border border-[#E2EAF4] shadow-sm",
        hover ? "hover:shadow-md transition-shadow duration-200 cursor-pointer" : "",
        paddings[padding],
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

// ─── Card Header ──────────────────────────────────────────────────────────────
interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

export function CardHeader({ title, subtitle, action, icon }: CardHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 py-5 border-b border-[#E2EAF4]">
      <div className="flex items-center gap-3">
        {icon && (
          <div className="w-8 h-8 rounded-lg bg-[#F0F4FA] flex items-center justify-center text-[#19A7CE]">
            {icon}
          </div>
        )}
        <div>
          <h3 className="text-[#0B2447]" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>
            {title}
          </h3>
          {subtitle && (
            <p className="text-[#8A9BBE] mt-0.5" style={{ fontSize: "0.75rem" }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: React.ReactNode;
  iconBg?: string;
  iconColor?: string;
}

export function StatCard({
  label,
  value,
  change,
  changeType = "positive",
  icon,
  iconBg = "#EFF6FF",
  iconColor = "#1D4ED8",
}: StatCardProps) {
  return (
    <Card hover>
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: iconBg, color: iconColor }}
        >
          {icon}
        </div>
        <ArrowUpRight className="w-4 h-4 text-[#C8D7ED]" />
      </div>
      <p
        className="text-[#0B2447]"
        style={{ fontWeight: 700, fontSize: "1.625rem", lineHeight: "1.1" }}
      >
        {value}
      </p>
      <p className="text-[#4B5E78] mt-1.5" style={{ fontSize: "0.8125rem" }}>
        {label}
      </p>
      {change && (
        <div className="mt-3 pt-3 border-t border-[#E2EAF4] flex items-center gap-1">
          {changeType === "positive" && <TrendingUp className="w-3 h-3 text-emerald-500" />}
          {changeType === "negative" && <TrendingDown className="w-3 h-3 text-red-500" />}
          <span
            className="text-xs"
            style={{
              fontWeight: 500,
              color:
                changeType === "positive"
                  ? "#059669"
                  : changeType === "negative"
                  ? "#DC2626"
                  : "#8A9BBE",
            }}
          >
            {change}
          </span>
        </div>
      )}
    </Card>
  );
}

// ─── KPI Card (compact) ───────────────────────────────────────────────────────
interface KpiCardProps {
  label: string;
  value: string;
  sub?: string;
  valueColor?: string;
}

export function KpiCard({ label, value, sub, valueColor = "#0B2447" }: KpiCardProps) {
  return (
    <Card padding="md">
      <p style={{ fontWeight: 700, fontSize: "1.5rem", color: valueColor, lineHeight: "1.2" }}>
        {value}
      </p>
      <p className="text-[#0B2447] mt-1" style={{ fontWeight: 500, fontSize: "0.8125rem" }}>
        {label}
      </p>
      {sub && (
        <p className="text-[#8A9BBE] mt-0.5" style={{ fontSize: "0.75rem" }}>
          {sub}
        </p>
      )}
    </Card>
  );
}
