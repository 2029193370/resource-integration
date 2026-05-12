import { afterEach, describe, expect, it } from "vitest";
import { getServerEnv } from "@/lib/env";

const originalEnv = { ...process.env };

afterEach(() => {
  process.env = { ...originalEnv };
});

describe("getServerEnv", () => {
  it("requires a database url", () => {
    delete process.env.DATABASE_URL;
    process.env.SESSION_SECRET = "x".repeat(32);

    expect(() => getServerEnv()).toThrow();
  });

  it("requires a strong session secret", () => {
    process.env.DATABASE_URL = "postgresql://user:pass@example.com/db";
    process.env.SESSION_SECRET = "short";

    expect(() => getServerEnv()).toThrow();
  });

  it("accepts complete environment variables", () => {
    process.env.DATABASE_URL = "postgresql://user:pass@example.com/db";
    process.env.SESSION_SECRET = "x".repeat(32);

    expect(getServerEnv().DATABASE_URL).toBe("postgresql://user:pass@example.com/db");
  });
});
