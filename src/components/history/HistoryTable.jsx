export default function HistoryTable({ data }) {
    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-white/5 bg-white/[0.01]">
                        {["Invoice", "Tanggal", "Layanan", "Barber", "Total", "Status"].map((h, i) => (
                            <th key={i} className="px-5 py-3 text-[10px] uppercase tracking-widest text-white/40 font-semibold">{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map(h => (
                        <tr key={h.ID_Transaksi} className="border-b border-white/[0.04] hover:bg-white/[0.02] text-xs">
                            <td className="px-5 py-4 font-mono font-bold text-white">#{h.No_Invoice}</td>
                            <td className="px-5 py-4 text-white/60">{h.Tanggal}</td>
                            <td className="px-5 py-4 font-semibold text-white">{h.Nama_Service}</td>
                            <td className="px-5 py-4 text-white/70">{h.Nama_Barber}</td>
                            <td className="px-5 py-4 font-bold text-[#A87C2D]">Rp {Number(h.Total).toLocaleString("id-ID")}</td>
                            <td className="px-5 py-4">
                                <span className="px-2 py-0.5 text-[10px] rounded-full font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">Success</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}