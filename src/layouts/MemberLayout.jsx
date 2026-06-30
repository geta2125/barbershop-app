import { Outlet } from "react-router-dom";
import MemberSidebar from "../components/sidebar/MemberSidebar";
import Navbar from "../components/Navbar";

export default function MemberLayout() {
    return (
        <div className="flex min-h-screen bg-[#111111]">

            <MemberSidebar />

            <div className="flex-1 flex flex-col ml-[280px]">

                <Navbar />

                <main className="flex-1 p-6 overflow-y-auto">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}
