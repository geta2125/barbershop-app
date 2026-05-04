export default function Register() {
    return (
        <div>
            <h2 className="text-2xl font-semibold text-[#D3CDC3] mb-6 text-center">
                Create Account ✨
            </h2>

            <form>
                <div className="mb-5">
                    <label className="block text-sm text-[#D3CDC3]/70 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        className="w-full px-4 py-2 bg-[#222323] border border-[#7A1F2D] rounded-lg 
                        text-[#D3CDC3] placeholder-[#D3CDC3]/60 
                        focus:border-[#7A1F2D] focus:ring-2 focus:ring-[#7A1F2D]/30 outline-none"
                        placeholder="you@example.com"
                    />
                </div>

                <div className="mb-5">
                    <label className="block text-sm text-[#D3CDC3]/70 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        className="w-full px-4 py-2 bg-[#222323] border border-[#7A1F2D] rounded-lg 
                        text-[#D3CDC3] placeholder-[#D3CDC3]/60 
                        focus:border-[#7A1F2D] focus:ring-2 focus:ring-[#7A1F2D]/30 outline-none"
                        placeholder="********"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm text-[#D3CDC3]/70 mb-1">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        className="w-full px-4 py-2 bg-[#222323] border border-[#7A1F2D] rounded-lg 
                        text-[#D3CDC3] placeholder-[#D3CDC3]/60 
                        focus:border-[#7A1F2D] focus:ring-2 focus:ring-[#7A1F2D]/30 outline-none"
                        placeholder="********"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#7A1F2D] hover:bg-[#641824] text-white font-semibold py-2 rounded-lg transition shadow-md"
                >
                    Register
                </button>
            </form>
        </div>
    );
}