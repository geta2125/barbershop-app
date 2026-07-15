import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../services/localDB";
import { bookingService, mapBooking } from "../../services/bookingService";
import { useAuth } from "../../contexts/auth-context";
import { FaStar, FaCut, FaCoins, FaClock, FaCheckCircle, FaSpinner, FaCalendarDay, FaUser, FaPlay, FaCheck } from "react-icons/fa";

export default function BarberDashboard() {
  const { profile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [myBookings, setMyBookings] = useState([]);
  const [filter, setFilter] = useState("Semua");
  const [stats, setStats] = useState({ rating: 4.9, totalCuts: 0, commission: 0 });
  
  // Determine barber name based on logged-in user profile
  const barberName = profile?.name || profile?.full_name || "Andi";

  const fetchBarberData = () => {
    setLoading(true);
    try {
      const allBookings = db.getBookings().map(mapBooking);
      
      // Ambil nama depan dari profile untuk pencocokan (misal "Candra Putra Assegaf" jadi "candra")
      const firstName = barberName.split(" ")[0].toLowerCase();

      // Filter bookings assigned to this barber
      let filtered = allBookings.filter(b => 
        b.barber.toLowerCase() === barberName.toLowerCase() ||
        b.barber.toLowerCase() === firstName
      );
      
      if (filtered.length === 0) {
        // Fallback to "Andi" for demonstration if the logged-in user doesn't match any barber name
        filtered = allBookings.filter(b => b.barber === "Andi");
      }

      // Filter today's bookings
      const now = new Date();
      const todayStr = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().split("T")[0];
      const todays = filtered.filter(b => b.jadwal && b.jadwal.includes(todayStr));
      
      // Urutkan berdasarkan waktu (jam)
      todays.sort((a, b) => {
        const timeA = a.jadwal ? new Date(a.jadwal).getTime() : 0;
        const timeB = b.jadwal ? new Date(b.jadwal).getTime() : 0;
        return timeA - timeB;
      });

      // Calculate stats based on all completed bookings of this barber
      const completedBookings = filtered.filter(b => b.status_booking === "Completed");
      const totalCuts = completedBookings.length;
      // Barber gets 30% commission of the service price
      const commission = completedBookings.reduce((sum, b) => sum + (b.harga * 0.3), 0);

      setMyBookings(todays);
      setStats({
        rating: 4.9,
        totalCuts,
        commission
      });
    } catch (e) {
      console.error("Gagal sinkronisasi data barber:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBarberData();
  }, [barberName]);

  const handleUpdateStatus = async (bookingId, newStatus) => {
    try {
      await bookingService.update(bookingId, { status_booking: newStatus });
      alert(`Status booking berhasil diubah menjadi ${newStatus}`);
      fetchBarberData();
    } catch (e) {
      console.error(e);
      alert("Gagal memperbarui status booking.");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed": return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "On Going": return "text-sky-400 bg-sky-500/10 border-sky-500/20";
      case "Canceled": return "text-red-400 bg-red-500/10 border-red-500/20";
      default: return "text-amber-400 bg-amber-500/10 border-amber-500/20";
    }
  };

  const filteredBookings = myBookings.filter(b => {
    if (filter === "Semua") return true;
    if (filter === "Menunggu") return b.status_booking === "Pending";
    if (filter === "Sedang Dikerjakan") return b.status_booking === "On Going";
    if (filter === "Selesai") return b.status_booking === "Completed";
    if (filter === "Batal") return b.status_booking === "Canceled";
    return true;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "On Going": return "bg-sky-500/20 text-sky-400 border-sky-500/30";
      case "Canceled": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    }
  };

  const getFilterClass = (tabName) => {
    return filter === tabName 
      ? "bg-[#A87C2D] text-black border-[#A87C2D]" 
      : "bg-transparent text-gray-400 border-white/10 hover:border-white/30 hover:text-white";
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-[#dfb34c]">
        <FaSpinner className="animate-spin text-3xl mb-4" />
        <span className="text-sm font-medium">Memuat data dashboard barber...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* TOP HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-4">
        <div>
          <h1 className="text-2xl font-black text-white font-poppins">Halo, {barberName} 👋</h1>
          <p className="text-xs text-[#8e8e9f] mt-1">Semangat mencukur dan berikan pelayanan terbaik hari ini!</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Status: Standby (On Duty)
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* STAT 1 */}
        <div className="bg-[#141414] border border-white/5 rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#dfb34c]" />
          <span className="text-[10px] uppercase text-[#8e8e9f] tracking-wider font-bold">Rating Anda</span>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-2xl font-black text-white">{stats.rating}</span>
            <div className="flex text-[#dfb34c] text-xs">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>
          </div>
          <p className="text-[10px] text-[#dfb34c] mt-2">Sangat Baik (Berdasarkan ulasan)</p>
        </div>

        {/* STAT 2 */}
        <div className="bg-[#141414] border border-white/5 rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#dfb34c]" />
          <span className="text-[10px] uppercase text-[#8e8e9f] tracking-wider font-bold">Total Selesai</span>
          <h3 className="text-2xl font-black text-white mt-2">{stats.totalCuts} Kepala</h3>
          <p className="text-[10px] text-emerald-400 mt-2">Meningkat minggu ini</p>
        </div>

        {/* STAT 3 */}
        <div className="bg-[#141414] border border-white/5 rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#dfb34c]" />
          <span className="text-[10px] uppercase text-[#8e8e9f] tracking-wider font-bold">Estimasi Komisi</span>
          <h3 className="text-2xl font-black text-[#dfb34c] mt-2">
            Rp {stats.commission.toLocaleString("id-ID")}
          </h3>
          <p className="text-[10px] text-[#8e8e9f] mt-2">30% Komisi per layanan</p>
        </div>
      </div>

      {/* TODAY'S AGENDA */}
      <div className="bg-[#141414] border border-white/5 rounded-3xl p-6 space-y-4">
        <div className="border-b border-white/5 pb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-white font-poppins flex items-center gap-2">
            <FaCut className="text-[#dfb34c]" /> Agenda Kerja Anda
          </h2>
          {/* FILTER TABS */}
          <div className="flex flex-nowrap overflow-x-auto gap-2 scrollbar-hide w-full sm:w-auto">
            {["Semua", "Menunggu", "Sedang Dikerjakan", "Selesai", "Batal"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all whitespace-nowrap ${getFilterClass(tab)}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 mt-4">
          {filteredBookings.length === 0 ? (
            <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-3">
                <FaCalendarDay className="text-xl text-gray-500" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">Tidak ada jadwal {filter !== "Semua" ? filter.toLowerCase() : ""}</h3>
              <p className="text-xs text-gray-400">Belum ada pelanggan pada kategori ini untuk hari ini.</p>
            </div>
          ) : (
            filteredBookings.map((booking) => {
              const timeStr = booking.jadwal 
                ? new Date(booking.jadwal).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) 
                : "00:00";

              return (
                <div 
                  key={booking.id_booking}
                  className="group bg-[#1c1c1c] border border-white/5 hover:border-white/20 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row justify-between gap-4 transition-all"
                >
                  {/* INFO SECTION */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="flex-shrink-0 w-14 h-14 bg-[#141414] border border-white/10 rounded-xl flex flex-col items-center justify-center shadow-inner">
                      <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-0.5">JAM</span>
                      <span className="text-xs font-black text-white">{timeStr}</span>
                    </div>
                    
                    <div className="space-y-2 flex-1">
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <h4 className="text-base font-bold text-white tracking-tight">{booking.nama_customer}</h4>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border uppercase tracking-wider ${getStatusBadge(booking.status_booking)}`}>
                            {booking.status_booking}
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-500 font-medium">No. Ref: {String(booking.id_booking).substring(0,8).toUpperCase()}</p>
                      </div>

                      <div className="flex flex-wrap gap-3 pt-1">
                        <div className="flex items-center gap-1.5 text-xs text-gray-300">
                          <div className="w-5 h-5 rounded-full bg-[#A87C2D]/10 text-[#A87C2D] flex items-center justify-center">
                            <FaCut size={8} />
                          </div>
                          {booking.layanan}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-300">
                           <div className="w-5 h-5 rounded-full bg-white/5 text-gray-400 flex items-center justify-center">
                            <FaUser size={8} />
                          </div>
                          {booking.phone || "Tidak ada no HP"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ACTION SECTION */}
                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 md:border-l border-white/5 pt-3 md:pt-0 md:pl-4 min-w-[120px]">
                    <div className="text-left md:text-right w-full md:mb-3">
                       <span className="text-[9px] uppercase font-bold text-gray-500 tracking-wider block mb-0.5">Harga</span>
                       <span className="text-base font-black text-[#A87C2D]">Rp {booking.harga.toLocaleString('id-ID')}</span>
                    </div>

                    {booking.status_booking !== "Completed" && booking.status_booking !== "Canceled" && (
                      <div className="flex gap-2 w-full md:w-auto">
                        {booking.status_booking === "Pending" && (
                          <button
                            onClick={() => handleUpdateStatus(booking.id_booking, "On Going")}
                            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-sky-500 hover:bg-sky-400 text-black font-bold text-[10px] px-3 py-2 rounded-xl transition-all shadow-md shadow-sky-500/20"
                          >
                            <FaPlay size={8} /> Mulai
                          </button>
                        )}
                        {booking.status_booking === "On Going" && (
                          <button
                            onClick={() => handleUpdateStatus(booking.id_booking, "Completed")}
                            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-[10px] px-3 py-2 rounded-xl transition-all shadow-md shadow-emerald-500/20"
                          >
                            <FaCheck size={8} /> Selesai
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
