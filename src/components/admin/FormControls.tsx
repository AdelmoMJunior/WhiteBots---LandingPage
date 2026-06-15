import type {LocalizedText} from "@/types/content";

export function TextField({
  label,
  name,
  defaultValue = "",
  type = "text",
  required = true,
  placeholder
}: {
  label: string;
  name: string;
  defaultValue?: string | number;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-[0.16em] text-silver-400">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="focus-ring mt-2 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none"
      />
    </label>
  );
}

export function TextareaField({
  label,
  name,
  defaultValue = "",
  rows = 4
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-[0.16em] text-silver-400">
        {label}
      </span>
      <textarea
        name={name}
        required
        rows={rows}
        defaultValue={defaultValue}
        className="focus-ring mt-2 w-full resize-y rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm leading-6 text-white outline-none"
      />
    </label>
  );
}

export function LocalizedField({
  label,
  name,
  defaultValue,
  textarea = false
}: {
  label: string;
  name: string;
  defaultValue: LocalizedText;
  textarea?: boolean;
}) {
  const Field = textarea ? TextareaField : TextField;

  return (
    <div className="grid gap-3 md:grid-cols-2">
      <Field label={`${label} PT`} name={`${name}_pt`} defaultValue={defaultValue["pt-BR"]} />
      <Field label={`${label} EN`} name={`${name}_en`} defaultValue={defaultValue.en} />
    </div>
  );
}

export function PublishFields({
  sortOrder = 0,
  published = false
}: {
  sortOrder?: number;
  published?: boolean;
}) {
  return (
    <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
      <TextField
        label="Ordem"
        name="sort_order"
        type="number"
        defaultValue={sortOrder}
        required
      />
      <label className="flex min-h-[43px] items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm font-bold text-silver-200">
        <input
          type="checkbox"
          name="published"
          defaultChecked={published}
          className="h-4 w-4 accent-violet-brand"
        />
        Publicado
      </label>
    </div>
  );
}

export function SubmitButton({children = "Salvar"}: {children?: React.ReactNode}) {
  return (
    <button
      type="submit"
      className="focus-ring rounded-full bg-silver-50 px-5 py-2.5 text-sm font-black text-graphite-950 transition hover:bg-white"
    >
      {children}
    </button>
  );
}

export function DeleteButton({children = "Excluir"}: {children?: React.ReactNode}) {
  return (
    <button
      type="submit"
      className="focus-ring rounded-full border border-red-300/25 px-4 py-2 text-sm font-bold text-red-100 transition hover:bg-red-400/10"
    >
      {children}
    </button>
  );
}
