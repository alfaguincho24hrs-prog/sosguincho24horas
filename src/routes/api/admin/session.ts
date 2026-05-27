import { createFileRoute } from "@tanstack/react-router";
import { verifySession } from "./login";

function parseCookie(header: string | null, name: string): string | undefined {
  if (!header) return undefined;
  for (const part of header.split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k === name) return v.join("=");
  }
  return undefined;
}

export const Route = createFileRoute("/api/admin/session")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const cookie = parseCookie(request.headers.get("cookie"), "admin_session");
        const authed = verifySession(cookie);
        return new Response(JSON.stringify({ authed }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
