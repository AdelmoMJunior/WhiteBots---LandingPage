import Link from "next/link";
import {BarChart3, HelpCircle, PanelsTopLeft, Settings} from "lucide-react";
import {getAdminWriteClient} from "@/lib/admin";
import {getAdminContent} from "@/lib/content";

export default async function AdminDashboard() {
  const {client} = await getAdminWriteClient();
  const content = await getAdminContent(client);

  const cards = [
    {
      href: "/admin/modules",
      label: "Módulos",
      value: content.modules.length,
      icon: PanelsTopLeft
    },
    {
      href: "/admin/showcase",
      label: "Itens de vitrine",
      value: content.showcase.length + content.testimonials.length,
      icon: BarChart3
    },
    {
      href: "/admin/faq",
      label: "FAQs",
      value: content.faqs.length,
      icon: HelpCircle
    },
    {
      href: "/admin/settings",
      label: "Configurações",
      value: "CTA",
      icon: Settings
    }
  ];

  return (
    <div>
      <p className="text-sm font-bold uppercase tracking-[0.22em] text-violet-pulse">
        Painel privado
      </p>
      <h1 className="mt-3 font-display text-4xl font-black text-white">Conteúdo WhiteBots</h1>
      <p className="mt-4 max-w-2xl leading-7 text-silver-300">
        Edite módulos, funções, vitrine, depoimentos, FAQ e textos comerciais. O conteúdo
        publicado aparece nas rotas públicas em português e inglês.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.href} href={card.href} className="metal-panel rounded-lg p-5">
              <div className="flex items-center justify-between">
                <Icon className="h-5 w-5 text-violet-pulse" />
                <span className="font-display text-3xl font-black text-white">{card.value}</span>
              </div>
              <p className="mt-5 font-bold text-silver-200">{card.label}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
