import { useParams, Link } from "react-router-dom";

import {
    FaArrowLeft,
    FaUserCircle,
    FaClock,
    FaMoneyBillWave,
    FaCheckCircle,
    FaTimesCircle,
    FaCalendarAlt,
    FaCut,
    FaUserTie,
    FaStar,
    FaRegHeart
} from "react-icons/fa";

import dataBooking from "../data/databooking.json";

export default function BookingDetail() {

    const { id } = useParams();

    const booking = dataBooking.find(
        (item) => item.id_booking.toString() === id
    );

    // NOT FOUND
    if (!booking) {

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
                        Booking Not Found
                    </h1>

                    <p className="text-[#8e8e9f] text-sm mb-6">
                        Data booking tidak ditemukan pada sistem GroomGold.
                    </p>

                    <Link
                        to="/booking"
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
                        Back To Booking
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

                        <Link to="/booking" className="hover:text-[#dfb34c] transition">
                            Booking
                        </Link>

                        <span>/</span>

                        <span className="text-white font-semibold">
                            Detail
                        </span>

                    </div>

                    {/* TITLE */}
                    <h1 className="text-xl lg:text-2xl font-black">
                        Booking
                        <span className="text-[#dfb34c]"> Details</span>
                    </h1>

                </div>

                {/* BUTTON */}
                <Link
                    to="/booking"
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
                    Back To Booking
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

                {/* LEFT */}
                <div className="
                    lg:col-span-5
                    relative
                    overflow-hidden
                    border-b lg:border-b-0
                    lg:border-r border-[#242335]
                    bg-[#14141d]
                    flex items-center justify-center
                    p-8
                ">

                    <div className="w-full">

                        {/* ICON */}
                        <div className="
                            w-36 h-36
                            mx-auto
                            rounded-full
                            bg-[#242335]
                            border border-[#323244]
                            flex items-center justify-center
                            text-[#dfb34c]
                            text-7xl
                            mb-6
                        ">
                            <FaUserCircle />
                        </div>

                        {/* CUSTOMER */}
                        <div className="text-center">

                            <h2 className="
                                text-3xl
                                font-black
                                mb-2
                            ">
                                {booking.nama_customer}
                            </h2>

                            <p className="
                                text-sm
                                text-[#8e8e9f]
                                mb-6
                            ">
                                Premium GroomGold Customer
                            </p>

                            {/* STATUS */}
                            <span className={`
                                inline-flex items-center gap-2
                                px-4 py-2
                                rounded-full
                                text-xs
                                uppercase
                                tracking-[1px]
                                font-black
                                ${booking.status_booking === "Completed"
                                    ? "bg-green-500/15 text-green-400 border border-green-500/20"
                                    : booking.status_booking === "Pending"
                                        ? "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20"
                                        : "bg-red-500/15 text-red-400 border border-red-500/20"
                                }
                            `}>

                                {booking.status_booking === "Completed"
                                    ? <FaCheckCircle />
                                    : booking.status_booking === "Pending"
                                        ? <FaClock />
                                        : <FaTimesCircle />
                                }

                                {booking.status_booking}

                            </span>

                        </div>

                    </div>

                    {/* FAVORITE */}
                    <button className="
                        absolute top-4 right-4
                        w-10 h-10
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

                {/* RIGHT */}
                <div className="
                    lg:col-span-7
                    p-5
                    flex flex-col justify-between
                    overflow-hidden
                ">

                    <div>

                        {/* BADGE */}
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
                            <FaCalendarAlt className="text-[9px]" />
                            Booking Schedule
                        </div>

                        {/* TITLE */}
                        <h2 className="
                            text-2xl lg:text-3xl
                            font-black
                            leading-tight
                            mb-2
                        ">
                            {booking.layanan}
                        </h2>

                        {/* DESCRIPTION */}
                        <p className="
                            text-[#8e8e9f]
                            text-sm
                            leading-relaxed
                            mb-4
                        ">
                            Booking layanan premium GroomGold dengan barber
                            profesional dan pengalaman grooming modern terbaik.
                        </p>

                        {/* RATING */}
                        <div className="flex items-center gap-3 mb-5">

                            <div className="
                                flex items-center gap-1
                                bg-yellow-500/10
                                px-3 py-1.5
                                rounded-lg
                            ">

                                {[...Array(5)].map((_, i) => (
                                    <FaStar
                                        key={i}
                                        className="text-yellow-400 text-xs"
                                    />
                                ))}

                            </div>

                            <span className="text-xs font-bold">
                                5.0 Booking Rating
                            </span>

                        </div>

                        {/* INFO GRID */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                            <InfoCard
                                icon={<FaUserCircle />}
                                title="Customer"
                                value={booking.nama_customer}
                                iconBg="bg-[#dfb34c]/10"
                                iconColor="text-[#dfb34c]"
                            />

                            <InfoCard
                                icon={<FaUserTie />}
                                title="Barber"
                                value={booking.barber}
                                iconBg="bg-purple-500/10"
                                iconColor="text-purple-400"
                            />

                            <InfoCard
                                icon={<FaCut />}
                                title="Service"
                                value={booking.layanan}
                                iconBg="bg-pink-500/10"
                                iconColor="text-pink-400"
                            />

                            <InfoCard
                                icon={<FaClock />}
                                title="Schedule"
                                value={booking.jadwal}
                                iconBg="bg-blue-500/10"
                                iconColor="text-blue-400"
                            />

                        </div>

                    </div>

                    {/* BOTTOM */}
                    <div className="
                        mt-5
                        pt-5
                        border-t border-[#242335]
                        flex flex-col sm:flex-row
                        items-center gap-4
                    ">

                        {/* PRICE */}
                        <div className="flex-1 w-full">

                            <p className="text-[#8e8e9f] text-xs mb-1">
                                Total Payment
                            </p>

                            <h1 className="
                                text-2xl lg:text-3xl
                                font-black
                                text-[#dfb34c]
                            ">
                                Rp {booking.harga.toLocaleString()}
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
                            <FaCheckCircle />
                            Confirm Booking
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

// INFO CARD
function InfoCard({
    icon,
    title,
    value,
    iconBg,
    iconColor
}) {

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

                <h4 className="
                    text-sm
                    font-black
                    leading-tight
                ">
                    {value}
                </h4>

            </div>

        </div>

    );

}