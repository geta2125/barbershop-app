import {
    FaSearch,
    FaPlus,
    FaCalendarAlt,
    FaUserCircle,
    FaClock,
    FaEye,
    FaTimes
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

import dataBooking from "../data/databooking.json";
import dataServices from "../data/dataservices.json";

import Container from "../components/Container";
import PageHeader from "../components/PageHeader";
import InputField from "../components/InputField";
import SearchBar from "../components/SearchBar";
import Modal from "../components/Modal";
import Badge from "../components/Badge";
import Footer from "../components/Footer";
import Avatar from "../components/Avatar";
import EmptyState from "../components/EmptyState";
import StatsCard from "../components/StatsCard";
import Table from "../components/Table";

export default function Booking() {

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");

    const [bookings, setBookings] = useState(dataBooking);

    const [showForm, setShowForm] = useState(false);

    // PAGINATION
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // GET DATE
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

    const totalPages = Math.ceil(filtered.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;

    const currentData = filtered.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    return (

        <div className="
            w-full
            min-h-screen
            bg-[#0f0f17]
            text-white
            overflow-x-hidden
        ">

            <Container>

                {/* HEADER */}
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

                {/* PROFILE */}
                <div className="
                    flex items-center gap-3
                    mb-6
                ">

                    <Avatar name="Geta" />

                    <div>

                        <h3 className="font-bold">
                            Geta Dewi
                        </h3>

                        <p className="text-sm text-gray-500">
                            Booking Management
                        </p>

                    </div>

                </div>

                {/* STATS */}
                <div className="
                    grid grid-cols-1
                    md:grid-cols-3
                    gap-4
                    mb-6
                ">

                    <StatsCard
                        title="Total Booking"
                        value={bookings.length}
                    />

                    <StatsCard
                        title="Completed"
                        value={
                            bookings.filter(
                                (b) =>
                                    b.status_booking === "Completed"
                            ).length
                        }
                    />

                    <StatsCard
                        title="Pending"
                        value={
                            bookings.filter(
                                (b) =>
                                    b.status_booking === "Pending"
                            ).length
                        }
                    />

                </div>

                {/* ACTION */}
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
                        <SearchBar
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            placeholder="Search customer..."
                        />

                        {/* FILTER */}
                        <select
                            value={statusFilter}
                            onChange={(e) =>
                                setStatusFilter(e.target.value)
                            }
                            className="
                                px-5 py-3.5
                                bg-[#1b1b24]
                                border border-[#242335]
                                rounded-2xl
                                outline-none
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
                <Modal show={showForm}>

                    {/* HEADER */}
                    <div className="
                        flex items-center justify-between
                        mb-6
                    ">

                        <div>

                            <h2 className="text-3xl font-black">
                                Add Booking
                            </h2>

                            <p className="
                                text-sm
                                text-[#8e8e9f]
                                mt-1
                            ">
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
                            "
                        >

                            <FaTimes />

                        </button>

                    </div>

                    {/* FORM */}
                    <form
                        onSubmit={handleSubmit}
                        className="
                            grid grid-cols-1 md:grid-cols-2
                            gap-5
                        "
                    >

                        <InputField
                            label="Customer Name"
                            name="nama_customer"
                            placeholder="Customer Name"
                            value={form.nama_customer}
                            onChange={handleChange}
                        />

                        <InputField
                            label="Barber Name"
                            name="barber"
                            placeholder="Barber Name"
                            value={form.barber}
                            onChange={handleChange}
                        />

                        {/* SERVICE */}
                        <div>

                            <label className="
                                text-xs
                                font-bold
                                text-[#8e8e9f]
                                uppercase
                                tracking-[1px]
                                mb-2
                                block
                            ">
                                Service
                            </label>

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
                                    w-full
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

                        </div>

                        {/* PRICE */}
                        <InputField
                            label="Price"
                            name="harga"
                            value={form.harga}
                            onChange={handleChange}
                            placeholder="Price"
                        />

                        {/* DATE */}
                        <div>

                            <label className="
                                text-xs
                                font-bold
                                text-[#8e8e9f]
                                uppercase
                                tracking-[1px]
                                mb-2
                                block
                            ">
                                Schedule
                            </label>

                            <input
                                type="datetime-local"
                                name="jadwal"
                                value={form.jadwal}
                                onChange={handleChange}
                                className="
                                    w-full
                                    px-5 py-4
                                    bg-[#111116]
                                    border border-[#242335]
                                    rounded-2xl
                                    outline-none
                                "
                            />

                        </div>

                        {/* STATUS */}
                        <div>

                            <label className="
                                text-xs
                                font-bold
                                text-[#8e8e9f]
                                uppercase
                                tracking-[1px]
                                mb-2
                                block
                            ">
                                Status
                            </label>

                            <select
                                name="status_booking"
                                value={form.status_booking}
                                onChange={handleChange}
                                className="
                                    w-full
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

                        </div>

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
                                "
                            >

                                Save Booking

                            </button>

                        </div>

                    </form>

                </Modal>

                {/* TABLE */}
                <div className="
                    bg-[#1b1b24]
                    border border-[#242335]
                    rounded-[28px]
                    overflow-hidden
                ">

                    <Table
                        headers={[
                            "Customer",
                            "Service",
                            "Barber",
                            "Schedule",
                            "Price",
                            "Status",
                            "Action"
                        ]}
                    >

                        {currentData.map((b) => {

                            const badgeType =
                                b.status_booking === "Completed"
                                    ? "success"
                                    : b.status_booking === "Pending"
                                        ? "warning"
                                        : "danger";

                            return (

                                <tr
                                    key={b.id_booking}
                                    className="
                                        border-b border-[#242335]
                                        hover:bg-white/[0.02]
                                    "
                                >

                                    {/* CUSTOMER */}
                                    <td className="px-6 py-5">

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

                                                <h3 className="font-bold">
                                                    {b.nama_customer}
                                                </h3>

                                                <p className="
                                                    text-xs
                                                    text-[#8e8e9f]
                                                ">
                                                    ID : #{b.id_booking}
                                                </p>

                                            </div>

                                        </div>

                                    </td>

                                    {/* SERVICE */}
                                    <td className="px-6 py-5">
                                        {b.layanan}
                                    </td>

                                    {/* BARBER */}
                                    <td className="px-6 py-5">
                                        {b.barber}
                                    </td>

                                    {/* DATE */}
                                    <td className="px-6 py-5">

                                        <div className="
                                            flex items-center gap-2
                                        ">

                                            <FaClock className="
                                                text-[#dfb34c]
                                            " />

                                            {b.jadwal}

                                        </div>

                                    </td>

                                    {/* PRICE */}
                                    <td className="
                                        px-6 py-5
                                        text-[#dfb34c]
                                        font-black
                                    ">

                                        Rp {b.harga.toLocaleString()}

                                    </td>

                                    {/* STATUS */}
                                    <td className="
                                        px-6 py-5
                                        text-center
                                    ">

                                        <Badge type={badgeType}>

                                            {b.status_booking}

                                        </Badge>

                                    </td>

                                    {/* ACTION */}
                                    <td className="
                                        px-6 py-5
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

                    </Table>

                    {/* EMPTY */}
                    {filtered.length === 0 && (

                        <EmptyState
                            title="No Booking Found"
                        />

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

                {/* FOOTER */}
                <Footer />

            </Container>

        </div>

    );

}