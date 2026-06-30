import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import {
    FaArrowLeft,
    FaStar,
    FaTag,
    FaClock,
    FaMoneyBillWave,
    FaCheckCircle,
    FaTimesCircle,
    FaCut,
    FaRegHeart
} from "react-icons/fa";

import { dataAPI } from "../../services/dataAPI";

export default function ServicesDetail() {

    const { id } = useParams();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dataAPI.fetchServiceById(id)
            .then(setService)
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return <div className="w-full h-screen flex items-center justify-center bg-[#0f0f17] text-white">Memuat service...</div>;
    }

    // NOT FOUND
    if (!service) {

        return (

            <div className="
                w-full
                h-screen
                flex items-center justify-center
                px-5
                bg-[#0f0f17]
                text-white
            ">

                <div className="
                    w-full max-w-md
                    bg-[#1b1b24]
                    border border-[#242335]
                    rounded-[28px]
                    p-8
                    text-center
                ">

                    <div className="
                        w-16 h-16
                        rounded-full
                        bg-red-500/10
                        text-red-400
                        flex items-center justify-center
                        text-3xl
                        mx-auto mb-4
                    ">
                        <FaTimesCircle />
                    </div>

                    <h1 className="text-2xl font-black mb-2">
                        Service Not Found
                    </h1>

                    <p className="text-[#8e8e9f] text-sm mb-6">
                        Data service tidak ditemukan pada sistem GroomGold.
                    </p>

                    <Link
                        to="/services"
                        className="
                            inline-flex items-center justify-center gap-2
                            w-full
                            bg-[#dfb34c]
                            text-[#111116]
                            font-black
                            py-3
                            rounded-2xl
                            hover:opacity-90
                            transition-all duration-300
                        "
                    >
                        <FaArrowLeft />
                        Back To Services
                    </Link>

                </div>

            </div>

        );

    }

    return (

        <div className="
            w-full
            h-screen
            overflow-hidden
            bg-[#0f0f17]
            text-white
            flex flex-col
            px-4 lg:px-6
            py-4
            gap-3
        ">

            {/* HEADER */}
            <div className="
                flex flex-col lg:flex-row
                lg:items-center
                justify-between
                gap-3
                bg-[#1b1b24]
                border border-[#242335]
                rounded-[20px]
                px-5 py-3
                flex-shrink-0
            ">

                <div>

                    {/* BREADCRUMB */}
                    <div className="
                        flex items-center gap-2
                        text-xs
                        text-[#8e8e9f]
                        mb-1
                    ">
                        <Link to="/" className="hover:text-[#dfb34c] transition">
                            Dashboard
                        </Link>
                        <span>/</span>
                        <Link to="/services" className="hover:text-[#dfb34c] transition">
                            Services
                        </Link>
                        <span>/</span>
                        <span className="text-white font-semibold">Detail</span>
                    </div>

                    {/* TITLE */}
                    <h1 className="text-xl lg:text-2xl font-black">
                        Service
                        <span className="text-[#dfb34c]"> Details</span>
                    </h1>

                </div>

                {/* BUTTON */}
                <Link
                    to="/services"
                    className="
                        inline-flex items-center gap-2
                        bg-[#242335]
                        border border-[#323244]
                        hover:border-[#dfb34c]/20
                        hover:bg-[#2c2c3d]
                        px-4 py-2
                        rounded-xl
                        text-xs
                        font-bold
                        transition-all duration-300
                        w-fit
                    "
                >
                    <FaArrowLeft />
                    Back To Services
                </Link>

            </div>

            {/* MAIN CARD */}
            <div className="
                flex-1
                min-h-0
                bg-[#1b1b24]
                border border-[#242335]
                rounded-[24px]
                overflow-hidden
                grid grid-cols-1 lg:grid-cols-12
            ">

                {/* LEFT — IMAGE */}
                <div className="
                    lg:col-span-5
                    relative
                    overflow-hidden
                    border-b lg:border-b-0
                    lg:border-r border-[#242335]
                    bg-[#14141d]
                ">

                    <div className="relative w-full h-full min-h-[200px] group">

                        <img
                            src={`/img/services/${service.gambar}`}
                            alt={service.nama_service}
                            className="
                                w-full h-full
                                object-cover
                                group-hover:scale-105
                                transition-all duration-500
                            "
                        />

                        {/* OVERLAY */}
                        <div className="
                            absolute inset-0
                            bg-gradient-to-t
                            from-black/70
                            via-black/20
                            to-transparent
                        " />

                        {/* STATUS */}
                        <div className="absolute top-4 left-4">
                            <span className={`
                                inline-flex items-center gap-2
                                px-3 py-1.5
                                rounded-full
                                text-[9px]
                                uppercase
                                tracking-[1px]
                                font-black
                                ${service.status === "Aktif"
                                    ? "bg-green-500/15 text-green-400 border border-green-500/20"
                                    : "bg-red-500/15 text-red-400 border border-red-500/20"
                                }
                            `}>
                                {service.status === "Aktif"
                                    ? <FaCheckCircle />
                                    : <FaTimesCircle />
                                }
                                {service.status}
                            </span>
                        </div>

                        {/* FAVORITE */}
                        <button className="
                            absolute top-4 right-4
                            w-9 h-9
                            rounded-xl
                            bg-[#1b1b24]/90
                            border border-[#323244]
                            flex items-center justify-center
                            text-gray-400
                            hover:text-pink-400
                            hover:border-pink-400/20
                            transition-all duration-300
                        ">
                            <FaRegHeart />
                        </button>

                    </div>

                </div>

                {/* RIGHT — CONTENT */}
                <div className="
                    lg:col-span-7
                    p-4 lg:p-5
                    flex flex-col justify-between
                    min-h-0
                    overflow-hidden
                ">

                    <div>

                        {/* CATEGORY */}
                        <div className="
                            inline-flex items-center gap-2
                            bg-[#dfb34c]/10
                            text-[#dfb34c]
                            px-3 py-1.5
                            rounded-full
                            text-[9px]
                            font-black
                            uppercase
                            tracking-[1px]
                            mb-3
                        ">
                            <FaTag className="text-[9px]" />
                            {service.kategori}
                        </div>

                        {/* TITLE */}
                        <h2 className="
                            text-2xl lg:text-3xl
                            font-black
                            leading-tight
                            mb-2
                        ">
                            {service.nama_service}
                        </h2>

                        {/* DESCRIPTION */}
                        <p className="
                            text-[#8e8e9f]
                            text-sm
                            leading-relaxed
                            mb-3
                        ">
                            Premium haircut & grooming service dari GroomGold
                            dengan kualitas barber profesional dan hasil stylish
                            modern untuk penampilan terbaik.
                        </p>

                        {/* RATING */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="
                                flex items-center gap-1
                                bg-yellow-500/10
                                px-3 py-1.5
                                rounded-lg
                            ">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className="text-yellow-400 text-xs" />
                                ))}
                            </div>
                            <span className="text-xs font-bold">5.0 Rating</span>
                            <span className="
                                text-xs
                                text-[#8e8e9f]
                                border-l border-[#323244]
                                pl-3
                            ">
                                Premium Service
                            </span>
                        </div>

                        {/* INFO GRID */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                            <InfoCard
                                icon={<FaCut />}
                                title="Service Type"
                                value={service.nama_service}
                                iconBg="bg-[#dfb34c]/10"
                                iconColor="text-[#dfb34c]"
                            />

                            <InfoCard
                                icon={<FaClock />}
                                title="Duration"
                                value={`${service.durasi} Minutes`}
                                iconBg="bg-purple-500/10"
                                iconColor="text-purple-400"
                            />

                            <InfoCard
                                icon={<FaMoneyBillWave />}
                                title="Price"
                                value={`Rp ${service.harga.toLocaleString()}`}
                                iconBg="bg-green-500/10"
                                iconColor="text-green-400"
                            />

                            <InfoCard
                                icon={<FaCheckCircle />}
                                title="Availability"
                                value={
                                    service.status === "Aktif"
                                        ? "Ready Booking"
                                        : "Unavailable"
                                }
                                iconBg="bg-pink-500/10"
                                iconColor="text-pink-400"
                            />

                        </div>

                    </div>

                    {/* BOTTOM */}
                    <div className="
                        mt-4
                        pt-4
                        border-t border-[#242335]
                        flex flex-col sm:flex-row
                        items-center gap-4
                    ">

                        {/* PRICE */}
                        <div className="flex-1 w-full">
                            <p className="text-[#8e8e9f] text-xs mb-1">
                                Starting Price
                            </p>
                            <h1 className="text-2xl lg:text-3xl font-black text-[#dfb34c]">
                                Rp {service.harga.toLocaleString()}
                            </h1>
                        </div>

                        {/* BUTTON */}
                        <button className="
                            w-full sm:w-auto
                            flex items-center justify-center gap-2
                            bg-[#dfb34c]
                            hover:opacity-90
                            text-[#111116]
                            px-6 py-3
                            rounded-xl
                            font-black
                            text-sm
                            transition-all duration-300
                            shadow-[0_8px_24px_rgba(223,179,76,0.15)]
                        ">
                            <FaCut />
                            Book Service
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

// INFO CARD
function InfoCard({ icon, title, value, iconBg, iconColor }) {

    return (

        <div className="
            flex items-center gap-3
            bg-[#14141d]
            border border-[#242335]
            rounded-xl
            p-3
            hover:border-[#dfb34c]/10
            transition-all duration-300
        ">

            <div className={`
                w-10 h-10
                rounded-xl
                flex items-center justify-center
                text-sm
                flex-shrink-0
                ${iconBg}
                ${iconColor}
            `}>
                {icon}
            </div>

            <div>
                <p className="
                    text-[9px]
                    uppercase
                    tracking-[2px]
                    text-[#8e8e9f]
                    font-bold
                    mb-0.5
                ">
                    {title}
                </p>
                <h4 className="text-sm font-black leading-tight">
                    {value}
                </h4>
            </div>

        </div>

    );

}
