import React from "react";
import { useFocusTrap } from "../hooks/useFocusTrap";

export default function ActionPlanModal({ isOpen, onClose, plan, loading, error }) {
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
        aria-labelledby="action-plan-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-white p-5 sm:p-6 shadow-bespoke border border-stoneborder outline-none"
      >
        <div className="flex items-start justify-between border-b border-stoneborder pb-4">
          <div>
            <h2 id="action-plan-title" className="text-lg sm:text-xl font-bold font-serif-heading text-bronze-900 flex items-center gap-2">
              <span aria-hidden="true">🎯</span> YOUR ACTION PLAN
            </h2>
            <p className="mt-1 text-xs text-bronze-600">
              Ordered practical next steps grounded in verified law and evidence
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-bronze-400 hover:bg-parchment-200 hover:text-bronze-800 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close Action Plan modal"
          >
            ✕
          </button>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs text-bronze-600 font-medium flex items-center justify-center gap-2">
            <span className="h-4 w-4 rounded-full border-2 border-gold-600 border-t-transparent animate-spin-smooth" />
            Generating action plan...
          </div>
        ) : error ? (
          <div role="alert" className="py-8 text-center text-xs text-red-700 font-medium">
            {error}
          </div>
        ) : plan ? (
          <div className="mt-5 space-y-5">
            {/* Caution Banner if present */}
            {plan.important_caution && (
              <div className="rounded-lg bg-gold-50 border border-gold-300 p-3.5 text-xs text-gold-950 flex items-start gap-2">
                <span className="text-gold-700 font-bold" aria-hidden="true">⚠️</span>
                <div className="break-words-custom">
                  <span className="font-bold">Important Caution: </span>
                  {plan.important_caution}
                </div>
              </div>
            )}

            {/* Primary Next Step Banner */}
            <div className="rounded-lg bg-parchment-100 border border-stoneborder p-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-gold-700 font-serif-heading flex items-center gap-1.5">
                <span aria-hidden="true">➡️</span> Primary Next Step
              </div>
              <p className="mt-1.5 text-sm font-semibold text-bronze-900 break-words-custom">
                {plan.primary_next_step}
              </p>
            </div>

            {/* Ordered Steps List */}
            <div className="space-y-3.5">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-gold-700 font-serif-heading">
                Recommended Action Sequence ({plan.steps.length} Steps)
              </h3>

              {plan.steps.map((step) => (
                <div
                  key={step.order}
                  className="rounded-lg border border-stoneborder bg-white p-3.5 sm:p-4 shadow-sm transition-all hover:border-gold-500/50"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-bronze-900 text-xs font-bold text-gold-400 flex-shrink-0 font-serif-heading">
                        {step.order}
                      </span>
                      <h4 className="text-sm font-bold font-serif-heading text-bronze-900 break-words-custom">
                        {step.title}
                      </h4>
                    </div>
                    {step.state === "DONE" && (
                      <span className="rounded-md bg-azure-50 px-2.5 py-0.5 text-[10px] font-bold text-azure-800 border border-azure-200 flex-shrink-0">
                        ✓ Completed
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-xs leading-relaxed text-bronze-700 pl-8 break-words-custom">
                    {step.action_text}
                  </p>

                  <div className="mt-2.5 flex flex-wrap items-center gap-3 text-[11px] text-bronze-600 pl-8 font-medium">
                    {step.timeframe && (
                      <span className="bg-parchment-100 px-2 py-0.5 rounded border border-stoneborder">
                        ⏱ {step.timeframe}
                      </span>
                    )}
                    {step.forum && (
                      <span className="bg-parchment-100 px-2 py-0.5 rounded border border-stoneborder">
                        🏛 Forum: {step.forum}
                      </span>
                    )}
                  </div>
                </div>
              ))}
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
