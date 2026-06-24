import { Link } from "react-router-dom";
import {
    BadgePercent,
    BarChart3,
    Bell,
    BriefcaseBusiness,
    CalendarCheck,
    Check,
    ChevronRight,
    CircleDollarSign,
    ClipboardList,
    Clock3,
    Crown,
    Database,
    Gift,
    LineChart,
    MessageCircle,
    PackageCheck,
    ReceiptText,
    Scissors,
    ShieldCheck,
    Sparkles,
    Star,
    Store,
    UserCheck,
    WalletCards,
} from "lucide-react";

import logoGroomGold from "/public/img/logopfl_geta.png";

const navItems = [
    { label: "Persona", href: "#persona" },
    { label: "CRM", href: "#crm" },
    { label: "Journey", href: "#journey" },
    { label: "Analytics", href: "#analytics" },
    { label: "Harga", href: "#harga" },
    { label: "FAQ", href: "#faq" },
];

const stats = [
    { value: "500+", label: "Barbershop Aktif" },
    { value: "50.000+", label: "Booking Diproses" },
    { value: "95%", label: "Kepuasan Pelanggan" },
];

const personas = [
    {
        role: "Owner",
        description: "Kontrol bisnis, cabang, revenue, dan performa tim dari satu pusat data.",
        icon: BriefcaseBusiness,
        features: ["Dashboard Bisnis", "Monitoring Cabang", "Analisis Pendapatan"],
    },
    {
        role: "Kapster",
        description: "Jadwal kerja lebih jelas, komisi transparan, dan riwayat pelanggan mudah dibaca.",
        icon: Scissors,
        features: ["Jadwal Otomatis", "Komisi Real Time", "Riwayat Pelanggan"],
    },
    {
        role: "Pelanggan",
        description: "Booking lebih cepat, reward otomatis, dan benefit membership terasa personal.",
        icon: UserCheck,
        features: ["Booking Online", "Loyalty Point", "Membership"],
    },
];

const problems = ["Antrean Panjang", "Booking Manual", "Data Hilang", "Komisi Manual"];

const crmFeatures = [
    {
        title: "Online Booking",
        description: "Pelanggan memilih layanan, jadwal, dan kapster tanpa antre panjang.",
        icon: CalendarCheck,
    },
    {
        title: "Customer Database",
        description: "Profil pelanggan, preferensi potongan, transaksi, dan histori tersimpan rapi.",
        icon: Database,
    },
    {
        title: "Loyalty Program",
        description: "Point dan reward otomatis mendorong pelanggan datang lebih sering.",
        icon: BadgePercent,
    },
    {
        title: "Membership System",
        description: "Kelola benefit member, tier pelanggan, dan promo eksklusif.",
        icon: Crown,
    },
    {
        title: "WhatsApp Reminder",
        description: "Kirim reminder booking dan promo personal ke pelanggan yang tepat.",
        icon: Bell,
    },
    {
        title: "POS Kasir",
        description: "Transaksi layanan, produk, diskon, dan pembayaran tercatat dalam satu alur.",
        icon: ReceiptText,
    },
    {
        title: "Inventory Management",
        description: "Pantau stok pomade, shampoo, treatment, dan produk retail.",
        icon: PackageCheck,
    },
    {
        title: "Analytics Dashboard",
        description: "Baca revenue, booking, retensi, dan performa cabang secara cepat.",
        icon: BarChart3,
    },
];

const journeySteps = [
    { title: "Booking Online", icon: CalendarCheck },
    { title: "Kapster Melayani", icon: Scissors },
    { title: "Pembayaran", icon: WalletCards },
    { title: "Loyalty Point Bertambah", icon: Gift },
    { title: "Promo Personal", icon: MessageCircle },
    { title: "Repeat Order", icon: Clock3 },
];

const analyticsMetrics = [
    { label: "Revenue Bulan Ini", value: "Rp128,4 jt", trend: "+18%", icon: CircleDollarSign },
    { label: "Booking Diproses", value: "1.284", trend: "+32%", icon: CalendarCheck },
    { label: "Retention Rate", value: "72%", trend: "+11%", icon: LineChart },
];

