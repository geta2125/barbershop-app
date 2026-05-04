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
                            className="w-[220px] pl-9 pr-3 py-2 bg-[#1a1a1a] border border-white/10 rounded-xl text-sm"
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

            {/* TABLE */}
            <div className="bg-[#1a1a1a] rounded-2xl border border-white/10 overflow-hidden">

                <table className="w-full text-sm">
                    <thead className="bg-[#111] text-gray-400 uppercase text-xs">
                        <tr>
                            <th className="p-4 text-left">Service</th>
                            <th className="p-4 text-left">Category</th>
                            <th className="p-4 text-left">Duration</th>
                            <th className="p-4 text-left">Price</th>
                            <th className="p-4 text-left">Status</th>
                            <th className="p-4 text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filtered.map((s) => (
                            <tr key={s.id} className="border-t border-white/5 hover:bg-white/5">

                                <td className="p-4 font-semibold">{s.nama_service}</td>

                                <td className="p-4 text-gray-400">{s.kategori}</td>

                                <td className="p-4 text-gray-400">{s.durasi} min</td>

                                <td className="p-4 text-[#7A1F2D] font-bold">
                                    Rp {s.harga.toLocaleString()}
                                </td>

                                <td className="p-4">
                                    <span className={`
                                        px-3 py-1 rounded-full text-xs font-semibold
                                        ${s.status === "Aktif"
                                            ? "bg-green-500/20 text-green-400"
                                            : "bg-red-500/20 text-red-400"}
                                    `}>
                                        {s.status}
                                    </span>
                                </td>

                                <td className="p-4 text-center">
                                    <div className="flex justify-center gap-3">
                                        <button className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
                                            <FaEdit />
                                        </button>
                                        <button className="p-2 bg-red-500/20 text-red-400 rounded-lg">
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

        </div>
    );
}