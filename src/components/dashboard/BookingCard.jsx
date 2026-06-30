import { FaCalendarCheck } from "react-icons/fa";

export default function BookingCard({ count, active }) {
    return (
        <div className="bg-[#0D0C0B] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors">
            <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">Bookings Today</p>
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400 text-xs">
                    <FaCalendarCheck />
                </div>
            </div>
            <p className="text-3xl font-black text-white">{count}</p>
            <p className="text-[10px] text-white/30 mt-1.5"><span className="text-sky-400 font-medium">{active} slot</span> sedang berjalan</p>
        </div>
    );
}