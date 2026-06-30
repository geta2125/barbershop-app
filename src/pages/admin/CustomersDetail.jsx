import { useParams, Link } from "react-router-dom";
import {
    FaArrowLeft, FaEnvelope, FaPhoneAlt,
    FaMapMarkerAlt, FaCalendarCheck, FaCrown,
    FaExchangeAlt, FaWallet, FaGem, FaStar
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

import dataCustomers from "../../data/datacustomers.json";
import Container from "../../components/Container";
import Footer    from "../../components/Footer";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getInitials(name = "") {
    return name.split(" ").slice(0, 2).map(w => w[0]?.toUpperCase() ?? "").join("");
}

const GRADIENTS = [
    ["#7C3AED", "#4C1D95"],
    ["#0EA5E9", "#1E3A8A"],
    ["#10B981", "#065F46"],
    ["#F43F5E", "#881337"],
    ["#F59E0B", "#92400E"],
];
function pickGradient(name = "") {
    return GRADIENTS[(name.charCodeAt(0) || 0) % GRADIENTS.length];
}

const LEVEL_CONFIG = {
    Silver:   { icon: FaStar,   color: "#94A3B8", bg: "rgba(148,163,184,0.08)", border: "rgba(148,163,184,0.2)",  glow: "rgba(148,163,184,0.06)", label: "Silver Member" },
    Gold:     { icon: FaCrown,  color: "#A87C2D", bg: "rgba(168,124,45,0.10)",  border: "rgba(168,124,45,0.25)",  glow: "rgba(168,124,45,0.08)",  label: "Gold Member"   },
    Platinum: { icon: FaGem,    color: "#818CF8", bg: "rgba(129,140,248,0.10)", border: "rgba(129,140,248,0.25)", glow: "rgba(129,140,248,0.08)", label: "Platinum Member"},
};

function formatDate(dateStr) {
    if (!dateStr) return "–";
    return new Date(dateStr).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function BigAvatar({ name }) {
    const [from, to] = pickGradient(name);
    return (
        <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-2xl font-black select-none shadow-2xl flex-shrink-0"
            style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
        >
            {getInitials(name) || "?"}
        </div>
    );
}

function ContactRow({ icon: Icon, children }) {
    return (
        <div className="flex items-center gap-3 py-3 border-b border-white/[0.04] last:border-0">
            <div className="w-7 h-7 rounded-lg bg-white/[0.04] flex items-center justify-center flex-shrink-0">
                <Icon className="text-[#A87C2D]/60 text-xs" />
            </div>
            <span className="text-sm text-[#D3CDC3]/60 truncate">{children}</span>
        </div>
    );
}

function MetricCard({ icon: Icon, iconColor, iconBg, label, value }) {
    return (
        <div className="bg-[#0D0C0B] border border-white/[0.05] rounded-2xl p-5 flex items-center gap-4 hover:border-white/10 transition-all duration-300 group">
            <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
                style={{ background: iconBg, border: `1px solid ${iconColor}25` }}
            >
                <Icon className="text-lg" style={{ color: iconColor }} />
            </div>
            <div className="min-w-0">
                <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-white/25 mb-0.5">{label}</p>
                <p className="text-xl font-black text-white leading-tight truncate">{value}</p>
            </div>
        </div>
    );
}

function NotFound() {
    return (
        <div className="w-full min-h-screen bg-[#080807] flex flex-col items-center justify-center gap-4">
            <p className="text-white/30 text-sm">Customer tidak ditemukan.</p>
            <Link to="/customers"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#A87C2D] hover:underline">
                <FaArrowLeft className="text-[10px]" /> Kembali ke Customers
            </Link>
        </div>
    );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function CustomersDetail() {
    const { id } = useParams();

    const customers = dataCustomers.find(
        c => String(c.ID_Customer) === String(id)
    );

    if (!customers) return <NotFound />;

    const lvl      = LEVEL_CONFIG[customers.Level_Membership] || LEVEL_CONFIG.Silver;
    const LvlIcon  = lvl.icon;
    const isActive = customers.Status_Aktif === "Aktif";
    const isMember = customers.Status_Member === "Member";

    return (
        <div className="w-full min-h-screen bg-[#080807] text-[#D3CDC3] font-sans antialiased">
            <Container>

                {/* ── BACK ──────────────────────────────────────────────── */}
                <div className="pt-8 mb-6">
                    <Link to="/customers"
                        className="inline-flex items-center gap-2 text-xs font-semibold text-white/30 hover:text-[#A87C2D] transition-colors duration-200 bg-white/[0.03] border border-white/[0.06] px-4 py-2 rounded-xl">
                        <FaArrowLeft className="text-[9px]" /> Kembali ke Customers
                    </Link>
                </div>

                {/* ── HERO STRIP ────────────────────────────────────────── */}
                <div className="relative mb-8 bg-[#0D0C0B] border border-white/[0.05] rounded-2xl p-6 overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none"
                         style={{ background: `radial-gradient(ellipse at 10% 50%, ${lvl.glow}, transparent 60%)` }} />

                    <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5">
                        <BigAvatar name={customers.Nama_Lengkap} />

                        <div className="flex-1 min-w-0">
                            <p className="text-[9px] uppercase tracking-[0.2em] text-[#A87C2D]/50 font-bold mb-1">GroomGold Customer</p>

                            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight truncate">
                                {customers.Nama_Lengkap}
                            </h1>

                            <p className="text-xs font-mono text-white/20 mt-1">
                                #{String(customers.ID_Customer).slice(-8)}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-3">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border
                                    ${isActive
                                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                                        : "bg-red-500/10 border-red-500/20 text-red-400"}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-emerald-400 animate-pulse" : "bg-red-400"}`} />
                                    {isActive ? "Aktif" : "Nonaktif"}
                                </span>

                                {isMember && (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#A87C2D]/10 border border-[#A87C2D]/25 text-[#A87C2D]">
                                        <HiSparkles className="text-[9px]" /> Member
                                    </span>
                                )}

                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border"
                                      style={{ color: lvl.color, background: lvl.bg, borderColor: lvl.border }}>
                                    <LvlIcon className="text-[9px]" /> {lvl.label}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── MAIN GRID ─────────────────────────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

                    {/* LEFT — Contact card */}
                    <div className="bg-[#0D0C0B] border border-white/[0.05] rounded-2xl p-6">
                        <p className="text-[9px] uppercase tracking-[0.2em] text-white/20 font-bold mb-4">Informasi Kontak</p>

                        <ContactRow icon={FaEnvelope}>
                            {customers.Email || "–"}
                        </ContactRow>
                        <ContactRow icon={FaPhoneAlt}>
                            {customers.No_HP ? `+${customers.No_HP}` : "–"}
                        </ContactRow>
                        <ContactRow icon={FaMapMarkerAlt}>
                            {customers.Kota || "Pekanbaru"}
                        </ContactRow>
                        <ContactRow icon={FaCalendarCheck}>
                            Terdaftar {formatDate(customers.Tanggal_Daftar)}
                        </ContactRow>
                    </div>

                    {/* RIGHT — Metrics + Membership overview */}
                    <div className="lg:col-span-2 flex flex-col gap-4">

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <MetricCard
                                icon={LvlIcon}
                                iconColor={lvl.color}
                                iconBg={lvl.bg}
                                label="Level"
                                value={customers.Level_Membership || "–"}
                            />
                            <MetricCard
                                icon={FaExchangeAlt}
                                iconColor="#34D399"
                                iconBg="rgba(52,211,153,0.08)"
                                label="Total Transaksi"
                                value={`${customers.Total_Transaksi || 0}×`}
                            />
                            <MetricCard
                                icon={FaWallet}
                                iconColor="#60A5FA"
                                iconBg="rgba(96,165,250,0.08)"
                                label="Total Pengeluaran"
                                value={`Rp ${(customers.Total_Pengeluaran || 0).toLocaleString("id-ID")}`}
                            />
                        </div>

                        <div className="flex-1 bg-[#0D0C0B] border border-white/[0.05] rounded-2xl p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
                                 style={{ background: `radial-gradient(circle at 100% 0%, ${lvl.glow}, transparent 70%)` }} />

                            <p className="text-[9px] uppercase tracking-[0.2em] text-white/20 font-bold mb-4">Membership Overview</p>

                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                     style={{ background: lvl.bg, border: `1px solid ${lvl.border}` }}>
                                    <LvlIcon style={{ color: lvl.color }} />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">{lvl.label}</p>
                                    <p className="text-white/25 text-[10px]">{isMember ? "Loyalitas Aktif" : "Belum Aktifkan Loyalitas"}</p>
                                </div>
                            </div>

                            <div className="w-full h-px bg-gradient-to-r from-[#A87C2D]/30 via-[#A87C2D]/10 to-transparent mb-4" />

                            <p className="text-sm text-white/40 leading-relaxed">
                                {isMember
                                    ? <>Customer terdaftar sebagai <span className="font-semibold" style={{ color: lvl.color }}>{lvl.label}</span>. Berhak mendapat potongan harga eksklusif, prioritas booking, dan poin loyalty pada setiap kunjungan GroomGold.</>
                                    : "Customer belum mengaktifkan langganan loyalitas premium. Sarankan upgrade untuk akses benefit eksklusif."}
                            </p>

                            <div className="mt-5 pt-4 border-t border-white/[0.04]">
                                <p className="text-[9px] uppercase tracking-[0.2em] text-white/15 font-bold mb-2">Catatan Internal</p>
                                <p className="text-xs text-white/25 italic">
                                    Semua transaksi tercatat otomatis via POS terminal Pekanbaru.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </Container>
        </div>
    );
}