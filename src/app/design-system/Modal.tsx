import React from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  footer?: React.ReactNode;
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-xl",
};

export function Modal({ open, onClose, title, subtitle, children, size = "md", footer }: ModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#071A35]/50 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className={`relative w-full ${sizeClasses[size]} bg-white rounded-2xl shadow-2xl overflow-hidden`}
        style={{ boxShadow: "0 20px 60px -10px rgba(7,26,53,0.30), 0 8px 20px -8px rgba(7,26,53,0.15)" }}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-[#E2EAF4]">
          <div>
            <h3 className="text-[#0B2447]" style={{ fontWeight: 700, fontSize: "1rem" }}>
              {title}
            </h3>
            {subtitle && (
              <p className="text-[#8A9BBE] mt-0.5" style={{ fontSize: "0.75rem" }}>
                {subtitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F0F4FA] flex items-center justify-center hover:bg-[#E2EAF4] transition-colors flex-shrink-0 ml-4"
          >
            <X className="w-4 h-4 text-[#4B5E78]" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="px-6 pb-5">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Info Row (used inside modals) ───────────────────────────────────────────
interface InfoRowProps {
  label: string;
  value: React.ReactNode;
}

export function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-[#F0F4FA] last:border-0">
      <span className="text-[#8A9BBE]" style={{ fontSize: "0.8125rem" }}>
        {label}
      </span>
      <span className="text-[#0B2447]" style={{ fontWeight: 500, fontSize: "0.8125rem" }}>
        {value}
      </span>
    </div>
  );
}

// ─── Info Panel (bg surface for modal content) ────────────────────────────────
export function InfoPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#F4F7FB] rounded-xl p-4 space-y-0.5 border border-[#E2EAF4]">
      {children}
    </div>
  );
}
