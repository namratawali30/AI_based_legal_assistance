import { useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useFocusTrap } from "../hooks/useFocusTrap";

// ─────────────────────────────────────────────
// Bespoke SVG Icons for Legal Navigation
// ─────────────────────────────────────────────

function IconGrid(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function IconChat(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  );
}

function IconDocument(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
    </svg>
  );
}

function IconShield(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2l7 3v5c0 5-3.5 9.74-7 11C8.5 19.74 5 15 5 10V5l7-3z" />
    </svg>
  );
}

function IconLogout(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
    </svg>
  );
}

function IconMenu(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function IconClose(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function IconScale(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3v18M6 7.5h12M4 14l3-6.5 3 6.5M14 14l3-6.5 3 6.5M3 14h8M13 14h8M7 17.5a3.5 3.5 0 007 0M17 17.5a3.5 3.5 0 007 0" />
    </svg>
  );
}

// ─────────────────────────────────────────────
// Nav items config
// ─────────────────────────────────────────────

const NAV_ITEMS = [
  { to: "/",          end: true,  label: "Dashboard",     Icon: IconGrid     },
  { to: "/chat",      end: false, label: "Legal Chat",    Icon: IconChat     },
  { to: "/complaints",end: false, label: "Complaints",    Icon: IconDocument },
  { to: "/evidence",  end: false, label: "Evidence Vault",Icon: IconShield   },
];

// ─────────────────────────────────────────────
// Sidebar Content
// ─────────────────────────────────────────────

function SidebarContent({ user, logout, onNavClick }) {
  return (
    <div className="flex h-full flex-col bg-bronze-900 text-parchment-100 border-r border-bronze-800">
      {/* Brand Header */}
      <div className="px-5 pt-6 pb-5 border-b border-bronze-800">
        <Link to="/landing" onClick={onNavClick} className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-600/20 border border-gold-500/40 text-gold-400 flex-shrink-0 group-hover:border-gold-400 transition-colors">
            <IconScale className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="text-base font-bold text-white tracking-wide font-serif-heading">
              Nyaya AI
            </p>
            <p className="text-xs text-gold-400 font-medium tracking-wider uppercase font-serif-heading">
              Legal Assistance
            </p>
          </div>
        </Link>
      </div>

      {/* Primary Navigation */}
      <nav aria-label="Main Navigation" className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <p className="px-3.5 mb-2 text-[10px] font-bold uppercase tracking-widest text-gold-500 font-serif-heading">
          Workspace Navigation
        </p>
        {NAV_ITEMS.map(({ to, end, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavClick}
            className={({ isActive }) =>
              [
                "nav-item focus-ring",
                isActive ? "nav-item-active" : "nav-item-inactive",
              ].join(" ")
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={[
                    "flex h-7 w-7 items-center justify-center rounded-md flex-shrink-0 transition-colors",
                    isActive
                      ? "bg-gold-500/20 text-gold-300"
                      : "text-bronze-400",
                  ].join(" ")}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className={isActive ? "text-white font-semibold" : "text-bronze-300"}>
                  {label}
                </span>
                {isActive && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-gold-400 flex-shrink-0" aria-hidden="true" />
                )}
              </>
            )}
          </NavLink>
        ))}

        {/* Informational & Legal Links */}
        <div className="pt-6 mt-6 border-t border-bronze-800/80 px-1 space-y-1">
          <p className="px-2 mb-2 text-[10px] font-bold uppercase tracking-widest text-bronze-400 font-serif-heading">
            Resources & Policies
          </p>
          <Link
            to="/landing"
            onClick={onNavClick}
            className="flex items-center gap-2.5 px-3 py-2 text-xs text-bronze-300 hover:text-gold-400 rounded-md transition-colors"
          >
            <span>🌐 Platform Overview</span>
          </Link>
          <Link
            to="/privacy"
            onClick={onNavClick}
            className="flex items-center gap-2.5 px-3 py-2 text-xs text-bronze-300 hover:text-gold-400 rounded-md transition-colors"
          >
            <span>🔒 Privacy Policy</span>
          </Link>
          <Link
            to="/terms"
            onClick={onNavClick}
            className="flex items-center gap-2.5 px-3 py-2 text-xs text-bronze-300 hover:text-gold-400 rounded-md transition-colors"
          >
            <span>⚖️ Terms & Conditions</span>
          </Link>
        </div>
      </nav>

      {/* Authenticated User Footer Profile */}
      <div className="border-t border-bronze-800 px-3 py-4 bg-bronze-950/40">
        <div className="flex items-center gap-3 px-2 mb-3">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-md flex-shrink-0 text-xs font-bold text-white bg-gold-700 border border-gold-500/50"
            aria-hidden="true"
          >
            {user?.full_name?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-parchment-100">{user?.full_name}</p>
            <p className="truncate text-xs text-bronze-400">{user?.email}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={logout}
          className="nav-item nav-item-inactive w-full text-red-300 hover:text-red-200 hover:bg-red-950/30 border border-transparent hover:border-red-900/40 min-h-[44px]"
          aria-label="Sign out of account"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md text-red-400 flex-shrink-0">
            <IconLogout className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="font-semibold text-xs">Sign out</span>
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// AppLayout Component
// ─────────────────────────────────────────────

export default function AppLayout() {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerRef = useFocusTrap(mobileOpen, () => setMobileOpen(false));

  return (
    <div className="min-h-screen bg-parchment-100 lg:flex">
      {/* Skip Link for Keyboard Accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* ── Desktop sidebar ── */}
      <aside
        aria-label="Sidebar Navigation"
        className="hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col"
        style={{ width: "var(--sidebar-width)" }}
      >
        <SidebarContent user={user} logout={logout} />
      </aside>

      {/* ── Mobile top bar ── */}
      <header className="bg-bronze-900 text-white sticky top-0 z-40 flex items-center justify-between px-4 py-3 lg:hidden border-b border-bronze-800">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gold-600/30 border border-gold-500/40 text-gold-400">
            <IconScale className="h-4 w-4 text-gold-400" aria-hidden="true" />
          </div>
          <span className="text-base font-bold font-serif-heading text-white">
            Nyaya AI
          </span>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="rounded-lg p-2 text-bronze-300 hover:text-white hover:bg-bronze-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Open main menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation-drawer"
        >
          <IconMenu className="h-6 w-6" aria-hidden="true" />
        </button>
      </header>

      {/* ── Mobile drawer overlay ── */}
      {mobileOpen && (
        <div
          id="mobile-navigation-drawer"
          className="fixed inset-0 z-50 lg:hidden"
          aria-modal="true"
          role="dialog"
          aria-label="Mobile Navigation Menu"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-bronze-950/70 backdrop-blur-sm animate-fade-in"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <div
            ref={drawerRef}
            tabIndex={-1}
            className="absolute inset-y-0 left-0 outline-none"
            style={{ width: "var(--sidebar-width)" }}
          >
            <div className="flex items-center justify-between px-5 pt-5 pb-4 bg-bronze-900 text-white border-b border-bronze-800">
              <span className="text-base font-bold font-serif-heading text-white">
                Nyaya AI
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg p-2 text-bronze-300 hover:text-white hover:bg-bronze-800 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Close navigation menu"
              >
                <IconClose className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <SidebarContent
              user={user}
              logout={logout}
              onNavClick={() => setMobileOpen(false)}
            />
          </div>
        </div>
      )}

      {/* ── Main content area ── */}
      <main
        id="main-content"
        tabIndex={-1}
        className="min-w-0 flex-1 lg:ml-[var(--sidebar-width)] outline-none"
      >
        <Outlet />
      </main>
    </div>
  );
}