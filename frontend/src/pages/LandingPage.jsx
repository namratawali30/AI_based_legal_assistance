import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import ladyJusticeImg from "../assets/lady_justice.png";

// SVG Icon components
function IconScale(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3v18M6 7.5h12M4 14l3-6.5 3 6.5M14 14l3-6.5 3 6.5M3 14h8M13 14h8M7 17.5a3.5 3.5 0 007 0M17 17.5a3.5 3.5 0 007 0" />
    </svg>
  );
}

function IconShieldCheck(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function IconFileText(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
    </svg>
  );
}

function IconCheck(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

const STATUTORY_DOMAINS = [
  {
    title: "Consumer Rights",
    act: "Consumer Protection Act 2019",
    desc: "Defective goods, service deficiencies, misleading claims, and unfair trade practices before Consumer Disputes Redressal Commissions.",
    badge: "Consumer Law",
  },
  {
    title: "Labour & Workplace",
    act: "Industrial Disputes & Factories Acts",
    desc: "Unpaid wages, wrongful termination, statutory dues, severance claims, and formal labor commissioner complaints.",
    badge: "Employment",
  },
  {
    title: "Women's Safety & Rights",
    act: "POSH Act 2013 & Domestic Violence Act",
    desc: "Workplace sexual harassment remedies, Internal Complaints Committee (ICC) procedures, and emergency legal protection options.",
    badge: "Protection",
  },
  {
    title: "Educational Rights",
    act: "Right to Education Act & UGC Directives",
    desc: "Arbitrary fee hikes, degree withholding, admissions disputes, and institutional regulatory compliance matters.",
    badge: "Education",
  },
  {
    title: "Anti-Ragging Protection",
    act: "UGC Anti-Ragging Regulations",
    desc: "Campus ragging incidents, mandatory helpline escalations, institutional non-compliance, and statutory reporting.",
    badge: "Campus Safety",
  },
];

const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Clarify Facts",
    desc: "Answer targeted, single follow-up questions to resolve ambiguities in your factual timeline without confusing loops.",
  },
  {
    step: "02",
    title: "Grounded Retrieval",
    desc: "Query verified Indian statutory database with RAG vector search to get citation-backed statutory principles.",
  },
  {
    step: "03",
    title: "Evidence Vault",
    desc: "Upload documents, receipts, images, and recordings secured with cryptographic SHA-256 integrity fingerprinting.",
  },
  {
    step: "04",
    title: "Readiness Score",
    desc: "Evaluate objective factual completeness and identify missing evidence items required to substantiate claims.",
  },
  {
    step: "05",
    title: "Legal Action Plan",
    desc: "Receive prioritized next steps with statutory limitation periods, recommended legal forums, and key deadlines.",
  },
  {
    step: "06",
    title: "Lawyer Handoff Pack",
    desc: "Export formal legal complaints and advocate-ready handoff summaries directly to PDF and DOCX formats.",
  },
];

