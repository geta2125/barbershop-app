import React from "react";

const IconPencil = () => (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
    </svg>
);

const IconTrash = () => (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
);

// Role → warna badge
const roleStyle = {
    Admin:    "bg-violet-500/10 border-violet-500/20 text-violet-400",
    Staff:    "bg-sky-500/10    border-sky-500/20    text-sky-400",
    Customer: "bg-amber-500/10  border-amber-500/20  text-amber-400",
};

// Avatar inisial dari nama
function getInitials(nama = "") {
    return nama
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase() ?? "")
        .join("");
}

// Warna avatar berdasarkan karakter pertama
const avatarColors = [
    "from-violet-600 to-purple-800",
    "from-sky-600 to-blue-800",
    "from-emerald-600 to-teal-800",
    "from-rose-600 to-pink-800",
    "from-amber-500 to-orange-700",
];
function pickColor(nama = "") {
    const code = (nama.charCodeAt(0) || 0) % avatarColors.length;
    return avatarColors[code];
}

export default function UserCard({ user, onEdit, onDelete }) {
    const isAktif = user?.status?.toLowerCase() === "aktif";
    const initials = getInitials(user?.nama);
    const avatarGradient = pickColor(user?.nama);
    const roleClass = roleStyle[user?.role] ?? roleStyle.Staff;

    return (
        <div className="relative bg-[#0D0C0B] border border-white/6 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#A87C2D]/35 hover:shadow-[0_8px_32px_rgba(168,124,45,0.08)] group">

            {/* ── TOP STRIP dengan avatar + status ── */}
            <div className="flex items-center gap-4 px-5 pt-5 pb-4">

                {/* Avatar inisial */}
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${avatarGradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <span className="text-white text-sm font-bold tracking-wide">
                        {initials || "?"}
                    </span>
                </div>

                {/* Nama + email */}
                <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-semibold truncate leading-tight">
                        {user?.nama || "Tanpa Nama"}
                    </p>
                    <p className="text-white/35 text-[11px] truncate mt-0.5">
                        {user?.email || "-"}
                    </p>
                </div>

                {/* Status dot + label */}
                <div className={`flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full border ${
                    isAktif
                        ? "bg-emerald-500/8 border-emerald-500/20 text-emerald-400"
                        : "bg-red-500/8 border-red-500/20 text-red-400"
                }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isAktif ? "bg-emerald-400 animate-pulse" : "bg-red-400"}`} />
                    {user?.status || "Nonaktif"}
                </div>
            </div>

            {/* ── DIVIDER ── */}
            <div className="mx-5 h-[1px] bg-white/5" />

            {/* ── METADATA ROW ── */}
            <div className="px-5 py-3 flex items-center justify-between">
                <span className={`text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-lg border ${roleClass}`}>
                    {user?.role || "Staff"}
                </span>

                {/* ID user kecil */}
                {user?.id && (
                    <span className="text-[10px] text-white/15 font-mono">
                        #{String(user.id).padStart(4, "0")}
                    </span>
                )}
            </div>

            {/* ── ACTION BUTTONS ── */}
            <div className="flex border-t border-white/5">
                <button
                    onClick={onEdit}
                    type="button"
                    className="flex-1 flex items-center justify-center gap-1.5 py-3 text-white/40 hover:text-sky-400 hover:bg-sky-500/5 text-xs font-medium transition-all duration-200 border-r border-white/5"
                >
                    <IconPencil />
                    Edit
                </button>
                <button
                    onClick={onDelete}
                    type="button"
                    className="flex-1 flex items-center justify-center gap-1.5 py-3 text-white/40 hover:text-red-400 hover:bg-red-500/5 text-xs font-medium transition-all duration-200"
                >
                    <IconTrash />
                    Hapus
                </button>
            </div>
        </div>
    );
}
