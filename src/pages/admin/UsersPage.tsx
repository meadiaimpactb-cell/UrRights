import { useState, type FormEvent } from "react";
import { useAuth } from "@/hooks/useAuth";
import { trpc } from "@/providers/trpc";
import { useAdminT } from "./adminShared";

type Role = "user" | "agent" | "admin";

const inputCls =
  "w-full px-4 py-3 rounded-xl border-2 border-stone-200 focus:border-[#2fa3c4] focus:outline-none bg-white";

/** Map a server error code (e.g. EMAIL_TAKEN) to a translated message. */
function useErr() {
  const { at } = useAdminT();
  return (msg?: string | null) => {
    if (!msg) return null;
    const key = `users.err.${msg}`;
    const txt = at(key);
    return txt === key ? at("users.err.generic") : txt;
  };
}

function CreateUserCard() {
  const { at } = useAdminT();
  const err = useErr();
  const utils = trpc.useUtils();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "agent" as Role });

  const create = trpc.users.create.useMutation({
    onSuccess: () => {
      utils.users.list.invalidate();
      setForm({ name: "", email: "", password: "", role: "agent" });
      setOpen(false);
    },
  });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    create.mutate(form);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="px-5 py-3 rounded-xl bg-[#22312c] text-white font-bold hover:opacity-90"
      >
        + {at("users.new")}
      </button>
    );
  }

  return (
    <form onSubmit={submit} className="w-full bg-white rounded-3xl border border-stone-200 p-6 shadow-soft space-y-4">
      <h2 className="text-xl font-black">{at("users.new")}</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="block text-sm font-bold mb-1.5">{at("users.name")}</span>
          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
        </label>
        <label className="block">
          <span className="block text-sm font-bold mb-1.5">{at("users.email")}</span>
          <input type="email" required dir="ltr" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} />
        </label>
        <label className="block">
          <span className="block text-sm font-bold mb-1.5">{at("users.password")}</span>
          <input type="password" required minLength={8} dir="ltr" autoComplete="new-password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className={inputCls} />
        </label>
        <label className="block">
          <span className="block text-sm font-bold mb-1.5">{at("users.role")}</span>
          <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as Role })} className={inputCls}>
            <option value="agent">{at("users.role.agent")}</option>
            <option value="admin">{at("users.role.admin")}</option>
            <option value="user">{at("users.role.user")}</option>
          </select>
        </label>
      </div>
      {create.error && <p className="text-sm font-bold text-rose-500">{err(create.error.message)}</p>}
      <div className="flex gap-3">
        <button type="submit" disabled={create.isPending} className="px-5 py-2.5 rounded-xl bg-[#22312c] text-white font-bold disabled:opacity-60">
          {at("users.create")}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="px-5 py-2.5 rounded-xl border-2 border-stone-200 font-bold text-stone-600">
          {at("common.cancel")}
        </button>
      </div>
    </form>
  );
}

function MyPasswordCard() {
  const { at } = useAdminT();
  const err = useErr();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [saved, setSaved] = useState(false);

  const change = trpc.auth.changePassword.useMutation({
    onSuccess: () => {
      setCurrent("");
      setNext("");
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        setOpen(false);
      }, 1500);
    },
  });

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="px-5 py-3 rounded-xl border-2 border-stone-200 font-bold text-stone-600 hover:border-[#2fa3c4]">
        {at("users.myPassword")}
      </button>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        change.mutate({ current, next });
      }}
      className="w-full bg-white rounded-3xl border border-stone-200 p-6 shadow-soft space-y-4"
    >
      <h2 className="text-xl font-black">{at("users.myPassword")}</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="block text-sm font-bold mb-1.5">{at("users.currentPassword")}</span>
          <input type="password" required dir="ltr" autoComplete="current-password" value={current} onChange={(e) => setCurrent(e.target.value)} className={inputCls} />
        </label>
        <label className="block">
          <span className="block text-sm font-bold mb-1.5">{at("users.newPassword")}</span>
          <input type="password" required minLength={8} dir="ltr" autoComplete="new-password" value={next} onChange={(e) => setNext(e.target.value)} className={inputCls} />
        </label>
      </div>
      {change.error && <p className="text-sm font-bold text-rose-500">{err(change.error.message)}</p>}
      {saved && <p className="text-sm font-bold text-[#2e9c6a]">{at("common.saved")}</p>}
      <div className="flex gap-3">
        <button type="submit" disabled={change.isPending} className="px-5 py-2.5 rounded-xl bg-[#22312c] text-white font-bold disabled:opacity-60">
          {at("common.save")}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="px-5 py-2.5 rounded-xl border-2 border-stone-200 font-bold text-stone-600">
          {at("common.cancel")}
        </button>
      </div>
    </form>
  );
}

