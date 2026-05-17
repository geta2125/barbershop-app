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

export default function Dashboard() {

    const [stats, setStats] = useState({
        booking: 202,
        canceled: 56,
        revenue: 1498000,
        customers: 5614,
    });

    // LINE CHART
    const lineData = [
        { name: "FEB", value: 30 },
        { name: "MAR", value: 40 },
        { name: "APR", value: 35 },
        { name: "MAY", value: 55 },
        { name: "JUN", value: 50 },
        { name: "JUL", value: 70 },
        { name: "AUG", value: 65 },
        { name: "SEP", value: 80 },
        { name: "OCT", value: 78 },
        { name: "NOV", value: 95 },
        { name: "DEC", value: 120 },
    ];

    // PIE CHART
    const statsData = [
        { name: "User Type 1", value: stats.customers, color: "#dfb34c" },
        { name: "User Type 2", value: 1256, color: "#e1cc98" },
        { name: "User Type 3", value: 800, color: "#383747" },
    ];

    // BAR CHART
    const barData = [
        { name: "Expense", value: 450, color: "#e1cc98" },
        { name: "Revenue", value: 920, color: "#dfb34c" }
    ];

    useEffect(() => {

        const interval = setInterval(() => {

            setStats(prev => ({
                ...prev,
                booking: prev.booking + 1,
            }));

        }, 8000);

        return () => clearInterval(interval);

    }, []);

    return (

        <div className="w-full min-h-screen bg-[#0f0f17] text-white overflow-x-hidden">

            {/* WRAPPER */}
            <div className="w-full px-6 lg:px-10 py-8">

                {/* PAGE HEADER */}
                <PageHeader
                    title="Dashboard"
                    breadcrumb={["Home", "Dashboard", "Dashboard"]}
                >
                    <div className="flex items-center gap-2 bg-[#1b1b24] px-4 py-2 rounded-xl border border-[#242335] text-xs text-gray-400 cursor-pointer hover:bg-[#23232f] transition">
                        <span className="font-medium">
                            01.06.2023-31.06.2023
                        </span>

                        <FaCalendarAlt className="text-[#dfb34c] text-xs" />
                    </div>
                </PageHeader>

                {/* GRID */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                    {/* LEFT */}
                    <div className="xl:col-span-2 space-y-6">

                        {/* TOP CARDS */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

                            <Card
                                title="Order"
                                value={stats.booking}
                                subValue="$ 2.5"
                                icon={<FaCut />}
                            />

                            <Card
                                title="Approved"
                                value={stats.canceled}
                                subValue="$ 3.6"
                                icon={<FaTimesCircle />}
                            />

                            <Card
                                title="Month total"
                                value="25643"
                                subValue="$ 5.2"
                                icon={<FaUsers />}
                            />

                            <Card
                                title="Revenue"
                                value={`$ ${(stats.revenue / 1000).toLocaleString(undefined, {
                                    minimumFractionDigits: 0
                                })}`}
                                subValue="$ 3.6"
                                icon={<FaDollarSign />}
                            />

                        </div>

                        {/* SALES DYNAMICS */}
                        <div className="bg-[#1b1b24] rounded-3xl border border-[#242335] p-6">

                            <div className="flex justify-between items-center mb-6">

                                <h2 className="text-lg font-bold flex items-center gap-2">
                                    <FaChartLine className="text-[#dfb34c]" />
                                    Sales dynamics
                                </h2>

                                <select className="bg-[#111116] border border-[#242335] text-xs text-gray-400 rounded-xl px-4 py-2 outline-none">
                                    <option>2023</option>
                                    <option>2024</option>
                                </select>

                            </div>

                            <div className="w-full h-[320px]">

                                <ResponsiveContainer width="100%" height="100%">

                                    <AreaChart
                                        data={lineData}
                                        margin={{
                                            top: 10,
                                            right: 20,
                                            left: -20,
                                            bottom: 0
                                        }}
                                    >

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
                                                    stopOpacity={0.35}
                                                />

                                                <stop
                                                    offset="95%"
                                                    stopColor="#dfb34c"
                                                    stopOpacity={0}
                                                />

                                            </linearGradient>

                                        </defs>

                                        <CartesianGrid
                                            strokeDasharray="0"
                                            vertical={false}
                                            stroke="rgba(255,255,255,0.03)"
                                        />

                                        <XAxis
                                            dataKey="name"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{
                                                fill: "#7f7f8f",
                                                fontSize: 12
                                            }}
                                        />

                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{
                                                fill: "#7f7f8f",
                                                fontSize: 12
                                            }}
                                        />

                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: "#1b1b24",
                                                border: "1px solid #242335",
                                                borderRadius: "14px",
                                                color: "#fff"
                                            }}
                                        />

                                        <Area
                                            type="monotone"
                                            dataKey="value"
                                            stroke="#dfb34c"
                                            strokeWidth={4}
                                            fill="url(#colorVal)"
                                        />

                                    </AreaChart>

                                </ResponsiveContainer>

                            </div>

                        </div>

                    </div>

                    {/* RIGHT */}
                    <div className="space-y-6">

                        {/* USERS */}
                        <div className="bg-[#1b1b24] rounded-3xl border border-[#242335] p-6">

                            <div className="flex justify-between items-center mb-5">

                                <h2 className="text-xl font-bold">
                                    Users
                                </h2>

                                <span className="bg-[#dfb34c]/10 text-[#dfb34c] px-3 py-1 rounded-full text-xs uppercase">
                                    Live
                                </span>

                            </div>

                            <div className="h-[300px] relative">

                                <ResponsiveContainer width="100%" height="100%">

                                    <PieChart>

                                        <Pie
                                            data={statsData}
                                            innerRadius={80}
                                            outerRadius={110}
                                            paddingAngle={4}
                                            dataKey="value"
                                        >

                                            {statsData.map((entry, index) => (

                                                <Cell
                                                    key={index}
                                                    fill={entry.color}
                                                />

                                            ))}

                                        </Pie>

                                    </PieChart>

                                </ResponsiveContainer>

                                <div className="absolute inset-0 flex flex-col items-center justify-center">

                                    <span className="text-5xl font-black">
                                        {stats.customers}
                                    </span>

                                    <span className="text-xs text-gray-500 uppercase tracking-wider">
                                        Total User
                                    </span>

                                </div>

                            </div>

                            <div className="grid grid-cols-3 gap-4 border-t border-[#242335] pt-5">

                                {statsData.map((item, i) => (

                                    <div key={i}>

                                        <div className="flex items-center gap-2 mb-1">

                                            <div
                                                className="w-2.5 h-2.5 rounded-full"
                                                style={{
                                                    backgroundColor: item.color
                                                }}
                                            />

                                            <span className="text-xs text-gray-400">
                                                {item.name}
                                            </span>

                                        </div>

                                        <h3 className="font-bold text-sm">
                                            {item.value.toLocaleString()}
                                        </h3>

                                    </div>

                                ))}

                            </div>

                        </div>

                        {/* MINI CARDS */}
                        <MiniCard
                            title="Paid Invoices"
                            value="$565614"
                            sub="Current financial state"
                            icon={<FaWallet className="text-indigo-400" />}
                            progressColor="#c0a9df"
                        />

                        <MiniCard
                            title="Funds received"
                            value="$425634"
                            sub="Current financial state"
                            icon={<FaCoins className="text-emerald-400" />}
                            progressColor="#a1dfb1"
                        />

                    </div>

                </div>

                {/* PROFIT & LOSS */}
                <div className="mt-6 bg-[#1b1b24] rounded-3xl border border-[#242335] p-6">

                    <div className="flex justify-between items-center mb-5">

                        <h2 className="text-lg font-bold">
                            Profit & Loss
                        </h2>

                        <select className="bg-[#111116] border border-[#242335] text-xs text-gray-400 rounded-xl px-4 py-2 outline-none">
                            <option>2023</option>
                        </select>

                    </div>

                    <div className="h-[250px]">

                        <ResponsiveContainer width="100%" height="100%">

                            <BarChart data={barData}>

                                <XAxis
                                    dataKey="name"
                                    tick={{
                                        fill: "#7f7f8f",
                                        fontSize: 12
                                    }}
                                />

                                <YAxis
                                    tick={{
                                        fill: "#7f7f8f",
                                        fontSize: 12
                                    }}
                                />

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

            </div>

        </div>

    );
}

