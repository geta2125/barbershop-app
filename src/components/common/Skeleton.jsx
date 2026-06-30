export default function Skeleton({ className }) {
    return (
        <div className={`animate-pulse bg-white/[0.04] rounded-xl ${className}`} />
    );
}

// Helper bundle untuk mempercepat pembuatan baris skeleton tabel
Skeleton.Row = function SkeletonRow({ cols = 5 }) {
    return (
        <div className="flex items-center gap-4 py-4 px-5 border-b border-white/5">
            {[...Array(cols)].map((_, i) => (
                <Skeleton key={i} className={`h-4 ${i === 0 ? "w-1/4" : "flex-1"}`} />
            ))}
        </div>
    );
};