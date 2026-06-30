import { FaGem } from "react-icons/fa";

export default function MembershipTier() {
    const tiers = [
        { name: "Silver", discount: "5%", minPoints: "0 - 500 Pts", border: "border-white/5" },
        { name: "Gold", discount: "12%", minPoints: "501 - 1500 Pts", border: "border-[#A87C2D]/30 bg-[#A87C2D]/5" },
        { name: "Platinum", discount: "20%", minPoints: "1500+ Pts", border: "border-purple-500/20" },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {tiers.map(t => (
                <div key={t.name} className={`bg-[#0D0C0B] border ${t.border} rounded-xl p-4 flex flex-col justify-between`}>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <FaGem className="text-[#A87C2D] text-[10px]" />
                            <h4 className="text-sm font-bold text-white">{t.name}</h4>
                        </div>
                        <p className="text-[11px] text-white/30 font-mono">{t.minPoints}</p>
                    </div>
                    <p className="text-xl font-black text-[#A87C2D] mt-4">Disc. {t.discount}</p>
                </div>
            ))}
        </div>
    );
}