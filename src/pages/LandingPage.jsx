import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    HiChevronRight,
    HiChevronLeft,
    HiOutlineCalendar,
    HiOutlineUserGroup,
    HiOutlineChartBar,
    HiCheckBadge,
    HiOutlineStar,
    HiOutlineArrowRight,
    HiOutlineScissors,
    HiOutlineShieldCheck
} from "react-icons/hi2";

export default function LandingPage() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [visitCount, setVisitCount] = useState(1);
    const [estimatedDiscount, setEstimatedDiscount] = useState(0);

    const [currentFeature, setCurrentFeature] = useState(0);
    const [currentTesti, setCurrentTesti] = useState(0);
    const [ticketNumber, setTicketNumber] = useState(41);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 30);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (visitCount >= 10) setEstimatedDiscount(50);
        else if (visitCount >= 7) setEstimatedDiscount(30);
        else if (visitCount >= 4) setEstimatedDiscount(15);
        else setEstimatedDiscount(0);
    }, [visitCount]);

    // Ambient "now serving" ticket counter in the hero mockup
    useEffect(() => {
        const interval = setInterval(() => {
            setTicketNumber((prev) => (prev >= 58 ? 42 : prev + 1));
        }, 2600);
        return () => clearInterval(interval);
    }, []);

    const handleScrollToSection = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const fiturData = [
        {
            icon: <HiOutlineCalendar size={22} />,
            title: "Sistem Booking Online & Atur Jadwal Kapster",
            desc: "Hindari tumpukan pelanggan di ruang tunggu. Biarkan pelanggan memilih kapster andalan dan jam cukur mereka sendiri lewat halaman booking khusus.",
            badge: "Dashboard Manajemen Kursi"
        },
        {
            icon: <HiOutlineUserGroup size={22} />,
            title: "Riwayat Model Rambut (CRM)",
            desc: "Catat preferensi tipe rambut pelanggan, nomor pomade favorit, hingga foto hasil cukuran sebelumnya agar pelayanan selalu konsisten.",
            badge: "Database Pelanggan Terpusat"
        },
        {
            icon: <HiOutlineChartBar size={22} />,
            title: "Hitung Komisi & Bagi Hasil Otomatis",
            desc: "Sistem menghitung komisi per kepala secara otomatis berdasarkan performa harian masing-masing kapster tanpa rekap manual.",
            badge: "Finansial Terintegrasi"
        },
        {
            icon: <HiOutlineShieldCheck size={22} />,
            title: "WhatsApp Blast Pengingat Cukur Rutin",
            desc: "Kirim pesan otomatis kepada pelanggan yang sudah tidak berkunjung selama 30 hari untuk menawarkan slot potongan rambut berikutnya secara personal.",
            badge: "Retensi naik hingga 45%"
        }
    ];

    const testimoniData = [
        { nama: "Bro Hendra", usaha: "Chief Barber Studio", teks: "Sistem komisi otomatisnya menyelamatkan waktu akhir pekan saya. Dulu rekap pakai excel makan waktu berjam-jam, sekarang tinggal klik langsung beres!" },
        { nama: "Bro Rangga", usaha: "Vintage Cuts & Co", teks: "Fitur WhatsApp otomatis bikin pelanggan balik lagi sebulan sekali dengan konsisten. Omset naik signifikan dalam 3 bulan terakhir." },
        { nama: "Bro Kevin", usaha: "Gentlemen Pride Franchise", teks: "Sangat mudah memantau performa 5 cabang barbershop saya dari satu aplikasi handphone saja. Manajemen inventori pomadenya sangat presisi." }
    ];

    const nextFeature = () => setCurrentFeature((p) => (p === fiturData.length - 1 ? 0 : p + 1));
    const prevFeature = () => setCurrentFeature((p) => (p === 0 ? fiturData.length - 1 : p - 1));
    const nextTesti = () => setCurrentTesti((p) => (p === testimoniData.length - 1 ? 0 : p + 1));
    const prevTesti = () => setCurrentTesti((p) => (p === 0 ? testimoniData.length - 1 : p - 1));

    return (
        <div className="min-h-screen bg-[#15110D] text-[#EDE3D3] font-body antialiased selection:bg-[#C9A063] selection:text-[#15110D] overflow-x-hidden">

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@600;700;800;900&family=Inter:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
                .font-display { font-family: 'Big Shoulders Display', sans-serif; }
                .font-body { font-family: 'Inter', sans-serif; }
                .font-ticket { font-family: 'Space Mono', monospace; }
                .stripe-edge {
                    background: repeating-linear-gradient(135deg, #C9A063 0 10px, #7C2F2F 10px 20px);
                }
                .punch::before, .punch::after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    width: 22px;
                    height: 22px;
                    border-radius: 9999px;
                    transform: translateY(-50%);
                    background: #15110D;
                }
                .punch::before { left: -11px; }
                .punch::after { right: -11px; }
                .punch-panel::before, .punch-panel::after { background: #1C160F; }
                @keyframes blink-dot {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.25; }
                }
                .blink { animation: blink-dot 1.6s ease-in-out infinite; }
            `}</style>

            {/* Warm ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(201,160,99,0.12),transparent_70%)] blur-[100px] pointer-events-none -z-10" />

            {/* 1. NAVBAR */}
            <header className="fixed top-0 w-full z-50 px-4 sm:px-8 py-5 transition-all duration-500">
                <nav className={`max-w-7xl mx-auto flex justify-between items-center px-6 py-3.5 rounded-2xl border transition-all duration-500 ${isScrolled
                    ? "bg-[#1B1610]/90 backdrop-blur-xl border-[#C9A063]/25 shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
                    : "bg-transparent border-transparent"
                    }`}>

                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-lg bg-[#1F1812] border border-[#C9A063]/40 flex items-center justify-center shadow-md">
                            <HiOutlineScissors className="text-[#C9A063]" size={18} />
                        </div>
                        <div className="leading-tight">
                            <h1 className="font-display text-xl font-extrabold tracking-wide text-[#F3EAD9] uppercase">
                                Groom <span className="text-[#C9A063]">Gold</span>
                            </h1>
                            <p className="text-[8px] tracking-[3px] uppercase text-[#8A7A63] font-bold -mt-1">Barbershop</p>
                        </div>
                    </Link>

                    <div className="hidden md:flex gap-8 text-xs font-semibold tracking-wider text-[#A89880] font-ticket">
                        <a href="#fitur" onClick={(e) => handleScrollToSection(e, "fitur")} className="hover:text-[#C9A063] transition-colors">Fitur Utama</a>
                        <a href="#simulator" onClick={(e) => handleScrollToSection(e, "simulator")} className="hover:text-[#C9A063] transition-colors">Simulator Diskon</a>
                        <a href="#membership" onClick={(e) => handleScrollToSection(e, "membership")} className="hover:text-[#C9A063] transition-colors">Paket Sistem</a>
                        <a href="#testimoni" onClick={(e) => handleScrollToSection(e, "testimoni")} className="hover:text-[#C9A063] transition-colors">Testimoni</a>
                    </div>

                    <div className="flex items-center gap-5">
                        <Link to="/login" className="text-xs font-bold text-[#A89880] hover:text-[#F3EAD9] transition-colors">Masuk</Link>
                        <Link to="/register" className="bg-[#C9A063] hover:bg-[#E8CD96] active:scale-95 text-[#15110D] text-xs font-bold px-6 py-2.5 rounded-full transition-all duration-300 shadow-[0_4px_20px_rgba(201,160,99,0.25)]">
                            Coba Gratis
                        </Link>
                    </div>
                </nav>
            </header>

            {/* 2. HERO — asymmetric, ticket mockup as signature visual */}
            <section className="relative pt-40 lg:pt-48 pb-28 px-6 max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">

                <div>
                    <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#1C160F] border border-[#C9A063]/25 mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A063] blink" />
                        <span className="text-[9px] uppercase tracking-[2.5px] font-bold text-[#C9A063] font-ticket">
                            Antrean Digital · CRM · Komisi Otomatis
                        </span>
                    </div>

                    <h1 className="font-display font-black uppercase text-[#F3EAD9] leading-[0.95] tracking-tight mb-6 text-5xl sm:text-7xl">
                        Pangkas Antrean,<br />
                        <span className="text-[#C9A063]">Ikat Loyalitas</span>
                    </h1>

                    <p className="text-sm sm:text-base text-[#A89880] mb-10 max-w-lg leading-relaxed">
                        Kelola jadwal kapster, otomatisasi booking online via WhatsApp, pantau komisi tim, dan jalankan program loyalitas dalam satu dasbor — bersama <strong className="text-[#F3EAD9] font-semibold">Groom Gold</strong>.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mb-12">
                        <Link to="/register" className="bg-[#C9A063] hover:bg-[#E8CD96] text-[#15110D] px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all duration-300 text-xs uppercase tracking-wider">
                            Mulai Coba Gratis <HiOutlineArrowRight size={14} />
                        </Link>
                        <a href="#fitur" onClick={(e) => handleScrollToSection(e, "fitur")} className="px-8 py-4 rounded-full border border-[#C9A063]/30 hover:border-[#C9A063] text-[#F3EAD9] transition-all font-bold text-xs uppercase tracking-wider text-center">
                            Pelajari Fitur
                        </a>
                    </div>

                    <div className="flex items-center gap-8 text-xs text-[#8A7A63] font-medium">
                        <span className="flex items-center gap-2"><HiCheckBadge className="text-[#C9A063]" size={16} /> Tanpa Kartu Kredit</span>
                        <span className="flex items-center gap-2"><HiCheckBadge className="text-[#C9A063]" size={16} /> Setup Cepat 5 Menit</span>
                    </div>
                </div>

                {/* Floating queue-ticket mockup */}
                <div className="relative flex justify-center lg:justify-end">
                    <div className="relative w-full max-w-sm rotate-[2deg] hover:rotate-0 transition-transform duration-500">
                        <div className="h-3 rounded-t-2xl stripe-edge" />
                        <div className="punch punch-panel relative bg-[#1C160F] border-x border-b border-[#C9A063]/20 rounded-b-2xl px-7 pt-8 pb-7 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <p className="text-[9px] uppercase tracking-[2px] text-[#8A7A63] font-ticket">Now Serving</p>
                                    <p className="font-ticket text-5xl font-bold text-[#C9A063] tabular-nums">#{ticketNumber}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[9px] uppercase tracking-[2px] text-[#8A7A63] font-ticket">Kapster</p>
                                    <p className="text-sm font-semibold text-[#F3EAD9]">Bro Yoga</p>
                                </div>
                            </div>
                            <div className="border-t border-dashed border-[#C9A063]/25 my-5" />
                            <div className="space-y-3 text-xs font-ticket text-[#A89880]">
                                <div className="flex justify-between"><span>Layanan</span><span className="text-[#F3EAD9]">Cukur + Pijat</span></div>
                                <div className="flex justify-between"><span>Estimasi Tunggu</span><span className="text-[#F3EAD9]">~6 menit</span></div>
                                <div className="flex justify-between"><span>Status</span><span className="text-[#C9A063]">Dipanggil Otomatis</span></div>
                            </div>
                            <div className="mt-6 bg-[#15110D] rounded-xl px-4 py-3 flex items-center justify-between border border-[#C9A063]/15">
                                <span className="text-[10px] uppercase tracking-wider text-[#8A7A63] font-ticket">Loyalty Poin</span>
                                <span className="text-sm font-bold text-[#E8CD96]">+12 pts</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. FITUR */}
            <section id="fitur" className="py-28 px-6 relative border-t border-[#C9A063]/10 bg-[#19140E]">
                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-[#C9A063] text-[10px] font-bold uppercase tracking-[3px] bg-[#1C160F] px-4 py-1.5 rounded-full border border-[#C9A063]/20 font-ticket">Smart Operations</span>
                        <h2 className="font-display font-extrabold uppercase text-3xl sm:text-4xl text-[#F3EAD9] tracking-tight mt-5">Kendali Penuh Atas Barbershop Anda</h2>
                    </div>

                    <div className="relative overflow-hidden rounded-3xl bg-[#1C160F] border border-[#C9A063]/15 p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.4)] min-h-[340px] flex flex-col justify-between hover:border-[#C9A063]/30 transition-colors duration-500">
                        <div className="relative w-full overflow-hidden">
                            <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentFeature * 100}%)` }}>
                                {fiturData.map((item, idx) => (
                                    <div key={idx} className="w-full shrink-0 pr-4">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-12 h-12 rounded-xl bg-[#15110D] text-[#C9A063] flex items-center justify-center border border-[#C9A063]/25">
                                                {item.icon}
                                            </div>
                                            <span className="font-ticket text-[#5C5040] text-xs">TIKET {String(idx + 1).padStart(2, "0")}/{String(fiturData.length).padStart(2, "0")}</span>
                                        </div>
                                        <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#F3EAD9] mb-3 tracking-tight">{item.title}</h3>
                                        <p className="text-sm text-[#A89880] max-w-2xl leading-relaxed mb-6">{item.desc}</p>
                                        <div className="inline-flex items-center text-[11px] text-[#C9A063] font-bold tracking-wide bg-[#15110D] px-3 py-1.5 rounded-full border border-[#C9A063]/15">
                                            {item.badge}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-12 pt-6 border-t border-dashed border-[#C9A063]/15">
                            <div className="flex gap-2">
                                {fiturData.map((_, idx) => (
                                    <button key={idx} onClick={() => setCurrentFeature(idx)} className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentFeature ? "w-6 bg-[#C9A063]" : "w-2 bg-[#3A3024]"}`} />
                                ))}
                            </div>
                            <div className="flex gap-3">
                                <button onClick={prevFeature} className="w-10 h-10 rounded-full border border-[#C9A063]/20 flex items-center justify-center text-[#A89880] hover:text-[#C9A063] hover:border-[#C9A063] transition-all bg-[#15110D]">
                                    <HiChevronLeft size={18} />
                                </button>
                                <button onClick={nextFeature} className="w-10 h-10 rounded-full border border-[#C9A063]/20 flex items-center justify-center text-[#A89880] hover:text-[#C9A063] hover:border-[#C9A063] transition-all bg-[#15110D]">
                                    <HiChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. SIMULATOR */}
            <section id="simulator" className="py-28 px-6 bg-[#15110D] border-t border-b border-[#C9A063]/10 relative">
                <div className="max-w-3xl mx-auto text-center">
                    <span className="text-[#C9A063] text-[10px] font-bold uppercase tracking-[3px] bg-[#1C160F] px-4 py-1.5 rounded-full border border-[#C9A063]/20 font-ticket">CRM Simulator</span>
                    <h2 className="font-display font-extrabold uppercase text-3xl sm:text-4xl text-[#F3EAD9] mt-5 mb-4">Simulasikan Kekuatan Diskon Loyalitas</h2>
                    <p className="text-sm text-[#A89880] mb-12 max-w-lg mx-auto">Geser untuk melihat bagaimana sistem poin kami otomatis memberi hadiah diskon bertahap bagi pelanggan setia Anda.</p>

                    <div className="bg-[#1C160F] p-8 rounded-3xl border border-[#C9A063]/15 shadow-2xl text-left hover:border-[#C9A063]/30 transition-colors duration-500">
                        <label className="block text-xs font-bold text-[#A89880] uppercase tracking-wider mb-4">
                            Jumlah Kunjungan Pelanggan (1 Tahun): <span className="text-lg text-[#C9A063] ml-1 font-ticket font-bold">{visitCount} Kunjungan</span>
                        </label>
                        <input type="range" min="1" max="12" value={visitCount} onChange={(e) => setVisitCount(parseInt(e.target.value))} className="w-full accent-[#C9A063] h-1.5 bg-[#3A3024] rounded-lg cursor-pointer mb-8" />

                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="p-5 bg-[#15110D] rounded-2xl border border-[#C9A063]/15 flex flex-col justify-center">
                                <span className="text-[9px] text-[#8A7A63] font-bold uppercase tracking-wider block mb-1.5">Status Kategori CRM</span>
                                <span className="text-xs sm:text-sm font-black text-[#F3EAD9] tracking-wide font-display uppercase">
                                    {visitCount >= 10 ? "VIP Gentlemen" : visitCount >= 7 ? "Loyal Regular" : visitCount >= 4 ? "New Regular" : "New Guest"}
                                </span>
                            </div>
                            <div className="p-5 bg-[#C9A063] text-[#15110D] rounded-2xl shadow-lg flex flex-col justify-center">
                                <span className="text-[9px] text-[#15110D]/60 font-bold uppercase tracking-wider block mb-1.5">Diskon Otomatis</span>
                                <span className="text-lg sm:text-xl font-black font-ticket">{estimatedDiscount}% OFF</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. PRICING */}
            <section id="membership" className="py-28 px-6 relative bg-[#19140E]">
                <div className="max-w-5xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-[#C9A063] text-[10px] font-bold uppercase tracking-[3px] font-ticket">Subscription Plans</span>
                        <h2 className="font-display font-extrabold uppercase text-3xl sm:text-4xl text-[#F3EAD9] tracking-tight mt-5">Investasi Sesuai Skala Bisnis</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Plan 1 */}
                        <div className="punch punch-panel relative p-10 rounded-[28px] bg-[#1C160F] border border-[#C9A063]/15 shadow-md flex flex-col justify-between transition-all duration-300 hover:border-[#C9A063]/35 hover:-translate-y-1">
                            <div className="absolute -top-px left-8 right-8 h-px border-t border-dashed border-[#C9A063]/30" />
                            <div>
                                <h4 className="font-display font-bold text-xl text-[#F3EAD9] mb-1.5 tracking-tight uppercase">Single Barbershop</h4>
                                <p className="text-xs text-[#A89880] mb-8">Sempurna untuk rintisan usaha 1 cabang.</p>
                                <div className="font-ticket text-3xl font-bold text-[#C9A063] mb-8 tracking-tight">Rp 149.000 <span className="text-xs text-[#8A7A63] font-body font-normal">/ bulan</span></div>
                                <div className="w-full h-px bg-[#C9A063]/10 mb-8" />
                                <ul className="space-y-4 text-xs text-[#D8CCB8] mb-10 font-medium">
                                    <li className="flex items-center gap-3"><HiCheckBadge className="text-[#C9A063]" size={16} /> Maksimal 4 Kursi / Kapster</li>
                                    <li className="flex items-center gap-3"><HiCheckBadge className="text-[#C9A063]" size={16} /> WhatsApp Antrean System</li>
                                    <li className="flex items-center gap-3"><HiCheckBadge className="text-[#C9A063]" size={16} /> Laporan Keuangan & POS Kasir</li>
                                </ul>
                            </div>
                            <Link to="/register" className="w-full bg-[#15110D] hover:bg-[#0E0B08] border border-[#C9A063]/20 text-[#D8CCB8] text-center font-bold py-3.5 rounded-full text-xs uppercase tracking-wider block transition-colors">Pilih Paket</Link>
                        </div>

                        {/* Plan 2 — featured */}
                        <div className="punch relative p-10 rounded-[28px] bg-[#1C160F] border-2 border-[#C9A063] shadow-[0_20px_45px_rgba(201,160,99,0.12)] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1">
                            <div className="absolute -top-px left-8 right-8 h-px border-t border-dashed border-[#C9A063]/40" />
                            <div className="absolute -top-3.5 right-8 bg-[#7C2F2F] text-[#F3EAD9] text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md font-ticket">Paling Populer</div>
                            <div>
                                <h4 className="font-display font-bold text-xl text-[#F3EAD9] mb-1.5 tracking-tight uppercase">Multi-Branch Enterprise</h4>
                                <p className="text-xs text-[#C9A063] mb-8 font-medium">Solusi franchise barbershop multi-cabang.</p>
                                <div className="font-ticket text-3xl font-bold text-[#C9A063] mb-8 tracking-tight">Rp 399.000 <span className="text-xs text-[#A89880] font-body font-normal">/ bulan</span></div>
                                <div className="w-full h-px bg-[#C9A063]/10 mb-8" />
                                <ul className="space-y-4 text-xs text-[#D8CCB8] mb-10 font-medium">
                                    <li className="flex items-center gap-3"><HiCheckBadge className="text-[#C9A063]" size={16} /> Unlimited Kapster & Cabang</li>
                                    <li className="flex items-center gap-3"><HiCheckBadge className="text-[#C9A063]" size={16} /> Modul Inventory Pomade & Produk</li>
                                    <li className="flex items-center gap-3"><HiCheckBadge className="text-[#C9A063]" size={16} /> WhatsApp Gateway Auto-Blast</li>
                                    <li className="flex items-center gap-3"><HiCheckBadge className="text-[#C9A063]" size={16} /> Multi-user Dashboard Owner</li>
                                </ul>
                            </div>
                            <Link to="/register" className="w-full bg-[#C9A063] hover:bg-[#E8CD96] text-[#15110D] text-center font-black py-3.5 rounded-full text-xs uppercase tracking-wider block shadow-md transition-all">Mulai Berlangganan</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. TESTIMONI */}
            <section id="testimoni" className="py-28 px-6 border-t border-[#C9A063]/10 bg-[#15110D]">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-14">
                        <span className="text-[#C9A063] text-[10px] font-bold uppercase tracking-[3px] font-ticket">Kisah Sukses Owner</span>
                        <h2 className="font-display font-extrabold uppercase text-3xl sm:text-4xl text-[#F3EAD9] tracking-tight mt-5">Dipercaya oleh Pemilik Barbershop</h2>
                    </div>

                    <div className="relative overflow-hidden rounded-3xl bg-[#1C160F] border border-[#C9A063]/15 p-8 sm:p-12 shadow-xl hover:border-[#C9A063]/25 transition-colors duration-500">
                        <div className="relative w-full overflow-hidden">
                            <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentTesti * 100}%)` }}>
                                {testimoniData.map((item, idx) => (
                                    <div key={idx} className="w-full shrink-0 pr-2">
                                        <div className="flex gap-1 text-[#C9A063] mb-6">
                                            {[...Array(5)].map((_, i) => <HiOutlineStar key={i} size={15} className="fill-current" />)}
                                        </div>
                                        <p className="text-base sm:text-lg text-[#D8CCB8] font-normal italic mb-8 leading-relaxed">"{item.teks}"</p>
                                        <div className="pt-5 border-t border-dashed border-[#C9A063]/15">
                                            <h5 className="font-display font-bold text-[#F3EAD9] tracking-wide uppercase">{item.nama}</h5>
                                            <span className="text-[10px] text-[#C9A063] font-bold tracking-widest uppercase mt-1 block font-ticket">{item.usaha}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-8 pt-4 border-t border-dashed border-[#C9A063]/15">
                            <div className="flex gap-1.5">
                                {testimoniData.map((_, idx) => (
                                    <button key={idx} onClick={() => setCurrentTesti(idx)} className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentTesti ? "w-5 bg-[#C9A063]" : "w-1.5 bg-[#3A3024]"}`} />
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <button onClick={prevTesti} className="w-9 h-9 rounded-full border border-[#C9A063]/20 flex items-center justify-center text-[#A89880] hover:text-[#C9A063] hover:border-[#C9A063] bg-[#15110D] transition-colors"><HiChevronLeft size={16} /></button>
                                <button onClick={nextTesti} className="w-9 h-9 rounded-full border border-[#C9A063]/20 flex items-center justify-center text-[#A89880] hover:text-[#C9A063] hover:border-[#C9A063] bg-[#15110D] transition-colors"><HiChevronRight size={16} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. CTA */}
            <section className="py-28 px-4 sm:px-6 relative">
                <div className="max-w-4xl mx-auto rounded-[32px] bg-[#1C160F] p-10 sm:p-16 text-center relative overflow-hidden shadow-2xl border border-[#C9A063]/25">
                    <div className="h-1.5 stripe-edge absolute top-0 left-0 right-0" />
                    <h2 className="font-display font-black uppercase text-3xl sm:text-5xl text-[#F3EAD9] mb-6 tracking-tight leading-[0.95]">Modernisasi Manajemen<br />Barbershop Anda Sekarang</h2>
                    <p className="text-[#A89880] mb-10 max-w-xl mx-auto text-xs sm:text-sm font-normal leading-relaxed">
                        Fokus penuh pada kualitas cukuran kapster Anda, biarkan sistem otomatisasi <strong className="text-[#F3EAD9] font-semibold">Groom Gold</strong> menangani alur antrean, kasir, dan pengingat pelanggan.
                    </p>
                    <Link to="/register" className="inline-flex items-center gap-2.5 bg-[#C9A063] hover:bg-[#E8CD96] text-[#15110D] px-8 py-4 rounded-full font-black text-xs uppercase tracking-wider shadow-lg transition-all">
                        Daftar Barbershop Sekarang <HiChevronRight size={14} />
                    </Link>
                </div>
            </section>

            {/* 8. FOOTER */}
            <footer className="border-t border-[#C9A063]/10 bg-[#100D09] relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
                    <div className="grid md:grid-cols-3 gap-10">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-lg bg-[#1C160F] border border-[#C9A063]/30 flex items-center justify-center">
                                    <HiOutlineScissors className="text-[#C9A063]" size={20} />
                                </div>
                                <div>
                                    <h3 className="font-display font-extrabold text-xl text-[#F3EAD9] uppercase">
                                        Groom <span className="text-[#C9A063]">Gold</span>
                                    </h3>
                                    <p className="text-[10px] uppercase tracking-[2px] text-[#8A7A63]">Barbershop CRM</p>
                                </div>
                            </div>
                            <p className="text-sm text-[#A89880] leading-relaxed">
                                Platform CRM modern yang membantu pemilik barbershop mengelola booking online, loyalitas pelanggan, komisi kapster, dan operasional bisnis dalam satu dashboard.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-display font-bold text-[#F3EAD9] mb-4 uppercase tracking-wide">Menu</h4>
                            <ul className="space-y-3 text-sm text-[#A89880]">
                                <li><a href="#fitur" onClick={(e) => handleScrollToSection(e, "fitur")} className="hover:text-[#C9A063]">Fitur</a></li>
                                <li><a href="#membership" onClick={(e) => handleScrollToSection(e, "membership")} className="hover:text-[#C9A063]">Paket</a></li>
                                <li><a href="#testimoni" onClick={(e) => handleScrollToSection(e, "testimoni")} className="hover:text-[#C9A063]">Testimoni</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-display font-bold text-[#F3EAD9] mb-4 uppercase tracking-wide">Hubungi Kami</h4>
                            <div className="space-y-3 text-sm text-[#A89880] font-ticket">
                                <p>support@groomgold.id</p>
                                <p>+62 812-3456-7890</p>
                                <p>Pekanbaru, Riau</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 pt-6 border-t border-dashed border-[#C9A063]/15 text-center">
                        <p className="text-xs text-[#5C5040] font-ticket">© 2026 Groom Gold. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}