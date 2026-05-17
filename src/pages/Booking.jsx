import {
    FaSearch,
    FaPlus,
    FaCalendarAlt
} from "react-icons/fa";

import { useState } from "react";

import dataBooking from "../data/databooking.json";
import dataServices from "../data/dataservices.json";

export default function Booking() {

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [bookings, setBookings] = useState(dataBooking);
    const [showForm, setShowForm] = useState(false);

    // GET DATE NOW
    const getNow = () => {

        const now = new Date();
        const offset = now.getTimezoneOffset();

        const local = new Date(
            now.getTime() - (offset * 60000)
        );

        return local.toISOString().slice(0, 16);

    };

    const [form, setForm] = useState({
        nama_customer: "",
        barber: "",
        layanan: "",
        jadwal: getNow(),
        harga: "",
        status_booking: "Pending",
    });

    // HANDLE INPUT
    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    // SUBMIT
    const handleSubmit = (e) => {

        e.preventDefault();

        const newBooking = {
            id_booking: Date.now(),
            ...form,
            harga: Number(form.harga),
        };

        setBookings(prev => [
            newBooking,
            ...prev
        ]);

        setShowForm(false);

        setForm({
            nama_customer: "",
            barber: "",
            layanan: "",
            jadwal: getNow(),
            harga: "",
            status_booking: "Pending",
        });

    };

    // FILTER
    const filtered = bookings.filter((b) => {

        const matchSearch =
            b.nama_customer
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchStatus =
            statusFilter === "All" ||
            b.status_booking === statusFilter;

        return matchSearch && matchStatus;

    });

    return (

        <div className="w-full min-h-screen bg-[#0f0f17] text-white overflow-x-hidden">

            {/* WRAPPER */}
            <div className="w-full px-6 lg:px-10 py-8">

                {/* PAGE HEADER */}
                <PageHeader
                    title="Booking"
                    breadcrumb={["Home", "Booking", "Booking"]}
                >

                    <div className="flex items-center gap-2 bg-[#1b1b24] px-4 py-2 rounded-xl border border-[#242335] text-xs text-gray-400">

                        <span className="font-medium">
                            Booking Management
                        </span>

                        <FaCalendarAlt className="text-[#dfb34c]" />

                    </div>

                </PageHeader>

                {/* ACTION */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="
                            flex items-center gap-2
                            bg-[#dfb34c]
                            text-[#111116]
                            px-5 py-3
                            rounded-2xl
                            font-bold
                            hover:opacity-90
                            transition
                        "
                    >

                        <FaPlus />
                        Add Booking

                    </button>

                    <div className="flex flex-col sm:flex-row gap-3">

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
                                placeholder="Search customer..."
                                className="
                                    w-full sm:w-[240px]
                                    pl-11 pr-4 py-3
                                    bg-[#1b1b24]
                                    border border-[#242335]
                                    rounded-2xl
                                    text-sm
                                    outline-none
                                "
                            />

                        </div>

                        {/* FILTER */}
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="
                                px-4 py-3
                                bg-[#1b1b24]
                                border border-[#242335]
                                rounded-2xl
                                text-sm
                                outline-none
                            "
                        >

                            <option value="All">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                            <option value="Canceled">Canceled</option>

                        </select>

                    </div>

                </div>

                {/* FORM */}
                {showForm && (

                    <form
                        onSubmit={handleSubmit}
                        className="
                            mb-6
                            bg-[#1b1b24]
                            border border-[#242335]
                            rounded-3xl
                            p-6
                            grid grid-cols-1 md:grid-cols-2
                            gap-5
                        "
                    >

                        <Input
                            name="nama_customer"
                            placeholder="Customer Name"
                            value={form.nama_customer}
                            onChange={handleChange}
                        />

                        <Input
                            name="barber"
                            placeholder="Barber Name"
                            value={form.barber}
                            onChange={handleChange}
                        />

                        {/* SERVICE */}
                        <select
                            name="layanan"
                            value={form.layanan}
                            onChange={(e) => {

                                const selected =
                                    dataServices.find(
                                        s => s.nama_service === e.target.value
                                    );

                                if (!selected) return;

                                setForm(prev => ({
                                    ...prev,
                                    layanan: selected.nama_service,
                                    harga: selected.harga
                                }));

                            }}
                            className="
                                px-4 py-3
                                bg-[#111116]
                                border border-[#242335]
                                rounded-2xl
                                outline-none
                            "
                        >

                            <option value="">
                                Select Service
                            </option>

                            {dataServices
                                .filter(s => s.status === "Aktif")
                                .map((s) => (

                                    <option
                                        key={s.id}
                                        value={s.nama_service}
                                    >
                                        {s.nama_service}
                                    </option>

                                ))}

                        </select>

                        {/* PRICE */}
                        <input
                            value={form.harga}
                            readOnly
                            placeholder="Price"
                            className="
                                px-4 py-3
                                bg-[#111116]
                                border border-[#242335]
                                rounded-2xl
                                text-gray-400
                                outline-none
                            "
                        />

                        {/* DATE */}
                        <input
                            type="datetime-local"
                            name="jadwal"
                            value={form.jadwal}
                            onChange={handleChange}
                            className="
                                px-4 py-3
                                bg-[#111116]
                                border border-[#242335]
                                rounded-2xl
                                outline-none
                            "
                        />

                        {/* STATUS */}
                        <select
                            name="status_booking"
                            value={form.status_booking}
                            onChange={handleChange}
                            className="
                                px-4 py-3
                                bg-[#111116]
                                border border-[#242335]
                                rounded-2xl
                                outline-none
                            "
                        >

                            <option>Pending</option>
                            <option>Completed</option>
                            <option>Canceled</option>

                        </select>

                        <button
                            className="
                                md:col-span-2
                                bg-[#dfb34c]
                                text-[#111116]
                                py-3
                                rounded-2xl
                                font-bold
                            "
                        >
                            Save Booking
                        </button>

                    </form>

                )}

                {/* TABLE */}
                <div className="
                    bg-[#1b1b24]
                    border border-[#242335]
                    rounded-3xl
                    overflow-hidden
                ">

                    <div className="overflow-x-auto">

                        <table className="w-full text-sm">

                            <thead className="bg-[#111116] text-gray-400">

                                <tr>

                                    <th className="p-5 text-left">
                                        Customer
                                    </th>

                                    <th className="p-5 text-left">
                                        Barber
                                    </th>

                                    <th className="p-5 text-left">
                                        Service
                                    </th>

                                    <th className="p-5 text-left">
                                        Schedule
                                    </th>

                                    <th className="p-5 text-left">
                                        Price
                                    </th>

                                    <th className="p-5 text-left">
                                        Status
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {filtered.map((b) => (

                                    <tr
                                        key={b.id_booking}
                                        className="
                                            border-t border-[#242335]
                                            hover:bg-white/[0.02]
                                            transition
                                        "
                                    >

                                        <td className="p-5">
                                            {b.nama_customer}
                                        </td>

                                        <td className="p-5">
                                            {b.barber}
                                        </td>

                                        <td className="p-5">
                                            {b.layanan}
                                        </td>

                                        <td className="p-5">
                                            {b.jadwal}
                                        </td>

                                        <td className="p-5 text-[#dfb34c] font-semibold">
                                            Rp {b.harga.toLocaleString()}
                                        </td>

                                        <td className="p-5">

                                            <span className={`
                                                px-3 py-1 rounded-full text-xs font-semibold
                                                ${b.status_booking === "Completed"
                                                    ? "bg-green-500/20 text-green-400"
                                                    : b.status_booking === "Pending"
                                                        ? "bg-yellow-500/20 text-yellow-400"
                                                        : "bg-red-500/20 text-red-400"
                                                }
                                            `}>

                                                {b.status_booking}

                                            </span>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

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

// INPUT
function Input({
    name,
    placeholder,
    value,
    onChange
}) {

    return (

        <input
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="
                px-4 py-3
                bg-[#111116]
                border border-[#242335]
                rounded-2xl
                outline-none
            "
        />

    );

}