import { redirect } from "next/navigation";
import { getPublicEnv } from "@/lib/env";

export default function HomeRedirect() {
  redirect(`/${getPublicEnv().defaultLocale}`);
}
