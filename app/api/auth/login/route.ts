import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { fail, ok } from "@/lib/responses";
import { createSessionToken, getSessionCookieOptions, sessionCookieName } from "@/lib/auth";
import { verifyPassword } from "@/lib/password";
import { loginSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return fail("VALIDATION_ERROR", "Invalid login payload.", 400, parsed.error.flatten());
  }

  const admin = await prisma.adminUser.findUnique({
    where: { username: parsed.data.username }
  });

  const validPassword = admin ? await verifyPassword(parsed.data.password, admin.passwordHash) : false;
  if (!admin || !validPassword) {
    return fail("INVALID_CREDENTIALS", "Invalid username or password.", 401);
  }

  const token = await createSessionToken({ sub: admin.id, username: admin.username });
  const cookieStore = await cookies();
  cookieStore.set(sessionCookieName, token, getSessionCookieOptions());

  return ok({
    id: admin.id,
    username: admin.username
  });
}
