import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    BadgePercent,
    Bell,
    CalendarCheck,
    Check,
    Crown,
    Database,
    MessageCircle,
    Scissors,
    Sparkles,
    Star,
    Store,
    Users,
    WalletCards,
} from "lucide-react";

import logoGroomGold from "/public/img/logopfl_geta.png";

const features = [
    {
        title: "Booking Online",
        description: "Pelanggan memilih jadwal dan kapster tanpa antre panjang atau chat bolak-balik.",
        icon: CalendarCheck,
    },
    {
        title: "Riwayat Pelanggan",
        description: "Catatan kunjungan, preferensi potongan, dan transaksi tersimpan dalam satu profil.",
        icon: Database,
    },
    {
        title: "CRM Sederhana",
        description: "Segmentasikan pelanggan baru, regular, loyal, dan VIP untuk promosi yang lebih tepat.",
        icon: Users,
    },
    {
        title: "Komisi Otomatis",
        description: "Hitung komisi kapster dari layanan selesai agar laporan owner lebih cepat selesai.",
        icon: WalletCards,
    },
    {
        title: "WhatsApp Reminder",
        description: "Ingatkan jadwal booking dan kirim promo membership langsung ke pelanggan.",
        icon: Bell,
    },
];

const loyaltyLevels = [
    {
        min: 0,
        max: 1,
        name: "New Guest",
        discount: 0,
        color: "text-white",
        benefit: "Mulai kumpulkan riwayat kunjungan.",
    },
    {
        min: 2,
        max: 4,
        name: "New Regular",
        discount: 5,
        color: "text-[#9EE493]",
        benefit: "Diskon perawatan dasar untuk kunjungan berikutnya.",
    },
    {
        min: 5,
        max: 8,
        name: "Loyal Regular",
        discount: 10,
        color: "text-[#7DD3FC]",
        benefit: "Reward otomatis untuk pelanggan yang konsisten balik.",
    },
    {
        min: 9,
        max: Infinity,
        name: "VIP Gentleman",
        discount: 15,
        color: "text-[#E9C664]",
        benefit: "Benefit VIP untuk pelanggan paling bernilai.",
    },
];

const pricingPlans = [
    {
        name: "Single Barbershop",
        price: "Rp149.000",
        period: "/bulan",
        description: "Untuk barbershop kecil yang ingin mulai menerima booking digital.",
        features: ["Maksimal 4 Kapster", "Booking Online", "Laporan Kasir"],
        icon: Scissors,
        highlighted: false,
    },
    {
        name: "Growth Barbershop",
        price: "Rp399.000",
        period: "/bulan",
        description: "Untuk owner yang butuh kontrol cabang, promosi, dan inventory.",
        features: ["Unlimited Kapster", "Multi Cabang", "WhatsApp Blast", "Inventory Management"],
        icon: Store,
        highlighted: true,
    },
];

const testimonials = [
    {
        quote: "Booking jadi lebih rapi dan pelanggan regular mulai aktif karena ada level membership.",
        name: "Raka Pratama",
        role: "Owner Crown Cut Studio",
    },
    {
        quote: "Saya bisa lihat pelanggan yang sering datang, lalu kirim promo yang cocok lewat WhatsApp.",
        name: "Dimas Aditya",
        role: "Owner Urban Trim",
    },
    {
        quote: "Laporan kapster dan komisi tidak lagi dihitung manual setiap malam. Tim jauh lebih tenang.",
        name: "Fajar Nugraha",
        role: "Owner Gentleman Works",
    },
];

const metrics = [
    { value: "500", label: "Target Pengunjung" },
    { value: "100", label: "Klik CTA" },
    { value: "30", label: "Registrasi Baru" },
];

function getLoyaltyLevel(visits) {
    return loyaltyLevels.find((level) => visits >= level.min && visits <= level.max) ?? loyaltyLevels[0];
}

