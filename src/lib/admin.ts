import {redirect} from "next/navigation";
import type {User} from "@supabase/supabase-js";
import {getAdminEmails} from "@/lib/env";
import {
  createSupabaseServerClient,
  createSupabaseServiceClient
} from "@/lib/supabase/server";

export async function isAdminUser(user: User | null) {
  if (!user?.email) {
    return false;
  }

  const email = user.email.toLowerCase();
  const envAdmins = getAdminEmails();

  if (envAdmins.includes(email)) {
    return true;
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return false;
  }

  const {data} = await supabase
    .from("admin_users")
    .select("id")
    .eq("email", email)
    .eq("active", true)
    .maybeSingle();

  return Boolean(data);
}

export async function getAdminSession(options: {redirectOnFail?: boolean} = {}) {
  const redirectOnFail = options.redirectOnFail ?? true;
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    if (redirectOnFail) {
      redirect("/admin/login?error=missing_supabase");
    }

    return {supabase: null, user: null, isAdmin: false};
  }

  const {
    data: {user}
  } = await supabase.auth.getUser();

  if (!user) {
    if (redirectOnFail) {
      redirect("/admin/login");
    }

    return {supabase, user: null, isAdmin: false};
  }

  const isAdmin = await isAdminUser(user);

  if (!isAdmin && redirectOnFail) {
    redirect("/admin/login?error=not_admin");
  }

  return {supabase, user, isAdmin};
}

export async function getAdminWriteClient() {
  const session = await getAdminSession();
  const serviceClient = createSupabaseServiceClient();

  return {
    client: serviceClient ?? session.supabase,
    user: session.user
  };
}
