import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 8; // 8h

function getSecret() {
  return process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD || "";
}

function signSession(expiresAt: number) {
  const payload = String(expiresAt);
  const sig = createHmac("sha256", getSecret()).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

function verifySession(value: string | undefined): boolean {
  if (!value) return false;
  const [payload, sig] = value.split(".");
  if (!payload || !sig) return false;
  const expiresAt = Number(payload);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return false;
  const expected = createHmac("sha256", getSecret()).update(payload).digest("hex");
  try {
    const a = Buffer.from(sig, "hex");
    const b = Buffer.from(expected, "hex");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
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
      console.error("ADMIN_PASSWORD env var is missing or empty");
      throw new Error(
        "Admin password not configured. Set the ADMIN_PASSWORD environment variable on the server.",
      );
    }
    const a = Buffer.from(data.password.trim());
    const b = Buffer.from(adminPass);
    
    if (a.length !== b.length) {
      throw new Error("Invalid credentials");
    }
    
    const ok = timingSafeEqual(a, b);
    if (!ok) throw new Error("Invalid credentials");

    const expiresAt = Date.now() + SESSION_TTL_MS;
    setCookie(COOKIE_NAME, signSession(expiresAt), {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: Math.floor(SESSION_TTL_MS / 1000),
    });
    return { ok: true };
  });

export const logoutAdmin = createServerFn({ method: "POST" }).handler(async () => {
  setCookie(COOKIE_NAME, "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
  return { ok: true };
});

export const checkAdminSession = createServerFn({ method: "GET" }).handler(async () => {
  const cookie = getCookie(COOKIE_NAME);
  return { authed: verifySession(cookie) };
});
