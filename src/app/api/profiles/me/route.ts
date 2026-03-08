import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

// GET /api/profiles/me — get the current user's profile
export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const adminSupabase = createAdminClient();
  const { data, error } = await adminSupabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error && error.code === "PGRST116") {
    return NextResponse.json({ error: "No profile found" }, { status: 404 });
  }

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// PUT /api/profiles/me — update the current user's profile
export async function PUT(request: NextRequest) {
  const supabase = await createClient();
  const adminSupabase = createAdminClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    // Recalculate age from date_of_birth
    const dob = new Date(body.date_of_birth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    const updateData = {
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
      profile_status: "pending" as const, // Re-review after edit
    };

    const { data, error } = await adminSupabase
      .from("profiles")
      .update(updateData)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
