import { useMemo, useState } from "react";
import { trpc } from "@/providers/trpc";
import { useAdminT } from "./adminShared";

function Row({
  k,
  lang,
  value,
  reference,
  onSave,
  onDelete,
  saving,
  at,
}: {
  k: string;
  lang: string;
  value: string;
  reference: string;
  onSave: (v: string) => void;
  onDelete: () => void;
  saving: boolean;
  at: (k: string) => string;
}) {
  const [v, setV] = useState(value);
  const dirty = v !== value;
  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-soft">
      <div className="flex items-center justify-between gap-2 mb-2">
        <code className="text-xs font-bold text-[#17788f] bg-[#2fa3c4]/10 px-2 py-1 rounded-lg" dir="ltr">
          {k}
        </code>
        <div className="flex items-center gap-2">
          {dirty && (
            <button
              onClick={() => onSave(v)}
              disabled={saving}
              className="px-4 py-1.5 rounded-full bg-grad-brand-deep text-white text-sm font-black disabled:opacity-60"
            >
              {at("common.save")}
            </button>
          )}
          <button
            onClick={() => confirm(`${at("common.delete")} ${k}?`) && onDelete()}
            className="text-stone-300 hover:text-rose-500 text-sm font-bold"
          >
            ✕
          </button>
        </div>
      </div>
      <textarea
        value={v}
        onChange={(e) => setV(e.target.value)}
        rows={v.length > 90 ? 3 : 2}
        dir={lang === "ar" || lang === "ur" ? "rtl" : "ltr"}
        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-stone-200 focus:border-[#2fa3c4] focus:outline-none text-[15px] leading-relaxed"
      />
      {lang !== "en" && reference && (
        <p className="mt-1.5 text-xs text-stone-400 leading-relaxed" dir="ltr">
          <span className="font-bold">{at("content.ref")}:</span> {reference}
        </p>
      )}
    </div>
  );
}

export default function ContentPage() {
  const { at } = useAdminT();
  const utils = trpc.useUtils();
  const all = trpc.content.all.useQuery();
  const langs = trpc.languages.listAll.useQuery();

  const [lang, setLang] = useState("ar");
  const [q, setQ] = useState("");
  const [newKey, setNewKey] = useState("");

  const upsert = trpc.content.upsert.useMutation({
    onSuccess: () => utils.content.all.invalidate(),
  });
  const createKey = trpc.content.createKey.useMutation({
    onSuccess: () => {
      utils.content.all.invalidate();
      setNewKey("");
    },
  });
  const deleteKey = trpc.content.deleteKey.useMutation({
    onSuccess: () => utils.content.all.invalidate(),
  });

  const { map, keys } = useMemo(() => {
    const map: Record<string, Record<string, string>> = {};
    for (const r of all.data ?? []) {
      (map[r.contentKey] ??= {})[r.lang] = r.value;
    }
    let keys = Object.keys(map).sort();
    if (q.trim()) {
      const needle = q.trim().toLowerCase();
      keys = keys.filter(
        (k) =>
          k.toLowerCase().includes(needle) ||
          Object.values(map[k]).some((v) => v.toLowerCase().includes(needle)),
      );
    }
    return { map, keys };
  }, [all.data, q]);

  const groups = useMemo(() => {
    const g: Record<string, string[]> = {};
    for (const k of keys) {
      const prefix = k.split(".")[0];
      (g[prefix] ??= []).push(k);
    }
    return g;
  }, [keys]);

  return (
    <div className="max-w-3xl space-y-5">
      <div>
        <h1 className="text-3xl font-black">{at("content.title")}</h1>
        <p className="text-stone-400 mt-1">{at("content.hint")}</p>
      </div>

      {/* language pills */}
      <div className="flex flex-wrap gap-2">
        {(langs.data ?? []).map((l) => (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            className={`px-4 py-2.5 rounded-full border-2 font-bold text-sm transition-colors ${
              lang === l.code
                ? "border-[#2fa3c4] bg-[#2fa3c4]/10 text-[#17788f]"
                : "border-stone-200 bg-white text-stone-500"
            }`}
          >
            {l.nameNative}
            {!l.enabled && " ⏸"}
          </button>
        ))}
      </div>

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={at("common.search")}
        className="w-full px-4 py-3 rounded-2xl border-2 border-stone-200 bg-white focus:border-[#2fa3c4] focus:outline-none"
      />

      {Object.entries(groups).map(([prefix, ks]) => (
        <div key={prefix}>
          <h2 className="font-black text-stone-400 text-sm uppercase tracking-wide mb-2 mt-4" dir="ltr">
            {prefix}.*
          </h2>
          <div className="space-y-2.5">
            {ks.map((k) => (
              <Row
                key={`${k}:${lang}`}
                k={k}
                lang={lang}
                value={map[k]?.[lang] ?? ""}
                reference={map[k]?.en ?? ""}
                saving={upsert.isPending}
                at={at}
                onSave={(v) => upsert.mutate({ key: k, lang, value: v })}
                onDelete={() => deleteKey.mutate({ key: k })}
              />
            ))}
          </div>
        </div>
      ))}

      {/* add key */}
      <form
        className="flex gap-2 pt-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (newKey.trim()) createKey.mutate({ key: newKey.trim() });
        }}
      >
        <input
          dir="ltr"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
          placeholder={at("content.keyPlaceholder")}
          className="flex-1 px-4 py-3 rounded-2xl border-2 border-dashed border-stone-300 bg-white focus:border-[#2fa3c4] focus:outline-none"
        />
        <button
          type="submit"
          disabled={createKey.isPending}
          className="px-6 rounded-2xl bg-grad-brand-deep text-white font-black disabled:opacity-60"
        >
          {at("content.addKey")}
        </button>
      </form>
    </div>
  );
}
