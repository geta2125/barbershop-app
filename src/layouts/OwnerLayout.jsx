
import { Outlet } from "react-router-dom";
import OwnerSidebar from "../components/sidebar/OwnerSidebar";
import Header from "@/components/Header";

export default function OwnerLayout() {
    return (
        <div className="flex min-h-screen bg-[#111111]">

            <OwnerSidebar />

            <div className="flex-1 flex flex-col ml-[280px]">

                <Header />

                <main className="flex-1 p-6 overflow-y-auto">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}
