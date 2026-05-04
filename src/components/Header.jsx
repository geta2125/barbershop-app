import { FaSearch, FaBell, FaCog } from "react-icons/fa";

export default function Header() {
    return (
        <div className="fixed top-5 left-[280px] right-5 z-50">
            <div
                className="
                    relative
                    flex items-center justify-between
                    px-6 py-4
                    rounded-2xl
                    bg-gradient-to-r from-[#1a1a1a]/80 to-[#111]/80
                    backdrop-blur-xl
                    border border-white/10
                    shadow-[0_10px_30px_rgba(0,0,0,0.6)]
                "
            >
                {/* GLOW */}
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#7A1F2D]/10 blur-3xl rounded-full" />

                {/* LEFT */}
                <h1 className="text-lg font-semibold tracking-wide text-white">
                    Velvet<span className="text-[#7A1F2D]">Blade</span>
                </h1>

                {/* CENTER - SEARCH */}
                <div
                    className="
                        flex items-center gap-3
                        flex-1 max-w-[500px]
                        mx-6
                        px-4 py-2
                        bg-white/5
                        border border-white/10
                        rounded-xl
                        hover:border-white/20
                        focus-within:border-[#7A1F2D]
                        transition
                    "
                >
                    <FaSearch className="text-gray-400 text-sm" />
                    <input
                        type="text"
                        placeholder="Search anything..."
                        className="
                            w-full bg-transparent outline-none
                            text-sm text-white
                            placeholder-gray-500
                        "
                    />
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-4">

                    {/* ICONS */}
                    <div className="flex items-center gap-3">

                        {/* NOTIFICATION */}
                        <div
                            className="
                                relative p-2
                                bg-white/5 rounded-lg
                                hover:bg-white/10
                                transition cursor-pointer
                            "
                        >
                            <FaBell className="text-gray-300" />
                            <span
                                className="
                                    absolute -top-1 -right-1
                                    px-1.5 py-[1px]
                                    text-[10px]
                                    bg-[#7A1F2D]
                                    text-white
                                    rounded-full
                                "
                            >
                                3
                            </span>
                        </div>

                        {/* SETTINGS */}
                        <div
                            className="
                                p-2
                                bg-white/5 rounded-lg
                                hover:bg-white/10
                                transition cursor-pointer
                            "
                        >
                            <FaCog className="text-gray-300" />
                        </div>

                    </div>

                    {/* PROFILE */}
                    <div
                        className="
                            flex items-center gap-3
                            px-3 py-2
                            bg-white/5
                            border border-white/10
                            rounded-xl
                            hover:border-white/20
                            transition
                        "
                    >
                        <img
                            src="img/cewe.jpg"
                            alt="profile"
                            className="w-9 h-9 rounded-full object-cover border border-white/10"
                        />
                        <div className="text-xs leading-tight">
                            <p className="text-gray-400">Welcome back</p>
                            <p className="text-white font-semibold">Geta Dewi</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}