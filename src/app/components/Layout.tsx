import { Outlet, NavLink, useLocation } from "react-router";
import {
  LayoutDashboard,
  AlertTriangle,
  ShieldCheck,
  BarChart3,
  Bell,
  User,
  ChevronRight,
  Landmark,
  Palette,
} from "lucide-react";

const navItems = [
  { label: "Home Dashboard",       icon: LayoutDashboard, path: "/" },
  { label: "Report Issue",         icon: AlertTriangle,   path: "/report" },
  { label: "Admin Dashboard",      icon: ShieldCheck,     path: "/admin" },
  { label: "Public Transparency",  icon: BarChart3,       path: "/transparency" },
  { label: "Design System",        icon: Palette,         path: "/design-system" },
];

export function Layout() {
  const location = useLocation();

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ background: "#EEF2F9" }}>
      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside
        className="w-64 flex-shrink-0 flex flex-col z-10"
        style={{
          background: "linear-gradient(180deg, #071A35 0%, #0B2447 60%, #0D2C56 100%)",
          boxShadow: "4px 0 24px rgba(7,26,53,0.25)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #19A7CE, #0E8FAF)" }}
          >
            <Landmark className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white" style={{ fontWeight: 700, fontSize: "0.9375rem", lineHeight: "1.2" }}>
              CivicChain
            </p>
            <p className="text-[#7EB8D8]" style={{ fontSize: "0.6875rem", lineHeight: "1.3" }}>
              Accountability Platform
            </p>
          </div>
        </div>

        {/* City label */}
        <div className="px-5 pt-5 pb-2">
          <p className="text-[#7EB8D8] uppercase" style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em" }}>
            Active City
          </p>
          <p className="text-white mt-0.5" style={{ fontWeight: 600, fontSize: "0.8125rem" }}>
            🌊 Chennai Corporation
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map((item) => {
            const isActive =
              item.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.path);
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-150 group"
                style={{
                  background: isActive ? "#19A7CE" : "transparent",
                  color: isActive ? "#fff" : "#A8C5DA",
                  boxShadow: isActive ? "0 4px 14px rgba(25,167,206,0.35)" : "none",
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
              >
                <item.icon className="w-4.5 h-4.5 flex-shrink-0" style={{ width: 18, height: 18 }} />
                <span className="text-sm flex-1" style={{ fontWeight: isActive ? 600 : 400 }}>
                  {item.label}
                </span>
                {isActive && <ChevronRight style={{ width: 14, height: 14, opacity: 0.7 }} />}
              </NavLink>
            );
          })}
        </nav>

        {/* Blockchain Badge */}
        <div className="mx-3 mb-5 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400" style={{ fontWeight: 600, fontSize: "0.6875rem" }}>
              Blockchain Active
            </span>
          </div>
          <p className="text-[#7EB8D8]" style={{ fontSize: "0.6875rem", lineHeight: "1.5" }}>
            Ethereum Sepolia · Block #22,847,391
          </p>
        </div>
      </aside>

      {/* ── Main area ───────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header
          className="flex items-center justify-between px-8 py-3.5 flex-shrink-0"
          style={{
            background: "#fff",
            borderBottom: "1px solid #E2EAF4",
            boxShadow: "0 1px 8px rgba(11,36,71,0.06)",
          }}
        >
          <div>
            <h1 className="text-[#0B2447]" style={{ fontWeight: 700, fontSize: "1.0625rem" }}>
              🌊 Greater Chennai Corporation
            </h1>
            <p className="text-[#8A9BBE] mt-0.5" style={{ fontSize: "0.6875rem" }}>
              Civic Accountability & Blockchain Fund Management Portal
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search hint */}
            <div
              className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer"
              style={{ background: "#F0F4FA", color: "#8A9BBE", fontSize: "0.8125rem" }}
            >
              <span>Search…</span>
              <kbd
                className="rounded px-1.5"
                style={{ background: "#E2EAF4", fontSize: "0.6875rem", fontFamily: "monospace", color: "#4B5E78" }}
              >
                ⌘K
              </kbd>
            </div>

            {/* Notification */}
            <button
              className="relative w-9 h-9 rounded-full flex items-center justify-center transition-colors"
              style={{ background: "#F0F4FA" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#E2EAF4"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#F0F4FA"; }}
            >
              <Bell className="w-4 h-4 text-[#0B2447]" />
              <span
                className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500"
                style={{ border: "1.5px solid #fff" }}
              />
            </button>

            {/* Profile */}
            <div
              className="flex items-center gap-2.5 pl-3"
              style={{ borderLeft: "1px solid #E2EAF4" }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #19A7CE, #0B2447)" }}
              >
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="text-[#0B2447]" style={{ fontWeight: 600, fontSize: "0.8125rem", lineHeight: "1.2" }}>
                  Senthilkumar R.
                </p>
                <p className="text-[#8A9BBE]" style={{ fontSize: "0.6875rem", lineHeight: "1.3" }}>
                  Zone Ward Officer
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
