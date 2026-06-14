import React from "react";

export default function Container({
    children,
    className = "",
    variant = "default", // Pilihan: 'default', 'glass', 'plain'
    animate = true
}) {
    // 1. BASE STRUCTURE & RESPONSIVE PADDING
    const baseStyle = "w-full rounded-2xl p-5 md:p-6 lg:p-8 transition-all duration-300";

    // 2. VARIANT STYLES (Menyesuaikan dengan vibe Dashboard GroomGold)
    const variants = {
        // Varian default dengan border tipis dan shadow halus
        default: `
            bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)]
            dark:bg-[#16161e] dark:border-[#242335]/60 dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]
        `,
        // Varian Glassmorphism (Sangat cocok untuk dipadukan dengan background gradasi/blur)
        glass: `
            bg-white/70 border border-white/40 backdrop-blur-md shadow-sm
            dark:bg-[#16161e]/60 dark:border-[#242335]/40 dark:backdrop-blur-md dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]
        `,
        // Varian polos tanpa border/background (jika hanya butuh layouting spacing)
        plain: "bg-transparent"
    };

    // 3. MICRO-ANIMATION EFFECT (Efek pop-in halus saat halaman dimuat)
    const animationStyle = animate 
        ? "animate-in fade-in-50 duration-500 slide-in-from-bottom-3" 
        : "";

    return (
        <div 
            className={`
                ${baseStyle} 
                ${variants[variant] || variants.default} 
                ${animationStyle} 
                ${className}
            `}
        >
            {/* INNER CONTAINER (Opsional: Memastikan konten di dalam punya flow yang rapi) */}
            <div className="w-full h-full space-y-6">
                {children}
            </div>
        </div>
    );
}