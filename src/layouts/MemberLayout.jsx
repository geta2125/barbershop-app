import { Outlet } from "react-router-dom";
import MemberSidebar from "../components/sidebar/MemberSidebar";
import Header from "@/components/Header";

export default function MemberLayout() {
    return (
        <div className="flex min-h-screen bg-[#111111]">

            <MemberSidebar />

            <div className="flex-1 flex flex-col ml-[280px]">

                <Header />

                <main className="flex-1 p-6 overflow-y-auto">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}
