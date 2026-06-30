import { FaCut, FaStar } from "react-icons/fa";

export default function BarberTable({ data }) {
    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-white/5 bg-white/[0.01]">
                        {["Barber / Stylist", "Spesialisasi", "Rating", "Status", ""].map((h, i) => (
                            <th key={i} className="px-5 py-3 text-[10px] uppercase tracking-widest text-white/40 font-semibold">{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map(b => (
                        <tr key={b.ID_Barber} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors duration-150 group">
                            <td className="px-5 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-[#A87C2D]/10 border border-[#A87C2D]/20 flex items-center justify-center text-[#A87C2D] text-xs font-bold flex-shrink-0">
                                        <FaCut />
                                    </div>
                                    <div>
                                        <p className="text-white text-sm font-semibold">{b.Nama_Barber}</p>
                                        <p className="text-white/25 text-[10px] font-mono">#{b.ID_Barber}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-5 py-4 text-xs text-white/70 font-medium">{b.Spesialisasi || "All-Around"}</td>
                            <td className="px-5 py-4">
                                <div className="flex items-center gap-1 text-xs text-amber-400 font-semibold">
                                    <FaStar className="text-[10px]" />
                                    <span>{b.Rating || "5.0"}</span>
                                </div>
                            </td>
                            <td className="px-5 py-4">
                                <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full border ${
                                    b.Status === "Available"
                                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                                        : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                                }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${b.Status === "Available" ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`} />
                                    {b.Status}
                                </span>
                            </td>
                            <td className="px-5 py-4 text-right">
                                <button className="px-3 py-1.5 rounded-lg border border-white/8 text-white/40 hover:text-white hover:bg-white/5 text-xs font-medium transition-all duration-200">
                                    Atur Jadwal
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}