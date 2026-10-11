import { useState } from "react";
import { trpc } from "@/providers/trpc";
import { useAdminT, TOPIC_LABELS } from "./adminShared";
import { formatWhatsapp, isWhatsappReady, waLink } from "@/lib/site";
import { IconWhatsapp } from "@/site/icons";

const STATUS_TINT: Record<string, string> = {
  new: "bg-rose-500/10 text-rose-600",
  in_progress: "bg-amber-500/10 text-amber-600",
  closed: "bg-[#2e9c6a]/10 text-[#2e9c6a]",
};

type Filter = "all" | "new" | "in_progress" | "closed";

/** إجابات الاستبيان محفوظة كـ JSON؛ أي تلف في البيانات لا يكسر الصفحة. */
function parseAnswers(raw: string | null): { q: string; a: string }[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x) => x && x.q && x.a) : [];
  } catch {
    return [];
  }
}

export default function RequestsPage() {
  const { at, al } = useAdminT();
  const [filter, setFilter] = useState<Filter>("all");
  const utils = trpc.useUtils();
  const requests = trpc.requests.list.useQuery(undefined, { refetchInterval: 10000 });
  const setStatus = trpc.requests.setStatus.useMutation({
    onSuccess: () => utils.requests.list.invalidate(),
  });
  const remove = trpc.requests.remove.useMutation({
    onSuccess: () => utils.requests.list.invalidate(),
  });

  const all = requests.data ?? [];
  const rows = filter === "all" ? all : all.filter((r) => r.status === filter);
  const countOf = (f: Filter) => (f === "all" ? all.length : all.filter((r) => r.status === f).length);

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-3xl font-black">{at("req.title")}</h1>

      {/* تصفية حسب الحالة — الطلبات الجديدة أولًا */}
      <div className="flex flex-wrap gap-2">
        {(["all", "new", "in_progress", "closed"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-2xl text-sm font-black border-2 transition ${
              filter === f
                ? "border-[#2fa3c4] bg-[#2fa3c4]/10 text-[#17788f]"
                : "border-stone-200 text-stone-400 hover:border-stone-300"
            }`}
          >
            {f === "all" ? at("req.filter.all") : at(`req.status.${f}`)}
            <span className="ms-1.5 text-xs opacity-60">{countOf(f)}</span>
          </button>
        ))}
      </div>

      {rows.length === 0 ? (
        <p className="text-stone-400 bg-white rounded-3xl border border-stone-200 p-8 text-center">
          {at("req.empty")}
        </p>
      ) : (
        <div className="space-y-3">
          {rows.map((r) => (
            <div key={r.id} className="bg-white rounded-3xl border border-stone-200 p-5 shadow-soft">
              <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                <span className="w-10 h-10 rounded-2xl bg-stone-100 grid place-items-center font-black text-stone-500">
                  {r.name.charAt(0)}
                </span>
                <div className="flex-1 min-w-[120px]">
                  <div className="font-black">{r.name}</div>
                  <div className="text-xs text-stone-400" dir="ltr">
                    {isWhatsappReady(r.phone) ? formatWhatsapp(r.phone) : r.phone || "—"}
                    {" · "}
                    {new Date(r.createdAt).toLocaleString(al === "ar" ? "ar-SA" : "en-GB", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </div>
                </div>
                {/* تواصل مباشر مع صاحب الطلب */}
                {isWhatsappReady(r.phone) && (
                  <a
                    href={waLink(r.phone)}
                    target="_blank"
                    rel="noreferrer"
                    title="WhatsApp"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#22b358]/10 text-[#1b8f47] text-xs font-black hover:bg-[#22b358]/20 transition-colors"
                  >
                    <IconWhatsapp size={15} />
                    {at("req.contact")}
                  </a>
                )}
                <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#2fa3c4]/10 text-[#17788f]">
                  {TOPIC_LABELS[r.topic]?.[al] ?? r.topic}
                </span>
                <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-stone-100 text-stone-500" dir="ltr">
                  {r.lang}
                </span>
                <select
                  value={r.status}
                  onChange={(e) => setStatus.mutate({ id: r.id, status: e.target.value as typeof r.status })}
                  className={`text-sm font-bold px-3 py-2 rounded-full border-0 cursor-pointer ${STATUS_TINT[r.status]}`}
                >
                  <option value="new">{at("req.status.new")}</option>
                  <option value="in_progress">{at("req.status.in_progress")}</option>
                  <option value="closed">{at("req.status.closed")}</option>
                </select>
                <button
                  onClick={() => confirm(at("common.delete") + "?") && remove.mutate({ id: r.id })}
                  className="text-stone-300 hover:text-rose-500 font-bold"
                >
                  ✕
                </button>
              </div>
              {/* إجابات الاستبيان كما اختارها الزائر وقت الإرسال */}
              {r.answers && (
                <div className="mb-2.5 grid sm:grid-cols-2 gap-2">
                  {parseAnswers(r.answers).map((qa, i) => (
                    <div key={i} className="rounded-xl bg-[#2fa3c4]/5 border border-[#2fa3c4]/20 px-3.5 py-2">
                      <div className="text-xs text-stone-500" dir="auto">{qa.q}</div>
                      <div className="font-bold text-[#17788f]" dir="auto">{qa.a}</div>
                    </div>
                  ))}
                </div>
              )}

              {r.area && (
                <p className="mb-2.5 text-sm text-stone-500" dir="auto">
                  <b>{at("req.area")}:</b> {r.area}
                </p>
              )}

              {r.message && (
                <p className="text-stone-600 leading-relaxed bg-stone-50 rounded-2xl px-4 py-3" dir="auto">
                  {r.message}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
