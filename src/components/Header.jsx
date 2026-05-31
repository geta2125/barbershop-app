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
import { User, Settings, LogOut, Edit } from "lucide-react";

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
                fixed top-0 left-60 right-0 h-20 z-40
                flex items-center justify-between px-8
                border-b transition-all duration-300
                ${darkMode ? "bg-[#111116] border-[#1a1a24]" : "bg-white border-gray-200 shadow-sm"}
            `}
        >
            {/* LEFT SECTION */}
            <div className="flex items-center gap-6">
                <h1 className={`text-2xl font-black tracking-wide ${darkMode ? "text-white" : "text-gray-800"}`}>
                    GroomGold
                </h1>

                <div
                    className={`
                        flex items-center gap-3 px-4 py-2 rounded-xl border text-xs
                        cursor-pointer transition-all
                        ${darkMode 
                            ? "bg-[#1b1b24] border-[#242335] text-[#8e8e9f]" 
                            : "bg-gray-100 border-gray-200 text-gray-600"}
                    `}
                >
                    <span className="font-medium">01.06.2023 - 30.06.2023</span>
                    <FaCalendarAlt />
                </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="flex items-center gap-6">
                {/* DARK MODE SWITCHER */}
                <div
                    onClick={() => setDarkMode(!darkMode)}
                    className={`
                        w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-all
                        ${darkMode ? "bg-[#1b1b24] border border-[#242335]" : "bg-gray-200 border border-gray-300"}
                    `}
                >
                    <div
                        className={`
                            w-5 h-5 rounded-full flex items-center justify-center text-[10px] shadow-md
                            transition-all duration-300
                            ${darkMode ? "translate-x-7 bg-[#dfb34c] text-black" : "translate-x-0 bg-white text-yellow-500"}
                        `}
                    >
                        {darkMode ? <FaMoon /> : <FaSun />}
                    </div>
                </div>

                {/* PROFILE DROPDOWN */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition outline-none">
                            <img
                                src="/img/cewe.jpg"
                                alt="User"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <span className={`text-sm font-semibold ${darkMode ? "text-white" : "text-gray-700"}`}>
                                Geta Dewi Artika Sari
                            </span>
                        </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        align="end"
                        className={`w-64 border p-1 transition-all ${
                            darkMode 
                                ? "bg-[#1b1b24] border-[#242335] text-white" 
                                : "bg-white border-gray-200 text-gray-800"
                        }`}
                    >
                        <DropdownMenuLabel className="px-2 py-1.5">
                            <div className="flex flex-col">
                                <span className="font-bold">Geta Dewi Artika Sari</span>
                                <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                    Administrator
                                </span>
                            </div>
                        </DropdownMenuLabel>

                        <DropdownMenuSeparator className={darkMode ? "bg-[#242335]" : "bg-gray-200"} />

                        <DropdownMenuItem className="cursor-pointer">
                            <User className="mr-2 h-4 w-4" />
                            Profile
                        </DropdownMenuItem>

                        <DropdownMenuItem className="cursor-pointer">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Profile
                        </DropdownMenuItem>

                        <DropdownMenuItem className="cursor-pointer">
                            <Settings className="mr-2 h-4 w-4" />
                            Settings
                        </DropdownMenuItem>

                        <DropdownMenuSeparator className={darkMode ? "bg-[#242335]" : "bg-gray-200"} />

                        {/* ALERT DIALOG LOGOUT INTEGRATION */}
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                    onSelect={(e) => e.preventDefault()}
                                    className="text-red-400 focus:text-red-500 focus:bg-red-500/10 cursor-pointer"
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Logout
                                </DropdownMenuItem>
                            </AlertDialogTrigger>

                            <AlertDialogContent 
                                className={`border ${
                                    darkMode 
                                        ? "bg-[#1b1b24] border-[#242335] text-white" 
                                        : "bg-white border-gray-200 text-gray-800"
                                }`}
                            >
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                                    <AlertDialogDescription className={darkMode ? "text-gray-400" : "text-gray-500"}>
                                        Are you sure you want to logout from GroomGold?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>

                                <AlertDialogFooter>
                                    <AlertDialogCancel
                                        className={`border ${
                                            darkMode 
                                                ? "bg-[#111116] border-[#242335] text-white hover:bg-[#1a1a24]" 
                                                : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
                                        }`}
                                    >
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        className="bg-red-500 hover:bg-red-600 text-white border-none"
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