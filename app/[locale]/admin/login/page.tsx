import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { readSession } from "@/lib/auth";
import { getDictionary, normalizeLocale } from "@/lib/i18n";
import { isValidLocale } from "@/lib/validators";
import "../admin.css";

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function AdminLoginPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  if (!isValidLocale(rawLocale)) {
    notFound();
  }

  const session = await readSession();
  if (session) {
    redirect(`/${rawLocale}/admin`);
  }

  const locale = normalizeLocale(rawLocale);
  const dictionary = getDictionary(locale);

  return (
    <main className="page-shell admin-page">
      <Link className="pill" href={`/${locale}`}>
        ← {dictionary.appName}
      </Link>
      <div className="login-wrap">
        <LoginForm locale={locale} dictionary={dictionary} />
      </div>
    </main>
  );
}
