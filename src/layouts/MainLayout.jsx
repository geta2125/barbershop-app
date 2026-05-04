import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout() {
    return (
        <div className="flex min-h-screen bg-[#222323] text-[#D3CDC3]">

            {/* SIDEBAR */}
            <Sidebar />

            {/* MAIN */}
            <div className="flex flex-col flex-1">

                {/* HEADER */}
                <Header />

                {/* CONTENT */}
                <main className="flex-1 p-4 md:p-6 bg-[#222323]">
                    <Outlet />
                </main>

            </div>
        </div>
    );
}