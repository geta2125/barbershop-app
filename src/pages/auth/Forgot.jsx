import { Link } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi2";

export default function Forgot() {
    const emailRef = useRef(null);

    useEffect(() => {
        emailRef.current?.focus();
    }, []);
    return (
        <div>
            {/* HEADER */}
            <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-1">
                    Reset Password
                </h2>
                <p className="text-sm text-[#D3CDC3]/60">
                    Enter your email address and we'll send you a link to reset your password.
                </p>
            </div>

            <form className="space-y-5">
                <div>
                    <label className="text-xs font-semibold text-[#D3CDC3]/70 uppercase tracking-wider block mb-1.5">
                        Email Address
                    </label>
                    <input
                        type="email"
                        required
                        className="w-full px-4 py-3 bg-[#161616] border border-white/10 rounded-xl text-[#D3CDC3] placeholder-[#D3CDC3]/30 focus:border-[#A87C2D] focus:ring-2 focus:ring-[#A87C2D]/10 outline-none transition"
                        placeholder="you@example.com"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#A87C2D] hover:bg-[#c2923c] text-black font-bold py-3 rounded-xl transition shadow-lg shadow-[#A87C2D]/10"
                >
                    Send Reset Link
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