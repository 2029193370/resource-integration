import { z } from "zod";

const serverEnvSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  SESSION_SECRET: z.string().min(32, "SESSION_SECRET must be at least 32 characters"),
  ADMIN_USERNAME: z.string().min(1).default("admin"),
  ADMIN_PASSWORD: z.string().min(8).optional(),
  NEXT_PUBLIC_APP_NAME: z.string().min(1).default("网址收藏导航"),
  NEXT_PUBLIC_DEFAULT_LOCALE: z.enum(["zh-CN", "en"]).default("zh-CN")
});

export type AppLocale = "zh-CN" | "en";

export function getServerEnv() {
  return serverEnvSchema.parse(process.env);
}

export function getPublicEnv() {
  const defaultLocale: AppLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE === "en" ? "en" : "zh-CN";

  return {
    appName: process.env.NEXT_PUBLIC_APP_NAME || "网址收藏导航",
    defaultLocale
  };
}
