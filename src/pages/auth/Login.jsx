import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiError } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import { supabase } from "../../lib/supabaseClient";
import { useAuth } from "../../contexts/auth-context";

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const emailRef = useRef(null);

    const {
        login,
        refreshProfile,
        redirectPath,
    } = useAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
    });

    // Membaca data kiriman setelah sukses daftar akun
    useEffect(() => {
        if (location.state?.successMessage) {
            setSuccessMsg(location.state.successMessage);
        }
        if (location.state?.registeredEmail) {
            setDataForm((prev) => ({
                ...prev,
                email: location.state.registeredEmail
            }));
        }
        emailRef.current?.focus();
    }, [location.state]);

    const handleChange = (e) => {
        setDataForm({
            ...dataForm,
            [e.target.name]: e.target.value
        });
    };

    // ==========================================
    // PROSES SUBMIT LOGIN
    // ==========================================
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");
            setSuccessMsg("");

            // login() dari AuthContext sudah menangani loadProfile secara internal.
            // Tidak perlu query manual ke public.users di sini.
            const { error: loginError } = await login(
                dataForm.email.trim(),
                dataForm.password.trim()
            );

            if (loginError) throw loginError;

            // Pastikan profile ter-refresh sebelum navigasi
            await refreshProfile();

            navigate(redirectPath, {
                replace: true,
            });
        } catch (err) {
            console.error(err);
            if (err.message === "Invalid login credentials") {
                setError("Email atau kata sandi yang Anda masukkan salah.");
            } else if (err.status === 429 || err.message?.toLowerCase().includes("rate limit")) {
                setError("Terlalu banyak percobaan masuk. Silakan tunggu beberapa menit.");
            } else {
                setError(err.message || "Terjadi kesalahan saat masuk.");
            }
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // PROSES LOGIN DENGAN GOOGLE
    // ==========================================
    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            setError("");
            const { error: authError } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `${window.location.origin}/dashboard`,
                },
            });
            if (authError) throw authError;
        } catch (err) {
            setError(err.message || "Gagal masuk dengan Google.");
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-sm mx-auto">
            {/* HEADER */}
            <h2 className="text-3xl font-bold text-white mb-1.5 tracking-tight">
                Selamat Datang
            </h2>
            <p className="text-sm text-[#D3CDC3]/60 mb-6">
                Masuk ke akun GroomGold untuk mulai mengelola sistem.
            </p>

            {/* NOTIFIKASI SUKSES REGISTER */}
            {successMsg && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-4 p-3 rounded-xl flex items-center text-xs font-medium animate-in fade-in duration-200">
                    <HiOutlineCheckCircle className="mr-2 text-base flex-shrink-0" />
                    {successMsg}
                </div>
            )}

            {/* ERROR */}
            {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 mb-4 p-3 rounded-xl flex items-center text-xs font-medium animate-in fade-in duration-200">
                    <BiError className="mr-2 text-base flex-shrink-0" />
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* EMAIL */}
                <div>
                    <label className="text-xs font-semibold text-[#D3CDC3]/70 uppercase tracking-wider block mb-1.5">
                        Alamat Email
                    </label>
                    <input
                        ref={emailRef}
                        name="email"
                        type="email"
                        required
                        disabled={loading}
                        value={dataForm.email}
                        onChange={handleChange}
                        placeholder="Masukkan email"
                        className="w-full px-4 py-3 bg-[#161616] border border-white/10 rounded-xl text-[#D3CDC3] placeholder-[#D3CDC3]/30 focus:border-[#A87C2D] focus:ring-2 focus:ring-[#A87C2D]/10 outline-none transition disabled:opacity-50"
                    />
                </div>

                {/* PASSWORD */}
                <div>
                    <label className="text-xs font-semibold text-[#D3CDC3]/70 uppercase tracking-wider block mb-1.5">
                        Kata Sandi
                    </label>
                    <div className="relative">
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            required
                            disabled={loading}
                            value={dataForm.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full pl-4 pr-12 py-3 bg-[#161616] border border-white/10 rounded-xl text-[#D3CDC3] placeholder-[#D3CDC3]/30 focus:border-[#A87C2D] focus:ring-2 focus:ring-[#A87C2D]/10 outline-none transition disabled:opacity-50"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D3CDC3]/40 hover:text-[#A87C2D]"
                        >
                            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                        </button>
                    </div>

                    {/* REMEMBER & FORGOT */}
                    <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="remember"
                                checked={rememberMe}
                                onCheckedChange={setRememberMe}
                                disabled={loading}
                            />
                            <label htmlFor="remember" className="text-xs text-[#D3CDC3]/70 cursor-pointer select-none">
                                Ingat Saya
                            </label>
                        </div>
                        <Link to="/forgot" className="text-[#A87C2D] text-xs hover:underline cursor-pointer font-medium">
                            Lupa Kata Sandi?
                        </Link>
                    </div>
                </div>

                {/* BUTTON LOGIN */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#A87C2D] hover:bg-[#c2923c] disabled:bg-[#A87C2D]/50 text-black font-bold py-3 rounded-xl transition transform active:scale-[0.99] flex items-center justify-center shadow-lg shadow-[#A87C2D]/10 disabled:pointer-events-none"
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2 text-xs uppercase tracking-wider">
                            <AiOutlineLoading3Quarters className="animate-spin text-black text-sm" />
                            Sedang Masuk...
                        </span>
                    ) : (
                        <span className="text-xs uppercase tracking-wider">Masuk</span>
                    )}
                </button>

                {/* DIVIDER */}
                <div className="flex items-center gap-3 text-[10px] font-bold tracking-widest text-[#D3CDC3]/30">
                    <div className="flex-1 h-[1px] bg-white/5"></div>
                    ATAU
                    <div className="flex-1 h-[1px] bg-white/5"></div>
                </div>

                {/* GOOGLE BUTTON */}
                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-white/5 border border-white/10 py-3 rounded-xl hover:bg-white/10 text-white text-xs font-semibold uppercase tracking-wider transition disabled:opacity-50"
                >
                    <FcGoogle size={16} />
                    Masuk dengan Google
                </button>

                {/* REGISTER LINK */}
                <p className="text-center text-xs text-[#D3CDC3]/40 pt-1">
                    Belum memiliki akun?
                    <Link to="/register" className="text-[#A87C2D] font-semibold hover:underline ml-1">
                        Daftar Sekarang
                    </Link>
                </p>
            </form>
        </div>
    );
}