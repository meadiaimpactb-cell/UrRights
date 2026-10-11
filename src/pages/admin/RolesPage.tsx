import { trpc } from "@/providers/trpc";
import { useAdminT } from "./adminShared";
import { IconLock } from "@/site/icons";

/** المدير كامل الصلاحية دائمًا، فصفّه للقراءة فقط. */
const EDITABLE_ROLES = ["agent", "user"] as const;

export default function RolesPage() {
  const { at } = useAdminT();
  const utils = trpc.useUtils();
  const perms = trpc.admin.permissions.useQuery();
  const setPermission = trpc.admin.setPermission.useMutation({
    onSuccess: () => {
      utils.admin.permissions.invalidate();
      utils.admin.myAreas.invalidate();
    },
  });

  const areas = perms.data?.areas ?? [];
  const matrix = perms.data?.matrix ?? {};

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="text-3xl font-black flex items-center gap-2.5">
          <IconLock size={26} className="text-[#2e9c6a]" />
          {at("roles.title")}
        </h1>
        <p className="text-stone-400 mt-1 leading-relaxed">{at("roles.hint")}</p>
      </div>

      <div className="bg-white rounded-3xl border border-stone-200 shadow-soft overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-stone-200">
              <th className="text-start px-5 py-4 font-black text-[#22312c]">{at("roles.role")}</th>
              {areas.map((a) => (
                <th key={a} className="px-3 py-4 font-bold text-sm text-stone-500 whitespace-nowrap">
                  {at(`roles.area.${a}`)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* المدير — ثابت */}
            <tr className="border-b border-stone-100 bg-[#5cb98b]/5">
              <td className="px-5 py-4">
                <span className="font-black">{at("users.role.admin")}</span>
                <span className="ms-2 px-2.5 py-0.5 rounded-full bg-[#2e9c6a]/10 text-[#2e9c6a] text-[11px] font-black">
                  {at("roles.full")}
                </span>
              </td>
              {areas.map((a) => (
                <td key={a} className="px-3 py-4 text-center">
                  <input type="checkbox" checked readOnly disabled className="w-5 h-5 accent-[#2e9c6a]" />
                </td>
              ))}
            </tr>

            {EDITABLE_ROLES.map((role) => (
              <tr key={role} className="border-b border-stone-100 last:border-0 hover:bg-stone-50">
                <td className="px-5 py-4 font-black">{at(`users.role.${role}`)}</td>
                {areas.map((a) => (
                  <td key={a} className="px-3 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={matrix[role]?.[a] ?? false}
                      onChange={(e) =>
                        setPermission.mutate({
                          role,
                          area: a as never,
                          allowed: e.target.checked,
                        })
                      }
                      className="w-5 h-5 accent-[#2fa3c4] cursor-pointer"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-2xl bg-[#2fa3c4]/5 border border-[#2fa3c4]/20 px-5 py-4">
        <p className="text-sm text-stone-600 leading-relaxed">{at("roles.note")}</p>
      </div>
    </div>
  );
}
