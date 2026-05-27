import { createFileRoute } from "@tanstack/react-router";
import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 8; // 8h

function getSecret() {
  return process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD || "";
}

export function signSession(expiresAt: number) {
  const secret = getSecret();
  const payload = String(expiresAt);
  const sig = createHmac("sha256", secret).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifySession(value: string | undefined): boolean {
  if (!value) return false;
  const [payload, sig] = value.split(".");
  if (!payload || !sig) return false;
  const expiresAt = Number(payload);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return false;
  const secret = getSecret();
  const expected = createHmac("sha256", secret).update(payload).digest("hex");
  try {
    const a = Buffer.from(sig, "hex");
    const b = Buffer.from(expected, "hex");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export const Route = createFileRoute("/api/admin/login")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const adminPass = process.env.ADMIN_PASSWORD;
        if (!adminPass) {
          return new Response(
            JSON.stringify({
              error:
                "Admin password is not configured. Set the ADMIN_PASSWORD environment variable on the server.",
            }),
            { status: 503, headers: { "Content-Type": "application/json" } },
          );
        }

        let body: { password?: string } = {};
        try {
          body = await request.json();
        } catch {
          return new Response(JSON.stringify({ error: "Invalid body" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        const submitted = typeof body.password === "string" ? body.password : "";
        if (submitted.length === 0 || submitted.length > 200) {
          return new Response(JSON.stringify({ error: "Invalid credentials" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
          });
        }

        const a = Buffer.from(submitted);
        const b = Buffer.from(adminPass);
        const ok = a.length === b.length && timingSafeEqual(a, b);
        if (!ok) {
          return new Response(JSON.stringify({ error: "Invalid credentials" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
          });
        }

        const expiresAt = Date.now() + SESSION_TTL_MS;
        const token = signSession(expiresAt);
        const maxAge = Math.floor(SESSION_TTL_MS / 1000);

        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Set-Cookie": `${COOKIE_NAME}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`,
          },
        });
      },
    },
  },
});
