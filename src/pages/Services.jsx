import {
    FaSearch,
    FaEdit,
    FaTrash,
    FaCalendarAlt,
    FaPlus,
    FaTimes,
    FaImage
} from "react-icons/fa";

import { useState } from "react";

import { Link } from "react-router-dom";

import dataServices from "../data/dataservices.json";

export default function Services() {

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const [showForm, setShowForm] = useState(false);

    const [services, setServices] = useState(dataServices);

    const [form, setForm] = useState({
        nama_service: "",
        kategori: "",
        durasi: "",
        harga: "",
        status: "Aktif",
        gambar: ""
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

        const newService = {
            id: Date.now(),
            ...form,
            harga: Number(form.harga),
            durasi: Number(form.durasi)
        };

        setServices([newService, ...services]);

        setForm({
            nama_service: "",
            kategori: "",
            durasi: "",
            harga: "",
            status: "Aktif",
            gambar: ""
        });

        setShowForm(false);

    };

    // FILTER
    const filtered = services.filter((s) => {

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
            <div className="w-full px-5 lg:px-7 py-5">

                {/* HEADER */}
                <PageHeader
                    title="Services"
                    breadcrumb={["Home", "Services", "Management"]}
                >

                    <div className="
                        flex items-center gap-2
                        bg-[#1b1b24]
                        px-4 py-2
                        rounded-xl
                        border border-[#242335]
                        text-xs text-gray-400
                    ">

                        <span className="font-medium">
                            Barber Services
                        </span>

                        <FaCalendarAlt className="text-[#dfb34c]" />

                    </div>

                </PageHeader>

                {/* TOP ACTION */}
                <div className="
                    flex flex-col lg:flex-row
                    justify-between
                    gap-4
                    mb-7
                ">

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
                                focus:border-[#dfb34c]/20
                                transition-all
                            "
                        />

                    </div>

                    <div className="flex gap-3 flex-wrap">

                        {/* FILTER */}
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="
                                px-4 py-3
                                bg-[#1b1b24]
                                border border-[#242335]
                                rounded-2xl
                                outline-none
                                focus:border-[#dfb34c]/20
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

                        {/* BUTTON */}
                        <button
                            onClick={() => setShowForm(true)}
                            className="
                                flex items-center gap-2
                                bg-[#dfb34c]
                                text-[#111116]
                                font-black
                                px-5 py-3
                                rounded-2xl
                                hover:opacity-90
                                transition-all duration-300
                                shadow-[0_10px_25px_rgba(223,179,76,0.15)]
                            "
                        >

                            <FaPlus />

                            Add Service

                        </button>

                    </div>

                </div>

                {/* MODAL FORM */}
                {showForm && (

                    <div className="
                        fixed inset-0
                        z-50
                        flex items-center justify-center
                        bg-black/70
                        backdrop-blur-sm
                        p-5
                    ">

                        <div className="
                            w-full max-w-2xl
                            bg-[#1b1b24]
                            border border-[#242335]
                            rounded-[32px]
                            overflow-hidden
                            animate-fadeIn
                        ">

                            {/* HEADER */}
                            <div className="
                                flex items-center justify-between
                                px-7 py-6
                                border-b border-[#242335]
                            ">

                                <div>

                                    <h2 className="
                                        text-3xl
                                        font-black
                                    ">
                                        Add Service
                                    </h2>

                                    <p className="
                                        text-sm
                                        text-[#8e8e9f]
                                        mt-1
                                    ">
                                        Tambahkan layanan baru GroomGold
                                    </p>

                                </div>

                                <button
                                    onClick={() => setShowForm(false)}
                                    className="
                                        w-11 h-11
                                        rounded-2xl
                                        bg-[#14141d]
                                        border border-[#242335]
                                        flex items-center justify-center
                                        hover:bg-red-500/10
                                        hover:text-red-400
                                        transition-all
                                    "
                                >

                                    <FaTimes />

                                </button>

                            </div>

                            {/* FORM */}
                            <form
                                onSubmit={handleSubmit}
                                className="
                                    p-7
                                    grid grid-cols-1 md:grid-cols-2
                                    gap-5
                                "
                            >

                                <Input
                                    label="Service Name"
                                    name="nama_service"
                                    value={form.nama_service}
                                    onChange={handleChange}
                                    placeholder="Hair Cut"
                                />

                                <Input
                                    label="Category"
                                    name="kategori"
                                    value={form.kategori}
                                    onChange={handleChange}
                                    placeholder="Haircut"
                                />

                                <Input
                                    label="Duration"
                                    name="durasi"
                                    type="number"
                                    value={form.durasi}
                                    onChange={handleChange}
                                    placeholder="30"
                                />

                                <Input
                                    label="Price"
                                    name="harga"
                                    type="number"
                                    value={form.harga}
                                    onChange={handleChange}
                                    placeholder="50000"
                                />

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
                                        name="status"
                                        value={form.status}
                                        onChange={handleChange}
                                        className="
                                            w-full
                                            px-5 py-4
                                            bg-[#14141d]
                                            border border-[#242335]
                                            rounded-2xl
                                            outline-none
                                            focus:border-[#dfb34c]/20
                                        "
                                    >

                                        <option value="Aktif">
                                            Aktif
                                        </option>

                                        <option value="Nonaktif">
                                            Nonaktif
                                        </option>

                                    </select>

                                </div>

                                {/* IMAGE */}
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
                                        Image Name
                                    </label>

                                    <div className="relative">

                                        <FaImage className="
                                            absolute left-4 top-1/2
                                            -translate-y-1/2
                                            text-gray-500
                                        " />

                                        <input
                                            type="text"
                                            name="gambar"
                                            value={form.gambar}
                                            onChange={handleChange}
                                            placeholder="fadecut.jpg"
                                            className="
                                                w-full
                                                pl-11 pr-4 py-4
                                                bg-[#14141d]
                                                border border-[#242335]
                                                rounded-2xl
                                                outline-none
                                                focus:border-[#dfb34c]/20
                                            "
                                            required
                                        />

                                    </div>

                                </div>

                                {/* PREVIEW */}
                                {form.gambar && (

                                    <div className="md:col-span-2">

                                        <div className="
                                            h-[220px]
                                            rounded-[24px]
                                            overflow-hidden
                                            border border-[#242335]
                                        ">

                                            <img
                                                src={`/img/services/${form.gambar}`}
                                                alt="preview"
                                                className="
                                                    w-full h-full
                                                    object-cover
                                                "
                                            />

                                        </div>

                                    </div>

                                )}

                                {/* BUTTON */}
                                <div className="
                                    md:col-span-2
                                    flex gap-4
                                    pt-3
                                ">

                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="
                                            flex-1
                                            py-4
                                            rounded-2xl
                                            bg-[#14141d]
                                            border border-[#242335]
                                            font-bold
                                            hover:bg-[#242335]
                                            transition-all
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
                                            transition-all duration-300
                                        "
                                    >

                                        Save Service

                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                )}

                {/* GRID */}
                <div className="
                    grid grid-cols-1
                    sm:grid-cols-2
                    xl:grid-cols-4
                    gap-5
                ">

                    {filtered.map((s) => (

                        <div
                            key={s.id}
                            className="
                                bg-[#1b1b24]
                                border border-[#242335]
                                rounded-[26px]
                                overflow-hidden
                                group
                                hover:border-[#dfb34c]/20
                                hover:-translate-y-1
                                transition-all duration-300
                            "
                        >

                            {/* IMAGE */}
                            <div className="
                                h-[190px]
                                overflow-hidden
                                relative
                            ">

                                <img
                                    src={`/img/services/${s.gambar}`}
                                    alt={s.nama_service}
                                    className="
                                        w-full h-full
                                        object-cover
                                        group-hover:scale-110
                                        transition duration-500
                                    "
                                />

                            </div>

                            {/* CONTENT */}
                            <div className="p-5">

                                <Link
                                    to={`/services/${s.id}`}
                                    className="
                                        text-xl
                                        font-black
                                        mb-1
                                        block
                                        hover:text-[#dfb34c]
                                        transition-all duration-300
                                    "
                                >
                                    {s.nama_service}
                                </Link>

                                <p className="
                                    text-sm
                                    text-[#8e8e9f]
                                    mb-3
                                ">
                                    {s.kategori} • {s.durasi} min
                                </p>

                                <h3 className="
                                    text-[#dfb34c]
                                    text-2xl
                                    font-black
                                    mb-5
                                ">
                                    Rp {s.harga.toLocaleString()}
                                </h3>

                                {/* ACTION */}
                                <div className="
                                    flex items-center justify-between
                                    gap-3
                                ">

                                    <button className="
                                        w-12 h-12
                                        rounded-xl
                                        bg-blue-500/15
                                        text-blue-400
                                        hover:bg-blue-500/25
                                        flex items-center justify-center
                                        transition-all duration-300
                                    ">

                                        <FaEdit />

                                    </button>

                                    <button className="
                                        w-12 h-12
                                        rounded-xl
                                        bg-red-500/15
                                        text-red-400
                                        hover:bg-red-500/25
                                        flex items-center justify-center
                                        transition-all duration-300
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
function PageHeader({
    title,
    breadcrumb,
    children
}) {

    return (

        <div className="mb-7">

            <div className="
                flex flex-col lg:flex-row
                lg:justify-between
                lg:items-center
                gap-5
                bg-[#1b1b24]
                border border-[#242335]
                rounded-[28px]
                px-7 py-6
            ">

                <div>

                    <h1 className="
                        text-3xl lg:text-4xl
                        font-black
                    ">
                        {title}
                    </h1>

                    <p className="
                        text-sm
                        text-[#8e8e9f]
                        mt-2
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
    label,
    name,
    value,
    onChange,
    placeholder,
    type = "text"
}) {

    return (

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
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="
                    w-full
                    px-5 py-4
                    bg-[#14141d]
                    border border-[#242335]
                    rounded-2xl
                    outline-none
                    focus:border-[#dfb34c]/20
                    transition-all
                "
                required
            />

        </div>

    );

}