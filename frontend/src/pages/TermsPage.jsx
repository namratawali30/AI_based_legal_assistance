import { Link } from "react-router-dom";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-parchment-100 text-bronze-900 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-bronze-900 text-white py-6 border-b border-gold-600/40 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold font-serif-heading text-white hover:text-gold-400 transition-colors">
            Nyaya AI
          </Link>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link to="/privacy" className="text-bronze-200 hover:text-gold-400">Privacy Policy</Link>
            <Link to="/login" className="btn-gold py-1.5 px-3">Sign In</Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="card p-8 sm:p-12 space-y-8 bg-white border-stoneborder shadow-md">
          <div className="border-b border-stoneborder pb-6 space-y-2">
            <span className="section-label">Legal Documentation</span>
            <h1 className="text-3xl font-bold font-serif-heading text-bronze-900">
              Terms & Conditions
            </h1>
            <p className="text-xs text-bronze-500 font-mono">
              Last Updated: October 1, 2026 | Effective for Nyaya AI Workspace
            </p>
          </div>

          <div className="space-y-6 text-sm text-bronze-800 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-lg font-bold font-serif-heading text-bronze-900">1. Nature of Service — Legal Information Disclaimer</h2>
              <p className="p-4 bg-gold-50 border border-gold-300 rounded-lg text-gold-900 font-medium">
                <strong>IMPORTANT DISCLAIMER:</strong> Nyaya AI provides automated legal information, statutory citation retrieval, case evidence organization, and draft complaint generation. Nyaya AI is NOT a licensed advocate, legal practitioner, or law firm, and does NOT provide professional legal advice, formal representation, or court appearances. For high-stakes legal disputes, users must consult an advocate licensed with the Bar Council of India.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold font-serif-heading text-bronze-900">2. Permitted Use & Account Security</h2>
              <p>
                Users are responsible for maintaining the security of their workspace account credentials. You agree to provide factual and accurate information when generating formal complaints and lawyer handoff packages. Misuse of the platform to generate fraudulent claims or harass entities is strictly prohibited.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold font-serif-heading text-bronze-900">3. Statutory Supported Boundaries</h2>
              <p>
                Nyaya AI's RAG system specifically covers five statutory domains under Indian law: Consumer Protection Act 2019, Industrial Disputes & Labour Laws, POSH Act 2013 & Domestic Violence Act, Right to Education Act, and UGC Anti-Ragging Regulations. Queries outside these domains will return transparency notices.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold font-serif-heading text-bronze-900">4. Complaint & Export Warranties</h2>
              <p>
                Generated PDF and DOCX complaints are initial structured drafts intended to assist advocates or self-represented litigants. You are sole responsibility for reviewing and verifying all factual statements prior to submitting complaints to legal commissions, tribunals, or authorities.
              </p>
            </section>

            <section className="space-y-3 border-t border-stoneborder pt-6">
              <h2 className="text-lg font-bold font-serif-heading text-bronze-900">5. Contact Information</h2>
              <p>
                For legal inquiries regarding these terms, reach our compliance team at <strong className="font-mono text-bronze-900">legal@nyaya-ai.org</strong>.
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-bronze-900 text-parchment-200 py-6 border-t border-bronze-700 text-xs text-center">
        <p>© 2026 Nyaya AI. Grounded Legal Assistance Workspace. <Link to="/privacy" className="text-gold-400 hover:underline">Privacy Policy</Link></p>
      </footer>
    </div>
  );
}
