import { NavLink, Outlet, Link } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { AdminLangProvider, useAdminT } from "./adminShared";
import {
  IconChat,
  IconGlobe,
  IconUsers,
  IconContract,
  IconHandshake,
  IconBook,
  IconDots,
} from "@/site/icons";

const NAV = [
  { to: "/admin", end: true, key: "nav.dashboard", Icon: IconBook, adminOnly: false },
  { to: "/admin/chat", key: "nav.chat", Icon: IconChat, adminOnly: false },
  { to: "/admin/requests", key: "nav.requests", Icon: IconContract, adminOnly: false },
  { to: "/admin/content", key: "nav.content", Icon: IconBook, adminOnly: false },
  { to: "/admin/languages", key: "nav.languages", Icon: IconGlobe, adminOnly: false },
  { to: "/admin/partners", key: "nav.partners", Icon: IconHandshake, adminOnly: false },
  { to: "/admin/settings", key: "nav.settings", Icon: IconDots, adminOnly: false },
  { to: "/admin/users", key: "nav.users", Icon: IconUsers, adminOnly: true },
];

function Shell() {
  const { user, isLoading, logout } = useAuth({ redirectOnUnauthenticated: true });
  const { at, adir, al, setAl } = useAdminT();

  if (isLoading) {
    return (
      <div className="min-h-screen grid place-items-center bg-stone-100 text-stone-400 font-bold">
        {at("common.loading")}
      </div>
    );
  }

  if (user && user.role === "user") {
    return (
      <div className="min-h-screen grid place-items-center bg-stone-100 p-6" dir={adir}>
        <div className="bg-white rounded-3xl p-8 max-w-md text-center shadow-soft">
          <h1 className="text-2xl font-black text-[#22312c] mb-3">{at("noaccess.title")}</h1>
          <p className="text-stone-500 leading-relaxed mb-6">{at("noaccess.text")}</p>
          <div className="flex justify-center gap-3">
            <Link to="/" className="px-5 py-2.5 rounded-xl border-2 border-stone-200 font-bold text-stone-600">
              {at("common.viewSite")}
            </Link>
            <button onClick={logout} className="px-5 py-2.5 rounded-xl bg-[#22312c] text-white font-bold">
              {at("common.logout")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isAdmin = user?.role === "admin";
  const nav = NAV.filter((n) => !n.adminOnly || isAdmin);

  return (
    <div dir={adir} lang={al} className="min-h-screen bg-stone-100 text-[#22312c]">
      {/* top bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-stone-200">
        <div className="px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <img src="/assets/logo-icon.png" alt="" className="h-9 w-9 object-contain" />
            <span className="font-black text-lg truncate">حقوقك — Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAl(al === "ar" ? "en" : "ar")}
              className="px-3.5 py-2 rounded-full border border-stone-300 font-bold text-sm hover:border-[#2fa3c4]"
            >
              {al === "ar" ? "English" : "عربي"}
            </button>
            <Link
              to="/"
              className="hidden sm:inline px-3.5 py-2 rounded-full border border-stone-300 font-bold text-sm hover:border-[#2fa3c4]"
            >
              {at("common.viewSite")}
            </Link>
            <span className="hidden md:inline text-sm text-stone-400 font-semibold">{user?.name}</span>
            <button
              onClick={logout}
              className="px-3.5 py-2 rounded-full bg-stone-100 font-bold text-sm text-stone-500 hover:bg-stone-200"
            >
              {at("common.logout")}
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* sidebar */}
        <aside className="hidden lg:flex flex-col gap-1 w-60 shrink-0 p-4 sticky top-16 h-[calc(100vh-4rem)]">
          {nav.map(({ to, end, key, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={end as boolean | undefined}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-colors ${
                  isActive ? "bg-grad-brand-deep text-white shadow-soft" : "text-stone-500 hover:bg-white"
                }`
              }
            >
              <Icon size={21} />
              {at(key)}
            </NavLink>
          ))}
        </aside>

        {/* mobile nav */}
        <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-stone-200 flex overflow-x-auto">
          {nav.map(({ to, end, key, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={end as boolean | undefined}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-4 py-2.5 text-[11px] font-bold min-w-[72px] ${
                  isActive ? "text-[#17788f]" : "text-stone-400"
                }`
              }
            >
              <Icon size={21} />
              {at(key)}
            </NavLink>
          ))}
        </nav>

        <main className="flex-1 min-w-0 p-4 sm:p-6 pb-24 lg:pb-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout() {
  return (
    <AdminLangProvider>
      <Shell />
    </AdminLangProvider>
  );
}
