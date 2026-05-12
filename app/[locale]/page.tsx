import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, normalizeLocale } from "@/lib/i18n";
import { isValidLocale } from "@/lib/validators";
import { listWebsites } from "@/lib/websites";
import { WebsiteDirectory } from "@/components/public/WebsiteDirectory";
import "./public-page.css";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function PublicDirectoryPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  if (!isValidLocale(rawLocale)) {
    notFound();
  }

  const locale = normalizeLocale(rawLocale);
  const dictionary = getDictionary(locale);
  const result = await listWebsites()
    .then((websites) => ({ websites, loadError: "" }))
    .catch(() => ({ websites: [], loadError: dictionary.loadError }));
  const otherLocale = locale === "zh-CN" ? "en" : "zh-CN";

  return (
    <main className="page-shell public-page">
      <nav className="top-nav">
        <Link className="brand" href={`/${locale}`}>
          {dictionary.appName}
        </Link>
        <div className="nav-actions">
          <Link className="pill" href={`/${otherLocale}`}>
            {otherLocale === "zh-CN" ? "简体中文" : "English"}
          </Link>
          <Link className="pill" href={`/${locale}/admin`}>
            {dictionary.admin}
          </Link>
        </div>
      </nav>

      <section className="hero glass-panel">
        <div>
          <p className="eyebrow">Curated Web Resources</p>
          <h1>{dictionary.appName}</h1>
          <p>{dictionary.tagline}</p>
        </div>
        <div className="hero-orb" aria-hidden="true" />
      </section>

      <WebsiteDirectory websites={result.websites} dictionary={dictionary} loadError={result.loadError} />
    </main>
  );
}