const testimonials = [
    {
        quote: "Saya bisa lihat cabang mana yang ramai, layanan paling laku, dan promo yang benar-benar balik jadi booking.",
        name: "Raka Pratama",
        role: "Owner Crown Cut Studio",
    },
    {
        quote: "Jadwal lebih jelas dan komisi tidak perlu ditebak. Saya tinggal fokus melayani pelanggan.",
        name: "Dimas Aditya",
        role: "Kapster Urban Trim",
    },
    {
        quote: "Booking tinggal pilih jam, point langsung masuk, dan promo yang datang sesuai kebiasaan saya.",
        name: "Fajar Nugraha",
        role: "Pelanggan Gentleman Works",
    },
];

const pricingPlans = [
    {
        name: "Starter",
        price: "Rp149.000",
        period: "/bulan",
        description: "Untuk barbershop yang mulai merapikan booking, pelanggan, dan transaksi.",
        features: ["Booking Online", "Customer Database", "Laporan Dasar", "Maksimal 4 Kapster"],
        icon: Store,
        highlighted: false,
    },
    {
        name: "Professional",
        price: "Rp399.000",
        period: "/bulan",
        description: "Untuk bisnis yang butuh CRM lengkap, komisi, reminder, dan analytics.",
        features: ["Semua fitur Starter", "Komisi Real Time", "WhatsApp Reminder", "Analytics Dashboard"],
        icon: Sparkles,
        highlighted: true,
    },
    {
        name: "Enterprise",
        price: "Custom Pricing",
        period: "",
        description: "Untuk multi cabang dengan kebutuhan implementasi dan dukungan khusus.",
        features: ["Multi Cabang", "Role & Permission", "Priority Support", "Custom Onboarding"],
        icon: ShieldCheck,
        highlighted: false,
    },
];

const faqs = [
    {
        question: "Apakah Groom Gold bisa dicoba sebelum berlangganan?",
        answer: "Ya. Owner dapat mulai dari tombol Mulai Gratis untuk registrasi dan mencoba alur utama landing ke dashboard.",
    },
    {
        question: "Apakah akses Owner, Kapster, dan Pelanggan berbeda?",
        answer: "Ya. Setiap role dirancang untuk kebutuhan berbeda: owner memantau bisnis, kapster mengelola jadwal dan komisi, pelanggan melakukan booking dan melihat benefit.",
    },
    {
        question: "Apakah reminder WhatsApp tersedia?",
        answer: "Tersedia sebagai bagian dari fitur CRM untuk reminder booking, promo personal, dan komunikasi membership.",
    },
    {
        question: "Apakah Groom Gold mendukung lebih dari satu cabang?",
        answer: "Ya. Monitoring cabang tersedia untuk kebutuhan growth dan multi cabang, terutama pada paket Professional dan Enterprise.",
    },
    {
        question: "Bagaimana loyalty point dan membership bekerja?",
        answer: "Sistem mencatat kunjungan dan transaksi pelanggan, lalu membantu bisnis memberikan point, tier membership, dan promo yang lebih personal.",
    },
    {
        question: "Paket mana yang cocok untuk barbershop baru?",
        answer: "Starter cocok untuk mulai digitalisasi. Professional cocok saat bisnis membutuhkan komisi, reminder, dan analytics yang lebih lengkap.",
    },
];

function SectionHeader({ eyebrow, title, description }) {
    return (
        <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#E9C664]">{eyebrow}</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl">{title}</h2>
            {description ? <p className="mt-4 leading-7 text-white/65">{description}</p> : null}
        </div>
    );
}

