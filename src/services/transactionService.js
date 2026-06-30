import { db } from "./localDB";

export const transactionService = {
  async getAll() {
    try {
      // We can derive transactions from bookings with status "Completed" or "Canceled"
      // to keep it dynamic and consistent, or load a list.
      const bookings = db.getBookings();
      const completed = bookings.filter(b => b.status_booking === "Completed" || b.status_pembayaran === "Lunas");
      
      const list = completed.map((b, index) => ({
        id: b.id_booking || b.id,
        created_at: b.jadwal ? b.jadwal.replace("T", " ") : new Date().toISOString(),
        subtotal: b.harga,
        discount_amount: 0,
        final_amount: b.harga,
        payment_method: b.metode_pembayaran || "Cash",
        payment_status: "Lunas",
        booking: b,
        customer_name: b.nama_customer,
        layanan: b.layanan,
        barber: b.barber
      }));

      return { data: list, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async getById(id) {
    try {
      const res = await this.getAll();
      const row = res.data.find(t => String(t.id) === String(id));
      if (!row) return { data: null, error: new Error("Transaction not found") };
      return { data: row, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async create(data) {
    try {
      // In local mode, transactions are created by completing bookings.
      // But we can support a direct create if needed.
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  }
};
