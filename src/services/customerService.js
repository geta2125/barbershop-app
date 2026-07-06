import { supabase } from "../lib/supabaseClient";

export function mapCustomer(row = {}) {
  const levelName = row.Level_Membership || row.membership_level || "Bronze";
  return {
    ...row,
    id: row.ID_Customer || row.id,
    ID_Customer: row.ID_Customer || row.id,
    Nama_Lengkap: row.Nama_Lengkap || row.name || "",
    Email: row.Email || row.email || "",
    No_HP: row.No_HP || row.phone || "",
    Status_Member: row.Status_Member || "Member",
    Level_Membership: levelName,
    Status_Aktif: row.Status_Aktif || row.status || "Aktif",
  };
}

export const customerService = {
  async getAll(options = {}) {
    try {
      let query = supabase.from("customers").select("*").order("id", { ascending: false });
      
      if (options.search) {
        const s = options.search.toLowerCase();
        query = query.or(`name.ilike.%${s}%,Email.ilike.%${s}%,No_HP.ilike.%${s}%`);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      
      return { data: (data || []).map(mapCustomer), error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async getById(id) {
    try {
      const { data: row, error } = await supabase.from("customers").select("*").eq("id", id).single();
      if (error) throw error;
      
      return { 
        data: { 
          ...mapCustomer(row), 
          bookings: [], 
          membership: null 
        }, 
        error: null 
      };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async create(data) {
    try {
      const newRow = {
        name: data.Nama_Lengkap || data.name || "",
        "Nama_Lengkap": data.Nama_Lengkap || data.name || "",
        email: data.Email || data.email || "",
        "Email": data.Email || data.email || "",
        "No_HP": data.No_HP || data.phone || "",
        "Jenis_Kelamin": data.Jenis_Kelamin || "Laki-laki",
        "Tanggal_Daftar": new Date().toISOString(),
        "Status_Member": "Member",
        "Level_Membership": data.Level_Membership || "Bronze",
        "Status_Aktif": data.Status_Aktif || "Aktif",
        "Total_Transaksi": 0,
        "Total_Pengeluaran": 0
      };
      
      const { data: inserted, error } = await supabase.from("customers").insert(newRow).select().single();
      if (error) throw error;
      
      return { data: mapCustomer(inserted), error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async update(id, data) {
    try {
      const updatedRow = {
        name: data.Nama_Lengkap || data.name,
        "Nama_Lengkap": data.Nama_Lengkap || data.name,
        email: data.Email || data.email,
        "Email": data.Email || data.email,
        "No_HP": data.No_HP || data.phone,
        "Level_Membership": data.Level_Membership,
        "Status_Aktif": data.Status_Aktif || data.status,
      };
      // Hapus undefined keys
      Object.keys(updatedRow).forEach(key => updatedRow[key] === undefined && delete updatedRow[key]);

      const { data: updated, error } = await supabase.from("customers").update(updatedRow).eq("id", id).select().single();
      if (error) throw error;
      
      return { data: mapCustomer(updated), error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async delete(id) {
    try {
      const { error } = await supabase.from("customers").delete().eq("id", id);
      if (error) throw error;
      
      return { data: true, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  }
};
