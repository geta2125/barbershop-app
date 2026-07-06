import { supabase } from "../lib/supabaseClient";

export function mapBarber(row = {}) {
  // Supabase stores status as boolean
  let statusText = row.status;
  if (typeof row.status === "boolean") {
    statusText = row.status ? "Standby" : "Off Duty";
  }

  return {
    ...row,
    id: row.id,
    name: row.name || row.nama_barber || row.barber_name || "",
    nama_barber: row.name || row.nama_barber || row.barber_name || "",
    barber_name: row.name || row.barber_name || "",
    spesialis: row.specialty || row.specialization || row.spesialis || "All Styles",
    no_hp: row.phone || row.phone_number || row.no_hp || "",
    status: statusText, // Keep it as string for UI compatibility
    rating: Number(row.rating || 4.8),
    experience: row.experience || "3 Years",
    image: row.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80"
  };
}

export const barberService = {
  async getAll() {
    try {
      const { data, error } = await supabase.from("barbers").select("*").order("id", { ascending: true });
      if (error) throw error;
      return { data: (data || []).map(mapBarber), error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async getById(id) {
    try {
      const { data, error } = await supabase.from("barbers").select("*").eq("id", id).single();
      if (error) throw error;
      return { data: mapBarber(data), error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async create(data) {
    try {
      // Determine boolean status for Supabase
      let boolStatus = true;
      if (typeof data.status === "boolean") boolStatus = data.status;
      else if (typeof data.status === "string") {
        boolStatus = ["aktif", "standby", "true"].includes(data.status.toLowerCase());
      }

      const newRow = {
        name: data.name || data.nama_barber || "New Barber",
        rating: Number(data.rating || 4.8),
        experience: data.experience || "1 Year",
        image: data.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
        status: boolStatus
      };
      
      const { data: inserted, error } = await supabase.from("barbers").insert(newRow).select().single();
      if (error) throw error;
      return { data: mapBarber(inserted), error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async update(id, data) {
    try {
      const updatedRow = {
        name: data.name || data.nama_barber,
        rating: data.rating ? Number(data.rating) : undefined,
        experience: data.experience,
        image: data.image
      };
      
      if (data.status !== undefined) {
        if (typeof data.status === "boolean") {
          updatedRow.status = data.status;
        } else if (typeof data.status === "string") {
          updatedRow.status = ["aktif", "standby", "true"].includes(data.status.toLowerCase());
        }
      }

      // Hapus undefined keys
      Object.keys(updatedRow).forEach(key => updatedRow[key] === undefined && delete updatedRow[key]);

      const { data: updated, error } = await supabase.from("barbers").update(updatedRow).eq("id", id).select().single();
      if (error) throw error;
      return { data: mapBarber(updated), error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async delete(id) {
    try {
      const { error } = await supabase.from("barbers").delete().eq("id", id);
      if (error) throw error;
      return { data: true, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  }
};
