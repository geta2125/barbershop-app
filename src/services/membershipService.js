import { db } from "./localDB";

export function mapMembership(row = {}) {
  return {
    ...row,
    id: row.ID_Membership || row.id,
    ID_Membership: row.ID_Membership || row.id,
    Nama_Lengkap: row.Nama_Lengkap || "",
    Level_Membership: row.Level_Membership || "Bronze",
    Total_Poin: row.Total_Poin || 0,
    Total_Redeem: row.Total_Redeem || 0,
    Total_Kunjungan: row.Total_Kunjungan || 0,
    Total_Pengeluaran: row.Total_Pengeluaran || 0,
    Tanggal_Daftar: row.Tanggal_Daftar || "",
    Status_Member: row.Status_Member || "Aktif",
    Email: row.Email || "",
    No_HP: row.No_HP || ""
  };
}

export const membershipService = {
  async getAll() {
    try {
      const list = db.getMemberships();
      return { data: list, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async getById(id) {
    try {
      const list = db.getMemberships();
      const row = list.find(m => String(m.ID_Membership) === String(id) || String(m.id) === String(id));
      if (!row) return { data: null, error: new Error("Membership not found") };
      return { data: row, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async update(id, data) {
    try {
      const list = db.getMemberships();
      const idx = list.findIndex(m => String(m.ID_Membership) === String(id) || String(m.id) === String(id));
      if (idx === -1) return { data: null, error: new Error("Membership not found") };

      const updated = {
        ...list[idx],
        Level_Membership: data.Level_Membership || list[idx].Level_Membership,
        Total_Poin: data.Total_Poin !== undefined ? Number(data.Total_Poin) : list[idx].Total_Poin,
        Total_Redeem: data.Total_Redeem !== undefined ? Number(data.Total_Redeem) : list[idx].Total_Redeem,
        Status_Member: data.Status_Member || list[idx].Status_Member,
      };
      list[idx] = updated;
      db.saveMemberships(list);
      return { data: updated, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  },
};
