import {
    FaCut,
    FaUserTie,
    FaTimesCircle,
    FaDollarSign,
    FaUsers,
    FaPlus,
    FaCalendarAlt,
    FaChartLine,
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
        { name: "Sun", value: 45 },
        { name: "Mon", value: 52 },
        { name: "Tue", value: 48 },
        { name: "Wed", value: 70 },
        { name: "Thu", value: 65 },
        { name: "Fri", value: 85 },
        { name: "Sat", value: stats.booking },
    ];

    const statsData = [
        { name: "Bookings", value: stats.booking, color: "#E9C664" },
        { name: "Customers", value: stats.customers, color: "#D3CDC3" },
        { name: "Canceled", value: stats.canceled, color: "#ef4444" },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => ({
                ...prev,
                booking: prev.booking + 1,
                revenue: prev.revenue + 35000,
            }));
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    // Theme logic
    const themeClass = darkMode 
        ? "bg-[#0a0a0a] text-white [--color-card:#161616] [--color-border:rgba(255,255,255,0.08)]" 
        : "bg-[#f8f9fa] text-gray-900 [--color-card:#ffffff] [--color-border:rgba(0,0,0,0.05)]";

    return (
        <div className={`${themeClass} ml-[260px] pt-24 px-8 pb-10 min-h-screen transition-colors duration-300 font-sans`}>
            
            {/* HEADER */}
            <header className="mb-10 flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight">Executive <span className="text-[#E9C664]">Panel</span></h1>
                    <p className="text-gray-500 font-medium mt-1 uppercase text-xs tracking-widest">Barbershop Analytics Engine</p>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-3 bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl shadow-sm hover:scale-110 transition-transform"
                    >
                        {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-indigo-600" />}
                    </button>

                    <button className="flex items-center gap-2 bg-[#E9C664] text-black px-6 py-3 rounded-xl font-bold hover:bg-[#d4b358] transition-all shadow-lg shadow-[#E9C664]/20 active:scale-95">
                        <FaPlus /> New Booking
                    </button>
                </div>
            </header>

            {/* STATS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-10">
                <Card title="Bookings" value={stats.booking} icon={<FaCut />} variant="gold" />
                <Card title="Barbers" value={stats.barbers} icon={<FaUserTie />} />
                <Card title="Canceled" value={stats.canceled} icon={<FaTimesCircle />} />
                <Card title="Revenue" value={`Rp ${(stats.revenue / 1000).toLocaleString()}k`} icon={<FaDollarSign />} variant="dark" />
                <Card title="Customers" value={stats.customers} icon={<FaUsers />} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* LINE CHART */}
                <div className="lg:col-span-2 bg-[var(--color-card)] rounded-3xl border border-[var(--color-border)] p-8 shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-xl font-bold flex items-center gap-3">
                                <span className="p-2 bg-[#E9C664]/10 rounded-lg text-[#E9C664]"><FaChartLine /></span>
                                Weekly Performance
                            </h2>
                        </div>
                        <select className="bg-transparent border border-[var(--color-border)] text-xs rounded-lg px-3 py-1 outline-none">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                        </select>
                    </div>

                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={lineData}>
                                <defs>
                                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#E9C664" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#E9C664" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128,128,128,0.1)" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} dy={10} />
                                <Tooltip 
                                    contentStyle={{backgroundColor: '#161616', borderRadius: '12px', border: 'none', color: '#fff'}}
                                    itemStyle={{color: '#E9C664'}}
                                />
                                <Area type="monotone" dataKey="value" stroke="#E9C664" strokeWidth={4} fillOpacity={1} fill="url(#colorVal)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* PIE CHART */}
                <div className="bg-[var(--color-card)] rounded-3xl border border-[var(--color-border)] p-8 shadow-sm flex flex-col justify-between">
                    <h2 className="text-xl font-bold mb-4">Market Share</h2>
                    <div className="h-[250px] relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={statsData} innerRadius={70} outerRadius={90} paddingAngle={8} dataKey="value">
                                    {statsData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-3xl font-bold">{stats.booking}</span>
                            <span className="text-gray-500 text-xs uppercase">Total</span>
                        </div>
                    </div>
                    <div className="space-y-2 mt-4">
                        {statsData.map((item, i) => (
                            <div key={i} className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}}></div>
                                    <span className="text-gray-500">{item.name}</span>
                                </div>
                                <span className="font-bold">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* RECENT BOOKINGS */}
            <div className="mt-8 bg-[var(--color-card)] rounded-3xl border border-[var(--color-border)] p-8 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-3">
                        <span className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><FaCalendarAlt /></span>
                        Recent Activity
                    </h2>
                    <button className="text-[#E9C664] text-sm font-semibold hover:underline">View All</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recentBookings.map((item, i) => (
                        <Recent key={i} {...item} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function Card({ title, value, icon, variant }) {
    const variants = {
        gold: "bg-[#E9C664] text-black shadow-[#E9C664]/20",
        dark: "bg-[#222] text-white shadow-black/40 border-none",
        default: "bg-[var(--color-card)] text-inherit border border-[var(--color-border)]"
    };

    return (
        <div className={`p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2 shadow-xl ${variants[variant || 'default']}`}>
            <div className={`flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold mb-3 ${variant === 'gold' ? 'text-black/60' : 'text-gray-400'}`}>
                {icon} {title}
            </div>
            <h2 className="text-3xl font-black">{value}</h2>
        </div>
    );
}

function Recent({ customer, barber, service, revenue }) {
    return (
        <div className="flex justify-between items-center p-5 bg-[var(--color-card)] rounded-2xl border border-[var(--color-border)] hover:border-[#E9C664]/50 transition-colors group">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#E9C664] flex items-center justify-center font-bold text-black shadow-inner">
                    {customer[0]}
                </div>
                <div>
                    <p className="font-bold group-hover:text-[#E9C664] transition-colors">{customer}</p>
                    <p className="text-xs text-gray-500 font-medium">{barber} • {service}</p>
                </div>
            </div>
            <p className="text-[#E9C664] font-extrabold text-lg">
                Rp {revenue.toLocaleString()}
            </p>
        </div>
    );
}

const recentBookings = [
    { customer: "Ricky", barber: "Andi", service: "Classic Cut", revenue: 85000 },
    { customer: "Sari", barber: "Budi", service: "Skin Fade", revenue: 120000 },
    { customer: "Doni", barber: "Candra", service: "Beard Trim", revenue: 65000 },
];