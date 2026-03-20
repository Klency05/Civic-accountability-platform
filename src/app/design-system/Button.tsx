import React from "react";
import { colors, radius, shadows } from "./tokens";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "teal" | "outline";
type ButtonSize = "xs" | "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:   `bg-[#0B2447] text-white hover:bg-[#163A62] active:bg-[#071A35]`,
  teal:      `bg-[#19A7CE] text-white hover:bg-[#0E8FAF] active:bg-[#0B8DAD]`,
  secondary: `bg-[#F0F4FA] text-[#0B2447] hover:bg-[#E2EAF4] active:bg-[#D0DCF0]`,
  ghost:     `bg-transparent text-[#0B2447] hover:bg-[#F0F4FA] active:bg-[#E2EAF4]`,
  outline:   `bg-white border border-[#E2EAF4] text-[#0B2447] hover:border-[#19A7CE] hover:text-[#19A7CE]`,
  danger:    `bg-[#FEE2E2] text-[#991B1B] hover:bg-[#FECACA] active:bg-[#FCA5A5]`,
};

const sizeStyles: Record<ButtonSize, string> = {
  xs: "px-2.5 py-1.5 text-xs gap-1",
  sm: "px-3.5 py-2 text-sm gap-1.5",
  md: "px-5 py-2.5 text-sm gap-2",
  lg: "px-6 py-3.5 text-base gap-2.5",
};

export function Button({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  loading = false,
  fullWidth = false,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={[
        "inline-flex items-center justify-center rounded-xl transition-all duration-150",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#19A7CE]/50",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variantStyles[variant],
        sizeStyles[size],
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
      style={{ fontWeight: 600, lineHeight: "1.4" }}
    >
      {loading ? (
        <>
          <Spinner size={size} />
          {children && <span>{children}</span>}
        </>
      ) : (
        <>
          {icon && iconPosition === "left" && <span className="flex-shrink-0">{icon}</span>}
          {children && <span>{children}</span>}
          {icon && iconPosition === "right" && <span className="flex-shrink-0">{icon}</span>}
        </>
      )}
    </button>
  );
}

function Spinner({ size }: { size: ButtonSize }) {
  const dim = size === "xs" || size === "sm" ? "w-3 h-3" : "w-4 h-4";
  return (
    <svg className={`${dim} animate-spin`} viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

// ── Icon Button ────────────────────────────────────────────────────────────────
interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "danger";
  size?: "sm" | "md";
  label?: string;
}

export function IconButton({ variant = "default", size = "md", label, children, className = "", ...props }: IconButtonProps) {
  const base = "rounded-xl flex items-center justify-center transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#19A7CE]/50 disabled:opacity-50";
  const variants = {
    default: "bg-[#F0F4FA] text-[#4B5E78] hover:bg-[#E2EAF4] hover:text-[#0B2447]",
    ghost:   "bg-transparent text-[#4B5E78] hover:bg-[#F0F4FA] hover:text-[#0B2447]",
    danger:  "bg-[#FEE2E2] text-[#991B1B] hover:bg-[#FECACA]",
  };
  const sizes = { sm: "w-7 h-7", md: "w-9 h-9" };
  return (
    <button {...props} className={[base, variants[variant], sizes[size], className].join(" ")} title={label} aria-label={label}>
      {children}
    </button>
  );
}
