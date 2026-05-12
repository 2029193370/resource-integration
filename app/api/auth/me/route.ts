import { requireAdmin } from "@/lib/auth";
import { fail, ok } from "@/lib/responses";

export async function GET() {
  const admin = await requireAdmin();

  if (!admin) {
    return fail("UNAUTHORIZED", "Authentication required.", 401);
  }

  return ok(admin);
}
