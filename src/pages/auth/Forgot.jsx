import { Link } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi2";
import { useState, useRef, useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiError } from "react-icons/bi";
import { HiOutlineEnvelopeOpen } from "react-icons/hi2";
import { authService } from "../../services/authService";

export default function Forgot() {
    const emailRef = useRef(null);

    // 1. STATE MANAJEMEN INPUT & UI FLOW
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isSuccess, setIsSuccess] = useState(false); // State jika email berhasil dikirim

    useEffect(() => {
        emailRef.current?.focus();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            const { error: resetError } = await authService.resetPassword(email);
            if (resetError) throw resetError;

            setIsSuccess(true);
        } catch (err) {
            setError(err.message || "Gagal mengirimkan tautan reset password.");
        } finally {
            setLoading(false);
        }
    };

    // TAMPILAN JIKA EMAIL BERHASIL DIKIRIM (UX Jauh Lebih Interaktif)
    if (isSuccess) {
        return (
            <div className="w-full max-w-sm mx-auto text-center animate-in fade-in duration-300">
                <div className="w-16 h-16 bg-[#A87C2D]/10 text-[#A87C2D] border border-[#A87C2D]/20 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-inner">
                    <HiOutlineEnvelopeOpen size={28} />
                </div>

                <h2 className="text-2xl font-bold text-white tracking-tight mb-2">
                    Check your email
                </h2>
                
                <p className="text-sm text-[#D3CDC3]/60 mb-6 leading-relaxed">
                    We have sent a password reset link to <br />
                    <span className="text-[#A87C2D] font-medium">{email}</span>
                </p>

                <div className="space-y-4">
                    <button
                        onClick={() => setIsSuccess(false)}
                        className="w-full bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-semibold uppercase tracking-wider py-3 rounded-xl transition"
                    >
                        Resend Email
                    </button>

                    <div>
                        <Link to="/login" className="inline-flex items-center gap-2 text-sm text-[#D3CDC3]/50 hover:text-[#A87C2D] transition group">
                            <HiArrowLeft className="group-hover:-translate-x-1 transition" />
                            Back to sign in
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // TAMPILAN FORM UTAMA
    return (
        <div className="w-full max-w-sm mx-auto">
            {/* HEADER */}
            <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-1">
                    Reset Password
                </h2>
                <p className="text-sm text-[#D3CDC3]/60">
                    Enter your email address and we'll send you a link to reset your password.
                </p>
            </div>

            {/* ERROR NOTIFICATION */}
            {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 mb-4 p-3 rounded-xl flex items-center text-xs font-medium animate-in fade-in duration-200">
                    <BiError className="mr-2 text-base flex-shrink-0" />
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* EMAIL ADDRESS */}
                <div>
                    <label className="text-xs font-semibold text-[#D3CDC3]/70 uppercase tracking-wider block mb-1.5">
                        Email Address
                    </label>
                    <input
                        ref={emailRef}
                        type="email"
                        required
                        disabled={loading}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-[#161616] border border-white/10 rounded-xl text-[#D3CDC3] placeholder-[#D3CDC3]/30 focus:border-[#A87C2D] focus:ring-2 focus:ring-[#A87C2D]/10 outline-none transition disabled:opacity-50"
                        placeholder="you@example.com"
                    />
                </div>

                {/* SUBMIT BUTTON */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#A87C2D] hover:bg-[#c2923c] disabled:bg-[#A87C2D]/50 text-black font-bold py-3 rounded-xl transition transform active:scale-[0.99] flex items-center justify-center shadow-lg shadow-[#A87C2D]/10 disabled:pointer-events-none"
                >
                    {loading ? (
                        <span className="flex items-center gap-2 text-xs uppercase tracking-wider">
                            <AiOutlineLoading3Quarters className="animate-spin text-black text-sm" /> 
                            Sending Link...
                        </span>
                    ) : (
                        <span className="text-xs uppercase tracking-wider">Send Reset Link</span>
                    )}
                </button>

                {/* BACK TO LOGIN */}
                <div className="text-center pt-2">
                    <Link to="/login" className="inline-flex items-center gap-2 text-sm text-[#D3CDC3]/50 hover:text-[#A87C2D] transition group">
                        <HiArrowLeft className="group-hover:-translate-x-1 transition" />
                        Back to sign in
                    </Link>
                </div>
            </form>
        </div>
    );
}
