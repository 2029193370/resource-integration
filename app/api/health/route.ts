import { ok } from "@/lib/responses";

export function GET() {
  return ok({
    status: "ok",
    timestamp: new Date().toISOString()
  });
}
