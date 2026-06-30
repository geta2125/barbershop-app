import { useState, useEffect } from "react";
import { db } from "../../services/localDB";
import { useAuth } from "../../contexts/auth-context";
import { mapBooking } from "../../services/bookingService";
import { FaCalendarAlt, FaCut, FaCoins, FaCheckCircle, FaUser } from "react-icons/fa";

export default function BarberHistory() {
  const { profile } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const barberName = profile?.name || profile?.full_name || "Andi";

  useEffect(() => {
    setLoading(true);
    try {
      const allBookings = db.getBookings().map(mapBooking);
      
      // Filter completed bookings for this barber
      let filtered = allBookings.filter(b => 
        b.status_booking === "Completed" && 
        (b.barber.toLowerCase() === barberName.toLowerCase() || b.barber === "Andi")
      );

      setHistory(filtered);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [barberName]);

  const totalEarnings = history.reduce((sum, b) => sum + (b.harga * 0.3), 0);

  return (
    <div className="max-w-4xl mx-auto px-2 py-4 space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white font-poppins">
            MY <span className="text-[#dfb34c]">WORK HISTORY</span>
          </h1>
          <p className="text-sm text-[#8e8e9f] mt-1">
            Daftar pekerjaan potong rambut yang telah selesai Anda kerjakan.
          </p>
        </div>
        <div className="bg-[#dfb34c]/10 border border-[#dfb34c]/20 text-[#dfb34c] px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
          <FaCoins /> Total Komisi: Rp {totalEarnings.toLocaleString("id-ID")}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-[#dfb34c]">Memuat data histori...</div>
      ) : history.length === 0 ? (
        <div className="bg-[#141414] border border-white/5 rounded-2xl p-12 text-center text-[#8e8e9f] text-xs">
          Belum ada riwayat pekerjaan selesai.
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((item) => (
            <div 
              key={item.id_booking}
              className="bg-[#141414] border border-white/5 rounded-2xl p-4 flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <FaCheckCircle />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{item.nama_customer}</h4>
                  <p className="text-xs text-[#8e8e9f] mt-0.5">{item.layanan} | {item.jadwal ? item.jadwal.replace("T", " ") : "-"}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-[#8e8e9f]">Komisi (30%)</span>
                <p className="text-sm font-bold text-[#dfb34c]">Rp {(item.harga * 0.3).toLocaleString("id-ID")}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
