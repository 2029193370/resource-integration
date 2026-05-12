"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";

type LoginFormProps = {
  locale: string;
  dictionary: Dictionary;
};

export function LoginForm({ locale, dictionary }: LoginFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: formData.get("username"),
        password: formData.get("password")
      })
    });

    setLoading(false);

    if (!response.ok) {
      setError(dictionary.loginFailed);
      return;
    }

    router.push(`/${locale}/admin`);
    router.refresh();
  }

  return (
    <form className="admin-card login-card glass-panel" onSubmit={onSubmit}>
      <div>
        <p className="admin-eyebrow">Admin Console</p>
        <h1>{dictionary.login}</h1>
      </div>

      <div className="field">
        <label htmlFor="username">{dictionary.username}</label>
        <input id="username" name="username" autoComplete="username" required />
      </div>

      <div className="field">
        <label htmlFor="password">{dictionary.password}</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required />
      </div>

      {error ? <p className="form-error">{error}</p> : null}

      <button className="primary-button" type="submit" disabled={loading}>
        {loading ? dictionary.loading : dictionary.login}
      </button>
    </form>
  );
}
