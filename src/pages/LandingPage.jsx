import { Link } from "react-router-dom";
import {
    HiOutlineCalendarDays,
    HiOutlineChartBar,
    HiOutlineExclamationCircle,
    HiOutlineUserGroup,
} from "react-icons/hi2";

// Rekomendasi React: Import logo langsung agar path terdeteksi otomatis oleh bundler/Vite
import logoGroomGold from "/public/img/logopfl_geta.png"; 

const features = [
    {
        title: "Booking Online",
        description: "Pelanggan dapat melakukan reservasi tanpa harus menunggu balasan WhatsApp.",
        icon: HiOutlineCalendarDays,
    },
    {
        title: "Dashboard Owner",
        description: "Owner dapat melihat data transaksi dan performa operasional dari satu tempat.",
        icon: HiOutlineChartBar,
    },
    {
        title: "Customer Management",
        description: "Data pelanggan tersimpan secara digital, rapi, dan mudah digunakan untuk promosi.",
        icon: HiOutlineUserGroup,
    },
];

const pains = [
    "Booking manual mudah terlewat",
    "Catatan pelanggan tercecer",
    "Pendapatan sulit dianalisis"
];

export default function LandingPage() {
    return (
        <main className="min-h-screen bg-[#080806] text-white font-sans">
            {/* Header / Navigation */}
            <header className="sticky top-0 z-40 border-b border-white/10 bg-[#080806]/90 backdrop-blur-xl">
                <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
                    <Link to="/" className="flex items-center gap-3">
                        {/* Memanggil logo yang di-import di atas */}
                        <img 
                            src={logoGroomGold} 
                            alt="Logo Groom Gold" 
                            className="h-10 w-auto object-contain"
                            onError={(e) => {
                                // Fallback jika import bermasalah, gunakan path alternatif string public
                                e.target.src = "/img/logopfl_geta.png";
                            }}
                        />
                        <span className="text-lg font-bold tracking-tight">
                            Groom <span className="text-[#E9C664]">Gold</span>
                        </span>
                    </Link>

                    <div className="hidden items-center gap-7 text-sm text-white/70 md:flex">
                        <a href="#fitur" className="transition hover:text-[#E9C664]">
                            Fitur
                        </a>
                        <a href="#cta" className="transition hover:text-[#E9C664]">
                            Coba Gratis
                        </a>
                        <a href="#kontak" className="transition hover:text-[#E9C664]">
                            Kontak
                        </a>
                    </div>

                    <Link
                        to="/register"
                        className="rounded-lg bg-[#E9C664] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#BE9359]"
                    >
                        Daftar Sekarang
                    </Link>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-[1.02fr_0.98fr] md:py-24">
                <div>
                    <p className="mb-4 inline-flex rounded-full border border-[#E9C664]/30 bg-[#E9C664]/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#E9C664]">
                        Sistem Manajemen Barbershop
                    </p>
                    <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
                        Pangkas Antrean Lama, Ikat Loyalitas Pelanggan
                    </h1>
                    <p className="mt-6 max-w-xl text-base leading-8 text-white/70 md:text-lg">
                        Sistem digital untuk membantu operasional barbershop menjadi lebih efisien, mulai dari
                        booking online, pencatatan pelanggan, hingga dashboard bisnis.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Link
                            to="/register"
                            className="inline-flex items-center justify-center rounded-lg bg-[#E9C664] px-6 py-3 font-semibold text-black transition hover:bg-[#BE9359]"
                        >
                            Daftar Sekarang
                        </Link>
                        <a
                            href="#fitur"
                            className="inline-flex items-center justify-center rounded-lg border border-white/15 px-6 py-3 font-semibold text-white transition hover:border-[#E9C664] hover:text-[#E9C664]"
                        >
                            Lihat Fitur
                        </a>
                    </div>

                    {/* Masalah yang sering dihadapi */}
                    <div className="mt-8 grid gap-3 text-sm text-white/70 sm:grid-cols-3">
                        {pains.map((pain) => (
                            <div key={pain} className="flex items-start gap-2">
                                <HiOutlineExclamationCircle className="mt-0.5 shrink-0 text-[#E9C664]" size={18} />
                                <span>{pain}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Hero Dashboard Preview Image */}
                <div className="relative">
                    <div className="absolute inset-6 rounded-2xl bg-[#E9C664]/20 blur-3xl" />
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#171510] shadow-2xl">
                        <img
                            src="/img/lbbarber.png"
                            alt="Barbershop modern dengan sistem digital Groom Gold"
                            className="h-72 w-full object-cover md:h-[460px]"
                        />
                        <div className="grid gap-3 border-t border-white/10 bg-[#11100d] p-5 sm:grid-cols-3">
                            <div>
                                <p className="text-2xl font-bold text-[#E9C664]">100+</p>
                                <p className="text-xs text-white/60">Target Pengunjung</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-[#E9C664]">20</p>
                                <p className="text-xs text-white/60">Klik CTA</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-[#E9C664]">10</p>
                                <p className="text-xs text-white/60">Registrasi Baru</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="fitur" className="border-y border-white/10 bg-[#11100d] px-5 py-16 md:py-20">
                <div className="mx-auto max-w-6xl">
                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-wide text-[#E9C664]">Fitur Utama</p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                            Semua kebutuhan dasar barbershop dalam satu sistem.
                        </h2>
                        <p className="mt-4 text-white/65">
                            Groom Gold membantu owner memindahkan proses manual menjadi alur kerja digital yang
                            lebih mudah dipantau.
                        </p>
                    </div>

                    <div className="mt-10 grid gap-5 md:grid-cols-3">
                        {features.map((feature) => {
                            const Icon = feature.icon;
                            return (
                                <article
                                    key={feature.title}
                                    className="rounded-lg border border-white/10 bg-[#080806] p-6 transition hover:border-[#E9C664]/60"
                                >
                                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-[#E9C664]/15 text-[#E9C664]">
                                        <Icon size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold">{feature.title}</h3>
                                    <p className="mt-3 leading-7 text-white/65">{feature.description}</p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section id="cta" className="px-5 py-16 md:py-24">
                <div className="mx-auto max-w-4xl rounded-2xl border border-[#E9C664]/30 bg-[#E9C664] px-6 py-12 text-center text-black md:px-12">
                    <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">
                        Mulai Digitalisasi Barbershop Anda
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-black/70">
                        Coba Groom Gold untuk membuat booking, data pelanggan, dan laporan bisnis lebih tertata.
                    </p>
                    <Link
                        to="/register"
                        className="mt-8 inline-flex rounded-lg bg-black px-7 py-3 font-semibold text-white transition hover:bg-[#2b281f]"
                    >
                        Coba Gratis
                    </Link>
                </div>
            </section>

            {/* Footer Section */}
            <footer id="kontak" className="border-t border-white/10 bg-[#050504] px-5 py-12">
                <div className="mx-auto max-w-6xl">
                    <div className="grid gap-10 sm:grid-cols-3 mb-10">
                        {/* Kolom Brand */}
                        <div>
                            <div className="flex items-center gap-3">
                                <img
                                    src={logoGroomGold}
                                    alt="Logo Groom Gold"
                                    className="h-12 w-auto object-contain"
                                    onError={(e) => {
                                        e.target.src = "/img/logopfl_geta.png";
                                    }}
                                />
                                <span className="text-lg font-bold">
                                    Groom <span className="text-[#E9C664]">Gold</span>
                                </span>
                            </div>
                            <p className="mt-3 text-sm text-white/55 leading-relaxed">
                                Landing page promosi sistem manajemen barbershop modern nomor satu.
                            </p>
                        </div>

                        {/* Kolom Tautan */}
                        <div>
                            <h4 className="text-xs font-semibold text-white mb-4 uppercase tracking-wide">Navigasi</h4>
                            <ul className="space-y-2 text-sm text-white/60">
                                <li><a href="#fitur" className="hover:text-[#E9C664] transition">Fitur Utama</a></li>
                                <li><a href="#cta" className="hover:text-[#E9C664] transition">Coba Gratis</a></li>
                                <li><a href="#kontak" className="hover:text-[#E9C664] transition">Kontak</a></li>
                            </ul>
                        </div>

                        {/* Kolom Kontak */}
                        <div>
                            <h4 className="text-xs font-semibold text-white mb-4 uppercase tracking-wide">Hubungi Kami</h4>
                            <div className="space-y-2 text-sm text-white/60 font-mono">
                                <p>Email: groomgold@groomgold.id</p>
                                <p>WhatsApp: +62 812-3456-7890</p>
                                <p>Lokasi: Pekanbaru, Riau</p>
                            </div>
                        </div>
                    </div>

                    {/* Hak Cipta */}
                    <div className="pt-7 border-t border-white/5 text-center">
                        <p className="text-xs text-white/40 font-mono">
                            &copy; 2026 Groom Gold. All Rights Reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </main>
    );
}