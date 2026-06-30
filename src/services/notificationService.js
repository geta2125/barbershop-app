import { supabase } from "../lib/supabaseClient";

export const notificationService = {
  async getMine() {
    return await supabase
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false });
  },

  async markAsRead(id) {
    return await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", id)
      .select("*")
      .single();
  },
};
