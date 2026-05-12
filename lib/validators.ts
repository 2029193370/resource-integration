import { z } from "zod";

export const localeSchema = z.enum(["zh-CN", "en"]);

export const loginSchema = z.object({
  username: z.string().trim().min(1, "请输入管理员账号"),
  password: z.string().min(1, "请输入管理员密码")
});

export const websiteSchema = z.object({
  name: z.string().trim().min(1, "请输入网站名称").max(80, "网站名称不能超过 80 个字符"),
  url: z
    .string()
    .trim()
    .url("请输入合法网址")
    .refine((value) => ["http:", "https:"].includes(new URL(value).protocol), {
      message: "网址必须以 http 或 https 开头"
    }),
  note: z.string().trim().max(500, "备注不能超过 500 个字符").default(""),
  sortOrder: z.coerce.number().int().min(-9999).max(9999).default(0)
});

export type LoginInput = z.infer<typeof loginSchema>;
export type WebsiteInput = z.infer<typeof websiteSchema>;

export function isValidLocale(value: string): value is "zh-CN" | "en" {
  return localeSchema.safeParse(value).success;
}
