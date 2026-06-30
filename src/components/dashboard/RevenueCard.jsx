import { FaWallet, FaTrendingUp } from "react-icons/fa";

export default function RevenueCard({ amount, percentage = "+12%" }) {
    return (
        <div className="bg-gradient-to-br from-[#12110F] to-[#0D0C0B] border border-[#A87C2D]/20 rounded-2xl p-5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#A87C2D]/5 rounded-bl-full pointer-events-none" />
            <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">Total Revenue</p>
                <div className="w-8 h-8 rounded-lg bg-[#A87C2D]/10 flex items-center justify-center text-[#A87C2D] text-xs">
                    <FaWallet />
                </div>
            </div>
            <p className="text-2xl font-black text-white tracking-tight">
                Rp {Number(amount).toLocaleString("id-ID")}
            </p>
            <div className="flex items-center gap-1 mt-2 text-[10px] text-emerald-400 font-semibold">
                <FaTrendingUp />
                <span>{percentage} dibanding bulan lalu</span>
            </div>
        </div>
    );
}