import {
    FaSearch,
    FaEdit,
    FaTrash,
    FaCalendarAlt
} from "react-icons/fa";

import { useState } from "react";

import dataServices from "../data/dataservices.json";

export default function Services() {

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const filtered = dataServices.filter((s) => {

        const matchSearch =
            s.nama_service
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchStatus =
            statusFilter === "All" ||
            s.status === statusFilter;

        return matchSearch && matchStatus;

    });

    return (

        <div className="w-full min-h-screen bg-[#0f0f17] text-white overflow-x-hidden">

            {/* WRAPPER */}
            <div className="w-full px-6 lg:px-10 py-8">

                {/* HEADER */}
                <PageHeader
                    title="Services"
                    breadcrumb={["Home", "Services", "Services"]}
                >

                    <div className="flex items-center gap-2 bg-[#1b1b24] px-4 py-2 rounded-xl border border-[#242335] text-xs text-gray-400">

                        <span className="font-medium">
                            Barber Services
                        </span>

                        <FaCalendarAlt className="text-[#dfb34c]" />

                    </div>

                </PageHeader>

                {/* FILTER */}
                <div className="flex flex-col lg:flex-row justify-between gap-4 mb-8">

                    {/* SEARCH */}
                    <div className="relative">

                        <FaSearch className="
                            absolute left-4 top-1/2
                            -translate-y-1/2
                            text-gray-500
                        " />

                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search service..."
                            className="
                                w-full lg:w-[260px]
                                pl-11 pr-4 py-3
                                bg-[#1b1b24]
                                border border-[#242335]
                                rounded-2xl
                                outline-none
                            "
                        />

                    </div>

                    {/* STATUS */}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="
                            px-4 py-3
                            bg-[#1b1b24]
                            border border-[#242335]
                            rounded-2xl
                            outline-none
                        "
                    >

                        <option value="All">
                            All Status
                        </option>

                        <option value="Aktif">
                            Aktif
                        </option>

                        <option value="Nonaktif">
                            Nonaktif
                        </option>

                    </select>

                </div>

                {/* GRID */}
                <div className="
                    grid grid-cols-1
                    sm:grid-cols-2
                    xl:grid-cols-4
                    gap-6
                ">

                    {filtered.map((s) => (

                        <div
                            key={s.id}
                            className="
                                bg-[#1b1b24]
                                border border-[#242335]
                                rounded-3xl
                                overflow-hidden
                                group
                                hover:border-[#dfb34c]/20
                                transition
                            "
                        >

                            {/* IMAGE */}
                            <div className="h-[200px] overflow-hidden">

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
                            <div className="p-5">

                                <div className="mb-4">

                                    <h2 className="text-xl font-bold mb-1">
                                        {s.nama_service}
                                    </h2>

                                    <p className="text-sm text-gray-400">
                                        {s.kategori} • {s.durasi} min
                                    </p>

                                </div>

                                <div className="flex justify-between items-center mb-5">

                                    <h3 className="text-[#dfb34c] text-2xl font-black">

                                        Rp {s.harga.toLocaleString()}

                                    </h3>

                                    <span className={`
                                        px-3 py-1 rounded-full text-xs font-semibold
                                        ${s.status === "Aktif"
                                            ? "bg-green-500/20 text-green-400"
                                            : "bg-red-500/20 text-red-400"
                                        }
                                    `}>

                                        {s.status}

                                    </span>

                                </div>

                                {/* ACTION */}
                                <div className="flex justify-end gap-3">

                                    <button className="
                                        p-3 rounded-2xl
                                        bg-blue-500/20
                                        text-blue-400
                                        hover:bg-blue-500/30
                                        transition
                                    ">

                                        <FaEdit />

                                    </button>

                                    <button className="
                                        p-3 rounded-2xl
                                        bg-red-500/20
                                        text-red-400
                                        hover:bg-red-500/30
                                        transition
                                    ">

                                        <FaTrash />

                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );

}

// PAGE HEADER
function PageHeader({ title, breadcrumb, children }) {

    return (

        <div className="mb-8">

            <div className="
                flex flex-col lg:flex-row
                lg:justify-between
                lg:items-center
                gap-5
                bg-[#1b1b24]
                border border-[#242335]
                rounded-3xl
                px-8 py-7
            ">

                <div>

                    <h1 className="text-4xl font-black">
                        {title}
                    </h1>

                    <p className="text-sm text-[#8e8e9f] mt-2">
                        {breadcrumb.join(" / ")}
                    </p>

                </div>

                <div>
                    {children}
                </div>

            </div>

        </div>

    );

}