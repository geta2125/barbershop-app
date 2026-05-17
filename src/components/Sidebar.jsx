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

    // MENU STYLE
    const menuClass = ({ isActive }) => `
        flex items-center gap-4
        px-6 py-3.5
        relative
        transition-all duration-300
        rounded-r-2xl
        overflow-hidden
        group

        ${isActive
            ? `
                bg-[#1b1b24]
                text-white
                shadow-[0_0_25px_rgba(223,179,76,0.06)]
            `
            : `
                text-[#8e8e9f]
                hover:bg-[#16161e]
                hover:text-white
            `
        }
    `;

    // MENU
    const menus = [
        {
            key: "/",
            label: "Dashboard",
            icon: <FaHome />
        },
        {
            key: "/services",
            label: "Services",
            icon: <FaCut />
        },
        {
            key: "/booking",
            label: "Booking",
            icon: <FaClipboardList />
        },
        {
            key: "/customers",
            label: "Customers",
            icon: <FaUsers />
        },
        {
            key: "/barber",
            label: "Barbers",
            icon: <FaUserTie />
        },
        {
            key: "/history",
            label: "History",
            icon: <FaHistory />
        },
    ];

    return (

        <aside className="
            fixed top-0 left-0 bottom-0
            w-[260px]
            bg-[#111116]
            border-r border-[#1a1a24]
            flex flex-col justify-between
            py-6
            z-50
            select-none
        ">

            {/* TOP */}
            <div>

                {/* LOGO */}
                <div className="px-6 mb-10 flex items-center gap-3">

                    {/* BOX LOGO */}
                    <div className="
                        w-12 h-12
                        rounded-2xl
                        bg-[#1b1b24]
                        border border-[#242335]
                        flex items-center justify-center
                        shadow-lg
                    ">

                        <img
                            src="/img/logopfl_geta.png"
                            alt="GroomGold"
                            className="
                                w-8 h-8
                                object-contain
                            "
                        />

                    </div>

                    {/* TEXT */}
                    <div className="leading-tight">

                        <h1 className="
                            text-2xl
                            font-black
                            tracking-wide
                            text-white
                        ">
                            Groom
                            <span className="text-[#dfb34c]">
                                Gold
                            </span>
                        </h1>

                        <p className="
                            text-[10px]
                            tracking-[3px]
                            uppercase
                            text-gray-500
                        ">
                            Barbershop
                        </p>

                    </div>

                </div>

                {/* MENU */}
                <ul className="space-y-2 px-3">

                    {menus.map((item) => (

                        <li key={item.key}>

                            <NavLink
                                to={item.key}
                                className={menuClass}
                            >

                                {({ isActive }) => (

                                    <>

                                        {/* ACTIVE BAR */}
                                        {isActive && (

                                            <div className="
                                                absolute left-0 top-2 bottom-2
                                                w-1
                                                rounded-full
                                                bg-[#dfb34c]
                                            " />

                                        )}

                                        {/* ICON */}
                                        <div className={`
                                            text-lg
                                            transition-all duration-300

                                            ${isActive
                                                ? "text-[#dfb34c]"
                                                : "text-[#8e8e9f] group-hover:text-white"
                                            }
                                        `}>

                                            {item.icon}

                                        </div>

                                        {/* TEXT */}
                                        <span className={`
                                            text-sm
                                            font-medium
                                            tracking-wide

                                            ${isActive
                                                ? "text-white"
                                                : "text-[#8e8e9f] group-hover:text-white"
                                            }
                                        `}>

                                            {item.label}

                                        </span>

                                    </>

                                )}

                            </NavLink>

                        </li>

                    ))}

                </ul>

            </div>

            {/* BOTTOM */}
            <div className="px-4">

                <div className="
                    bg-[#1b1b24]
                    border border-[#242335]
                    rounded-3xl
                    p-5
                    relative
                    overflow-hidden
                ">

                    {/* EFFECT */}
                    <div className="
                        absolute -top-10 -right-10
                        w-24 h-24
                        rounded-full
                        bg-[#dfb34c]/10
                    " />

                    {/* CONTENT */}
                    <div className="relative z-10">

                        <div className="
                            w-12 h-12
                            rounded-2xl
                            bg-[#dfb34c]/10
                            flex items-center justify-center
                            mb-4
                        ">

                            <FaUsers className="
                                text-[#dfb34c]
                                text-lg
                            " />

                        </div>

                        <h3 className="
                            text-lg
                            font-bold
                            text-white
                            mb-1
                        ">
                            Need Help?
                        </h3>

                        <p className="
                            text-xs
                            text-[#8e8e9f]
                            leading-relaxed
                            mb-5
                        ">
                            Contact our support team
                            for barber management help.
                        </p>

                        <button className="
                            w-full
                            bg-[#dfb34c]
                            text-[#111116]
                            font-black
                            text-xs
                            tracking-wider
                            py-3
                            rounded-2xl
                            hover:opacity-90
                            transition-all duration-300
                        ">

                            GET SUPPORT

                        </button>

                    </div>

                </div>

            </div>

        </aside>

    );

}