import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    FaArrowLeft,
    FaUserCircle,
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaCalendarCheck,
    FaIdBadge,
    FaCrown,
    FaExchangeAlt,
    FaWallet
} from "react-icons/fa";
import dataCustomers from "../data/datacustomers.json";
import Container from "../components/Container";
import Footer from "../components/Footer";

export default function CustomersDetail() {
    const { id } = useParams();
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        // Mencari customer berdasarkan ID dari URL parameter
        const foundCustomer = dataCustomers.find(c => String(c.ID_Customer) === String(id));
        setCustomer(foundCustomer);
    }, [id]);

    if (!customer) {
        return (
            <div className="w-full min-h-screen bg-[#0f0f17] flex flex-col items-center justify-center text-gray-400">
                <p className="text-lg mb-4">Customer data not found.</p>
                <Link to="/customers" className="flex items-center gap-2 text-[#dfb34c] hover:underline font-bold">
                    <FaArrowLeft /> Back to Customers
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-[#0f0f17] text-gray-100 antialiased">
            <Container py="py-8">

                {/* HEADER & BACK BUTTON */}
                <div className="mb-6">
                    <Link
                        to="/customers"
                        className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-[#dfb34c] transition-colors mb-4 bg-[#1b1b24]/40 px-3 py-1.5 rounded-lg border border-[#242335]"
                    >
                        <FaArrowLeft className="text-[10px]" /> Kembali
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

                    {/* LEFT COLUMN: PROFILE CARD */}
                    <div className="bg-[#1b1b24]/30 backdrop-blur-sm border border-[#242335]/70 rounded-2xl p-6 flex flex-col items-center text-center">
                        <div className="w-24 h-24 rounded-2xl bg-[#242335] border-2 border-[#dfb34c]/30 flex items-center justify-center text-[#dfb34c] text-5xl mb-4 shadow-xl shadow-[#dfb34c]/5">
                            <FaUserCircle />
                        </div>

                        <h2 className="text-xl font-extrabold text-white tracking-wide">{customer.Nama_Lengkap}</h2>
                        <span className="text-xs font-mono text-[#dfb34c] mt-1 bg-[#dfb34c]/10 px-2 py-0.5 rounded-md border border-[#dfb34c]/20">
                            ID: #{customer.ID_Customer}
                        </span>

                        {/* Status Badges */}
                        <div className="flex gap-2 mt-4 flex-wrap justify-center">
                            {customer.Status_Member === "Member" ? (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#dfb34c]/10 text-[#dfb34c] border border-[#dfb34c]/20">
                                    Member
                                </span>
                            ) : (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-gray-500/10 text-gray-400 border border-gray-500/20">
                                    Non Member
                                </span>
                            )}

                            {customer.Status_Aktif === "Aktif" ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                    <span className="w-1 h-1 rounded-full bg-emerald-400"></span> Aktif
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                                    <span className="w-1 h-1 rounded-full bg-rose-400"></span> Tidak Aktif
                                </span>
                            )}
                        </div>

                        <hr className="w-full border-[#242335]/60 my-6" />

                        {/* Contact Info List */}
                        <div className="w-full space-y-4 text-left text-sm text-gray-300">
                            <div className="flex items-center gap-3">
                                <FaEnvelope className="text-gray-500 shrink-0" />
                                <span className="truncate">{customer.Email || "-"}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaPhoneAlt className="text-gray-500 shrink-0" />
                                <span>+{customer.No_HP || "-"}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaMapMarkerAlt className="text-gray-500 shrink-0" />
                                <span>{customer.Kota || "Pekanbaru"}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaCalendarCheck className="text-gray-500 shrink-0" />
                                <span className="text-xs text-gray-400">Terdaftar: {customer.Tanggal_Daftar || "-"}</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: FINANCIAL & MEMBERSHIP STATS */}
                    <div className="lg:col-span-2 flex flex-col gap-6">

                        {/* Summary Metrics Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-[#1b1b24]/20 border border-[#242335]/50 p-5 rounded-2xl flex items-center gap-4">
                                <div className="w-12 h-12 bg-[#dfb34c]/5 rounded-xl border border-[#dfb34c]/10 flex items-center justify-center text-[#dfb34c]">
                                    <FaCrown className="text-xl" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Membership Level</p>
                                    <h4 className="text-lg font-bold text-white mt-0.5">{customer.Level_Membership || "-"}</h4>
                                </div>
                            </div>

                            <div className="bg-[#1b1b24]/20 border border-[#242335]/50 p-5 rounded-2xl flex items-center gap-4">
                                <div className="w-12 h-12 bg-emerald-500/5 rounded-xl border border-emerald-500/10 flex items-center justify-center text-emerald-400">
                                    <FaExchangeAlt className="text-xl" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Total Transaksi</p>
                                    <h4 className="text-lg font-bold text-white mt-0.5">{customer.Total_Transaksi || 0} x</h4>
                                </div>
                            </div>

                            <div className="bg-[#1b1b24]/20 border border-[#242335]/50 p-5 rounded-2xl flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-500/5 rounded-xl border border-blue-500/10 flex items-center justify-center text-blue-400">
                                    <FaWallet className="text-xl" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Total Pengeluaran</p>
                                    <h4 className="text-lg font-bold text-white mt-0.5">
                                        Rp {(customer.Total_Pengeluaran || 0).toLocaleString("id-ID")}
                                    </h4>
                                </div>
                            </div>
                        </div>

                        {/* Detailed Tier Privileges Box */}
                        <div className="bg-[#1b1b24]/20 border border-[#242335]/50 rounded-2xl p-6 flex-1">
                            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                                <FaIdBadge className="text-[#dfb34c]" /> Membership Overview
                            </h3>
                            <div className="bg-[#14141d] border border-[#242335] rounded-xl p-4">
                                <p className="text-sm text-gray-300 leading-relaxed">
                                    Pelanggan ini terdaftar sebagai level <strong className="text-[#dfb34c]">{customer.Level_Membership || "Silver"}</strong>.
                                    {customer.Status_Member === "Member"
                                        ? " Berhak mendapatkan potongan harga member, prioritas antrean booking via aplikasi GroomGold, serta poin loyalty bonus pada setiap kunjungan barbershop."
                                        : " Pelanggan saat ini belum mengaktifkan langganan loyalitas premium."}
                                </p>
                            </div>

                            {/* Placeholder Activity List */}
                            <h3 className="text-base font-bold text-white mt-6 mb-3">Catatan internal</h3>
                            <p className="text-xs text-gray-400 italic">
                                Belum ada catatan tambahan khusus untuk customer ini. Semua transaksi tercatat otomatis via POS terminal Pekanbaru.
                            </p>
                        </div>

                    </div>
                </div>

                <Footer />
            </Container>
        </div>
    );
}