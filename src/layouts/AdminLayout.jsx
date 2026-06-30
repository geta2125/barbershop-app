import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/sidebar/AdminSidebar";
import Navbar from "../components/Navbar";

export default function AdminLayout() {
    return (
        <div className="flex min-h-screen bg-[#111111]">

            <AdminSidebar />

            <div className="flex-1 flex flex-col ml-[280px]">

                <Navbar />

                <main className="flex-1 p-6 overflow-y-auto">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}
