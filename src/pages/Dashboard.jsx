import {
    FaCut,
    FaUserTie,
    FaTimesCircle,
    FaDollarSign,
    FaUsers,
    FaPlus,
    FaCalendarAlt,
    FaChartLine,
    FaSearch,
    FaSun,
    FaMoon,
} from "react-icons/fa";

import {
    PieChart,
    Pie,
    XAxis,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    Cell,
    CartesianGrid,
} from "recharts";

import { useState, useEffect } from "react";

export default function Dashboard() {

    const [darkMode, setDarkMode] = useState(true);

    const [stats, setStats] = useState({
        booking: 75,
        barbers: 12,
        canceled: 10,
        revenue: 1280000,
        customers: 320,
    });

    const lineData = [
        { name: "Sun", value: 10 },
        { name: "Mon", value: 20 },
        { name: "Tue", value: 35 },
        { name: "Wed", value: 20 },
        { name: "Thu", value: 15 },
        { name: "Fri", value: 25 },
        { name: "Sat", value: stats.booking },
    ];

    const statsData = [
        { name: "Bookings", value: stats.booking, color: "#7A1F2D" },
        { name: "Customers", value: stats.customers, color: "#D3CDC3" },
        { name: "Canceled", value: stats.canceled, color: "#3a3a3a" },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => ({
                ...prev,
                booking: prev.booking + 1,
                revenue: prev.revenue + 30000,
            }));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`
            ${darkMode ? "bg-[#0f0f0f] text-white" : "bg-gray-100"}
            ml-[260px] pt-[120px] px-7 pb-7 min-h-screen
        `}>

            {/* HEADER */}
            <div className="mb-8 flex justify-between items-center flex-wrap gap-4">

                <div>
                    <h1 className="text-3xl font-bold">
                        Dashboard
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Overview & Analytics
                    </p>
                </div>

                <div className="flex items-center gap-3">

                    {/* DARK MODE */}
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2 bg-[#1a1a1a] border border-white/10 rounded-lg"
                    >
                        {darkMode ? <FaSun /> : <FaMoon />}
                    </button>

                    {/* BUTTON */}
                    <button className="
                        flex items-center gap-2 
                        bg-[#7A1F2D] px-5 py-2.5 
                        rounded-lg font-semibold
                        hover:bg-[#912535]
                        shadow-lg shadow-[#7A1F2D]/20
                    ">
                        <FaPlus />
                        Booking
                    </button>

                </div>
            </div>

            {/* CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">

                <Card title="BOOKING" value={stats.booking} icon={<FaCut />} primary />
                <Card title="BARBERS" value={stats.barbers} icon={<FaUserTie />} />
                <Card title="CANCELED" value={stats.canceled} icon={<FaTimesCircle />} />
                <Card title="REVENUE" value={`Rp ${(stats.revenue / 1000).toLocaleString()}k`} icon={<FaDollarSign />} highlight />
                <Card title="CUSTOMERS" value={stats.customers} icon={<FaUsers />} />

            </div>

            {/* CHART */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* AREA */}
                <div className="lg:col-span-2 bg-[#1a1a1a] rounded-2xl border border-white/10 p-6">

                    <div className="flex justify-between mb-4">
                        <h2 className="flex items-center gap-2">
                            <FaChartLine /> Weekly Performance
                        </h2>
                        <span className="text-xs text-gray-400">Last 7 days</span>
                    </div>

                    <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={lineData}>
                                <defs>
                                    <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#7A1F2D" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#7A1F2D" stopOpacity={0} />
                                    </linearGradient>
                                </defs>

                                <CartesianGrid stroke="#ffffff05" vertical={false} />
                                <XAxis dataKey="name" stroke="#666" />
                                <Tooltip />

                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#7A1F2D"
                                    strokeWidth={3}
                                    fill="url(#grad)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* PIE */}
                <div className="bg-[#1a1a1a] rounded-2xl border border-white/10 p-6">

                    <h2 className="mb-4">Distribution</h2>

                    <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">                            
                            <PieChart>
                                <Pie
                                    data={statsData}
                                    innerRadius={60}
                                    outerRadius={85}
                                    dataKey="value"
                                >
                                    {statsData.map((d, i) => (
                                        <Cell key={i} fill={d.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                </div>

            </div>

            {/* RECENT */}
            <div className="mt-8 bg-[#1a1a1a] rounded-2xl border border-white/10 p-6">

                <h2 className="flex items-center gap-2 mb-4">
                    <FaCalendarAlt /> Recent Bookings
                </h2>

                <div className="space-y-3">
                    {recentBookings.map((item, i) => (
                        <Recent key={i} {...item} />
                    ))}
                </div>

            </div>

        </div>
    );
}

/* CARD */
function Card({ title, value, icon, primary, highlight }) {
    return (
        <div className={`
            p-5 rounded-xl border border-white/10 transition hover:-translate-y-1
            ${primary ? "bg-[#7A1F2D] shadow-lg shadow-[#7A1F2D]/20" : ""}
            ${highlight ? "bg-[#634536] shadow-lg shadow-[#634536]/20" : ""}
            ${!primary && !highlight ? "bg-[#1a1a1a]" : ""}
        `}>
            <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
                {icon} {title}
            </div>
            <h2 className="text-2xl font-bold">{value}</h2>
        </div>
    );
}

/* RECENT */
function Recent({ customer, barber, service, revenue }) {
    return (
        <div className="flex justify-between p-4 bg-[#111] rounded-lg border border-white/5">
            <div>
                <p className="font-semibold">{customer}</p>
                <p className="text-sm text-gray-400">{barber} • {service}</p>
            </div>
            <p className="text-[#7A1F2D] font-bold">
                Rp {revenue.toLocaleString()}
            </p>
        </div>
    );
}

const recentBookings = [
    { customer: "Ricky", barber: "Andi", service: "Cut", revenue: 85000 },
    { customer: "Sari", barber: "Budi", service: "Fade", revenue: 120000 },
    { customer: "Doni", barber: "Candra", service: "Buzz", revenue: 65000 },
];