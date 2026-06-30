import { FaUsers } from "react-icons/fa";

export default function CustomerCard({ total, premium }) {
    return (
        <div className="bg-[#0D0C0B] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors">
            <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">Total Customers</p>
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 text-xs">
                    <FaUsers />
                </div>
            </div>
            <p className="text-3xl font-black text-white">{total}</p>
            <p className="text-[10px] text-white/30 mt-1.5"><span className="text-purple-400 font-medium">{premium} Gold & Platinum</span> members</p>
        </div>
    );
}