import { FaCalendarAlt, FaMoon, FaSun } from "react-icons/fa";
import { useEffect, useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, User, Settings, LogOut, Edit } from "lucide-react";

export default function Header() {
    // Inisialisasi state langsung dari localStorage untuk mencegah screen flicker saat refresh
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem("theme");
            return savedTheme ? savedTheme === "dark" : true;
        }
        return true;
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        window.location.href = "/login";
    };

    return (
        <div
            className={`
                fixed top-0 left-[280px] right-0 h-20 z-40
                flex items-center justify-between px-8
                border-b backdrop-blur-md transition-all duration-300
                ${darkMode
                    ? "bg-[#111116]/90 border-[#1a1a24] shadow-[0_4px_30px_rgba(0,0,0,0.2)]"
                    : "bg-white/90 border-gray-100 shadow-sm"
                }
            `}
        >
            {/* LEFT SECTION */}
            <div className="flex items-center gap-6">
                <h1 className={`text-xl font-black tracking-wider transition-colors duration-300 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    Groom<span className="text-[#dfb34c]">Gold</span>
                </h1>

                {/* DATE DISPLAY */}
                <div
                    className={`
                        flex items-center gap-3 px-4 py-2.5 rounded-xl border text-[11px] font-semibold tracking-wide
                        cursor-pointer transition-all duration-300 shadow-sm
                        ${darkMode
                            ? "bg-[#16161e] border-[#242335] text-[#8e8e9f] hover:border-[#dfb34c]/30 hover:text-white"
                            : "bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-100"}
                    `}
                >
                    <span>01.06.2023 - 30.06.2023</span>
                    <FaCalendarAlt className={darkMode ? "text-[#dfb34c]/70" : "text-gray-400"} />
                </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="flex items-center gap-5">
                
                {/* DARK MODE SWITCHER */}
                <div
                    onClick={() => setDarkMode(!darkMode)}
                    className={`
                        w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-all duration-500 relative
                        ${darkMode ? "bg-[#16161e] border border-[#242335]" : "bg-gray-100 border border-gray-200"}
                    `}
                >
                    <div
                        className={`
                            w-5 h-5 rounded-full flex items-center justify-center text-[10px] shadow-md
                            transition-all duration-500 ease-out transform
                            ${darkMode ? "translate-x-7 bg-[#dfb34c] text-[#111116]" : "translate-x-0 bg-white text-amber-500"}
                        `}
                    >
                        {darkMode ? <FaMoon /> : <FaSun />}
                    </div>
                </div>

                {/* VERTICAL DIVIDER */}
                <div className={`h-6 w-[1px] ${darkMode ? "bg-[#242335]" : "bg-gray-200"}`} />

                {/* PROFILE DROPDOWN */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button
                            className={`
                                flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-2xl border
                                transition-all duration-300 outline-none group
                                ${darkMode
                                    ? "bg-[#16161e] border-[#242335] hover:border-[#dfb34c]/40"
                                    : "bg-gray-50 border-gray-200 hover:border-gray-300"
                                }
                            `}
                        >
                            <div className="relative">
                                <img
                                    src="/img/cewe.jpg"
                                    alt="User Avatar"
                                    className="w-10 h-10 rounded-xl object-cover border border-[#dfb34c]/30 group-hover:border-[#dfb34c] transition-all duration-300"
                                />
                                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#16161e] rounded-full"></span>
                            </div>

                            <div className="flex flex-col items-start leading-tight">
                                <span className={`text-xs font-bold tracking-wide transition-colors duration-300 ${darkMode ? "text-white" : "text-gray-800"}`}>
                                    Geta Dewi Artika Sari
                                </span>
                                <span className={`text-[10px] font-medium ${darkMode ? "text-[#8e8e9f]" : "text-gray-400"}`}>
                                    Administrator
                                </span>
                            </div>
                            
                            <ChevronDown
                                size={14}
                                className={`transition-transform duration-300 group-data-[state=open]:rotate-180 ${darkMode ? "text-gray-500" : "text-gray-400"}`}
                            />
                        </button>
                    </DropdownMenuTrigger>
                    
                    <DropdownMenuContent
                        align="end"
                        sideOffset={8}
                        className={`w-60 border p-1.5 rounded-2xl shadow-xl transition-all duration-200 animate-in fade-in-50 slide-in-from-top-1 ${darkMode
                            ? "bg-[#16161e] border-[#242335] text-white"
                            : "bg-white border-gray-100 text-gray-800"
                            }`}
                    >
                        <DropdownMenuLabel className="px-3 py-2.5">
                            <div className="flex flex-col gap-0.5">
                                <span className="text-xs font-bold tracking-wide">Geta Dewi Artika Sari</span>
                                <span className={`text-[10px] font-medium ${darkMode ? "text-[#8e8e9f]" : "text-gray-400"}`}>
                                    getadewi@groomgold.com
                                </span>
                            </div>
                        </DropdownMenuLabel>

                        <DropdownMenuSeparator className={darkMode ? "bg-[#242335] my-1" : "bg-gray-100 my-1"} />

                        <DropdownMenuItem className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl cursor-pointer transition-colors focus:bg-[#dfb34c]/10 focus:text-[#dfb34c]">
                            <User size={15} />
                            Profile
                        </DropdownMenuItem>

                        <DropdownMenuItem className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl cursor-pointer transition-colors focus:bg-[#dfb34c]/10 focus:text-[#dfb34c]">
                            <Edit size={15} />
                            Edit Profile
                        </DropdownMenuItem>

                        <DropdownMenuItem className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl cursor-pointer transition-colors focus:bg-[#dfb34c]/10 focus:text-[#dfb34c]">
                            <Settings size={15} />
                            Settings
                        </DropdownMenuItem>

                        <DropdownMenuSeparator className={darkMode ? "bg-[#242335] my-1" : "bg-gray-100 my-1"} />

                        {/* ALERT DIALOG LOGOUT INTEGRATION */}
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                    onSelect={(e) => e.preventDefault()}
                                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl text-red-400 focus:text-red-500 focus:bg-red-500/10 cursor-pointer"
                                >
                                    <LogOut size={15} />
                                    Logout
                                </DropdownMenuItem>
                            </AlertDialogTrigger>

                            <AlertDialogContent
                                className={`border rounded-2xl shadow-2xl max-w-sm ${darkMode
                                    ? "bg-[#16161e] border-[#242335] text-white"
                                    : "bg-white border-gray-100 text-gray-800"
                                    }`}
                            >
                                <AlertDialogHeader>
                                    <AlertDialogTitle className="text-base font-bold">Confirm Logout</AlertDialogTitle>
                                    <AlertDialogDescription className={`text-xs ${darkMode ? "text-[#8e8e9f]" : "text-gray-500"}`}>
                                        Are you sure you want to logout from GroomGold? You will need to re-authenticate.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>

                                <AlertDialogFooter className="gap-2 sm:gap-0">
                                    <AlertDialogCancel
                                        className={`border text-xs rounded-xl px-4 py-2 font-medium transition-all ${darkMode
                                            ? "bg-transparent border-[#242335] text-white hover:bg-[#242335]"
                                            : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                                            }`}
                                    >
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-xl px-4 py-2 border-none transition-all shadow-md shadow-red-500/20"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}