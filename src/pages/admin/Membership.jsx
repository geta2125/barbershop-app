import {
    FaSearch,
    FaPlus,
    FaCrown,
    FaGift,
    FaEye,
    FaCalendarAlt
} from "react-icons/fa";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { dataAPI } from "../../services/dataAPI";

import Container from "../../components/Container";
import PageHeader from "../../components/PageHeader";
import EmptyState from "../../components/EmptyState";
import Table from "../../components/Table";

export default function Membership() {

    const [search, setSearch] = useState("");
    const [memberships, setMemberships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        dataAPI.fetchMemberships()
            .then(setMemberships)
            .catch((err) => setError(err.message || "Gagal memuat membership."))
            .finally(() => setLoading(false));
    }, []);

    const filtered = memberships.filter(member =>
        member.Nama_Lengkap
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const stats = [
        {
            label: "Total Member",
            value: memberships.length,
            accent: "text-white"
        },
        {
            label: "Silver",
            value: memberships.filter(
                m => m.Level_Membership === "Silver"
            ).length,
            accent: "text-gray-300"
        },
        {
            label: "Gold",
            value: memberships.filter(
                m => m.Level_Membership === "Gold"
            ).length,
            accent: "text-yellow-400"
        },
        {
            label: "Platinum",
            value: memberships.filter(
                m => m.Level_Membership === "Platinum"
            ).length,
            accent: "text-cyan-400"
        }
    ];

    return (
        <div className="w-full min-h-screen bg-[#080807] text-[#D3CDC3]">

            <Container>

                <PageHeader
                    title="Membership"
                    breadcrumb={[
                        "Dashboard",
                        "Membership"
                    ]}
                >
                    <div className="flex items-center gap-2 bg-[#0D0C0B] border border-white/5 px-4 py-2 rounded-xl">
                        <FaCrown className="text-[#A87C2D]" />
                        <span className="text-xs">
                            Membership Program
                        </span>
                    </div>
                </PageHeader>

                {error && <div className="mb-4 text-sm text-red-400">{error}</div>}
                {loading && <div className="mb-4 text-sm text-white/40">Memuat membership...</div>}

                {/* STATS */}

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">

                    {stats.map((s) => (

                        <div
                            key={s.label}
                            className="bg-[#0D0C0B] border border-white/5 rounded-2xl px-5 py-4"
                        >
                            <p className="text-[10px] uppercase tracking-widest text-white/30">
                                {s.label}
                            </p>

                            <h3 className={`text-3xl font-black ${s.accent}`}>
                                {s.value}
                            </h3>

                        </div>

                    ))}

                </div>

                {/* ACTION */}

                <div className="flex justify-between items-center mb-6 gap-3">

                    <button
                        className="
                        flex items-center gap-2
                        bg-[#A87C2D]
                        hover:bg-[#c49435]
                        px-5 py-3
                        rounded-xl
                        text-white
                        font-semibold
                    "
                    >
                        <FaPlus />
                        Tambah Membership
                    </button>

                    <div className="relative">

                        <FaSearch
                            className="
                            absolute left-3 top-1/2
                            -translate-y-1/2
                            text-white/20
                        "
                        />

                        <input
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            placeholder="Cari member..."
                            className="
                            pl-10 pr-4 py-3
                            bg-[#0D0C0B]
                            border border-white/10
                            rounded-xl
                            text-sm
                        "
                        />

                    </div>

                </div>

                {/* TABLE */}

                <div className="bg-[#0D0C0B] border border-white/5 rounded-2xl overflow-hidden">

                    <div className="px-6 py-4 border-b border-white/5">

                        <h3 className="text-xs uppercase tracking-widest text-white/50">
                            Membership List
                        </h3>

                    </div>

                    <Table
                        headers={[
                            "Member",
                            "Level",
                            "Points",
                            "Redeem",
                            "Join Date",
                            "Status",
                            ""
                        ]}
                    >

                        {filtered.map((member) => (

                            <tr
                                key={member.ID_Membership}
                                className="
                                border-b border-white/5
                                hover:bg-white/[0.02]
                            "
                            >

                                <td className="px-5 py-4">

                                    {member.Nama_Lengkap}

                                </td>

                                <td className="px-5 py-4">

                                    <span
                                        className="
                                        px-3 py-1
                                        rounded-full
                                        text-xs
                                        bg-[#A87C2D]/10
                                        text-[#A87C2D]
                                    "
                                    >
                                        {member.Level_Membership}
                                    </span>

                                </td>

                                <td className="px-5 py-4">

                                    {(member.Total_Poin || 0).toLocaleString()}

                                </td>

                                <td className="px-5 py-4">

                                    <div className="flex items-center gap-2">

                                        <FaGift
                                            className="
                                            text-[#A87C2D]
                                        "
                                        />

                                        {member.Total_Redeem}

                                    </div>

                                </td>

                                <td className="px-5 py-4">

                                    <div className="flex items-center gap-2">

                                        <FaCalendarAlt />

                                        {member.Tanggal_Daftar}

                                    </div>

                                </td>

                                <td className="px-5 py-4">

                                    <span
                                        className={`
                                            px-3 py-1
                                            rounded-full
                                            text-xs
                                            ${
                                                member.Status_Member === "Aktif"
                                                ? "bg-green-500/10 text-green-400"
                                                : "bg-red-500/10 text-red-400"
                                            }
                                        `}
                                    >
                                        {member.Status_Member}
                                    </span>

                                </td>

                                <td className="px-5 py-4">

                                    <Link
                                        to={`/membership/${member.ID_Membership}`}
                                        className="
                                        px-3 py-2
                                        border border-white/10
                                        rounded-lg
                                        hover:border-[#A87C2D]
                                        hover:text-[#A87C2D]
                                        inline-flex
                                    "
                                    >

                                        <FaEye />

                                    </Link>

                                </td>

                            </tr>

                        ))}

                    </Table>

                    {filtered.length === 0 && (

                        <EmptyState
                            title="Membership tidak ditemukan"
                        />

                    )}

                </div>

            </Container>

        </div>
    );
}
