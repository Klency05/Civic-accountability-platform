import React from "react";

// ─── Text Input ───────────────────────────────────────────────────────────────
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  prefixIcon?: React.ReactNode;
  prefix?: string;
  required?: boolean;
}

export function Input({
  label,
  hint,
  error,
  prefixIcon,
  prefix,
  required,
  className = "",
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-[#0B2447]"
          style={{ fontWeight: 600, fontSize: "0.8125rem" }}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {prefixIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#19A7CE] flex items-center">
            {prefixIcon}
          </span>
        )}
        {prefix && (
          <span
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#19A7CE]"
            style={{ fontWeight: 700 }}
          >
            {prefix}
          </span>
        )}
        <input
          id={inputId}
          {...props}
          className={[
            "w-full py-2.5 bg-[#F0F4FA] rounded-xl text-[#0B2447] transition-all duration-150",
            "border border-transparent focus:border-[#19A7CE] focus:outline-none focus:bg-white",
            "placeholder:text-[#8A9BBE]",
            error ? "border-red-400 bg-red-50" : "",
            prefixIcon || prefix ? "pl-9 pr-4" : "px-4",
            className,
          ].join(" ")}
          style={{ fontSize: "0.875rem" }}
        />
      </div>
      {error && (
        <p className="text-red-500" style={{ fontSize: "0.75rem" }}>
          {error}
        </p>
      )}
      {hint && !error && (
        <p className="text-[#8A9BBE]" style={{ fontSize: "0.75rem" }}>
          {hint}
        </p>
      )}
    </div>
  );
}

// ─── Textarea ─────────────────────────────────────────────────────────────────
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  showCount?: boolean;
  maxLen?: number;
}

export function Textarea({
  label,
  hint,
  error,
  required,
  showCount,
  maxLen,
  id,
  value,
  className = "",
  ...props
}: TextareaProps) {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");
  const charCount = typeof value === "string" ? value.length : 0;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={textareaId}
          className="text-[#0B2447]"
          style={{ fontWeight: 600, fontSize: "0.8125rem" }}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        value={value}
        {...props}
        className={[
          "w-full px-4 py-3 bg-[#F0F4FA] rounded-xl text-[#0B2447] transition-all duration-150 resize-none",
          "border border-transparent focus:border-[#19A7CE] focus:outline-none focus:bg-white",
          "placeholder:text-[#8A9BBE]",
          error ? "border-red-400 bg-red-50" : "",
          className,
        ].join(" ")}
        style={{ fontSize: "0.875rem" }}
      />
      <div className="flex items-center justify-between">
        <div>
          {error && <p className="text-red-500" style={{ fontSize: "0.75rem" }}>{error}</p>}
          {hint && !error && <p className="text-[#8A9BBE]" style={{ fontSize: "0.75rem" }}>{hint}</p>}
        </div>
        {showCount && maxLen && (
          <p className="text-[#8A9BBE]" style={{ fontSize: "0.75rem" }}>
            {charCount}/{maxLen}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Select ───────────────────────────────────────────────────────────────────
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
  options: { value: string; label: string }[];
}

export function Select({
  label,
  hint,
  error,
  required,
  placeholder,
  options,
  id,
  className = "",
  ...props
}: SelectProps) {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={selectId}
          className="text-[#0B2447]"
          style={{ fontWeight: 600, fontSize: "0.8125rem" }}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        id={selectId}
        {...props}
        className={[
          "w-full px-4 py-2.5 bg-[#F0F4FA] rounded-xl text-[#0B2447] transition-all duration-150 appearance-none",
          "border border-transparent focus:border-[#19A7CE] focus:outline-none focus:bg-white",
          error ? "border-red-400 bg-red-50" : "",
          className,
        ].join(" ")}
        style={{ fontSize: "0.875rem" }}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500" style={{ fontSize: "0.75rem" }}>{error}</p>}
      {hint && !error && <p className="text-[#8A9BBE]" style={{ fontSize: "0.75rem" }}>{hint}</p>}
    </div>
  );
}

// ─── Search Input ─────────────────────────────────────────────────────────────
interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export function SearchInput({ icon, className = "", ...props }: SearchInputProps) {
  return (
    <div className="relative">
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A9BBE]">
          {icon}
        </span>
      )}
      <input
        {...props}
        className={[
          "w-full py-2.5 pr-4 bg-[#F0F4FA] rounded-xl text-[#0B2447] transition-all",
          "border border-transparent focus:border-[#19A7CE] focus:outline-none",
          "placeholder:text-[#8A9BBE]",
          icon ? "pl-10" : "pl-4",
          className,
        ].join(" ")}
        style={{ fontSize: "0.875rem" }}
      />
    </div>
  );
}
