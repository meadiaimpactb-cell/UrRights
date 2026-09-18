import { useAuth } from "@/hooks/useAuth";
import { trpc } from "@/providers/trpc";
import { useAdminT } from "./adminShared";

export default function UsersPage() {
  const { at } = useAdminT();
  const { user: me } = useAuth();
  const utils = trpc.useUtils();
  const users = trpc.users.list.useQuery();
  const setRole = trpc.users.setRole.useMutation({
    onSuccess: () => utils.users.list.invalidate(),
  });

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-black">{at("users.title")}</h1>
        <p className="text-stone-400 mt-1 leading-relaxed">{at("users.hint")}</p>
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
              </div>
              <select
                value={u.role}
                disabled={isMe}
                onChange={(e) => setRole.mutate({ id: u.id, role: e.target.value as typeof u.role })}
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
