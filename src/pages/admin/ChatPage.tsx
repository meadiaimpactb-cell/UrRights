import { useEffect, useRef, useState } from "react";
import { trpc } from "@/providers/trpc";
import { useAdminT } from "./adminShared";
import { IconSend } from "@/site/icons";
import type { ChatMessage, ChatSession } from "@db/schema";

type Tab = "waiting" | "mine" | "closed";

export default function ChatPage() {
  const { at, al, adir } = useAdminT();
  const utils = trpc.useUtils();
  const agentLang = al; // agent works in the dashboard language (ar/en)

  const [tab, setTab] = useState<Tab>("waiting");
  const [selected, setSelected] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const lastIdRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const queue = trpc.chat.queue.useQuery(undefined, { refetchInterval: 4000 });

  const claim = trpc.chat.claim.useMutation({
    onSuccess: (_d, vars) => {
      utils.chat.queue.invalidate();
      // open the session right after claiming
      const s = queue.data?.waiting.find((w) => w.id === vars.sessionId);
      if (s) openSession({ ...s, status: "active", agentName: queue.data?.me.name ?? "" });
    },
  });

  const send = trpc.chat.agentSend.useMutation({
    onSuccess: () => poll.refetch(),
  });

  const setTranslate = trpc.chat.setTranslate.useMutation({
    onSuccess: (_d, vars) => {
      utils.chat.queue.invalidate();
      setSelected((s) => (s ? { ...s, translateEnabled: vars.enabled } : s));
    },
  });

  const close = trpc.chat.closeByAgent.useMutation({
    onSuccess: () => {
      utils.chat.queue.invalidate();
      setSelected(null);
      setMessages([]);
    },
  });

  const poll = trpc.chat.agentPoll.useQuery(
    { sessionId: selected?.id ?? 0, afterId: lastIdRef.current },
    { enabled: selected != null, refetchInterval: 2500 },
  );

  useEffect(() => {
    const data = poll.data;
    if (!data || !selected) return;
    if (data.messages.length > 0) {
      lastIdRef.current = Math.max(...data.messages.map((m) => m.id));
      setMessages((prev) => {
        const ids = new Set(prev.map((m) => m.id));
        return [...prev, ...data.messages.filter((m) => !ids.has(m.id))];
      });
    }
    if (data.session.status === "closed" && selected.status !== "closed") {
      setSelected({ ...selected, status: "closed" });
    }
  }, [poll.data, selected]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages.length]);

  function openSession(s: ChatSession) {
    setSelected(s);
    setMessages([]);
    lastIdRef.current = 0;
    setDraft("");
  }

  const lists: Record<Tab, ChatSession[]> = {
    waiting: queue.data?.waiting ?? [],
    mine: queue.data?.mine ?? [],
    closed: queue.data?.closed ?? [],
  };

  return (
    <div className="h-[calc(100vh-9.5rem)] lg:h-[calc(100vh-7rem)] flex flex-col">
      <h1 className="text-2xl font-black mb-4">{at("chat.title")}</h1>

      <div className="flex-1 min-h-0 grid lg:grid-cols-[300px_1fr] gap-4">
        {/* sessions list */}
        <div className={`bg-white rounded-3xl border border-stone-200 shadow-soft flex-col min-h-0 overflow-hidden ${selected ? "hidden lg:flex" : "flex"}`}>
          <div className="flex border-b border-stone-100">
            {(["waiting", "mine", "closed"] as Tab[]).map((tb) => (
              <button
                key={tb}
                onClick={() => setTab(tb)}
                className={`flex-1 py-3 text-sm font-black transition-colors ${
                  tab === tb ? "text-[#17788f] border-b-2 border-[#2fa3c4]" : "text-stone-400"
                }`}
              >
                {at(`chat.${tb}`)}
                {tb === "waiting" && lists.waiting.length > 0 && (
                  <span className="ms-1.5 px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px]">
                    {lists.waiting.length}
                  </span>
                )}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto">
            {lists[tab].length === 0 ? (
              <p className="p-6 text-center text-stone-300 text-sm font-bold">{at("chat.empty")}</p>
            ) : (
              lists[tab].map((s) => (
                <div
                  key={s.id}
                  className={`w-full px-4 py-3.5 border-b border-stone-50 flex items-center gap-3 hover:bg-stone-50 cursor-pointer ${
                    selected?.id === s.id ? "bg-[#2fa3c4]/5" : ""
                  }`}
                  onClick={() => tab === "waiting" ? undefined : openSession(s)}
                >
                  <span className="w-10 h-10 rounded-2xl bg-stone-100 grid place-items-center font-black text-stone-500 shrink-0">
                    {s.visitorName.charAt(0)}
                  </span>
                  <div className="flex-1 min-w-0 text-start">
                    <div className="font-bold truncate">{s.visitorName}</div>
                    <div className="text-xs text-stone-400">
                      {at("chat.visitorLang")}: <b dir="ltr">{s.visitorLang}</b>
                      {tab !== "waiting" && s.agentName ? ` · ${s.agentName}` : ""}
                    </div>
                  </div>
                  {tab === "waiting" && (
                    <button
                      onClick={() => claim.mutate({ sessionId: s.id, agentLang })}
                      disabled={claim.isPending}
                      className="px-3.5 py-2 rounded-xl bg-grad-brand-deep text-white text-xs font-black shrink-0 disabled:opacity-60"
                    >
                      {at("chat.pick")}
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* conversation */}
        <div className={`bg-white rounded-3xl border border-stone-200 shadow-soft flex-col min-h-0 overflow-hidden ${selected ? "flex" : "hidden lg:flex"}`}>
          {!selected ? (
            <div className="flex-1 grid place-items-center text-stone-300 font-bold p-6 text-center">
              {at("chat.selectHint")}
            </div>
          ) : (
            <>
              {/* convo header */}
              <div className="px-5 py-3.5 border-b border-stone-100 flex items-center gap-3 flex-wrap">
                <button className="lg:hidden text-stone-400 font-black" onClick={() => setSelected(null)}>
                  →
                </button>
                <span className="w-10 h-10 rounded-2xl bg-stone-100 grid place-items-center font-black text-stone-500">
                  {selected.visitorName.charAt(0)}
                </span>
                <div className="flex-1 min-w-[100px]">
                  <div className="font-black">{selected.visitorName}</div>
                  <div className="text-xs text-stone-400" dir="ltr">{selected.visitorLang} ↔ {selected.agentLang}</div>
                </div>
                <label className="flex items-center gap-2 text-xs font-bold text-stone-500 cursor-pointer">
                  <button
                    onClick={() => setTranslate.mutate({ sessionId: selected.id, enabled: !selected.translateEnabled })}
                    className={`relative w-11 h-6 rounded-full transition-colors ${selected.translateEnabled ? "bg-[#2e9c6a]" : "bg-stone-300"}`}
                    aria-label="translate"
                  >
                    <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${selected.translateEnabled ? "end-0.5" : "start-0.5"}`} />
                  </button>
                  {at("chat.translate")}
                </label>
                {selected.status === "active" && (
                  <button
                    onClick={() => close.mutate({ sessionId: selected.id })}
                    className="px-3.5 py-2 rounded-xl bg-rose-50 text-rose-500 text-xs font-black"
                  >
                    {at("chat.close")}
                  </button>
                )}
              </div>

              {/* messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#faf8f2]">
                {messages.map((m) => {
                  if (m.sender === "system") {
                    return (
                      <div key={m.id} className="text-center">
                        <span className="inline-block px-3.5 py-1 rounded-full bg-[#5cb98b]/15 text-[#2e9c6a] text-xs font-bold">
                          {m.text}
                        </span>
                      </div>
                    );
                  }
                  const own = m.sender === "agent";
                  const primary = own ? m.text : m.translatedText ?? m.text;
                  const secondary = own ? m.translatedText : m.translatedText ? m.text : null;
                  return (
                    <div key={m.id} className={`flex ${own ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] px-4 py-2.5 text-[15px] leading-relaxed shadow-soft ${
                          own
                            ? "bg-grad-brand text-white rounded-3xl rounded-br-md"
                            : "bg-white border border-stone-200 rounded-3xl rounded-bl-md"
                        }`}
                      >
                        <div dir="auto">{primary}</div>
                        {secondary && (
                          <div className={`mt-1 pt-1 border-t text-xs ${own ? "border-white/25 text-white/75" : "border-stone-100 text-stone-400"}`}>
                            <span className="font-bold">{at("chat.original")}: </span>
                            <span dir="auto">{secondary}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* input */}
              {selected.status === "active" ? (
                <form
                  className="p-3 border-t border-stone-100 flex items-center gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const text = draft.trim();
                    if (!text) return;
                    setDraft("");
                    send.mutate({ sessionId: selected.id, text });
                  }}
                >
                  <input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder={at("chat.placeholder")}
                    className="flex-1 px-4 py-3 rounded-2xl border-2 border-stone-200 focus:border-[#2fa3c4] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-12 h-12 shrink-0 rounded-2xl bg-grad-brand-deep text-white grid place-items-center"
                    aria-label="send"
                  >
                    <IconSend size={20} style={adir === "rtl" ? { transform: "scaleX(-1)" } : undefined} />
                  </button>
                </form>
              ) : (
                <div className="p-3.5 border-t border-stone-100 text-center text-sm font-bold text-stone-400">
                  {at("chat.closed")}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
