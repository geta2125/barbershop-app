import {
    FaHome,
    FaClipboardList,
    FaUsers,
    FaCut,
    FaUserTie,
    FaHistory,
    FaCrown,
    FaCommentDots,
    FaCog
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function OwnerSidebar() {
    // MENU STYLE
    const menuClass = ({ isActive }) => `
        flex items-center gap-4
        px-5 py-3
        relative
        transition-all duration-300
        rounded-xl
        overflow-hidden
        group
        ${isActive
            ? `bg-gradient-to-r from-[#dfb34c]/15 to-[#dfb34c]/5 text-white shadow-[0_0_20px_rgba(223,179,76,0.04)]`
            : `text-[#8e8e9f] hover:bg-[#16161e] hover:text-white`
        }
    `;

    // MENU DATA (Disesuaikan dengan permintaan)
    const menus = [
        {
            key: "/owner/dashboard",
            label: "Dashboard",
            icon: <FaHome />
        },
        {
            key: "/owner/customers",
            label: "Customers",
            icon: <FaUsers />
        },
        {
            key: "/owner/membership",
            label: "Membership",
            icon: <FaCrown />
        },
        {
            key: "/owner/feedback",
            label: "Feedback",
            icon: <FaCommentDots />
        },
        {
            key: "/owner/booking",
            label: "Booking",
            icon: <FaClipboardList />
        },
        {
            key: "/owner/services",
            label: "Services",
            icon: <FaCut />
        },
        {
            key: "/owner/barbers",
            label: "Barbers",
            icon: <FaUserTie />
        },
        {
            key: "/owner/history",
            label: "History",
            icon: <FaHistory />
        },
        {
            key: "/owner/settings",
            label: "Settings",
            icon: <FaCog />
        }
    ];

    return (
        <aside className="fixed top-0 left-0 bottom-0 w-[280px] bg-[#111116] border-r border-[#1a1a24] flex flex-col z-50 select-none pb-6">
            {/* TOP AREA + MENUS */}
            <div className="flex-1 overflow-y-auto no-scrollbar pt-6">
                {/* LOGO */}
                <div className="px-6 mb-8 flex items-center gap-4">
                    {/* BOX LOGO */}
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-[#dfb34c]/20 to-[#dfb34c]/5 border border-[#242335] flex items-center justify-center shadow-lg">
                        <img
                            src="/img/logopfl_geta.png"
                            alt="GroomGold"
                            className="w-7 h-7 object-contain"
                        />
                    </div>

                    {/* TEXT */}
                    <div className="leading-tight">
                        <h1 className="text-xl font-black tracking-wide text-white">
                            Groom <span className="text-[#dfb34c]">Gold</span>
                        </h1>
                        <p className="text-[9px] tracking-[2px] uppercase text-gray-500 font-medium">
                            Barbershop
                        </p>
                    </div>
                </div>

                {/* NAVIGATION MENUS */}
                <div className="px-3">
                    <ul className="space-y-1">
                        {menus.map((item) => (
                            <li key={item.key}>
                                <NavLink to={item.key} className={menuClass}>
                                    {({ isActive }) => (
                                        <>
                                            {/* ACTIVE BAR */}
                                            {isActive && (
                                                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-[#dfb34c]" />
                                            )}

                                            {/* ICON */}
                                            <div className={`text-base transition-all duration-300 ${isActive ? "text-[#dfb34c]" : "text-[#8e8e9f] group-hover:text-white"
                                                }`}>
                                                {item.icon}
                                            </div>

                                            {/* LABEL */}
                                            <span className={`text-[13.5px] font-medium tracking-wide flex-1 ${isActive ? "text-white font-semibold" : "text-[#8e8e9f] group-hover:text-white"
                                                }`}>
                                                {item.label}
                                            </span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </aside>
    );
}
