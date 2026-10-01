import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import ladyJusticeImg from "../assets/lady_justice.png";

// Bespoke SVG Icons for Feature Cards
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

function IconScale(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3v18M6 7.5h12M4 14l3-6.5 3 6.5M14 14l3-6.5 3 6.5M3 14h8M13 14h8M7 17.5a3.5 3.5 0 007 0M17 17.5a3.5 3.5 0 007 0" />
    </svg>
  );
}

const FEATURES = [
  {
    to: "/chat",
    label: "Legal Chat",
    title: "Citation-Grounded Chat",
    desc: "Inquire about your rights with RAG answers backed by verified Indian statutes, single follow-ups, and citation sources.",
    icon: IconChat,
    badge: "Citation RAG",
  },
  {
    to: "/complaints",
    label: "Complaints",
    title: "Draft Formal Complaint",
    desc: "Build, edit, and finalize structured legal complaints with evidence grounding, exported directly to PDF and DOCX.",
    icon: IconDocument,
    badge: "PDF & DOCX Export",
  },
  {
    to: "/evidence",
    label: "Evidence Vault",
    title: "Cryptographic Vault",
    desc: "Upload documents, audio, and media secured with SHA-256 fingerprinting and immutability locking.",
    icon: IconShield,
    badge: "SHA-256 Verified",
  },
];

export default function DashboardPage() {
  const { user } = useAuth();

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="min-h-full bg-parchment-mesh px-4 py-8 sm:px-8 lg:px-12 font-sans text-bronze-900">
      <div className="mx-auto max-w-6xl space-y-8">

        {/* ── Executive Legal Command Center Banner ── */}
        <div className="card bg-bronze-900 text-parchment-100 border-gold-500/40 p-6 sm:p-8 relative overflow-hidden shadow-bespoke">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-gold-600/20 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-widest font-serif-heading">
                <IconScale className="w-3.5 h-3.5" />
                {greeting}, {user?.full_name?.split(" ")[0] || "Advocate"}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold font-serif-heading text-white tracking-tight">
                Indian Legal Guidance & Case Command Center
              </h1>

              <p className="text-sm text-parchment-300 leading-relaxed max-w-2xl">
                Your citation-grounded workspace is active. Access RAG legal assistance, prepare formal complaints, analyze case readiness, and manage cryptographic evidence vaults across Indian legal domains.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link to="/chat" className="btn-gold text-xs font-bold uppercase tracking-wider py-2.5 px-4">
                  Start Legal Chat
                </Link>
                <Link to="/complaints" className="btn-secondary text-xs font-bold py-2.5 px-4 text-bronze-900 bg-parchment-200">
                  New Complaint Draft
                </Link>
              </div>
            </div>

            {/* Lady Justice Asset Highlight */}
            <div className="lg:col-span-4 hidden lg:block">
              <div className="rounded-lg overflow-hidden border border-gold-500/30 bg-bronze-950 shadow-md">
                <div className="aspect-[4/3] w-full relative">
                  <img
                    src={ladyJusticeImg}
                    alt="Lady Justice statue symbolizing equity and grounded law"
                    className="w-full h-full object-cover object-center"
                    width="400"
                    height="300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bronze-900 via-transparent to-transparent opacity-70" />
                  <div className="absolute bottom-2 left-3 right-3 text-[11px] font-serif-heading text-gold-300">
                    Justitia & Equity — Verified RAG
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Feature Cards Grid ── */}
        <div>
          <span className="section-label">Core Capabilities</span>
          <h2 className="text-xl font-bold font-serif-heading text-bronze-900 mt-1 mb-4">
            Workspace Assistance Modules
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ to, label, title, desc, icon: Icon, badge }, i) => (
              <Link
                key={to}
                to={to}
                className="card card-lift p-6 space-y-4 bg-white border-stoneborder hover:border-gold-500/70 transition-all duration-200 block group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-bronze-900 text-gold-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-1 rounded bg-parchment-200 text-bronze-800 text-[10px] font-bold uppercase tracking-wider font-serif-heading border border-stoneborder">
                    {badge}
                  </span>
                </div>

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gold-600 font-serif-heading">
                    {label}
                  </p>
                  <h3 className="text-lg font-bold font-serif-heading text-bronze-900 mt-0.5">
                    {title}
                  </h3>
                  <p className="text-xs text-bronze-700 leading-relaxed mt-1.5">
                    {desc}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-gold-700 group-hover:text-gold-900 group-hover:gap-2 transition-all">
                  <span>Open Module</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Statutory Disclaimer Banner ── */}
        <div className="card p-5 bg-gold-50/80 border-gold-300 text-gold-950 flex items-start gap-3.5">
          <div className="p-2 rounded bg-gold-500/20 text-gold-700 flex-shrink-0 mt-0.5">
            <IconScale className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider font-serif-heading text-gold-900">
              Statutory Information Disclaimer
            </h4>
            <p className="text-xs text-gold-900 leading-relaxed">
              Nyaya AI provides citation-grounded statutory explanations, evidence organization, and draft complaints. It does NOT provide guaranteed legal representation or act as a licensed advocate. Always consult a licensed legal professional for court representation.
            </p>
          </div>
        </div>

        {/* ── Workflow Methodology ── */}
        <div className="card p-6 bg-white border-stoneborder space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider font-serif-heading text-bronze-900">
            Case Builder Workflow
          </h3>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-bronze-700">
            <li className="p-3 rounded-lg bg-parchment-100 border border-stoneborder space-y-1">
              <span className="font-bold text-gold-700 block font-serif-heading">1. Legal Chat & RAG</span>
              Ask about statutory rights under Indian law and receive grounded explanations with citations.
            </li>
            <li className="p-3 rounded-lg bg-parchment-100 border border-stoneborder space-y-1">
              <span className="font-bold text-gold-700 block font-serif-heading">2. Evidence Vault</span>
              Upload supporting documents, contracts, receipts, and audio secured with SHA-256 integrity hashes.
            </li>
            <li className="p-3 rounded-lg bg-parchment-100 border border-stoneborder space-y-1">
              <span className="font-bold text-gold-700 block font-serif-heading">3. Formal Exports</span>
              Evaluate case readiness score, generate formal complaints, and export PDF/DOCX Lawyer Handoff Packs.
            </li>
          </ol>
        </div>

      </div>
    </div>
  );
}