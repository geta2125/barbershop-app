import { Link } from "react-router-dom";

export default function Register() {
    return (
        <div>
            {/* HEADER */}
            <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-1">
                    Create Account
                </h2>
                <p className="text-sm text-[#D3CDC3]/60">
                    Join GroomGold to get the ultimate grooming treatment.
                </p>
            </div>

            <form className="space-y-4">
                {/* EMAIL */}
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

                {/* PASSWORD */}
                <div>
                    <label className="text-xs font-semibold text-[#D3CDC3]/70 uppercase tracking-wider block mb-1.5">
                        Password
                    </label>
                    <input
                        type="password"
                        required
                        className="w-full px-4 py-3 bg-[#161616] border border-white/10 rounded-xl text-[#D3CDC3] placeholder-[#D3CDC3]/30 focus:border-[#A87C2D] focus:ring-2 focus:ring-[#A87C2D]/10 outline-none transition"
                        placeholder="••••••••"
                    />
                </div>

                {/* CONFIRM PASSWORD */}
                <div>
                    <label className="text-xs font-semibold text-[#D3CDC3]/70 uppercase tracking-wider block mb-1.5">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        required
                        className="w-full px-4 py-3 bg-[#161616] border border-white/10 rounded-xl text-[#D3CDC3] placeholder-[#D3CDC3]/30 focus:border-[#A87C2D] focus:ring-2 focus:ring-[#A87C2D]/10 outline-none transition"
                        placeholder="••••••••"
                    />
                </div>

                {/* SUBMIT BUTTON */}
                <button
                    type="submit"
                    className="w-full bg-[#A87C2D] hover:bg-[#c2923c] text-black font-bold py-3 rounded-xl transition shadow-lg shadow-[#A87C2D]/10 pt-3"
                >
                    Register Account
                </button>

                {/* SIGN IN LINK */}
                <p className="text-center text-sm text-[#D3CDC3]/50 pt-2">
                    Already have an account?{" "}
                    <Link to="/login" className="text-[#A87C2D] font-semibold hover:underline">
                        Sign in
                    </Link>
                </p>
            </form>
        </div>
    );
}