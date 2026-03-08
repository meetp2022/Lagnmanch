import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

// GET /api/profiles — list approved profiles with optional filters
export async function GET(request: NextRequest) {
  const supabase = createAdminClient();
  const { searchParams } = new URL(request.url);

  const status = searchParams.get("status") || "approved";
  const gender = searchParams.get("gender");
  const city = searchParams.get("city");
  const education = searchParams.get("education");
  const ageMin = searchParams.get("age_min");
  const ageMax = searchParams.get("age_max");

  let query = supabase
    .from("profiles")
    .select("*")
    .eq("profile_status", status)
    .order("created_at", { ascending: false });

  if (gender) query = query.eq("gender", gender);
  if (city) query = query.ilike("city", `%${city}%`);
  if (education) query = query.ilike("education", `%${education}%`);
  if (ageMin) query = query.gte("age", parseInt(ageMin));
  if (ageMax) query = query.lte("age", parseInt(ageMax));

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST /api/profiles — create a new profile (requires auth)
export async function POST(request: NextRequest) {
  const adminSupabase = createAdminClient();

  // Get the authenticated user
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check if user already has a profile
  const { data: existing } = await adminSupabase
    .from("profiles")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (existing) {
    return NextResponse.json(
      { error: "You already have a profile" },
      { status: 409 }
    );
  }

  try {
    const body = await request.json();

    // Calculate age from date_of_birth
    const dob = new Date(body.date_of_birth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    const profileData = {
      user_id: user.id,
      full_name: body.full_name,
      gender: body.gender,
      date_of_birth: body.date_of_birth,
      age,
      district: body.district || null,
      taluka: body.taluka || null,
      city: body.city || body.taluka || body.district,
      pincode: body.pincode || null,
      current_location: body.current_location,
      education: body.education,
      field_of_study: body.field_of_study || null,
      occupation: body.occupation,
      company_or_business: body.company_or_business || null,
      annual_income: body.annual_income || null,
      family_background: body.family_background || null,
      native_village: body.native_village || null,
      father_occupation: body.father_occupation || null,
      mother_occupation: body.mother_occupation || null,
      siblings_count: body.siblings_count ? parseInt(body.siblings_count) : 0,
      preferred_age_min: body.preferred_age_min ? parseInt(body.preferred_age_min) : null,
      preferred_age_max: body.preferred_age_max ? parseInt(body.preferred_age_max) : null,
      preferred_location: body.preferred_location || null,
      preferred_education: body.preferred_education || null,
      phone_number: body.phone_number,
      whatsapp_number: body.whatsapp_number || null,
      photo_url: body.photo_url || null,
      profile_status: "pending" as const,
    };

    const { data, error } = await adminSupabase
      .from("profiles")
      .insert(profileData)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
