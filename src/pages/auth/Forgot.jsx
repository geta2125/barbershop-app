export default function Forgot() {
    return (
        <div>
            <h2 className="text-2xl font-semibold text-[#D3CDC3] mb-2 text-center">
                Reset Password
            </h2>

            <p className="text-sm text-[#D3CDC3]/60 mb-6 text-center">
                Enter your email to receive reset link
            </p>

            <form>
                <div className="mb-5">
                    <label className="block text-sm text-[#D3CDC3]/70 mb-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        className="w-full px-4 py-2 bg-[#222323] border border-[#A87C2D] rounded-lg 
                        text-[#D3CDC3] placeholder-[#D3CDC3]/60 
                        focus:border-[#A87C2D] focus:ring-2 focus:ring-[#A87C2D]/30 outline-none"
                        placeholder="you@example.com"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#A87C2D] hover:bg-[#641824] text-white font-semibold py-2 rounded-lg transition shadow-md"
                >
                    Send Link
                </button>
            </form>
        </div>
    );
}