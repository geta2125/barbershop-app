import { useState, useEffect } from "react";
import { db } from "../../services/localDB";
import {
    FiSearch,
    FiShoppingCart,
    FiPlus,
    FiMinus,
    FiTrash2,
    FiUser,
    FiChevronDown,
    FiPrinter,
    FiCheckCircle,
    FiX
} from "react-icons/fi";
import { FaCashRegister } from "react-icons/fa";

const productsList = [
    { id: 101, nama_service: "GroomGold Pomade Strong Hold", kategori: "Product", harga: 120000, gambar: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=256&q=80" },
    { id: 102, nama_service: "GroomGold Hair Tonic Anti-Hairfall", kategori: "Product", harga: 95000, gambar: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=256&q=80" },
    { id: 103, nama_service: "GroomGold Beard Oil Sandalwood", kategori: "Product", harga: 85000, gambar: "https://images.unsplash.com/photo-1626015829430-79b97cd201f8?auto=format&fit=crop&w=256&q=80" },
    { id: 104, nama_service: "Premium Shaving Cream Sensitive", kategori: "Product", harga: 65000, gambar: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=256&q=80" },
    { id: 105, nama_service: "GroomGold Matte Clay Natural Look", kategori: "Product", harga: 110000, gambar: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=256&q=80" },
];

export default function Pos() {
    const [services, setServices] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [barbers, setBarbers] = useState([]);

    const [activeTab, setActiveTab] = useState("services"); // "services" | "products"
    const [searchQuery, setSearchQuery] = useState("");
    const [cart, setCart] = useState([]);

    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [selectedBarber, setSelectedBarber] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("Cash");

    // Loyalty Points discount simulation
    const [usePoints, setUsePoints] = useState(false);
    const [customerPoints, setCustomerPoints] = useState(0);

    // Modal state
    const [receiptData, setReceiptData] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        // Load collections
        const allServices = db.getServices().filter(s => s.status === "Aktif");
        const allCustomers = db.getCustomers().filter(c => c.Status_Aktif === "Aktif");
        const allBarbers = db.getBarbers().filter(b => b.status !== "Nonaktif" && b.status !== false && b.status !== "false");

        setServices(allServices);
        setCustomers(allCustomers);
        setBarbers(allBarbers);

        if (allBarbers.length > 0) {
            setSelectedBarber(allBarbers[0].name);
        }
    }, []);

    // Manage point calculations for selected customer
    useEffect(() => {
        if (selectedCustomer) {
            // Member has points derived randomly or from database
            const calculatedPoints = Math.floor((selectedCustomer.Total_Pengeluaran || 100000) / 1000);
            setCustomerPoints(calculatedPoints);
        } else {
            setCustomerPoints(0);
            setUsePoints(false);
        }
    }, [selectedCustomer]);

    const handleAddToCart = (item) => {
        const existing = cart.find(c => c.id === item.id && c.kategori === item.kategori);
        if (existing) {
            setCart(cart.map(c => c.id === item.id && c.kategori === item.kategori ? { ...c, qty: c.qty + 1 } : c));
        } else {
            setCart([...cart, { ...item, qty: 1 }]);
        }
    };

    const handleUpdateQty = (item, delta) => {
        const nextQty = item.qty + delta;
        if (nextQty <= 0) {
            setCart(cart.filter(c => !(c.id === item.id && c.kategori === item.kategori)));
        } else {
            setCart(cart.map(c => c.id === item.id && c.kategori === item.kategori ? { ...c, qty: nextQty } : c));
        }
    };

    const handleRemoveFromCart = (item) => {
        setCart(cart.filter(c => !(c.id === item.id && c.kategori === item.kategori)));
    };

    // Calculate billing
    const subtotal = cart.reduce((acc, curr) => acc + (curr.harga * curr.qty), 0);
    // 1 Point = Rp 100 discount
    const discount = usePoints ? Math.min(customerPoints * 100, subtotal) : 0;
    const total = subtotal - discount;

    const handleCheckout = () => {
        if (cart.length === 0) return;
        if (!selectedCustomer) {
            alert("Silakan pilih Pelanggan terlebih dahulu.");
            return;
        }

        const bookingId = `BKG-${Math.floor(100000 + Math.random() * 900000)}`;
        const dateStr = new Date().toISOString();

        // 1. Create a simulated Completed Booking to feed the transactions table
        const newBooking = {
            id: bookingId,
            id_booking: bookingId,
            nama_customer: selectedCustomer.Nama_Lengkap,
            layanan: cart.map(c => c.nama_service).join(", "),
            barber: selectedBarber || "General Staff",
            harga: total,
            jadwal: dateStr,
            status_booking: "Completed",
            status_pembayaran: "Lunas",
            metode_pembayaran: paymentMethod
        };

        const bookings = db.getBookings();
        bookings.unshift(newBooking);
        db.saveBookings(bookings);

        // 2. Update Customer Spend & visits in Customers table
        const allCustomers = db.getCustomers();
        const updatedCustomers = allCustomers.map(c => {
            if (String(c.ID_Customer) === String(selectedCustomer.ID_Customer)) {
                return {
                    ...c,
                    Total_Transaksi: (c.Total_Transaksi || 0) + 1,
                    Total_Pengeluaran: (c.Total_Pengeluaran || 0) + total,
                    Transaksi_Terakhir: dateStr.replace("T", " ").substring(0, 19)
                };
            }
            return c;
        });
        db.saveCustomers(updatedCustomers);

        // Set invoice modal data
        setReceiptData({
            invoiceNo: bookingId,
            date: dateStr,
            customer: selectedCustomer.Nama_Lengkap,
            barber: selectedBarber || "General Staff",
            items: [...cart],
            subtotal,
            discount,
            total,
            paymentMethod
        });

        // Clear states
        setCart([]);
        setSelectedCustomer(null);
        setUsePoints(false);
        setShowSuccess(true);
    };

    const handlePrintReceipt = () => {
        window.print();
    };

    // Filter items based on search and tab selection
    const itemsList = activeTab === "services" ? services : productsList;
    const filteredItems = itemsList.filter(item =>
        item.nama_service.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex flex-col xl:flex-row gap-6 p-6 min-h-[calc(100vh-120px)] bg-[#0d0d14] text-white">
            {/* LEFT PANEL: CATALOG LIST */}
            <div className="flex-1 bg-[#111116] border border-[#1a1a24] rounded-2xl p-6 flex flex-col">
                {/* HEAD & SEARCH */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <FaCashRegister className="text-[#dfb34c]" />
                            Kasir POS GroomGold
                        </h2>
                        <p className="text-xs text-gray-500">Buat pesanan jasa & produk langsung secara instan</p>
                    </div>

                    <div className="relative w-full sm:w-64">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                            <FiSearch size={16} />
                        </span>
                        <input
                            type="text"
                            placeholder="Cari item..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-[#16161e] border border-[#242335] rounded-xl text-xs text-white placeholder-gray-500 focus:border-[#dfb34c] focus:outline-none transition"
                        />
                    </div>
                </div>

                {/* TABS SELECTOR */}
                <div className="flex border-b border-[#242335] mb-6">
                    <button
                        onClick={() => { setActiveTab("services"); setSearchQuery(""); }}
                        className={`px-6 py-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition ${
                            activeTab === "services"
                                ? "border-[#dfb34c] text-white bg-[#dfb34c]/5"
                                : "border-transparent text-gray-500 hover:text-white"
                        }`}
                    >
                        Jasa Layanan
                    </button>
                    <button
                        onClick={() => { setActiveTab("products"); setSearchQuery(""); }}
                        className={`px-6 py-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition ${
                            activeTab === "products"
                                ? "border-[#dfb34c] text-white bg-[#dfb34c]/5"
                                : "border-transparent text-gray-500 hover:text-white"
                        }`}
                    >
                        Produk Retail
                    </button>
                </div>

                {/* ITEMS GRID */}
                <div className="flex-1 overflow-y-auto max-h-[500px] no-scrollbar grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {filteredItems.length === 0 ? (
                        <p className="text-center col-span-full py-10 text-xs text-gray-500">Tidak ada item ditemukan.</p>
                    ) : (
                        filteredItems.map(item => (
                            <div
                                key={`${item.id}-${item.kategori}`}
                                className="bg-[#16161e] border border-[#242335] rounded-xl p-4 flex flex-col justify-between hover:border-[#dfb34c]/30 transition group"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="w-12 h-12 rounded-lg bg-[#242335] overflow-hidden flex-shrink-0">
                                        <img
                                            src={item.gambar && item.gambar.startsWith("http") ? item.gambar : `/img/lbbarber.png`}
                                            alt={item.nama_service}
                                            className="w-full h-full object-cover group-hover:scale-105 transition"
                                            onError={(e) => { e.target.src = "/img/lbbarber.png"; }}
                                        />
                                    </div>
                                    <div className="leading-tight">
                                        <h4 className="text-xs font-bold text-white group-hover:text-[#dfb34c] transition line-clamp-2">
                                            {item.nama_service}
                                        </h4>
                                        <span className="text-[10px] text-[#dfb34c]/80 uppercase tracking-widest mt-1 block">
                                            {item.kategori || "Service"}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center justify-between pt-2 border-t border-[#242335]/60">
                                    <span className="text-xs font-black text-[#dfb34c]">
                                        Rp {item.harga.toLocaleString("id-ID")}
                                    </span>
                                    <button
                                        onClick={() => handleAddToCart(item)}
                                        className="w-7 h-7 rounded-lg bg-[#dfb34c] text-black hover:opacity-90 active:scale-95 flex items-center justify-center transition"
                                    >
                                        <FiPlus size={14} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* RIGHT PANEL: BILLING CART & CHECKOUT */}
            <div className="w-full xl:w-96 bg-[#111116] border border-[#1a1a24] rounded-2xl p-6 flex flex-col justify-between">
                <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#dfb34c] mb-4 pb-2 border-b border-[#242335] flex items-center justify-between">
                        <span>Detail Tagihan</span>
                        <FiShoppingCart className="text-gray-500" />
                    </h3>

                    {/* CUSTOMER SELECTOR */}
                    <div className="mb-4">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">
                            Pilih Pelanggan (Member)
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                <FiUser size={14} />
                            </span>
                            <select
                                value={selectedCustomer ? JSON.stringify(selectedCustomer) : ""}
                                onChange={(e) => setSelectedCustomer(e.target.value ? JSON.parse(e.target.value) : null)}
                                className="w-full pl-9 pr-8 py-2.5 bg-[#16161e] border border-[#242335] rounded-xl text-xs text-white outline-none focus:border-[#dfb34c] appearance-none cursor-pointer"
                            >
                                <option value="">-- Pilih Customer --</option>
                                {customers.map(c => (
                                    <option key={c.ID_Customer} value={JSON.stringify(c)}>
                                        {c.Nama_Lengkap} ({c.Level_Membership || "Member"})
                                    </option>
                                ))}
                            </select>
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                                <FiChevronDown size={14} />
                            </span>
                        </div>
                    </div>

                    {/* BARBER SELECTOR */}
                    <div className="mb-6">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">
                            Barber Yang Melayani
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                <FiUser size={14} />
                            </span>
                            <select
                                value={selectedBarber}
                                onChange={(e) => setSelectedBarber(e.target.value)}
                                className="w-full pl-9 pr-8 py-2.5 bg-[#16161e] border border-[#242335] rounded-xl text-xs text-white outline-none focus:border-[#dfb34c] appearance-none cursor-pointer"
                            >
                                {barbers.map(b => (
                                    <option key={b.id} value={b.name}>
                                        {b.name} (Rating: {b.rating})
                                    </option>
                                ))}
                            </select>
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                                <FiChevronDown size={14} />
                            </span>
                        </div>
                    </div>

                    {/* CART ITEMS CONTAINER */}
                    <div className="space-y-3 mb-6 max-h-[180px] overflow-y-auto no-scrollbar pr-1">
                        {cart.length === 0 ? (
                            <p className="text-center text-xs text-gray-600 py-6">Keranjang kosong. Tambahkan item di samping.</p>
                        ) : (
                            cart.map(item => (
                                <div
                                    key={`${item.id}-${item.kategori}`}
                                    className="bg-[#16161e] border border-[#242335]/65 rounded-xl p-3 flex items-center justify-between gap-3"
                                >
                                    <div className="flex-1 min-w-0">
                                        <h5 className="text-xs font-semibold text-white truncate">{item.nama_service}</h5>
                                        <p className="text-[10px] text-[#dfb34c] mt-0.5">
                                            Rp {item.harga.toLocaleString("id-ID")}
                                        </p>
                                    </div>

                                    {/* QTY CONTROLS */}
                                    <div className="flex items-center gap-2 bg-[#242335]/40 rounded-lg p-1">
                                        <button
                                            onClick={() => handleUpdateQty(item, -1)}
                                            className="w-5 h-5 rounded bg-[#242335] hover:opacity-80 text-white flex items-center justify-center transition"
                                        >
                                            <FiMinus size={10} />
                                        </button>
                                        <span className="text-[11px] font-bold px-1">{item.qty}</span>
                                        <button
                                            onClick={() => handleUpdateQty(item, 1)}
                                            className="w-5 h-5 rounded bg-[#242335] hover:opacity-80 text-white flex items-center justify-center transition"
                                        >
                                            <FiPlus size={10} />
                                        </button>
                                    </div>

                                    {/* DELETE */}
                                    <button
                                        onClick={() => handleRemoveFromCart(item)}
                                        className="text-gray-500 hover:text-red-400 p-1 transition"
                                    >
                                        <FiTrash2 size={13} />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    {/* REDEEM POINTS */}
                    {selectedCustomer && customerPoints > 0 && (
                        <div className="bg-[#16161e] border border-[#242335]/70 rounded-xl p-3 mb-6 flex items-center justify-between">
                            <div className="leading-tight">
                                <span className="text-[10px] text-gray-500 font-medium">Poin Pelanggan</span>
                                <h4 className="text-xs font-bold text-white mt-0.5">{customerPoints} Poin</h4>
                            </div>
                            <button
                                onClick={() => setUsePoints(!usePoints)}
                                className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border transition ${
                                    usePoints
                                        ? "bg-[#dfb34c] border-[#dfb34c] text-black"
                                        : "border-[#242335] text-[#dfb34c] hover:bg-[#dfb34c]/5"
                                }`}
                            >
                                {usePoints ? "Redeemed (-" + Math.min(customerPoints * 100, subtotal).toLocaleString("id-ID") + ")" : "Gunakan Poin"}
                            </button>
                        </div>
                    )}
                </div>

                {/* SUMMARY & CHECKOUT */}
                <div className="border-t border-[#242335] pt-4">
                    <div className="space-y-2 mb-4 text-xs">
                        <div className="flex justify-between text-gray-400">
                            <span>Subtotal</span>
                            <span>Rp {subtotal.toLocaleString("id-ID")}</span>
                        </div>
                        {discount > 0 && (
                            <div className="flex justify-between text-red-400">
                                <span>Potongan Poin</span>
                                <span>-Rp {discount.toLocaleString("id-ID")}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-sm font-black pt-2 border-t border-[#242335]/40 text-white">
                            <span>Total Tagihan</span>
                            <span className="text-[#dfb34c]">Rp {total.toLocaleString("id-ID")}</span>
                        </div>
                    </div>

                    {/* PAYMENT METHOD */}
                    <div className="mb-4">
                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-2">
                            Metode Pembayaran
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {["Cash", "QRIS", "Transfer"].map(method => (
                                <button
                                    key={method}
                                    type="button"
                                    onClick={() => setPaymentMethod(method)}
                                    className={`py-2 text-[10px] font-bold uppercase rounded-lg border transition ${
                                        paymentMethod === method
                                            ? "bg-[#dfb34c]/10 border-[#dfb34c] text-[#dfb34c]"
                                            : "bg-transparent border-[#242335] text-gray-500 hover:text-white"
                                    }`}
                                >
                                    {method}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* BUTTON CHECKOUT */}
                    <button
                        onClick={handleCheckout}
                        disabled={cart.length === 0 || !selectedCustomer}
                        className="w-full bg-[#dfb34c] hover:opacity-90 disabled:opacity-50 text-black font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition shadow-lg shadow-[#dfb34c]/5 disabled:cursor-not-allowed"
                    >
                        Proses Transaksi Lunas
                    </button>
                </div>
            </div>

            {/* INVOICE / RECEIPT MODAL */}
            {showSuccess && receiptData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-[#111116] border border-[#242335] rounded-3xl w-full max-w-md p-6 relative overflow-hidden flex flex-col justify-between max-h-[90vh]">
                        {/* DECORATIVE LIGHT */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-[#dfb34c]" />

                        {/* CLOSE */}
                        <button
                            onClick={() => setShowSuccess(false)}
                            className="absolute right-4 top-4 text-gray-500 hover:text-white transition"
                        >
                            <FiX size={20} />
                        </button>

                        <div className="overflow-y-auto no-scrollbar py-2">
                            {/* SUCCESS HEADER */}
                            <div className="text-center mb-6">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 mb-3">
                                    <FiCheckCircle size={28} />
                                </div>
                                <h3 className="text-lg font-bold text-white">Transaksi Berhasil!</h3>
                                <p className="text-[11px] text-gray-500 mt-0.5">Nota digital siap dicetak atau dikirim</p>
                            </div>

                            {/* PRINTABLE RECEIPT LAYOUT */}
                            <div id="printable-invoice" className="bg-[#16161e] border border-[#242335] rounded-2xl p-5 text-xs text-white/95 leading-relaxed font-mono">
                                <div className="text-center border-b border-[#242335]/70 pb-3 mb-3">
                                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">GroomGold Barbershop</h4>
                                    <p className="text-[10px] text-gray-500">Pekanbaru, Riau</p>
                                    <p className="text-[9px] text-gray-500 mt-1">WA: +62 859-7922-9792</p>
                                </div>

                                <div className="space-y-1.5 mb-4 text-[10px] text-gray-400">
                                    <div className="flex justify-between">
                                        <span>Invoice No:</span>
                                        <span className="text-white font-bold">{receiptData.invoiceNo}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Tanggal:</span>
                                        <span className="text-white">{receiptData.date.replace("T", " ").substring(0, 19)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Pelanggan:</span>
                                        <span className="text-white">{receiptData.customer}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Barber:</span>
                                        <span className="text-white">{receiptData.barber}</span>
                                    </div>
                                </div>

                                <div className="border-t border-[#242335] pt-3 mb-3">
                                    <p className="text-[10px] font-bold text-gray-400 mb-2 uppercase">Daftar Item</p>
                                    <div className="space-y-2">
                                        {receiptData.items.map(item => (
                                            <div key={`${item.id}-${item.kategori}`} className="flex justify-between text-[11px]">
                                                <span>{item.nama_service} x{item.qty}</span>
                                                <span>Rp {(item.harga * item.qty).toLocaleString("id-ID")}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-t border-dashed border-[#242335] pt-3 space-y-1.5 text-[11px]">
                                    <div className="flex justify-between text-gray-400">
                                        <span>Subtotal</span>
                                        <span>Rp {receiptData.subtotal.toLocaleString("id-ID")}</span>
                                    </div>
                                    {receiptData.discount > 0 && (
                                        <div className="flex justify-between text-red-400">
                                            <span>Potongan Poin</span>
                                            <span>-Rp {receiptData.discount.toLocaleString("id-ID")}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-white font-black text-xs pt-1.5 border-t border-[#242335]/40">
                                        <span>Total</span>
                                        <span className="text-[#dfb34c]">Rp {receiptData.total.toLocaleString("id-ID")}</span>
                                    </div>
                                    <div className="flex justify-between text-[10px] text-gray-500 pt-1">
                                        <span>Metode Pembayaran:</span>
                                        <span>{receiptData.paymentMethod}</span>
                                    </div>
                                </div>

                                <div className="text-center border-t border-[#242335]/70 pt-3 mt-4 text-[9px] text-gray-500">
                                    <p>Terima kasih atas kunjungan Anda!</p>
                                    <p className="mt-0.5">Stay Gold, Stay Premium.</p>
                                </div>
                            </div>
                        </div>

                        {/* MODAL ACTIONS */}
                        <div className="mt-6 flex gap-3">
                            <button
                                onClick={handlePrintReceipt}
                                className="flex-1 border border-[#242335] hover:bg-white/5 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl flex items-center justify-center gap-2 transition"
                            >
                                <FiPrinter size={14} />
                                Cetak Struk
                            </button>
                            <button
                                onClick={() => setShowSuccess(false)}
                                className="flex-1 bg-[#dfb34c] hover:opacity-90 text-black font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition"
                            >
                                Selesai
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
