import { FaCrown } from "react-icons/fa";

export default function MembershipCard({ name, tier = "Silver", points = 0, memberId }) {
    const tierColors = {
        "Platinum": "from-slate-700 to-slate-900 border-slate-500/30 text-slate-200",
        "Gold": "from-[#A87C2D] to-[#5C4314] border-[#A87C2D]/30 text-amber-200",
        "Silver": "from-zinc-800 to-zinc-950 border-white/10 text-zinc-300"
    };

    return (
        <div className={`bg-gradient-to-br ${tierColors[tier] || tierColors.Silver} border rounded-2xl p-6 relative overflow-hidden shadow-xl`}>
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />
            
            <div className="flex justify-between items-start mb-8">
                <div>
                    <span className="text-[9px] uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded-md font-bold">
                        GroomGold Club
                    </span>
                    <h3 className="text-xl font-bold text-white mt-2 tracking-wide truncate">{name}</h3>
                </div>
                <FaCrown className="text-xl opacity-60" />
            </div>

            <div className="flex justify-between items-end">
                <div>
                    <p className="text-[10px] uppercase tracking-wider text-white/40 font-mono">Member ID</p>
                    <p className="text-xs font-mono text-white/80">{memberId || "GG-XXXXX"}</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] uppercase tracking-wider text-white/40">Total Poin</p>
                    <p className="text-lg font-black text-white">{points} <span className="text-xs font-normal">PTS</span></p>
                </div>
            </div>
        </div>
    );
}