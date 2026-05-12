import { requireAdmin } from "@/lib/auth";
import { fail, ok } from "@/lib/responses";
import { deleteWebsite, updateWebsite } from "@/lib/websites";
import { websiteSchema } from "@/lib/validators";
import { handlePrismaError } from "@/app/api/websites/route";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PUT(request: Request, context: RouteContext) {
  const admin = await requireAdmin();
  if (!admin) {
    return fail("UNAUTHORIZED", "Authentication required.", 401);
  }

  const body = await request.json().catch(() => null);
  const parsed = websiteSchema.safeParse(body);
  if (!parsed.success) {
    return fail("VALIDATION_ERROR", "Invalid website payload.", 400, parsed.error.flatten());
  }

  const { id } = await context.params;

  try {
    const website = await updateWebsite(id, parsed.data);
    return ok(website);
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const admin = await requireAdmin();
  if (!admin) {
    return fail("UNAUTHORIZED", "Authentication required.", 401);
  }

  const { id } = await context.params;

  try {
    await deleteWebsite(id);
    return ok({ deleted: true });
  } catch (error) {
    return handlePrismaError(error);
  }
}