// PAGE HEADER
function PageHeader({ title, breadcrumb, children }) {

    return (

        <div className="mb-8">

            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5 bg-[#1b1b24] border border-[#242335] rounded-3xl px-8 py-7">

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

// CARD
function Card({ title, value, subValue, icon }) {

    return (

        <div className="bg-[#1b1b24] border border-[#242335] rounded-3xl p-6 hover:border-[#dfb34c]/20 transition duration-300">

            <div className="flex justify-between items-center mb-5">

                <span className="text-sm text-gray-400">
                    {title}
                </span>

                <div className="text-[#dfb34c] text-lg">
                    {icon}
                </div>

            </div>

            <h2 className="text-5xl font-black mb-2">
                {value}
            </h2>

            <p className="text-xs text-gray-500">
                {subValue}
            </p>

        </div>

    );
}

// MINI CARD
function MiniCard({
    title,
    value,
    sub,
    icon,
    progressColor
}) {

    return (

        <div className="bg-[#1b1b24] border border-[#242335] rounded-3xl p-6 flex justify-between items-center">

            <div>

                <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                    {icon}
                    <span>{title}</span>
                </div>

                <h3 className="text-3xl font-black">
                    {value}
                </h3>

                <p className="text-xs text-gray-500 mt-2">
                    {sub}
                </p>

            </div>

            <div className="w-14 h-14">

                <svg className="w-full h-full rotate-[-90deg]">

                    <circle
                        cx="28"
                        cy="28"
                        r="22"
                        className="stroke-[#111116]"
                        strokeWidth="5"
                        fill="transparent"
                    />

                    <circle
                        cx="28"
                        cy="28"
                        r="22"
                        stroke={progressColor}
                        strokeWidth="5"
                        fill="transparent"
                        strokeDasharray="138"
                        strokeDashoffset="40"
                        strokeLinecap="round"
                    />

                </svg>

            </div>

        </div>

    );
}