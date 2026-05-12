import { Prisma } from "@prisma/client";
import { requireAdmin } from "@/lib/auth";
import { createWebsite, listWebsites } from "@/lib/websites";
import { fail, ok } from "@/lib/responses";
import { websiteSchema } from "@/lib/validators";

export async function GET() {
  const websites = await listWebsites();
  return ok(websites);
}

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return fail("UNAUTHORIZED", "Authentication required.", 401);
  }

  const body = await request.json().catch(() => null);
  const parsed = websiteSchema.safeParse(body);
  if (!parsed.success) {
    return fail("VALIDATION_ERROR", "Invalid website payload.", 400, parsed.error.flatten());
  }

  const website = await createWebsite(parsed.data);
  return ok(website, { status: 201 });
}

export function handlePrismaError(error: unknown) {
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
    return fail("NOT_FOUND", "Website not found.", 404);
  }

  throw error;
}
