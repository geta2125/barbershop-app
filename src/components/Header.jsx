import { FaCalendarAlt, FaMoon, FaSun } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Header() {

    // TOGGLE MODE
    const [darkMode, setDarkMode] = useState(true);

    // SIMPAN MODE KE LOCAL STORAGE
    useEffect(() => {

        if (darkMode) {

            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");

        } else {

            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");

        }

    }, [darkMode]);

    // AMBIL MODE SEBELUMNYA
    useEffect(() => {

        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "light") {

            setDarkMode(false);

        }

    }, []);

    return (

        <div className={`

            fixed top-0 left-60 right-0 h-20 z-40
            flex items-center justify-between px-8
            border-b transition-all duration-300

            ${darkMode
                ? "bg-[#111116] border-[#1a1a24]"
                : "bg-white border-gray-200 shadow-sm"
            }

        `}>

            {/* LEFT */}
            <div className="flex items-center gap-6">

                {/* TITLE */}
                <h1 className={`

                    text-2xl font-black tracking-wide
                    transition-all duration-300

                    ${darkMode
                        ? "text-white"
                        : "text-gray-800"
                    }

                `}>

                    GroomGold

                </h1>

                {/* DATE */}
                <div className={`

                    flex items-center gap-3
                    px-4 py-2
                    rounded-xl
                    border
                    text-xs
                    cursor-pointer
                    transition-all duration-300

                    ${darkMode
                        ? "bg-[#1b1b24] border-[#242335] text-[#8e8e9f] hover:bg-[#23232f]"
                        : "bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200"
                    }

                `}>

                    <span className="font-medium">
                        01.06.2023 - 31.06.2023
                    </span>

                    <FaCalendarAlt />

                </div>

            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-8">

                {/* TOGGLE MODE */}
                <div
                    onClick={() => setDarkMode(!darkMode)}
                    className={`

                        w-14 h-7
                        flex items-center
                        rounded-full
                        p-1
                        cursor-pointer
                        transition-all duration-300

                        ${darkMode
                            ? "bg-[#1b1b24] border border-[#242335]"
                            : "bg-gray-200 border border-gray-300"
                        }

                    `}
                >

                    <div className={`

                        w-5 h-5
                        rounded-full
                        flex items-center justify-center
                        text-[10px]
                        transition-all duration-300
                        shadow-md

                        ${darkMode
                            ? "translate-x-7 bg-[#dfb34c] text-black"
                            : "translate-x-0 bg-white text-yellow-500"
                        }

                    `}>

                        {darkMode
                            ? <FaMoon />
                            : <FaSun />
                        }

                    </div>

                </div>

                {/* PROFILE */}
                <div className="flex items-center gap-3">

                    <img
                        src="/img/cewe.jpg"
                        alt="User"
                        className={`

                            w-10 h-10
                            rounded-full
                            object-cover
                            border

                            ${darkMode
                                ? "border-white/10"
                                : "border-gray-300"
                            }

                        `}
                    />

                    <span className={`

                        text-sm font-semibold
                        tracking-wide
                        transition-all duration-300

                        ${darkMode
                            ? "text-white"
                            : "text-gray-700"
                        }

                    `}>

                        Geta Dewi Artika Sari

                    </span>

                </div>

            </div>

        </div>

    );

}