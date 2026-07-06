import {
    FaHome,
    FaClipboardList,
    FaHistory,
    FaCrown,
    FaCommentDots,
    FaUser,
    FaWhatsapp
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function MemberSidebar() {
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

    // MENU DATA (Khusus Akun Member/Customer)
    const menus = [
        {
            key: "/member/dashboard",
            label: "Dashboard",
            icon: <FaHome />
        },
        {
            key: "/member/booking",
            label: "Booking",
            icon: <FaClipboardList />
        },
        {
            key: "/member/history",
            label: "History",
            icon: <FaHistory />
        },
        {
            key: "/member/membership",
            label: "Membership",
            icon: <FaCrown />
        },
        {
            key: "/member/feedback",
            label: "Feedback",
            icon: <FaCommentDots />
        },
        {
            key: "/member/profile",
            label: "Profile",
            icon: <FaUser />
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
                            Member Panel
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

            {/* BOTTOM SECTION (WHATSAPP SUPPORT) */}
            <div className="px-4 pt-2">
                <div className="bg-gradient-to-br from-[#dfb34c]/12 to-[#dfb34c]/2 border border-[#242335] rounded-2xl p-4 relative overflow-hidden">
                    {/* DECORATIVE EFFECT */}
                    <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-[#dfb34c]/8 blur-sm" />

                    {/* CONTENT */}
                    <div className="relative z-10">
                        <div className="w-10 h-10 rounded-xl bg-[#dfb34c]/10 flex items-center justify-center mb-3">
                            <FaWhatsapp className="text-[#dfb34c] text-lg" />
                        </div>

                        <h3 className="text-sm font-bold text-white mb-0.5">
                            Butuh Bantuan?
                        </h3>

                        <p className="text-[11px] text-[#8e8e9f] leading-relaxed mb-4">
                            Hubungi CS kami untuk bantuan atau tanya jawab.
                        </p>

                        <a 
                            href="https://wa.me/6285979229792?text=Halo%20Groom%20Gold%2C%20saya%20member%20ingin%20bertanya..."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-[#dfb34c] text-[#111116] font-bold text-[11px] tracking-wider py-2.5 rounded-xl hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-1.5"
                        >
                            CHAT WHATSAPP
                        </a>
                    </div>
                </div>
            </div>
        </aside>
    );
}