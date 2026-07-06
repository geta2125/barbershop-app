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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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

  // Pagination calculations
  const totalItems = history.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedHistory = history.slice(startIndex, endIndex);

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
        <div className="space-y-6">
          <div className="space-y-3">
            {paginatedHistory.map((item) => (
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

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="px-6 py-4 bg-[#141414] border border-white/5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <p className="text-xs text-[#8e8e9f]">
                Menampilkan <span className="font-bold text-white">{startIndex + 1}</span> - <span className="font-bold text-white">{Math.min(endIndex, totalItems)}</span> dari <span className="font-bold text-white">{totalItems}</span> riwayat pekerjaan
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
