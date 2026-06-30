import { db } from "./localDB";

export function mapBarber(row = {}) {
  return {
    ...row,
    id: row.id,
    name: row.name || row.nama_barber || row.barber_name || "",
    nama_barber: row.name || row.nama_barber || row.barber_name || "",
    barber_name: row.name || row.barber_name || "",
    spesialis: row.specialty || row.specialization || row.spesialis || "All Styles",
    no_hp: row.phone || row.phone_number || row.no_hp || "",
    status: row.status || "Standby",
    rating: Number(row.rating || 4.8),
    experience: row.experience || "3 Years",
    image: row.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80"
  };
}

export const barberService = {
  async getAll() {
    try {
      const list = db.getBarbers();
      return { data: list, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async getById(id) {
    try {
      const list = db.getBarbers();
      const row = list.find(b => String(b.id) === String(id));
      if (!row) return { data: null, error: new Error("Barber not found") };
      return { data: row, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async create(data) {
    try {
      const list = db.getBarbers();
      const newId = list.length > 0 ? Math.max(...list.map(b => b.id || 0)) + 1 : 1;
      const newRow = {
        id: newId,
        name: data.name || data.nama_barber || "New Barber",
        specialty: data.specialty || data.spesialis || "All Styles",
        phone: data.phone || data.no_hp || "",
        status: data.status || "Standby",
        rating: Number(data.rating || 4.8),
        experience: data.experience || "1 Year",
        image: data.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80"
      };
      list.push(newRow);
      db.saveBarbers(list);
      return { data: newRow, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async update(id, data) {
    try {
      const list = db.getBarbers();
      const idx = list.findIndex(b => String(b.id) === String(id));
      if (idx === -1) return { data: null, error: new Error("Barber not found") };

      const updated = {
        ...list[idx],
        name: data.name || data.nama_barber || list[idx].name,
        specialty: data.specialty || data.spesialis || list[idx].specialty,
        phone: data.phone || data.no_hp || list[idx].phone,
        status: data.status || list[idx].status,
        rating: Number(data.rating || list[idx].rating),
        experience: data.experience || list[idx].experience,
        image: data.image || list[idx].image,
      };
      list[idx] = updated;
      db.saveBarbers(list);
      return { data: updated, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async delete(id) {
    try {
      let list = db.getBarbers();
      list = list.filter(b => String(b.id) !== String(id));
      db.saveBarbers(list);
      return { data: true, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  }
};
