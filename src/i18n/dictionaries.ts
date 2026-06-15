import type {Locale} from "@/types/content";

export type Dictionary = {
  nav: {
    modules: string;
    process: string;
    proof: string;
    faq: string;
    admin: string;
  };
  sections: {
    modulesEyebrow: string;
    modulesTitle: string;
    modulesSubtitle: string;
    assemblyEyebrow: string;
    assemblyTitle: string;
    assemblySubtitle: string;
    processEyebrow: string;
    processTitle: string;
    proofEyebrow: string;
    proofTitle: string;
    faqEyebrow: string;
    faqTitle: string;
  };
  labels: {
    published: string;
    draft: string;
    moduleFeature: string;
    metric: string;
    language: string;
    reducedMotion: string;
  };
  admin: {
    loginTitle: string;
    loginSubtitle: string;
    email: string;
    sendMagicLink: string;
    missingSupabase: string;
    notAdmin: string;
    dashboard: string;
    modules: string;
    showcase: string;
    faq: string;
    settings: string;
    logout: string;
  };
};

const dictionaries: Record<Locale, Dictionary> = {
  "pt-BR": {
    nav: {
      modules: "Módulos",
      process: "Processo",
      proof: "Provas",
      faq: "FAQ",
      admin: "Admin"
    },
    sections: {
      modulesEyebrow: "Arquitetura modular",
      modulesTitle: "Cada módulo nasce para resolver um fluxo real do seu servidor.",
      modulesSubtitle:
        "Comece pelos sistemas que sua comunidade precisa hoje e expanda com novas funções conforme a operação cresce.",
      assemblyEyebrow: "Experiência sob medida",
      assemblyTitle: "Cada parte do servidor se conecta em uma experiência única.",
      assemblySubtitle:
        "Módulos, permissões, cargos, tickets e rotinas são desenhados para trabalhar juntos, com a identidade e o ritmo da sua comunidade.",
      processEyebrow: "Entrega premium",
      processTitle: "Do briefing ao módulo pronto, cada detalhe é tratado como produto.",
      proofEyebrow: "Resultado percebido",
      proofTitle: "A diferença aparece na rotina da equipe e na experiência da comunidade.",
      faqEyebrow: "Perguntas frequentes",
      faqTitle: "O essencial antes de chamar no Discord."
    },
    labels: {
      published: "Publicado",
      draft: "Rascunho",
      moduleFeature: "Função",
      metric: "Métrica",
      language: "Idioma",
      reducedMotion: "Visual estático por preferência de movimento reduzido."
    },
    admin: {
      loginTitle: "Acesso WhiteBots",
      loginSubtitle: "Entre com o email autorizado para editar o conteúdo do site.",
      email: "Email",
      sendMagicLink: "Enviar link seguro",
      missingSupabase: "Configure as variáveis do Supabase para ativar o painel.",
      notAdmin: "Esse email não está autorizado como admin.",
      dashboard: "Painel",
      modules: "Módulos",
      showcase: "Vitrine",
      faq: "FAQ",
      settings: "Configurações",
      logout: "Sair"
    }
  },
  en: {
    nav: {
      modules: "Modules",
      process: "Process",
      proof: "Proof",
      faq: "FAQ",
      admin: "Admin"
    },
    sections: {
      modulesEyebrow: "Modular architecture",
      modulesTitle: "Each module is built to solve a real server workflow.",
      modulesSubtitle:
        "Start with the systems your community needs today and expand with new features as the operation grows.",
      assemblyEyebrow: "Tailored experience",
      assemblyTitle: "Every part of the server connects into one coherent experience.",
      assemblySubtitle:
        "Modules, permissions, roles, tickets and routines are designed to work together with your community's identity and pace.",
      processEyebrow: "Premium delivery",
      processTitle: "From briefing to finished module, every detail is treated as product work.",
      proofEyebrow: "Perceived results",
      proofTitle: "The difference shows up in staff routines and community experience.",
      faqEyebrow: "FAQ",
      faqTitle: "What matters before joining Discord."
    },
    labels: {
      published: "Published",
      draft: "Draft",
      moduleFeature: "Feature",
      metric: "Metric",
      language: "Language",
      reducedMotion: "Static visual enabled by reduced-motion preference."
    },
    admin: {
      loginTitle: "WhiteBots access",
      loginSubtitle: "Sign in with the authorized email to edit website content.",
      email: "Email",
      sendMagicLink: "Send secure link",
      missingSupabase: "Configure Supabase variables to activate the admin panel.",
      notAdmin: "This email is not authorized as an admin.",
      dashboard: "Dashboard",
      modules: "Modules",
      showcase: "Showcase",
      faq: "FAQ",
      settings: "Settings",
      logout: "Sign out"
    }
  }
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
