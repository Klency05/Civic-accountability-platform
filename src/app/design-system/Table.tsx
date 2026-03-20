import React from "react";
import { AlertCircle } from "lucide-react";

// ─── Table Wrapper ────────────────────────────────────────────────────────────
export function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-[#E2EAF4] shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">{children}</table>
      </div>
    </div>
  );
}

// ─── Table Head ───────────────────────────────────────────────────────────────
export function THead({ columns }: { columns: string[] }) {
  return (
    <thead>
      <tr className="border-b border-[#E2EAF4] bg-[#F4F7FB]">
        {columns.map((col) => (
          <th
            key={col}
            className="px-5 py-3.5 text-left whitespace-nowrap text-[#8A9BBE]"
            style={{
              fontWeight: 700,
              fontSize: "0.6875rem",
              letterSpacing: "0.07em",
              textTransform: "uppercase",
            }}
          >
            {col}
          </th>
        ))}
      </tr>
    </thead>
  );
}

// ─── Table Body ───────────────────────────────────────────────────────────────
export function TBody({ children }: { children: React.ReactNode }) {
  return <tbody className="divide-y divide-[#F4F7FB]">{children}</tbody>;
}

// ─── Table Row ────────────────────────────────────────────────────────────────
interface TRowProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export function TRow({ children, onClick }: TRowProps) {
  return (
    <tr
      className={[
        "transition-colors",
        onClick ? "cursor-pointer hover:bg-[#F8FAFD]" : "hover:bg-[#F8FAFD]",
      ].join(" ")}
      onClick={onClick}
    >
      {children}
    </tr>
  );
}

// ─── Table Cell ───────────────────────────────────────────────────────────────
interface TCellProps {
  children: React.ReactNode;
  muted?: boolean;
  align?: "left" | "right" | "center";
  className?: string;
}

export function TCell({ children, muted = false, align = "left", className = "" }: TCellProps) {
  return (
    <td
      className={["px-5 py-4", className].join(" ")}
      style={{
        textAlign: align,
        color: muted ? "#8A9BBE" : "#0B2447",
        fontSize: "0.8125rem",
      }}
    >
      {children}
    </td>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
export function TableEmpty({ message = "No data found." }: { message?: string }) {
  return (
    <tr>
      <td colSpan={100} className="py-16 text-center">
        <AlertCircle className="w-8 h-8 text-[#C8D7ED] mx-auto mb-2" />
        <p className="text-[#8A9BBE]" style={{ fontSize: "0.875rem" }}>
          {message}
        </p>
      </td>
    </tr>
  );
}

// ─── Table Footer ─────────────────────────────────────────────────────────────
interface TableFooterProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export function TableFooter({ left, right }: TableFooterProps) {
  return (
    <div className="px-5 py-3 border-t border-[#E2EAF4] bg-[#F4F7FB] flex items-center justify-between">
      <div className="text-[#8A9BBE]" style={{ fontSize: "0.75rem" }}>{left}</div>
      <div className="text-[#8A9BBE]" style={{ fontSize: "0.75rem" }}>{right}</div>
    </div>
  );
}
