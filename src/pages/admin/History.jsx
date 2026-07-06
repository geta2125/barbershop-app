import { useEffect, useState } from "react";
import { FaHistory, FaCalendarAlt, FaCoins, FaUserTie } from "react-icons/fa";
import { db } from "../../services/localDB";
import { useAuth } from "../../contexts/auth-context";
import { mapBooking } from "../../services/bookingService";

export default function History() {
  const { profile } = useAuth();
  const [historyItems, setHistoryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setLoading(true);
    try {
      const bookings = db.getBookings().map(mapBooking);
      const role = profile?.role || "member";
      const name = profile?.name || profile?.full_name || "";

      let filteredBookings = [];
      if (role === "admin" || role === "owner") {
        filteredBookings = bookings;
      } else if (role === "barber") {
        filteredBookings = bookings.filter(b => b.barber.toLowerCase() === name.toLowerCase() || b.barber === "Andi");
      } else {
        // member
        filteredBookings = bookings.filter(b => 
          (profile?.email && b.email === profile.email) || 
          (profile?.phone && b.no_hp === profile.phone) ||
          b.nama_customer === name
        );
      }

      // Map to history log items
      const items = filteredBookings.map(b => ({
        id: `booking-${b.id_booking}`,
        type: b.status_booking === "Completed" ? "Layanan Selesai" : b.status_booking === "Canceled" ? "Dibatalkan" : "Pemesanan",
        customer: b.nama_customer,
        barber: b.barber,
        detail: `${b.layanan} (${b.status_booking})`,
        amount: b.harga,
        date: b.jadwal ? b.jadwal.replace("T", " ") : "-",
        status: b.status_booking
      }));

      setHistoryItems(items);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [profile]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed": return "text-emerald-400 font-bold";
      case "Canceled": return "text-red-400 font-bold";
      default: return "text-amber-400 font-bold";
    }
  };

  // Pagination calculations
  const totalItems = historyItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedHistory = historyItems.slice(startIndex, endIndex);

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

  return (
    <div className="max-w-5xl mx-auto px-2 py-4 space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center border-b border-white/5 pb-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white font-poppins">
            ACTIVITY <span className="text-[#dfb34c]">HISTORY</span>
          </h1>
          <p className="text-sm text-[#8e8e9f] mt-1">
            Riwayat log aktivitas pemesanan dan transaksi layanan barbershop.
          </p>
        </div>
        <div className="bg-[#141414] border border-white/5 px-4 py-2 rounded-xl text-xs text-[#8e8e9f] flex items-center gap-2">
          <FaHistory className="text-[#dfb34c]" />
          <span>Activity Log</span>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-[#dfb34c] text-sm">Memuat riwayat...</div>
      ) : historyItems.length === 0 ? (
        <div className="bg-[#141414] border border-white/5 rounded-2xl p-12 text-center text-[#8e8e9f] text-xs">
          Belum ada riwayat aktivitas yang tercatat.
        </div>
      ) : (
        <div className="bg-[#141414] border border-white/5 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02] text-[10px] uppercase tracking-wider text-[#dfb34c] font-black">
                  <th className="px-6 py-4">Tipe</th>
                  <th className="px-6 py-4">Pelanggan</th>
                  <th className="px-6 py-4">Detail Layanan</th>
                  <th className="px-6 py-4">Barber</th>
                  <th className="px-6 py-4">Biaya</th>
                  <th className="px-6 py-4">Tanggal & Waktu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.02] text-xs text-white/80">
                {paginatedHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.01] transition-colors">
                    <td className="px-6 py-4 font-bold text-white">
                      <span className={getStatusStyle(item.status)}>{item.type}</span>
                    </td>
                    <td className="px-6 py-4 font-medium text-white">{item.customer}</td>
                    <td className="px-6 py-4 text-[#8e8e9f]">{item.detail}</td>
                    <td className="px-6 py-4 flex items-center gap-1.5 mt-0.5">
                      <FaUserTie className="text-[#dfb34c]/60" /> {item.barber}
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-[#dfb34c]">
                      Rp {item.amount.toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-4 text-[#8e8e9f]">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/[0.01]">
              <p className="text-xs text-[#8e8e9f]">
                Menampilkan <span className="font-bold text-white">{startIndex + 1}</span> - <span className="font-bold text-white">{Math.min(endIndex, totalItems)}</span> dari <span className="font-bold text-white">{totalItems}</span> log
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
      )}
    </div>
  );
}
