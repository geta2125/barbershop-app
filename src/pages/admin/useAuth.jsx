import { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "../lib/supabaseClient";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);

        if (session?.user) {
          const { data: profile } = await supabase
            .from("users")
            .select("role, name") // Ambil role dan nama dari tabel 'users'
            .eq("id", session.user.id)
            .single();
          setUserProfile(profile);
        }
      } catch (error) {
        console.error("Error getting initial session:", error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUserProfile(null); // Reset profil saat auth state berubah
        if (session?.user) {
          setLoading(true);
          const { data: profile } = await supabase
            .from("users")
            .select("role, name")
            .eq("id", session.user.id)
            .single();
          setUserProfile(profile);
          setLoading(false);
        }
      }
    );

    return () => authListener.subscription.unsubscribe();
  }, []);

  const value = { session, userProfile, loading };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);