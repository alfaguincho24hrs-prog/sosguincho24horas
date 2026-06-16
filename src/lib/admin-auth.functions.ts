import { createServerFn } from "@tanstack/react-start";
import { getCookie, getRequest, setCookie } from "@tanstack/react-start/server";

const COOKIE_NAME = "admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 8; // 8h

function getSecret() {
  return process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD || "lovable-default-secret";
}

function toHex(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let s = "";
  for (let i = 0; i < bytes.length; i++) s += bytes[i].toString(16).padStart(2, "0");
  return s;
}

async function hmacHex(secret: string, payload: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  return toHex(sig);
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function signSession(expiresAt: number): Promise<string> {
  const payload = String(expiresAt);
  const sig = await hmacHex(getSecret(), payload);
  return `${payload}.${sig}`;
}

async function verifySession(value: string | undefined): Promise<boolean> {
  if (!value) return false;
  const [payload, sig] = value.split(".");
  if (!payload || !sig) return false;
  const expiresAt = Number(payload);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return false;
  const expected = await hmacHex(getSecret(), payload);
  return constantTimeEqual(sig, expected);
}

function isSecureRequest() {
  try {
    const url = getRequest()?.url;
    return url ? new URL(url).protocol === "https:" : false;
  } catch {
    return false;
  }
}

export async function requireAdminSession() {
  const cookie = getCookie(COOKIE_NAME);
  if (!(await verifySession(cookie))) {
    throw new Error("Unauthorized");
  }
}

export const loginAdmin = createServerFn({ method: "POST" })
  .inputValidator((d: { password: string }) => {
    if (!d || typeof d.password !== "string" || d.password.length === 0 || d.password.length > 200) {
      throw new Error("Invalid credentials");
    }
    return { password: d.password };
  })
  .handler(async ({ data }) => {
    const adminPass = process.env.ADMIN_PASSWORD?.trim();
    if (!adminPass) {
      throw new Error(
        "Admin password not configured. Set the ADMIN_PASSWORD environment variable on the server.",
      );
    }
    if (!constantTimeEqual(data.password.trim(), adminPass)) {
      throw new Error("Invalid credentials");
    }

    const expiresAt = Date.now() + SESSION_TTL_MS;
    const token = await signSession(expiresAt);
    setCookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: isSecureRequest(),
      sameSite: "lax",
      path: "/",
      maxAge: Math.floor(SESSION_TTL_MS / 1000),
    });
    return { ok: true };
  });

export const logoutAdmin = createServerFn({ method: "POST" }).handler(async () => {
  setCookie(COOKIE_NAME, "", {
    httpOnly: true,
    secure: isSecureRequest(),
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return { ok: true };
});

export const checkAdminSession = createServerFn({ method: "GET" }).handler(async () => {
  const cookie = getCookie(COOKIE_NAME);
  return { authed: await verifySession(cookie) };
});
