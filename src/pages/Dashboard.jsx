import { useState, useEffect } from "react";
import {
  PieChart, Pie, Cell, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

const goldColor = "#dfb34c";
const cardBg = "#1a1a26";
const border = "0.5px solid #2a2a3a";
const radius = 14;

const lineData = [
  { name: "Jan", value: 120 },
  { name: "Feb", value: 145 },
  { name: "Mar", value: 180 },
  { name: "Apr", value: 220 },
  { name: "Mei", value: 250 },
  { name: "Jun", value: 280 },
  { name: "Jul", value: 310 },
];

const statsData = [
  { name: "Silver", value: 300, color: "#BE9359" },
  { name: "Gold", value: 180, color: "#E9C664" },
  { name: "Platinum", value: 40, color: "#d0d0d0" },
  { name: "Non Member", value: 280, color: "#979797" },
];

const barData = [
  { name: "Cash", value: 320, color: "#BE9359" },
  { name: "QRIS", value: 480, color: "#E9C664" },
];

function Avatar({ initials }) {
  return (
    <div style={{
      width: 42, height: 42, borderRadius: "50%",
      background: "linear-gradient(135deg, #dfb34c, #a07020)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 500, fontSize: 14, color: "#fff", flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}

function StatCard({ label, value, sub }) {
  return (
    <div style={{
      background: cardBg, border, borderRadius: radius,
      padding: "18px 20px", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: 2, background: goldColor, borderRadius: "14px 14px 0 0",
      }} />
      <div style={{ fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ fontSize: 26, fontWeight: 500, color: "#fff" }}>{value}</div>
      <div style={{ fontSize: 11, color: goldColor, marginTop: 4 }}>{sub}</div>
    </div>
  );
}

function MiniCard({ icon, iconBg, iconColor, label, value, sub }) {
  return (
    <div style={{
      background: cardBg, border, borderRadius: radius,
      padding: "16px 18px", display: "flex", alignItems: "flex-start", gap: 12,
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: iconBg, color: iconColor,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 16, flexShrink: 0,
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 11, color: "#666", marginBottom: 3 }}>{label}</div>
        <div style={{ fontSize: 18, fontWeight: 500, color: "#fff" }}>{value}</div>
        <div style={{ fontSize: 11, color: goldColor, marginTop: 2 }}>{sub}</div>
      </div>
    </div>
  );
}

function ChartCard({ title, icon, children }) {
  return (
    <div style={{ background: cardBg, border, borderRadius: radius, padding: 20 }}>
      <div style={{
        fontSize: 14, fontWeight: 500, color: "#fff",
        marginBottom: 16, display: "flex", alignItems: "center", gap: 8,
      }}>
        <span style={{ color: goldColor }}>{icon}</span>
        {title}
      </div>
      {children}
    </div>
  );
}

function UserCard({ initials, name, role }) {
  return (
    <div style={{
      background: cardBg, border, borderRadius: radius,
      padding: "14px 16px", display: "flex", alignItems: "center", gap: 12,
    }}>
      <div style={{
        width: 38, height: 38, borderRadius: "50%",
        background: "#2a2a3a", display: "flex", alignItems: "center",
        justifyContent: "center", fontSize: 12, fontWeight: 500, color: goldColor,
      }}>
        {initials}
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 500, color: "#fff" }}>{name}</div>
        <div style={{ fontSize: 11, color: "#666" }}>{role}</div>
      </div>
      <div style={{
        marginLeft: "auto", fontSize: 10,
        background: "rgba(223,179,76,0.1)", color: goldColor,
        border: "0.5px solid rgba(223,179,76,0.25)",
        borderRadius: 6, padding: "2px 8px",
      }}>
        Staff
      </div>
    </div>
  );
}

function FinCard({ label, value, fillColor, percent }) {
  return (
    <div style={{ background: cardBg, border, borderRadius: radius, padding: "16px 18px" }}>
      <div style={{ fontSize: 11, color: "#666", marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 16, fontWeight: 500, color: "#fff" }}>{value}</div>
      <div style={{ height: 4, background: "#2a2a3a", borderRadius: 99, marginTop: 10, overflow: "hidden" }}>
        <div style={{ height: "100%", borderRadius: 99, background: fillColor, width: `${percent}%` }} />
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [booking, setBooking] = useState(1245);

  useEffect(() => {
    const interval = setInterval(() => setBooking((b) => b + 1), 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      background: "#0d0d14", minHeight: "100vh",
      padding: 24, color: "#fff", fontFamily: "sans-serif",
    }}>
      {/* TOP BAR */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Avatar initials="GD" />
          <div>
            <div style={{ fontSize: 16, fontWeight: 500 }}>Geta Dewi</div>
            <div style={{ fontSize: 12, color: "#888" }}>Admin Dashboard</div>
          </div>
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          background: "#1a1a26", border, borderRadius: 10,
          padding: "8px 14px", fontSize: 12, color: "#aaa",
        }}>
          <span>01 Jun – 30 Jun 2023</span>
          <span style={{ color: goldColor }}>📅</span>
        </div>
      </div>

      {/* STAT CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
        <StatCard label="Total Customer" value="800" sub="↑ Semua pelanggan" />
        <StatCard label="Total Member" value="520" sub="↑ 65% dari total" />
        <StatCard label="Total Booking" value={booking.toLocaleString("id-ID")} sub="Live update setiap 8 detik" />
      </div>

      {/* MAIN GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 16 }}>

        {/* LEFT */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* MINI CARDS */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
            <MiniCard icon="👥" iconBg="rgba(223,179,76,0.15)" iconColor={goldColor} label="Customer Aktif" value="650" sub="81% dari total" />
            <MiniCard icon="🚫" iconBg="rgba(226,75,74,0.15)" iconColor="#e24b4a" label="Customer Nonaktif" value="150" sub="19% dari total" />
            <MiniCard icon="🪪" iconBg="rgba(55,138,221,0.15)" iconColor="#378add" label="Total Member" value="520" sub="65% dari total" />
            <MiniCard icon="💰" iconBg="rgba(99,153,34,0.15)" iconColor="#639922" label="Revenue" value="Rp 7.500" sub="+12% bulan ini" />
          </div>

          {/* AREA CHART */}
          <ChartCard title="Booking Bulanan" icon="📈">
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={lineData}>
                  <defs>
                    <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={goldColor} stopOpacity={0.35} />
                      <stop offset="95%" stopColor={goldColor} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" tick={{ fill: "#666", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#666", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#1a1a26", border, borderRadius: 8, color: "#fff", fontSize: 12 }} />
                  <Area type="monotone" dataKey="value" stroke={goldColor} strokeWidth={2.5} fill="url(#goldGrad)" dot={{ fill: goldColor, r: 4 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          {/* BAR CHART */}
          <ChartCard title="Profit & Loss (Metode Pembayaran)" icon="⚖️">
            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" tick={{ fill: "#666", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#666", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#1a1a26", border, borderRadius: 8, color: "#fff", fontSize: 12 }} />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {barData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        {/* RIGHT */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* DONUT */}
          <div style={{ background: cardBg, border, borderRadius: radius, padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: "#fff" }}>Membership</div>
              <div style={{
                fontSize: 10, background: "rgba(223,179,76,0.15)", color: goldColor,
                border: "0.5px solid rgba(223,179,76,0.3)", borderRadius: 6, padding: "2px 8px",
              }}>LIVE</div>
            </div>
            <div style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statsData} dataKey="value" innerRadius={65} outerRadius={90} paddingAngle={3}>
                    {statsData.map((item, index) => (
                      <Cell key={index} fill={item.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "#1a1a26", border, borderRadius: 8, color: "#fff", fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
              {statsData.map((item) => (
                <div key={item.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.color }} />
                    <span style={{ color: "#aaa" }}>{item.name}</span>
                  </div>
                  <span style={{ color: "#fff", fontWeight: 500 }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FINANCE */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <FinCard label="Paid Invoices" value="$565.6K" fillColor="#a78bfa" percent={75} />
            <FinCard label="Funds Received" value="$425.6K" fillColor="#4ade80" percent={55} />
          </div>

          {/* STAFF */}
          <UserCard initials="BS" name="Budi Santoso" role="Barber Specialist" />
          <UserCard initials="SR" name="Siti Rahma" role="Hair Stylist" />
        </div>

      </div>
    </div>
  );
}
