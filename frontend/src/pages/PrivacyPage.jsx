import { Link } from "react-router-dom";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-parchment-100 text-bronze-900 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-bronze-900 text-white py-6 border-b border-gold-600/40 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold font-serif-heading text-white hover:text-gold-400 transition-colors">
            Nyaya AI
          </Link>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link to="/terms" className="text-bronze-200 hover:text-gold-400">Terms & Conditions</Link>
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
              Privacy Policy
            </h1>
            <p className="text-xs text-bronze-500 font-mono">
              Last Updated: October 1, 2026 | Effective for Nyaya AI Workspace
            </p>
          </div>

          <div className="space-y-6 text-sm text-bronze-800 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-lg font-bold font-serif-heading text-bronze-900">1. Data Ownership & Confidentiality</h2>
              <p>
                At Nyaya AI, we recognize that legal inquiries involve sensitive personal, financial, and workplace facts. All uploaded documents, text transcripts, and chat logs are strictly owned by you. Nyaya AI does NOT sell, monetize, or expose your private legal case data to third-party advertisers or unauthenticated entities.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold font-serif-heading text-bronze-900">2. Cryptographic Integrity & Evidence Storage</h2>
              <p>
                When you upload evidence to the Nyaya AI Evidence Vault (PDFs, images, audio, or video files), our system calculates a cryptographic <strong>SHA-256 fingerprint</strong> at the exact timestamp of upload. This ensures your legal evidence retains verifiable chain-of-custody integrity. Extracted text and transcripts are stored securely in isolated MongoDB databases.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold font-serif-heading text-bronze-900">3. Local Vector RAG & AI Processing</h2>
              <p>
                Legal statutory retrieval is conducted locally against verified Indian statutes (Consumer Protection Act 2019, POSH Act 2013, Factories Act, RTE Act, UGC Regulations). Retrieval queries are processed with strict isolation, and private user identifiers are stripped before passing contextual prompts to grounded inference models.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold font-serif-heading text-bronze-900">4. User Rights & Data Erasure</h2>
              <p>
                You retain full authority to delete individual evidence items, clear chat sessions, or purge your entire account profile. Once a complaint draft is explicitly finalized, associated evidence metadata is locked from accidental deletion to maintain legal export consistency.
              </p>
            </section>

            <section className="space-y-3 border-t border-stoneborder pt-6">
              <h2 className="text-lg font-bold font-serif-heading text-bronze-900">5. Privacy Inquiries</h2>
              <p>
                For questions regarding data processing or to request data exports, contact our privacy compliance officer at <strong className="font-mono text-bronze-900">privacy@nyaya-ai.org</strong>.
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-bronze-900 text-parchment-200 py-6 border-t border-bronze-700 text-xs text-center">
        <p>© 2026 Nyaya AI. Grounded Legal Assistance Workspace. <Link to="/terms" className="text-gold-400 hover:underline">Terms & Conditions</Link></p>
      </footer>
    </div>
  );
}
