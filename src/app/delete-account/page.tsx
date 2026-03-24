"use client";

import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";

export default function DeleteAccountPage() {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("/api/report-misuse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Account Deletion Request",
          email: user?.email || email,
          reportType: "Account Deletion",
          description: `User has requested complete account and data deletion.\n\nEmail: ${user?.email || email}\nReason: ${reason || "Not specified"}`,
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-maroon mb-3">Deletion Request Submitted</h1>
          <p className="text-gray-600 mb-2">
            Your account deletion request has been received. We will process it within <strong>30 days</strong>.
          </p>
          <p className="text-gray-500 text-sm">
            You will receive a confirmation email at <strong>{user?.email || email}</strong> once your data has been deleted.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-maroon mb-2">Delete Your Account</h1>
      <p className="text-gray-500 text-sm mb-8">LagnaManch — Account & Data Deletion</p>

      <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
        <h2 className="text-xl font-semibold text-maroon mb-4">What happens when you delete your account?</h2>
        <p className="text-gray-600 mb-4">
          When you request account deletion, the following data will be <strong>permanently removed</strong> within 30 days:
        </p>
        <ul className="space-y-2 mb-6">
          <li className="flex items-start gap-2 text-gray-700">
            <svg className="w-5 h-5 text-red-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span><strong>Profile information</strong> — name, date of birth, gender, education, occupation, family details, partner preferences</span>
          </li>
          <li className="flex items-start gap-2 text-gray-700">
            <svg className="w-5 h-5 text-red-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span><strong>Contact information</strong> — email address, phone number, WhatsApp number</span>
          </li>
          <li className="flex items-start gap-2 text-gray-700">
            <svg className="w-5 h-5 text-red-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span><strong>Photos</strong> — all uploaded profile photos will be deleted from our storage</span>
          </li>
          <li className="flex items-start gap-2 text-gray-700">
            <svg className="w-5 h-5 text-red-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span><strong>Account credentials</strong> — your login email and authentication data</span>
          </li>
        </ul>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
          <strong>Please note:</strong> This action is irreversible. Once your data is deleted, it cannot be recovered. If you wish to use LagnaManch again in the future, you will need to create a new account.
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-8">
        <h2 className="text-xl font-semibold text-maroon mb-4">Request Account Deletion</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!user && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your registered email address *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter the email you registered with"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-maroon"
              />
            </div>
          )}

          {user && (
            <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600">
              Logged in as: <strong>{user.email}</strong>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason for leaving (optional)
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              placeholder="Help us improve — why are you deleting your account?"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-maroon"
            />
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="confirm"
              checked={confirm}
              onChange={(e) => setConfirm(e.target.checked)}
              required
              className="mt-1"
            />
            <label htmlFor="confirm" className="text-sm text-gray-700">
              I understand that my account and all associated data will be permanently deleted within 30 days and this action cannot be undone.
            </label>
          </div>

          <button
            type="submit"
            disabled={loading || (!user && !email) || !confirm}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Submitting..." : "Request Account Deletion"}
          </button>
        </form>
      </div>

      <p className="text-center text-sm text-gray-500 mt-6">
        Questions? Contact us at <a href="mailto:lagnamanch@gmail.com" className="text-maroon underline">lagnamanch@gmail.com</a>
      </p>
    </div>
  );
}