function ResetPassword({ id }: { id: number }) {
  const { at } = useAdminT();
  const err = useErr();
  const [open, setOpen] = useState(false);
  const [pw, setPw] = useState("");
  const [saved, setSaved] = useState(false);
  const set = trpc.users.setPassword.useMutation({
    onSuccess: () => {
      setPw("");
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        setOpen(false);
      }, 1500);
    },
  });

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="text-xs font-bold text-[#17788f] hover:underline">
        {at("users.resetPassword")}
      </button>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        set.mutate({ id, password: pw });
      }}
      className="flex flex-wrap items-center gap-2 mt-2"
    >
      <input
        type="password"
        required
        minLength={8}
        dir="ltr"
        autoComplete="new-password"
        placeholder={at("users.newPassword")}
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        className="px-3 py-2 rounded-lg border-2 border-stone-200 focus:border-[#2fa3c4] focus:outline-none text-sm"
      />
      <button type="submit" disabled={set.isPending} className="px-3 py-2 rounded-lg bg-[#22312c] text-white text-xs font-bold disabled:opacity-60">
        {at("common.save")}
      </button>
      <button type="button" onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg border border-stone-200 text-xs font-bold text-stone-500">
        {at("common.cancel")}
      </button>
      {set.error && <span className="text-xs font-bold text-rose-500">{err(set.error.message)}</span>}
      {saved && <span className="text-xs font-bold text-[#2e9c6a]">{at("common.saved")}</span>}
    </form>
  );
}

export default function UsersPage() {
  const { at } = useAdminT();
  const { user: me } = useAuth();
  const utils = trpc.useUtils();
  const users = trpc.users.list.useQuery();
  const setRole = trpc.users.setRole.useMutation({
    onSuccess: () => utils.users.list.invalidate(),
  });
  const remove = trpc.users.remove.useMutation({
    onSuccess: () => utils.users.list.invalidate(),
  });

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-black">{at("users.title")}</h1>
        <p className="text-stone-400 mt-1 leading-relaxed">{at("users.hint")}</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <CreateUserCard />
        <MyPasswordCard />
      </div>

      <div className="space-y-3">
        {(users.data ?? []).map((u) => {
          const isMe = me?.id === u.id;
          return (
            <div key={u.id} className="bg-white rounded-3xl border border-stone-200 p-4 shadow-soft flex items-center gap-4">
              {u.avatar ? (
                <img src={u.avatar} alt="" className="w-12 h-12 rounded-2xl object-cover" />
              ) : (
                <span className="w-12 h-12 rounded-2xl bg-stone-100 grid place-items-center font-black text-stone-500 text-lg">
                  {(u.name ?? "?").charAt(0)}
                </span>
              )}
              <div className="flex-1 min-w-0">
                <div className="font-black truncate">
                  {u.name || "—"}{" "}
                  {isMe && <span className="text-xs text-[#17788f] font-bold">({at("users.you")})</span>}
                </div>
                <div className="text-xs text-stone-400 truncate" dir="ltr">{u.email || u.unionId}</div>
                {!isMe && (
                  <div className="flex items-center gap-3 mt-1">
                    <ResetPassword id={u.id} />
                    <button
                      onClick={() => {
                        if (window.confirm(at("users.confirmDelete"))) remove.mutate({ id: u.id });
                      }}
                      className="text-xs font-bold text-rose-500 hover:underline"
                    >
                      {at("common.delete")}
                    </button>
                  </div>
                )}
              </div>
              <select
                value={u.role}
                disabled={isMe}
                onChange={(e) => setRole.mutate({ id: u.id, role: e.target.value as Role })}
                className={`text-sm font-bold px-3.5 py-2.5 rounded-xl border-2 cursor-pointer ${
                  u.role === "admin"
                    ? "border-[#2e9c6a]/40 bg-[#2e9c6a]/10 text-[#2e9c6a]"
                    : u.role === "agent"
                      ? "border-[#2fa3c4]/40 bg-[#2fa3c4]/10 text-[#17788f]"
                      : "border-stone-200 bg-stone-50 text-stone-500"
                }`}
              >
                <option value="user">{at("users.role.user")}</option>
                <option value="agent">{at("users.role.agent")}</option>
                <option value="admin">{at("users.role.admin")}</option>
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
}
