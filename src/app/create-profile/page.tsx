"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useTranslation } from "@/components/LanguageProvider";
import ProfileForm from "@/components/ProfileForm";

export default function CreateProfilePage() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(data: Record<string, unknown>, photoFile: File | null) {
    let photo_url = null;

    if (photoFile) {
      const supabase = createClient();
      const fileExt = photoFile.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("profile-photos")
        .upload(fileName, photoFile);

      if (uploadError) throw new Error("Photo upload failed: " + uploadError.message);

      const { data: urlData } = supabase.storage
        .from("profile-photos")
        .getPublicUrl(fileName);

      photo_url = urlData.publicUrl;
    }

    const res = await fetch("/api/profiles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, photo_url }),
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error || "Failed to create profile");
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="bg-white p-10 rounded-xl shadow-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-maroon mb-3">{t.form.successTitle}</h2>
          <p className="text-gray-600 mb-6">{t.form.successMessage}</p>
          <a href="/browse" className="text-maroon font-semibold hover:underline">
            {t.form.successLink}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-maroon mb-2">{t.form.title}</h1>
      <p className="text-gray-600 mb-8">{t.form.subtitle}</p>

      <ProfileForm
        onSubmit={handleSubmit}
        submitLabel={t.form.submitProfile}
        submittingLabel={t.form.submitting}
      />
    </div>
  );
}
