import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout() {
    const navigate = useNavigate();
    
    // Mendapatkan tahun saat ini secara dinamis
    const currentYear = new Date().getFullYear();

    // Ambil token otentikasi dari localStorage langsung di top-level render
    const token = localStorage.getItem("auth_token"); 

    // ==========================================
    // SISTEM PENGAMAN ROUTE (ANTI TENDANG)
    // ==========================================
    useEffect(() => {
        // JIKA token tidak ada, BARU lempar paksa ke halaman login
        if (!token) {
            navigate("/login", { replace: true });
        }
    }, [token, navigate]);

    // ==========================================
    // GUARD CLAUSE (Mencegah Flicker / Bocor Komponen)
    // ==========================================
    // Jika tidak ada token, jangan render layout apa pun di layar (kembalikan null)
    if (!token) {
        return null; 
    }

    return (
        <div className="bg-[#0A0A0A] h-screen overflow-hidden font-sans transition-colors duration-300 text-[#E5E5E5]">
            {/* SIDEBAR FIXED */}
            <Sidebar />

            {/* HEADER FIXED */}
            <Header />

            {/* MAIN CONTENT AREA */}
            <main
                className="
                    ml-[280px]
                    mt-20
                    h-[calc(100vh-80px)]
                    overflow-y-auto
                    overflow-x-hidden
                    flex flex-col justify-between
                "
            >
                {/* CONTENT ROUTE (Halaman Utama) */}
                <div className="px-8 py-6 flex-1">
                    <Outlet />
                </div>

                {/* PREMIUM FOOTER */}
                <footer 
                    className="
                        mx-8 py-5 mt-auto
                        border-t flex flex-col sm:flex-row items-center justify-between gap-4
                        transition-all duration-300
                        border-white/5
                    "
                >
                    {/* LEFT SECTION */}
                    <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                        <span>© {currentYear}</span>
                        <span className="font-bold text-white tracking-wide">
                            Groom<span className="text-[#dfb34c]">Gold</span>
                        </span>
                        <span className="hidden sm:inline text-gray-800">|</span>
                        <span className="hidden sm:inline text-[11px]">All rights reserved.</span>
                    </div>

                    {/* RIGHT SECTION: LINKS & VERSION */}
                    <div className="flex items-center gap-6 text-[11px] font-semibold tracking-wide">
                        <div className="flex items-center gap-4 text-gray-500">
                            <a href="#docs" className="hover:text-[#dfb34c] transition-colors duration-200">Docs</a>
                            <a href="#support" className="hover:text-[#dfb34c] transition-colors duration-200">Support Desk</a>
                            <a href="#privacy" className="hover:text-[#dfb34c] transition-colors duration-200">Privacy Policy</a>
                        </div>
                        
                        {/* VERSION BADGE */}
                        <span className="px-2.5 py-1 text-[10px] font-black rounded-lg bg-[#141414] border border-white/5 text-[#dfb34c] tracking-wider shadow-sm">
                            v1.2.0
                        </span>
                    </div>
                </footer>
            </main>
        </div>
    );
}