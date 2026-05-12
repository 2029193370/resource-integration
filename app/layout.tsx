import type { Metadata } from "next";
import "@/app/globals.css";
import { getPublicEnv } from "@/lib/env";

export const metadata: Metadata = {
  title: {
    default: getPublicEnv().appName,
    template: `%s | ${getPublicEnv().appName}`
  },
  description: "A bilingual liquid-glass website directory with an admin console."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
