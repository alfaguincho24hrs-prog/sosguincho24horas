import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/admin/logout")({
  server: {
    handlers: {
      POST: async () => {
        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Set-Cookie":
              "admin_session=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0",
          },
        });
      },
    },
  },
});
