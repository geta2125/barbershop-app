import {
    FaCalendarAlt,
    FaPlus,
    FaTimes,
    FaUserCircle,
    FaEye
} from "react-icons/fa";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

import { useState } from "react";
import { Link } from "react-router-dom";
import dataCustomers from "../data/datacustomers.json";

import Container from "../components/Container";
import PageHeader from "../components/PageHeader";
import InputField from "../components/InputField";
import SearchBar from "../components/SearchBar";
import Modal from "../components/Modal";
import Footer from "../components/Footer";
import Avatar from "../components/Avatar";
import EmptyState from "../components/EmptyState";
import StatsCard from "../components/StatsCard";
import Table from "../components/Table";

export default function Customers() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [showForm, setShowForm] = useState(false);
    const [customers, setCustomers] = useState(dataCustomers);
    // PAGINATION
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 100;

    const [form, setForm] = useState({
        Nama_Lengkap: "",
        Email: "",
        No_HP: "",
        Status_Member: "Member",
        Level_Membership: "Silver",
        Status_Aktif: "Aktif"
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newCustomer = {
            ID_Customer: customers.length + 1,
            ...form,
            No_HP: Number(form.No_HP) || 0,
            Total_Transaksi: 0,
            Total_Pengeluaran: 0,
            Kota: "Pekanbaru",
            Tanggal_Daftar: new Date().toISOString().split('T')[0] + " 00:00:00"
        };

        setCustomers([newCustomer, ...customers]);
        setForm({
            Nama_Lengkap: "",
            Email: "",
            No_HP: "",
            Status_Member: "Member",
            Level_Membership: "Silver",
            Status_Aktif: "Aktif"
        });
        setShowForm(false);
    };

    const filtered = customers.filter((s) => {
        const matchSearch = (s.Nama_Lengkap || "")
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchStatus =
            statusFilter === "All" ||
            s.Status_Aktif === statusFilter;

        return matchSearch && matchStatus;
    });

    const totalPages = Math.ceil(filtered.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;

    const currentData = filtered.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    return (
        <div className="w-full min-h-screen bg-[#0f0f17] text-gray-100 antialiased selection:bg-[#dfb34c]/30 selection:text-[#dfb34c]">
            <Container py="py-8">
                {/* HEADER SECTION */}
                <PageHeader title="Customers" breadcrumb={["Home", "Customers", "Management"]}>
                    <div className="flex items-center gap-2.5 bg-[#1b1b24] px-4 py-2.5 rounded-xl border border-[#242335] text-xs text-gray-400 font-medium tracking-wide">
                        <span>Barber Customers</span>
                        <FaCalendarAlt className="text-[#dfb34c] text-sm" />
                    </div>
                </PageHeader>

                {/* PROFILE/USER BANNER */}
                <div className="flex items-center gap-4 mb-8 bg-[#1b1b24]/30 border border-[#242335]/50 p-4 rounded-2xl backdrop-blur-sm max-w-xs">
                    <Avatar name="Geta" />
                    <div>
                        <h3 className="font-bold text-lg">Geta Dewi</h3>
                        <p className="text-gray-400">Customer Management</p>
                    </div>
                </div>

                {/* STATS CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                    <StatsCard title="Total Customers" value={customers.length} />
                    <StatsCard title="Active Customers" value={customers.filter((s) => s.Status_Aktif === "Aktif").length} />
                    <StatsCard title="Inactive Customers" value={customers.filter((s) => s.Status_Aktif === "Tidak Aktif").length} />
                    <StatsCard title="Members" value={customers.filter((s) => s.Status_Member === "Member").length} />
                </div>

                {/* ACTION BAR (SEARCH & FILTER) */}
                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-6 bg-[#1b1b24]/20 p-4 rounded-2xl border border-[#242335]/40">
                    <div className="flex-1 max-w-md">
                        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search customer..." />
                    </div>
                    <div className="flex gap-3 flex-wrap sm:flex-nowrap">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-3 bg-[#1b1b24] border border-[#242335] rounded-xl outline-none text-sm font-medium text-gray-300 hover:border-[#dfb34c]/50 transition-colors focus:border-[#dfb34c] cursor-pointer"
                        >
                            <option value="All">All Status</option>
                            <option value="Aktif">Aktif</option>
                            <option value="Tidak Aktif">Tidak Aktif</option>
                        </select>

                        <button
                            onClick={() => setShowForm(true)}
                            className="flex items-center justify-center gap-2 bg-[#dfb34c] text-[#111116] font-bold px-5 py-3 rounded-xl hover:bg-[#c9a140] active:scale-[0.98] transition-all duration-200 text-sm shadow-lg shadow-[#dfb34c]/10"
                        >
                            <FaPlus className="text-xs" /> Add Customer
                        </button>
                    </div>
                </div>

                {/* MODAL FORM */}
                <Modal show={showForm}>
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#242335]/60">
                        <div>
                            <h2 className="text-2xl font-extrabold text-white tracking-wide">Add Customer</h2>
                            <p className="text-xs text-gray-400 mt-1">Tambahkan customer baru GroomGold</p>
                        </div>
                        <button
                            onClick={() => setShowForm(false)}
                            className="w-10 h-10 rounded-xl bg-[#14141d] border border-[#242335] flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-500 transition-colors duration-200"
                        >
                            <FaTimes />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <InputField label="Full Name" name="Nama_Lengkap" value={form.Nama_Lengkap} onChange={handleChange} />
                            <InputField label="Email" name="Email" value={form.Email} onChange={handleChange} />
                            <InputField label="Phone Number" name="No_HP" value={form.No_HP} onChange={handleChange} />

                            <div>
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">Status</label>
                                <select
                                    name="Status_Aktif"
                                    value={form.Status_Aktif}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3.5 bg-[#14141d] border border-[#242335] rounded-xl outline-none text-white text-sm focus:border-[#dfb34c] transition-colors"
                                >
                                    <option value="Aktif">Aktif</option>
                                    <option value="Tidak Aktif">Tidak Aktif</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4 border-t border-[#242335]/40 mt-6">
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="flex-1 py-3.5 rounded-xl bg-[#14141d] border border-[#242335] font-semibold text-gray-300 hover:bg-[#1b1b24] transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 py-3.5 rounded-xl bg-[#dfb34c] text-[#111116] font-bold hover:bg-[#c9a140] transition-colors shadow-lg shadow-[#dfb34c]/5"
                            >
                                Save Customer
                            </button>
                        </div>
                    </form>
                </Modal>

                {/* DATA TABLE VIEW */}
                <div className="bg-[#1b1b24]/20 backdrop-blur-md border border-[#242335]/60 rounded-2xl overflow-hidden mb-8 shadow-xl">
                    <div className="overflow-x-auto">
                        <Table headers={["Customer", "Contact", "Membership", "Level", "Status", "Action"]}>
                            {currentData.map((c) => {
                                return (
                                    <tr key={c.ID_Customer} className="group border-b border-[#242335]/40 last:border-none hover:bg-[#1b1b24]/40 transition-colors duration-200">
                                        {/* CUSTOMER */}
                                        <td className="px-6 py-4.5 align-middle">
                                            <div className="flex items-center gap-3.5">
                                                <div className="w-10 h-10 rounded-xl bg-[#242335] border border-[#32314a] flex items-center justify-center text-[#dfb34c] text-lg transition-all duration-300 group-hover:bg-[#dfb34c] group-hover:text-[#111116] group-hover:shadow-[0_0_12px_rgba(223,179,76,0.2)]">
                                                    <FaUserCircle />
                                                </div>
                                                <div className="flex flex-col">
                                                    <h3 className="font-semibold text-gray-200 group-hover:text-white transition-colors duration-150 text-sm">{c.Nama_Lengkap}</h3>
                                                    <div className="mt-1">
                                                        <span className="inline-block text-[10px] font-mono bg-[#242335] text-[#dfb34c] px-1.5 py-0.5 rounded-md border border-[#32314a]/60">
                                                            #{c.ID_Customer}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* CONTACT */}
                                        <td className="px-6 py-4.5 align-middle">
                                            <div className="flex flex-col gap-0.5">
                                                <span className="text-xs font-medium text-gray-300">{c.Email}</span>
                                                <span className="text-[11px] text-gray-400 tracking-wide">+{c.No_HP}</span>
                                            </div>
                                        </td>

                                        {/* MEMBERSHIP (REDESIGNED TOTAL) */}
                                        <td className="px-6 py-4.5 align-middle">
                                            <div className="flex items-center justify-start">
                                                {c.Status_Member === "Member" ? (
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#dfb34c]/10 text-[#dfb34c] border border-[#dfb34c]/20 tracking-wide">
                                                        Member
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-500/10 text-gray-400 border border-gray-500/20 tracking-wide">
                                                        Non Member
                                                    </span>
                                                )}
                                            </div>
                                        </td>

                                        {/* LEVEL */}
                                        <td className="px-6 py-4.5 align-middle">
                                            <span className="inline-block font-bold text-[#dfb34c] bg-[#dfb34c]/5 px-2.5 py-1 rounded-lg border border-[#dfb34c]/15 text-[11px] tracking-wider uppercase">
                                                {c.Level_Membership || "-"}
                                            </span>
                                        </td>

                                        {/* STATUS */}
                                        <td className="px-6 py-4.5 align-middle">
                                            <div className="flex items-center justify-start">
                                                {c.Status_Aktif === "Aktif" ? (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                                                        Aktif
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0"></span>
                                                        Tidak Aktif
                                                    </span>
                                                )}
                                            </div>
                                        </td>

                                        {/* ACTION */}
                                        <td className="px-6 py-4.5 text-right align-middle">
                                            <Link
                                                to={`/customers/${c.ID_Customer}`}
                                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#242335]/40 border border-[#32314a] text-gray-300 hover:border-[#dfb34c] hover:bg-[#dfb34c] hover:text-[#111116] transition-all duration-200 font-bold text-xs"
                                            >
                                                <FaEye className="text-xs" /> Detail
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </Table>
                    </div>

                    {filtered.length === 0 && (
                        <div className="py-16">
                            <EmptyState title="No Customer Found" />
                        </div>
                    )}
                </div>
                <div className="flex justify-center mt-6">
                    <Pagination>
                        <PaginationContent>

                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (currentPage > 1) {
                                            setCurrentPage(currentPage - 1);
                                        }
                                    }}
                                />
                            </PaginationItem>

                            {[...Array(totalPages)].map((_, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink
                                        href="#"
                                        isActive={currentPage === index + 1}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setCurrentPage(index + 1);
                                        }}
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (currentPage < totalPages) {
                                            setCurrentPage(currentPage + 1);
                                        }
                                    }}
                                />
                            </PaginationItem>

                        </PaginationContent>
                    </Pagination>
                </div>

                <Footer />
            </Container>
        </div>
    );
}