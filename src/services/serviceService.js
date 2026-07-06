import { supabase } from "../lib/supabaseClient";

export function mapService(row = {}) {
  const image = row.image_url || row.gambar || "";
  return {
    ...row,
    nama_service: row.nama_service || row.name || "",
    kategori: row.kategori || row.category || "",
    durasi: row.durasi || row.duration || 0,
    harga: Number(row.harga ?? row.price ?? 0),
    gambar: image,
    status: row.status || "Aktif",
  };
}

export const serviceService = {
  async getAll(includeInactive = false) {
    try {
      let query = supabase.from("services").select("*").order("id", { ascending: true });
      if (!includeInactive) {
        query = query.eq("status", "Aktif");
      }
      const { data, error } = await query;
      if (error) throw error;
      return { data: (data || []).map(mapService), error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async getById(id) {
    try {
      const { data, error } = await supabase.from("services").select("*").eq("id", id).single();
      if (error) throw error;
      return { data: mapService(data), error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async create(data) {
    try {
      const newRow = {
        name: data.nama_service || data.name || "",
        nama_service: data.nama_service || data.name || "",
        kategori: data.kategori || data.category || "Haircut",
        durasi: Number(data.durasi ?? data.duration ?? 30),
        harga: Number(data.harga ?? data.price ?? 0),
        gambar: data.gambar || data.image_url || "haircut-classic.jpg",
        status: data.status || "Aktif",
      };
      const { data: inserted, error } = await supabase.from("services").insert(newRow).select().single();
      if (error) throw error;
      return { data: mapService(inserted), error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async update(id, data) {
    try {
      const updatedRow = {
        name: data.nama_service || data.name,
        nama_service: data.nama_service || data.name,
        kategori: data.kategori || data.category,
        durasi: Number(data.durasi ?? data.duration),
        harga: Number(data.harga ?? data.price),
        gambar: data.gambar || data.image_url,
        status: data.status,
      };
      // Hapus key yang undefined agar tidak menimpa dengan null
      Object.keys(updatedRow).forEach(key => updatedRow[key] === undefined && delete updatedRow[key]);

      const { data: updated, error } = await supabase.from("services").update(updatedRow).eq("id", id).select().single();
      if (error) throw error;
      return { data: mapService(updated), error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async delete(id) {
    try {
      const { error } = await supabase.from("services").delete().eq("id", id);
      if (error) throw error;
      return { data: true, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  }
};
