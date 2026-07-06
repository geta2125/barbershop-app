import { supabase } from "../lib/supabaseClient";
import { db } from "./localDB";

const ROLE_MAP = {
  Admin: "admin",
  Owner: "owner",
  Barber: "barber",
  Member: "member",
  Customer: "customer",
  Kasir: "kasir",
  Staff: "barber",
};

const LABEL_MAP = {
  admin: "Admin",
  owner: "Owner",
  barber: "Barber",
  member: "Member",
  customer: "Customer",
  kasir: "Kasir",
};

function normalizeRole(role = "member") {
  return ROLE_MAP[role] || String(role).toLowerCase();
}

function mapUser(row = {}) {
  const roleVal = String(row.role || "member").toLowerCase();
  return {
    ...row,
    id: row.id || row.ID_Customer,
    nama: row.name || row.full_name || row.nama || "",
    full_name: row.full_name || row.name || "",
    role: LABEL_MAP[roleVal] || row.role || "Member",
    roleValue: roleVal,
    roleLabel: LABEL_MAP[roleVal] || row.role || "Member",
    status: row.status || "Aktif",
    phone: row.phone || row.phone_number || row.no_hp || "",
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
      const { data, error } = await supabase
        .from("users")
        .select("*");
      if (error) throw error;
      return (data || []).map(mapUser);
    } catch (e) {
      console.warn("Supabase fetch users failed, falling back to local DB:", e);
      const list = db.getUsers();
      return list.map(mapUser);
    }
  },

  async createUser(form) {
    try {
      const newUser = {
        name: form.nama,
        full_name: form.nama,
        email: form.email,
        role: normalizeRole(form.role),
        status: form.status || "Aktif",
      };
      const { data, error } = await supabase
        .from("users")
        .insert([newUser])
        .select()
        .single();
      if (error) throw error;
      return mapUser(data);
    } catch (e) {
      console.warn("Supabase create user failed, using local DB fallback:", e);
      const list = db.getUsers();
      const newId = `user-${Date.now()}`;
      const fallbackUser = {
        id: newId,
        name: form.nama,
        email: form.email,
        role: normalizeRole(form.role),
        status: form.status || "Aktif",
        created_at: new Date().toISOString().slice(0, 10)
      };
      list.unshift(fallbackUser);
      db.saveUsers(list);
      return mapUser(fallbackUser);
    }
  },

  async updateUser(id, form) {
    try {
      const updatedFields = {
        name: form.nama,
        full_name: form.nama,
        email: form.email,
        role: normalizeRole(form.role),
        status: form.status,
      };
      const { data, error } = await supabase
        .from("users")
        .update(updatedFields)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return mapUser(data);
    } catch (e) {
      console.warn("Supabase update user failed, using local DB fallback:", e);
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
    }
  },

  async deleteUser(id) {
    try {
      const { error } = await supabase
        .from("users")
        .delete()
        .eq("id", id);
      if (error) throw error;
    } catch (e) {
      console.warn("Supabase delete user failed, using local DB fallback:", e);
      let list = db.getUsers();
      list = list.filter(u => String(u.id) !== String(id));
      db.saveUsers(list);
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
