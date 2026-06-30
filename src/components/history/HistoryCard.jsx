import { FaCheckCircle, FaHashtag } from "react-icons/fa";

export default function HistoryCard({ code, date, service, total, barber }) {
    return (
        <div className="bg-[#0D0C0B] border border-white/5 rounded-2xl p-4 hover:border-white/10 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-sm flex-shrink-0">
                    <FaCheckCircle />
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{service}</span>
                        <span className="text-[10px] font-mono text-white/30 flex items-center gap-0.5"><FaHashtag className="text-[8px]"/>{code}</span>
                    </div>
                    <p className="text-xs text-white/40 mt-0.5">Stylist: <span className="text-white/70 font-medium">{barber}</span> • {date}</p>
                </div>
            </div>
            <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-white/5">
                <p className="text-[10px] uppercase tracking-wider text-white/30">Total Paid</p>
                <p className="text-sm font-black text-[#A87C2D]">Rp {Number(total).toLocaleString("id-ID")}</p>
            </div>
        </div>
    );
}