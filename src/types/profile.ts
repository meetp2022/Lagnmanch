export type ProfileStatus = "pending" | "approved" | "rejected";

export interface Profile {
  id: string;
  full_name: string;
  gender: "Male" | "Female";
  date_of_birth: string;
  age: number;
  city: string;
  current_location: string;
  education: string;
  field_of_study: string | null;
  occupation: string;
  company_or_business: string | null;
  annual_income: string | null;
  family_background: string | null;
  native_village: string | null;
  father_occupation: string | null;
  mother_occupation: string | null;
  siblings_count: number;
  preferred_age_min: number | null;
  preferred_age_max: number | null;
  preferred_location: string | null;
  preferred_education: string | null;
  phone_number: string;
  whatsapp_number: string | null;
  photo_url: string | null;
  profile_status: ProfileStatus;
  created_at: string;
  updated_at: string;
}
