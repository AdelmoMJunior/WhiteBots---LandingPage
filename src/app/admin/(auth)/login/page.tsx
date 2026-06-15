import Image from "next/image";
import Link from "next/link";
import {requestMagicLink} from "@/app/admin/(auth)/login/actions";

type LoginPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getParam(
  params: Record<string, string | string[] | undefined>,
  key: string
) {
  const value = params[key];
  return Array.isArray(value) ? value[0] : value;
}

export default async function LoginPage({searchParams}: LoginPageProps) {
  const params = await searchParams;
  const error = getParam(params, "error");
  const sent = getParam(params, "sent");
  const next = getParam(params, "next") || "/admin";

  const errorText =
    error === "missing_supabase"
      ? "Configure as variáveis do Supabase para ativar o painel."
      : error === "not_admin"
        ? "Esse email não está autorizado como admin."
        : error
          ? "Não foi possível enviar o link. Verifique o email e as configurações."
          : "";

  return (
    <main className="flex min-h-screen items-center justify-center bg-graphite-950 px-5 py-12 text-silver-50">
      <div className="absolute inset-0 fine-grid opacity-35" aria-hidden="true" />
      <section className="metal-panel relative w-full max-w-md rounded-lg p-6">
        <div className="flex items-center gap-3">
          <Image src="/brand/whitebots-logo.png" alt="WhiteBots" width={54} height={54} />
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-violet-pulse">
              Admin
            </p>
            <h1 className="font-display text-2xl font-black text-white">WhiteBots</h1>
          </div>
        </div>

        <p className="mt-6 leading-7 text-silver-300">
          Entre com o email autorizado. O acesso usa magic link e não expõe senha no site.
        </p>

        {sent ? (
          <div className="mt-6 rounded-lg border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm text-emerald-100">
            Link enviado. Abra seu email e continue o login pelo link seguro.
          </div>
        ) : null}

        {errorText ? (
          <div className="mt-6 rounded-lg border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-100">
            {errorText}
          </div>
        ) : null}

        <form action={requestMagicLink} className="mt-6 space-y-4">
          <input type="hidden" name="next" value={next} />
          <label className="block">
            <span className="text-sm font-bold text-silver-200">Email</span>
            <input
              required
              type="email"
              name="email"
              autoComplete="email"
              className="focus-ring mt-2 w-full rounded-lg border border-white/12 bg-white/[0.04] px-4 py-3 text-white outline-none"
              placeholder="owner@example.com"
            />
          </label>
          <button
            type="submit"
            className="focus-ring w-full rounded-full bg-silver-50 px-5 py-3 text-sm font-black text-graphite-950"
          >
            Enviar link seguro
          </button>
        </form>

        <Link
          href="/pt-BR"
          className="focus-ring mt-6 inline-flex rounded-full px-1 text-sm font-semibold text-silver-400 hover:text-white"
        >
          Voltar ao site
        </Link>
      </section>
    </main>
  );
}
