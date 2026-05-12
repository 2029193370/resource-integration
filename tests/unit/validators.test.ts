import { describe, expect, it } from "vitest";
import { websiteSchema } from "@/lib/validators";

describe("websiteSchema", () => {
  it("accepts a valid https website", () => {
    const result = websiteSchema.safeParse({
      name: "Example",
      category: "Tools",
      url: "https://example.com",
      note: "A useful website.",
      sortOrder: 1
    });

    expect(result.success).toBe(true);
  });

  it("rejects non-http protocols", () => {
    const result = websiteSchema.safeParse({
      name: "Bad",
      category: "Tools",
      url: "javascript:alert(1)",
      note: "",
      sortOrder: 0
    });

    expect(result.success).toBe(false);
  });

  it("rejects an empty name", () => {
    const result = websiteSchema.safeParse({
      name: "",
      category: "Tools",
      url: "https://example.com",
      note: "",
      sortOrder: 0
    });

    expect(result.success).toBe(false);
  });

  it("rejects an empty category", () => {
    const result = websiteSchema.safeParse({
      name: "Example",
      category: "",
      url: "https://example.com",
      note: "",
      sortOrder: 0
    });

    expect(result.success).toBe(false);
  });
});
