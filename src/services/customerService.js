import { db } from "./localDB";

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
      let list = db.getCustomers();
      if (options.search) {
        const s = options.search.toLowerCase();
        list = list.filter(c => 
          (c.Nama_Lengkap && c.Nama_Lengkap.toLowerCase().includes(s)) ||
          (c.Email && c.Email.toLowerCase().includes(s)) ||
          (c.No_HP && String(c.No_HP).includes(s))
        );
      }
      return { data: list, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async getById(id) {
    try {
      const list = db.getCustomers();
      const row = list.find(c => String(c.ID_Customer) === String(id) || String(c.id) === String(id));
      if (!row) return { data: null, error: new Error("Customer not found") };
      
      // Also attach bookings and membership if needed
      const bookings = db.getBookings().filter(b => String(b.email) === String(row.Email) || String(b.no_hp) === String(row.No_HP));
      const memberships = db.getMemberships().find(m => String(m.Email) === String(row.Email) || String(m.No_HP) === String(row.No_HP));

      return { 
        data: { 
          ...row, 
          bookings, 
          membership: memberships || null 
        }, 
        error: null 
      };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async create(data) {
    try {
      const list = db.getCustomers();
      const newId = list.length > 0 ? Math.max(...list.map(c => c.ID_Customer || 0)) + 1 : 1;
      const newRow = {
        ID_Customer: newId,
        id: newId,
        Nama_Lengkap: data.Nama_Lengkap || data.name || "",
        Email: data.Email || data.email || "",
        No_HP: data.No_HP || data.phone || "",
        Jenis_Kelamin: data.Jenis_Kelamin || "Laki-laki",
        Tanggal_Daftar: new Date().toISOString().slice(0, 10),
        Status_Member: "Member",
        Level_Membership: data.Level_Membership || "Bronze",
        Status_Aktif: data.Status_Aktif || "Aktif",
        Total_Transaksi: 0,
        Total_Pengeluaran: 0
      };
      list.unshift(newRow);
      db.saveCustomers(list);
      return { data: newRow, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async update(id, data) {
    try {
      const list = db.getCustomers();
      const idx = list.findIndex(c => String(c.ID_Customer) === String(id) || String(c.id) === String(id));
      if (idx === -1) return { data: null, error: new Error("Customer not found") };

      const updated = {
        ...list[idx],
        Nama_Lengkap: data.Nama_Lengkap || data.name || list[idx].Nama_Lengkap,
        Email: data.Email || data.email || list[idx].Email,
        No_HP: data.No_HP || data.phone || list[idx].No_HP,
        Level_Membership: data.Level_Membership || list[idx].Level_Membership,
        Status_Aktif: data.Status_Aktif || data.status || list[idx].Status_Aktif,
      };
      list[idx] = updated;
      db.saveCustomers(list);
      return { data: updated, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async delete(id) {
    try {
      let list = db.getCustomers();
      list = list.filter(c => String(c.ID_Customer) !== String(id) && String(c.id) !== String(id));
      db.saveCustomers(list);
      return { data: true, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  }
};
