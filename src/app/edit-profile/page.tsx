"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useTranslation } from "@/components/LanguageProvider";
import { useAuth } from "@/components/AuthProvider";
import ProfileForm from "@/components/ProfileForm";
import type { Profile } from "@/types/profile";

export default function EditProfilePage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;
      try {
        const res = await fetch("/api/profiles/me");
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        } else {
          setError("Could not load profile");
        }
      } catch {
        setError("Could not load profile");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [user]);

  async function handleSubmit(data: Record<string, unknown>, photoFile: File | null) {
    let photo_url = profile?.photo_url || null;

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

    const res = await fetch("/api/profiles/me", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, photo_url }),
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error || "Failed to update profile");
    }

    router.push("/dashboard?updated=1");
  }

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-500">{t.dashboard.loading}</p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <p className="text-red-600">{error || "Profile not found"}</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-maroon mb-2">{t.form.editTitle}</h1>
      <p className="text-gray-600 mb-8">{t.form.editSubtitle}</p>

      <ProfileForm
        initialData={profile}
        onSubmit={handleSubmit}
        submitLabel={t.form.saveChanges}
        submittingLabel={t.form.saving}
      />
    </div>
  );
}
