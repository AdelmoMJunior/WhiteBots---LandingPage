import {
  deleteShowcase,
  deleteTestimonial,
  saveShowcase,
  saveTestimonial
} from "@/app/admin/actions";
import {
  DeleteButton,
  LocalizedField,
  PublishFields,
  SubmitButton,
  TextField
} from "@/components/admin/FormControls";
import {getAdminWriteClient} from "@/lib/admin";
import {getAdminContent} from "@/lib/content";
import type {ShowcaseItem, Testimonial} from "@/types/content";

const emptyLocalized = {"pt-BR": "", en: ""};

function ShowcaseForm({item}: {item?: ShowcaseItem}) {
  return (
    <form action={saveShowcase} className="space-y-4 rounded-lg border border-white/10 bg-white/[0.03] p-5">
      <input type="hidden" name="id" value={item?.id ?? ""} />
      <div className="grid gap-3 md:grid-cols-3">
        <label className="block">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-silver-400">
            Tipo
          </span>
          <select
            name="type"
            defaultValue={item?.type ?? "benefit"}
            className="focus-ring mt-2 w-full rounded-lg border border-white/10 bg-graphite-900 px-3 py-2.5 text-sm text-white"
          >
            <option value="benefit">benefit</option>
            <option value="case">case</option>
            <option value="process">process</option>
          </select>
        </label>
        <TextField label="Métrica" name="metric_value" defaultValue={item?.metricValue ?? ""} />
        <TextField label="Ordem" name="sort_order" type="number" defaultValue={item?.sortOrder ?? 0} />
      </div>
      <LocalizedField label="Título" name="title" defaultValue={item?.title ?? emptyLocalized} />
      <LocalizedField
        label="Resumo"
        name="summary"
        defaultValue={item?.summary ?? emptyLocalized}
        textarea
      />
      <LocalizedField
        label="Label da métrica"
        name="metric_label"
        defaultValue={item?.metricLabel ?? emptyLocalized}
      />
      <label className="flex items-center gap-3 text-sm font-bold text-silver-200">
        <input
          type="checkbox"
          name="published"
          defaultChecked={item?.published ?? false}
          className="h-4 w-4 accent-violet-brand"
        />
        Publicado
      </label>
      <SubmitButton>{item ? "Salvar item" : "Criar item"}</SubmitButton>
    </form>
  );
}

function TestimonialForm({item}: {item?: Testimonial}) {
  return (
    <form action={saveTestimonial} className="space-y-4 rounded-lg border border-white/10 bg-white/[0.03] p-5">
      <input type="hidden" name="id" value={item?.id ?? ""} />
      <TextField label="Nome" name="name" defaultValue={item?.name ?? ""} />
      <LocalizedField label="Cargo/contexto" name="role" defaultValue={item?.role ?? emptyLocalized} />
      <LocalizedField
        label="Depoimento"
        name="quote"
        defaultValue={item?.quote ?? emptyLocalized}
        textarea
      />
      <PublishFields sortOrder={item?.sortOrder ?? 0} published={item?.published ?? false} />
      <SubmitButton>{item ? "Salvar depoimento" : "Criar depoimento"}</SubmitButton>
    </form>
  );
}

export default async function ShowcaseAdminPage() {
  const {client} = await getAdminWriteClient();
  const content = await getAdminContent(client);

  return (
    <div>
      <p className="text-sm font-bold uppercase tracking-[0.22em] text-violet-pulse">
        Prova e vitrine
      </p>
      <h1 className="mt-3 font-display text-4xl font-black text-white">Benefícios, cases e depoimentos</h1>
      <p className="mt-4 max-w-2xl leading-7 text-silver-300">
        Controle os cards de resultado e as falas usadas para reforçar confiança na landing.
      </p>

      <section className="mt-8">
        <h2 className="font-display text-2xl font-black text-white">Novo item de vitrine</h2>
        <div className="mt-4">
          <ShowcaseForm />
        </div>
      </section>

      <section className="mt-8 grid gap-4">
        {content.showcase.map((item) => (
          <article key={item.id} className="metal-panel rounded-lg p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-silver-500">
                  {item.type}
                </p>
                <h2 className="mt-2 font-display text-2xl font-black text-white">
                  {item.title["pt-BR"]}
                </h2>
              </div>
              <form action={deleteShowcase}>
                <input type="hidden" name="id" value={item.id} />
                <DeleteButton>Excluir item</DeleteButton>
              </form>
            </div>
            <div className="mt-5">
              <ShowcaseForm item={item} />
            </div>
          </article>
        ))}
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-black text-white">Novo depoimento</h2>
        <div className="mt-4">
          <TestimonialForm />
        </div>
      </section>

      <section className="mt-8 grid gap-4">
        {content.testimonials.map((item) => (
          <article key={item.id} className="metal-panel rounded-lg p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-silver-500">
                  Depoimento
                </p>
                <h2 className="mt-2 font-display text-2xl font-black text-white">
                  {item.name}
                </h2>
              </div>
              <form action={deleteTestimonial}>
                <input type="hidden" name="id" value={item.id} />
                <DeleteButton>Excluir depoimento</DeleteButton>
              </form>
            </div>
            <div className="mt-5">
              <TestimonialForm item={item} />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
