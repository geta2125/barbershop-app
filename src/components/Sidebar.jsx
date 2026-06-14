import {
    FaHome,
    FaClipboardList,
    FaUsers,
    FaCut,
    FaUserTie,
    FaHistory,
    FaCrown,
    FaCommentDots,
    FaCog,
    FaUsersCog,
    FaGift
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
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

    // MENU DATA
    const menuGroups = [
        {
            title: "UTAMA",
            menus: [
                {
                    key: "/dashboard",
                    label: "Dashboard",
                    icon: <FaHome />
                }
            ]
        },

        {
            title: "CRM",
            menus: [
                {
                    key: "/customers",
                    label: "Customers",
                    icon: <FaUsers />
                },
                {
                    key: "/membership",
                    label: "Membership",
                    icon: <FaCrown />
                },
                {
                    key: "/feedback",
                    label: "Feedback",
                    icon: <FaCommentDots />
                }
            ]
        },

        {
            title: "BOOKING & LAYANAN",
            menus: [
                {
                    key: "/booking",
                    label: "Booking",
                    icon: <FaClipboardList />
                },
                {
                    key: "/services",
                    label: "Services",
                    icon: <FaCut />
                },
                {
                    key: "/barber",
                    label: "Barbers",
                    icon: <FaUserTie />
                }
            ]
        },

        {
            title: "LAPORAN",
            menus: [
                {
                    key: "/history",
                    label: "History",
                    icon: <FaHistory />
                }
            ]
        },

        {
            title: "SISTEM DAN AUNTENTIKASI",
            menus: [
                {
                    key: "/users",
                    label: "Manage Users",
                    icon: <FaUsersCog />
                },
                {
                    key: "/settings",
                    label: "Settings",
                    icon: <FaCog />
                }
            ]
        }
    ];

    return (
        <aside className="fixed top-0 left-0 bottom-0 w-[280px] bg-[#111116] border-r border-[#1a1a24] flex flex-col z-50 select-none pb-4">
            {/* TOP AREA + MENUS (Ditambahkan scroll jika layar pendek agar card support tidak terpotong) */}
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
                <div className="px-3 space-y-4">
                    {menuGroups.map((group) => (
                        <div key={group.title}>
                            {/* GROUP TITLE */}
                            <h4 className="px-4 mb-2 text-[10px] uppercase tracking-[3px] text-[#555566] font-bold">
                                {group.title}
                            </h4>

                            {/* ITEMS LIST */}
                            <ul className="space-y-1">
                                {group.menus.map((item) => (
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

                                                    {/* BADGE */}
                                                    {item.badge && (
                                                        <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-[#dfb34c]/15 text-[#dfb34c] border border-[#dfb34c]/20 tracking-wide">
                                                            {item.badge}
                                                        </span>
                                                    )}
                                                </>
                                            )}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* BOTTOM SECTION (SUPPORT CARD) */}
            <div className="px-4 pt-2">
                <div className="bg-gradient-to-br from-[#dfb34c]/12 to-[#dfb34c]/2 border border-[#242335] rounded-2xl p-4 relative overflow-hidden">
                    {/* DECORATIVE EFFECT */}
                    <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-[#dfb34c]/8 blur-sm" />

                    {/* CONTENT */}
                    <div className="relative z-10">
                        <div className="w-10 h-10 rounded-xl bg-[#dfb34c]/10 flex items-center justify-center mb-3">
                            <FaUsers className="text-[#dfb34c] text-base" />
                        </div>

                        <h3 className="text-sm font-bold text-white mb-0.5">
                            Need Help?
                        </h3>

                        <p className="text-[11px] text-[#8e8e9f] leading-relaxed mb-4">
                            Contact support team for help.
                        </p>

                        <button className="w-full bg-[#dfb34c] text-[#111116] font-bold text-[11px] tracking-wider py-2.5 rounded-xl hover:opacity-90 transition-all duration-300">
                            CONTACT SUPPORT
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    );
}