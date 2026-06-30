import { Outlet } from "react-router-dom";
import BarberSidebar from "../components/sidebar/BarberSidebar";
import Header from "@/components/Header";

export default function BarberLayout() {
    return (
        <div className="bg-[#0d0d14] min-h-screen text-white">

            {/* Sidebar */}
            <BarberSidebar />

            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="ml-[280px] mt-20 min-h-[calc(100vh-80px)] overflow-y-auto px-6 py-6 md:px-8 md:py-8">
                <div className="max-w-[1600px] mx-auto w-full">
                    <Outlet />
                </div>
            </main>

        </div>
    );
}