import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { registerAccount } from "../api/auth";
import { getApiErrorMessage } from "../api/client";
import { useAuth } from "../auth/AuthContext";
import ladyJusticeImg from "../assets/lady_justice.png";

function IconScale(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3v18M6 7.5h12M4 14l3-6.5 3 6.5M14 14l3-6.5 3 6.5M3 14h8M13 14h8M7 17.5a3.5 3.5 0 007 0M17 17.5a3.5 3.5 0 007 0" />
    </svg>
  );
}

export default function RegisterPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

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

    if (form.password !== form.confirmPassword) {
      setError("The passwords do not match.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setSubmitting(true);
    try {
      await registerAccount({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      navigate("/login", { replace: true, state: { registered: true } });
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Could not create the account."));
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
          to="/login"
          className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-bronze-900/80 border border-gold-500/40 text-parchment-100 text-xs font-semibold hover:border-gold-400 hover:text-white transition-all backdrop-blur-sm shadow-md"
        >
          <span>Sign In</span>
        </Link>
      </header>

      {/* ── 3. Centered Translucent 3D Glassmorphism Account Creation Card ── */}
      <div className="relative z-10 w-full max-w-md my-auto py-6">
        <div className="relative rounded-2xl bg-white/75 backdrop-blur-xl p-8 sm:p-10 border border-gold-400/50 shadow-[0_25px_70px_-15px_rgba(28,22,18,0.85)] transform-gpu transition-all duration-300 hover:shadow-[0_30px_90px_-15px_rgba(163,131,66,0.35)]">
          {/* Top Gold 3D Trim Line */}
          <div className="absolute top-0 inset-x-8 h-1 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 rounded-t-full shadow-[0_2px_8px_rgba(163,131,66,0.6)]" />

          <div className="mb-6 text-center space-y-1">
            <span className="section-label text-gold-700 font-serif-heading text-xs font-bold uppercase tracking-widest">
              Get Started
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif-heading text-bronze-900 tracking-tight">
              Create your account
            </h1>
            <p className="text-xs text-bronze-700 font-medium leading-relaxed">
              Begin organizing your legal case with citation-grounded assistance.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-bronze-900 mb-1 font-serif-heading">
                Full name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                autoComplete="name"
                value={form.fullName}
                onChange={updateField}
                className="form-input min-h-[44px] bg-white/85 border-stoneborder focus:border-gold-500 focus:bg-white shadow-inner font-medium"
                placeholder="e.g. Ramesh Kumar"
              />
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-bronze-900 mb-1 font-serif-heading">
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
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-bronze-900 mb-1 font-serif-heading">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="new-password"
                value={form.password}
                onChange={updateField}
                className="form-input min-h-[44px] bg-white/85 border-stoneborder focus:border-gold-500 focus:bg-white shadow-inner font-medium"
                placeholder="Minimum 8 characters"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-xs font-bold uppercase tracking-wider text-bronze-900 mb-1 font-serif-heading">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                autoComplete="new-password"
                value={form.confirmPassword}
                onChange={updateField}
                className="form-input min-h-[44px] bg-white/85 border-stoneborder focus:border-gold-500 focus:bg-white shadow-inner font-medium"
                placeholder="Re-enter password"
              />
            </div>

            {/* Error Alert */}
            {error && (
              <div role="alert" className="rounded-lg border border-red-300 bg-red-50/90 p-3 text-xs text-red-800 flex items-start gap-2 shadow-sm">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full py-3.5 text-xs font-bold uppercase tracking-wider shadow-[0_4px_14px_rgba(44,36,29,0.35)] hover:shadow-[0_6px_20px_rgba(44,36,29,0.45)] transition-all mt-2"
            >
              {submitting ? "Creating account..." : "Create account"}
            </button>
          </form>

          {/* Login link */}
          <div className="mt-6 pt-5 border-t border-stoneborder/80 text-center text-xs text-bronze-800 font-medium">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-gold-800 hover:text-gold-950 transition-colors underline"
            >
              Sign in instead
            </Link>
          </div>
        </div>
      </div>

      {/* ── 4. Bottom Footer Disclaimer ── */}
      <footer className="relative z-10 w-full max-w-6xl text-center py-2 text-[11px] text-parchment-200 drop-shadow">
        Nyaya AI provides legal information and evidence organization grounded in verified Indian law.
      </footer>
    </main>
  );
}