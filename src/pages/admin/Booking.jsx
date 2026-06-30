import { useState, useEffect } from "react";
import { FaSearch, FaPlus, FaCalendarAlt, FaClock, FaEye, FaTimes, FaCut, FaUserTie, FaCoins } from "react-icons/fa";
import { Link } from "react-router-dom";
import { db } from "../../services/localDB";
import { bookingService, mapBooking } from "../../services/bookingService";
import Container from "../../components/Container";
import PageHeader from "../../components/PageHeader";
import EmptyState from "../../components/EmptyState";
import Table from "../../components/Table";

export default function Booking() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [barbers, setBarbers] = useState([]);
  
  const [showModal, setShowModal] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedBarberId, setSelectedBarberId] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("10:00");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBookings = () => {
    setLoading(true);
    bookingService.getAll()
      .then((res) => {
        setBookings(res.data ? res.data.map(mapBooking) : []);
      })
      .catch((err) => setError(err.message || "Gagal memuat booking."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBookings();
    setServices(db.getServices().filter(s => s.status === "Aktif"));
    setBarbers(db.getBarbers().filter(b => b.status === "Standby"));
    
    const today = new Date().toISOString().split("T")[0];
    setBookingDate(today);
  }, []);

  const handleCreateBooking = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const selectedService = services.find(s => String(s.id) === String(selectedServiceId));
      
      const payload = {
        nama_customer: customerName,
        email,
        phone: phone,
        service_id: Number(selectedServiceId),
        barber_id: Number(selectedBarberId),
        jadwal: `${bookingDate}T${bookingTime}`,
        harga: selectedService ? selectedService.harga : 0,
        metode_pembayaran: paymentMethod,
        status_booking: "Pending",
        catatan: notes || "-"
      };

      await bookingService.create(payload);
      
      setCustomerName("");
      setEmail("");
      setPhone("");
      setSelectedServiceId("");
      setSelectedBarberId("");
      setNotes("");
      setShowModal(false);
      fetchBookings();
      alert("Booking baru berhasil ditambahkan!");
    } catch (err) {
      console.error(err);
      alert("Gagal menambahkan booking.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus booking ini?");
    if (!confirmDelete) return;

    try {
      await bookingService.delete(id);
      fetchBookings();
      alert("Booking berhasil dihapus.");
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus booking.");
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filtered = bookings.filter(b => {
    const matchesSearch = 
      (b.nama_customer && b.nama_customer.toLowerCase().includes(search.toLowerCase())) ||
      (b.layanan && b.layanan.toLowerCase().includes(search.toLowerCase())) ||
      (b.barber && b.barber.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === "All" || b.status_booking === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedBookings = filtered.slice(startIndex, endIndex);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, currentPage + 2);
      
      if (start === 1) {
        end = maxVisible;
      } else if (end === totalPages) {
        start = totalPages - maxVisible + 1;
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    return pages;
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Canceled": return "bg-red-500/10 text-red-400 border-red-500/20";
      default: return "bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse";
    }
  };

  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", "13:00", 
    "14:00", "15:00", "16:00", "17:00", "18:00", 
    "19:00", "20:00", "21:00"
  ];

  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] text-[#E5E5E5] space-y-6">
      <Container>
        <PageHeader title="Reservations" breadcrumb={["Dashboard", "Booking"]}>
          <div className="flex items-center gap-2 bg-[#141414] border border-white/5 px-4 py-2 rounded-xl text-xs text-white/40">
            <FaCalendarAlt className="text-[#dfb34c]" />
            <span className="text-[#dfb34c] font-bold">Booking Monitor</span>
          </div>
        </PageHeader>

        {error && <div className="mb-4 text-xs font-bold text-red-400 bg-red-500/10 p-3 rounded-xl">⚠️ {error}</div>}
        {loading && <div className="mb-4 text-xs text-[#dfb34c] animate-pulse">Memuat data booking...</div>}

        {/* CONTROLS */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 bg-[#141414] border border-white/5 p-4 rounded-2xl shadow-md">
          <div className="flex gap-2 w-full lg:w-auto">
            <button
              onClick={() => setShowModal(true)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#dfb34c] hover:bg-[#BE9359] text-[#111116] font-black text-xs tracking-wider px-5 py-3 rounded-xl transition-all shadow-[0_4px_15px_rgba(223,179,76,0.15)]"
            >
              <FaPlus /> Buat Booking
            </button>
            
            <div className="relative flex-1 sm:flex-none">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-xs" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari booking..."
                className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#dfb34c]/60"
              />
            </div>
          </div>

          <div className="flex gap-1.5 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0 scrollbar-thin">
            {["All", "Pending", "On Going", "Completed", "Canceled"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-2 rounded-lg text-[10px] uppercase tracking-wider font-extrabold transition-all duration-200 ${
                  statusFilter === status
                    ? "bg-[#dfb34c] text-[#111116]"
                    : "bg-[#1a1a1a] border border-white/5 text-[#8e8e9f] hover:bg-white/5"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-[#141414] border border-white/5 rounded-3xl overflow-hidden shadow-xl">
          <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02]">
            <h3 className="text-xs uppercase tracking-widest text-[#dfb34c] font-black flex items-center gap-2">
              <FaCalendarAlt /> Live Booking Queue
            </h3>
          </div>

          <Table headers={["ID Booking", "Customer", "Layanan", "Barber", "Jadwal", "Biaya", "Status", "Aksi"]}>
            {paginatedBookings.map((b) => (
              <tr key={b.id_booking} className="border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors">
                <td className="px-6 py-4 font-mono font-bold text-[#dfb34c]">
                  #BK-{(10000 + b.id_booking)}
                </td>
                <td className="px-6 py-4">
                  <div className="font-bold text-white">{b.nama_customer}</div>
                  <div className="text-[10px] text-[#8e8e9f] mt-0.5">{b.no_hp}</div>
                </td>
                <td className="px-6 py-4 text-[#8e8e9f]">{b.layanan}</td>
                <td className="px-6 py-4 text-[#8e8e9f]">
                  <div className="flex items-center gap-1.5">
                    <FaUserTie className="text-[#dfb34c]/60" /> {b.barber}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-[#8e8e9f]">
                    <FaClock className="text-[#dfb34c]/60" />
                    <span>{b.jadwal ? b.jadwal.replace("T", " ") : "-"}</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono font-bold text-white">
                  Rp {b.harga.toLocaleString("id-ID")}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold border uppercase ${getStatusStyle(b.status_booking)}`}>
                    {b.status_booking}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/admin/booking/${b.id_booking}`}
                      className="p-2 bg-white/5 hover:bg-[#dfb34c]/10 text-white hover:text-[#dfb34c] border border-white/5 hover:border-[#dfb34c]/20 rounded-lg inline-flex transition-all"
                    >
                      <FaEye />
                    </Link>
                    <button
                      onClick={() => handleDelete(b.id_booking)}
                      className="p-2 bg-red-500/5 hover:bg-red-500/10 text-red-400 border border-red-500/10 hover:border-red-500/20 rounded-lg inline-flex transition-all"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </Table>

          {filtered.length === 0 && <EmptyState title="Booking tidak ditemukan" />}

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/[0.01]">
              <p className="text-xs text-[#8e8e9f]">
                Menampilkan <span className="font-bold text-white">{startIndex + 1}</span> - <span className="font-bold text-white">{Math.min(endIndex, totalItems)}</span> dari <span className="font-bold text-white">{totalItems}</span> booking
              </p>
              <div className="flex items-center gap-1.5">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  className="px-3 py-2 bg-[#1a1a1a] hover:bg-[#dfb34c]/10 text-white hover:text-[#dfb34c] border border-white/5 disabled:opacity-20 disabled:pointer-events-none rounded-xl text-xs font-bold transition-all"
                >
                  Sebelumnya
                </button>
                
                {getPageNumbers().map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 border rounded-xl text-xs font-bold transition-all flex items-center justify-center ${
                      currentPage === page
                        ? "bg-[#dfb34c] text-[#111116] border-[#dfb34c] font-black"
                        : "bg-[#1a1a1a] text-white border-white/5 hover:bg-white/5"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="px-3 py-2 bg-[#1a1a1a] hover:bg-[#dfb34c]/10 text-white hover:text-[#dfb34c] border border-white/5 disabled:opacity-20 disabled:pointer-events-none rounded-xl text-xs font-bold transition-all"
                >
                  Selanjutnya
                </button>
              </div>
            </div>
          )}
        </div>
      </Container>

      {/* CREATE MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#111116] border border-[#242335] rounded-3xl p-6 max-w-lg w-full space-y-6 animate-in fade-in duration-200">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <h3 className="text-lg font-bold text-white font-poppins flex items-center gap-2">
                <FaCalendarAlt className="text-[#dfb34c]" /> Buat Reservasi Baru
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-[#8e8e9f] hover:text-white transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleCreateBooking} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase text-[#dfb34c] font-bold block">Nama Customer</label>
                  <input 
                    type="text" 
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Nama Pelanggan"
                    className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#dfb34c]/60"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase text-[#dfb34c] font-bold block">No. HP / WhatsApp</label>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Contoh: 0812345..."
                    className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#dfb34c]/60"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase text-[#dfb34c] font-bold block">Pilih Layanan</label>
                  <select 
                    value={selectedServiceId}
                    onChange={(e) => setSelectedServiceId(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none"
                    required
                  >
                    <option value="">Pilih Layanan</option>
                    {services.map(s => (
                      <option key={s.id} value={s.id}>{s.nama_service} (Rp {s.harga.toLocaleString("id-ID")})</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase text-[#dfb34c] font-bold block">Pilih Barber</label>
                  <select 
                    value={selectedBarberId}
                    onChange={(e) => setSelectedBarberId(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none"
                    required
                  >
                    <option value="">Pilih Barber</option>
                    {barbers.map(b => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase text-[#dfb34c] font-bold block">Tanggal</label>
                  <input 
                    type="date" 
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase text-[#dfb34c] font-bold block">Jam Kedatangan</label>
                  <select 
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none"
                    required
                  >
                    {timeSlots.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase text-[#dfb34c] font-bold block">Metode Pembayaran</label>
                  <select 
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none"
                  >
                    <option value="Cash">Cash di Kasir</option>
                    <option value="QRIS">QRIS / E-Wallet</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase text-[#dfb34c] font-bold block">Email (Opsional)</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase text-[#dfb34c] font-bold block">Catatan Tambahan</label>
                <textarea 
                  rows="2"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Keterangan gaya rambut, dll..."
                  className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl p-3 text-xs focus:outline-none focus:border-[#dfb34c]/60"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-[#dfb34c] text-[#111116] font-black text-xs tracking-wider py-4 rounded-xl hover:opacity-90 transition-all disabled:opacity-50"
              >
                {saving ? "MENYIMPAN..." : "SIMPAN BOOKING"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
