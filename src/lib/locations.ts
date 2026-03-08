// District → Taluka/Town mapping for Kodi Patel community areas
export const DISTRICTS: Record<string, string[]> = {
  "Valsad": ["Vapi", "Umbergaon", "Pardi", "Kaprada", "Dharampur", "Valsad"],
  "Navsari": ["Navsari", "Gandevi", "Jalalpore", "Chikhli", "Bilimora"],
  "Surat": ["Surat City", "Bardoli", "Mandvi", "Mangrol", "Kamrej", "Olpad"],
  "Daman": ["Daman", "Nani Daman", "Moti Daman"],
  "Dadra & Nagar Haveli": ["Silvassa", "Amli", "Naroli"],
  "Mumbai": ["Mumbai"],
  "Pune": ["Pune"],
  "Other": [],
};

// All district names for dropdown
export const DISTRICT_LIST = Object.keys(DISTRICTS);

// Flat list of all towns (for backward compat with browse filters)
export const ALL_TOWNS = Object.values(DISTRICTS).flat();

// Pincode lookup via India Post API
export async function lookupPincode(pincode: string): Promise<{
  district: string;
  taluka: string;
  state: string;
  postOffice: string;
} | null> {
  if (!/^\d{6}$/.test(pincode)) return null;

  try {
    const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
    const data = await res.json();

    if (data[0]?.Status !== "Success" || !data[0]?.PostOffice?.length) {
      return null;
    }

    const po = data[0].PostOffice[0];
    return {
      district: po.District,
      taluka: po.Block || po.Division,
      state: po.State,
      postOffice: po.Name,
    };
  } catch {
    return null;
  }
}
