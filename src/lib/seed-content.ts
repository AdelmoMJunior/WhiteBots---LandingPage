import {getDiscordUrl} from "@/lib/env";
import type {LandingContent} from "@/types/content";

export const seedContent: LandingContent = {
  settings: {
    discordUrl: getDiscordUrl(),
    heroEyebrow: {
      "pt-BR": "Bots Discord personalizados, seguros e escaláveis",
      en: "Custom, secure, scalable Discord bots"
    },
    heroTitle: {
      "pt-BR": "Automação premium para comunidades que querem operar em outro nível.",
      en: "Premium automation for communities ready to operate at another level."
    },
    heroSubtitle: {
      "pt-BR":
        "A WhiteBots projeta módulos sob medida para gestão, facções, atendimento, economia, moderação e fluxos complexos com acabamento profissional.",
      en:
        "WhiteBots designs custom modules for management, factions, support, economy, moderation and complex workflows with professional polish."
    },
    primaryCta: {"pt-BR": "Falar no Discord", en: "Talk on Discord"},
    secondaryCta: {"pt-BR": "Ver módulos", en: "Explore modules"},
    finalTitle: {
      "pt-BR": "Seu servidor pode parecer e funcionar como uma operação profissional.",
      en: "Your server can look and run like a professional operation."
    },
    finalSubtitle: {
      "pt-BR":
        "Entre pelo Discord, conte seu cenário e receba uma proposta de automação personalizada para o seu fluxo real.",
      en:
        "Join through Discord, describe your operation and get a custom automation proposal for your actual workflow."
    }
  },
  modules: [
    {
      id: "mod-factions",
      slug: "faccoes",
      icon: "Shield",
      accent: "#8b5cf6",
      sortOrder: 1,
      published: true,
      title: {"pt-BR": "Facções", en: "Factions"},
      summary: {
        "pt-BR": "Controle de membros, cargos, metas e rotina operacional.",
        en: "Member control, roles, targets and operational routine."
      },
      description: {
        "pt-BR":
          "Um módulo completo para servidores RP e comunidades competitivas, com permissões, histórico e automações conectadas ao jeito que sua equipe trabalha.",
        en:
          "A complete module for RP servers and competitive communities, with permissions, history and automations tied to how your team works."
      },
      features: [
        {
          id: "feat-farm",
          moduleId: "mod-factions",
          title: {"pt-BR": "Farm", en: "Farm"},
          description: {
            "pt-BR": "Registro de entregas, metas, ranking e conferência por período.",
            en: "Delivery logs, targets, rankings and period-based checks."
          },
          badge: "Ops",
          sortOrder: 1,
          published: true
        },
        {
          id: "feat-set",
          moduleId: "mod-factions",
          title: {"pt-BR": "Setagem", en: "Role setup"},
          description: {
            "pt-BR": "Fluxo guiado para entrada, promoção, afastamento e remoção de membros.",
            en: "Guided flow for onboarding, promotion, leave and member removal."
          },
          badge: "Roles",
          sortOrder: 2,
          published: true
        }
      ]
    },
    {
      id: "mod-support",
      slug: "atendimento",
      icon: "MessagesSquare",
      accent: "#f8fafc",
      sortOrder: 2,
      published: true,
      title: {"pt-BR": "Atendimento", en: "Support"},
      summary: {
        "pt-BR": "Tickets inteligentes, triagem e histórico organizado.",
        en: "Smart tickets, triage and organized history."
      },
      description: {
        "pt-BR":
          "Centralize pedidos, orçamento, suporte interno e denúncias com filas, tags, SLA e automações discretas.",
        en:
          "Centralize requests, quotes, internal support and reports with queues, tags, SLA and discreet automations."
      },
      features: [
        {
          id: "feat-ticket-router",
          moduleId: "mod-support",
          title: {"pt-BR": "Triagem automática", en: "Automatic triage"},
          description: {
            "pt-BR": "Direciona tickets para a equipe certa com base no contexto.",
            en: "Routes tickets to the right team based on context."
          },
          badge: "SLA",
          sortOrder: 1,
          published: true
        }
      ]
    },
    {
      id: "mod-economy",
      slug: "economia",
      icon: "BadgeDollarSign",
      accent: "#a78bfa",
      sortOrder: 3,
      published: true,
      title: {"pt-BR": "Economia", en: "Economy"},
      summary: {
        "pt-BR": "Saldos, lojas, recompensas e regras sob medida.",
        en: "Balances, shops, rewards and custom rules."
      },
      description: {
        "pt-BR":
          "Crie sistemas de progressão, premiação e compra com logs completos e proteções contra abuso.",
        en:
          "Create progression, reward and purchase systems with complete logs and anti-abuse safeguards."
      },
      features: [
        {
          id: "feat-shop",
          moduleId: "mod-economy",
          title: {"pt-BR": "Loja personalizada", en: "Custom shop"},
          description: {
            "pt-BR": "Itens, limites, aprovação e inventário integrados ao Discord.",
            en: "Items, limits, approvals and inventory integrated with Discord."
          },
          badge: "Store",
          sortOrder: 1,
          published: true
        }
      ]
    }
  ],
  showcase: [
    {
      id: "show-quality",
      type: "benefit",
      sortOrder: 1,
      published: true,
      metricValue: "24/7",
      metricLabel: {"pt-BR": "fluxos críticos", en: "critical flows"},
      title: {"pt-BR": "Engenharia pensada para produção", en: "Engineering built for production"},
      summary: {
        "pt-BR": "Permissões, logs, estados vazios, erros e auditoria tratados desde o primeiro desenho.",
        en: "Permissions, logs, empty states, errors and auditing handled from the first design."
      }
    },
    {
      id: "show-ux",
      type: "process",
      sortOrder: 2,
      published: true,
      metricValue: "UX",
      metricLabel: {"pt-BR": "sem fricção", en: "without friction"},
      title: {"pt-BR": "Comandos e painéis que a equipe entende", en: "Commands and panels your team understands"},
      summary: {
        "pt-BR": "Interfaces densas quando precisam ser rápidas, claras quando precisam guiar o usuário.",
        en: "Dense interfaces when speed matters, clear flows when users need guidance."
      }
    },
    {
      id: "show-secure",
      type: "benefit",
      sortOrder: 3,
      published: true,
      metricValue: "RLS",
      metricLabel: {"pt-BR": "dados protegidos", en: "protected data"},
      title: {"pt-BR": "Segurança como requisito, não extra", en: "Security as a requirement, not an extra"},
      summary: {
        "pt-BR": "Controles por cargo, ações auditáveis e validação server-side para reduzir risco operacional.",
        en: "Role controls, auditable actions and server-side validation to reduce operational risk."
      }
    }
  ],
  testimonials: [
    {
      id: "test-1",
      name: "Operação RP",
      role: {"pt-BR": "Comunidade com facções e atendimento", en: "Community with factions and support"},
      quote: {
        "pt-BR":
          "A automação tirou trabalho repetitivo da staff e deixou os processos mais claros para todo mundo.",
        en:
          "The automation removed repetitive staff work and made processes clearer for everyone."
      },
      sortOrder: 1,
      published: true
    },
    {
      id: "test-2",
      name: "Servidor competitivo",
      role: {"pt-BR": "Gestão de membros e metas", en: "Member and target management"},
      quote: {
        "pt-BR": "O bot parece parte do servidor, não uma ferramenta genérica adaptada às pressas.",
        en: "The bot feels like part of the server, not a generic tool hastily adapted."
      },
      sortOrder: 2,
      published: true
    }
  ],
  faqs: [
    {
      id: "faq-custom",
      question: {"pt-BR": "O bot é realmente personalizado?", en: "Is the bot actually custom?"},
      answer: {
        "pt-BR":
          "Sim. A proposta começa pelo fluxo do seu servidor e os módulos são desenhados para as permissões, cargos, regras e rotina da sua comunidade.",
        en:
          "Yes. The proposal starts from your server workflow and modules are designed around your permissions, roles, rules and community routine."
      },
      sortOrder: 1,
      published: true
    },
    {
      id: "faq-host",
      question: {"pt-BR": "Vocês hospedam e mantêm o bot?", en: "Do you host and maintain the bot?"},
      answer: {
        "pt-BR":
          "A estrutura pode incluir hospedagem, monitoramento e evolução contínua, conforme o escopo combinado no orçamento.",
        en:
          "The setup can include hosting, monitoring and ongoing evolution depending on the scope agreed in the quote."
      },
      sortOrder: 2,
      published: true
    },
    {
      id: "faq-start",
      question: {"pt-BR": "Como começo um orçamento?", en: "How do I start a quote?"},
      answer: {
        "pt-BR":
          "Entre pelo Discord com o objetivo do servidor, módulos desejados e exemplos do fluxo atual. A partir disso o escopo fica claro.",
        en:
          "Join through Discord with your server goal, desired modules and examples of the current workflow. From there the scope becomes clear."
      },
      sortOrder: 3,
      published: true
    }
  ]
};
