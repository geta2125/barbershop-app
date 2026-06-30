export default function PointHistory({ history = [] }) {
    return (
        <div className="flex flex-col gap-2">
            {history.map((h, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-[#0D0C0B] border border-white/[0.03] rounded-xl text-xs">
                    <div>
                        <p className="text-white font-medium">{h.Aktivitas}</p>
                        <p className="text-[10px] text-white/30 mt-0.5">{h.Tanggal}</p>
                    </div>
                    <span className={`font-mono font-bold ${h.Poin > 0 ? "text-emerald-400" : "text-red-400"}`}>
                        {h.Poin > 0 ? `+${h.Poin}` : h.Poin} Pts
                    </span>
                </div>
            ))}
        </div>
    );
}