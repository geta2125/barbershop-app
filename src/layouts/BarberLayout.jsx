import { Outlet } from "react-router-dom";
import BarberSidebar from "../components/sidebar/BarberSidebar";
import Navbar from "../components/Navbar";
import Header from "@/components/Header";

export default function BarberLayout() {
    return (
        <div className="flex min-h-screen bg-[#111111]">

            <BarberSidebar />

            <div className="flex-1 flex flex-col ml-[280px]">

                <Header />

                <main className="flex-1 p-6 overflow-y-auto">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}
