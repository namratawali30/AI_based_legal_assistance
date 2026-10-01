import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  createChat,
  deleteChat,
  getChat,
  listChats,
  retryChatMessage,
  sendChatMessage,
  updateChat,
} from "../api/chats";


import {
  getApiErrorMessage,
} from "../api/client";
import { fetchSessionReadiness } from "../api/readiness";
import { fetchSessionActionPlan } from "../api/actionPlan";
import { fetchSessionLawyerHandoff } from "../api/lawyerHandoff";
import CaseReadinessModal from "../components/CaseReadinessModal";
import ActionPlanModal from "../components/ActionPlanModal";
import SourceDetailsModal from "../components/SourceDetailsModal";
import LawyerHandoffModal from "../components/LawyerHandoffModal";





const CATEGORIES = [
  {
    value: "consumer_rights",
    label: "Consumer Rights",
  },
  {
    value: "labour_rights",
    label: "Labour Rights",
  },
  {
    value: "womens_safety",
    label: "Women's Safety",
  },
  {
    value: "educational_rights",
    label: "Educational Rights",
  },
  {
    value: "anti_ragging",
    label: "Anti-Ragging",
  },
];

function categoryLabel(value) {
  return (
    CATEGORIES.find(
      (category) =>
        category.value === value
    )?.label || value
  );
}

function SourceCard({
  source,
}) {
  const isIndiaCode =
    source.source_provider === "India Code" ||
    source.source_mode === "live" ||
    source.source_mode === "cached_live";

  return (
    <div className="mt-3 rounded-xl border border-slate-200 bg-white p-3.5 text-xs text-slate-600 shadow-2xs">
      {isIndiaCode && (
        <div className="mb-2 flex items-center justify-between text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 rounded-lg px-2.5 py-1">
          <span className="flex items-center gap-1.5">
            <svg className="h-3 w-3 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
            </svg>
            Official Source · India Code
          </span>
          {source.fetched_at && (
            <span className="text-[10px] text-emerald-600 font-normal">
              Verified: {new Date(source.fetched_at).toLocaleDateString()}
            </span>
          )}
        </div>
      )}

      <div className="font-semibold text-slate-800">
        {source.citation_id}
        {" · "}
        {source.title ||
          "Legal source"}
      </div>

      {source.authority && (
        <div className="mt-1 text-slate-500">
          {source.authority}
        </div>
      )}

      {source.provision_number && (
        <div className="mt-1">
          {source.provision_type
            ? `${source.provision_type} `
            : ""}
          {source.provision_number}
          {source.provision_title
            ? ` — ${source.provision_title}`
            : ""}
        </div>
      )}

      {(source.official_url || source.landing_page) && (
        <a
          href={source.official_url || source.landing_page}
          target="_blank"
          rel="noreferrer"
          className="mt-2.5 inline-flex items-center gap-1 font-medium text-indigo-600 hover:text-indigo-700"
        >
          View official source
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      )}
    </div>
  );
}


