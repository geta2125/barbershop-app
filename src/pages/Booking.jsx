import { FaSearch, FaEdit, FaTrash, FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import dataBooking from "../data/databooking.json";

export default function Booking() {

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    // FILTER
    const filtered = dataBooking.filter(b => {
        const matchSearch = b.nama_customer.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === "All" || b.status_booking === statusFilter;
        return matchSearch && matchStatus;
    });

    return (
        <div className="ml-[260px] pt-[120px] px-7 pb-10 min-h-screen bg-[#0f0f0f] text-white">

            {/* HEADER */}
            <div className="mb-8 flex justify-between items-center flex-wrap gap-4">

                {/* LEFT */}
                <div>
                    <h1 className="text-3xl font-bold">Booking</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Manage your bookings
                    </p>
                </div>

                {/* RIGHT (SEARCH + FILTER) */}
                <div className="flex items-center gap-3">

                    {/* SEARCH */}
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search customer..."
                            className="w-[220px] pl-9 pr-3 py-2 bg-[#1a1a1a] border border-white/10 rounded-xl text-sm focus:outline-none"
                        />
                    </div>

                    {/* FILTER */}
                    <div className="relative">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="
                                w-[160px]
                                appearance-none
                                px-4 py-2 pr-10
                                bg-[#1a1a1a]
                                border border-white/10
                                rounded-xl
                                text-sm text-gray-300
                                focus:outline-none
                                cursor-pointer
                            "
                        >
                            <option value="All">Semua Status</option>
                            <option value="Completed">Completed</option>
                            <option value="Pending">Pending</option>
                            <option value="Canceled">Canceled</option>
                        </select>

                        <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs pointer-events-none" />
                    </div>

                </div>

            </div>

            {/* TABLE */}
            <div className="bg-[#1a1a1a] rounded-2xl border border-white/10 overflow-hidden shadow-lg">

                <table className="w-full text-sm">
                    <thead className="bg-[#111] text-gray-400 uppercase text-xs">
                        <tr>
                            <th className="p-4 text-left">Customer</th>
                            <th className="p-4 text-left">Barber</th>
                            <th className="p-4 text-left">Service</th>
                            <th className="p-4 text-left">Schedule</th>
                            <th className="p-4 text-left">Price</th>
                            <th className="p-4 text-left">Status</th>
                            <th className="p-4 text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filtered.map((b) => (
                            <tr
                                key={b.id_booking}
                                className="border-t border-white/5 hover:bg-white/5 transition"
                            >

                                <td className="p-4 font-semibold">{b.nama_customer}</td>

                                <td className="p-4 text-gray-400">{b.barber}</td>

                                <td className="p-4">{b.layanan}</td>

                                <td className="p-4 text-gray-400">{b.jadwal}</td>

                                <td className="p-4 text-[#7A1F2D] font-bold">
                                    Rp {b.harga.toLocaleString()}
                                </td>

                                {/* STATUS */}
                                <td className="p-4">
                                    <span className={`
                                        px-3 py-1 rounded-full text-xs font-semibold
                                        ${b.status_booking === "Completed"
                                            ? "bg-green-500/20 text-green-400"
                                            : b.status_booking === "Pending"
                                                ? "bg-yellow-500/20 text-yellow-400"
                                                : "bg-red-500/20 text-red-400"}
                                    `}>
                                        {b.status_booking}
                                    </span>
                                </td>

                                {/* ACTION */}
                                <td className="p-4 text-center">
                                    <div className="flex justify-center gap-3">
                                        <button className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition">
                                            <FaEdit />
                                        </button>
                                        <button className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition">
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* EMPTY */}
                {filtered.length === 0 && (
                    <div className="p-6 text-center text-gray-500">
                        No booking found 😢
                    </div>
                )}

            </div>

        </div>
    );
}