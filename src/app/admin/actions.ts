"use server";

import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import type {SupabaseClient, User} from "@supabase/supabase-js";
import {getAdminWriteClient} from "@/lib/admin";
import {
  boolFromForm,
  localizedFromForm,
  numberFromForm
} from "@/lib/localized";
import {
  faqSchema,
  featureSchema,
  moduleSchema,
  showcaseSchema,
  siteSettingsSchema,
  testimonialSchema
} from "@/lib/validators";
import type {Database, Json} from "@/types/database";

type WriteClient = SupabaseClient<Database>;

function idFromForm(formData: FormData) {
  return String(formData.get("id") || "").trim();
}

function cleanId(id: string) {
  return id.length ? id : undefined;
}

function revalidatePublicAndAdmin(path: string) {
  revalidatePath("/pt-BR");
  revalidatePath("/en");
  revalidatePath("/admin");
  revalidatePath(path);
}

async function withWriteClient() {
  const {client, user} = await getAdminWriteClient();

  if (!client) {
    redirect("/admin/login?error=missing_supabase");
  }

  return {client: client as WriteClient, user};
}

async function audit(
  client: WriteClient,
  user: User | null,
  action: string,
  entity: string,
  entityId?: string,
  payload: Json = {}
) {
  await client.from("audit_log").insert({
    actor_id: user?.id ?? null,
    actor_email: user?.email ?? null,
    action,
    entity,
    entity_id: entityId ?? null,
    payload
  });
}

export async function signOutAdmin() {
  const {createSupabaseServerClient} = await import("@/lib/supabase/server");
  const supabase = await createSupabaseServerClient();
  await supabase?.auth.signOut();
  redirect("/admin/login");
}

export async function saveModule(formData: FormData) {
  const {client, user} = await withWriteClient();
  const parsed = moduleSchema.parse({
    id: idFromForm(formData),
    slug: String(formData.get("slug") || ""),
    title: localizedFromForm(formData, "title"),
    summary: localizedFromForm(formData, "summary"),
    description: localizedFromForm(formData, "description"),
    icon: String(formData.get("icon") || "Bot"),
    accent: String(formData.get("accent") || "#8b5cf6"),
    sort_order: numberFromForm(formData, "sort_order"),
    published: boolFromForm(formData, "published")
  });

  const id = cleanId(parsed.id ?? "");
  const payload = {
    slug: parsed.slug,
    title: parsed.title,
    summary: parsed.summary,
    description: parsed.description,
    icon: parsed.icon,
    accent: parsed.accent,
    sort_order: parsed.sort_order,
    published: parsed.published
  };

  const result = id
    ? await client.from("modules").update(payload).eq("id", id).select("id").single()
    : await client.from("modules").insert(payload).select("id").single();

  if (result.error) {
    throw new Error(result.error.message);
  }

  await audit(client, user, id ? "update" : "create", "modules", result.data.id, payload);
  revalidatePublicAndAdmin("/admin/modules");
}

export async function deleteModule(formData: FormData) {
  const {client, user} = await withWriteClient();
  const id = idFromForm(formData);
  const {error} = await client.from("modules").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  await audit(client, user, "delete", "modules", id);
  revalidatePublicAndAdmin("/admin/modules");
}

export async function saveFeature(formData: FormData) {
  const {client, user} = await withWriteClient();
  const parsed = featureSchema.parse({
    id: idFromForm(formData),
    module_id: String(formData.get("module_id") || ""),
    title: localizedFromForm(formData, "title"),
    description: localizedFromForm(formData, "description"),
    badge: String(formData.get("badge") || ""),
    sort_order: numberFromForm(formData, "sort_order"),
    published: boolFromForm(formData, "published")
  });

  const id = cleanId(parsed.id ?? "");
  const payload = {
    module_id: parsed.module_id,
    title: parsed.title,
    description: parsed.description,
    badge: parsed.badge,
    sort_order: parsed.sort_order,
    published: parsed.published
  };

  const result = id
    ? await client.from("module_features").update(payload).eq("id", id).select("id").single()
    : await client.from("module_features").insert(payload).select("id").single();

  if (result.error) {
    throw new Error(result.error.message);
  }

  await audit(client, user, id ? "update" : "create", "module_features", result.data.id, payload);
  revalidatePublicAndAdmin("/admin/modules");
}

export async function deleteFeature(formData: FormData) {
  const {client, user} = await withWriteClient();
  const id = idFromForm(formData);
  const {error} = await client.from("module_features").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  await audit(client, user, "delete", "module_features", id);
  revalidatePublicAndAdmin("/admin/modules");
}

