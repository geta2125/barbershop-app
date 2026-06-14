import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer";

export default function AuthLayout() {
    return (
        // Mengunci layout pas 1 layar penuh anti-meluap
        <div className="h-screen w-screen flex bg-[#0A0A0A] text-[#D3CDC3] font-sans antialiased overflow-hidden select-none">

            {/* ── LEFT · FORM PANEL (Diubah menjadi lg:w-1/2 untuk porsi 50%) ── */}
            <div className="relative w-full lg:w-1/2 h-full flex flex-col bg-[#0D0C0B] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] z-10 shadow-[10px_0_40px_rgba(0,0,0,0.6)]">

                {/* Gold accent line kiri */}
                <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-[#A87C2D]/50 to-transparent pointer-events-none" />

                <div className="flex flex-col justify-between min-h-full px-10 sm:px-16 py-12">

                    {/* LOGO */}
                    <div className="flex-shrink-0 flex flex-col items-center text-center">
                        <div className="flex items-center gap-3 justify-center">
                            <div className="w-9 h-9 rounded-lg bg-[#A87C2D]/10 border border-[#A87C2D]/25 flex items-center justify-center flex-shrink-0">
                                <img
                                    src="/img/logopfl_geta.png"
                                    alt="GroomGold"
                                    className="w-5 h-5 object-contain"
                                />
                            </div>
                            <h1 className="text-2xl font-bold tracking-wide text-white">
                                Groom<span className="text-[#A87C2D]">Gold</span>
                            </h1>
                        </div>
                        <p className="text-[9px] text-[#A87C2D]/60 tracking-[0.3em] uppercase font-semibold mt-2">
                            Premium Grooming Experience
                        </p>
                    </div>

                    {/* FORM */}
                    <div className="w-full max-w-sm mx-auto flex flex-col gap-5 my-auto py-10">
                        <Outlet />
                    </div>

                    {/* FOOTER */}
                    <div className="flex-shrink-0 border-t border-white/5 pt-4">
                        <Footer />
                    </div>
                </div>
            </div>

            {/* ── RIGHT · HERO CANVAS (Diubah menjadi lg:w-1/2 untuk porsi 50% Full Screen) ── */}
            <div className="hidden lg:block w-1/2 h-full bg-[#080807] flex-shrink-0 subpixel-antialiased relative overflow-hidden">

                {/* IMAGE — Mengisi 100% ruang kanan secara simetris */}
                <div className="relative w-full h-full group">
                    <img
                        src="/img/login_img.png"
                        alt="GroomGold Barbershop Interior"
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.03]"
                    />

                    {/* GRADIENT OVERLAY — Skema sinematik gelap mewah */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/20 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

                    {/* QUOTE CARD — Melayang anggun di atas gambar full screen */}
                    <div className="absolute bottom-12 right-12 max-w-sm">
                        <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-6
                                        transition-all duration-500 group-hover:border-[#A87C2D]/30
                                        shadow-[0_20px_50px_rgba(0,0,0,0.6)]">

                            {/* Gold top accent */}
                            <div className="w-8 h-[1.5px] bg-[#A87C2D] rounded-full mb-4" />

                            <p className="text-white text-lg font-serif italic leading-relaxed tracking-wide">
                                "Sharp looks,<br />smooth confidence."
                            </p>
                            <p className="mt-4 text-[10px] tracking-[0.25em] uppercase text-[#A87C2D] font-semibold">
                                GroomGold Barbershop
                            </p>
                        </div>

                        {/* Label kecil Est. di bawah quote box */}
                        <p className="text-right text-[9px] text-white/30 tracking-widest uppercase mt-4">
                            Est. 2020 · Pekanbaru
                        </p>
                    </div>

                    {/* Corner badge — Open Today */}
                    <div className="absolute top-8 right-8 bg-black/40 backdrop-blur-md border border-white/10
                                    rounded-full px-4 py-1.5 flex items-center gap-2 shadow-lg">
                        <span className="w-2 h-2 rounded-full bg-[#A87C2D] animate-pulse" />
                        <span className="text-[9px] tracking-[0.2em] uppercase text-white/80 font-semibold">Open Today</span>
                    </div>
                </div>

            </div>

        </div>
    );
}