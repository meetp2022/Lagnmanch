"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useTranslation } from "@/components/LanguageProvider";

const CITIES = ["Vapi", "Umbergaon", "Pardi", "Daman", "Silvassa", "Mumbai", "Pune", "Other"];
const EDUCATION_OPTIONS = [
  "10th Pass", "12th Pass", "Diploma", "Graduate", "Post Graduate",
  "ITI", "B.E./B.Tech", "M.E./M.Tech", "B.Com", "M.Com",
  "BBA", "MBA", "B.Sc", "M.Sc", "PhD", "Other",
];

export default function CreateProfilePage() {
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
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

      const profileData = {
        full_name: formData.get("full_name"),
        gender: formData.get("gender"),
        date_of_birth: formData.get("date_of_birth"),
        city: formData.get("city"),
        current_location: formData.get("current_location"),
        education: formData.get("education"),
        field_of_study: formData.get("field_of_study"),
        occupation: formData.get("occupation"),
        company_or_business: formData.get("company_or_business"),
        annual_income: formData.get("annual_income"),
        family_background: formData.get("family_background"),
        native_village: formData.get("native_village"),
        father_occupation: formData.get("father_occupation"),
        mother_occupation: formData.get("mother_occupation"),
        siblings_count: formData.get("siblings_count"),
        preferred_age_min: formData.get("preferred_age_min"),
        preferred_age_max: formData.get("preferred_age_max"),
        preferred_location: formData.get("preferred_location"),
        preferred_education: formData.get("preferred_education"),
        phone_number: formData.get("phone_number"),
        whatsapp_number: formData.get("whatsapp_number"),
        photo_url,
      };

      const res = await fetch("/api/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create profile");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError(t.form.photoTooLarge);
        return;
      }
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
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

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <fieldset className="bg-white p-6 rounded-xl shadow-sm">
          <legend className="text-xl font-semibold text-maroon mb-4 px-2">{t.form.basicInfo}</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.fullName}</label>
              <input name="full_name" required className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-maroon focus:border-maroon outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.genderLabel}</label>
              <select name="gender" required className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-maroon focus:border-maroon outline-none">
                <option value="">{t.form.selectGender}</option>
                <option value="Male">{t.common.male}</option>
                <option value="Female">{t.common.female}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.dob}</label>
              <input name="date_of_birth" type="date" required className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-maroon focus:border-maroon outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.cityLabel}</label>
              <select name="city" required className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-maroon focus:border-maroon outline-none">
                <option value="">{t.form.selectCity}</option>
                {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.currentLocation}</label>
              <input name="current_location" required className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-maroon focus:border-maroon outline-none" />
            </div>
          </div>
        </fieldset>

        {/* Education */}
        <fieldset className="bg-white p-6 rounded-xl shadow-sm">
          <legend className="text-xl font-semibold text-maroon mb-4 px-2">{t.form.educationSection}</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.highestEducation}</label>
              <select name="education" required className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-maroon focus:border-maroon outline-none">
                <option value="">{t.form.selectEducation}</option>
                {EDUCATION_OPTIONS.map((e) => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.fieldOfStudy}</label>
              <input name="field_of_study" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-maroon focus:border-maroon outline-none" />
            </div>
          </div>
        </fieldset>

        {/* Career */}
        <fieldset className="bg-white p-6 rounded-xl shadow-sm">
          <legend className="text-xl font-semibold text-maroon mb-4 px-2">{t.form.careerSection}</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.occupation}</label>
              <input name="occupation" required className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-maroon focus:border-maroon outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.companyBusiness}</label>
              <input name="company_or_business" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-maroon focus:border-maroon outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.annualIncome}</label>
              <select name="annual_income" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-maroon focus:border-maroon outline-none">
                <option value="">{t.form.preferNotToSay}</option>
                <option value="Below 2 Lakh">{t.income.below2}</option>
                <option value="2-5 Lakh">{t.income.twoToFive}</option>
                <option value="5-10 Lakh">{t.income.fiveToTen}</option>
                <option value="10-20 Lakh">{t.income.tenToTwenty}</option>
                <option value="20-50 Lakh">{t.income.twentyToFifty}</option>
                <option value="50 Lakh+">{t.income.fiftyPlus}</option>
              </select>
            </div>
          </div>
        </fieldset>

        {/* Family Details */}
        <fieldset className="bg-white p-6 rounded-xl shadow-sm">
          <legend className="text-xl font-semibold text-maroon mb-4 px-2">{t.form.familySection}</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.familyBackground}</label>
              <textarea name="family_background" rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-maroon focus:border-maroon outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.nativeVillage}</label>
              <input name="native_village" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-maroon focus:border-maroon outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.fatherOccupation}</label>
              <input name="father_occupation" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-maroon focus:border-maroon outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.motherOccupation}</label>
              <input name="mother_occupation" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-maroon focus:border-maroon outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.siblings}</label>
              <input name="siblings_count" type="number" min="0" max="15" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-maroon focus:border-maroon outline-none" />
            </div>
          </div>
        </fieldset>

        {/* Partner Preferences */}
        <fieldset className="bg-white p-6 rounded-xl shadow-sm">
          <legend className="text-xl font-semibold text-maroon mb-4 px-2">{t.form.partnerSection}</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.preferredAgeMin}</label>
              <input name="preferred_age_min" type="number" min="18" max="60" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-maroon focus:border-maroon outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.preferredAgeMax}</label>
              <input name="preferred_age_max" type="number" min="18" max="60" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-maroon focus:border-maroon outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.preferredLocation}</label>
              <input name="preferred_location" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-maroon focus:border-maroon outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.preferredEducation}</label>
              <input name="preferred_education" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-maroon focus:border-maroon outline-none" />
            </div>
          </div>
        </fieldset>

        {/* Contact Details */}
        <fieldset className="bg-white p-6 rounded-xl shadow-sm">
          <legend className="text-xl font-semibold text-maroon mb-4 px-2">{t.form.contactSection}</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.phoneNumber}</label>
              <input name="phone_number" type="tel" required className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-maroon focus:border-maroon outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.whatsappNumber}</label>
              <input name="whatsapp_number" type="tel" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-maroon focus:border-maroon outline-none" />
            </div>
          </div>
        </fieldset>

        {/* Profile Photo */}
        <fieldset className="bg-white p-6 rounded-xl shadow-sm">
          <legend className="text-xl font-semibold text-maroon mb-4 px-2">{t.form.photoSection}</legend>
          <div className="flex items-start gap-6">
            {photoPreview && (
              <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-200 shrink-0">
                <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-maroon file:text-white hover:file:bg-maroon-dark file:cursor-pointer"
              />
              <p className="text-xs text-gray-500 mt-2">{t.form.photoHint}</p>
            </div>
          </div>
        </fieldset>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-maroon text-white py-3 rounded-lg text-lg font-semibold hover:bg-maroon-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? t.form.submitting : t.form.submitProfile}
        </button>
      </form>
    </div>
  );
}
