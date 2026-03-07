import { updateSession } from "@/lib/supabase/middleware";
import { type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, icon.svg, etc
     * - public files (images, manifest, etc)
     */
    "/((?!_next/static|_next/image|favicon.ico|icon\\.svg|apple-icon\\.svg|site\\.webmanifest|.*\\.(?:png|jpg|jpeg|gif|webp)$).*)",
  ],
};
