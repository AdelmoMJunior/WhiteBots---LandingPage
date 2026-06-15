insert into public.modules (slug, title, summary, description, icon, accent, sort_order, published)
values
  (
    'faccoes',
    '{"pt-BR":"Facções","en":"Factions"}',
    '{"pt-BR":"Controle de membros, cargos, metas e rotina operacional.","en":"Member control, roles, targets and operational routine."}',
    '{"pt-BR":"Um módulo completo para servidores RP e comunidades competitivas, com permissões, histórico e automações conectadas ao jeito que sua equipe trabalha.","en":"A complete module for RP servers and competitive communities, with permissions, history and automations tied to how your team works."}',
    'Shield',
    '#8b5cf6',
    1,
    true
  ),
  (
    'atendimento',
    '{"pt-BR":"Atendimento","en":"Support"}',
    '{"pt-BR":"Tickets inteligentes, triagem e histórico organizado.","en":"Smart tickets, triage and organized history."}',
    '{"pt-BR":"Centralize pedidos, orçamento, suporte interno e denúncias com filas, tags, SLA e automações discretas.","en":"Centralize requests, quotes, internal support and reports with queues, tags, SLA and discreet automations."}',
    'MessagesSquare',
    '#f8fafc',
    2,
    true
  ),
  (
    'economia',
    '{"pt-BR":"Economia","en":"Economy"}',
    '{"pt-BR":"Saldos, lojas, recompensas e regras sob medida.","en":"Balances, shops, rewards and custom rules."}',
    '{"pt-BR":"Crie sistemas de progressão, premiação e compra com logs completos e proteções contra abuso.","en":"Create progression, reward and purchase systems with complete logs and anti-abuse safeguards."}',
    'BadgeDollarSign',
    '#a78bfa',
    3,
    true
  )
on conflict (slug) do nothing;

insert into public.module_features (module_id, title, description, badge, sort_order, published)
select m.id, f.title::jsonb, f.description::jsonb, f.badge, f.sort_order, true
from public.modules m
join (
  values
    (
      'faccoes',
      '{"pt-BR":"Farm","en":"Farm"}',
      '{"pt-BR":"Registro de entregas, metas, ranking e conferência por período.","en":"Delivery logs, targets, rankings and period-based checks."}',
      'Ops',
      1
    ),
    (
      'faccoes',
      '{"pt-BR":"Setagem","en":"Role setup"}',
      '{"pt-BR":"Fluxo guiado para entrada, promoção, afastamento e remoção de membros.","en":"Guided flow for onboarding, promotion, leave and member removal."}',
      'Roles',
      2
    ),
    (
      'atendimento',
      '{"pt-BR":"Triagem automática","en":"Automatic triage"}',
      '{"pt-BR":"Direciona tickets para a equipe certa com base no contexto.","en":"Routes tickets to the right team based on context."}',
      'SLA',
      1
    ),
    (
      'economia',
      '{"pt-BR":"Loja personalizada","en":"Custom shop"}',
      '{"pt-BR":"Itens, limites, aprovação e inventário integrados ao Discord.","en":"Items, limits, approvals and inventory integrated with Discord."}',
      'Store',
      1
    )
) as f(slug, title, description, badge, sort_order) on f.slug = m.slug
where not exists (
  select 1 from public.module_features existing
  where existing.module_id = m.id
    and existing.title ->> 'pt-BR' = f.title::jsonb ->> 'pt-BR'
);

insert into public.showcase_items (type, title, summary, metric_label, metric_value, sort_order, published)
values
  (
    'benefit',
    '{"pt-BR":"Engenharia pensada para produção","en":"Engineering built for production"}',
    '{"pt-BR":"Permissões, logs, estados vazios, erros e auditoria tratados desde o primeiro desenho.","en":"Permissions, logs, empty states, errors and auditing handled from the first design."}',
    '{"pt-BR":"fluxos críticos","en":"critical flows"}',
    '24/7',
    1,
    true
  ),
  (
    'process',
    '{"pt-BR":"Comandos e painéis que a equipe entende","en":"Commands and panels your team understands"}',
    '{"pt-BR":"Interfaces densas quando precisam ser rápidas, claras quando precisam guiar o usuário.","en":"Dense interfaces when speed matters, clear flows when users need guidance."}',
    '{"pt-BR":"sem fricção","en":"without friction"}',
    'UX',
    2,
    true
  )
on conflict do nothing;

insert into public.testimonials (name, role, quote, sort_order, published)
values
  (
    'Operação RP',
    '{"pt-BR":"Comunidade com facções e atendimento","en":"Community with factions and support"}',
    '{"pt-BR":"A automação tirou trabalho repetitivo da staff e deixou os processos mais claros para todo mundo.","en":"The automation removed repetitive staff work and made processes clearer for everyone."}',
    1,
    true
  )
on conflict do nothing;

insert into public.faqs (question, answer, sort_order, published)
values
  (
    '{"pt-BR":"O bot é realmente personalizado?","en":"Is the bot actually custom?"}',
    '{"pt-BR":"Sim. A proposta começa pelo fluxo do seu servidor e os módulos são desenhados para as permissões, cargos, regras e rotina da sua comunidade.","en":"Yes. The proposal starts from your server workflow and modules are designed around your permissions, roles, rules and community routine."}',
    1,
    true
  ),
  (
    '{"pt-BR":"Como começo um orçamento?","en":"How do I start a quote?"}',
    '{"pt-BR":"Entre pelo Discord com o objetivo do servidor, módulos desejados e exemplos do fluxo atual.","en":"Join through Discord with your server goal, desired modules and examples of the current workflow."}',
    2,
    true
  )
on conflict do nothing;
