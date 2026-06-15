# WhiteBots Site

Landing page premium e painel privado para a WhiteBots, construídos em um único app Next.js.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS
- Supabase Auth, Postgres e RLS
- Three.js/React Three Fiber para a cena 3D
- Google Analytics 4 com Consent Mode
- Vitest e Playwright

## Rotas

- `/` redireciona para `/pt-BR`
- `/pt-BR` e `/en` exibem a landing bilíngue
- `/admin/login` envia magic link para email autorizado
- `/admin` edita módulos, funções, vitrine, depoimentos, FAQ e textos/CTA

## Setup Local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Variáveis principais:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_DB_URL=
ADMIN_EMAILS=seu-email@dominio.com
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_DISCORD_URL=https://discord.gg/whitebots
SUPABASE_SERVICE_ROLE_KEY=
```

`SUPABASE_SERVICE_ROLE_KEY` é opcional, mas recomendado para mutações do admin após a checagem server-side de email autorizado. Nunca use essa chave em componente client nem com prefixo `NEXT_PUBLIC_`.

## Supabase

1. Crie um projeto Supabase.
2. Rode `supabase/migrations/0001_whitebots_schema.sql`.
3. Rode `supabase/seed.sql` para conteúdo inicial.
4. Adicione o email admin:

```sql
insert into public.admin_users (email, role, active)
values ('seu-email@dominio.com', 'owner', true)
on conflict (email) do update set active = true;
```

No Supabase Auth, mantenha cadastro público desabilitado. O login do site usa magic link com `shouldCreateUser: false`, então o usuário precisa existir ou ser criado pelo painel do Supabase.

## Deploy na Vercel

1. Suba o repositório para o GitHub.
2. Importe o projeto na Vercel como app Next.js.
3. Configure as variáveis de ambiente da seção `Setup Local`.
4. Use o comando de build padrão: `npm run build`.
5. Depois do primeiro deploy, atualize `NEXT_PUBLIC_SITE_URL` com a URL final do domínio.

## Qualidade

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run test:e2e
npm run audit:prod
```

O site usa `public/brand/whitebots-logo.png` como logo canônica e mantém `whitebots-logo.svg` apenas como fallback visual.
