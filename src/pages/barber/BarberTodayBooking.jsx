import { useEffect, useState } from "react";
import { db } from "../../services/localDB";
import { bookingService, mapBooking } from "../../services/bookingService";
import { useAuth } from "../../contexts/auth-context";
import { FaCalendarDay, FaClock, FaUser, FaCut, FaCheck, FaPlay, FaSpinner, FaMapMarkerAlt } from "react-icons/fa";

export default function BarberTodayBooking() {
  const { profile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [todaysBookings, setTodaysBookings] = useState([]);
  const [filter, setFilter] = useState("Semua");
  
  const barberName = profile?.name || profile?.full_name || "Andi";

  const fetchTodaysBookings = () => {
    setLoading(true);
    try {
      const allBookings = db.getBookings().map(mapBooking);
      
      // Ambil nama depan dari profile untuk pencocokan (misal "Candra Putra Assegaf" jadi "candra")
      const firstName = barberName.split(" ")[0].toLowerCase();

      let filtered = allBookings.filter(b => 
        b.barber.toLowerCase() === barberName.toLowerCase() ||
        b.barber.toLowerCase() === firstName
      );
      
      if (filtered.length === 0) {
        filtered = allBookings.filter(b => b.barber === "Andi");
      }

      // Pastikan timezone tidak bergeser (ambil string YYYY-MM-DD secara lokal)
      const now = new Date();
      const todayStr = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().split("T")[0];

      const todays = filtered.filter(b => b.jadwal && b.jadwal.includes(todayStr));
      
      // Urutkan berdasarkan waktu (jam)
      todays.sort((a, b) => {
        const timeA = a.jadwal ? new Date(a.jadwal).getTime() : 0;
        const timeB = b.jadwal ? new Date(b.jadwal).getTime() : 0;
        return timeA - timeB;
      });

      setTodaysBookings(todays);
    } catch (e) {
      console.error("Gagal mengambil data hari ini:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodaysBookings();
  }, [barberName]);

  const handleUpdateStatus = async (bookingId, newStatus) => {
    try {
      await bookingService.update(bookingId, { status_booking: newStatus });
      fetchTodaysBookings();
    } catch (e) {
      console.error(e);
      alert("Gagal memperbarui status booking.");
    }
  };

  const filteredBookings = todaysBookings.filter(b => {
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
        <span className="text-sm font-medium">Memuat jadwal hari ini...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* HEADER */}
      <div className="bg-[#141414] rounded-2xl p-6 sm:p-8 border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
           <FaCalendarDay className="text-9xl text-white" />
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
              Jadwal Hari Ini <span className="text-[#A87C2D]">•</span> {todaysBookings.length} Sesi
            </h1>
            <p className="text-sm text-gray-400 mt-2">
              Manajemen jadwal dan pelanggan yang telah memesan layananmu untuk hari ini.
            </p>
          </div>
          <div className="text-right flex flex-col items-start sm:items-end">
            <span className="text-xs uppercase font-bold tracking-widest text-[#A87C2D]">Tanggal</span>
            <span className="text-lg font-bold text-white mt-1">
              {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
        </div>
      </div>

      {/* FILTER TABS */}
      <div className="flex flex-nowrap overflow-x-auto gap-2 pb-2 scrollbar-hide">
        {["Semua", "Menunggu", "Sedang Dikerjakan", "Selesai", "Batal"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all whitespace-nowrap ${getFilterClass(tab)}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* BOOKING LIST */}
      <div className="grid grid-cols-1 gap-4">
        {filteredBookings.length === 0 ? (
          <div className="bg-[#141414] border border-white/5 rounded-3xl p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
              <FaCalendarDay className="text-2xl text-gray-500" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Tidak ada jadwal {filter !== "Semua" ? filter.toLowerCase() : ""}</h3>
            <p className="text-sm text-gray-400">Belum ada pelanggan pada kategori ini untuk hari ini.</p>
          </div>
        ) : (
          filteredBookings.map((booking) => {
            const timeStr = booking.jadwal 
              ? new Date(booking.jadwal).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) 
              : "00:00";

            return (
              <div 
                key={booking.id_booking}
                className="group bg-[#141414] border border-white/5 hover:border-white/20 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row justify-between gap-6 transition-all"
              >
                {/* INFO SECTION */}
                <div className="flex items-start gap-4 sm:gap-6 flex-1">
                  <div className="flex-shrink-0 w-16 h-16 bg-[#1a1a1a] border border-white/10 rounded-2xl flex flex-col items-center justify-center shadow-inner">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">JAM</span>
                    <span className="text-sm font-black text-white">{timeStr}</span>
                  </div>
                  
                  <div className="space-y-3 flex-1">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="text-xl font-bold text-white tracking-tight">{booking.nama_customer}</h4>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getStatusBadge(booking.status_booking)}`}>
                          {booking.status_booking}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 font-medium">No. Ref: {String(booking.id_booking).substring(0,8).toUpperCase()}</p>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-2">
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-6 h-6 rounded-full bg-[#A87C2D]/10 text-[#A87C2D] flex items-center justify-center">
                          <FaCut size={10} />
                        </div>
                        {booking.layanan}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                         <div className="w-6 h-6 rounded-full bg-white/5 text-gray-400 flex items-center justify-center">
                          <FaUser size={10} />
                        </div>
                        {booking.phone || "Tidak ada no HP"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ACTION SECTION */}
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6 min-w-[150px]">
                  <div className="text-left md:text-right w-full md:mb-4">
                     <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider block mb-1">Harga</span>
                     <span className="text-lg font-black text-[#A87C2D]">Rp {booking.harga.toLocaleString('id-ID')}</span>
                  </div>

                  {booking.status_booking !== "Completed" && booking.status_booking !== "Canceled" && (
                    <div className="flex gap-2 w-full md:w-auto">
                      {booking.status_booking === "Pending" && (
                        <button
                          onClick={() => handleUpdateStatus(booking.id_booking, "On Going")}
                          className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-black font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-sky-500/20"
                        >
                          <FaPlay size={10} /> Mulai
                        </button>
                      )}
                      {booking.status_booking === "On Going" && (
                        <button
                          onClick={() => handleUpdateStatus(booking.id_booking, "Completed")}
                          className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20"
                        >
                          <FaCheck size={10} /> Selesai
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
  );
}
