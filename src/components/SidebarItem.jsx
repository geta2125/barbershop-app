import { NavLink } from "react-router-dom";

export default function SidebarItem({ item, menuClass }) {
    return (
        <li>
            <NavLink
                to={item.key}
                className={menuClass}
            >
                {({ isActive }) => (
                    <>
                        {isActive && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-[#dfb34c]" />
                        )}

                        <div
                            className={`text-base transition-all duration-300 ${
                                isActive
                                    ? "text-[#dfb34c]"
                                    : "text-[#8e8e9f] group-hover:text-white"
                            }`}
                        >
                            {item.icon}
                        </div>

                        <span
                            className={`text-[13px] flex-1 ${
                                isActive
                                    ? "text-white font-semibold"
                                    : "text-[#8e8e9f]"
                            }`}
                        >
                            {item.label}
                        </span>
                    </>
                )}
            </NavLink>
        </li>
    );
}