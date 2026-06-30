import { supabase } from "../lib/supabaseClient";

/**
 * Mengambil semua data pengguna dengan menggabungkan data dari auth dan tabel public.users.
 * Catatan: Ini memerlukan RLS policy yang sesuai di Supabase.
 */
const getUsers = async () => {
  const { data, error } = await supabase.from("users").select(`
    id,
    name,
    role,
    created_at,
    raw_user_meta_data->>'email' as email
  `);
  if (error) throw error;
  return data;
};

/**
 * Membuat pengguna baru melalui Edge Function.
 * @param {object} userData - { email, password, name, role }
 */
const createUser = async (userData) => {
  const { data, error } = await supabase.functions.invoke("manage-user", {
    method: "POST",
    body: { action: "CREATE", ...userData },
  });
  if (error) throw error;
  return data;
};

/**
 * Menghapus pengguna melalui Edge Function.
 * @param {string} userId
 */
const deleteUser = async (userId) => {
  const { data, error } = await supabase.functions.invoke("manage-user", {
    method: "POST",
    body: { action: "DELETE", userId },
  });
  if (error) throw error;
  return data;
};

export const userService = {
  getUsers,
  createUser,
  deleteUser,
};