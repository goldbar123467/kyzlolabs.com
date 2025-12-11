"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") ?? "/";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError("Invalid password");
        setLoading(false);
        return;
      }
      router.push(redirect);
    } catch (_err) {
      setError("Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="glass relative z-10 w-full max-w-md rounded-2xl p-6">
      <h1 className="text-2xl font-semibold text-white">
        Mission Control Login
      </h1>
      <p className="mt-1 text-sm text-slate-300">
        Enter the access password to view the dashboard.
      </p>
      <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-2 text-sm text-slate-200">
          Password
          <input
            type="password"
            className="rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-slate-100 outline-none focus:border-cyan-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {error && <p className="text-sm text-rose-300">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-gradient-to-r from-cyan-400 to-indigo-500 px-4 py-2 font-semibold text-slate-950 transition hover:brightness-105 disabled:opacity-60"
        >
          {loading ? "Checking..." : "Unlock"}
        </button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
      <div className="starfield" />
      <div className="parallax-gradient" />
      <Suspense
        fallback={
          <div className="glass relative z-10 w-full max-w-md rounded-2xl p-6 text-slate-200">
            Loading...
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </main>
  );
}
