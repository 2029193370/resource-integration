import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { requireAdmin } from "@/lib/auth";
import { getDictionary, normalizeLocale } from "@/lib/i18n";
import { isValidLocale } from "@/lib/validators";
import { listWebsites } from "@/lib/websites";
import "./admin.css";

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function AdminPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  if (!isValidLocale(rawLocale)) {
    notFound();
  }

  const admin = await requireAdmin();
  if (!admin) {
    redirect(`/${rawLocale}/admin/login`);
  }

  const locale = normalizeLocale(rawLocale);
  const dictionary = getDictionary(locale);
  const websites = await listWebsites();

  return (
    <main className="page-shell admin-page">
      <Link className="pill" href={`/${locale}`}>
        ← {dictionary.appName}
      </Link>
      <AdminDashboard locale={locale} dictionary={dictionary} initialWebsites={websites} />
    </main>
  );
}
