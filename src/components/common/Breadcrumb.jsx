import { Link } from "react-router-dom";
import { FaChevronRight, FaHome } from "react-icons/fa";

export default function Breadcrumb({ items = [] }) {
    return (
        <nav className="flex items-center gap-2 text-xs text-white/30 font-medium tracking-wide mb-2">
            <Link to="/" className="hover:text-[#A87C2D] transition-colors">
                <FaHome className="text-[11px]" />
            </Link>
            {items.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                    <FaChevronRight className="text-[8px] opacity-50" />
                    {index === items.length - 1 ? (
                        <span className="text-white/60 font-semibold">{item.label}</span>
                    ) : (
                        <Link to={item.path} className="hover:text-[#A87C2D] transition-colors">
                            {item.label}
                        </Link>
                    )}
                </div>
            ))}
        </nav>
    );
}