import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";
import dataServices from "../data/dataservices.json";

export default function Services() {

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const filtered = dataServices.filter(s => {
        const matchSearch = s.nama_service.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === "All" || s.status === statusFilter;
        return matchSearch && matchStatus;
    });

    return (
        <div className="ml-[260px] pt-[120px] px-7 pb-10 min-h-screen bg-[#0f0f0f] text-white">

            {/* HEADER */}
            <div className="mb-8 flex justify-between items-center flex-wrap gap-4">

                <div>
                    <h1 className="text-3xl font-bold">Services</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Manage barber services
                    </p>
                </div>

                {/* SEARCH + FILTER */}
                <div className="flex items-center gap-3">

                    {/* SEARCH */}
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search service..."
                            className="w-[220px] pl-9 pr-3 py-2 bg-[#1a1a1a] border border-white/10 rounded-xl text-sm outline-none"
                        />
                    </div>

                    {/* FILTER */}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 bg-[#1a1a1a] border border-white/10 rounded-xl text-sm"
                    >
                        <option value="All">Semua Status</option>
                        <option value="Aktif">Aktif</option>
                        <option value="Nonaktif">Nonaktif</option>
                    </select>

                </div>

            </div>

            {/*  CARD GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                {filtered.map((s) => (
                    <div
                        key={s.id}
                        className="
                            bg-[#1a1a1a]
                            rounded-2xl
                            border border-white/10
                            overflow-hidden
                            group
                            hover:shadow-xl hover:shadow-black/40
                            transition-all duration-300
                        "
                    >

                        {/* IMAGE */}
                        <div className="h-[160px] overflow-hidden">
                            <img
                                src={`/img/services/${s.gambar}`}
                                alt={s.nama_service}
                                className="
                                    w-full h-full object-cover
                                    group-hover:scale-110
                                    transition duration-500
                                "
                            />
                        </div>

                        {/* CONTENT */}
                        <div className="p-4 space-y-3">

                            {/* TITLE */}
                            <h2 className="font-semibold text-lg">
                                {s.nama_service}
                            </h2>

                            {/* CATEGORY */}
                            <p className="text-sm text-gray-400">
                                {s.kategori} • {s.durasi} min
                            </p>

                            {/* PRICE */}
                            <p className="text-[#A87C2D] font-bold text-lg">
                                Rp {s.harga.toLocaleString()}
                            </p>

                            {/* STATUS */}
                            <span className={`
                                inline-block px-3 py-1 rounded-full text-xs font-semibold
                                ${s.status === "Aktif"
                                    ? "bg-green-500/20 text-green-400"
                                    : "bg-red-500/20 text-red-400"}
                            `}>
                                {s.status}
                            </span>

                            {/* ACTION */}
                            <div className="flex justify-end gap-2 pt-2">
                                <button className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition">
                                    <FaEdit />
                                </button>
                                <button className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition">
                                    <FaTrash />
                                </button>
                            </div>

                        </div>

                    </div>
                ))}

            </div>

            {/* EMPTY */}
            {filtered.length === 0 && (
                <div className="text-center text-gray-500 mt-10">
                    No services found
                </div>
            )}

        </div>
    );
}