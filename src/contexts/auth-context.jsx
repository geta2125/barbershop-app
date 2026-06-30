import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { supabase } from "../lib/supabaseClient";
import { roleRedirect } from "../utils/roleRedirect";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [session, setSession] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    // mengambil data profile dari tabel users
    const loadProfile = async (userId) => {
        if (!userId) {
            setProfile(null);
            return;
        }

        const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", userId)
            .single();

        if (error) {
            console.error(error);
            setProfile(null);
            return;
        }

        setProfile(data);
    };

    useEffect(() => {
        // session pertama
        supabase.auth.getSession().then(async ({ data }) => {
            setSession(data.session);

            if (data.session) {
                await loadProfile(data.session.user.id);
            }

            setLoading(false);
        });

        // listener login logout
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                setSession(session);

                if (session) {
                    await loadProfile(session.user.id);
                } else {
                    setProfile(null);
                }

                setLoading(false);
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    // LOGIN
    const refreshProfile = async () => {
        const { data } = await supabase.auth.getUser();
        if (data.user) await loadProfile(data.user.id);
    };

    const login = async (email, password) => {
        const response = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (response.data?.user) {
            await loadProfile(response.data.user.id);
        }
        return response;
    };

    // REGISTER
    const register = async (
        full_name,
        email,
        password,
        phone,
    ) => {
        return await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name,
                    phone,
                    role: "member",
                },
            },
        });
    };

    const forgotPassword = async (email) => {
        return await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/login`,
        });
    };

    // LOGOUT
    const logout = async () => {
        await supabase.auth.signOut();
    };

    return (
        <AuthContext.Provider
            value={{
                session,
                profile,
                loading,
                login,
                logout,
                register,
                forgotPassword,
                refreshProfile,
                redirectPath: profile
    ? roleRedirect(profile.role)
    : "/",
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
