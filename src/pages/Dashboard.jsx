import {
    FaCut,
    FaTimesCircle,
    FaDollarSign,
    FaUsers,
    FaCalendarAlt,
    FaChartLine,
    FaWallet,
    FaCoins
} from "react-icons/fa";

import {
    PieChart,
    Pie,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    Cell,
    CartesianGrid,
    BarChart,
    Bar
} from "recharts";

import { useState, useEffect } from "react";

import Container from "../components/Container";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import MiniCard from "../components/MiniCard";
import Footer from "../components/Footer";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import StatsCard from "../components/StatsCard";
import UserCard from "../components/UserCard";
import ChartCard from "../components/ChartCard";

export default function Dashboard() {

    const [stats, setStats] = useState({
        customers: 800,
        members: 520,
        booking: 1245,
        revenue: 7500,
        active: 650,
        inactive: 150,
    });

    // LINE CHART
    const lineData = [
        { name: "Jan", value: 120 },
        { name: "Feb", value: 145 },
        { name: "Mar", value: 180 },
        { name: "Apr", value: 220 },
        { name: "Mei", value: 250 },
        { name: "Jun", value: 280 },
        { name: "Jul", value: 310 },
    ];

    // PIE CHART
    const statsData = [
        {
            name: "Silver",
            value: 300,
            color: "#BE9359"
        },
        {
            name: "Gold",
            value: 180,
            color: "#E9C664"
        },
        {
            name: "Platinum",
            value: 40,
            color: "#FFFFFF"
        },
        {
            name: "Non Member",
            value: 280,
            color: "#979797"
        },
    ];

    // BAR CHART
    const barData = [
        {
            name: "Cash",
            value: 320,
            color: "#BE9359"
        },
        {
            name: "QRIS",
            value: 480,
            color: "#E9C664"
        }
    ];

    useEffect(() => {

        const interval = setInterval(() => {

            setStats((prev) => ({
                ...prev,
                booking: prev.booking + 1,
            }));

        }, 8000);

        return () => clearInterval(interval);

    }, []);

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
                    title="Dashboard"
                    breadcrumb={["Home", "Dashboard"]}
                >

                    <div className="
                        flex items-center gap-2
                        bg-[#1b1b24]
                        px-4 py-2
                        rounded-xl
                        border border-[#242335]
                        text-xs text-gray-400
                    ">

                        <span>
                            01.06.2023 - 31.06.2023
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
                            Admin Dashboard
                        </p>

                    </div>

                </div>

                {/* STATS CARD */}
                <div className="
                    grid grid-cols-1
                    md:grid-cols-3
                    gap-4
                    mb-6
                ">

                    <StatsCard
                        title="Total Customer"
                        value="800"
                    />

                    <StatsCard
                        title="Total Member"
                        value="520"
                    />

                    <StatsCard
                        title="Total Booking"
                        value="1245"
                    />

                </div>

                {/* GRID */}
                <div className="
                    grid grid-cols-1
                    xl:grid-cols-3
                    gap-7
                ">

                    {/* LEFT */}
                    <div className="xl:col-span-2 space-y-6">

                        {/* TOP CARD */}
                        <div className="
                            grid grid-cols-1
                            sm:grid-cols-2
                            xl:grid-cols-4
                            gap-4
                        ">

                            <Card
                                title="Customer Aktif"
                                value={stats.active}
                                subValue="81%"
                                icon={<FaUsers />}
                            />

                            <Card
                                title="Customer Nonaktif"
                                value={stats.inactive}
                                subValue="19%"
                                icon={<FaTimesCircle />}
                            />

                            <Card
                                title="Total Member"
                                value={stats.members}
                                subValue="65%"
                                icon={<FaUsers />}
                            />

                            <Card
                                title="Revenue"
                                value={`Rp ${stats.revenue.toLocaleString()}`}
                                subValue="+12%"
                                icon={<FaDollarSign />}
                            />

                        </div>

                        {/* SALES */}
                        <ChartCard title="Booking Bulanan">

                            <div className="
                                flex justify-between
                                items-center
                                mb-6
                            ">

                                <h2 className="
                                    text-lg
                                    font-bold
                                    flex items-center gap-2
                                ">

                                    <FaChartLine className="text-[#dfb34c]" />

                                    Booking Bulanan

                                </h2>

                            </div>

                            <div className="w-full h-[320px]">

                                <ResponsiveContainer
                                    width="100%"
                                    height="100%"
                                >

                                    <AreaChart data={lineData}>

                                        <defs>

                                            <linearGradient
                                                id="colorVal"
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                            >

                                                <stop
                                                    offset="5%"
                                                    stopColor="#dfb34c"
                                                    stopOpacity={0.4}
                                                />

                                                <stop
                                                    offset="95%"
                                                    stopColor="#dfb34c"
                                                    stopOpacity={0}
                                                />

                                            </linearGradient>

                                        </defs>

                                        <CartesianGrid
                                            vertical={false}
                                            stroke="rgba(255,255,255,0.05)"
                                        />

                                        <XAxis dataKey="name" />

                                        <YAxis />

                                        <Tooltip />

                                        <Area
                                            type="monotone"
                                            dataKey="value"
                                            stroke="#dfb34c"
                                            fill="url(#colorVal)"
                                            strokeWidth={4}
                                        />

                                    </AreaChart>

                                </ResponsiveContainer>

                            </div>

                        </ChartCard>

                    </div>

                    {/* RIGHT */}
                    <div className="space-y-6">

                        {/* USERS */}
                        <div className="
                            bg-[#1b1b24]
                            rounded-3xl
                            border border-[#242335]
                            p-6
                        ">

                            <div className="
                                flex justify-between
                                items-center
                                mb-5
                            ">

                                <h2 className="
                                    text-xl
                                    font-bold
                                ">
                                    Membership Distribution
                                </h2>

                                <Badge type="warning">
                                    LIVE
                                </Badge>

                            </div>

                            <div className="
                                h-[300px]
                                relative
                            ">

                                <ResponsiveContainer
                                    width="100%"
                                    height="100%"
                                >

                                    <PieChart>

                                        <Pie
                                            data={statsData}
                                            dataKey="value"
                                            innerRadius={80}
                                            outerRadius={110}
                                        >

                                            {statsData.map((item, index) => (

                                                <Cell
                                                    key={index}
                                                    fill={item.color}
                                                />

                                            ))}

                                        </Pie>

                                    </PieChart>

                                </ResponsiveContainer>

                            </div>

                        </div>

                        {/* MINI CARD */}
                        <MiniCard
                            title="Paid Invoices"
                            value="$565614"
                            sub="Current financial state"
                            icon={
                                <FaWallet className="text-indigo-400" />
                            }
                            progressColor="#c0a9df"
                        />

                        <MiniCard
                            title="Funds Received"
                            value="$425634"
                            sub="Current financial state"
                            icon={
                                <FaCoins className="text-emerald-400" />
                            }
                            progressColor="#a1dfb1"
                        />

                        {/* USER CARD */}
                        <UserCard
                            name="Budi Santoso"
                            role="Barber Specialist"
                        />

                        <UserCard
                            name="Siti Rahma"
                            role="Hair Stylist"
                        />

                    </div>

                </div>

                {/* BAR */}
                <div className="
                    mt-6
                    bg-[#1b1b24]
                    rounded-3xl
                    border border-[#242335]
                    p-6
                ">

                    <h2 className="
                        text-lg
                        font-bold
                        mb-5
                    ">
                        Profit & Loss
                    </h2>

                    <div className="h-[250px]">

                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >

                            <BarChart data={barData}>

                                <XAxis dataKey="name" />

                                <YAxis />

                                <Tooltip />

                                <Bar
                                    dataKey="value"
                                    radius={[12, 12, 0, 0]}
                                >

                                    {barData.map((entry, index) => (

                                        <Cell
                                            key={index}
                                            fill={entry.color}
                                        />

                                    ))}

                                </Bar>

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                </div>

                {/* FOOTER */}
                <Footer />

            </Container>

        </div>

    );

}