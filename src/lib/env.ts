export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";
}

export function getDiscordUrl() {
  return process.env.NEXT_PUBLIC_DISCORD_URL || "https://discord.gg/whitebots";
}

export function getGaId() {
  return process.env.NEXT_PUBLIC_GA_ID || "";
}

export function getAdminEmails() {
  return (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function getSupabasePublicConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  return {url, anonKey};
}

export function getSupabaseServiceConfig() {
  const publicConfig = getSupabasePublicConfig();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!publicConfig || !serviceRoleKey) {
    return null;
  }

  return {...publicConfig, serviceRoleKey};
}
