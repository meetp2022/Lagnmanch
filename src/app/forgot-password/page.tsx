"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useTranslation } from "@/components/LanguageProvider";

export default function ForgotPasswordPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSent(true);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-xl shadow-md">
          {sent ? (
            <div className="text-center">
              <div className="text-4xl mb-4">✉️</div>
              <h1 className="text-2xl font-bold text-maroon mb-3">
                {t.auth.resetEmailSent}
              </h1>
              <p className="text-gray-600 mb-2">
                {t.auth.resetEmailSentDesc}
              </p>
              <p className="text-sm font-medium text-gray-800 mb-6">{email}</p>
              <p className="text-xs text-gray-500 mb-6">
                {t.auth.resetEmailHint}
              </p>
              <Link
                href="/login"
                className="text-maroon font-semibold hover:underline"
              >
                {t.auth.backToLogin}
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-maroon text-center mb-2">
                {t.auth.forgotPasswordTitle}
              </h1>
              <p className="text-sm text-gray-600 text-center mb-6">
                {t.auth.forgotPasswordDesc}
              </p>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.auth.email}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    inputMode="email"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-maroon focus:border-maroon outline-none"
                    placeholder="you@example.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-maroon text-white py-2.5 rounded-lg font-semibold hover:bg-maroon-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? t.auth.sendingResetLink : t.auth.sendResetLink}
                </button>
              </form>

              <p className="text-center text-sm text-gray-600 mt-6">
                <Link
                  href="/login"
                  className="text-maroon font-semibold hover:underline"
                >
                  {t.auth.backToLogin}
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
