import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="min-h-screen flex bg-[#0A0A0A] text-[#D3CDC3]">

            {/* LEFT (FORM AREA) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-10">

                <div className="w-full max-w-md">

                    {/* LOGO */}
                    <div className="mb-6 text-center lg:text-left">
                        <h1 className="text-7xl font-bold text-white tracking-wide">
                            Velvet<span className="text-[#A87C2D]">Blade</span>
                        </h1>
                    </div>

                    {/* ISI HALAMAN */}
                    <Outlet />

                    {/* FOOTER */}
                    <p className="text-center text-sm text-[#D3CDC3]/60 mt-6">
                        © 2026 VelvetBlade System
                    </p>

                </div>
            </div>

            {/* RIGHT (IMAGE) */}
            <div className="hidden lg:block w-1/2 p-6">
                <div className="relative h-full rounded-2xl overflow-hidden">
                    <img
                        src="/img/login_img.png"
                        alt="barber"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                </div>
            </div>

        </div>
    );
}