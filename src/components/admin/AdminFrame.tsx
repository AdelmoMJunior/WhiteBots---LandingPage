import Image from "next/image";
import Link from "next/link";
import {BarChart3, HelpCircle, LayoutDashboard, LogOut, PanelsTopLeft, Settings} from "lucide-react";
import {signOutAdmin} from "@/app/admin/actions";

const navItems = [
  {href: "/admin", label: "Painel", icon: LayoutDashboard},
  {href: "/admin/modules", label: "Módulos", icon: PanelsTopLeft},
  {href: "/admin/showcase", label: "Vitrine", icon: BarChart3},
  {href: "/admin/faq", label: "FAQ", icon: HelpCircle},
  {href: "/admin/settings", label: "Configurações", icon: Settings}
];

export function AdminFrame({
  userEmail,
  children
}: {
  userEmail: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-graphite-950 text-silver-50">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-white/10 bg-graphite-900/95 p-5 lg:block">
        <Link href="/admin" className="focus-ring flex items-center gap-3 rounded-lg">
          <Image src="/brand/whitebots-logo.png" alt="WhiteBots" width={46} height={46} />
          <div>
            <p className="font-display text-lg font-black text-white">WhiteBots</p>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-pulse">
              Admin
            </p>
          </div>
        </Link>

        <nav className="mt-10 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="focus-ring flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-bold text-silver-300 transition hover:bg-white/[0.05] hover:text-white"
              >
                <Icon className="h-4 w-4 text-violet-pulse" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute inset-x-5 bottom-5 rounded-lg border border-white/10 bg-white/[0.035] p-4">
          <p className="truncate text-sm font-bold text-white">{userEmail}</p>
          <form action={signOutAdmin} className="mt-3">
            <button
              type="submit"
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs font-bold text-silver-300 hover:text-white"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sair
            </button>
          </form>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-white/10 bg-graphite-950/82 px-5 py-4 backdrop-blur lg:hidden">
          <div className="flex items-center justify-between gap-4">
            <Link href="/admin" className="flex items-center gap-2 font-display font-black">
              <Image src="/brand/whitebots-logo.png" alt="WhiteBots" width={34} height={34} />
              Admin
            </Link>
            <form action={signOutAdmin}>
              <button
                type="submit"
                className="focus-ring rounded-full border border-white/10 px-3 py-2 text-xs font-bold"
              >
                Sair
              </button>
            </form>
          </div>
          <nav className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="focus-ring shrink-0 rounded-full border border-white/10 px-3 py-2 text-xs font-bold text-silver-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>

        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:py-10">{children}</div>
      </div>
    </main>
  );
}
