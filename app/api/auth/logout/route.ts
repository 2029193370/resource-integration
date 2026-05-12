import { cookies } from "next/headers";
import { ok } from "@/lib/responses";
import { sessionCookieName } from "@/lib/auth";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete(sessionCookieName);

  return ok({ loggedOut: true });
}