export default function LandingPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-parchment-100 text-bronze-900 flex flex-col font-sans">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-bronze-900/95 backdrop-blur-md border-b border-bronze-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gold-600/20 border border-gold-500/40 flex items-center justify-center text-gold-400">
              <IconScale className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold font-serif-heading tracking-wide text-white block">
                Nyaya AI
              </span>
              <span className="text-xs text-gold-400 uppercase tracking-widest block font-medium">
                Indian Legal Assistance Workspace
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#about" className="text-bronze-200 hover:text-gold-400 transition-colors">
              Platform Overview
            </a>
            <a href="#domains" className="text-bronze-200 hover:text-gold-400 transition-colors">
              Supported Laws
            </a>
            <a href="#workflow" className="text-bronze-200 hover:text-gold-400 transition-colors">
              Workflow
            </a>
            <a href="#verification" className="text-bronze-200 hover:text-gold-400 transition-colors">
              Launch Standards
            </a>
          </nav>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <button
                type="button"
                onClick={() => navigate("/")}
                className="btn-gold shadow-md"
              >
                Go to Workspace
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-bronze-100 hover:text-gold-400 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="btn-gold shadow-md text-xs uppercase tracking-wider font-bold"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Hero Section */}
      <main id="main-content" className="flex-1">
        <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-stoneborder overflow-hidden bg-parchment-mesh">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Left Column: Hero Text */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-gold-500/10 border border-gold-500/30 text-gold-700 text-xs font-bold uppercase tracking-widest font-serif-heading">
                  <IconShieldCheck className="w-4 h-4 text-gold-600" />
                  Citation-Grounded Legal RAG Platform
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif-heading text-bronze-900 leading-tight">
                  Bespoke Legal Clarity & Formal Complaint Builder for Indian Citizens
                </h1>

                <p className="text-base sm:text-lg text-bronze-700 leading-relaxed font-normal max-w-2xl">
                  Nyaya AI empowers citizens, workers, and consumers to navigate complex statutory issues. 
                  Upload evidence with cryptographic SHA-256 integrity, evaluate case readiness objectively, 
                  and generate lawyer-ready handoff packages grounded in verified Indian statutes.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                  <Link
                    to={isAuthenticated ? "/chat" : "/register"}
                    className="btn-primary py-3.5 px-7 text-base font-semibold shadow-md flex items-center justify-center gap-3"
                  >
                    <span>Launch Legal Workspace</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>

                  <a
                    href="#domains"
                    className="btn-secondary py-3.5 px-6 text-base font-semibold text-center"
                  >
                    View Supported Laws
                  </a>
                </div>

                {/* Key Facts Summary */}
                <div className="pt-6 grid grid-cols-3 gap-4 border-t border-stoneborder">
                  <div>
                    <span className="block text-2xl font-bold font-serif-heading text-bronze-900">5 Domains</span>
                    <span className="text-xs text-bronze-600 font-medium">Core Indian Statutes</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold font-serif-heading text-bronze-900">SHA-256</span>
                    <span className="text-xs text-bronze-600 font-medium">Evidence Cryptography</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold font-serif-heading text-bronze-900">PDF & DOCX</span>
                    <span className="text-xs text-bronze-600 font-medium">Lawyer Handoff Packs</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Lady Justice Asset (Preserved aspect ratio, exact cropping, dimension reservation) */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-2xl overflow-hidden border-2 border-gold-500/40 shadow-bespoke bg-bronze-900 group">
                  <div className="aspect-[16/10] sm:aspect-[4/3] lg:aspect-[4/5] w-full relative overflow-hidden bg-bronze-900">
                    <img
                      src={ladyJusticeImg}
                      alt="Lady Justice statue holding blindfold, sword of enforcement, and balanced scales of equity in front of classical stone archway under open sky"
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="eager"
                      width="1000"
                      height="600"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bronze-900/80 via-transparent to-transparent opacity-60 pointer-events-none" />
                  </div>

                  {/* Caption Overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-5 bg-bronze-900/90 backdrop-blur-sm border-t border-gold-500/30 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-serif-heading uppercase tracking-widest text-gold-400">
                          Justitia & Equity
                        </p>
                        <p className="text-sm font-medium text-parchment-200">
                          Grounded in Law, Equal Access for All
                        </p>
                      </div>
                      <span className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-gold-600/30 text-gold-300 border border-gold-500/40">
                        Statutory RAG
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Legal Information Disclaimer Banner */}
        <section className="bg-bronze-900 text-parchment-100 py-6 border-y border-gold-600/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-gold-500/20 text-gold-400 flex-shrink-0">
                  <IconShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold font-serif-heading text-gold-400 uppercase tracking-wider">
                    Statutory Disclaimer & Information Purpose
                  </h4>
                  <p className="text-xs text-parchment-300 max-w-4xl">
                    Nyaya AI provides citation-grounded legal information and structured evidence organization. 
                    It is NOT a law firm and does NOT provide guaranteed legal advice or representation. High-stakes legal matters should be reviewed by a licensed advocate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: 5 Core Statutory Domains */}
        <section id="domains" className="py-16 md:py-24 bg-white border-b border-stoneborder">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="section-label">Supported Jurisdictions</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif-heading text-bronze-900">
                Five Specialized Domains of Indian Law
              </h2>
              <p className="text-bronze-700 text-sm sm:text-base">
                Our RAG retrieval system is trained on verified statutory provisions, landmark judgments, and procedural guidelines across key consumer, labor, and safety categories.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {STATUTORY_DOMAINS.map((domain, idx) => (
                <div
                  key={idx}
                  className="card p-7 space-y-4 hover:border-gold-500/80 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded bg-parchment-200 text-bronze-800 text-xs font-bold font-serif-heading">
                      {domain.badge}
                    </span>
                    <span className="text-xs font-semibold text-gold-600 font-serif-heading">
                      Act #{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-serif-heading text-bronze-900">
                    {domain.title}
                  </h3>

                  <p className="text-xs font-semibold text-azure-700 bg-azure-50 p-2 rounded border border-azure-200">
                    📜 {domain.act}
                  </p>

                  <p className="text-sm text-bronze-700 leading-relaxed">
                    {domain.desc}
                  </p>
                </div>
              ))}

              {/* Summary Card */}
              <div className="card p-7 bg-bronze-900 text-white border-gold-500/40 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="px-3 py-1 rounded bg-gold-600/30 text-gold-300 text-xs font-bold uppercase tracking-wider border border-gold-500/40">
                    Fail-Closed Safety
                  </span>
                  <h3 className="text-xl font-bold font-serif-heading text-white">
                    Strict Grounding Boundary
                  </h3>
                  <p className="text-xs text-parchment-300 leading-relaxed">
                    If an inquiry falls outside supported statutes or lacks adequate legal context, Nyaya AI transparently declines rather than fabricating answers.
                  </p>
                </div>

                <div className="pt-6 border-t border-bronze-700">
                  <Link
                    to={isAuthenticated ? "/chat" : "/register"}
                    className="btn-gold w-full text-xs font-bold uppercase tracking-wider py-2.5"
                  >
                    Test Legal Retrieval
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Core Workflow Architecture */}
        <section id="workflow" className="py-16 md:py-24 bg-parchment-100 border-b border-stoneborder">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="section-label">End-to-End Assistance</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif-heading text-bronze-900">
                The 6-Step Case Builder Methodology
              </h2>
              <p className="text-bronze-700 text-sm sm:text-base">
                Designed to guide non-lawyers step-by-step from raw grievance to a fully organized legal package.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {WORKFLOW_STEPS.map((item, i) => (
                <div key={i} className="card p-6 bg-white space-y-3 relative">
                  <div className="flex items-center justify-between">
                    <span className="w-10 h-10 rounded-lg bg-bronze-900 text-gold-400 font-bold font-serif-heading flex items-center justify-center text-base">
                      {item.step}
                    </span>
                    <span className="text-xs text-bronze-400 font-medium">Phase {i + 1}</span>
                  </div>
                  <h3 className="text-lg font-bold font-serif-heading text-bronze-900">
                    {item.title}
                  </h3>
                  <p className="text-sm text-bronze-700 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Launch Verification & Compliance Requirements Panel */}
        <section id="verification" className="py-16 bg-white border-b border-stoneborder">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-parchment-200 border border-stoneborder rounded-2xl p-8 md:p-12 space-y-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <span className="section-label">Platform Standards</span>
                  <h2 className="text-2xl md:text-3xl font-bold font-serif-heading text-bronze-900 mt-1">
                    Production Launch Readiness & Security Verification
                  </h2>
                </div>
                <div className="px-4 py-2 rounded-lg bg-azure-50 text-azure-700 border border-azure-200 text-xs font-bold uppercase tracking-wider font-serif-heading">
                  Verified Production Build
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 border-t border-stoneborder">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded bg-gold-500/20 text-gold-700 mt-0.5">
                    <IconCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-bronze-900">Domain & SSL</h4>
                    <p className="text-xs text-bronze-600">Connected via TLS 1.3 encrypted HTTPS standard.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded bg-gold-500/20 text-gold-700 mt-0.5">
                    <IconCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-bronze-900">Favicon & Identity</h4>
                    <p className="text-xs text-bronze-600">Custom scales seal favicon and SVG identity integrated.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded bg-gold-500/20 text-gold-700 mt-0.5">
                    <IconCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-bronze-900">Zero AI Watermarks</h4>
                    <p className="text-xs text-bronze-600">Clean bespoke design with all generic AI badges removed.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded bg-gold-500/20 text-gold-700 mt-0.5">
                    <IconCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-bronze-900">Privacy & Terms</h4>
                    <p className="text-xs text-bronze-600">Full legal compliance documents linked in footer.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded bg-gold-500/20 text-gold-700 mt-0.5">
                    <IconCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-bronze-900">WCAG 2.2 AA</h4>
                    <p className="text-xs text-bronze-600">Full keyboard focus, ARIA landmarks, and contrast rules.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded bg-gold-500/20 text-gold-700 mt-0.5">
                    <IconCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-bronze-900">Cryptographic Evidence</h4>
                    <p className="text-xs text-bronze-600">SHA-256 fingerprinting on evidence upload.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Public Footer */}
      <footer className="bg-bronze-900 text-parchment-200 border-t border-bronze-700 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gold-600/20 border border-gold-500/40 flex items-center justify-center text-gold-400">
                  <IconScale className="w-5 h-5" />
                </div>
                <span className="text-lg font-bold font-serif-heading text-white">
                  Nyaya AI
                </span>
              </div>
              <p className="text-xs text-bronze-300 max-w-md leading-relaxed">
                Citation-grounded Indian legal assistance workspace. Empowering citizens through statutory RAG, evidence vault protection, case readiness assessment, and lawyer handoff compilation.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold font-serif-heading uppercase tracking-widest text-gold-400 mb-4">
                Workspace Links
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link to="/login" className="hover:text-gold-400 transition-colors">Sign In to Account</Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-gold-400 transition-colors">Create Free Workspace</Link>
                </li>
                <li>
                  <Link to="/chat" className="hover:text-gold-400 transition-colors">Legal Chat Engine</Link>
                </li>
                <li>
                  <Link to="/evidence" className="hover:text-gold-400 transition-colors">Evidence Vault</Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold font-serif-heading uppercase tracking-widest text-gold-400 mb-4">
                Legal & Privacy
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link to="/privacy" className="hover:text-gold-400 transition-colors">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-gold-400 transition-colors">Terms & Conditions</Link>
                </li>
                <li>
                  <a href="#verification" className="hover:text-gold-400 transition-colors">Security Verification</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-bronze-800 flex flex-col sm:flex-row items-center justify-between text-xs text-bronze-400 gap-4">
            <p>© {new Date().getFullYear()} Nyaya AI. Grounded Indian Legal Workspace. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span>Domain: <strong className="text-parchment-200 font-mono">nyaya-ai.org</strong></span>
              <span>HTTPS: <strong className="text-gold-400 font-mono">Active (TLS 1.3)</strong></span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
