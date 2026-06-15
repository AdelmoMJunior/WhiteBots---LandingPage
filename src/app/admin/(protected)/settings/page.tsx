import {saveSettings} from "@/app/admin/actions";
import {
  LocalizedField,
  SubmitButton,
  TextField
} from "@/components/admin/FormControls";
import {getAdminWriteClient} from "@/lib/admin";
import {getAdminContent} from "@/lib/content";

export default async function SettingsAdminPage() {
  const {client} = await getAdminWriteClient();
  const content = await getAdminContent(client);
  const settings = content.settings;

  return (
    <div>
      <p className="text-sm font-bold uppercase tracking-[0.22em] text-violet-pulse">
        Conversão
      </p>
      <h1 className="mt-3 font-display text-4xl font-black text-white">Configurações do site</h1>
      <p className="mt-4 max-w-2xl leading-7 text-silver-300">
        Ajuste o link principal do Discord e as principais mensagens da landing nos dois idiomas.
      </p>

      <form action={saveSettings} className="metal-panel mt-8 space-y-5 rounded-lg p-5">
        <TextField label="Discord URL" name="discordUrl" defaultValue={settings.discordUrl} type="url" />
        <LocalizedField label="Eyebrow hero" name="heroEyebrow" defaultValue={settings.heroEyebrow} />
        <LocalizedField label="Título hero" name="heroTitle" defaultValue={settings.heroTitle} textarea />
        <LocalizedField
          label="Subtítulo hero"
          name="heroSubtitle"
          defaultValue={settings.heroSubtitle}
          textarea
        />
        <LocalizedField label="CTA principal" name="primaryCta" defaultValue={settings.primaryCta} />
        <LocalizedField label="CTA secundário" name="secondaryCta" defaultValue={settings.secondaryCta} />
        <LocalizedField label="Título final" name="finalTitle" defaultValue={settings.finalTitle} textarea />
        <LocalizedField
          label="Subtítulo final"
          name="finalSubtitle"
          defaultValue={settings.finalSubtitle}
          textarea
        />
        <SubmitButton>Salvar configurações</SubmitButton>
      </form>
    </div>
  );
}
