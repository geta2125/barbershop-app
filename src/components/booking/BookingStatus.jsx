export default function BookingStatus({ status }) {
    const config = {
        "Pending": "bg-amber-500/10 border-amber-500/20 text-amber-400",
        "Confirmed": "bg-sky-500/10 border-sky-500/20 text-sky-400",
        "Completed": "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
        "Cancelled": "bg-red-500/10 border-red-500/20 text-red-400"
    };

    return (
        <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wide px-2.5 py-1 rounded-full border ${config[status] || "bg-white/5 text-white/40"}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${status === "Confirmed" ? "animate-pulse" : ""} ${
                status === "Completed" ? "bg-emerald-400" : status === "Pending" ? "bg-amber-400" : status === "Confirmed" ? "bg-sky-400" : "bg-red-400"
            }`} />
            {status}
        </span>
    );
}