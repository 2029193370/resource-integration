"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import type { WebsiteView } from "@/lib/websites";

type AdminDashboardProps = {
  locale: string;
  dictionary: Dictionary;
  initialWebsites: WebsiteView[];
};

type FormState = {
  id?: string;
  name: string;
  url: string;
  note: string;
  sortOrder: number;
};

const emptyForm: FormState = {
  name: "",
  url: "",
  note: "",
  sortOrder: 0
};

export function AdminDashboard({ locale, dictionary, initialWebsites }: AdminDashboardProps) {
  const router = useRouter();
  const [websites, setWebsites] = useState(initialWebsites);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const sortedWebsites = useMemo(
    () => [...websites].sort((a, b) => a.sortOrder - b.sortOrder || b.createdAt.localeCompare(a.createdAt)),
    [websites]
  );

  function updateForm(field: keyof FormState, value: string) {
    setForm((current) => ({
      ...current,
      [field]: field === "sortOrder" ? Number(value) : value
    }));
  }

  async function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    const response = await fetch(form.id ? `/api/websites/${form.id}` : "/api/websites", {
      method: form.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      setMessage(result.error?.message || "Save failed.");
      return;
    }

    const saved = result.data as WebsiteView;
    setWebsites((current) => {
      const rest = current.filter((website) => website.id !== saved.id);
      return [...rest, saved];
    });
    setForm(emptyForm);
    router.refresh();
  }

  async function deleteSite(website: WebsiteView) {
    if (!window.confirm(dictionary.deleteConfirm)) {
      return;
    }

    const response = await fetch(`/api/websites/${website.id}`, { method: "DELETE" });
    if (!response.ok) {
      setMessage("Delete failed.");
      return;
    }

    setWebsites((current) => current.filter((item) => item.id !== website.id));
    router.refresh();
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push(`/${locale}/admin/login`);
    router.refresh();
  }

  return (
    <div className="admin-layout">
      <header className="admin-header glass-panel">
        <div>
          <p className="admin-eyebrow">{dictionary.admin}</p>
          <h1>{dictionary.appName}</h1>
        </div>
        <button className="secondary-button" onClick={logout} type="button">
          {dictionary.logout}
        </button>
      </header>

      <section className="admin-grid">
        <form className="admin-card glass-panel" onSubmit={submitForm}>
          <h2>{form.id ? dictionary.edit : dictionary.create}</h2>
          <div className="field">
            <label htmlFor="name">{dictionary.siteName}</label>
            <input id="name" value={form.name} onChange={(event) => updateForm("name", event.target.value)} required maxLength={80} />
          </div>
          <div className="field">
            <label htmlFor="url">{dictionary.url}</label>
            <input id="url" value={form.url} onChange={(event) => updateForm("url", event.target.value)} required placeholder="https://example.com" />
          </div>
          <div className="field">
            <label htmlFor="note">{dictionary.note}</label>
            <textarea id="note" value={form.note} onChange={(event) => updateForm("note", event.target.value)} rows={4} maxLength={500} />
          </div>
          <div className="field">
            <label htmlFor="sortOrder">{dictionary.sortOrder}</label>
            <input id="sortOrder" type="number" value={form.sortOrder} onChange={(event) => updateForm("sortOrder", event.target.value)} />
          </div>
          {message ? <p className="form-error">{message}</p> : null}
          <div className="form-actions">
            <button className="primary-button" type="submit" disabled={loading}>
              {loading ? dictionary.loading : dictionary.save}
            </button>
            {form.id ? (
              <button className="secondary-button" type="button" onClick={() => setForm(emptyForm)}>
                {dictionary.cancel}
              </button>
            ) : null}
          </div>
        </form>

        <div className="admin-card glass-panel">
          <h2>{dictionary.allSites}</h2>
          <div className="admin-table">
            {sortedWebsites.map((website) => (
              <article className="admin-row" key={website.id}>
                <div>
                  <strong>{website.name}</strong>
                  <span>{website.url}</span>
                  {website.note ? <p>{website.note}</p> : null}
                </div>
                <div className="row-actions">
                  <button className="secondary-button" type="button" onClick={() => setForm(website)}>
                    {dictionary.edit}
                  </button>
                  <button className="danger-button" type="button" onClick={() => deleteSite(website)}>
                    {dictionary.delete}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
