import {NextResponse, type NextRequest} from "next/server";
import {createServerClient} from "@supabase/ssr";
import {getAdminEmails, getSupabasePublicConfig} from "@/lib/env";
import type {Database} from "@/types/database";

const publicAdminPaths = ["/admin/login", "/admin/auth/callback"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (!pathname.startsWith("/admin") || publicAdminPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const config = getSupabasePublicConfig();

  if (!config) {
    return NextResponse.redirect(new URL("/admin/login?error=missing_supabase", request.url));
  }

  let response = NextResponse.next({
    request
  });

  const supabase = createServerClient<Database>(config.url, config.anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({name, value}) => request.cookies.set(name, value));
        response = NextResponse.next({request});
        cookiesToSet.forEach(({name, value, options}) => {
          response.cookies.set(name, value, options);
        });
      }
    }
  });

  const {
    data: {user}
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const email = user.email.toLowerCase();
  const envAdmin = getAdminEmails().includes(email);

  if (envAdmin) {
    return response;
  }

  const {data} = await supabase
    .from("admin_users")
    .select("id")
    .eq("email", email)
    .eq("active", true)
    .maybeSingle();

  if (!data) {
    return NextResponse.redirect(new URL("/admin/login?error=not_admin", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"]
};
