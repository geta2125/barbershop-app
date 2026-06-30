import { db } from "./localDB";

export const rewardService = {
  async getAll(includeInactive = false) {
    try {
      let list = db.getRewards();
      return { data: list, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async create(data) {
    try {
      const list = db.getRewards();
      const newId = list.length > 0 ? Math.max(...list.map(r => r.id || 0)) + 1 : 1;
      const newRow = {
        id: newId,
        name: data.name || "",
        points: Number(data.points || 0),
        description: data.description || "",
        status: "Aktif"
      };
      list.push(newRow);
      db.saveRewards(list);
      return { data: newRow, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async update(id, data) {
    try {
      const list = db.getRewards();
      const idx = list.findIndex(r => String(r.id) === String(id));
      if (idx === -1) return { data: null, error: new Error("Reward not found") };

      const updated = {
        ...list[idx],
        name: data.name || list[idx].name,
        points: data.points !== undefined ? Number(data.points) : list[idx].points,
        description: data.description || list[idx].description,
        status: data.status || list[idx].status
      };
      list[idx] = updated;
      db.saveRewards(list);
      return { data: updated, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async delete(id) {
    try {
      let list = db.getRewards();
      list = list.filter(r => String(r.id) !== String(id));
      db.saveRewards(list);
      return { data: true, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  },
};
