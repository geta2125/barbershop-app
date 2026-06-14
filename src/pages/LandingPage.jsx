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
    HiOutlineCpuChip,
    HiOutlineShieldCheck
} from "react-icons/hi2";
import Footer from "@/components/Footer";

export default function LandingPage() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [visitCount, setVisitCount] = useState(1);
    const [estimatedDiscount, setEstimatedDiscount] = useState(0);

    const [currentFeature, setCurrentFeature] = useState(0);
    const [currentTesti, setCurrentTesti] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 30);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (visitCount >= 10) setEstimatedDiscount(50);
        else if (visitCount >= 7) setEstimatedDiscount(30);
        else if (visitCount >= 4) setEstimatedDiscount(15);
        else setEstimatedDiscount(0);
    }, [visitCount]);

    const handleScrollToSection = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const fiturData = [
        {
            icon: <HiOutlineCalendar size={24} />,
            title: "Sistem Booking Online & Atur Jadwal Kapster",
            desc: "Hindari tumpukan pelanggan di ruang tunggu. Biarkan pelanggan memilih kapster andalan dan jam cukur mereka sendiri lewat halaman booking khusus.",
            badge: "Lihat Dashboard Manajemen Kursi"
        },
        {
            icon: <HiOutlineUserGroup size={24} />,
            title: "Riwayat Model Rambut (CRM)",
            desc: "Catat preferensi tipe rambut pelanggan, nomor pomade favorit, hingga foto hasil cukuran sebelumnya agar pelayanan selalu konsisten.",
            badge: "Sistem Database Terpusat"
        },
        {
            icon: <HiOutlineChartBar size={24} />,
            title: "Hitung Komisi & Bagi Hasil Otomatis",
            desc: "Sistem menghitung komisi per kepala secara otomatis berdasarkan performa harian masing-masing kapster tanpa rekap manual.",
            badge: "Finansial Terintegrasi"
        },
        {
            icon: <HiOutlineShieldCheck size={24} />,
            title: "WhatsApp Blast Pengingat Cukur Rutin",
            desc: "Kirim pesan otomatis kepada pelanggan yang sudah tidak berkunjung selama 30 hari untuk menawarkan slot potongan rambut berikutnya secara personal.",
            badge: "*Terbukti meningkatkan retention rate hingga 45%"
        }
    ];

    const testimoniData = [
        { nama: "Bro Hendra", usaha: "Chief Barber Studio", teks: "Sistem komisi otomatisnya menyelamatkan waktu akhir pekan saya. Dulu rekap pakai excel makan waktu berjam-jam, sekarang tinggal klik langsung beres!" },
        { nama: "Bro Rangga", usaha: "Vintage Cuts & Co", teks: "Fitur WhatsApp otomatis bikin pelanggan balik lagi sebulan sekali dengan konsisten. Omset naik signifikan dalam 3 bulan terakhir." },
        { nama: "Bro Kevin", usaha: "Gentlemen Pride Franchise", teks: "Sangat mudah memantau performa 5 cabang barbershop saya dari satu aplikasi handphone saja. Manajemen inventori pomadenya sangat presisi." }
    ];

    const nextFeature = () => setCurrentFeature((prev) => (prev === fiturData.length - 1 ? 0 : prev + 1));
    const prevFeature = () => setCurrentFeature((prev) => (prev === 0 ? fiturData.length - 1 : prev - 1));

    const nextTesti = () => setCurrentTesti((prev) => (prev === testimoniData.length - 1 ? 0 : prev + 1));
    const prevTesti = () => setCurrentTesti((prev) => (prev === 0 ? testimoniData.length - 1 : prev - 1));

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-[#E5E5E5] font-sans antialiased selection:bg-[#dfb34c] selection:text-black overflow-x-hidden">

            {/* Giant Center Gold Glow effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-radial from-[#dfb34c]/15 via-transparent to-transparent blur-[140px] pointer-events-none -z-10" />

            {/* 1. FLOATING NAVBAR */}
            <header className="fixed top-0 w-full z-50 px-4 sm:px-8 py-5 transition-all duration-500">
                <nav className={`max-w-7xl mx-auto flex justify-between items-center px-6 py-3.5 rounded-full border transition-all duration-500 ${isScrolled
                        ? "bg-[#121212]/80 backdrop-blur-xl border-[#dfb34c]/20 shadow-[0_15px_40px_rgba(0,0,0,0.8)]"
                        : "bg-transparent border-transparent"
                    }`}>

                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#dfb34c]/20 to-transparent border border-[#dfb34c]/30 flex items-center justify-center shadow-md">
                            <img src="/img/logopfl_geta.png" alt="GroomGold" className="w-5 h-5 object-contain" />
                        </div>
                        <div className="leading-tight">
                            <h1 className="text-lg font-black tracking-wide text-white">
                                Groom <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dfb34c] to-[#f5d076]">Gold</span>
                            </h1>
                            <p className="text-[8px] tracking-[2.5px] uppercase text-amber-600/70 font-extrabold">Barbershop</p>
                        </div>
                    </Link>

                    <div className="hidden md:flex gap-8 text-xs font-semibold tracking-wider text-gray-400">
                        <a href="#fitur" onClick={(e) => handleScrollToSection(e, "fitur")} className="hover:text-[#dfb34c] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#dfb34c] hover:after:w-full after:transition-all">Fitur Utama</a>
                        <a href="#simulator" onClick={(e) => handleScrollToSection(e, "simulator")} className="hover:text-[#dfb34c] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#dfb34c] hover:after:w-full after:transition-all">Simulator Diskon</a>
                        <a href="#membership" onClick={(e) => handleScrollToSection(e, "membership")} className="hover:text-[#dfb34c] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#dfb34c] hover:after:w-full after:transition-all">Paket Sistem</a>
                        <a href="#testimoni" onClick={(e) => handleScrollToSection(e, "testimoni")} className="hover:text-[#dfb34c] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#dfb34c] hover:after:w-full after:transition-all">Testimoni</a>
                    </div>

                    <div className="flex items-center gap-5">
                        <Link to="/login" className="text-xs font-bold text-gray-400 hover:text-white transition-colors">Masuk</Link>
                        <Link to="/register" className="bg-gradient-to-r from-[#dfb34c] to-[#f5d076] hover:brightness-110 active:scale-95 text-black text-xs font-bold px-6 py-2.5 rounded-full transition-all duration-300 shadow-[0_4px_20px_rgba(223,179,76,0.3)]">
                            Coba Gratis
                        </Link>
                    </div>
                </nav>
            </header>

            {/* 2. SYMMETRICAL CENTERED HERO */}
            <section className="relative pt-40 lg:pt-52 pb-24 px-6 max-w-5xl mx-auto text-center">

                {/* Badge Center - Live Monitor style */}
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.02] border border-white/10 mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.3)]">
                    <HiOutlineCpuChip className="text-[#dfb34c] animate-pulse" size={15} />
                    <span className="text-[9px] uppercase tracking-[2.5px] font-black text-gray-300 font-mono">
                        Solusi CRM & Antrean Barbershop Modern
                    </span>
                </div>

                {/* Main Heading Bigger & Centered */}
                <h1 className="text-4xl sm:text-6xl font-black text-white leading-[1.12] tracking-tight mb-6 max-w-4xl mx-auto">
                    Pangkas Antrean Lama, <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dfb34c] via-[#fff3ad] to-[#dfb34c] bg-300% animate-gradient">
                        Ikat Loyalitas Pelanggan
                    </span>
                </h1>

                {/* Subtitle Centered */}
                <p className="text-sm sm:text-base text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                    Kelola jadwal kapster, otomatisasi booking online via WhatsApp, pantau komisi tim, dan jalankan program sistem loyalitas dalam satu dasbor cerdas bersama <strong className="text-white font-semibold border-b border-[#dfb34c]/40 pb-0.5">Groom Gold</strong>.
                </p>

                {/* Call To Actions Centered */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-16">
                    <Link to="/register" className="w-full sm:w-auto bg-gradient-to-r from-[#dfb34c] to-[#f5d076] hover:shadow-[0_0_30px_rgba(223,179,76,0.4)] text-black px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all duration-300 text-xs uppercase tracking-wider">
                        Mulai Coba Gratis <HiOutlineArrowRight size={14} />
                    </Link>
                    <a href="#fitur" onClick={(e) => handleScrollToSection(e, "fitur")} className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/10 bg-white/[0.01] hover:bg-white/[0.05] hover:border-[#dfb34c]/40 text-white transition-all font-bold text-xs uppercase tracking-wider text-center">
                        Pelajari Fitur
                    </a>
                </div>

                {/* Small Trust Badges */}
                <div className="flex items-center justify-center gap-8 text-xs text-gray-500 font-medium">
                    <span className="flex items-center gap-2"><HiCheckBadge className="text-[#dfb34c]" size={16} /> Tanpa Kartu Kredit</span>
                    <span className="flex items-center gap-2"><HiCheckBadge className="text-[#dfb34c]" size={16} /> Setup Cepat 5 Menit</span>
                </div>
            </section>

            {/* 3. FITUR INTERACTIVE SLIDE GALLERY */}
            <section id="fitur" className="py-28 px-6 relative border-t border-white/5 bg-[#0F0F0F]">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#dfb34c]/5 blur-[120px] pointer-events-none" />

                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-[#dfb34c] text-[10px] font-bold uppercase tracking-[3px] bg-[#dfb34c]/5 px-4 py-1.5 rounded-full border border-[#dfb34c]/20 font-mono">Smart Operations</span>
                        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-4">Kendali Penuh Atas Bisnis Barbershop Anda</h2>
                    </div>

                    <div className="relative overflow-hidden rounded-3xl bg-[#141414] border border-white/5 p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] min-h-[340px] flex flex-col justify-between group hover:border-[#dfb34c]/20 transition-colors duration-500">
                        <div className="relative w-full overflow-hidden">
                            <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentFeature * 100}%)` }}>
                                {fiturData.map((item, idx) => (
                                    <div key={idx} className="w-full shrink-0 pr-4">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#dfb34c]/20 to-transparent text-[#dfb34c] flex items-center justify-center mb-6 border border-[#dfb34c]/30 shadow-md">
                                            {item.icon}
                                        </div>
                                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight">{item.title}</h3>
                                        <p className="text-sm text-gray-400 max-w-2xl leading-relaxed mb-6">{item.desc}</p>
                                        <div className="inline-flex items-center text-[11px] text-[#dfb34c] font-bold tracking-wide bg-[#dfb34c]/5 px-3 py-1.5 rounded-full border border-[#dfb34c]/10">
                                            {item.badge}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-12 pt-6 border-t border-white/5">
                            <div className="flex gap-2">
                                {fiturData.map((_, idx) => (
                                    <button key={idx} onClick={() => setCurrentFeature(idx)} className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentFeature ? "w-6 bg-[#dfb34c]" : "w-2 bg-gray-700"}`} />
                                ))}
                            </div>
                            <div className="flex gap-3">
                                <button onClick={prevFeature} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#dfb34c] hover:border-[#dfb34c] transition-all bg-[#0A0A0A]">
                                    <HiChevronLeft size={18} />
                                </button>
                                <button onClick={nextFeature} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#dfb34c] hover:border-[#dfb34c] transition-all bg-[#0A0A0A]">
                                    <HiChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. SIMULATOR DISKON */}
            <section id="simulator" className="py-28 px-6 bg-[#0A0A0A] border-t border-b border-white/5 relative">
                <div className="max-w-3xl mx-auto text-center">
                    <span className="text-[#dfb34c] text-[10px] font-bold uppercase tracking-[3px] bg-[#dfb34c]/5 px-4 py-1.5 rounded-full border border-[#dfb34c]/20 font-mono">CRM Simulator</span>
                    <h2 className="text-3xl sm:text-4xl font-black text-white mt-4 mb-4">Simulasikan Kekuatan Diskon Loyalitas</h2>
                    <p className="text-sm text-gray-400 mb-12 max-w-lg mx-auto">Gunakan penggeser di bawah untuk melihat bagaimana sistem manajemen poin kami otomatis memberikan hadiah diskon bertahap bagi pelanggan setia Anda.</p>

                    <div className="bg-[#141414] p-8 rounded-3xl border border-white/5 shadow-2xl text-left hover:border-[#dfb34c]/10 transition-colors duration-500">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                            Jumlah Kunjungan Pelanggan (Dalam 1 Tahun): <span className="text-lg text-[#dfb34c] ml-1 font-mono font-bold">{visitCount} Kunjungan</span>
                        </label>
                        <input type="range" min="1" max="12" value={visitCount} onChange={(e) => setVisitCount(parseInt(e.target.value))} className="w-full accent-[#dfb34c] h-1.5 bg-neutral-800 rounded-lg cursor-pointer mb-8" />

                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="p-5 bg-[#0A0A0A] rounded-2xl border border-white/5 flex flex-col justify-center">
                                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block mb-1.5">Status Kategori CRM</span>
                                <span className="text-xs sm:text-sm font-black text-white tracking-wide">
                                    {visitCount >= 10 ? "👑 VIP Gentlemen" : visitCount >= 7 ? "⚡ Loyal Regular" : visitCount >= 4 ? "⭐ New Regular" : "🌱 New Guest"}
                                </span>
                            </div>
                            <div className="p-5 bg-gradient-to-br from-[#dfb34c] to-[#c99f3f] text-black rounded-2xl shadow-lg flex flex-col justify-center">
                                <span className="text-[9px] text-black/60 font-bold uppercase tracking-wider block mb-1.5">Otomatisasi Diskon Sistem</span>
                                <span className="text-lg sm:text-xl font-black">{estimatedDiscount}% OFF</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. PRICING SECTION */}
            <section id="membership" className="py-28 px-6 relative bg-[#0F0F0F]">
                {/* Radial Glow Right */}
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] bg-[#dfb34c]/5 blur-[100px] pointer-events-none" />

                <div className="max-w-5xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-[#dfb34c] text-[10px] font-bold uppercase tracking-[3px] font-mono">Subscription Plans</span>
                        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-4">Investasi Sesuai Skala Bisnis</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Plan 1 */}
                        <div className="p-10 rounded-[32px] bg-[#141414] border border-white/5 shadow-md relative flex flex-col justify-between transition-all duration-300 hover:border-[#dfb34c]/20 hover:-translate-y-1">
                            <div>
                                <h4 className="text-xl font-bold text-white mb-1.5 tracking-tight">Single Barbershop</h4>
                                <p className="text-xs text-gray-400 mb-8">Sempurna untuk rintisan usaha 1 cabang.</p>
                                <div className="text-3xl font-black text-[#dfb34c] mb-8 tracking-tight">Rp 149.000 <span className="text-xs text-gray-500 font-normal">/ bulan</span></div>
                                <div className="w-full h-px bg-white/5 mb-8" />
                                <ul className="space-y-4 text-xs text-gray-300 mb-10 font-medium">
                                    <li className="flex items-center gap-3">✓ Maksimal 4 Kursi / Kapster</li>
                                    <li className="flex items-center gap-3">✓ WhatsApp Antrean System</li>
                                    <li className="flex items-center gap-3">✓ Laporan Keuangan & POS Kasir</li>
                                </ul>
                            </div>
                            <Link to="/register" className="w-full bg-[#0A0A0A] hover:bg-neutral-900 border border-white/10 text-gray-300 text-center font-bold py-3.5 rounded-full text-xs uppercase tracking-wider block transition-colors">Pilih Paket</Link>
                        </div>

                        {/* Plan 2 - Premium Solid Gold Edge */}
                        <div className="p-10 rounded-[32px] bg-[#141414] border-2 border-[#dfb34c] relative shadow-[0_20px_45px_rgba(223,179,76,0.15)] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1">
                            <div className="absolute -top-3.5 right-8 bg-gradient-to-r from-[#dfb34c] to-[#f5d076] text-black text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">Paling Populer</div>
                            <div>
                                <h4 className="text-xl font-bold text-white mb-1.5 tracking-tight">Multi-Branch Enterprise</h4>
                                <p className="text-xs text-amber-500/80 mb-8 font-medium">Solusi franchise barbershop multi-cabang.</p>
                                <div className="text-3xl font-black text-[#dfb34c] mb-8 tracking-tight">Rp 399.000 <span className="text-xs text-gray-400 font-normal">/ bulan</span></div>
                                <div className="w-full h-px bg-white/5 mb-8" />
                                <ul className="space-y-4 text-xs text-gray-300 mb-10 font-medium">
                                    <li className="flex items-center gap-3"><HiCheckBadge className="text-[#dfb34c]" size={16} /> Unlimited Kapster & Cabang</li>
                                    <li className="flex items-center gap-3"><HiCheckBadge className="text-[#dfb34c]" size={16} /> Modul Inventory Pomade & Produk</li>
                                    <li className="flex items-center gap-3"><HiCheckBadge className="text-[#dfb34c]" size={16} /> WhatsApp Gateway Auto-Blast</li>
                                    <li className="flex items-center gap-3"><HiCheckBadge className="text-[#dfb34c]" size={16} /> Multi-user Dashboard Owner</li>
                                </ul>
                            </div>
                            <Link to="/register" className="w-full bg-gradient-to-r from-[#dfb34c] to-[#f5d076] hover:brightness-110 text-black text-center font-black py-3.5 rounded-full text-xs uppercase tracking-wider block shadow-md transition-all">Mulai Berlangganan</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. TESTIMONIALS SLIDE GALLERY */}
            <section id="testimoni" className="py-28 px-6 border-t border-white/5 bg-[#0A0A0A]">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-14">
                        <span className="text-[#dfb34c] text-[10px] font-bold uppercase tracking-[3px] font-mono">Kisah Sukses Owner</span>
                        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-4">Dipercaya oleh Pemilik Barbershop</h2>
                    </div>

                    <div className="relative overflow-hidden rounded-3xl bg-[#141414] border border-white/5 p-8 sm:p-12 shadow-xl hover:border-[#dfb34c]/10 transition-colors duration-500">
                        <div className="relative w-full overflow-hidden">
                            <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentTesti * 100}%)` }}>
                                {testimoniData.map((item, idx) => (
                                    <div key={idx} className="w-full shrink-0 pr-2">
                                        <div className="flex gap-1 text-[#dfb34c] mb-6">
                                            {[...Array(5)].map((_, i) => <HiOutlineStar key={i} size={15} className="fill-current" />)}
                                        </div>
                                        <p className="text-base sm:text-lg text-gray-300 font-normal italic mb-8 leading-relaxed">"{item.teks}"</p>
                                        <div className="pt-5 border-t border-white/5">
                                            <h5 className="text-sm font-bold text-white tracking-wide">{item.nama}</h5>
                                            <span className="text-[10px] text-[#dfb34c] font-bold tracking-widest uppercase mt-1 block font-mono">{item.usaha}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-8 pt-4 border-t border-white/5">
                            <div className="flex gap-1.5">
                                {testimoniData.map((_, idx) => (
                                    <button key={idx} onClick={() => setCurrentTesti(idx)} className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentTesti ? "w-5 bg-[#dfb34c]" : "w-1.5 bg-neutral-700"}`} />
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <button onClick={prevTesti} className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#dfb34c] hover:border-[#dfb34c] bg-[#0A0A0A] transition-colors"><HiChevronLeft size={16} /></button>
                                <button onClick={nextTesti} className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#dfb34c] hover:border-[#dfb34c] bg-[#0A0A0A] transition-colors"><HiChevronRight size={16} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. HIGH-CONTRAST DARK CTA */}
            <section className="py-28 px-4 sm:px-6 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#dfb34c]/5 blur-[120px] pointer-events-none" />
                
                <div className="max-w-4xl mx-auto rounded-[40px] bg-gradient-to-b from-[#141414] to-[#0A0A0A] p-10 sm:p-16 text-center relative overflow-hidden shadow-2xl border border-[#dfb34c]/30">
                    <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 tracking-tight leading-[1.15]">Modernisasi Manajemen <br />Barbershop Anda Sekarang</h2>
                    <p className="text-gray-400 mb-10 max-w-xl mx-auto text-xs sm:text-sm font-normal leading-relaxed">
                        Fokus penuh pada kualitas cukuran kapster Anda, biarkan sistem otomatisasi <strong className="text-white font-semibold">Groom Gold</strong> menangani semua urusan alur antrean, kasir, dan pengingat pelanggan.
                    </p>
                    <Link to="/register" className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#dfb34c] to-[#f5d076] hover:shadow-[0_5px_25px_rgba(223,179,76,0.35)] text-black px-8 py-4 rounded-full font-black text-xs uppercase tracking-wider shadow-lg transition-all">
                        Daftar Barbershop Sekarang <HiChevronRight size={14} />
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}