export async function saveShowcase(formData: FormData) {
  const {client, user} = await withWriteClient();
  const parsed = showcaseSchema.parse({
    id: idFromForm(formData),
    type: String(formData.get("type") || "benefit"),
    title: localizedFromForm(formData, "title"),
    summary: localizedFromForm(formData, "summary"),
    metric_label: localizedFromForm(formData, "metric_label"),
    metric_value: String(formData.get("metric_value") || ""),
    sort_order: numberFromForm(formData, "sort_order"),
    published: boolFromForm(formData, "published")
  });

  const id = cleanId(parsed.id ?? "");
  const payload = {
    type: parsed.type,
    title: parsed.title,
    summary: parsed.summary,
    metric_label: parsed.metric_label,
    metric_value: parsed.metric_value,
    sort_order: parsed.sort_order,
    published: parsed.published
  };

  const result = id
    ? await client.from("showcase_items").update(payload).eq("id", id).select("id").single()
    : await client.from("showcase_items").insert(payload).select("id").single();

  if (result.error) {
    throw new Error(result.error.message);
  }

  await audit(client, user, id ? "update" : "create", "showcase_items", result.data.id, payload);
  revalidatePublicAndAdmin("/admin/showcase");
}

export async function deleteShowcase(formData: FormData) {
  const {client, user} = await withWriteClient();
  const id = idFromForm(formData);
  const {error} = await client.from("showcase_items").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  await audit(client, user, "delete", "showcase_items", id);
  revalidatePublicAndAdmin("/admin/showcase");
}

export async function saveTestimonial(formData: FormData) {
  const {client, user} = await withWriteClient();
  const parsed = testimonialSchema.parse({
    id: idFromForm(formData),
    name: String(formData.get("name") || ""),
    role: localizedFromForm(formData, "role"),
    quote: localizedFromForm(formData, "quote"),
    sort_order: numberFromForm(formData, "sort_order"),
    published: boolFromForm(formData, "published")
  });

  const id = cleanId(parsed.id ?? "");
  const payload = {
    name: parsed.name,
    role: parsed.role,
    quote: parsed.quote,
    sort_order: parsed.sort_order,
    published: parsed.published
  };

  const result = id
    ? await client.from("testimonials").update(payload).eq("id", id).select("id").single()
    : await client.from("testimonials").insert(payload).select("id").single();

  if (result.error) {
    throw new Error(result.error.message);
  }

  await audit(client, user, id ? "update" : "create", "testimonials", result.data.id, payload);
  revalidatePublicAndAdmin("/admin/showcase");
}

export async function deleteTestimonial(formData: FormData) {
  const {client, user} = await withWriteClient();
  const id = idFromForm(formData);
  const {error} = await client.from("testimonials").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  await audit(client, user, "delete", "testimonials", id);
  revalidatePublicAndAdmin("/admin/showcase");
}

export async function saveFaq(formData: FormData) {
  const {client, user} = await withWriteClient();
  const parsed = faqSchema.parse({
    id: idFromForm(formData),
    question: localizedFromForm(formData, "question"),
    answer: localizedFromForm(formData, "answer"),
    sort_order: numberFromForm(formData, "sort_order"),
    published: boolFromForm(formData, "published")
  });

  const id = cleanId(parsed.id ?? "");
  const payload = {
    question: parsed.question,
    answer: parsed.answer,
    sort_order: parsed.sort_order,
    published: parsed.published
  };

  const result = id
    ? await client.from("faqs").update(payload).eq("id", id).select("id").single()
    : await client.from("faqs").insert(payload).select("id").single();

  if (result.error) {
    throw new Error(result.error.message);
  }

  await audit(client, user, id ? "update" : "create", "faqs", result.data.id, payload);
  revalidatePublicAndAdmin("/admin/faq");
}

export async function deleteFaq(formData: FormData) {
  const {client, user} = await withWriteClient();
  const id = idFromForm(formData);
  const {error} = await client.from("faqs").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  await audit(client, user, "delete", "faqs", id);
  revalidatePublicAndAdmin("/admin/faq");
}

export async function saveSettings(formData: FormData) {
  const {client, user} = await withWriteClient();
  const parsed = siteSettingsSchema.parse({
    discordUrl: String(formData.get("discordUrl") || ""),
    heroEyebrow: localizedFromForm(formData, "heroEyebrow"),
    heroTitle: localizedFromForm(formData, "heroTitle"),
    heroSubtitle: localizedFromForm(formData, "heroSubtitle"),
    primaryCta: localizedFromForm(formData, "primaryCta"),
    secondaryCta: localizedFromForm(formData, "secondaryCta"),
    finalTitle: localizedFromForm(formData, "finalTitle"),
    finalSubtitle: localizedFromForm(formData, "finalSubtitle")
  });

  const {error} = await client.from("site_settings").upsert({
    key: "landing",
    value: parsed
  });

  if (error) {
    throw new Error(error.message);
  }

  await audit(client, user, "update", "site_settings", undefined, parsed);
  revalidatePublicAndAdmin("/admin/settings");
}
