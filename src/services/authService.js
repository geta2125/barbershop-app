import { supabase } from "../lib/supabaseClient";

export const authService = {
  async login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return data;
  },

  async register({
    full_name,
    email,
    password,
    phone,
    phone_number,
  }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name,
          phone: phone || phone_number,
          role: "member",
        },
      },
    });

    if (error) throw error;

    return data;
  },

  async logout() {
    return await supabase.auth.signOut();
  },

  async getSession() {
    return await supabase.auth.getSession();
  },

  async getUser() {
    return await supabase.auth.getUser();
  },

  async resetPassword(email) {
    return await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });
  },
};
