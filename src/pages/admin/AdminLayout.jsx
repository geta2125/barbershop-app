import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { LayoutDashboard, Users, Scissors, BookUser, Star, History } from "lucide-react";

// Definisikan item navigasi khusus untuk Admin
const adminNavItems = [
  { path: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { path: "/admin/users", label: "Manage Users", icon: <Users size={18} /> },
  { path: "/admin/barbers", label: "Barbers", icon: <Scissors size={18} /> },
  { path: "/admin/customers", label: "Customers", icon: <BookUser size={18} /> },
  { path: "/admin/feedback", label: "Feedback", icon: <Star size={18} /> },
  { path: "/admin/history", label: "History", icon: <History size={18} /> },
];

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-[#0d0d14]">
      <Sidebar navItems={adminNavItems} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-y-auto bg-[#0d0d14]">
          {/* Konten halaman (misal: AdminDashboard) akan dirender di sini */}
          <Outlet />
        </div>
      </main>
    </div>
  );
}