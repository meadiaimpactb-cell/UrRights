import { useEffect, useState } from "react";
import { trpc } from "@/providers/trpc";
import { useAuth } from "@/hooks/useAuth";
import { useAdminT } from "./adminShared";
import { IconCheck, IconLock, IconUsers } from "@/site/icons";

export default function ProfilePage() {
  const { at, al } = useAdminT();
  const { user, refetch } = useAuth();
  const utils = trpc.useUtils();

  const [form, setForm] = useState({ name: "", email: "" });
  const [savedProfile, setSavedProfile] = useState(false);
  const [profileError, setProfileError] = useState("");

  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
  const [savedPw, setSavedPw] = useState(false);
  const [pwError, setPwError] = useState("");

  useEffect(() => {
    if (user) setForm({ name: user.name ?? "", email: user.email ?? "" });
  }, [user]);

  const updateProfile = trpc.auth.updateProfile.useMutation({
    onSuccess: () => {
      utils.auth.me.invalidate();
      refetch();
      setProfileError("");
      setSavedProfile(true);
      setTimeout(() => setSavedProfile(false), 2500);
    },
    onError: (e) =>
      setProfileError(e.message === "EMAIL_TAKEN" ? at("profile.emailTaken") : at("profile.saveFailed")),
  });

  const changePassword = trpc.auth.changePassword.useMutation({
    onSuccess: () => {
      setPw({ current: "", next: "", confirm: "" });
      setPwError("");
      setSavedPw(true);
      setTimeout(() => setSavedPw(false), 2500);
    },
    onError: () => setPwError(at("profile.wrongCurrent")),
  });

  const inputCls =
    "w-full px-4 py-3 rounded-xl border-2 border-stone-200 focus:border-[#2fa3c4] focus:outline-none bg-white";

  const roleLabel = user?.role ? at(`users.role.${user.role}`) : "";
  const initial = (user?.name ?? user?.email ?? "?").trim().charAt(0);

  const submitPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw.next !== pw.confirm) {
      setPwError(at("profile.mismatch"));
      return;
    }
    changePassword.mutate({ current: pw.current, next: pw.next });
  };

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-3xl font-black">{at("profile.title")}</h1>

      {/* بطاقة الحساب */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-soft flex items-center gap-4">
        <span className="w-16 h-16 shrink-0 rounded-2xl bg-grad-brand-deep text-white grid place-items-center text-2xl font-black">
          {initial}
        </span>
        <div className="min-w-0">
          <div className="text-xl font-black truncate">{user?.name}</div>
          <div className="text-stone-400 truncate" dir="ltr">
            {user?.email}
          </div>
          <span className="mt-1.5 inline-block px-3 py-1 rounded-full bg-[#5cb98b]/15 text-[#2e9c6a] text-xs font-black">
            {roleLabel}
          </span>
        </div>
        {user?.lastSignInAt && (
          <div className="ms-auto text-end text-sm text-stone-400 hidden sm:block">
            <div className="font-bold">{at("profile.lastLogin")}</div>
            <div>
              {new Date(user.lastSignInAt).toLocaleString(al === "ar" ? "ar-SA" : "en-GB", {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </div>
          </div>
        )}
      </div>

      {/* البيانات الشخصية */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-soft space-y-4">
        <h2 className="font-black text-lg flex items-center gap-2">
          <IconUsers size={19} className="text-[#2fa3c4]" />
          {at("profile.personal")}
        </h2>

        <div>
          <label className="block font-bold mb-1.5 text-stone-600">{at("profile.name")}</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputCls}
          />
          <p className="mt-1 text-sm text-stone-400">{at("profile.nameHint")}</p>
        </div>

        <div>
          <label className="block font-bold mb-1.5 text-stone-600">{at("profile.email")}</label>
          <input
            dir="ltr"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputCls}
          />
        </div>

        {profileError && <p className="text-rose-600 font-bold text-sm">{profileError}</p>}

        <button
          onClick={() => updateProfile.mutate(form)}
          disabled={!form.name.trim() || !form.email.trim() || updateProfile.isPending}
          className="px-8 py-3 rounded-2xl bg-grad-brand-deep text-white font-black shadow-lift disabled:opacity-60 inline-flex items-center gap-2"
        >
          {savedProfile && <IconCheck size={18} />}
          {savedProfile ? at("common.saved") : at("common.save")}
        </button>
      </div>

      {/* كلمة المرور */}
      <form
        onSubmit={submitPassword}
        className="bg-white rounded-3xl border border-stone-200 p-6 shadow-soft space-y-4"
      >
        <h2 className="font-black text-lg flex items-center gap-2">
          <IconLock size={19} className="text-[#2fa3c4]" />
          {at("profile.password")}
        </h2>

        <div>
          <label className="block font-bold mb-1.5 text-stone-600">{at("profile.current")}</label>
          <input
            type="password"
            autoComplete="current-password"
            value={pw.current}
            onChange={(e) => setPw({ ...pw, current: e.target.value })}
            className={inputCls}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold mb-1.5 text-stone-600">{at("profile.new")}</label>
            <input
              type="password"
              autoComplete="new-password"
              value={pw.next}
              onChange={(e) => setPw({ ...pw, next: e.target.value })}
              className={inputCls}
            />
          </div>
          <div>
            <label className="block font-bold mb-1.5 text-stone-600">{at("profile.confirm")}</label>
            <input
              type="password"
              autoComplete="new-password"
              value={pw.confirm}
              onChange={(e) => setPw({ ...pw, confirm: e.target.value })}
              className={inputCls}
            />
          </div>
        </div>

        <p className="text-sm text-stone-400">{at("profile.pwHint")}</p>
        {pwError && <p className="text-rose-600 font-bold text-sm">{pwError}</p>}

        <button
          type="submit"
          disabled={pw.current.length < 1 || pw.next.length < 8 || changePassword.isPending}
          className="px-8 py-3 rounded-2xl bg-[#22312c] text-white font-black disabled:opacity-60 inline-flex items-center gap-2"
        >
          {savedPw && <IconCheck size={18} />}
          {savedPw ? at("profile.pwChanged") : at("profile.changePw")}
        </button>
      </form>
    </div>
  );
}
