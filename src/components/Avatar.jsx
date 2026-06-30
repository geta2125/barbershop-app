export default function Avatar({ name = "", size = "md", className = "" }) {
    const initials = name
        .split(" ")
        .slice(0, 2)
        .map(word => word[0]?.toUpperCase() ?? "")
        .join("");

    const gradients = [
        "from-zinc-700 to-zinc-900 border-zinc-600/30",
        "from-amber-700 to-amber-950 border-[#A87C2D]/30",
        "from-stone-700 to-stone-900 border-stone-600/30",
        "from-neutral-700 to-neutral-900 border-neutral-600/30"
    ];
    
    // Pilih gradasi berdasarkan karakter pertama nama agar konsisten
    const charCode = name.charCodeAt(0) || 0;
    const pickedGradient = gradients[charCode % gradients.length];

    const sizeClasses = {
        sm: "w-7 h-7 text-[10px] rounded-lg",
        md: "w-9 h-9 text-xs rounded-xl",
        lg: "w-14 h-14 text-lg rounded-2xl",
    };

    return (
        <div className={`flex-shrink-0 flex items-center justify-center bg-gradient-to-br ${pickedGradient} border text-[#D3CDC3] font-bold tracking-wider shadow-inner ${sizeClasses[size] || sizeClasses.md} ${className}`}>
            {initials || "?"}
        </div>
    );
}