export default function LandingPage() {
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

                    <div className="hidden items-center gap-5 text-sm text-white/70 xl:flex">
                        {navItems.map((item) => (
                            <a key={item.href} href={item.href} className="transition hover:text-[#E9C664]">
                                {item.label}
                            </a>
                        ))}
                    </div>

                    <Link
                        to="/register"
                        className="inline-flex items-center justify-center rounded-lg bg-[#E9C664] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#d9b855]"
                    >
                        Mulai Gratis
                    </Link>
                </nav>
            </header>

            <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-14 md:grid-cols-[1.02fr_0.98fr] md:py-20">
                <div>
                    <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E9C664]/30 bg-[#E9C664]/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#E9C664]">
                        CRM Barbershop untuk Owner, Kapster, dan Pelanggan
                    </p>
                    <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
                        Kelola Barbershop Lebih Modern, Loyalitas Pelanggan Lebih Kuat
                    </h1>
                    <p className="mt-6 max-w-xl text-base leading-8 text-white/70 md:text-lg">
                        Groom Gold menyatukan booking online, customer database, loyalty, membership, POS, komisi
                        kapster, dan analytics dalam satu ekosistem CRM.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Link
                            to="/register"
                            className="inline-flex items-center justify-center rounded-lg bg-[#E9C664] px-6 py-3 font-semibold text-black transition hover:bg-[#d9b855]"
                        >
                            Mulai Gratis
                        </Link>
                        <a
                            href="#analytics"
                            className="inline-flex items-center justify-center rounded-lg border border-white/15 px-6 py-3 font-semibold text-white transition hover:border-[#E9C664] hover:text-[#E9C664]"
                        >
                            Lihat Demo
                        </a>
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
                        <div className="grid gap-3 border-t border-white/10 bg-[#0D0D0D] p-5 sm:grid-cols-3">
                            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                                <p className="text-sm text-white/55">Booking Hari Ini</p>
                                <p className="mt-1 text-3xl font-bold">124</p>
                            </div>
                            <div className="rounded-lg border border-[#E9C664]/30 bg-[#E9C664]/10 p-4">
                                <p className="text-sm text-white/55">Member Aktif</p>
                                <p className="mt-1 text-3xl font-bold text-[#E9C664]">2.186</p>
                            </div>
                            <div className="rounded-lg border border-[#9EE493]/30 bg-[#9EE493]/10 p-4">
                                <p className="text-sm text-white/55">Repeat Order</p>
                                <p className="mt-1 text-3xl font-bold text-[#9EE493]">72%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="statistics" className="border-y border-white/10 bg-[#101010] px-5 py-10">
                <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-3">
                    {stats.map((stat) => (
                        <div key={stat.label} className="rounded-lg border border-white/10 bg-[#070707] p-5">
                            <p className="text-3xl font-extrabold text-[#E9C664] md:text-4xl">{stat.value}</p>
                            <p className="mt-2 text-sm text-white/60">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section id="persona" className="px-5 py-16 md:py-20">
                <div className="mx-auto max-w-6xl">
                    <SectionHeader
                        eyebrow="Manfaat Berdasarkan Role"
                        title="Satu CRM, tiga pengalaman yang sama-sama produktif."
                        description="Owner mendapatkan visibilitas bisnis, kapster bekerja lebih tertata, pelanggan mendapat pengalaman booking dan reward yang lebih mulus."
                    />

                    <div className="mt-10 grid gap-5 lg:grid-cols-3">
                        {personas.map((persona) => {
                            const Icon = persona.icon;
                            return (
                                <article
                                    key={persona.role}
                                    className="rounded-lg border border-white/10 bg-[#101010] p-6 transition hover:border-[#E9C664]/60"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#E9C664]/15 text-[#E9C664]">
                                        <Icon size={24} />
                                    </div>
                                    <h3 className="mt-5 text-2xl font-bold">{persona.role}</h3>
                                    <p className="mt-3 leading-7 text-white/62">{persona.description}</p>
                                    <ul className="mt-6 space-y-3">
                                        {persona.features.map((feature) => (
                                            <li key={feature} className="flex items-center gap-3 text-white/78">
                                                <Check size={18} className="shrink-0 text-[#9EE493]" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="border-y border-white/10 bg-[#101010] px-5 py-16 md:py-20">
                <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
                    <SectionHeader
                        eyebrow="Problem & Solution"
                        title="Masalah operasional harian berubah menjadi data CRM yang bisa ditindaklanjuti."
                        description="Groom Gold menghubungkan antrean, booking, transaksi, komisi, dan data pelanggan agar setiap kunjungan punya jejak yang jelas."
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                        {problems.map((problem) => (
                            <div key={problem} className="rounded-lg border border-[#ef4444]/25 bg-[#ef4444]/10 p-5">
                                <p className="text-sm font-semibold uppercase tracking-wide text-[#FCA5A5]">Masalah</p>
                                <p className="mt-2 text-xl font-bold">{problem}</p>
                            </div>
                        ))}
                        <div className="rounded-lg border border-[#E9C664]/40 bg-[#E9C664]/10 p-5 sm:col-span-2">
                            <p className="text-sm font-semibold uppercase tracking-wide text-[#E9C664]">Solusi</p>
                            <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-3xl font-extrabold text-[#E9C664]">Groom Gold CRM</p>
                                <Link
                                    to="/register"
                                    className="inline-flex items-center justify-center rounded-lg bg-[#E9C664] px-5 py-3 font-semibold text-black transition hover:bg-[#d9b855]"
                                >
                                    Registrasi Sekarang
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="crm" className="px-5 py-16 md:py-20">
                <div className="mx-auto max-w-6xl">
                    <SectionHeader
                        eyebrow="CRM Features"
                        title="Fitur CRM lengkap untuk menjaga pelanggan tetap kembali."
                        description="Dari booking pertama sampai promo personal, setiap fitur membantu barbershop memahami pelanggan dan mengambil keputusan lebih cepat."
                    />

                    <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                        {crmFeatures.map((feature) => {
                            const Icon = feature.icon;
                            return (
                                <article
                                    key={feature.title}
                                    className="rounded-lg border border-white/10 bg-[#101010] p-5 transition hover:border-[#E9C664]/60"
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

            <section id="journey" className="border-y border-white/10 bg-[#101010] px-5 py-16 md:py-20">
                <div className="mx-auto max-w-6xl">
                    <SectionHeader
                        eyebrow="Customer Journey"
                        title="Setiap kunjungan pelanggan menjadi siklus loyalitas."
                        description="Groom Gold menjaga pengalaman pelanggan dari booking sampai repeat order, sekaligus memberi owner data yang siap dipakai."
                    />

                    <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
                        {journeySteps.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <article key={step.title} className="rounded-lg border border-white/10 bg-[#070707] p-5">
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#E9C664]/15 text-[#E9C664]">
                                            <Icon size={22} />
                                        </div>
                                        <span className="text-sm font-bold text-white/35">0{index + 1}</span>
                                    </div>
                                    <h3 className="mt-5 min-h-12 text-lg font-bold leading-6">{step.title}</h3>
                                    {index < journeySteps.length - 1 ? (
                                        <ChevronRight className="mt-5 hidden text-white/30 lg:block" size={22} />
                                    ) : null}
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section id="analytics" className="px-5 py-16 md:py-20">
                <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.88fr_1.12fr]">
                    <div>
                        <SectionHeader
                            eyebrow="Analytics Dashboard"
                            title="Revenue, booking, dan retention rate terlihat dalam satu layar."
                            description="Owner dapat membaca performa harian, melihat layanan terlaris, memantau retensi, dan menentukan promo yang lebih tepat."
                        />
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link
                                to="/register"
                                className="inline-flex items-center justify-center rounded-lg bg-[#E9C664] px-6 py-3 font-semibold text-black transition hover:bg-[#d9b855]"
                            >
                                Mulai Gratis
                            </Link>
                            <a
                                href="#harga"
                                className="inline-flex items-center justify-center rounded-lg border border-white/15 px-6 py-3 font-semibold text-white transition hover:border-[#E9C664] hover:text-[#E9C664]"
                            >
                                Lihat Harga
                            </a>
                        </div>
                    </div>

                    <div className="rounded-lg border border-white/10 bg-[#101010] p-6 shadow-2xl">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-wide text-[#E9C664]">
                                    Dashboard Analytics
                                </p>
                                <h3 className="mt-2 text-2xl font-bold">Performa Bisnis</h3>
                            </div>
                            <div className="inline-flex w-fit items-center gap-2 rounded-lg border border-[#9EE493]/30 bg-[#9EE493]/10 px-4 py-3 text-[#9EE493]">
                                <LineChart size={20} />
                                <span className="font-semibold">Conversion 12,8%</span>
                            </div>
                        </div>

                        <div className="mt-6 grid gap-4 md:grid-cols-3">
                            {analyticsMetrics.map((metric) => {
                                const Icon = metric.icon;
                                return (
                                    <div key={metric.label} className="rounded-lg border border-white/10 bg-[#070707] p-4">
                                        <Icon className="text-[#E9C664]" size={22} />
                                        <p className="mt-4 text-sm text-white/55">{metric.label}</p>
                                        <div className="mt-2 flex items-end justify-between gap-3">
                                            <p className="text-2xl font-extrabold">{metric.value}</p>
                                            <span className="text-sm font-semibold text-[#9EE493]">{metric.trend}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-6 rounded-lg border border-white/10 bg-[#070707] p-5">
                            <div className="flex items-center justify-between gap-4">
                                <p className="font-semibold">Revenue per Minggu</p>
                                <p className="text-sm text-white/55">Live CRM Signal</p>
                            </div>
                            <div className="mt-6 flex h-40 items-end gap-3">
                                {[42, 58, 51, 74, 66, 88, 96].map((height, index) => (
                                    <div key={height + index} className="flex flex-1 flex-col items-center gap-2">
                                        <div
                                            className="w-full rounded-t-lg bg-[#E9C664]"
                                            style={{ height: `${height}%` }}
                                        />
                                        <span className="text-xs text-white/40">D{index + 1}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6 flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-4">
                            <ClipboardList className="mt-0.5 shrink-0 text-[#E9C664]" size={20} />
                            <p className="text-sm leading-6 text-white/65">
                                Dashboard ini menjadi tujuan demo untuk tombol Lihat Demo dan Jadwalkan Demo.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="testimoni" className="border-y border-white/10 bg-[#101010] px-5 py-16 md:py-20">
                <div className="mx-auto max-w-6xl">
                    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <SectionHeader
                            eyebrow="Testimonial"
                            title="Dipakai oleh role yang berbeda, untuk hasil yang sama: pelanggan lebih loyal."
                        />
                        <div className="flex items-center gap-2 text-[#E9C664]">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} size={20} fill="currentColor" />
                            ))}
                        </div>
                    </div>

                    <div className="mt-10 grid gap-5 md:grid-cols-3">
                        {testimonials.map((testimonial) => (
                            <article key={testimonial.name} className="rounded-lg border border-white/10 bg-[#070707] p-6">
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

            <section id="harga" className="px-5 py-16 md:py-20">
                <div className="mx-auto max-w-6xl">
                    <SectionHeader
                        eyebrow="Pricing"
                        title="Paket sesuai tahap pertumbuhan barbershop."
                        description="Mulai dari digitalisasi booking sampai CRM multi cabang dengan dukungan implementasi khusus."
                    />

                    <div className="mt-10 grid gap-6 lg:grid-cols-3">
                        {pricingPlans.map((plan) => {
                            const Icon = plan.icon;
                            return (
                                <article
                                    key={plan.name}
                                    className={`rounded-lg border p-6 ${
                                        plan.highlighted
                                            ? "border-[#E9C664]/60 bg-[#E9C664]/10"
                                            : "border-white/10 bg-[#101010]"
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

                                    <div className="mt-8 flex flex-wrap items-end gap-1">
                                        <p className="text-4xl font-extrabold text-[#E9C664]">{plan.price}</p>
                                        {plan.period ? <p className="pb-1 text-white/55">{plan.period}</p> : null}
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

            <section id="faq" className="border-y border-white/10 bg-[#101010] px-5 py-16 md:py-20">
                <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
                    <SectionHeader
                        eyebrow="FAQ"
                        title="Pertanyaan umum sebelum mulai memakai Groom Gold."
                        description="Ringkas, praktis, dan fokus pada hal yang biasanya ditanyakan owner sebelum registrasi."
                    />

                    <div className="grid gap-4">
                        {faqs.map((faq) => (
                            <article key={faq.question} className="rounded-lg border border-white/10 bg-[#070707] p-5">
                                <h3 className="text-lg font-bold">{faq.question}</h3>
                                <p className="mt-3 leading-7 text-white/62">{faq.answer}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section id="cta" className="border-y border-[#E9C664]/25 bg-[#E9C664] px-5 py-16 text-black md:py-20">
                <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
                    <div className="max-w-3xl">
                        <p className="text-sm font-semibold uppercase tracking-wide text-black/60">
                            Groom Gold CRM Landing Page
                        </p>
                        <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">
                            Siap Membawa Barbershop Anda ke Level Berikutnya?
                        </h2>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Link
                            to="/register"
                            className="inline-flex items-center justify-center rounded-lg bg-black px-7 py-3 font-semibold text-white transition hover:bg-[#2A2A2A]"
                        >
                            Mulai Gratis
                        </Link>
                        <a
                            href="#analytics"
                            className="inline-flex items-center justify-center rounded-lg border border-black/20 px-7 py-3 font-semibold text-black transition hover:bg-black/10"
                        >
                            Jadwalkan Demo
                        </a>
                    </div>
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
                                CRM landing page untuk owner, kapster, dan pelanggan barbershop modern.
                            </p>
                        </div>

                        <div>
                            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wide text-white">Navigasi</h4>
                            <ul className="space-y-2 text-sm text-white/60">
                                {navItems.map((item) => (
                                    <li key={item.href}>
                                        <a href={item.href} className="transition hover:text-[#E9C664]">
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
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
