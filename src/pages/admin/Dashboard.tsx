import { trpc } from "@/providers/trpc";
import { useAdminT, TOPIC_LABELS } from "./adminShared";
import { Link } from "react-router";

export default function Dashboard() {
  const { at, al } = useAdminT();
  const utils = trpc.useUtils();

  const stats = trpc.chat.stats.useQuery(undefined, { refetchInterval: 8000 });
  const requests = trpc.requests.list.useQuery(undefined, { refetchInterval: 10000 });
  const langs = trpc.languages.listAll.useQuery();
  const settingsAll = trpc.settings.all.useQuery();

  const setSetting = trpc.settings.set.useMutation({
    onSuccess: () => utils.settings.all.invalidate(),
  });

  const all = requests.data ?? [];
  const newCount = all.filter((r) => r.status === "new").length;
  const chatEnabled = (settingsAll.data?.chat_enabled ?? "true") === "true";

  const cards = [
    { label: at("dash.newRequests"), value: newCount, tint: "bg-rose-500/10 text-rose-600" },
    { label: at("dash.totalRequests"), value: all.length, tint: "bg-amber-500/10 text-amber-600" },
    { label: at("dash.waitingChats"), value: stats.data?.waiting ?? 0, tint: "bg-[#2fa3c4]/10 text-[#17788f]" },
    { label: at("dash.activeChats"), value: stats.data?.active ?? 0, tint: "bg-[#5cb98b]/10 text-[#2e9c6a]" },
    { label: at("dash.languages"), value: langs.data?.filter((l) => l.enabled).length ?? 0, tint: "bg-violet-500/10 text-violet-600" },
  ];

  return (
    <div className="max-w-5xl space-y-6">
      <h1 className="text-3xl font-black">{at("dash.title")}</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
        {cards.map((c) => (
          <div key={c.label} className="bg-white rounded-3xl border border-stone-200 p-5 shadow-soft">
            <span className={`inline-grid place-items-center w-11 h-11 rounded-2xl text-xl font-black mb-2 ${c.tint}`}>
              {c.value}
            </span>
            <div className="font-bold text-stone-500 text-sm">{c.label}</div>
          </div>
        ))}
      </div>

      {/* chat availability toggle */}
      <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-soft flex items-center justify-between gap-4">
        <div>
          <div className="font-black text-lg">{at("dash.chatToggle")}</div>
          <div className="text-sm text-stone-400">{chatEnabled ? at("dash.chatOn") : at("dash.chatOff")}</div>
        </div>
        <button
          onClick={() => setSetting.mutate({ key: "chat_enabled", value: chatEnabled ? "false" : "true" })}
          className={`relative w-16 h-9 rounded-full transition-colors ${chatEnabled ? "bg-[#2e9c6a]" : "bg-stone-300"}`}
          aria-label="toggle chat"
        >
          <span
            className={`absolute top-1 w-7 h-7 rounded-full bg-white shadow transition-all ${
              chatEnabled ? "inset-inline-end-1 end-1" : "start-1"
            }`}
          />
        </button>
      </div>

      {/* recent requests */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-soft overflow-hidden">
        <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between">
          <h2 className="font-black text-lg">{at("dash.recentRequests")}</h2>
          <Link to="/admin/requests" className="text-sm font-bold text-[#17788f]">
            {at("nav.requests")} ←
          </Link>
        </div>
        {all.length === 0 ? (
          <p className="p-6 text-stone-400">{at("dash.noRequests")}</p>
        ) : (
          <ul className="divide-y divide-stone-100">
            {all.slice(0, 6).map((r) => (
              <li key={r.id} className="px-5 py-3.5 flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-stone-100 grid place-items-center font-black text-stone-500 shrink-0">
                  {r.name.charAt(0)}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="font-bold truncate">{r.name}</div>
                  <div className="text-xs text-stone-400 truncate">{r.message}</div>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-stone-100 text-stone-500 shrink-0">
                  {TOPIC_LABELS[r.topic]?.[al] ?? r.topic}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
