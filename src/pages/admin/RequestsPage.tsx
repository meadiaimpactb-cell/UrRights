import { trpc } from "@/providers/trpc";
import { useAdminT, TOPIC_LABELS } from "./adminShared";

const STATUS_TINT: Record<string, string> = {
  new: "bg-rose-500/10 text-rose-600",
  in_progress: "bg-amber-500/10 text-amber-600",
  closed: "bg-[#2e9c6a]/10 text-[#2e9c6a]",
};

export default function RequestsPage() {
  const { at, al } = useAdminT();
  const utils = trpc.useUtils();
  const requests = trpc.requests.list.useQuery(undefined, { refetchInterval: 10000 });
  const setStatus = trpc.requests.setStatus.useMutation({
    onSuccess: () => utils.requests.list.invalidate(),
  });
  const remove = trpc.requests.remove.useMutation({
    onSuccess: () => utils.requests.list.invalidate(),
  });

  const rows = requests.data ?? [];

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-3xl font-black">{at("req.title")}</h1>
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
                    {r.phone || "—"} · {new Date(r.createdAt).toLocaleDateString(al === "ar" ? "ar-SA" : "en-GB")}
                  </div>
                </div>
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
              <p className="text-stone-600 leading-relaxed bg-stone-50 rounded-2xl px-4 py-3" dir="auto">
                {r.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
