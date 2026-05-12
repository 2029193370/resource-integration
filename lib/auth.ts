import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { getServerEnv } from "@/lib/env";
import { prisma } from "@/lib/prisma";

export const sessionCookieName = "website_directory_session";

type SessionPayload = {
  sub: string;
  username: string;
};

function getSessionSecret() {
  return new TextEncoder().encode(getServerEnv().SESSION_SECRET);
}

export async function createSessionToken(payload: SessionPayload) {
  return new SignJWT({ username: payload.username })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSessionSecret());
}

export async function readSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(sessionCookieName)?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, getSessionSecret());
    if (!payload.sub || typeof payload.username !== "string") {
      return null;
    }

    return {
      id: payload.sub,
      username: payload.username
    };
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const session = await readSession();

  if (!session) {
    return null;
  }

  const admin = await prisma.adminUser.findUnique({
    where: { id: session.id },
    select: { id: true, username: true }
  });

  return admin;
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  };
}
