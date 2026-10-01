import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { getApiErrorMessage } from "../api/client";
import ladyJusticeImg from "../assets/lady_justice.png";

function IconScale(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3v18M6 7.5h12M4 14l3-6.5 3 6.5M14 14l3-6.5 3 6.5M3 14h8M13 14h8M7 17.5a3.5 3.5 0 007 0M17 17.5a3.5 3.5 0 007 0" />
    </svg>
  );
}

export default function LoginPage() {
  const { login, isAuthenticated, sessionExpiredMessage, clearSessionExpiredMessage } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  function updateField(e) {
    const { name, value } = e.target;
    setForm((c) => ({ ...c, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    clearSessionExpiredMessage();
    setSubmitting(true);
    try {
      await login({ email: form.email.trim(), password: form.password });
      const destination = location.state?.from || "/";
      navigate(destination, { replace: true });
    } catch (err) {
      setError(getApiErrorMessage(err, "Could not sign in. Please check your credentials."));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="relative min-h-screen w-full flex flex-col justify-between items-center p-4 sm:p-6 lg:p-8 font-sans overflow-hidden bg-bronze-950 text-bronze-900">
      {/* ── 1. Full-Screen Justitia Background Image with Layered Overlay ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={ladyJusticeImg}
          alt="Lady Justice Justitia statue with scales of equity"
          className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-105 scale-105 transition-transform duration-1000 ease-out"
          loading="eager"
        />
        {/* Subtle Vignette & Darkening Overlay allowing Justitia to shine through */}
        <div className="absolute inset-0 bg-gradient-to-t from-bronze-950/80 via-bronze-950/30 to-bronze-950/60 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-radial from-transparent via-bronze-950/20 to-bronze-950/80" />
      </div>

      {/* ── 2. Top Header Brand Bar ── */}
      <header className="relative z-10 w-full max-w-6xl flex items-center justify-between py-2">
        <Link to="/landing" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-600/30 border border-gold-400/50 text-gold-400 shadow-[0_0_15px_rgba(163,131,66,0.3)] group-hover:border-gold-300 transition-colors">
            <IconScale className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xl font-bold font-serif-heading text-white tracking-wide block">
              Nyaya AI
            </span>
            <span className="text-[10px] font-bold text-gold-400 uppercase tracking-widest block font-serif-heading">
              Indian Legal Workspace
            </span>
          </div>
        </Link>

        <Link
          to="/landing"
          className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-bronze-900/80 border border-gold-500/40 text-parchment-100 text-xs font-semibold hover:border-gold-400 hover:text-white transition-all backdrop-blur-sm shadow-md"
        >
          <span>🌐 Platform Overview</span>
        </Link>
      </header>

      {/* ── 3. Centered Translucent 3D Glassmorphism Sign-In Card ── */}
      <div className="relative z-10 w-full max-w-md my-auto py-8">
        <div className="relative rounded-2xl bg-white/75 backdrop-blur-xl p-8 sm:p-10 border border-gold-400/50 shadow-[0_25px_70px_-15px_rgba(28,22,18,0.85)] transform-gpu transition-all duration-300 hover:shadow-[0_30px_90px_-15px_rgba(163,131,66,0.35)]">
          {/* Top Gold 3D Trim Line */}
          <div className="absolute top-0 inset-x-8 h-1 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 rounded-t-full shadow-[0_2px_8px_rgba(163,131,66,0.6)]" />

          <div className="mb-7 text-center space-y-1.5">
            <span className="section-label text-gold-700 font-serif-heading text-xs font-bold uppercase tracking-widest">
              Account Access
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif-heading text-bronze-900 tracking-tight">
              Sign in to your account
            </h1>
            <p className="text-xs text-bronze-700 font-medium leading-relaxed">
              Continue to your confidential legal assistance workspace.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-bronze-900 mb-1.5 font-serif-heading">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={updateField}
                className="form-input min-h-[44px] bg-white/85 border-stoneborder focus:border-gold-500 focus:bg-white shadow-inner font-medium"
                placeholder="you@example.com"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "login-error" : undefined}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-bronze-900 mb-1.5 font-serif-heading">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={form.password}
                  onChange={updateField}
                  className="form-input pr-10 min-h-[44px] bg-white/85 border-stoneborder focus:border-gold-500 focus:bg-white shadow-inner font-medium"
                  placeholder="Enter your password"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "login-error" : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-bronze-500 hover:text-bronze-800 transition-colors p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "👁️‍🗨️" : "👁️"}
                </button>
              </div>
            </div>

            {/* Session expired notice */}
            {sessionExpiredMessage && !error && (
              <div role="alert" className="rounded-lg border border-gold-300 bg-gold-50/90 p-3.5 text-xs text-gold-950 flex items-start gap-2 shadow-sm">
                <span>⚠️</span>
                <span>{sessionExpiredMessage}</span>
              </div>
            )}

            {/* Error */}
            {error && (
              <div id="login-error" role="alert" className="rounded-lg border border-red-300 bg-red-50/90 p-3.5 text-xs text-red-800 flex items-start gap-2 shadow-sm">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full py-3.5 text-xs font-bold uppercase tracking-wider shadow-[0_4px_14px_rgba(44,36,29,0.35)] hover:shadow-[0_6px_20px_rgba(44,36,29,0.45)] transition-all"
            >
              {submitting ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Registration link */}
          <div className="mt-6 pt-6 border-t border-stoneborder/80 text-center text-xs text-bronze-800 font-medium">
            New to Nyaya AI?{" "}
            <Link
              to="/register"
              className="font-bold text-gold-800 hover:text-gold-950 transition-colors underline"
            >
              Create your account
            </Link>
          </div>
        </div>
      </div>

      {/* ── 4. Bottom Footer Disclaimer ── */}
      <footer className="relative z-10 w-full max-w-6xl text-center py-2 text-[11px] text-parchment-200 drop-shadow">
        Nyaya AI provides legal information and evidence organization grounded in verified Indian law. Not formal legal representation.
      </footer>
    </main>
  );
}