import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/sidebar/AdminSidebar";
import Header from "@/components/Header";

export default function AdminLayout() {
    return (
        <div className="bg-[#0d0d14] min-h-screen text-white">

            {/* Sidebar fixed di kiri */}
            <AdminSidebar />

            {/* Header fixed di atas, otomatis mulai dari left-[280px] */}
            <Header />

            {/* Main content, diberi ruang sesuai sidebar (280px) & header (80px) */}
            <main className="ml-[280px] mt-20 min-h-[calc(100vh-80px)] overflow-y-auto px-6 py-6 md:px-8 md:py-8">
                <div className="max-w-[1600px] mx-auto w-full">
                    <Outlet />
                </div>
            </main>

        </div>
    );
}