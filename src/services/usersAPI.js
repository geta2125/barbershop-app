import { supabase } from "../lib/supabaseClient";
import { db } from "./localDB";

const ROLE_MAP = {
  Admin: "admin",
  Owner: "owner",
  Barber: "barber",
  Member: "member",
  Customer: "member",
  Staff: "barber",
};

const LABEL_MAP = {
  admin: "Admin",
  owner: "Owner",
  barber: "Barber",
  member: "Member",
};

function normalizeRole(role = "member") {
  return ROLE_MAP[role] || String(role).toLowerCase();
}

function mapUser(row = {}) {
  return {
    ...row,
    id: row.id || row.ID_Customer,
    nama: row.name || row.full_name || row.nama || "",
    full_name: row.full_name || row.name || "",
    role: LABEL_MAP[row.role] || row.role || "Member",
    roleValue: row.role,
    roleLabel: LABEL_MAP[row.role] || row.role || "Member",
    status: row.status || "Aktif",
  };
}

export async function getCurrentProfile() {
  try {
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError || !authData.user) return null;

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", authData.user.id)
      .single();

    if (error) {
      console.warn("Profile not found in Supabase public.users, using auth metadata instead.");
      // Fallback to auth metadata if public.users is not populated
      return mapUser({
        id: authData.user.id,
        email: authData.user.email,
        name: authData.user.user_metadata?.full_name || "GroomGold User",
        role: authData.user.user_metadata?.role || "member",
        status: "Aktif"
      });
    }
    return mapUser(data);
  } catch (e) {
    console.error("Error fetching current profile:", e);
    return null;
  }
}

export const usersAPI = {
  async fetchUsers() {
    try {
      const list = db.getUsers();
      return list.map(mapUser);
    } catch (e) {
      console.error(e);
      return [];
    }
  },

  async createUser(form) {
    try {
      const list = db.getUsers();
      const newId = `user-${Date.now()}`;
      const newUser = {
        id: newId,
        name: form.nama,
        email: form.email,
        role: normalizeRole(form.role),
        status: form.status || "Aktif",
        created_at: new Date().toISOString().slice(0, 10)
      };
      list.unshift(newUser);
      db.saveUsers(list);
      return mapUser(newUser);
    } catch (e) {
      throw e;
    }
  },

  async updateUser(id, form) {
    try {
      const list = db.getUsers();
      const idx = list.findIndex(u => String(u.id) === String(id));
      if (idx === -1) throw new Error("User not found");

      const updated = {
        ...list[idx],
        name: form.nama || list[idx].name,
        email: form.email || list[idx].email,
        role: normalizeRole(form.role),
        status: form.status || list[idx].status,
      };
      list[idx] = updated;
      db.saveUsers(list);
      return mapUser(updated);
    } catch (e) {
      throw e;
    }
  },

  async deleteUser(id) {
    try {
      let list = db.getUsers();
      list = list.filter(u => String(u.id) !== String(id));
      db.saveUsers(list);
    } catch (e) {
      throw e;
    }
  },

  async forgotPassword(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });
    if (error) throw error;
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },
};
