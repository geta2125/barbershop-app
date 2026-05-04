import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#222323]">

            <div className="bg-[#222323] p-8 rounded-2xl shadow-2xl w-full max-w-md border border-[#7A1F2D]">

                {/* LOGO */}
                <div className="flex items-center justify-center mb-6">
                    <h1 className="text-3xl font-extrabold text-[#D3CDC3] tracking-wide">
                        VelvetBlade
                    </h1>
                </div>

                <Outlet />

                <p className="text-center text-sm text-[#D3CDC3]/60 mt-6">
                    © 2026 VelvetBlade System
                </p>

            </div>
        </div>
    );
}