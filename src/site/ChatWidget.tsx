import { useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "@/i18n";
import { trpc } from "@/providers/trpc";
import { IconChat, IconSend, IconWhatsapp, IconX } from "./icons";

type Msg = {
  id: number;
  sender: "visitor" | "agent" | "system";
  text: string;
  translatedText: string | null;
};

const LS_CHAT = "yr_chat_session";

export function ChatWidget({
  open,
  onClose,
  whatsapp,
}: {
  open: boolean;
  onClose: () => void;
  whatsapp: string;
}) {
  const { t, lang, dir } = useI18n();
  const [sessionId, setSessionId] = useState<number | null>(() => {
    const v = localStorage.getItem(LS_CHAT);
    return v ? parseInt(v) : null;
  });
  const [name, setName] = useState("");
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [status, setStatus] = useState<string>("waiting");
  const lastIdRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const availability = trpc.chat.availability.useQuery(undefined, {
    refetchInterval: 30_000,
  });

  const startMut = trpc.chat.start.useMutation({
    onSuccess: (d) => {
      setSessionId(d.sessionId);
      localStorage.setItem(LS_CHAT, String(d.sessionId));
      setMessages([]);
      lastIdRef.current = 0;
      setStatus("waiting");
    },
  });

  const sendMut = trpc.chat.send.useMutation();

  const pollQuery = trpc.chat.poll.useQuery(
    { sessionId: sessionId ?? 0, afterId: lastIdRef.current },
    {
      enabled: open && sessionId != null,
      refetchInterval: 2500,
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    const data = pollQuery.data;
    if (!data) return;
    setStatus(data.session.status);
    if (data.messages.length > 0) {
      const fresh: Msg[] = data.messages.map((m) => ({
        id: m.id,
        sender: m.sender,
        text: m.text,
        translatedText: m.translatedText,
      }));
      lastIdRef.current = Math.max(...fresh.map((m) => m.id));
      setMessages((prev) => {
        const ids = new Set(prev.map((m) => m.id));
        return [...prev, ...fresh.filter((m) => !ids.has(m.id))];
      });
    }
  }, [pollQuery.data]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages.length, status]);

  const reset = () => {
    localStorage.removeItem(LS_CHAT);
    setSessionId(null);
    setMessages([]);
    lastIdRef.current = 0;
    setDraft("");
    setName("");
  };

  const online = availability.data?.enabled ?? true;
  const bubbleOther = useMemo(() => dir === "rtl" ? "text-right" : "text-left", [dir]);

  if (!open) return null;

  const renderBody = () => {
    if (!online) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 gap-4">
          <span className="w-16 h-16 rounded-full bg-stone-100 grid place-items-center text-stone-400">
            <IconChat size={30} />
          </span>
          <p className="font-bold text-xl text-[#22312c]">{t("chat.offline")}</p>
          <p className="text-stone-500 leading-relaxed">{t("chat.offlineText")}</p>
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#22b358] text-white font-bold"
          >
            <IconWhatsapp size={22} />
            {t("hero.ctaWhatsapp")}
          </a>
        </div>
      );
    }

    if (sessionId == null) {
      return (
        <div className="flex-1 flex flex-col justify-center p-6 gap-4">
          <p className="text-stone-600 text-lg leading-relaxed">{t("chat.welcome")}</p>
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (name.trim()) startMut.mutate({ name: name.trim(), lang });
            }}
          >
            <label className="block font-bold text-[#22312c]">{t("chat.namePrompt")}</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl border-2 border-stone-200 text-lg focus:border-[#2fa3c4] focus:outline-none"
              required
            />
            <button
              type="submit"
              disabled={startMut.isPending}
              className="w-full py-4 rounded-2xl bg-grad-brand-deep text-white text-lg font-bold shadow-lift disabled:opacity-60"
            >
              {startMut.isPending ? "…" : t("chat.start")}
            </button>
          </form>
        </div>
      );
    }

    if (status === "closed") {
      return (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 gap-4">
          <p className="text-stone-500 text-lg leading-relaxed">{t("chat.ended")}</p>
          <button
            onClick={reset}
            className="px-6 py-3.5 rounded-2xl bg-grad-brand-deep text-white font-bold"
          >
            {t("chat.start")}
          </button>
        </div>
      );
    }

    return (
      <>
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
          {status === "waiting" && (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <span className="flex gap-1.5">
                <span className="typing-dot w-2.5 h-2.5 rounded-full bg-[#2fa3c4]" />
                <span className="typing-dot w-2.5 h-2.5 rounded-full bg-[#2fa3c4]" />
                <span className="typing-dot w-2.5 h-2.5 rounded-full bg-[#2fa3c4]" />
              </span>
              <p className="text-stone-400 font-semibold">{t("chat.waiting")}</p>
            </div>
          )}
          {messages.map((m) => {
            if (m.sender === "system") {
              return (
                <div key={m.id} className="text-center">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-[#5cb98b]/15 text-[#2e9c6a] text-sm font-bold">
                    {t("chat.agentJoined", { name: m.text })}
                  </span>
                </div>
              );
            }
            const own = m.sender === "visitor";
            const shown = own ? m.text : m.translatedText ?? m.text;
            return (
              <div key={m.id} className={`flex ${own ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[82%] px-4 py-3 text-[17px] leading-relaxed shadow-soft ${
                    own
                      ? "bg-grad-brand text-white rounded-3xl rounded-br-md"
                      : `bg-white border border-[#e7e3d3] text-[#22312c] rounded-3xl rounded-bl-md ${bubbleOther}`
                  }`}
                  dir="auto"
                >
                  {shown}
                </div>
              </div>
            );
          })}
        </div>
        <form
          className="p-3 border-t border-[#e7e3d3] flex items-center gap-2 bg-white"
          onSubmit={(e) => {
            e.preventDefault();
            const text = draft.trim();
            if (!text || sessionId == null) return;
            setDraft("");
            sendMut.mutate({ sessionId, text });
          }}
        >
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={t("chat.placeholder")}
            className="flex-1 px-4 py-3.5 rounded-2xl border-2 border-stone-200 focus:border-[#2fa3c4] focus:outline-none text-[17px]"
            dir="auto"
          />
          <button
            type="submit"
            aria-label="send"
            className="w-13 h-13 w-[52px] h-[52px] shrink-0 rounded-2xl bg-grad-brand-deep text-white grid place-items-center active:scale-95 transition"
          >
            <IconSend size={22} style={dir === "rtl" ? { transform: "scaleX(-1)" } : undefined} />
          </button>
        </form>
      </>
    );
  };

  return (
    <div className="fixed z-[60] bottom-24 end-4 sm:end-6 w-[calc(100vw-2rem)] max-w-md">
      <div className="bg-[#fbfaf6] squircle border border-[#e7e3d3] shadow-lift overflow-hidden flex flex-col h-[min(600px,72vh)] anim-rise">
        <div className="bg-grad-brand-deep text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/assets/logo-icon.png" alt="" className="w-9 h-9 rounded-xl bg-white p-0.5 object-contain" />
            <div>
              <div className="font-bold leading-tight">{t("chat.title")}</div>
              <div className="text-xs text-white/80 flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${online ? "bg-emerald-300" : "bg-stone-300"}`} />
                {online ? t("chat.online") : t("chat.offline")}
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-white/15" aria-label="close">
            <IconX size={20} />
          </button>
        </div>
        {renderBody()}
      </div>
    </div>
  );
}
