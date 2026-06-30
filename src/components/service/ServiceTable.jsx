import { FaEdit, FaTrashAlt } from "react-icons/fa";

export default function ServiceTable({ data, onEdit, onDelete }) {
    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-white/5 bg-white/[0.01]">
                        {["Nama Layanan", "Durasi", "Harga", "Status", ""].map((h, i) => (
                            <th key={i} className="px-5 py-3 text-[10px] uppercase tracking-widest text-white/40 font-semibold">{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map(s => (
                        <tr key={s.ID_Service} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors duration-150">
                            <td className="px-5 py-4">
                                <span className="text-white text-sm font-semibold">{s.Nama_Service}</span>
                            </td>
                            <td className="px-5 py-4 text-xs text-white/50 font-mono">{s.Durasi} Menit</td>
                            <td className="px-5 py-4 text-sm font-bold text-[#A87C2D]">
                                Rp {Number(s.Harga).toLocaleString("id-ID")}
                            </td>
                            <td className="px-5 py-4">
                                <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full border ${
                                    s.Tersedia
                                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                                        : "bg-red-500/10 border-red-500/20 text-red-400"
                                }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${s.Tersedia ? "bg-emerald-400" : "bg-red-400"}`} />
                                    {s.Tersedia ? "Tersedia" : "Kosong"}
                                </span>
                            </td>
                            <td className="px-5 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <button onClick={() => onEdit?.(s)} className="p-2 rounded-lg border border-white/5 text-white/40 hover:text-[#A87C2D] hover:bg-white/5 transition-all text-xs">
                                        <FaEdit />
                                    </button>
                                    <button onClick={() => onDelete?.(s.ID_Service)} className="p-2 rounded-lg border border-white/5 text-white/40 hover:text-red-400 hover:bg-red-500/5 transition-all text-xs">
                                        <FaTrashAlt />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}