import React from "react";
import { useFocusTrap } from "../hooks/useFocusTrap";

export default function CaseReadinessModal({ isOpen, onClose, readiness, loading, error }) {
  const modalRef = useFocusTrap(isOpen, onClose);

  if (!isOpen) return null;

  const stateColors = {
    NEEDS_INFORMATION: "bg-gold-50 text-gold-900 border-gold-300",
    NEEDS_EVIDENCE: "bg-azure-50 text-azure-900 border-azure-300",
    READY_FOR_NEXT_STEP: "bg-emerald-50 text-emerald-900 border-emerald-300",
  };

  const stateLabels = {
    NEEDS_INFORMATION: "Information Needed",
    NEEDS_EVIDENCE: "Evidence Needed",
    READY_FOR_NEXT_STEP: "Ready for Next Step",
  };

  const factsEstablished = readiness?.facts_established || [];
  const factsMissing = readiness?.facts_missing || [];
  const evidenceMissing = readiness?.evidence_missing || [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-bronze-950/70 p-3 sm:p-4 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-readiness-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-white p-5 sm:p-6 shadow-bespoke border border-stoneborder outline-none"
      >
        <div className="flex items-start justify-between border-b border-stoneborder pb-4">
          <div>
            <h2 id="case-readiness-title" className="text-lg sm:text-xl font-bold font-serif-heading text-bronze-900 flex items-center gap-2">
              <span aria-hidden="true">📋</span> Case Readiness Assessment
            </h2>
            <p className="mt-1 text-xs text-bronze-600">
              Factual completeness and evidence audit (No win predictions or merit scoring)
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-bronze-400 hover:bg-parchment-200 hover:text-bronze-800 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close Case Readiness modal"
          >
            ✕
          </button>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs text-bronze-600 font-medium flex items-center justify-center gap-2">
            <span className="h-4 w-4 rounded-full border-2 border-gold-600 border-t-transparent animate-spin-smooth" />
            Evaluating case readiness...
          </div>
        ) : error ? (
          <div role="alert" className="py-8 text-center text-xs text-red-700 font-medium">
            {error}
          </div>
        ) : readiness ? (
          <div className="mt-5 space-y-5">
            {/* Status & Next Step Banner */}
            <div className="rounded-lg bg-parchment-100 border border-stoneborder p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-bronze-600 font-serif-heading">Current Readiness State</span>
                <span className={`px-3 py-1 rounded-md text-xs font-bold border ${stateColors[readiness.readiness_state] || 'bg-parchment-200'}`}>
                  {stateLabels[readiness.readiness_state] || readiness.readiness_state}
                </span>
              </div>
              <div className="mt-3 pt-3 border-t border-stoneborder">
                <div className="text-xs font-bold text-gold-700 font-serif-heading flex items-center gap-1.5">
                  <span aria-hidden="true">➡️</span> Primary Next Step:
                </div>
                <p className="mt-1 text-sm font-semibold text-bronze-900 break-words-custom">
                  {readiness.next_step}
                </p>
              </div>
            </div>

            {/* Facts Established */}
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-gold-700 font-serif-heading mb-2">
                ✓ Facts Established ({factsEstablished.length})
              </h3>
              {factsEstablished.length === 0 ? (
                <p className="text-xs text-bronze-500 italic">No facts formally established yet.</p>
              ) : (
                <ul className="space-y-1.5">
                  {factsEstablished.map((fact, idx) => (
                    <li key={idx} className="flex items-center gap-2 rounded-lg bg-azure-50/70 border border-azure-200 px-3 py-2 text-xs font-medium text-azure-900 break-words-custom">
                      <span className="text-azure-600 font-bold" aria-hidden="true">✓</span>
                      {typeof fact === 'string' ? fact : fact.label || fact.text || JSON.stringify(fact)}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Facts Missing */}
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-gold-700 font-serif-heading mb-2">
                ❓ Facts Missing ({factsMissing.length})
              </h3>
              {factsMissing.length === 0 ? (
                <p className="text-xs text-bronze-500 italic">No missing facts identified.</p>
              ) : (
                <ul className="space-y-1.5">
                  {factsMissing.map((fact, idx) => (
                    <li key={idx} className="flex items-center gap-2 rounded-lg bg-gold-50/70 border border-gold-200 px-3 py-2 text-xs font-medium text-gold-950 break-words-custom">
                      <span className="text-gold-600 font-bold" aria-hidden="true">?</span>
                      {typeof fact === 'string' ? fact : fact.label || fact.text || JSON.stringify(fact)}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Evidence Missing */}
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-gold-700 font-serif-heading mb-2">
                📄 Evidence Items Needed ({evidenceMissing.length})
              </h3>
              {evidenceMissing.length === 0 ? (
                <p className="text-xs text-bronze-500 italic">All key evidence items present.</p>
              ) : (
                <ul className="space-y-1.5">
                  {evidenceMissing.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 rounded-lg bg-parchment-200 border border-stoneborder px-3 py-2 text-xs font-medium text-bronze-900 break-words-custom">
                      <span className="text-bronze-600 font-bold" aria-hidden="true">📌</span>
                      {typeof item === 'string' ? item : item.label || item.text || JSON.stringify(item)}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ) : null}

        <div className="mt-6 flex justify-end pt-4 border-t border-stoneborder">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary py-2 px-5 text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
