import {
    FaSearch,
    FaPlus,
    FaCalendarAlt,
    FaUserCircle,
    FaClock,
    FaCheckCircle,
    FaTimesCircle,
    FaEye,
    FaTimes
} from "react-icons/fa";

import { useState } from "react";
import { Link } from "react-router-dom";

import dataBooking from "../data/databooking.json";
import dataServices from "../data/dataservices.json";

export default function Booking() {

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const [bookings, setBookings] = useState(dataBooking);

    const [showForm, setShowForm] = useState(false);

    // GET CURRENT DATE
    const getNow = () => {

        const now = new Date();

        const offset = now.getTimezoneOffset();

        const local = new Date(
            now.getTime() - (offset * 60000)
        );

        return local.toISOString().slice(0, 16);

    };

    // FORM
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

    // HANDLE SUBMIT
    const handleSubmit = (e) => {

        e.preventDefault();

        const newBooking = {
            id_booking: Date.now(),
            ...form,
            harga: Number(form.harga),
        };

        setBookings((prev) => [
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

        <div className="w-full h-full bg-[#0f0f17] text-white overflow-hidden">

            {/* WRAPPER */}
            <div className="w-full px-5 lg:px-7 py-5">

                {/* PAGE HEADER */}
                <PageHeader
                    title="Booking"
                    breadcrumb={["Home", "Booking", "Management"]}
                >

                    <div className="
                        flex items-center gap-2
                        bg-[#1b1b24]
                        border border-[#242335]
                        px-4 py-2
                        rounded-2xl
                        text-xs text-gray-400
                    ">

                        <span className="font-medium">
                            Booking Schedule
                        </span>

                        <FaCalendarAlt className="text-[#dfb34c]" />

                    </div>

                </PageHeader>

                {/* ACTION SECTION */}
                <div className="
                    flex flex-col lg:flex-row
                    lg:items-center
                    lg:justify-between
                    gap-5
                    mb-8
                ">

                    {/* ADD BUTTON */}
                    <button
                        onClick={() => setShowForm(true)}
                        className="
                            flex items-center justify-center gap-2
                            bg-[#dfb34c]
                            text-[#111116]
                            font-black
                            px-6 py-3.5
                            rounded-2xl
                            transition-all duration-300
                            hover:opacity-90
                            shadow-[0_10px_30px_rgba(223,179,76,0.15)]
                        "
                    >

                        <FaPlus />

                        Add Booking

                    </button>

                    {/* SEARCH & FILTER */}
                    <div className="
                        flex flex-col md:flex-row
                        gap-4
                    ">

                        {/* SEARCH */}
                        <div className="relative">

                            <FaSearch className="
                                absolute left-4 top-1/2
                                -translate-y-1/2
                                text-gray-500
                            " />

                            <input
                                type="text"
                                placeholder="Search customer..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="
                                    w-full md:w-[260px]
                                    pl-12 pr-4 py-3.5
                                    bg-[#1b1b24]
                                    border border-[#242335]
                                    rounded-2xl
                                    outline-none
                                    transition-all
                                    focus:border-[#dfb34c]/30
                                "
                            />

                        </div>

                        {/* FILTER */}
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="
                                px-5 py-3.5
                                bg-[#1b1b24]
                                border border-[#242335]
                                rounded-2xl
                                outline-none
                                focus:border-[#dfb34c]/30
                            "
                        >

                            <option value="All">
                                All Status
                            </option>

                            <option value="Pending">
                                Pending
                            </option>

                            <option value="Completed">
                                Completed
                            </option>

                            <option value="Canceled">
                                Canceled
                            </option>

                        </select>

                    </div>

                </div>

                {/* MODAL */}
                {showForm && (

                    <div className="
                        fixed inset-0 z-50
                        flex items-center justify-center
                        bg-black/60
                        backdrop-blur-sm
                        p-5
                    ">

                        <div className="
                            w-full max-w-3xl
                            bg-[#1b1b24]
                            border border-[#242335]
                            rounded-[28px]
                            overflow-hidden
                        ">

                            {/* HEADER */}
                            <div className="
                                flex items-center justify-between
                                px-8 py-6
                                border-b border-[#242335]
                            ">

                                <div>

                                    <h2 className="text-3xl font-black">
                                        Add Booking
                                    </h2>

                                    <p className="text-sm text-[#8e8e9f] mt-1">
                                        Create new booking customer
                                    </p>

                                </div>

                                <button
                                    onClick={() => setShowForm(false)}
                                    className="
                                        w-12 h-12
                                        rounded-2xl
                                        bg-[#111116]
                                        border border-[#242335]
                                        flex items-center justify-center
                                        hover:bg-red-500/10
                                        hover:text-red-400
                                        transition
                                    "
                                >

                                    <FaTimes />

                                </button>

                            </div>

                            {/* FORM */}
                            <form
                                onSubmit={handleSubmit}
                                className="
                                    p-8
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
                                                (s) =>
                                                    s.nama_service === e.target.value
                                            );

                                        if (!selected) return;

                                        setForm((prev) => ({
                                            ...prev,
                                            layanan: selected.nama_service,
                                            harga: selected.harga
                                        }));

                                    }}
                                    className="
                                        px-5 py-4
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
                                        .filter((s) => s.status === "Aktif")
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
                                        px-5 py-4
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
                                        px-5 py-4
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
                                        px-5 py-4
                                        bg-[#111116]
                                        border border-[#242335]
                                        rounded-2xl
                                        outline-none
                                    "
                                >

                                    <option value="Pending">
                                        Pending
                                    </option>

                                    <option value="Completed">
                                        Completed
                                    </option>

                                    <option value="Canceled">
                                        Canceled
                                    </option>

                                </select>

                                {/* BUTTON */}
                                <div className="
                                    md:col-span-2
                                    flex gap-4 pt-2
                                ">

                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="
                                            flex-1
                                            py-4
                                            rounded-2xl
                                            bg-[#111116]
                                            border border-[#242335]
                                            font-bold
                                            hover:bg-[#242335]
                                            transition
                                        "
                                    >

                                        Cancel

                                    </button>

                                    <button
                                        type="submit"
                                        className="
                                            flex-1
                                            py-4
                                            rounded-2xl
                                            bg-[#dfb34c]
                                            text-[#111116]
                                            font-black
                                            hover:opacity-90
                                            transition
                                        "
                                    >

                                        Save Booking

                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                )}

                {/* TABLE */}
                <div className="
                    bg-[#1b1b24]
                    border border-[#242335]
                    rounded-[28px]
                    overflow-hidden
                ">

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead>

                                <tr className="
                                    bg-[#111116]
                                    text-[#8e8e9f]
                                    text-xs uppercase
                                    tracking-[2px]
                                ">

                                    <th className="px-8 py-6 text-center">
                                        Customer
                                    </th>

                                    <th className="px-6 py-6 text-left">
                                        Service
                                    </th>

                                    <th className="px-6 py-6 text-left">
                                        Barber
                                    </th>

                                    <th className="px-6 py-6 text-left">
                                        Schedule
                                    </th>

                                    <th className="px-6 py-6 text-left">
                                        Price
                                    </th>

                                    <th className="px-6 py-6 text-center">
                                        Status
                                    </th>

                                    <th className="px-8 py-6 text-right">
                                        Action
                                    </th>

                                </tr>

                            </thead>

                            <tbody className="divide-y divide-[#242335]">

                                {filtered.map((b) => {

                                    const statusClass =
                                        b.status_booking === "Completed"
                                            ? "bg-green-500/15 text-green-400"
                                            : b.status_booking === "Pending"
                                                ? "bg-yellow-500/15 text-yellow-400"
                                                : "bg-red-500/15 text-red-400";

                                    return (

                                        <tr
                                            key={b.id_booking}
                                            className="
                                                hover:bg-white/[0.02]
                                                transition-all duration-300
                                            "
                                        >

                                            {/* CUSTOMER */}
                                            <td className="px-8 py-6">

                                                <div className="
                                                    flex items-center gap-4
                                                ">

                                                    <div className="
                                                        w-14 h-14
                                                        rounded-2xl
                                                        bg-[#242335]
                                                        flex items-center justify-center
                                                        text-[#dfb34c]
                                                        text-xl
                                                    ">

                                                        <FaUserCircle />

                                                    </div>

                                                    <div>

                                                        <h3 className="
                                                            font-bold text-white
                                                        ">
                                                            {b.nama_customer}
                                                        </h3>

                                                        <p className="
                                                            text-xs
                                                            text-[#8e8e9f]
                                                            mt-1
                                                        ">
                                                            ID : #{b.id_booking}
                                                        </p>

                                                    </div>

                                                </div>

                                            </td>

                                            {/* SERVICE */}
                                            <td className="px-6 py-6">

                                                <div>

                                                    <h4 className="font-semibold">
                                                        {b.layanan}
                                                    </h4>

                                                    <p className="
                                                        text-xs
                                                        text-[#8e8e9f]
                                                        mt-1
                                                    ">
                                                        Premium Service
                                                    </p>

                                                </div>

                                            </td>

                                            {/* BARBER */}
                                            <td className="px-6 py-6">

                                                <span className="
                                                    text-gray-300
                                                    font-medium
                                                ">
                                                    {b.barber}
                                                </span>

                                            </td>

                                            {/* DATE */}
                                            <td className="px-6 py-6">

                                                <div className="
                                                    flex items-center gap-2
                                                    text-sm text-gray-300
                                                ">

                                                    <FaClock className="
                                                        text-[#dfb34c]
                                                    " />

                                                    {b.jadwal}

                                                </div>

                                            </td>

                                            {/* PRICE */}
                                            <td className="
                                                px-6 py-6
                                                font-black
                                                text-[#dfb34c]
                                            ">
                                                Rp {b.harga.toLocaleString()}
                                            </td>

                                            {/* STATUS */}
                                            <td className="
                                                px-6 py-6
                                                text-center
                                            ">

                                                <span className={`
                                                    inline-flex items-center gap-2
                                                    px-4 py-2
                                                    rounded-full
                                                    text-xs font-black uppercase
                                                    ${statusClass}
                                                `}>

                                                    {b.status_booking === "Completed"
                                                        ? <FaCheckCircle />
                                                        : b.status_booking === "Pending"
                                                            ? <FaClock />
                                                            : <FaTimesCircle />
                                                    }

                                                    {b.status_booking}

                                                </span>

                                            </td>

                                            {/* ACTION */}
                                            <td className="
                                                px-8 py-6
                                                text-right
                                            ">

                                                <Link
                                                    to={`/booking/${b.id_booking}`}
                                                    className="
                                                        inline-flex items-center gap-2
                                                        px-5 py-2.5
                                                        rounded-xl
                                                        border border-[#dfb34c]/20
                                                        text-[#dfb34c]
                                                        hover:bg-[#dfb34c]
                                                        hover:text-[#111116]
                                                        transition-all duration-300
                                                        font-bold text-sm
                                                    "
                                                >

                                                    <FaEye />

                                                    Detail

                                                </Link>

                                            </td>

                                        </tr>

                                    );

                                })}

                            </tbody>

                        </table>

                    </div>

                    {/* EMPTY */}
                    {filtered.length === 0 && (

                        <div className="
                            py-24
                            text-center
                        ">

                            <div className="
                                flex justify-center
                                text-[#242335]
                                text-7xl mb-5
                            ">

                                <FaUserCircle />

                            </div>

                            <h2 className="
                                text-2xl
                                font-bold
                                text-gray-400
                                mb-2
                            ">
                                No Booking Found
                            </h2>

                            <p className="
                                text-sm
                                text-[#8e8e9f]
                            ">
                                Try changing your search keyword.
                            </p>

                        </div>

                    )}

                </div>

            </div>

        </div>

    );

}

// PAGE HEADER
function PageHeader({
    title,
    breadcrumb,
    children
}) {

    return (

        <div className="mb-8">

            <div className="
                flex flex-col lg:flex-row
                lg:items-center lg:justify-between
                gap-5
                bg-[#1b1b24]
                border border-[#242335]
                rounded-[28px]
                px-6 py-5
            ">

                <div>

                    <h1 className="
                        text-3xl lg:text-4xl
                        font-black
                        leading-none
                    ">
                        {title}
                    </h1>

                    <p className="
                        text-sm
                        text-[#8e8e9f]
                        mt-3
                    ">
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
            required
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="
                w-full
                px-5 py-4
                bg-[#111116]
                border border-[#242335]
                rounded-2xl
                outline-none
                transition-all
                focus:border-[#dfb34c]/30
            "
        />

    );

}