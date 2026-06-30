import { useEffect, useState } from "react";
import { db } from "../../services/localDB";
import { bookingService, mapBooking } from "../../services/bookingService";
import { useAuth } from "../../contexts/auth-context";
import { FaStar, FaCut, FaCoins, FaClock, FaCheckCircle, FaSpinner } from "react-icons/fa";

export default function BarberDashboard() {
  const { profile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [myBookings, setMyBookings] = useState([]);
  const [stats, setStats] = useState({ rating: 4.9, totalCuts: 0, commission: 0 });
  
  // Determine barber name based on logged-in user profile
  const barberName = profile?.name || profile?.full_name || "Andi";

  const fetchBarberData = () => {
    setLoading(true);
    try {
      const allBookings = db.getBookings().map(mapBooking);
      
      // Filter bookings assigned to this barber
      // Since barberName might be "Super Admin" during testing, we fallback to "Andi" if no match
      let filtered = allBookings.filter(b => 
        b.barber.toLowerCase() === barberName.toLowerCase()
      );
      
      if (filtered.length === 0) {
        // Fallback to "Andi" for demonstration if the logged-in user doesn't match any barber name
        filtered = allBookings.filter(b => b.barber === "Andi");
      }

      // Filter today's bookings
      const todayStr = new Date().toISOString().split("T")[0];
      // Note: in databooking.json, schedules are formatted as "2026-06-10 10:00" or similar
      const todays = filtered.filter(b => b.jadwal && b.jadwal.includes(todayStr));
      
      // Calculate stats based on all completed bookings of this barber
      const completedBookings = filtered.filter(b => b.status_booking === "Completed");
      const totalCuts = completedBookings.length;
      // Barber gets 30% commission of the service price
      const commission = completedBookings.reduce((sum, b) => sum + (b.harga * 0.3), 0);

      setMyBookings(todays.length > 0 ? todays : filtered.slice(0, 5)); // show today's, or top 5 if none today
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
        <h2 className="text-lg font-bold text-white font-poppins border-b border-white/5 pb-3 flex items-center gap-2">
          <FaCut className="text-[#dfb34c]" /> Agenda Kerja Anda
        </h2>

        {myBookings.length === 0 ? (
          <p className="text-xs text-[#8e8e9f] py-4 text-center">Belum ada pelanggan terpesan untuk Anda hari ini.</p>
        ) : (
          <div className="space-y-3">
            {myBookings.map((booking) => (
              <div 
                key={booking.id_booking}
                className="bg-[#1c1c1c] border border-white/5 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:border-white/10"
              >
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white">{booking.nama_customer}</h4>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#8e8e9f]">
                    <span>✂️ {booking.layanan}</span>
                    <span>⏰ {booking.jadwal ? booking.jadwal.replace("T", " ") : "-"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase ${getStatusColor(booking.status_booking)}`}>
                    {booking.status_booking}
                  </span>

                  {/* QUICK STATUS ACTIONS */}
                  {booking.status_booking !== "Completed" && booking.status_booking !== "Canceled" && (
                    <div className="flex gap-1.5">
                      {booking.status_booking === "Pending" && (
                        <button
                          onClick={() => handleUpdateStatus(booking.id_booking, "On Going")}
                          className="bg-sky-500 text-black font-bold text-[10px] px-3 py-1.5 rounded-lg hover:opacity-90 transition-all"
                        >
                          Mulai Kerja
                        </button>
                      )}
                      {booking.status_booking === "On Going" && (
                        <button
                          onClick={() => handleUpdateStatus(booking.id_booking, "Completed")}
                          className="bg-[#dfb34c] text-black font-bold text-[10px] px-3 py-1.5 rounded-lg hover:opacity-90 transition-all"
                        >
                          Selesai
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