function CollapsibleSources({ sources, onSelectSource }) {
  const [expanded, setExpanded] = useState(false);
  const visibleSources = sources.slice(0, 3);

  return (
    <div className="mt-3.5 pt-2.5 border-t border-slate-100">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1.5 text-xs font-semibold text-indigo-700 hover:text-indigo-900 transition-colors cursor-pointer"
      >
        <span>📜 Sources used ({visibleSources.length})</span>
        <span className="text-[11px] text-indigo-500 font-normal">{expanded ? "▲ Hide" : "▼ [View sources]"}</span>
      </button>

      {expanded && (
        <div className="mt-2.5 space-y-2 pl-1">
          {visibleSources.map((source) => (
            <div
              key={source.citation_id}
              onClick={() => onSelectSource?.(source)}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/80 p-2.5 text-xs cursor-pointer hover:border-indigo-300 hover:bg-indigo-50/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="rounded bg-indigo-100 px-1.5 py-0.5 text-[10px] font-bold text-indigo-800">
                  {source.citation_id || "SOURCE_1"}
                </span>
                <span className="font-semibold text-slate-800">
                  {source.title || "Legal Source"}
                </span>
                {source.provision_number && (
                  <span className="text-slate-500">
                    — {source.provision_type ? `${source.provision_type} ` : "Section "}{source.provision_number}
                  </span>
                )}
              </div>
              <span className="text-[11px] font-medium text-indigo-600">
                View →
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


function Message({
  message,
  onRetry,
  retrying,
  onSelectOption,
  onSelectSource,
}) {
  const assistant =
    message.role === "assistant";
  const isClarification =
    message.message_type === "clarification";

  return (
    <div
      className={
        assistant
          ? "flex justify-start"
          : "flex justify-end"
      }
    >
      <div
        className={[
          "max-w-3xl rounded-2xl px-5 py-4",
          assistant
            ? isClarification
              ? "border border-amber-200 bg-amber-50/80 text-slate-800 shadow-sm"
              : "border border-slate-200 bg-white text-slate-800 shadow-sm"
            : "bg-indigo-600 text-white",
        ].join(" ")}
      >
        {assistant && message.category_notice && (
          <div className="mb-3 flex items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50/90 px-3.5 py-2.5 text-xs font-semibold text-indigo-900">
            <svg className="h-4 w-4 text-indigo-600 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
            </svg>
            {message.category_notice}
          </div>
        )}

        {assistant && isClarification && (
          <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-amber-800">
            <svg className="h-3.5 w-3.5 text-amber-600 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
            </svg>
            Clarification needed
          </div>
        )}

        <div className="whitespace-pre-wrap text-sm leading-relaxed">
          {message.content}
        </div>

        {assistant &&
          message.suggested_options &&
          message.suggested_options.length > 0 && (
            <div className="mt-3.5 flex flex-wrap gap-2">
              {message.suggested_options.map((option, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSelectOption?.(option)}
                  className="rounded-lg border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold text-amber-800 hover:bg-amber-100 hover:border-amber-400 transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
          )}

        {assistant && message.sources && message.sources.length > 0 && (
          <CollapsibleSources sources={message.sources} onSelectSource={onSelectSource} />
        )}



        {assistant &&
          message.status ===
            "failed" && (
            <button
              type="button"
              disabled={retrying}
              onClick={() =>
                onRetry(message.id)
              }
              className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100 disabled:opacity-50"
            >
              {retrying
                ? "Retrying..."
                : "Retry response"}
            </button>
          )}
      </div>
    </div>
  );
}


export default function ChatPage() {
  const [chats, setChats] =
    useState([]);

  const [
    selectedChat,
    setSelectedChat,
  ] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const [
    loadingChat,
    setLoadingChat,
  ] = useState(false);

  const [
    submitting,
    setSubmitting,
  ] = useState(false);

  const [
    retryingMessageId,
    setRetryingMessageId,
  ] = useState(null);

  const [error, setError] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [
    showNewChat,
    setShowNewChat,
  ] = useState(false);

  const [newChat, setNewChat] =
    useState({
      title: "",
      category:
        "consumer_rights",
    });

  const [readinessModalOpen, setReadinessModalOpen] = useState(false);
  const [readinessData, setReadinessData] = useState(null);
  const [loadingReadiness, setLoadingReadiness] = useState(false);
  const [readinessError, setReadinessError] = useState("");

  const [actionPlanModalOpen, setActionPlanModalOpen] = useState(false);
  const [actionPlanData, setActionPlanData] = useState(null);
  const [loadingActionPlan, setLoadingActionPlan] = useState(false);
  const [actionPlanError, setActionPlanError] = useState("");

  const [handoffModalOpen, setHandoffModalOpen] = useState(false);
  const [handoffData, setHandoffData] = useState(null);
  const [loadingHandoff, setLoadingHandoff] = useState(false);
  const [handoffError, setHandoffError] = useState("");

  const [selectedSource, setSelectedSource] = useState(null);
  const [answerMode, setAnswerMode] = useState("simple");

  useEffect(() => {
    if (selectedChat?.answer_mode) {
      setAnswerMode(selectedChat.answer_mode);
    } else {
      setAnswerMode("simple");
    }
  }, [selectedChat]);

  async function handleToggleAnswerMode(newMode) {
    setAnswerMode(newMode);
    if (selectedChat) {
      try {
        await updateChat(selectedChat.id, { answer_mode: newMode });
        setSelectedChat((prev) => prev ? { ...prev, answer_mode: newMode } : null);
      } catch (err) {
        console.error("Could not update answer mode:", err);
      }
    }
  }


  async function handleOpenHandoff() {
    if (!selectedChat) return;
    setHandoffModalOpen(true);
    setLoadingHandoff(true);
    setHandoffError("");
    try {
      const data = await fetchSessionLawyerHandoff(selectedChat.id);
      setHandoffData(data);
    } catch (err) {
      setHandoffError(getApiErrorMessage(err, "Could not generate lawyer handoff pack."));
    } finally {
      setLoadingHandoff(false);
    }
  }



  async function handleOpenReadiness() {
    if (!selectedChat) return;
    setReadinessModalOpen(true);
    setLoadingReadiness(true);
    setReadinessError("");
    try {
      const data = await fetchSessionReadiness(selectedChat.id);
      setReadinessData(data);
    } catch (err) {
      setReadinessError(getApiErrorMessage(err, "Could not load case readiness assessment."));
    } finally {
      setLoadingReadiness(false);
    }
  }

  async function handleOpenActionPlan() {
    if (!selectedChat) return;
    setActionPlanModalOpen(true);
    setLoadingActionPlan(true);
    setActionPlanError("");
    try {
      const data = await fetchSessionActionPlan(selectedChat.id);
      setActionPlanData(data);
    } catch (err) {
      setActionPlanError(getApiErrorMessage(err, "Could not generate action plan."));
    } finally {
      setLoadingActionPlan(false);
    }
  }




  const bottomRef = useRef(null);

  useEffect(() => {
    loadChats();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [
    selectedChat?.messages,
    submitting,
  ]);

  async function loadChats() {
    setLoading(true);
    setError("");

    try {
      const data =
        await listChats();

      setChats(data);
    } catch (requestError) {
      setError(
        getApiErrorMessage(
          requestError,
          "Could not load chats."
        )
      );
    } finally {
      setLoading(false);
    }
  }

  async function openChat(
    chatId
  ) {
    setLoadingChat(true);
    setError("");

    try {
      const data =
        await getChat(chatId);

      setSelectedChat(data);
    } catch (requestError) {
      setError(
        getApiErrorMessage(
          requestError,
          "Could not load this chat."
        )
      );
    } finally {
      setLoadingChat(false);
    }
  }

  async function handleCreateChat(
    event
  ) {
    event.preventDefault();

    setError("");

    try {
      const created =
        await createChat({
          title:
            newChat.title.trim(),
          category:
            newChat.category,
        });

      setChats((current) => [
        created,
        ...current,
      ]);

      setNewChat({
        title: "",
        category:
          "consumer_rights",
      });

      setShowNewChat(false);

      await openChat(
        created.id
      );
    } catch (requestError) {
      setError(
        getApiErrorMessage(
          requestError,
          "Could not create chat."
        )
      );
    }
  }

  async function handleSend(
    event
  ) {
    event.preventDefault();

    const content =
      message.trim();

    if (
      !content ||
      !selectedChat ||
      submitting
    ) {
      return;
    }

    setMessage("");
    setSubmitting(true);
    setError("");

    const optimisticMessage = {
      id: `local-${Date.now()}`,
      session_id:
        selectedChat.id,
      role: "user",
      content,
      sources: [],
      status: "completed",
      created_at:
        new Date().toISOString(),
    };

    setSelectedChat(
      (current) => ({
        ...current,
        messages: [
          ...(current.messages ||
            []),
          optimisticMessage,
        ],
      })
    );

    try {
      const result =
        await sendChatMessage(
          selectedChat.id,
          content,
          answerMode
        );


      setSelectedChat(
        (current) => ({
          ...current,
          messages: [
            ...(current.messages ||
              []).filter(
              (item) =>
                item.id !==
                optimisticMessage.id
            ),
            result.user_message,
            result.assistant_message,
          ],
        })
      );

      await loadChats();
    } catch (requestError) {
      setSelectedChat(
        (current) => ({
          ...current,
          messages: (
            current.messages || []
          ).filter(
            (item) =>
              item.id !==
              optimisticMessage.id
          ),
        })
      );

      setMessage(content);

      setError(
        getApiErrorMessage(
          requestError,
          "Could not send your question."
        )
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function handleRetry(
    messageId
  ) {
    if (!selectedChat) {
      return;
    }

    setRetryingMessageId(
      messageId
    );

    setError("");

    try {
      const updated =
        await retryChatMessage(
          selectedChat.id,
          messageId
        );

      setSelectedChat(
        (current) => ({
          ...current,
          messages:
            current.messages.map(
              (item) =>
                item.id ===
                messageId
                  ? updated
                  : item
            ),
        })
      );
    } catch (requestError) {
      setError(
        getApiErrorMessage(
          requestError,
          "Could not retry this response."
        )
      );
    } finally {
      setRetryingMessageId(
        null
      );
    }
  }

  async function handleDeleteChat() {
    if (!selectedChat) {
      return;
    }

    const confirmed =
      window.confirm(
        "Delete this chat and its message history?"
      );

    if (!confirmed) {
      return;
    }

    try {
      await deleteChat(
        selectedChat.id
      );

      setChats((current) =>
        current.filter(
          (chat) =>
            chat.id !==
            selectedChat.id
        )
      );

      setSelectedChat(null);
    } catch (requestError) {
      setError(
        getApiErrorMessage(
          requestError,
          "Could not delete chat."
        )
      );
    }
  }

  const [mobileChatsOpen, setMobileChatsOpen] = useState(false);
  const [mobileActionsOpen, setMobileActionsOpen] = useState(false);


  return (
    <div className="flex min-h-[calc(100vh-73px)] lg:min-h-screen">
      {/* Desktop Sidebar */}
      <section aria-label="Legal Chat History" className="hidden w-72 shrink-0 border-r border-slate-200 bg-white md:block">
        <div className="border-b border-slate-100 p-4">
          <button
            type="button"
            onClick={() =>
              setShowNewChat(true)
            }
            className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none min-h-[44px]"
          >
            + New legal chat
          </button>
        </div>

        <div className="space-y-1 p-3 overflow-y-auto max-h-[calc(100vh-140px)]">
          {loading ? (
            <p className="p-3 text-sm text-slate-500">
              Loading chats...
            </p>
          ) : chats.length === 0 ? (
            <p className="p-3 text-sm leading-6 text-slate-500">
              No chats yet. Start a legal-information conversation.
            </p>
          ) : (
            chats.map((chat) => (
              <button
                key={chat.id}
                type="button"
                onClick={() =>
                  openChat(chat.id)
                }
                className={[
                  "w-full rounded-xl p-3 text-left transition focus:outline-none focus:ring-2 focus:ring-indigo-400 min-h-[44px]",
                  selectedChat?.id ===
                  chat.id
                    ? "bg-indigo-50 border border-indigo-200"
                    : "hover:bg-slate-50",
                ].join(" ")}
              >
                <div className="truncate text-sm font-medium text-slate-800">
                  {chat.title}
                </div>

                <div className="mt-1 text-xs text-slate-500">
                  {categoryLabel(
                    chat.category
                  )}
                </div>
              </button>
            ))
          )}
        </div>
      </section>

      {/* Mobile Chat Sessions Drawer Overlay */}
      {mobileChatsOpen && (
        <div className="fixed inset-0 z-50 md:hidden" aria-modal="true" role="dialog" aria-label="Chat Sessions">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setMobileChatsOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-white shadow-2xl p-4 flex flex-col animate-slide-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <h3 className="text-base font-bold text-slate-900">Legal Chats</h3>
              <button
                type="button"
                onClick={() => setMobileChatsOpen(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Close chat list"
              >
                ✕
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                setMobileChatsOpen(false);
                setShowNewChat(true);
              }}
              className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700 mb-3 min-h-[44px]"
            >
              + New legal chat
            </button>
            <div className="flex-1 overflow-y-auto space-y-1">
              {chats.map((chat) => (
                <button
                  key={chat.id}
                  type="button"
                  onClick={() => {
                    openChat(chat.id);
                    setMobileChatsOpen(false);
                  }}
                  className={[
                    "w-full rounded-xl p-3 text-left transition min-h-[44px]",
                    selectedChat?.id === chat.id
                      ? "bg-indigo-50 border border-indigo-200"
                      : "hover:bg-slate-50",
                  ].join(" ")}
                >
                  <div className="truncate text-sm font-medium text-slate-800">
                    {chat.title}
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    {categoryLabel(chat.category)}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Chat View Area */}
      <section className="flex min-w-0 flex-1 flex-col bg-mesh">
        <header className="flex flex-wrap items-center justify-between border-b border-slate-200 bg-white/90 backdrop-blur-xs px-4 py-3 sm:px-8 gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMobileChatsOpen(true)}
                className="rounded-lg border border-slate-300 p-2 text-xs font-semibold text-slate-700 md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Open chat history"
              >
                💬 Chats
              </button>
              <h1 className="truncate text-base sm:text-lg font-bold text-slate-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {selectedChat ? selectedChat.title : "Legal Chat"}
              </h1>
            </div>

            <p className="mt-0.5 text-xs text-slate-500 truncate">
              {selectedChat
                ? categoryLabel(
                    selectedChat.category
                  )
                : "Grounded Indian legal information"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                setShowNewChat(true)
              }
              className="rounded-xl border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 md:hidden min-h-[44px]"
            >
              + New
            </button>

            {selectedChat && (
              <div className="flex items-center gap-2">
                {/* Style Toggle (Always visible) */}
                <div className="flex items-center gap-0.5 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600">
                  <span className="px-1 text-slate-400 font-normal hidden sm:inline">Style:</span>
                  <button
                    type="button"
                    title="Short, practical guidance"
                    onClick={() => handleToggleAnswerMode("simple")}
                    className={`px-2.5 py-1.5 rounded-lg transition-colors min-h-[36px] ${
                      answerMode === "simple"
                        ? "bg-white text-indigo-700 shadow-2xs font-bold"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Simple
                  </button>
                  <button
                    type="button"
                    title="More legal explanation"
                    onClick={() => handleToggleAnswerMode("detailed")}
                    className={`px-2.5 py-1.5 rounded-lg transition-colors min-h-[36px] ${
                      answerMode === "detailed"
                        ? "bg-white text-indigo-700 shadow-2xs font-bold"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Detailed
                  </button>
                </div>

                {/* Desktop Buttons */}
                <div className="hidden md:flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleOpenHandoff}
                    className="rounded-xl border border-purple-300 bg-purple-700 px-3.5 py-2 text-xs font-semibold text-white hover:bg-purple-800 flex items-center gap-1.5 shadow-2xs min-h-[44px]"
                  >
                    💼 Lawyer Handoff
                  </button>
                  <button
                    type="button"
                    onClick={handleOpenActionPlan}
                    className="rounded-xl border border-indigo-300 bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-indigo-700 flex items-center gap-1.5 shadow-2xs min-h-[44px]"
                  >
                    🎯 Action Plan
                  </button>
                  <button
                    type="button"
                    onClick={handleOpenReadiness}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 shadow-2xs min-h-[44px]"
                  >
                    📋 Case Readiness
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteChat}
                    className="rounded-xl border border-red-200 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 min-h-[44px]"
                  >
                    Delete
                  </button>
                </div>

                {/* Mobile Dropdown for Actions */}
                <div className="relative md:hidden">
                  <button
                    type="button"
                    onClick={() => setMobileActionsOpen(!mobileActionsOpen)}
                    className="rounded-xl border border-indigo-300 bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-700 min-h-[44px] flex items-center gap-1"
                    aria-expanded={mobileActionsOpen}
                    aria-label="More actions"
                  >
                    ⚡ Actions ▼
                  </button>
                  {mobileActionsOpen && (
                    <div
                      className="absolute right-0 top-12 z-30 w-52 rounded-xl bg-white p-2 shadow-xl border border-slate-200 space-y-1 animate-fade-in"
                      onClick={() => setMobileActionsOpen(false)}
                    >
                      <button
                        type="button"
                        onClick={handleOpenHandoff}
                        className="w-full text-left rounded-lg px-3 py-2.5 text-xs font-semibold text-purple-900 hover:bg-purple-50 flex items-center gap-2"
                      >
                        💼 Lawyer Handoff
                      </button>
                      <button
                        type="button"
                        onClick={handleOpenActionPlan}
                        className="w-full text-left rounded-lg px-3 py-2.5 text-xs font-semibold text-indigo-900 hover:bg-indigo-50 flex items-center gap-2"
                      >
                        🎯 Action Plan
                      </button>
                      <button
                        type="button"
                        onClick={handleOpenReadiness}
                        className="w-full text-left rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-100 flex items-center gap-2"
                      >
                        📋 Case Readiness
                      </button>
                      <div className="border-t border-slate-100 my-1" />
                      <button
                        type="button"
                        onClick={handleDeleteChat}
                        className="w-full text-left rounded-lg px-3 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        🗑 Delete Chat
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </header>

        {error && (
          <div
            role="alert"
            className="border-b border-red-200 bg-red-50 px-5 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {!selectedChat ? (
          <div className="flex flex-1 items-center justify-center p-8">
            <div className="max-w-lg text-center">
              <div className="text-4xl">
                ⚖
              </div>

              <h3 className="mt-5 text-2xl font-semibold text-slate-950">
                Ask about your legal
                rights
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Choose a legal category
                and start a conversation.
                Answers are grounded in
                the application's
                authoritative legal
                knowledge base.
              </p>

              <button
                type="button"
                onClick={() =>
                  setShowNewChat(true)
                }
                className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Start a legal chat
              </button>
            </div>
          </div>
        ) : loadingChat ? (
          <div className="flex flex-1 items-center justify-center text-sm text-slate-500">
            Loading conversation...
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">
              <div className="mx-auto max-w-4xl space-y-5">
                {selectedChat.messages
                  ?.length === 0 && (
                  <div className="py-16 text-center">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Start your
                      conversation
                    </h3>

                    <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">
                      Describe the
                      situation and ask a
                      specific question.
                      Do not include
                      unnecessary private
                      information.
                    </p>
                  </div>
                )}

                {selectedChat.messages?.map(
                  (item) => (
                    <Message
                      key={item.id}
                      message={item}
                      onRetry={
                        handleRetry
                      }
                      retrying={
                        retryingMessageId ===
                        item.id
                      }
                      onSelectOption={
                        (opt) => setMessage(opt)
                      }
                      onSelectSource={
                        (src) => setSelectedSource(src)
                      }
                    />
                  )
                )}

                {submitting && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-500 shadow-sm">
                      Reviewing relevant
                      legal sources...
                    </div>
                  </div>
                )}

                <div
                  ref={bottomRef}
                />
              </div>
            </div>

            <div className="border-t border-slate-200 bg-white p-4">
              <form
                onSubmit={
                  handleSend
                }
                className="mx-auto flex max-w-4xl gap-3 items-end"
              >
                <div className="flex-1">
                  <label htmlFor="chat-composer-input" className="sr-only">
                    Ask a legal-information question
                  </label>
                  <textarea
                    id="chat-composer-input"
                    rows={2}
                    maxLength={10000}
                    value={message}
                    disabled={submitting}
                    onChange={(event) =>
                      setMessage(
                        event.target
                          .value
                      )
                    }
                    placeholder="Ask a legal-information question..."
                    className="min-h-[58px] w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 disabled:bg-slate-50"
                  />
                </div>

                <button
                  type="submit"
                  aria-label="Send legal question"
                  disabled={
                    submitting ||
                    !message.trim()
                  }
                  className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px] min-w-[44px] flex items-center justify-center shadow-2xs"
                >
                  Send
                </button>
              </form>

              <p className="mx-auto mt-2 max-w-4xl text-xs text-slate-400">
                General legal information only — not legal advice.
              </p>
            </div>
          </>
        )}
      </section>

      {showNewChat && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-xs animate-fade-in"
          onClick={() => setShowNewChat(false)}
        >
          <form
            role="dialog"
            aria-modal="true"
            aria-labelledby="new-chat-title"
            onClick={(e) => e.stopPropagation()}
            onSubmit={
              handleCreateChat
            }
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-slate-200 outline-none"
          >
            <h3 id="new-chat-title" className="text-xl font-semibold text-slate-950">
              New legal chat
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Select the category that best matches your question.
            </p>


            <div className="mt-6">
              <label htmlFor="new-chat-title-input" className="mb-2 block text-sm font-medium text-slate-700">
                Chat title
              </label>

              <input
                id="new-chat-title-input"
                required
                minLength={1}
                maxLength={150}
                value={
                  newChat.title
                }
                onChange={(event) =>
                  setNewChat(
                    (current) => ({
                      ...current,
                      title:
                        event.target
                          .value,
                    })
                  )
                }
                placeholder="e.g. Defective product refund"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            <div className="mt-5">
              <label htmlFor="new-chat-category-select" className="mb-2 block text-sm font-medium text-slate-700">
                Legal category
              </label>

              <select
                id="new-chat-category-select"
                value={
                  newChat.category
                }
                onChange={(event) =>
                  setNewChat(
                    (current) => ({
                      ...current,
                      category:
                        event.target
                          .value,
                    })
                  )
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              >
                {CATEGORIES.map(
                  (category) => (
                    <option
                      key={
                        category.value
                      }
                      value={
                        category.value
                      }
                    >
                      {
                        category.label
                      }
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="mt-7 flex justify-end gap-3">
              <button
                type="button"
                onClick={() =>
                  setShowNewChat(false)
                }
                className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Create chat
              </button>
            </div>
          </form>
        </div>
      )}

      <CaseReadinessModal
        isOpen={readinessModalOpen}
        onClose={() => setReadinessModalOpen(false)}
        readiness={readinessData}
        loading={loadingReadiness}
        error={readinessError}
      />

      <ActionPlanModal
        isOpen={actionPlanModalOpen}
        onClose={() => setActionPlanModalOpen(false)}
        plan={actionPlanData}
        loading={loadingActionPlan}
        error={actionPlanError}
      />

      <LawyerHandoffModal
        isOpen={handoffModalOpen}
        onClose={() => setHandoffModalOpen(false)}
        handoff={handoffData}
        loading={loadingHandoff}
        error={handoffError}
        sessionId={selectedChat?.id}
      />

      <SourceDetailsModal
        isOpen={!!selectedSource}
        onClose={() => setSelectedSource(null)}
        source={selectedSource}
      />
    </div>
  );
}


