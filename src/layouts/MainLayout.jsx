import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout() {

    return (

        <div className="bg-[#0f0f17] min-h-screen overflow-x-hidden">

            {/* SIDEBAR */}
            <Sidebar />

            {/* HEADER */}
            <Header />

            {/* CONTENT */}
            <main
                className="
                    ml-60
                    pt-20
                    min-h-screen
                    bg-[#0f0f17]
                    px-6
                    py-6
                "
            >

                <Outlet />

            </main>

        </div>

    );

}