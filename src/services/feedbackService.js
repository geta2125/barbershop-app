import { db } from "./localDB";

export const feedbackService = {
  async getAll() {
    try {
      const list = db.getFeedbacks();
      return { data: list, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async create(data) {
    try {
      const list = db.getFeedbacks();
      const newId = list.length > 0 ? Math.max(...list.map(f => f.id || 0)) + 1 : 1;
      const newRow = {
        id: newId,
        booking_id: data.booking_id || null,
        customer_name: data.customer_name || "Guest",
        barber_name: data.barber_name || "-",
        rating: Number(data.rating || 5),
        review: data.review || "",
        date: new Date().toISOString().slice(0, 10)
      };
      list.unshift(newRow);
      db.saveFeedbacks(list);
      return { data: newRow, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async delete(id) {
    try {
      let list = db.getFeedbacks();
      list = list.filter(f => String(f.id) !== String(id));
      db.saveFeedbacks(list);
      return { data: true, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  }
};
