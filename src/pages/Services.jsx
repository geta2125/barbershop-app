import { useState } from "react";
import { Link } from "react-router-dom";
import {
    FaSearch, FaEdit, FaTrash, FaCalendarAlt,
    FaPlus, FaTimes, FaImage, FaCut, FaClock // FaScissors diubah menjadi FaCut
} from "react-icons/fa";
import {
    Pagination, PaginationContent, PaginationItem,
    PaginationLink, PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination";

import dataServices from "../data/dataservices.json";

import Container  from "../components/Container";
import PageHeader from "../components/PageHeader";
import Modal      from "../components/Modal";
import Footer     from "../components/Footer";
import Avatar     from "../components/Avatar";
import EmptyState from "../components/EmptyState";

// ── Gaya CSS Reusable ────────────────────────────────────────────────────────
const inputCls  = "w-full bg-[#0D0C0B] border border-white/8 text-[#D3CDC3] placeholder-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#A87C2D]/60 focus:ring-1 focus:ring-[#A87C2D]/30 transition-all duration-200";
const selectCls = "w-full bg-[#0D0C0B] border border-white/8 text-[#D3CDC3] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#A87C2D]/60 focus:ring-1 focus:ring-[#A87C2D]/30 transition-all duration-200 appearance-none cursor-pointer";

function Field({ label, children }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-[0.2em] uppercase text-[#A87C2D]/70 font-semibold">{label}</label>
            {children}
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function Services() {
    const [search, setSearch]             = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [showForm, setShowForm]         = useState(false);
    const [services, setServices]         = useState(dataServices);
    const [currentPage, setCurrentPage]   = useState(1);
    const itemsPerPage = 8;

    // State Pengendali Mode Edit
    const [isEditing, setIsEditing]       = useState(false);
    const [currentId, setCurrentId]       = useState(null);

    // State Formulir Mandiri
    const [form, setForm] = useState({
        nama_service: "", kategori: "", durasi: "",
        harga: "", status: "Aktif", gambar: "",
    });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    // Trigger Buka Form Tambah Baru
    const handleAddNew = () => {
        setIsEditing(false);
        setCurrentId(null);
        setForm({ nama_service: "", kategori: "", durasi: "", harga: "", status: "Aktif", gambar: "" });
        setShowForm(true);
    };

    // Trigger Buka Form Edit Layanan
    const handleEditClick = (service) => {
        setIsEditing(true);
        setCurrentId(service.id);
        setForm({
            nama_service: service.nama_service,
            kategori: service.kategori,
            durasi: service.durasi,
            harga: service.harga,
            status: service.status,
            gambar: service.gambar
        });
        setShowForm(true);
    };

    // Trigger Hapus Layanan Secara Real-time
    const handleDeleteClick = (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus layanan ini dari katalog?")) {
            const updated = services.filter(s => s.id !== id);
            setServices(updated);
            
            // Jaga halaman agar tidak kosong jika item terakhir di halaman tersebut dihapus
            const maxPage = Math.ceil(updated.length / itemsPerPage) || 1;
            if (currentPage > maxPage) {
                setCurrentPage(maxPage);
            }
        }
    };

    // Handler Submit untuk Add dan Edit Data
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isEditing) {
            // Aksi Update Data
            const updated = services.map(s => 
                s.id === currentId 
                    ? { ...s, ...form, harga: Number(form.harga), durasi: Number(form.durasi) }
                    : s
            );
            setServices(updated);
        } else {
            // Aksi Tambah Data Baru
            const newService = {
                id: Date.now(),
                ...form,
                harga: Number(form.harga),
                durasi: Number(form.durasi)
            };
            setServices([newService, ...services]);
            setCurrentPage(1); // Balik ke halaman pertama agar data baru langsung terlihat
        }

        // Reset & Tutup Modal
        setForm({ nama_service: "", kategori: "", durasi: "", harga: "", status: "Aktif", gambar: "" });
        setShowForm(false);
        setIsEditing(false);
        setCurrentId(null);
    };

    // Logika Pencarian & Filter Status
    const filtered = services.filter(s =>
        s.nama_service.toLowerCase().includes(search.toLowerCase()) &&
        (statusFilter === "All" || s.status === statusFilter)
    );

    const totalPages  = Math.ceil(filtered.length / itemsPerPage);
    const currentData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const stats = [
        { label: "Total Layanan", value: services.length,                                accent: "text-white" },
        { label: "Aktif",         value: services.filter(s => s.status === "Aktif").length,        accent: "text-emerald-400" },
        { label: "Nonaktif",      value: services.filter(s => s.status === "Nonaktif").length,     accent: "text-red-400" },
    ];

    return (
        <div className="w-full min-h-screen bg-[#080807] text-[#D3CDC3] font-sans antialiased pb-12">
            <Container>

                {/* ── HEADER LAYANAN ── */}
                <PageHeader title="Services" breadcrumb={["Dashboard", "Services"]}>
                    <div className="flex items-center gap-2 bg-[#0D0C0B] border border-white/6 px-4 py-2 rounded-xl text-xs text-white/40">
                        <FaCut className="text-[#A87C2D] text-[10px]" />
                        <span>Barber Services</span>
                    </div>
                </PageHeader>

                {/* ── STRIP PROFIL ADMIN ── */}
                <div className="flex items-center gap-3 mb-8 p-4 bg-[#0D0C0B] border border-white/5 rounded-2xl">
                    <Avatar name="Geta" />
                    <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white text-sm">Geta Dewi</p>
                        <p className="text-xs text-white/30">Service Management</p>
                    </div>
                    <span className="hidden sm:flex items-center gap-1.5 text-[10px] text-[#A87C2D]/70 bg-[#A87C2D]/8 border border-[#A87C2D]/15 rounded-full px-3 py-1 font-semibold uppercase tracking-widest">
                        <FaCut className="text-[9px]" /> GroomGold
                    </span>
                </div>

                {/* ── KARTU STATISTIK KINERJA ── */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                    {stats.map(s => (
                        <div key={s.label} className="bg-[#0D0C0B] border border-white/5 rounded-2xl px-5 py-4 hover:border-white/10 transition-colors duration-200">
                            <p className="text-[10px] uppercase tracking-widest text-white/30 font-semibold mb-1">{s.label}</p>
                            <p className={`text-3xl font-black ${s.accent}`}>{s.value}</p>
                        </div>
                    ))}
                </div>

                {/* ── PANEL KONTROL & PENCARIAN ── */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
                    <button
                        onClick={handleAddNew}
                        className="flex items-center justify-center gap-2 bg-[#A87C2D] hover:bg-[#c49535] text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors duration-200"
                    >
                        <FaPlus className="text-xs" /> Tambah Layanan
                    </button>

                    <div className="flex gap-3">
                        <div className="relative flex-1 sm:flex-none">
                            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20 text-xs" />
                            <input
                                value={search}
                                onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
                                placeholder="Cari layanan..."
                                className="pl-9 pr-4 py-2.5 bg-[#0D0C0B] border border-white/8 text-[#D3CDC3] placeholder-white/20 rounded-xl text-sm focus:outline-none focus:border-[#A87C2D]/50 transition-all w-full sm:w-52"
                            />
                        </div>
                        <div className="relative">
                            <select
                                value={statusFilter}
                                onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                                className="bg-[#0D0C0B] border border-white/8 text-[#D3CDC3] rounded-xl pl-4 pr-8 py-2.5 text-sm focus:outline-none focus:border-[#A87C2D]/50 appearance-none cursor-pointer h-full"
                            >
                                <option value="All">Semua Status</option>
                                <option value="Aktif">Aktif</option>
                                <option value="Nonaktif">Nonaktif</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/40 text-[10px]">▼</div>
                        </div>
                    </div>
                </div>

                {/* ── MODAL DINAMIS (TAMBAH & EDIT) ── */}
                <Modal show={showForm}>
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h2 className="text-lg font-bold text-white tracking-wide">
                                {isEditing ? "Edit Detail Layanan" : "Tambah Layanan Baru"}
                            </h2>
                            <p className="text-xs text-white/30 mt-0.5">
                                {isEditing ? "Perbarui informasi spesifik katalog layanan" : "Isi kelengkapan data layanan salon baru"}
                            </p>
                        </div>
                        <button
                            onClick={() => setShowForm(false)}
                            className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200"
                        >
                            <FaTimes className="text-xs" />
                        </button>
                    </div>

                    <div className="w-full h-[1px] bg-gradient-to-r from-[#A87C2D]/60 via-[#A87C2D]/20 to-transparent mb-6" />

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field label="Nama Layanan">
                            <input type="text" name="nama_service" placeholder="Contoh: Classic Haircut" value={form.nama_service} onChange={handleChange} required className={inputCls} />
                        </Field>
                        <Field label="Kategori">
                            <input type="text" name="kategori" placeholder="Haircut / Shaving" value={form.kategori} onChange={handleChange} required className={inputCls} />
                        </Field>
                        <Field label="Durasi (Menit)">
                            <input type="number" name="durasi" placeholder="30" value={form.durasi} onChange={handleChange} required className={inputCls} />
                        </Field>
                        <Field label="Harga (Rp)">
                            <input type="number" name="harga" placeholder="50000" value={form.harga} onChange={handleChange} required className={inputCls} />
                        </Field>
                        <Field label="Status">
                            <div className="relative">
                                <select name="status" value={form.status} onChange={handleChange} className={selectCls}>
                                    <option value="Aktif">Aktif</option>
                                    <option value="Nonaktif">Nonaktif</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40 text-[10px]">▼</div>
                            </div>
                        </Field>
                        <Field label="Nama File Gambar">
                            <div className="relative">
                                <FaImage className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20 text-xs" />
                                <input type="text" name="gambar" placeholder="fadecut.jpg" value={form.gambar} onChange={handleChange} required className={`${inputCls} pl-9`} />
                            </div>
                        </Field>

                        {/* Kotak Preview Validasi Gambar Terpilih */}
                        {form.gambar && (
                            <div className="md:col-span-2">
                                <div className="h-40 rounded-xl overflow-hidden border border-white/8 bg-neutral-900">
                                    <img 
                                        src={`/img/services/${form.gambar}`} 
                                        alt="preview" 
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=600&auto=format&fit=crop"; }}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="md:col-span-2 flex gap-3 pt-2 border-t border-white/5 mt-2">
                            <button type="button" onClick={() => setShowForm(false)}
                                className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/8 text-white/50 hover:text-white text-sm font-medium transition-all duration-200">
                                Batal
                            </button>
                            <button type="submit"
                                className="flex-1 py-2.5 rounded-xl bg-[#A87C2D] hover:bg-[#c49535] text-white text-sm font-semibold transition-colors duration-200">
                                {isEditing ? "Perbarui Layanan" : "Simpan Layanan"}
                            </button>
                        </div>
                    </form>
                </Modal>

                {/* ── KONDISI DATA KOSONG ── */}
                {filtered.length === 0 ? (
                    <EmptyState title="Tidak ada layanan ditemukan." />
                ) : (
                    /* ── GRID HALAMAN PRODUK ── */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
                        {currentData.map(s => {
                            const isAktif = s.status === "Aktif";
                            return (
                                <div
                                    key={s.id}
                                    className="bg-[#0D0C0B] border border-white/6 rounded-2xl overflow-hidden group hover:border-[#A87C2D]/30 hover:shadow-[0_8px_32px_rgba(168,124,45,0.08)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
                                >
                                    <div>
                                        {/* Frame Gambar Layanan */}
                                        <div className="relative h-[130px] overflow-hidden bg-neutral-900">
                                            <img
                                                src={`/img/services/${s.gambar}`}
                                                alt={s.nama_service}
                                                className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-700 ease-out"
                                                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=600&auto=format&fit=crop"; }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0C0B]/80 via-transparent to-transparent" />

                                            {/* Badge Status Mengambang */}
                                            <span className={`absolute top-3 right-3 text-[9px] font-semibold px-2 py-0.5 rounded-full border backdrop-blur-sm ${
                                                isAktif
                                                    ? "bg-emerald-500/15 border-emerald-500/25 text-emerald-400"
                                                    : "bg-red-500/15 border-red-500/25 text-red-400"
                                            }`}>
                                                {isAktif ? "● Aktif" : "● Nonaktif"}
                                            </span>
                                        </div>

                                        {/* Konten Detail Produk */}
                                        <div className="p-4 pb-1">
                                            <Link
                                                to={`/services/${s.id}`}
                                                className="text-white text-sm font-semibold hover:text-[#A87C2D] transition-colors line-clamp-1 block mb-1"
                                            >
                                                {s.nama_service}
                                            </Link>

                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-[10px] text-white/30 uppercase tracking-wider">{s.kategori}</span>
                                                <span className="text-white/15 text-[10px]">·</span>
                                                <span className="flex items-center gap-1 text-[10px] text-white/30">
                                                    <FaClock className="text-[8px] text-[#A87C2D]/50" />
                                                    {s.durasi} mnt
                                                </span>
                                            </div>

                                            <p className="text-[#A87C2D] text-base font-black tracking-tight">
                                                Rp {(s.harga || 0).toLocaleString("id-ID")}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Tombol Aksi di Kaki Card */}
                                    <div className="p-4 pt-0">
                                        <div className="flex border-t border-white/5 pt-3 gap-2 mt-2">
                                            <button 
                                                onClick={() => handleEditClick(s)}
                                                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-white/35 hover:text-sky-400 hover:bg-sky-500/8 border border-transparent hover:border-sky-500/15 text-xs font-medium transition-all duration-200"
                                            >
                                                <FaEdit className="text-[10px]" /> Edit
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteClick(s.id)}
                                                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-white/35 hover:text-red-400 hover:bg-red-500/8 border border-transparent hover:border-red-500/15 text-xs font-medium transition-all duration-200"
                                            >
                                                <FaTrash className="text-[10px]" /> Hapus
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                )}

                {/* ── PAGINATION SYSTEM ── */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-8">
                        <Pagination>
                            <PaginationContent className="gap-1">
                                <PaginationItem>
                                    <PaginationPrevious 
                                        href="#" 
                                        onClick={e => { e.preventDefault(); if (currentPage > 1) setCurrentPage(p => p - 1); }} 
                                        className={currentPage === 1 ? "pointer-events-none opacity-30" : "cursor-pointer"}
                                    />
                                </PaginationItem>
                                {[...Array(totalPages)].map((_, i) => (
                                    <PaginationItem key={i}>
                                        <PaginationLink 
                                            href="#"
                                            isActive={currentPage === i + 1}
                                            onClick={e => { e.preventDefault(); setCurrentPage(i + 1); }}
                                            className="cursor-pointer"
                                        >
                                            {i + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                <PaginationItem>
                                    <PaginationNext 
                                        href="#" 
                                        onClick={e => { e.preventDefault(); if (currentPage < totalPages) setCurrentPage(p => p + 1); }} 
                                        className={currentPage === totalPages ? "pointer-events-none opacity-30" : "cursor-pointer"}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}

            </Container>
        </div>
    );
}