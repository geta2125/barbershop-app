import {
    FaSearch, FaPlus, FaCalendarAlt, FaUserCircle,
    FaClock, FaEye, FaTimes, FaCut
} from "react-icons/fa";
import {
    Pagination, PaginationContent, PaginationItem,
    PaginationLink, PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { dataAPI } from "../../services/dataAPI";

import Container  from "../../components/Container";
import PageHeader from "../../components/PageHeader";
import InputField from "../../components/InputField";
import Modal      from "../../components/Modal";
import Badge      from "../../components/Badge";
import Avatar     from "../../components/Avatar";
import EmptyState from "../../components/EmptyState";
import Table      from "../../components/Table";

// ── Helpers ────────────────────────────────────────────────────────────────

function getInitials(name = "") {
    return name.split(" ").slice(0, 2).map(w => w[0]?.toUpperCase() ?? "").join("");
}

const avatarGradients = [
    "from-violet-600 to-purple-900",
    "from-sky-600 to-blue-900",
    "from-emerald-600 to-teal-900",
    "from-rose-600 to-pink-900",
    "from-amber-500 to-orange-800",
];
function pickGradient(name = "") {
    return avatarGradients[(name.charCodeAt(0) || 0) % avatarGradients.length];
}

const statusCfg = {
    Completed: { dot: "bg-emerald-400", pill: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" },
    Pending:   { dot: "bg-amber-400 animate-pulse", pill: "bg-amber-500/10 border-amber-500/20 text-amber-400" },
    Canceled:  { dot: "bg-red-400",   pill: "bg-red-500/10 border-red-500/20 text-red-400" },
};

function StatusPill({ status }) {
    const cfg = statusCfg[status] ?? statusCfg.Pending;
    return (
        <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full border ${cfg.pill}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
            {status}
        </span>
    );
}

function formatDate(raw = "") {
    try {
        const d = new Date(raw);
        return {
            date: d.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }),
            time: d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
        };
    } catch { return { date: raw, time: "" }; }
}

const getNow = () => {
    const now = new Date();
    return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
};

// ── Field wrapper (konsisten dengan Users.jsx) ────────────────────────────
const inputCls   = "w-full bg-[#0D0C0B] border border-white/8 text-[#D3CDC3] placeholder-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#A87C2D]/60 focus:ring-1 focus:ring-[#A87C2D]/30 transition-all duration-200";
const selectCls  = "w-full bg-[#0D0C0B] border border-white/8 text-[#D3CDC3] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#A87C2D]/60 focus:ring-1 focus:ring-[#A87C2D]/30 transition-all duration-200 appearance-none cursor-pointer";

