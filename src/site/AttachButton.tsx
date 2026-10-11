/**
 * زر إرفاق وثيقة في الدردشة.
 * يرفع الملف أولًا إلى /api/upload ثم يسلّم معرّفه لمن استدعاه ليرسله كرسالة.
 */
import { useRef, useState } from "react";
import { IconClip } from "./icons";

export const ACCEPT = "image/jpeg,image/png,image/webp,image/heic,application/pdf";
export const MAX_BYTES = 8 * 1024 * 1024;

export type Uploaded = { id: number; name: string; mime: string; size: number };

export function AttachButton({
  sessionId,
  by,
  onUploaded,
  label,
  errorText,
  className = "",
}: {
  sessionId: number;
  by: "visitor" | "agent";
  onUploaded: (f: Uploaded) => void;
  label: string;
  errorText: (code: string) => string;
  className?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function pick(file: File) {
    setError("");
    if (file.size > MAX_BYTES) {
      setError(errorText("TOO_LARGE"));
      return;
    }
    setBusy(true);
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("sessionId", String(sessionId));
      body.append("by", by);
      const res = await fetch("/api/upload", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) {
        setError(errorText(data?.error ?? "FAILED"));
        return;
      }
      onUploaded(data as Uploaded);
    } catch {
      setError(errorText("FAILED"));
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={busy}
        title={label}
        aria-label={label}
        className={`shrink-0 grid place-items-center rounded-2xl border-2 border-stone-200 text-stone-500 hover:border-[#2fa3c4] hover:text-[#17788f] disabled:opacity-50 transition ${className}`}
      >
        {busy ? <span className="text-xs font-black">…</span> : <IconClip size={22} />}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) pick(f);
        }}
      />
      {error && (
        <span className="absolute -top-7 start-3 px-2.5 py-1 rounded-lg bg-rose-500 text-white text-xs font-bold">
          {error}
        </span>
      )}
    </>
  );
}

/** بطاقة عرض مرفق داخل فقاعة الرسالة. */
export function Attachment({
  file,
  own,
}: {
  file: { name: string; mime: string; size: number; url: string };
  own: boolean;
}) {
  const kb = Math.max(1, Math.round(file.size / 1024));
  if (file.mime.startsWith("image/")) {
    return (
      <a href={file.url} target="_blank" rel="noreferrer" className="block mt-1">
        <img
          src={file.url}
          alt={file.name}
          className="max-h-56 w-auto rounded-xl border border-black/10"
          loading="lazy"
        />
      </a>
    );
  }
  return (
    <a
      href={file.url}
      target="_blank"
      rel="noreferrer"
      className={`mt-1 flex items-center gap-2.5 rounded-xl px-3 py-2.5 transition ${
        own ? "bg-white/15 hover:bg-white/25" : "bg-stone-100 hover:bg-stone-200"
      }`}
    >
      <IconClip size={20} className="shrink-0" />
      <span className="min-w-0">
        <span className="block font-bold text-sm truncate max-w-[200px]" dir="auto">
          {file.name}
        </span>
        <span className={`block text-xs ${own ? "opacity-75" : "text-stone-400"}`}>{kb} KB</span>
      </span>
    </a>
  );
}
