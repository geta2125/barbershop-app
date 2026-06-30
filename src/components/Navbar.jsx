import { Bell, Search, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";

export default function Navbar() {
    const navigate = useNavigate();
    const { profile, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        navigate("/login", { replace: true });
    };

    return (
        <header className="h-16 bg-[#111111] border-b border-[#2B2B2B] flex items-center justify-between px-8">

            {/* Search */}

            <div className="relative w-96">

                <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                />

                <input
                    type="text"
                    placeholder="Cari..."
                    className="
                        w-full
                        bg-[#1B1B1B]
                        border
                        border-[#333]
                        rounded-xl
                        py-2.5
                        pl-11
                        pr-4
                        text-white
                        outline-none
                        focus:border-yellow-500
                    "
                />

            </div>

            {/* Right */}

            <div className="flex items-center gap-5">

                <button className="relative">

                    <Bell
                        className="text-gray-300 hover:text-yellow-500"
                        size={22}
                    />

                    <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>

                </button>

                <div className="flex items-center gap-3">

                    <div className="w-11 h-11 rounded-full bg-yellow-600 flex items-center justify-center">

                        <User className="text-white" />

                    </div>

                    <div>

                        <h3 className="text-white font-semibold">

                            {profile?.full_name || profile?.name || "Guest"}

                        </h3>

                        <p className="text-gray-400 text-xs capitalize">

                            {profile?.role || "member"}

                        </p>

                    </div>

                </div>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-400 hover:text-red-500"
                >

                    <LogOut size={20} />

                    Logout

                </button>

            </div>

        </header>
    );
}
