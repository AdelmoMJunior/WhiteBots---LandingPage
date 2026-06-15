"use server";

import {redirect} from "next/navigation";
import {createSupabaseServerClient} from "@/lib/supabase/server";
import {getSiteUrl} from "@/lib/env";

export async function requestMagicLink(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const next = String(formData.get("next") || "/admin");

  if (!email) {
    redirect("/admin/login?error=email_required");
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    redirect("/admin/login?error=missing_supabase");
  }

  const redirectTo = `${getSiteUrl()}/admin/auth/callback?next=${encodeURIComponent(next)}`;
  const {error} = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectTo,
      shouldCreateUser: false
    }
  });

  if (error) {
    redirect(`/admin/login?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/admin/login?sent=1");
}
