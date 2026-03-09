"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useTranslation } from "@/components/LanguageProvider";

export default function RegisterPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError(t.auth.passwordMismatch);
      return;
    }

    if (password.length < 6) {
      setError(t.auth.passwordTooShort);
      return;
    }

    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      // Fire-and-forget: send welcome email (don't block redirect)
      fetch("/api/send-welcome-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }).catch(() => {});

      // Registration successful — redirect to dashboard with welcome flag
      router.push("/dashboard?welcome=1");
    }
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h1 className="text-2xl font-bold text-maroon text-center mb-6">
            {t.auth.registerTitle}
          </h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.auth.email}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-maroon focus:border-maroon outline-none"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.auth.password}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-maroon focus:border-maroon outline-none"
                placeholder="••••••••"
              />
              <p className="text-xs text-gray-500 mt-1">{t.auth.passwordHint}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.auth.confirmPassword}
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-maroon focus:border-maroon outline-none"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-maroon text-white py-2.5 rounded-lg font-semibold hover:bg-maroon-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? t.auth.registering : t.auth.registerButton}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            {t.auth.hasAccount}{" "}
            <Link href="/login" className="text-maroon font-semibold hover:underline">
              {t.auth.loginLink}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
