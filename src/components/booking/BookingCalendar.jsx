import { FaClock, FaCheckCircle, FaUser } from "react-icons/fa";

export default function BookingCalendar({ activeDate, slots = [], onSlotSelect }) {
    return (
        <div className="bg-[#0D0C0B] border border-white/5 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
                <h4 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                    <FaClock className="text-[#A87C2D]" /> Slot Waktu Hari Ini
                </h4>
                <span className="text-[10px] font-mono text-white/30">{activeDate}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {slots.map((slot, idx) => {
                    const isBooked = !!slot.Customer;
                    return (
                        <button
                            key={idx}
                            disabled={isBooked}
                            onClick={() => onSlotSelect?.(slot.Waktu)}
                            className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between min-h-[75px] ${
                                isBooked
                                    ? "bg-white/[0.02] border-white/5 text-white/20 cursor-not-allowed"
                                    : "bg-[#080807] border-white/8 text-[#D3CDC3] hover:border-[#A87C2D]/60 hover:bg-[#A87C2D]/5"
                            }`}
                        >
                            <span className={`text-xs font-mono font-bold ${isBooked ? "text-white/20" : "text-[#A87C2D]"}`}>
                                {slot.Waktu}
                            </span>
                            {isBooked ? (
                                <div className="flex items-center gap-1 mt-1 text-[10px] text-white/40 truncate">
                                    <FaUser className="text-[8px] flex-shrink-0" />
                                    <span className="truncate">{slot.Customer}</span>
                                </div>
                            ) : (
                                <span className="text-[9px] text-emerald-400 font-semibold uppercase tracking-wider mt-1 flex items-center gap-1">
                                    <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" /> Available
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}