import { FaStar, FaTrashAlt } from "react-icons/fa";

export default function FeedbackTable({ data, onDelete }) {
    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-white/5 bg-white/[0.01]">
                        {["Pelanggan", "Ulasan Komentar", "Rating", "Tanggal", ""].map((h, i) => (
                            <th key={i} className="px-5 py-3 text-[10px] uppercase tracking-widest text-white/40 font-semibold">{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map(f => (
                        <tr key={f.ID_Feedback} className="border-b border-white/[0.04] hover:bg-white/[0.02] text-xs">
                            <td className="px-5 py-4 font-semibold text-white">{f.Nama_Customer}</td>
                            <td className="px-5 py-4 text-white/60 max-w-xs truncate">{f.Komentar || "-"}</td>
                            <td className="px-5 py-4">
                                <div className="flex items-center gap-0.5 text-amber-400 font-bold">
                                    <FaStar className="text-[10px]" />
                                    <span>{f.Rating}.0</span>
                                </div>
                            </td>
                            <td className="px-5 py-4 text-white/30 font-mono">{f.Tanggal}</td>
                            <td className="px-5 py-4 text-right">
                                <button onClick={() => onDelete?.(f.ID_Feedback)} className="p-2 text-white/30 hover:text-red-400 hover:bg-red-500/5 rounded-lg transition-all">
                                    <FaTrashAlt className="text-[11px]" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}