"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/components/LanguageProvider";
import { DISTRICTS, DISTRICT_LIST, lookupPincode } from "@/lib/locations";
import type { Profile } from "@/types/profile";

const EDUCATION_OPTIONS = [
  "10th Pass", "12th Pass", "Diploma", "Graduate", "Post Graduate",
  "ITI", "B.E./B.Tech", "M.E./M.Tech", "B.Com", "M.Com",
  "BBA", "MBA", "B.Sc", "M.Sc", "PhD", "Other",
];

type ProfileFormProps = {
  initialData?: Partial<Profile>;
  onSubmit: (data: Record<string, unknown>, photoFile: File | null) => Promise<void>;
  submitLabel: string;
  submittingLabel: string;
};

export default function ProfileForm({ initialData, onSubmit, submitLabel, submittingLabel }: ProfileFormProps) {
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(initialData?.photo_url || null);

  // Location state
  const [district, setDistrict] = useState(initialData?.district || "");
  const [taluka, setTaluka] = useState(initialData?.taluka || initialData?.city || "");
  const [pincode, setPincode] = useState(initialData?.pincode || "");
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [pincodeInfo, setPincodeInfo] = useState("");

  // Get available talukas for selected district
  const availableTalukas = district ? (DISTRICTS[district] || []) : [];

  // Pincode auto-fill
  useEffect(() => {
    if (pincode.length === 6) {
      setPincodeLoading(true);
      setPincodeInfo("");
      lookupPincode(pincode).then((result) => {
        if (result) {
          // Try to match district from API response to our list
          const matchedDistrict = DISTRICT_LIST.find(
            (d) => d.toLowerCase() === result.district.toLowerCase()
          );
          if (matchedDistrict) {
            setDistrict(matchedDistrict);
            // Try to match taluka
            const talukas = DISTRICTS[matchedDistrict] || [];
            const matchedTaluka = talukas.find(
              (t) => t.toLowerCase() === result.taluka.toLowerCase()
            );
            if (matchedTaluka) setTaluka(matchedTaluka);
          }
          setPincodeInfo(`${result.postOffice}, ${result.district}`);
        } else {
          setPincodeInfo(t.form.pincodeNotFound);
        }
        setPincodeLoading(false);
      });
    } else {
      setPincodeInfo("");
    }
  }, [pincode, t.form.pincodeNotFound]);

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const profileData: Record<string, unknown> = {
        full_name: formData.get("full_name"),
        gender: formData.get("gender"),
        date_of_birth: formData.get("date_of_birth"),
        district,
        taluka,
        city: taluka || district, // backward compat: city stores taluka
        pincode,
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
      };

      await onSubmit(profileData, photoFile);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  }

  const inputClass = "w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-maroon focus:border-maroon outline-none";

  return (
    <>
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
              <input name="full_name" required defaultValue={initialData?.full_name || ""} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.genderLabel}</label>
              <select name="gender" required defaultValue={initialData?.gender || ""} className={inputClass}>
                <option value="">{t.form.selectGender}</option>
                <option value="Male">{t.common.male}</option>
                <option value="Female">{t.common.female}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.dob}</label>
              <input name="date_of_birth" type="date" required defaultValue={initialData?.date_of_birth || ""} className={inputClass} />
            </div>
          </div>
        </fieldset>

        {/* Location */}
        <fieldset className="bg-white p-6 rounded-xl shadow-sm">
          <legend className="text-xl font-semibold text-maroon mb-4 px-2">{t.form.locationSection}</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Pincode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.pincode}</label>
              <div className="relative">
                <input
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="e.g. 396191"
                  maxLength={6}
                  className={inputClass}
                />
                {pincodeLoading && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 border-2 border-maroon border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>
              {pincodeInfo && (
                <p className="text-xs text-green-600 mt-1">{pincodeInfo}</p>
              )}
            </div>

            {/* District */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.district} *</label>
              <select
                value={district}
                onChange={(e) => { setDistrict(e.target.value); setTaluka(""); }}
                required
                className={inputClass}
              >
                <option value="">{t.form.selectDistrict}</option>
                {DISTRICT_LIST.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Taluka/Town */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.taluka}</label>
              {availableTalukas.length > 0 ? (
                <select
                  value={taluka}
                  onChange={(e) => setTaluka(e.target.value)}
                  className={inputClass}
                >
                  <option value="">{t.form.selectTaluka}</option>
                  {availableTalukas.map((town) => (
                    <option key={town} value={town}>{town}</option>
                  ))}
                </select>
              ) : (
                <input
                  value={taluka}
                  onChange={(e) => setTaluka(e.target.value)}
                  placeholder={t.form.enterTown}
                  className={inputClass}
                />
              )}
            </div>

            {/* Current Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.currentLocation}</label>
              <input name="current_location" required defaultValue={initialData?.current_location || ""} placeholder={t.form.currentLocationHint} className={inputClass} />
            </div>
          </div>
        </fieldset>

        {/* Education */}
        <fieldset className="bg-white p-6 rounded-xl shadow-sm">
          <legend className="text-xl font-semibold text-maroon mb-4 px-2">{t.form.educationSection}</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.highestEducation}</label>
              <select name="education" required defaultValue={initialData?.education || ""} className={inputClass}>
                <option value="">{t.form.selectEducation}</option>
                {EDUCATION_OPTIONS.map((e) => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.fieldOfStudy}</label>
              <input name="field_of_study" defaultValue={initialData?.field_of_study || ""} className={inputClass} />
            </div>
          </div>
        </fieldset>

        {/* Career */}
        <fieldset className="bg-white p-6 rounded-xl shadow-sm">
          <legend className="text-xl font-semibold text-maroon mb-4 px-2">{t.form.careerSection}</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.occupation}</label>
              <input name="occupation" required defaultValue={initialData?.occupation || ""} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.companyBusiness}</label>
              <input name="company_or_business" defaultValue={initialData?.company_or_business || ""} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.annualIncome}</label>
              <select name="annual_income" defaultValue={initialData?.annual_income || ""} className={inputClass}>
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
              <textarea name="family_background" rows={3} defaultValue={initialData?.family_background || ""} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.nativeVillage}</label>
              <input name="native_village" defaultValue={initialData?.native_village || ""} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.fatherOccupation}</label>
              <input name="father_occupation" defaultValue={initialData?.father_occupation || ""} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.motherOccupation}</label>
              <input name="mother_occupation" defaultValue={initialData?.mother_occupation || ""} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.siblings}</label>
              <input name="siblings_count" type="number" min="0" max="15" defaultValue={initialData?.siblings_count ?? ""} className={inputClass} />
            </div>
          </div>
        </fieldset>

        {/* Partner Preferences */}
        <fieldset className="bg-white p-6 rounded-xl shadow-sm">
          <legend className="text-xl font-semibold text-maroon mb-4 px-2">{t.form.partnerSection}</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.preferredAgeMin}</label>
              <input name="preferred_age_min" type="number" min="18" max="60" defaultValue={initialData?.preferred_age_min ?? ""} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.preferredAgeMax}</label>
              <input name="preferred_age_max" type="number" min="18" max="60" defaultValue={initialData?.preferred_age_max ?? ""} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.preferredLocation}</label>
              <input name="preferred_location" defaultValue={initialData?.preferred_location || ""} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.preferredEducation}</label>
              <input name="preferred_education" defaultValue={initialData?.preferred_education || ""} className={inputClass} />
            </div>
          </div>
        </fieldset>

        {/* Contact Details */}
        <fieldset className="bg-white p-6 rounded-xl shadow-sm">
          <legend className="text-xl font-semibold text-maroon mb-4 px-2">{t.form.contactSection}</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.phoneNumber}</label>
              <input name="phone_number" type="tel" required defaultValue={initialData?.phone_number || ""} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.whatsappNumber}</label>
              <input name="whatsapp_number" type="tel" defaultValue={initialData?.whatsapp_number || ""} className={inputClass} />
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
          {submitting ? submittingLabel : submitLabel}
        </button>
      </form>
    </>
  );
}
