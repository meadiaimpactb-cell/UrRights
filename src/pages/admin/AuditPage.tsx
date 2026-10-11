import { useState } from "react";
import { trpc } from "@/providers/trpc";
import { useAdminT } from "./adminShared";
import { IconBook } from "@/site/icons";

/** لون شارة الإجراء حسب نوعه — ضمن ألوان الهوية. */
function actionTint(action: string): string {
  if (action.startsWith("user.login") || action.startsWith("user.logout"))
    return "bg-[#2fa3c4]/10 text-[#17788f]";
  if (action.includes("delete") || action.includes("suspend")) return "bg-rose-500/10 text-rose-600";
  if (action.includes("permission") || action.includes("password"))
    return "bg-amber-500/10 text-amber-700";
  return "bg-[#5cb98b]/15 text-[#2e9c6a]";
}

export default function AuditPage() {
  const { at, al } = useAdminT();
  const [filters, setFilters] = useState({
    q: "",
    action: "",
    userId: null as number | null,
    from: "",
    to: "",
    sensitiveOnly: false,
    limit: 100,
  });

  const log = trpc.admin.auditLog.useQuery(filters, { refetchInterval: 30_000 });
  const meta = trpc.admin.auditFilters.useQuery();

  const rows = log.data?.rows ?? [];
  const total = log.data?.total ?? 0;
  const inputCls =
    "px-3.5 py-2.5 rounded-xl border-2 border-stone-200 focus:border-[#2fa3c4] focus:outline-none bg-white text-sm";

  return (
    <div className="max-w-6xl space-y-6">
      <div>
        <h1 className="text-3xl font-black flex items-center gap-2.5">
          <IconBook size={26} className="text-[#2fa3c4]" />
          {at("audit.title")}
        </h1>
        <p className="text-stone-400 mt-1">
          {total} {at("audit.events")}
          {filters.sensitiveOnly ? ` — ${at("audit.sensitiveOnly")}` : ""}
        </p>
      </div>

      {/* تصفية */}
      <div className="bg-white rounded-3xl border border-stone-200 p-4 shadow-soft space-y-3">
        <input
          value={filters.q}
          onChange={(e) => setFilters({ ...filters, q: e.target.value })}
          placeholder={at("audit.search")}
          className={`${inputCls} w-full`}
        />
        <div className="flex flex-wrap gap-2.5">
          <select
            value={filters.userId ?? ""}
            onChange={(e) =>
              setFilters({ ...filters, userId: e.target.value ? Number(e.target.value) : null })
            }
            className={inputCls}
          >
            <option value="">{at("audit.allActors")}</option>
            {(meta.data?.actors ?? []).map((a) => (
              <option key={a.userId} value={a.userId ?? ""}>
                {a.userName || `#${a.userId}`}
              </option>
            ))}
          </select>

          <select
            value={filters.action}
            onChange={(e) => setFilters({ ...filters, action: e.target.value })}
            className={inputCls}
          >
            <option value="">{at("audit.allActions")}</option>
            {(meta.data?.actions ?? []).map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={filters.from}
            onChange={(e) => setFilters({ ...filters, from: e.target.value })}
            className={inputCls}
          />
          <input
            type="date"
            value={filters.to}
            onChange={(e) => setFilters({ ...filters, to: e.target.value })}
            className={inputCls}
          />

          <label className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border-2 border-stone-200 cursor-pointer text-sm font-bold text-stone-600">
            <input
              type="checkbox"
              checked={filters.sensitiveOnly}
              onChange={(e) => setFilters({ ...filters, sensitiveOnly: e.target.checked })}
              className="w-4 h-4 accent-amber-500"
            />
            {at("audit.sensitiveOnly")}
          </label>

          <button
            onClick={() =>
              setFilters({ q: "", action: "", userId: null, from: "", to: "", sensitiveOnly: false, limit: 100 })
            }
            className="px-4 py-2.5 rounded-xl bg-stone-100 font-bold text-sm text-stone-600"
          >
            {at("audit.clear")}
          </button>
        </div>
      </div>

      {/* الجدول */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-soft overflow-x-auto">
        {rows.length === 0 ? (
          <p className="p-10 text-center text-stone-400">{at("audit.empty")}</p>
        ) : (
          <table className="w-full min-w-[760px]">
            <thead>
              <tr className="border-b border-stone-200 text-sm text-stone-500">
                <th className="text-start px-5 py-3.5 font-bold">{at("audit.time")}</th>
                <th className="text-start px-3 py-3.5 font-bold">{at("audit.actor")}</th>
                <th className="text-start px-3 py-3.5 font-bold">{at("audit.action")}</th>
                <th className="text-start px-3 py-3.5 font-bold">{at("audit.resource")}</th>
                <th className="text-start px-3 py-3.5 font-bold">{at("audit.details")}</th>
                <th className="text-start px-3 py-3.5 font-bold">IP</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-stone-100 last:border-0 hover:bg-stone-50">
                  <td className="px-5 py-3.5 text-sm text-stone-500 whitespace-nowrap">
                    {new Date(r.createdAt).toLocaleString(al === "ar" ? "ar-SA" : "en-GB", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </td>
                  <td className="px-3 py-3.5 font-bold text-sm">{r.userName || "—"}</td>
                  <td className="px-3 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-black ${actionTint(r.action)}`}>
                      {r.action}
                    </span>
                    {r.sensitive && (
                      <span className="ms-1.5 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 text-[10px] font-black">
                        {at("audit.sensitive")}
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-3.5 text-sm text-stone-500" dir="ltr">
                    {r.resource || "—"}
                  </td>
                  <td className="px-3 py-3.5 text-xs text-stone-400 max-w-[260px] truncate" dir="ltr">
                    {r.details || "—"}
                  </td>
                  <td className="px-3 py-3.5 text-xs text-stone-400" dir="ltr">
                    {r.ip || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {total > rows.length && (
        <button
          onClick={() => setFilters({ ...filters, limit: Math.min(filters.limit + 100, 500) })}
          className="w-full py-3 rounded-2xl border-2 border-stone-200 font-bold text-stone-600 hover:border-[#2fa3c4]"
        >
          {at("audit.loadMore")}
        </button>
      )}
    </div>
  );
}
