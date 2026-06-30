import { FaCut, FaStar } from "react-icons/fa";

export default function BarberCard({ name, specialty, rating, status }) {
    return (
        <div className="bg-[#0D0C0B] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#A87C2D]/5 rounded-bl-full pointer-events-none group-hover:bg-[#A87C2D]/10 transition-colors" />
            
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#A87C2D]/20 to-[#A87C2D]/5 border border-[#A87C2D]/20 flex items-center justify-center text-[#A87C2D] text-sm mb-4">
                <FaCut />
            </div>

            <h3 className="text-white font-bold text-base truncate mb-0.5">{name}</h3>
            <p className="text-xs text-white/40 mb-4">{specialty}</p>

            <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <div className="flex items-center gap-1 text-xs text-amber-400 font-semibold">
                    <FaStar className="text-[10px]" />
                    <span>{rating}</span>
                </div>
                <span className={`inline-flex items-center gap-1 text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded ${
                    status === "Available" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                }`}>
                    {status}
                </span>
            </div>
        </div>
    );
}