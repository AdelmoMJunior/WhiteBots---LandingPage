import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-graphite-950 px-6 text-center text-silver-50">
      <div className="max-w-md">
        <p className="text-sm uppercase tracking-[0.28em] text-violet-pulse">404</p>
        <h1 className="mt-4 font-display text-4xl font-bold">Página não encontrada</h1>
        <p className="mt-4 text-silver-300">
          O endereço solicitado não existe ou foi movido.
        </p>
        <Link
          href="/pt-BR"
          className="focus-ring mt-8 inline-flex rounded-full bg-silver-50 px-6 py-3 text-sm font-bold text-graphite-950"
        >
          Voltar para WhiteBots
        </Link>
      </div>
    </main>
  );
}
