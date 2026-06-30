export default function BookingFilter({ activeFilter, onFilterChange }) {
    const statuses = ["All", "Pending", "Confirmed", "Completed", "Cancelled"];
    
    return (
        <div className="flex gap-1 bg-[#0D0C0B] border border-white/5 p-1 rounded-xl overflow-x-auto no-scrollbar">
            {statuses.map(status => (
                <button
                    key={status}
                    onClick={() => onFilterChange(status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                        activeFilter === status 
                            ? "bg-[#A87C2D] text-white font-semibold" 
                            : "text-white/40 hover:text-white"
                    }`}
                >
                    {status}
                </button>
            ))}
        </div>
    );
}