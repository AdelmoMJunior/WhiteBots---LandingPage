import {
  deleteFeature,
  deleteModule,
  saveFeature,
  saveModule
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
import type {BotModule, ModuleFeature} from "@/types/content";

const emptyLocalized = {"pt-BR": "", en: ""};

function ModuleForm({module}: {module?: BotModule}) {
  return (
    <form action={saveModule} className="space-y-4 rounded-lg border border-white/10 bg-white/[0.03] p-5">
      <input type="hidden" name="id" value={module?.id ?? ""} />
      <div className="grid gap-3 md:grid-cols-3">
        <TextField label="Slug" name="slug" defaultValue={module?.slug ?? ""} placeholder="faccoes" />
        <TextField label="Ícone" name="icon" defaultValue={module?.icon ?? "Bot"} />
        <TextField label="Cor" name="accent" defaultValue={module?.accent ?? "#8b5cf6"} />
      </div>
      <LocalizedField label="Título" name="title" defaultValue={module?.title ?? emptyLocalized} />
      <LocalizedField label="Resumo" name="summary" defaultValue={module?.summary ?? emptyLocalized} />
      <LocalizedField
        label="Descrição"
        name="description"
        defaultValue={module?.description ?? emptyLocalized}
        textarea
      />
      <PublishFields sortOrder={module?.sortOrder ?? 0} published={module?.published ?? false} />
      <SubmitButton>{module ? "Salvar módulo" : "Criar módulo"}</SubmitButton>
    </form>
  );
}

function FeatureForm({feature, moduleId}: {feature?: ModuleFeature; moduleId: string}) {
  return (
    <form action={saveFeature} className="space-y-3 rounded-lg border border-white/10 bg-graphite-950/55 p-4">
      <input type="hidden" name="id" value={feature?.id ?? ""} />
      <input type="hidden" name="module_id" value={moduleId} />
      <div className="grid gap-3 md:grid-cols-2">
        <TextField label="Badge" name="badge" defaultValue={feature?.badge ?? ""} required={false} />
        <TextField label="Ordem" name="sort_order" type="number" defaultValue={feature?.sortOrder ?? 0} />
      </div>
      <LocalizedField label="Função" name="title" defaultValue={feature?.title ?? emptyLocalized} />
      <LocalizedField
        label="Descrição"
        name="description"
        defaultValue={feature?.description ?? emptyLocalized}
        textarea
      />
      <label className="flex items-center gap-3 text-sm font-bold text-silver-200">
        <input
          type="checkbox"
          name="published"
          defaultChecked={feature?.published ?? false}
          className="h-4 w-4 accent-violet-brand"
        />
        Publicado
      </label>
      <SubmitButton>{feature ? "Salvar função" : "Criar função"}</SubmitButton>
    </form>
  );
}

export default async function ModulesAdminPage() {
  const {client} = await getAdminWriteClient();
  const content = await getAdminContent(client);

  return (
    <div>
      <p className="text-sm font-bold uppercase tracking-[0.22em] text-violet-pulse">
        Arquitetura modular
      </p>
      <h1 className="mt-3 font-display text-4xl font-black text-white">Módulos e funções</h1>
      <p className="mt-4 max-w-2xl leading-7 text-silver-300">
        Cadastre módulos como Facções, Economia e Atendimento. Dentro de cada módulo, adicione
        funções específicas como farm, setagem e triagem.
      </p>

      <section className="mt-8">
        <h2 className="font-display text-2xl font-black text-white">Novo módulo</h2>
        <div className="mt-4">
          <ModuleForm />
        </div>
      </section>

      <section className="mt-10 space-y-6">
        {content.modules.map((module) => (
          <article key={module.id} className="metal-panel rounded-lg p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-silver-500">
                  {module.slug}
                </p>
                <h2 className="mt-2 font-display text-2xl font-black text-white">
                  {module.title["pt-BR"]}
                </h2>
              </div>
              <form action={deleteModule}>
                <input type="hidden" name="id" value={module.id} />
                <DeleteButton>Excluir módulo</DeleteButton>
              </form>
            </div>

            <div className="mt-5">
              <ModuleForm module={module} />
            </div>

            <div className="mt-6 border-t border-white/10 pt-6">
              <h3 className="font-display text-xl font-black text-white">Funções</h3>
              <div className="mt-4 grid gap-4">
                <FeatureForm moduleId={module.id} />
                {module.features.map((feature) => (
                  <div key={feature.id} className="grid gap-3">
                    <FeatureForm feature={feature} moduleId={module.id} />
                    <form action={deleteFeature}>
                      <input type="hidden" name="id" value={feature.id} />
                      <DeleteButton>Excluir função</DeleteButton>
                    </form>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
