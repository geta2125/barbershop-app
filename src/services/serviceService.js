import { db } from "./localDB";

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
      let list = db.getServices();
      if (!includeInactive) {
        list = list.filter(s => s.status === "Aktif");
      }
      return { data: list, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async getById(id) {
    try {
      const list = db.getServices();
      const row = list.find(s => String(s.id) === String(id));
      if (!row) return { data: null, error: new Error("Service not found") };
      return { data: row, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async create(data) {
    try {
      const list = db.getServices();
      const newId = list.length > 0 ? Math.max(...list.map(s => s.id || 0)) + 1 : 1;
      const newRow = {
        id: newId,
        nama_service: data.nama_service || data.name || "",
        kategori: data.kategori || data.category || "Haircut",
        durasi: Number(data.durasi ?? data.duration ?? 30),
        harga: Number(data.harga ?? data.price ?? 0),
        gambar: data.gambar || data.image_url || "haircut-classic.jpg",
        status: data.status || "Aktif",
      };
      list.push(newRow);
      db.saveServices(list);
      return { data: newRow, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async update(id, data) {
    try {
      const list = db.getServices();
      const idx = list.findIndex(s => String(s.id) === String(id));
      if (idx === -1) return { data: null, error: new Error("Service not found") };

      const updated = {
        ...list[idx],
        nama_service: data.nama_service || data.name || list[idx].nama_service,
        kategori: data.kategori || data.category || list[idx].kategori,
        durasi: Number(data.durasi ?? data.duration ?? list[idx].durasi),
        harga: Number(data.harga ?? data.price ?? list[idx].harga),
        gambar: data.gambar || data.image_url || list[idx].gambar,
        status: data.status || list[idx].status,
      };
      list[idx] = updated;
      db.saveServices(list);
      return { data: updated, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async delete(id) {
    try {
      let list = db.getServices();
      list = list.filter(s => String(s.id) !== String(id));
      db.saveServices(list);
      return { data: true, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  },
};