function Field({ label, children }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-[0.2em] uppercase text-[#A87C2D]/70 font-semibold">{label}</label>
            {children}
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function Booking() {
    const [search,       setSearch]       = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [bookings,     setBookings]     = useState([]);
    const [services,     setServices]     = useState([]);
    const [barbers,      setBarbers]      = useState([]);
    const [showForm,     setShowForm]     = useState(false);
    const [currentPage,  setCurrentPage]  = useState(1);
    const [loading,      setLoading]      = useState(true);
    const [error,        setError]        = useState("");
    const itemsPerPage = 8;

    const [form, setForm] = useState({
        nama_customer: "", barber_id: "", service_id: "",
        jadwal: getNow(), harga: "", status_booking: "Pending",
    });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const loadBookingData = async () => {
        try {
            setLoading(true);
            setError("");
            const [bookingRows, serviceRows, barberRows] = await Promise.all([
                dataAPI.fetchBookings(),
                dataAPI.fetchServices(false),
                dataAPI.fetchBarbers(),
            ]);
            setBookings(bookingRows);
            setServices(serviceRows);
            setBarbers(barberRows.filter((barber) => barber.status));
        } catch (err) {
            setError(err.message || "Gagal memuat booking.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBookingData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dataAPI.saveBooking(form);
        await loadBookingData();
        setShowForm(false);
        setForm({ nama_customer: "", barber_id: "", service_id: "", jadwal: getNow(), harga: "", status_booking: "Pending" });
    };

    const filtered = bookings.filter(b =>
        b.nama_customer.toLowerCase().includes(search.toLowerCase()) &&
        (statusFilter === "All" || b.status_booking === statusFilter)
    );

    const totalPages  = Math.ceil(filtered.length / itemsPerPage);
    const currentData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const stats = [
        { label: "Total Booking",  value: bookings.length,                                 accent: "text-white" },
        { label: "Completed",      value: bookings.filter(b => b.status_booking === "Completed").length, accent: "text-emerald-400" },
        { label: "Pending",        value: bookings.filter(b => b.status_booking === "Pending").length,   accent: "text-amber-400" },
        { label: "Canceled",       value: bookings.filter(b => b.status_booking === "Canceled").length,  accent: "text-red-400" },
    ];

    return (
        <div className="w-full min-h-screen bg-[#080807] text-[#D3CDC3] font-sans antialiased">
            <Container>

                {/* ── HEADER ── */}
                <PageHeader title="Booking" breadcrumb={["Dashboard", "Booking"]}>
                    <div className="flex items-center gap-2 bg-[#0D0C0B] border border-white/6 px-4 py-2 rounded-xl text-xs text-white/40">
                        <FaCalendarAlt className="text-[#A87C2D]" />
                        <span>Booking Schedule</span>
                    </div>
                </PageHeader>

                {/* ── PROFILE STRIP ── */}
                <div className="flex items-center gap-3 mb-8 p-4 bg-[#0D0C0B] border border-white/5 rounded-2xl">
                    <Avatar name="Geta" />
                    <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white text-sm">Geta Dewi</p>
                        <p className="text-xs text-white/30">Booking Management</p>
                    </div>
                    <span className="hidden sm:flex items-center gap-1.5 text-[10px] text-[#A87C2D]/70 bg-[#A87C2D]/8 border border-[#A87C2D]/15 rounded-full px-3 py-1 font-semibold uppercase tracking-widest">
                        <FaCut className="text-[9px]" /> GroomGold
                    </span>
                </div>

                {error && <div className="mb-4 text-sm text-red-400">{error}</div>}
                {loading && <div className="mb-4 text-sm text-white/40">Memuat booking...</div>}

                {/* ── STATS ── */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                    {stats.map(s => (
                        <div key={s.label} className="bg-[#0D0C0B] border border-white/5 rounded-2xl px-5 py-4 hover:border-white/10 transition-colors duration-200">
                            <p className="text-[10px] uppercase tracking-widest text-white/30 font-semibold mb-1">{s.label}</p>
                            <p className={`text-3xl font-black ${s.accent}`}>{s.value}</p>
                        </div>
                    ))}
                </div>

                {/* ── ACTION BAR ── */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center justify-center gap-2 bg-[#A87C2D] hover:bg-[#c49535] text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors duration-200"
                    >
                        <FaPlus className="text-xs" />
                        Tambah Booking
                    </button>

                    <div className="flex flex-col sm:flex-row gap-3">
                        {/* Search */}
                        <div className="relative">
                            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20 text-xs" />
                            <input
                                value={search}
                                onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
                                placeholder="Cari customer..."
                                className="pl-9 pr-4 py-2.5 bg-[#0D0C0B] border border-white/8 text-[#D3CDC3] placeholder-white/20 rounded-xl text-sm focus:outline-none focus:border-[#A87C2D]/50 transition-all duration-200 w-full sm:w-52"
                            />
                        </div>

                        {/* Filter */}
                        <select
                            value={statusFilter}
                            onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                            className="bg-[#0D0C0B] border border-white/8 text-[#D3CDC3] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#A87C2D]/50 transition-all duration-200 appearance-none cursor-pointer"
                        >
                            <option value="All">Semua Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                            <option value="Canceled">Canceled</option>
                        </select>
                    </div>
                </div>

                {/* ── MODAL ADD BOOKING ── */}
                <Modal show={showForm}>
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h2 className="text-lg font-bold text-white tracking-wide">Tambah Booking</h2>
                            <p className="text-xs text-white/30 mt-0.5">Isi data customer dan layanan</p>
                        </div>
                        <button
                            onClick={() => setShowForm(false)}
                            className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200"
                        >
                            <FaTimes className="text-xs" />
                        </button>
                    </div>

                    {/* Gold accent line */}
                    <div className="w-full h-[1px] bg-gradient-to-r from-[#A87C2D]/60 via-[#A87C2D]/20 to-transparent mb-6" />

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field label="Nama Customer">
                            <input type="text" name="nama_customer" placeholder="Contoh: Budi Santoso" value={form.nama_customer} onChange={handleChange} required className={inputCls} />
                        </Field>

                        <Field label="Nama Barber">
                            <select name="barber_id" value={form.barber_id} onChange={handleChange} required className={selectCls}>
                                <option value="">Pilih barber...</option>
                                {barbers.map(barber => (
                                    <option key={barber.id} value={barber.id}>{barber.name}</option>
                                ))}
                            </select>
                        </Field>

                        <Field label="Layanan">
                            <select name="service_id" value={form.service_id} onChange={e => {
                                const s = services.find(x => x.id === e.target.value);
                                if (s) setForm(prev => ({ ...prev, service_id: s.id, harga: s.harga }));
                            }} className={selectCls}>
                                <option value="">Pilih layanan...</option>
                                {services.map(s => (
                                    <option key={s.id} value={s.id}>{s.nama_service}</option>
                                ))}
                            </select>
                        </Field>

                        <Field label="Harga (Rp)">
                            <input type="number" name="harga" placeholder="0" value={form.harga} onChange={handleChange} className={inputCls} />
                        </Field>

                        <Field label="Jadwal">
                            <input type="datetime-local" name="jadwal" value={form.jadwal} onChange={handleChange} className={inputCls} />
                        </Field>

                        <Field label="Status">
                            <select name="status_booking" value={form.status_booking} onChange={handleChange} className={selectCls}>
                                <option value="Pending">Pending</option>
                                <option value="Completed">Completed</option>
                                <option value="Canceled">Canceled</option>
                            </select>
                        </Field>

                        <div className="md:col-span-2 flex gap-3 pt-2 border-t border-white/5 mt-2">
                            <button type="button" onClick={() => setShowForm(false)}
                                className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/8 text-white/50 hover:text-white hover:bg-white/8 text-sm font-medium transition-all duration-200">
                                Batal
                            </button>
                            <button type="submit"
                                className="flex-1 py-2.5 rounded-xl bg-[#A87C2D] hover:bg-[#c49535] text-white text-sm font-semibold transition-colors duration-200">
                                Simpan Booking
                            </button>
                        </div>
                    </form>
                </Modal>

                {/* ── TABLE ── */}
                <div className="bg-[#0D0C0B] border border-white/6 rounded-2xl overflow-hidden mb-6">

                    {/* Table header */}
                    <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <FaCalendarAlt className="text-[#A87C2D] text-xs" />
                            <span className="text-xs font-semibold text-white/60 uppercase tracking-widest">Daftar Booking</span>
                        </div>
                        {filtered.length > 0 && (
                            <span className="text-[10px] text-white/25">
                                {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, filtered.length)} dari {filtered.length}
                            </span>
                        )}
                    </div>

                    <Table headers={["Customer", "Layanan", "Barber", "Jadwal", "Harga", "Status", ""]}>
                        {currentData.map(b => {
                            const initials  = getInitials(b.nama_customer);
                            const gradient  = pickGradient(b.nama_customer);
                            const { date, time } = formatDate(b.jadwal);

                            return (
                                <tr key={b.id_booking} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors duration-150 group">

                                    {/* Customer */}
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                                                {initials || "?"}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-white text-sm font-semibold truncate">{b.nama_customer}</p>
                                                <p className="text-white/25 text-[10px] font-mono">#{String(b.id_booking).slice(-5)}</p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Layanan */}
                                    <td className="px-5 py-4 text-sm text-white/60">{b.layanan}</td>

                                    {/* Barber */}
                                    <td className="px-5 py-4 text-sm text-white/60">{b.barber}</td>

                                    {/* Jadwal */}
                                    <td className="px-5 py-4">
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-xs text-white/70 font-medium">{date}</span>
                                            <span className="text-[10px] text-[#A87C2D]/70 flex items-center gap-1">
                                                <FaClock className="text-[9px]" />{time}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Harga */}
                                    <td className="px-5 py-4">
                                        <span className="text-sm font-bold text-[#A87C2D]">
                                            Rp {b.harga.toLocaleString("id-ID")}
                                        </span>
                                    </td>

                                    {/* Status */}
                                    <td className="px-5 py-4">
                                        <StatusPill status={b.status_booking} />
                                    </td>

                                    {/* Action */}
                                    <td className="px-5 py-4 text-right">
                                        <Link
                                            to={`/booking/${b.id_booking}`}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/8 text-white/40 hover:text-[#A87C2D] hover:border-[#A87C2D]/30 hover:bg-[#A87C2D]/5 text-xs font-medium transition-all duration-200"
                                        >
                                            <FaEye className="text-[10px]" />
                                            Detail
                                        </Link>
                                    </td>

                                </tr>
                            );
                        })}
                    </Table>

                    {filtered.length === 0 && <EmptyState title="Tidak ada booking ditemukan." />}
                </div>

                {/* ── PAGINATION ── */}
                {totalPages > 1 && (
                    <div className="flex justify-center pb-8">
                        <Pagination>
                            <PaginationContent className="gap-1">
                                <PaginationItem>
                                    <PaginationPrevious href="#" onClick={e => { e.preventDefault(); if (currentPage > 1) setCurrentPage(p => p - 1); }}
                                        className="bg-[#0D0C0B] border border-white/8 text-white/40 hover:text-white hover:border-white/20 rounded-xl text-xs" />
                                </PaginationItem>

                                {[...Array(totalPages)].map((_, i) => (
                                    <PaginationItem key={i}>
                                        <PaginationLink href="#"
                                            isActive={currentPage === i + 1}
                                            onClick={e => { e.preventDefault(); setCurrentPage(i + 1); }}
                                            className={`rounded-xl text-xs w-8 h-8 ${currentPage === i + 1 ? "bg-[#A87C2D] border-[#A87C2D] text-white font-bold" : "bg-[#0D0C0B] border-white/8 text-white/40 hover:text-white hover:border-white/20"}`}
                                        >
                                            {i + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                <PaginationItem>
                                    <PaginationNext href="#" onClick={e => { e.preventDefault(); if (currentPage < totalPages) setCurrentPage(p => p + 1); }}
                                        className="bg-[#0D0C0B] border border-white/8 text-white/40 hover:text-white hover:border-white/20 rounded-xl text-xs" />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}

            </Container>
        </div>
    );
}
