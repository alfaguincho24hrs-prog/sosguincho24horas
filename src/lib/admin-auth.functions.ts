import { createServerFn } from "@tanstack/react-start";

export const loginAdmin = createServerFn({ method: "POST" })
  .inputValidator((d: { password: string }) => {
    if (!d || typeof d.password !== "string" || d.password.length === 0 || d.password.length > 200) {
      throw new Error("Invalid credentials");
    }
    return { password: d.password };
  })
  .handler(async ({ data }) => {
    const { loginAdminSession } = await import("@/lib/admin-auth.server");
    await loginAdminSession(data.password);
    return { ok: true };
  });

export const logoutAdmin = createServerFn({ method: "POST" }).handler(async () => {
  const { logoutAdminSession } = await import("@/lib/admin-auth.server");
  logoutAdminSession();
  return { ok: true };
});

export const checkAdminSession = createServerFn({ method: "GET" }).handler(async () => {
  const { checkAdminSessionCookie } = await import("@/lib/admin-auth.server");
  return { authed: await checkAdminSessionCookie() };
});
