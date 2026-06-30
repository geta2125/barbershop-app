import { FaClock, FaGem } from "react-icons/fa";

export default function ServiceCard({ name, price, duration, isAvailable }) {
    return (
        <div className="bg-[#0D0C0B] border border-white/5 rounded-2xl p-5 hover:border-[#A87C2D]/30 transition-all duration-300 flex flex-col justify-between min-h-[140px]">
            <div>
                <div className="flex justify-between items-start gap-2 mb-2">
                    <h4 className="text-white font-bold text-sm leading-snug truncate">{name}</h4>
                    <FaGem className="text-[#A87C2D]/40 text-xs flex-shrink-0 mt-0.5" />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-white/40 font-mono">
                    <FaClock className="text-[10px]" />
                    <span>{duration} Mins</span>
                </div>
            </div>
            
            <div className="flex items-baseline justify-between mt-4 pt-3 border-t border-white/[0.03]">
                <span className="text-base font-black text-[#A87C2D]">
                    Rp {Number(price).toLocaleString("id-ID")}
                </span>
                <span className={`text-[9px] uppercase font-bold tracking-wider ${isAvailable ? "text-emerald-400" : "text-white/20"}`}>
                    {isAvailable ? "Ready" : "Full"}
                </span>
            </div>
        </div>
    );
}