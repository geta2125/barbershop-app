import { FaCalendarAlt } from "react-icons/fa";

export default function PageTitle({ title, subtitle, breadcrumb = [] }) {
    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
                <div className="flex items-center gap-2 text-xs text-white/30 mb-1 font-medium tracking-wide">
                    {breadcrumb.map((b, idx) => (
                        <span key={idx} className="flex items-center gap-2">
                            <span>{b}</span>
                            {idx < breadcrumb.length - 1 && <span>/</span>}
                        </span>
                    ))}
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-white">{title}</h1>
            </div>
            {subtitle && (
                <div className="flex items-center gap-2 bg-[#0D0C0B] border border-white/6 px-4 py-2 rounded-xl text-xs text-white/40 self-start md:self-auto">
                    <FaCalendarAlt className="text-[#A87C2D]" />
                    <span>{subtitle}</span>
                </div>
            )}
        </div>
    );
}