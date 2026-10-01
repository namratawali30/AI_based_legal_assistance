import React from "react";
import { downloadHandoffDocx, downloadHandoffPdf } from "../api/lawyerHandoff";
import { useFocusTrap } from "../hooks/useFocusTrap";

export default function LawyerHandoffModal({ isOpen, onClose, handoff, loading, error, sessionId }) {
  const modalRef = useFocusTrap(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-bronze-950/70 p-3 sm:p-4 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lawyer-handoff-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl bg-white p-5 sm:p-6 shadow-bespoke border border-stoneborder outline-none"
      >
        <div className="flex items-start justify-between border-b border-stoneborder pb-4">
          <div>
            <h2 id="lawyer-handoff-title" className="text-lg sm:text-xl font-bold font-serif-heading text-bronze-900 flex items-center gap-2">
              <span aria-hidden="true">💼</span> LAWYER HANDOFF PACK
            </h2>
            <p className="mt-1 text-xs text-bronze-600">
              Concise professional case briefing organized for legal counsel review
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-bronze-400 hover:bg-parchment-200 hover:text-bronze-800 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close Lawyer Handoff modal"
          >
            ✕
          </button>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs text-bronze-600 font-medium flex items-center justify-center gap-2">
            <span className="h-4 w-4 rounded-full border-2 border-gold-600 border-t-transparent animate-spin-smooth" />
            Assembling lawyer handoff pack...
          </div>
        ) : error ? (
          <div role="alert" className="py-8 text-center text-xs text-red-700 font-medium">
            {error}
          </div>
        ) : handoff ? (
          <div className="mt-5 space-y-6 text-xs text-bronze-800">
            {/* Disclaimer Banner */}
            <div className="rounded-lg bg-parchment-100 border border-stoneborder p-3.5 italic text-bronze-700 leading-relaxed break-words-custom">
              "This pack was organized by Nyaya AI from information and evidence provided in this workspace and verified legal sources. It is intended to help a legal professional review the matter and is not a substitute for professional legal advice."
            </div>

            {/* Case Summary */}
            <div className="rounded-lg border border-stoneborder bg-white p-4 space-y-2">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-gold-700 font-serif-heading">1. Case Summary</h3>
              <p className="text-sm leading-relaxed text-bronze-900 font-medium break-words-custom">
                {handoff.case_summary}
              </p>
            </div>

            {/* Objective & Parties */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-stoneborder bg-white p-4">
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-gold-700 font-serif-heading">2. User Objective</h3>
                <p className="mt-1.5 text-xs font-semibold text-bronze-900 break-words-custom">
                  {handoff.user_objective}
                </p>
              </div>

              <div className="rounded-lg border border-stoneborder bg-white p-4">
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-gold-700 font-serif-heading">3. Parties Involved</h3>
                <div className="mt-1.5 space-y-1">
                  {handoff.parties.map((p, idx) => (
                    <div key={idx} className="flex justify-between gap-2">
                      <span className="font-semibold text-bronze-900 flex-shrink-0">{p.role}:</span>
                      <span className="text-bronze-700 break-words-custom text-right">{p.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Established Facts & Open Questions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-azure-200 bg-azure-50/60 p-4">
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-azure-800 font-serif-heading">4. Established Facts ({handoff.established_facts.length})</h3>
                <ul className="mt-2 space-y-1.5 list-disc pl-4 text-azure-950">
                  {handoff.established_facts.map((f, idx) => (
                    <li key={idx} className="break-words-custom">{f.label}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-gold-300 bg-gold-50/60 p-4">
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-gold-900 font-serif-heading">5. Open Questions ({handoff.unresolved_questions.length})</h3>
                <ul className="mt-2 space-y-1.5 list-disc pl-4 text-gold-950">
                  {handoff.unresolved_questions.map((q, idx) => (
                    <li key={idx} className="break-words-custom">{q.label}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Evidence Index */}
            <div className="rounded-lg border border-stoneborder bg-white p-4 space-y-2">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-gold-700 font-serif-heading">6. Evidence Index ({handoff.evidence_index.length} Items)</h3>
              <div className="space-y-2">
                {handoff.evidence_index.map((ev) => (
                  <div key={ev.citation_id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-md border border-stoneborder bg-parchment-50 p-2.5">
                    <div className="min-w-0">
                      <span className="font-bold text-gold-700 mr-2">[{ev.citation_id}]</span>
                      <span className="font-semibold text-bronze-900 break-words-custom">{ev.title}</span>
                      <span className="ml-2 text-[10px] uppercase font-bold text-bronze-500 flex-shrink-0">({ev.evidence_type})</span>
                    </div>
                    <div className="text-[10px] text-bronze-600 font-mono flex-shrink-0">
                      SHA-256: {ev.sha256.substring(0, 16)}...
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Legal Sources & Current Next Step */}
            <div className="rounded-lg border border-stoneborder bg-white p-4 space-y-2">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-gold-700 font-serif-heading">7. Verified Legal Basis & Next Step</h3>
              {handoff.legal_sources.map((src) => (
                <div key={src.citation_id} className="text-xs break-words-custom">
                  <span className="font-bold text-gold-700 mr-1.5">[{src.citation_id}]</span>
                  <span className="font-semibold text-bronze-900">{src.title}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-stoneborder font-medium text-bronze-900 break-words-custom">
                <span className="font-bold text-bronze-950 font-serif-heading">Next Recommended Action: </span>
                {handoff.current_next_step}
              </div>
            </div>
          </div>
        ) : null}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stoneborder">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => downloadHandoffPdf(sessionId)}
              className="btn-primary py-2 px-4 text-xs font-bold"
            >
              📄 Download PDF
            </button>
            <button
              type="button"
              onClick={() => downloadHandoffDocx(sessionId)}
              className="btn-secondary py-2 px-4 text-xs font-bold"
            >
              📝 Download DOCX
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="btn-secondary py-2 px-4 text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
