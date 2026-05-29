import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        // Menggunakan h-screen dan overflow-hidden untuk mengunci layout pas 1 layar
        <div className="h-screen w-screen flex bg-[#0A0A0A] text-[#D3CDC3] font-sans antialiased overflow-hidden">

            {/* LEFT (FORM AREA) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-10 h-full overflow-hidden">
                <div className="w-full max-w-md py-8">

                    {/* LOGO */}
                    <div className="mb-6 text-center lg:text-left">
                        <h1 className="text-7xl font-bold text-white tracking-wide">
                            Groom<span className="text-[#A87C2D]">Gold</span>
                        </h1>
                        <p className="text-sm text-[#A87C2D] tracking-[0.2em] uppercase mt-1">
                            Premium Grooming Experience
                        </p>
                    </div>

                    {/* ISI HALAMAN (MISALNYA: LOGIN, REGISTER, LUPA PASSWORD) */}
                    <Outlet />

                    {/* FOOTER */}
                    <p className="text-center text-xs text-[#D3CDC3]/40 mt-6 pt-4 border-t border-white/5">
                        © 2026 GroomGold System. All rights reserved.
                    </p>

                </div>
            </div>

            {/* RIGHT SIDE - HERO IMAGE (Terkunci sempurna sesuai tinggi layar) */}
            <div className="hidden lg:block w-1/2 h-full p-5">
                <div className="relative h-full w-full rounded-3xl border border-white/10 shadow-2xl group">

                    {/* IMAGE */}
                    <img
                        src="/img/login_img.png"
                        alt="GroomGold Barbershop Interior"
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* DARK OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent" />

                    {/* ADDITIONAL OVERLAY */}
                    <div className="absolute inset-0 bg-black/20" />

                    {/* QUOTE */}
                    <div className="absolute bottom-10 right-10 max-w-sm text-right backdrop-blur-sm bg-black/10 rounded-xl p-4 border border-white/5">
                        <p className="text-white text-2xl font-serif italic leading-relaxed">
                            "Sharp looks, smooth confidence."
                        </p>

                        <div className="mt-3 flex justify-end">
                            <div className="w-12 h-[2px] bg-[#A87C2D]" />
                        </div>

                        <span className="block mt-2 text-xs tracking-[3px] uppercase text-[#D4AF37]">
                            GroomGold Barbershop
                        </span>
                    </div>

                </div>
            </div>
        </div>
    );
}