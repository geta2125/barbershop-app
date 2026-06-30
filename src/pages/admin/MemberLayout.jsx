import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { LayoutDashboard, CalendarCheck, History, Gift, User } from "lucide-react";

// Definisikan item navigasi khusus untuk Member
const memberNavItems = [
  { path: "/member/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { path: "/member/booking", label: "Booking", icon: <CalendarCheck size={18} /> },
  { path: "/member/history", label: "History", icon: <History size={18} /> },
  { path: "/member/rewards", label: "Reward", icon: <Gift size={18} /> },
  { path: "/member/profile", label: "Profile", icon: <User size={18} /> },
];

export default function MemberLayout() {
  return (
    <div className="flex h-screen bg-[#0d0d14]">
      <Sidebar navItems={memberNavItems} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-y-auto">
          {/* Konten halaman (misal: MemberDashboard) akan dirender di sini */}
          <Outlet />
        </div>
      </main>
    </div>
  );
}