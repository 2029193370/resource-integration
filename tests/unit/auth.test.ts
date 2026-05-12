import { hash } from "bcryptjs";
import { describe, expect, it } from "vitest";
import { verifyPassword } from "@/lib/password";

describe("verifyPassword", () => {
  it("accepts a matching password", async () => {
    const passwordHash = await hash("correct-password", 12);

    await expect(verifyPassword("correct-password", passwordHash)).resolves.toBe(true);
  });

  it("rejects a wrong password", async () => {
    const passwordHash = await hash("correct-password", 12);

    await expect(verifyPassword("wrong-password", passwordHash)).resolves.toBe(false);
  });
});
