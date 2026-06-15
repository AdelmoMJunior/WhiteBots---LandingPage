import {deleteFaq, saveFaq} from "@/app/admin/actions";
import {
  DeleteButton,
  LocalizedField,
  PublishFields,
  SubmitButton
} from "@/components/admin/FormControls";
import {getAdminWriteClient} from "@/lib/admin";
import {getAdminContent} from "@/lib/content";
import type {FaqItem} from "@/types/content";

const emptyLocalized = {"pt-BR": "", en: ""};

function FaqForm({faq}: {faq?: FaqItem}) {
  return (
    <form action={saveFaq} className="space-y-4 rounded-lg border border-white/10 bg-white/[0.03] p-5">
      <input type="hidden" name="id" value={faq?.id ?? ""} />
      <LocalizedField label="Pergunta" name="question" defaultValue={faq?.question ?? emptyLocalized} />
      <LocalizedField
        label="Resposta"
        name="answer"
        defaultValue={faq?.answer ?? emptyLocalized}
        textarea
      />
      <PublishFields sortOrder={faq?.sortOrder ?? 0} published={faq?.published ?? false} />
      <SubmitButton>{faq ? "Salvar FAQ" : "Criar FAQ"}</SubmitButton>
    </form>
  );
}

export default async function FaqAdminPage() {
  const {client} = await getAdminWriteClient();
  const content = await getAdminContent(client);

  return (
    <div>
      <p className="text-sm font-bold uppercase tracking-[0.22em] text-violet-pulse">
        Conteúdo comercial
      </p>
      <h1 className="mt-3 font-display text-4xl font-black text-white">FAQ</h1>
      <p className="mt-4 max-w-2xl leading-7 text-silver-300">
        Perguntas e respostas aparecem no fim da landing e ajudam o cliente a chegar no Discord
        com menos dúvidas.
      </p>

      <section className="mt-8">
        <h2 className="font-display text-2xl font-black text-white">Nova pergunta</h2>
        <div className="mt-4">
          <FaqForm />
        </div>
      </section>

      <section className="mt-8 grid gap-4">
        {content.faqs.map((faq) => (
          <article key={faq.id} className="metal-panel rounded-lg p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <h2 className="font-display text-2xl font-black text-white">
                {faq.question["pt-BR"]}
              </h2>
              <form action={deleteFaq}>
                <input type="hidden" name="id" value={faq.id} />
                <DeleteButton>Excluir FAQ</DeleteButton>
              </form>
            </div>
            <div className="mt-5">
              <FaqForm faq={faq} />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
