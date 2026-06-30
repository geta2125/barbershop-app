import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import {
    FaArrowLeft,
    FaCrown,
    FaGift,
    FaCoins,
    FaCalendarAlt,
    FaAward,
    FaCheckCircle,
    FaEnvelope,
    FaPhoneAlt,
    FaUserCircle,
    FaWallet,
    FaExchangeAlt
} from "react-icons/fa";

import { dataAPI } from "../../services/dataAPI";

import Container from "../../components/Container";
import Footer from "../../components/Footer";

export default function MembershipDetail() {

    const { id } = useParams();

    const [member, setMember] = useState(null);

    useEffect(() => {

        dataAPI.fetchMembershipById(id).then(setMember);

    }, [id]);

    if (!member) {

        return (
            <div className="
                min-h-screen
                bg-[#0f0f17]
                flex
                items-center
                justify-center
                text-white
            ">
                Membership Not Found
            </div>
        );

    }

    const progress =
        Math.min(
            (member.Total_Poin / 5000) * 100,
            100
        );

    return (

        <div className="
            min-h-screen
            bg-[#0f0f17]
            text-gray-100
        ">

            <Container py="py-8">

                {/* BACK BUTTON */}

                <Link
                    to="/membership"
                    className="
                        inline-flex
                        items-center
                        gap-2
                        mb-6
                        text-gray-400
                        hover:text-[#dfb34c]
                        transition
                    "
                >
                    <FaArrowLeft />
                    Kembali
                </Link>

                {/* MEMBERSHIP CARD */}

                <div className="
                    bg-gradient-to-r
                    from-[#A87C2D]
                    to-[#dfb34c]
                    rounded-3xl
                    p-8
                    text-black
                    mb-8
                    shadow-xl
                ">

                    <FaCrown className="text-5xl mb-4" />

                    <h1 className="text-4xl font-black">
                        {member.Nama_Lengkap}
                    </h1>

                    <p className="font-semibold text-lg">
                        {member.Level_Membership} Member
                    </p>

                    <div className="
                        grid
                        grid-cols-2
                        gap-6
                        mt-8
                    ">

                        <div>

                            <p className="text-xs uppercase">
                                Membership ID
                            </p>

                            <h3 className="font-bold text-xl">
                                #{member.ID_Membership}
                            </h3>

                        </div>

                        <div>

                            <p className="text-xs uppercase">
                                Member Since
                            </p>

                            <h3 className="font-bold text-xl">
                                {member.Tanggal_Daftar}
                            </h3>

                        </div>

                    </div>

                </div>

                {/* PROFILE + INFO */}

                <div className="
                    grid
                    lg:grid-cols-3
                    gap-6
                    mb-8
                ">

                    {/* PROFILE */}

                    <div className="
                        bg-[#1b1b24]
                        border
                        border-[#242335]
                        rounded-2xl
                        p-6
                    ">

                        <div className="
                            w-24
                            h-24
                            mx-auto
                            rounded-2xl
                            bg-[#242335]
                            flex
                            items-center
                            justify-center
                            text-[#dfb34c]
                            text-5xl
                            mb-4
                        ">
                            <FaUserCircle />
                        </div>

                        <h2 className="
                            text-center
                            text-xl
                            font-bold
                        ">
                            {member.Nama_Lengkap}
                        </h2>

                        <div className="
                            mt-6
                            space-y-4
                        ">

                            <div className="flex items-center gap-3">
                                <FaEnvelope className="text-[#dfb34c]" />
                                <span>{member.Email}</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaPhoneAlt className="text-[#dfb34c]" />
                                <span>{member.No_HP}</span>
                            </div>

                            <div>

                                <span className="
                                    inline-block
                                    bg-green-500/10
                                    border
                                    border-green-500/20
                                    text-green-400
                                    px-3
                                    py-1
                                    rounded-full
                                    text-xs
                                ">
                                    {member.Status_Member}
                                </span>

                            </div>

                        </div>

                    </div>

                    {/* INFO */}

                    <div className="
                        lg:col-span-2
                        bg-[#1b1b24]
                        border
                        border-[#242335]
                        rounded-2xl
                        p-6
                    ">

                        <h3 className="
                            text-xl
                            font-bold
                            mb-6
                        ">
                            Membership Information
                        </h3>

                        <div className="
                            grid
                            md:grid-cols-2
                            gap-6
                        ">

                            <div>

                                <p className="text-gray-500 text-sm">
                                    Membership Level
                                </p>

                                <h4 className="
                                    text-2xl
                                    font-black
                                    text-[#dfb34c]
                                ">
                                    {member.Level_Membership}
                                </h4>

                            </div>

                            <div>

                                <p className="text-gray-500 text-sm">
                                    Total Pengeluaran
                                </p>

                                <h4 className="
                                    text-2xl
                                    font-black
                                    text-green-400
                                ">
                                    Rp {member.Total_Pengeluaran.toLocaleString("id-ID")}
                                </h4>

                            </div>

                            <div>

                                <p className="text-gray-500 text-sm">
                                    Member Since
                                </p>

                                <h4 className="font-bold">
                                    {member.Tanggal_Daftar}
                                </h4>

                            </div>

                            <div>

                                <p className="text-gray-500 text-sm">
                                    Membership Status
                                </p>

                                <h4 className="font-bold">
                                    {member.Status_Member}
                                </h4>

                            </div>

                        </div>

                    </div>

                </div>

                {/* STATS */}

                <div className="
                    grid
                    md:grid-cols-3
                    gap-4
                    mb-8
                ">

                    <div className="
                        bg-[#1b1b24]
                        border border-[#242335]
                        rounded-2xl
                        p-6
                    ">
                        <FaCoins className="text-[#dfb34c] text-3xl mb-3" />

                        <p className="text-gray-400 text-sm">
                            Total Poin
                        </p>

                        <h2 className="text-3xl font-black">
                            {member.Total_Poin}
                        </h2>
                    </div>

                    <div className="
                        bg-[#1b1b24]
                        border border-[#242335]
                        rounded-2xl
                        p-6
                    ">
                        <FaGift className="text-[#dfb34c] text-3xl mb-3" />

                        <p className="text-gray-400 text-sm">
                            Total Redeem
                        </p>

                        <h2 className="text-3xl font-black">
                            {member.Total_Redeem}
                        </h2>
                    </div>

                    <div className="
                        bg-[#1b1b24]
                        border border-[#242335]
                        rounded-2xl
                        p-6
                    ">
                        <FaExchangeAlt className="text-[#dfb34c] text-3xl mb-3" />

                        <p className="text-gray-400 text-sm">
                            Total Kunjungan
                        </p>

                        <h2 className="text-3xl font-black">
                            {member.Total_Kunjungan}
                        </h2>
                    </div>

                </div>

                {/* PROGRESS */}

                <div className="
                    bg-[#1b1b24]
                    border border-[#242335]
                    rounded-2xl
                    p-6
                    mb-8
                ">

                    <h3 className="font-bold mb-4">
                        Progress Membership
                    </h3>

                    <div className="
                        flex
                        justify-between
                        mb-2
                    ">
                        <span>{member.Level_Membership}</span>

                        <span>
                            {member.Total_Poin}/5000 poin
                        </span>
                    </div>

                    <div className="
                        h-3
                        bg-[#242335]
                        rounded-full
                        overflow-hidden
                    ">
                        <div
                            className="
                                h-full
                                bg-gradient-to-r
                                from-[#A87C2D]
                                to-[#dfb34c]
                            "
                            style={{
                                width: `${progress}%`
                            }}
                        />
                    </div>

                </div>

                {/* BENEFITS */}

                <div className="
                    bg-[#1b1b24]
                    border border-[#242335]
                    rounded-2xl
                    p-6
                    mb-8
                ">

                    <h3 className="
                        text-lg
                        font-bold
                        mb-5
                    ">
                        Membership Benefits
                    </h3>

                    <div className="space-y-3">

                        <div className="flex items-center gap-3">
                            <FaCheckCircle className="text-[#dfb34c]" />
                            Diskon Member
                        </div>

                        <div className="flex items-center gap-3">
                            <FaCheckCircle className="text-[#dfb34c]" />
                            Priority Booking
                        </div>

                        <div className="flex items-center gap-3">
                            <FaCheckCircle className="text-[#dfb34c]" />
                            Loyalty Point Bonus
                        </div>

                        <div className="flex items-center gap-3">
                            <FaCheckCircle className="text-[#dfb34c]" />
                            Birthday Voucher
                        </div>

                    </div>

                </div>

                {/* OVERVIEW */}

                <div className="
                    bg-[#1b1b24]
                    border border-[#242335]
                    rounded-2xl
                    p-6
                ">

                    <div className="
                        flex
                        items-center
                        gap-2
                        mb-4
                    ">

                        <FaAward className="text-[#dfb34c]" />

                        <h3 className="font-bold">
                            Membership Overview
                        </h3>

                    </div>

                    <p className="
                        text-gray-300
                        leading-relaxed
                    ">
                        Member ini berada pada level
                        <span className="text-[#dfb34c] font-bold">
                            {" "}{member.Level_Membership}{" "}
                        </span>

                        dengan total poin

                        <span className="font-bold">
                            {" "}{member.Total_Poin} poin
                        </span>.

                        Member berhak mendapatkan berbagai benefit eksklusif GroomGold seperti diskon layanan, loyalty point, priority booking dan reward membership.
                    </p>

                </div>

            </Container>

        </div>

    );

}
