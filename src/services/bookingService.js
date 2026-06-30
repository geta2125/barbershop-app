import { db } from "./localDB";

export function mapBooking(row = {}) {
  const servicePrice = Number(row.harga || 0);
  const status = row.status_booking || row.status || "Pending";
  return {
    ...row,
    id: row.id_booking || row.id,
    id_booking: row.id_booking || row.id,
    nama_customer: row.nama_customer || row.guest_name || "",
    layanan: row.layanan || "-",
    barber: row.barber || "-",
    jadwal: row.jadwal || "",
    harga: servicePrice,
    status_booking: status,
    metode_pembayaran: row.metode_pembayaran || "Cash",
    status_pembayaran: row.status_pembayaran || "Belum Lunas",
    catatan: row.catatan || ""
  };
}

export const bookingService = {
  async getAll() {
    try {
      const list = db.getBookings();
      return { data: list, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async getById(id) {
    try {
      const list = db.getBookings();
      const row = list.find(b => String(b.id_booking) === String(id) || String(b.id) === String(id));
      if (!row) return { data: null, error: new Error("Booking not found") };
      return { data: row, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async create(data) {
    try {
      const list = db.getBookings();
      const newId = list.length > 0 ? Math.max(...list.map(b => b.id_booking || b.id || 0)) + 1 : 1;
      
      let serviceName = data.layanan || "-";
      let price = Number(data.harga || 0);
      if (data.service_id) {
        const s = db.getServices().find(srv => String(srv.id) === String(data.service_id));
        if (s) {
          serviceName = s.nama_service;
          price = s.harga;
        }
      }

      let barberName = data.barber || "-";
      if (data.barber_id) {
        const b = db.getBarbers().find(brb => String(brb.id) === String(data.barber_id));
        if (b) barberName = b.name;
      }

      const newRow = {
        id_booking: newId,
        id: newId,
        nama_customer: data.nama_customer || "Guest",
        email: data.email || "",
        no_hp: data.no_hp || data.phone || "",
        layanan: serviceName,
        barber: barberName,
        durasi: data.durasi || 30,
        jadwal: data.jadwal || new Date().toISOString().replace("T", " ").slice(0, 16),
        harga: price,
        metode_pembayaran: data.metode_pembayaran || "Cash",
        status_pembayaran: data.status_pembayaran || (data.status_booking === "Completed" ? "Lunas" : "Belum Lunas"),
        status_booking: data.status_booking || "Pending",
        catatan: data.catatan || "-"
      };

      list.unshift(newRow);
      db.saveBookings(list);
      return { data: newRow, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async update(id, data) {
    try {
      const list = db.getBookings();
      const idx = list.findIndex(b => String(b.id_booking) === String(id) || String(b.id) === String(id));
      if (idx === -1) return { data: null, error: new Error("Booking not found") };

      let serviceName = data.layanan || list[idx].layanan;
      let price = Number(data.harga || list[idx].harga);
      if (data.service_id) {
        const s = db.getServices().find(srv => String(srv.id) === String(data.service_id));
        if (s) {
          serviceName = s.nama_service;
          price = s.harga;
        }
      }

      let barberName = data.barber || list[idx].barber;
      if (data.barber_id) {
        const b = db.getBarbers().find(brb => String(brb.id) === String(data.barber_id));
        if (b) barberName = b.name;
      }

      const updated = {
        ...list[idx],
        nama_customer: data.nama_customer || list[idx].nama_customer,
        email: data.email || list[idx].email,
        no_hp: data.no_hp || list[idx].no_hp,
        layanan: serviceName,
        barber: barberName,
        jadwal: data.jadwal || list[idx].jadwal,
        harga: price,
        status_booking: data.status_booking || data.status || list[idx].status_booking,
        status_pembayaran: data.status_pembayaran || list[idx].status_pembayaran,
        metode_pembayaran: data.metode_pembayaran || list[idx].metode_pembayaran,
        catatan: data.catatan || list[idx].catatan,
      };

      if (updated.status_booking === "Completed") {
        updated.status_pembayaran = "Lunas";
      }

      list[idx] = updated;
      db.saveBookings(list);
      return { data: updated, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async delete(id) {
    try {
      let list = db.getBookings();
      list = list.filter(b => String(b.id_booking) !== String(id) && String(b.id) !== String(id));
      db.saveBookings(list);
      return { data: true, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  }
};