export default function LandingPage() {
    const [visits, setVisits] = useState(5);
    const basePrice = 75000;
    const loyalty = useMemo(() => getLoyaltyLevel(visits), [visits]);
    const discountValue = Math.round((basePrice * loyalty.discount) / 100);
    const finalPrice = basePrice - discountValue;
    const progress = Math.min((visits / 12) * 100, 100);

    return (
        <main className="min-h-screen bg-[#070707] text-white font-sans">
            <header className="sticky top-0 z-40 border-b border-white/10 bg-[#070707]/90 backdrop-blur-xl">
                <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
                    <Link to="/" className="flex min-w-0 items-center gap-3">
                        <img
                            src={logoGroomGold}
                            alt="Logo Groom Gold"
                            className="h-10 w-auto object-contain"
                            onError={(event) => {
                                event.currentTarget.src = "/img/logopfl_geta.png";
                            }}
                        />
                        <span className="text-lg font-bold tracking-tight">
                            Groom <span className="text-[#E9C664]">Gold</span>
                        </span>
                    </Link>

                    <div className="hidden items-center gap-6 text-sm text-white/70 lg:flex">
                        <a href="#fitur" className="transition hover:text-[#E9C664]">
                            Fitur
                        </a>
                        <a href="#membership" className="transition hover:text-[#E9C664]">
                            Membership
                        </a>
                        <a href="#harga" className="transition hover:text-[#E9C664]">
                            Harga
                        </a>
                        <a href="#testimoni" className="transition hover:text-[#E9C664]">
                            Testimoni
                        </a>
                    </div>

                    <Link
                        to="/register"
                        className="inline-flex items-center justify-center rounded-lg bg-[#E9C664] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#d9b855]"
                    >
                        Daftar Sekarang
                    </Link>
                </nav>
            </header>

            <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-14 md:grid-cols-[1.04fr_0.96fr] md:py-20">
                <div>
                    <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E9C664]/30 bg-[#E9C664]/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#E9C664]">
                        Sistem Manajemen Barbershop & Membership
                    </p>
                    <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
                        Pangkas Antrean Lama, Ikat Loyalitas Pelanggan
                    </h1>
                    <p className="mt-6 max-w-xl text-base leading-8 text-white/70 md:text-lg">
                        Kelola jadwal kapster, booking online, dan sistem loyalitas pelanggan dalam satu dashboard.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Link
                            to="/register"
                            className="inline-flex items-center justify-center rounded-lg bg-[#E9C664] px-6 py-3 font-semibold text-black transition hover:bg-[#d9b855]"
                        >
                            Mulai Coba Gratis
                        </Link>
                        <a
                            href="#fitur"
                            className="inline-flex items-center justify-center rounded-lg border border-white/15 px-6 py-3 font-semibold text-white transition hover:border-[#E9C664] hover:text-[#E9C664]"
                        >
                            Pelajari Fitur
                        </a>
                    </div>

                    <div className="mt-10 grid gap-4 sm:grid-cols-3">
                        {metrics.map((metric) => (
                            <div key={metric.label} className="border-l border-white/15 pl-4">
                                <p className="text-3xl font-bold text-[#E9C664]">{metric.value}</p>
                                <p className="mt-1 text-sm text-white/55">{metric.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute inset-8 bg-[#E9C664]/20 blur-3xl" />
                    <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[#111111] shadow-2xl">
                        <img
                            src="/img/lbbarber.png"
                            alt="Barbershop modern yang menggunakan Groom Gold"
                            className="h-72 w-full object-cover md:h-[430px]"
                        />
                        <div className="grid gap-3 border-t border-white/10 bg-[#0D0D0D] p-5 sm:grid-cols-2">
                            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                                <p className="text-sm text-white/55">Booking Hari Ini</p>
                                <p className="mt-1 text-3xl font-bold">24</p>
                            </div>
                            <div className="rounded-lg border border-[#E9C664]/30 bg-[#E9C664]/10 p-4">
                                <p className="text-sm text-white/55">Member Aktif</p>
                                <p className="mt-1 text-3xl font-bold text-[#E9C664]">186</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="fitur" className="border-y border-white/10 bg-[#101010] px-5 py-16 md:py-20">
                <div className="mx-auto max-w-6xl">
                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-wide text-[#E9C664]">Fitur Utama</p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                            Operasional lebih rapi, promosi lebih personal.
                        </h2>
                        <p className="mt-4 leading-7 text-white/65">
                            Groom Gold membantu owner menjaga antrean, data pelanggan, komisi, dan reminder tetap
                            terkendali dari satu dashboard.
                        </p>
                    </div>

                    <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
                        {features.map((feature) => {
                            const Icon = feature.icon;
                            return (
                                <article
                                    key={feature.title}
                                    className="rounded-lg border border-white/10 bg-[#070707] p-5 transition hover:border-[#E9C664]/60"
                                >
                                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-[#E9C664]/15 text-[#E9C664]">
                                        <Icon size={22} />
                                    </div>
                                    <h3 className="text-lg font-bold">{feature.title}</h3>
                                    <p className="mt-3 text-sm leading-6 text-white/62">{feature.description}</p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section id="membership" className="px-5 py-16 md:py-20">
                <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wide text-[#E9C664]">
                            Loyalty Simulator
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                            Tunjukkan reward sebelum pelanggan berpindah pilihan.
                        </h2>
                        <p className="mt-4 leading-7 text-white/65">
                            Simulasikan level pelanggan berdasarkan jumlah kunjungan. Owner dapat melihat bagaimana
                            diskon otomatis mendorong pelanggan kembali lebih sering.
                        </p>

                        <div className="mt-8 grid gap-3 sm:grid-cols-2">
                            {loyaltyLevels.map((level) => (
                                <div
                                    key={level.name}
                                    className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <p className={`font-semibold ${level.color}`}>{level.name}</p>
                                        <span className="text-sm text-white/55">{level.discount}%</span>
                                    </div>
                                    <p className="mt-2 text-sm leading-6 text-white/58">{level.benefit}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-lg border border-white/10 bg-[#101010] p-6 shadow-2xl">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <p className="text-sm text-white/55">Jumlah Kunjungan Pelanggan</p>
                                <p className="mt-1 text-5xl font-extrabold text-white">{visits}</p>
                            </div>
                            <div className="inline-flex w-fit items-center gap-2 rounded-lg border border-[#E9C664]/30 bg-[#E9C664]/10 px-4 py-3 text-[#E9C664]">
                                <Crown size={20} />
                                <span className="font-semibold">{loyalty.name}</span>
                            </div>
                        </div>

                        <input
                            type="range"
                            min="0"
                            max="12"
                            value={visits}
                            onChange={(event) => setVisits(Number(event.target.value))}
                            className="mt-8 h-2 w-full cursor-pointer accent-[#E9C664]"
                            aria-label="Jumlah kunjungan pelanggan"
                        />
                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                            <div className="h-full bg-[#E9C664]" style={{ width: `${progress}%` }} />
                        </div>

                        <div className="mt-8 grid gap-4 sm:grid-cols-3">
                            <div className="rounded-lg border border-white/10 bg-[#070707] p-4">
                                <p className="text-sm text-white/55">Harga Layanan</p>
                                <p className="mt-2 text-xl font-bold">Rp75.000</p>
                            </div>
                            <div className="rounded-lg border border-[#7DD3FC]/30 bg-[#7DD3FC]/10 p-4">
                                <p className="text-sm text-white/55">Diskon Otomatis</p>
                                <p className="mt-2 text-xl font-bold text-[#7DD3FC]">
                                    Rp{discountValue.toLocaleString("id-ID")}
                                </p>
                            </div>
                            <div className="rounded-lg border border-[#9EE493]/30 bg-[#9EE493]/10 p-4">
                                <p className="text-sm text-white/55">Bayar Setelah Diskon</p>
                                <p className="mt-2 text-xl font-bold text-[#9EE493]">
                                    Rp{finalPrice.toLocaleString("id-ID")}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-4">
                            <BadgePercent className="mt-0.5 shrink-0 text-[#E9C664]" size={20} />
                            <p className="text-sm leading-6 text-white/65">
                                Sistem bisa memberi label membership otomatis, sehingga kasir dan owner tidak perlu
                                menghitung reward pelanggan secara manual.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="harga" className="border-y border-white/10 bg-[#101010] px-5 py-16 md:py-20">
                <div className="mx-auto max-w-6xl">
                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-wide text-[#E9C664]">Pricing Plan</p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                            Paket sederhana untuk mulai modernisasi.
                        </h2>
                    </div>

                    <div className="mt-10 grid gap-6 lg:grid-cols-2">
                        {pricingPlans.map((plan) => {
                            const Icon = plan.icon;
                            return (
                                <article
                                    key={plan.name}
                                    className={`rounded-lg border p-6 ${
                                        plan.highlighted
                                            ? "border-[#E9C664]/60 bg-[#E9C664]/10"
                                            : "border-white/10 bg-[#070707]"
                                    }`}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-xl font-bold">{plan.name}</p>
                                            <p className="mt-3 leading-7 text-white/62">{plan.description}</p>
                                        </div>
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[#E9C664]">
                                            <Icon size={24} />
                                        </div>
                                    </div>

                                    <div className="mt-8 flex items-end gap-1">
                                        <p className="text-4xl font-extrabold text-[#E9C664]">{plan.price}</p>
                                        <p className="pb-1 text-white/55">{plan.period}</p>
                                    </div>

                                    <ul className="mt-8 space-y-3">
                                        {plan.features.map((feature) => (
                                            <li key={feature} className="flex items-center gap-3 text-white/75">
                                                <Check size={18} className="shrink-0 text-[#9EE493]" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link
                                        to="/register"
                                        className={`mt-8 inline-flex w-full items-center justify-center rounded-lg px-5 py-3 font-semibold transition ${
                                            plan.highlighted
                                                ? "bg-[#E9C664] text-black hover:bg-[#d9b855]"
                                                : "border border-white/15 text-white hover:border-[#E9C664] hover:text-[#E9C664]"
                                        }`}
                                    >
                                        Pilih Paket
                                    </Link>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section id="testimoni" className="px-5 py-16 md:py-20">
                <div className="mx-auto max-w-6xl">
                    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div className="max-w-2xl">
                            <p className="text-sm font-semibold uppercase tracking-wide text-[#E9C664]">
                                Testimoni Owner
                            </p>
                            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                                Dibuat untuk owner yang ingin pelanggan balik lagi.
                            </h2>
                        </div>
                        <div className="flex items-center gap-2 text-[#E9C664]">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} size={20} fill="currentColor" />
                            ))}
                        </div>
                    </div>

                    <div className="mt-10 grid gap-5 md:grid-cols-3">
                        {testimonials.map((testimonial) => (
                            <article key={testimonial.name} className="rounded-lg border border-white/10 bg-[#101010] p-6">
                                <MessageCircle className="text-[#E9C664]" size={24} />
                                <p className="mt-5 leading-7 text-white/72">"{testimonial.quote}"</p>
                                <div className="mt-6 border-t border-white/10 pt-5">
                                    <p className="font-semibold">{testimonial.name}</p>
                                    <p className="mt-1 text-sm text-white/55">{testimonial.role}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section id="cta" className="border-y border-[#E9C664]/25 bg-[#E9C664] px-5 py-16 text-black md:py-20">
                <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
                    <div className="max-w-3xl">
                        <p className="text-sm font-semibold uppercase tracking-wide text-black/60">
                            Groom Gold Basic Landing
                        </p>
                        <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">
                            Modernisasi Manajemen Barbershop Anda Sekarang
                        </h2>
                    </div>
                    <Link
                        to="/register"
                        className="inline-flex w-full items-center justify-center rounded-lg bg-black px-7 py-3 font-semibold text-white transition hover:bg-[#2A2A2A] sm:w-auto"
                    >
                        Daftar Sekarang
                    </Link>
                </div>
            </section>

            <footer id="kontak" className="bg-[#050505] px-5 py-12">
                <div className="mx-auto max-w-6xl">
                    <div className="grid gap-10 sm:grid-cols-3">
                        <div>
                            <div className="flex items-center gap-3">
                                <img
                                    src={logoGroomGold}
                                    alt="Logo Groom Gold"
                                    className="h-12 w-auto object-contain"
                                    onError={(event) => {
                                        event.currentTarget.src = "/img/logopfl_geta.png";
                                    }}
                                />
                                <span className="text-lg font-bold">
                                    Groom <span className="text-[#E9C664]">Gold</span>
                                </span>
                            </div>
                            <p className="mt-3 max-w-xs text-sm leading-6 text-white/55">
                                Landing page promosi sistem manajemen barbershop dan membership pelanggan.
                            </p>
                        </div>

                        <div>
                            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wide text-white">Navigasi</h4>
                            <ul className="space-y-2 text-sm text-white/60">
                                <li>
                                    <a href="#fitur" className="transition hover:text-[#E9C664]">
                                        Fitur
                                    </a>
                                </li>
                                <li>
                                    <a href="#membership" className="transition hover:text-[#E9C664]">
                                        Membership
                                    </a>
                                </li>
                                <li>
                                    <a href="#harga" className="transition hover:text-[#E9C664]">
                                        Pricing
                                    </a>
                                </li>
                                <li>
                                    <a href="#testimoni" className="transition hover:text-[#E9C664]">
                                        Testimoni
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wide text-white">
                                Hubungi Kami
                            </h4>
                            <div className="space-y-2 text-sm text-white/60">
                                <p>Email: groomgold@groomgold.id</p>
                                <p>WhatsApp: +62 812-3456-7890</p>
                                <p>Lokasi: Pekanbaru, Riau</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 border-t border-white/10 pt-7 text-center">
                        <p className="text-xs text-white/40">&copy; 2026 Groom Gold. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
        </main>
    );
}
