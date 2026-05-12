"use client";

import { useMemo, useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import type { WebsiteView } from "@/lib/websites";

type WebsiteDirectoryProps = {
  websites: WebsiteView[];
  dictionary: Dictionary;
  loadError?: string;
};

export function WebsiteDirectory({ websites, dictionary, loadError }: WebsiteDirectoryProps) {
  const [query, setQuery] = useState("");

  const filteredWebsites = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) {
      return websites;
    }

    return websites.filter((website) =>
      [website.name, website.url, website.note].some((value) => value.toLowerCase().includes(keyword))
    );
  }, [query, websites]);

  return (
    <section className="directory-section">
      <div className="search-card glass-panel">
        <input
          aria-label={dictionary.searchPlaceholder}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={dictionary.searchPlaceholder}
        />
        <span>
          {dictionary.allSites} · {filteredWebsites.length}
        </span>
      </div>

      {loadError ? (
        <div className="empty-card glass-panel">
          <h2>{dictionary.emptyTitle}</h2>
          <p>{loadError}</p>
        </div>
      ) : filteredWebsites.length === 0 ? (
        <div className="empty-card glass-panel">
          <h2>{dictionary.emptyTitle}</h2>
          <p>{dictionary.emptyDescription}</p>
        </div>
      ) : (
        <div className="website-grid">
          {filteredWebsites.map((website, index) => (
            <article className="website-card glass-panel" key={website.id} style={{ animationDelay: `${index * 45}ms` }}>
              <div>
                <span className="website-index">{String(index + 1).padStart(2, "0")}</span>
                <h2>{website.name}</h2>
                {website.note ? <p>{website.note}</p> : null}
              </div>
              <a href={website.url} target="_blank" rel="noopener noreferrer" aria-label={`${dictionary.openSite}: ${website.name}`}>
                <span>{website.url.replace(/^https?:\/\//, "")}</span>
                <strong>↗</strong>
              </a>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
