import {cookies} from "next/headers";
import {createServerClient} from "@supabase/ssr";
import {createClient} from "@supabase/supabase-js";
import {getSupabasePublicConfig, getSupabaseServiceConfig} from "@/lib/env";
import type {Database} from "@/types/database";

export async function createSupabaseServerClient() {
  const config = getSupabasePublicConfig();

  if (!config) {
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient<Database>(config.url, config.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({name, value, options}) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server components cannot always set cookies; middleware/server actions refresh sessions.
        }
      }
    }
  });
}

export function createSupabasePublicClient() {
  const config = getSupabasePublicConfig();

  if (!config) {
    return null;
  }

  return createClient<Database>(config.url, config.anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}

export function createSupabaseServiceClient() {
  const config = getSupabaseServiceConfig();

  if (!config) {
    return null;
  }

  return createClient<Database>(config.url, config.serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
