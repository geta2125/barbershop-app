import {
    FaSearch, FaPlus, FaCalendarAlt, FaUserCircle,
    FaEye, FaTimes, FaCut
} from "react-icons/fa";
import {
    Pagination, PaginationContent, PaginationItem,
    PaginationLink, PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import dataCustomers from "../data/datacustomers.json";

import Container  from "../components/Container";
import PageHeader from "../components/PageHeader";
import InputField from "../components/InputField";
import Modal      from "../components/Modal";
import Avatar     from "../components/Avatar";
import EmptyState from "../components/EmptyState";
import Table      from "../components/Table";

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

// ── Field wrapper (konsisten dengan Booking.jsx) ──────────────────────────
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

export default function Customers() {
    const [search,       setSearch]       = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [customers,    setCustomers]    = useState(dataCustomers);
    const [showForm,     setShowForm]     = useState(false);
    const [currentPage,  setCurrentPage]  = useState(1);
    const itemsPerPage = 50; // Disamakan dengan booking agar serasi posisinya

    const searchRef = useRef(null);
    useEffect(() => {
        searchRef.current?.focus();
    }, []);

    const [form, setForm] = useState({
        Nama_Lengkap: "", Email: "", No_HP: "",
        Status_Member: "Member", Level_Membership: "Silver", Status_Aktif: "Aktif"
    });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        const newCustomer = {
            ID_Customer: Date.now(), // Menggunakan ID yang unik konsisten seperti booking
            ...form,
            No_HP: Number(form.No_HP) || 0,
            Total_Transaksi: 0,
            Total_Pengeluaran: 0,
            Kota: "Pekanbaru",
            Tanggal_Daftar: new Date().toISOString().split('T')[0] + " 00:00:00"
        };

        setCustomers(prev => [newCustomer, ...prev]);
        setForm({ Nama_Lengkap: "", Email: "", No_HP: "", Status_Member: "Member", Level_Membership: "Silver", Status_Aktif: "Aktif" });
        setShowForm(false);
    };

    const filtered = customers.filter(c =>
        (c.Nama_Lengkap || "").toLowerCase().includes(search.toLowerCase()) &&
        (statusFilter === "All" || c.Status_Aktif === statusFilter)
    );

    const totalPages  = Math.ceil(filtered.length / itemsPerPage);
    const currentData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const stats = [
        { label: "Total Customers", value: customers.length,                                                 accent: "text-white" },
        { label: "Active",          value: customers.filter(c => c.Status_Aktif === "Aktif").length,         accent: "text-emerald-400" },
        { label: "Inactive",        value: customers.filter(c => c.Status_Aktif === "Tidak Aktif").length,   accent: "text-red-400" },
        { label: "Members",         value: customers.filter(c => c.Status_Member === "Member").length,       accent: "text-amber-400" },
    ];

    return (
        <div className="w-full min-h-screen bg-[#080807] text-[#D3CDC3] font-sans antialiased">
            <Container>

                {/* ── HEADER ── */}
                <PageHeader title="Customers" breadcrumb={["Dashboard", "Customers"]}>
                    <div className="flex items-center gap-2 bg-[#0D0C0B] border border-white/6 px-4 py-2 rounded-xl text-xs text-white/40">
                        <FaCalendarAlt className="text-[#A87C2D]" />
                        <span>Customer Database</span>
                    </div>
                </PageHeader>

                {/* ── PROFILE STRIP ── */}
                <div className="flex items-center gap-3 mb-8 p-4 bg-[#0D0C0B] border border-white/5 rounded-2xl">
                    <Avatar name="Geta" />
                    <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white text-sm">Geta Dewi</p>
                        <p className="text-xs text-white/30">Customer Management</p>
                    </div>
                    <span className="hidden sm:flex items-center gap-1.5 text-[10px] text-[#A87C2D]/70 bg-[#A87C2D]/8 border border-[#A87C2D]/15 rounded-full px-3 py-1 font-semibold uppercase tracking-widest">
                        <FaCut className="text-[9px]" /> GroomGold
                    </span>
                </div>

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
                        Tambah Customer
                    </button>

                    <div className="flex flex-col sm:flex-row gap-3">
                        {/* Search */}
                        <div className="relative">
                            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20 text-xs" />
                            <input
                                ref={searchRef}
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
                            <option value="Aktif">Aktif</option>
                            <option value="Tidak Aktif">Tidak Aktif</option>
                        </select>
                    </div>
                </div>

                {/* ── MODAL ADD CUSTOMER ── */}
                <Modal show={showForm}>
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h2 className="text-lg font-bold text-white tracking-wide">Tambah Customer</h2>
                            <p className="text-xs text-white/30 mt-0.5">Tambahkan customer baru GroomGold</p>
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
                        <Field label="Full Name">
                            <input type="text" name="Nama_Lengkap" placeholder="Contoh: Budi Santoso" value={form.Nama_Lengkap} onChange={handleChange} required className={inputCls} />
                        </Field>

                        <Field label="Email Address">
                            <input type="email" name="Email" placeholder="budi@example.com" value={form.Email} onChange={handleChange} required className={inputCls} />
                        </Field>

                        <Field label="Phone Number">
                            <input type="text" name="No_HP" placeholder="6281234..." value={form.No_HP} onChange={handleChange} required className={inputCls} />
                        </Field>

                        <Field label="Status Aktif">
                            <select name="Status_Aktif" value={form.Status_Aktif} onChange={handleChange} className={selectCls}>
                                <option value="Aktif">Aktif</option>
                                <option value="Tidak Aktif">Tidak Aktif</option>
                            </select>
                        </Field>

                        <Field label="Status Member">
                            <select name="Status_Member" value={form.Status_Member} onChange={handleChange} className={selectCls}>
                                <option value="Member">Member</option>
                                <option value="Non Member">Non Member</option>
                            </select>
                        </Field>

                        <Field label="Level Membership">
                            <select name="Level_Membership" value={form.Level_Membership} onChange={handleChange} className={selectCls}>
                                <option value="Silver">Silver</option>
                                <option value="Gold">Gold</option>
                                <option value="Platinum">Platinum</option>
                            </select>
                        </Field>

                        <div className="md:col-span-2 flex gap-3 pt-2 border-t border-white/5 mt-2">
                            <button type="button" onClick={() => setShowForm(false)}
                                className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/8 text-white/50 hover:text-white hover:bg-white/8 text-sm font-medium transition-all duration-200">
                                Batal
                            </button>
                            <button type="submit"
                                className="flex-1 py-2.5 rounded-xl bg-[#A87C2D] hover:bg-[#c49535] text-white text-sm font-semibold transition-colors duration-200">
                                Simpan Customer
                            </button>
                        </div>
                    </form>
                </Modal>

                {/* ── TABLE ── */}
                <div className="bg-[#0D0C0B] border border-white/6 rounded-2xl overflow-hidden mb-6">

                    {/* Table header */}
                    <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <FaUserCircle className="text-[#A87C2D] text-xs" />
                            <span className="text-xs font-semibold text-white/60 uppercase tracking-widest">Daftar Customer</span>
                        </div>
                        {filtered.length > 0 && (
                            <span className="text-[10px] text-white/25">
                                {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, filtered.length)} dari {filtered.length}
                            </span>
                        )}
                    </div>

                    <Table headers={["Customer", "Contact", "Membership", "Level", "Status", ""]}>
                        {currentData.map(c => {
                            const initials = getInitials(c.Nama_Lengkap);
                            const gradient = pickGradient(c.Nama_Lengkap);

                            return (
                                <tr key={c.ID_Customer} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors duration-150 group">

                                    {/* Customer */}
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                                                {initials || "?"}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-white text-sm font-semibold truncate">{c.Nama_Lengkap}</p>
                                                <p className="text-white/25 text-[10px] font-mono">#{String(c.ID_Customer).slice(-5)}</p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Contact */}
                                    <td className="px-5 py-4">
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-xs text-white/70 font-medium">{c.Email}</span>
                                            <span className="text-[10px] text-white/40">+{c.No_HP}</span>
                                        </div>
                                    </td>

                                    {/* Membership */}
                                    <td className="px-5 py-4">
                                        {c.Status_Member === "Member" ? (
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#A87C2D]/10 text-[#A87C2D] border border-[#A87C2D]/20">
                                                Member
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/5 text-white/40 border border-white/10">
                                                Non Member
                                            </span>
                                        )}
                                    </td>

                                    {/* Level */}
                                    <td className="px-5 py-4">
                                        <span className="inline-block font-bold text-[#A87C2D] bg-[#A87C2D]/5 px-2 py-0.5 rounded border border-[#A87C2D]/15 text-[10px] tracking-wider uppercase">
                                            {c.Level_Membership || "-"}
                                        </span>
                                    </td>

                                    {/* Status */}
                                    <td className="px-5 py-4">
                                        {c.Status_Aktif === "Aktif" ? (
                                            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full border bg-emerald-500/10 border-emerald-500/20 text-emerald-400">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                                Aktif
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full border bg-red-500/10 border-red-500/20 text-red-400">
                                                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                                Tidak Aktif
                                            </span>
                                        )}
                                    </td>

                                    {/* Action */}
                                    <td className="px-5 py-4 text-right">
                                        <Link
                                            to={`/customers/${c.ID_Customer}`}
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

                    {filtered.length === 0 && <EmptyState title="Tidak ada customer ditemukan." />}
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