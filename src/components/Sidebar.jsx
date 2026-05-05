import {
    FaHome,
    FaClipboardList,
    FaUsers,
    FaCut,
    FaUserTie,
    FaHistory
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Sidebar() {

    const menuClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative group
        ${isActive
            ? "bg-[#A87C2D]/90 text-white font-semibold shadow-lg backdrop-blur"
            : "text-[#D3CDC3]/70 hover:bg-white/5 hover:text-white"
        }`;

    const menus = [
        { key: "/", label: "Dashboard", icon: <FaHome /> },
        { key: "/services", label: "Services", icon: <FaCut /> },
        { key: "/booking", label: "Booking", icon: <FaClipboardList /> },
        { key: "/customers", label: "Customers", icon: <FaUsers /> },
        { key: "/barber", label: "Barbers", icon: <FaUserTie /> },
        { key: "/history", label: "History", icon: <FaHistory /> },
    ];

    return (
        <div className="
            fixed top-4 left-4 bottom-4 w-64 
            rounded-3xl 
            bg-white/5 backdrop-blur-xl 
            border border-white/10 
            shadow-xl
            flex flex-col justify-between px-5 py-6 z-50
        ">

            {/* GLOW HALUS */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-[#A87C2D]/10 blur-3xl rounded-full"></div>

            {/* TOP */}
            <div className="relative">

                {/* LOGO */}
                <div className="mb-10">
                    <h1 className="text-2xl font-bold text-white tracking-wide">
                        Velvet<span className="text-[#A87C2D]">Blade</span>
                    </h1>
                    <p className="text-[#D3CDC3]/60 text-xs mt-1">
                        Premium System
                    </p>
                </div>

                {/* MENU */}
                <ul className="space-y-2">
                    {menus.map((item) => (
                        <li key={item.key}>
                            <NavLink to={item.key} className={menuClass}>
                                {({ isActive }) => (
                                    <>
                                        {/* ACTIVE BAR */}
                                        {isActive && (
                                            <div className="absolute left-0 top-2 bottom-2 w-1 bg-[#A87C2D] rounded-r-full"></div>
                                        )}

                                        {/* ICON */}
                                        <div className="text-lg group-hover:scale-110 transition">
                                            {item.icon}
                                        </div>

                                        {/* TEXT */}
                                        <span className="text-sm">{item.label}</span>
                                    </>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>

            </div>

            {/* BOTTOM CARD */}
            <div className="
                bg-white/5 backdrop-blur 
                border border-white/10 
                p-5 rounded-2xl 
                hover:bg-white/10 transition
                relative
            ">

                {/* glow kecil */}
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-[#A87C2D]/20 blur-2xl rounded-full"></div>

                <p className="text-sm text-[#D3CDC3]/70 mb-4">
                    Manage your VelvetBlade services easily ✂️
                </p>

                <button className="
                    w-full bg-[#A87C2D] text-white font-semibold py-2 
                    rounded-xl hover:bg-[#641824] transition
                ">
                    + Add Service
                </button>
            </div>

        </div>
    );
}