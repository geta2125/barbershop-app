import { useState, useEffect } from "react";
import { FaSearch, FaCalendarAlt, FaUserTie, FaClock, FaEye } from "react-icons/fa";
import { db } from "../../services/localDB";
import { mapBooking } from "../../services/bookingService";

export default function OwnerBooking() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    setLoading(true);
    try {
      const data = db.getBookings().map(mapBooking);
      setBookings(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  const filtered = bookings.filter(b => {
    const matchesSearch = 
      b.nama_customer.toLowerCase().includes(search.toLowerCase()) ||
      b.layanan.toLowerCase().includes(search.toLowerCase()) ||
      b.barber.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || b.status_booking === statusFilter;

    return matchesSearch && matchesStatus;
  });

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
      case "Completed": return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "Canceled": return "text-red-400 bg-red-500/10 border-red-500/20";
      default: return "text-amber-400 bg-amber-500/10 border-amber-500/20";
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-2 py-4 space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white font-poppins">
            MONITOR <span className="text-[#dfb34c]">BOOKINGS</span>
          </h1>
          <p className="text-sm text-[#8e8e9f] mt-1">
            Pantau seluruh data reservasi dan status pengerjaan pelanggan.
          </p>
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#141414] border border-white/5 p-4 rounded-2xl shadow-md">
        <div className="relative w-full sm:w-72">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-xs"><FaSearch /></span>
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama, layanan, barber..."
            className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl pl-9 pr-4 py-2.5 text-xs focus:outline-none focus:border-[#dfb34c]/60"
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          {["All", "Pending", "On Going", "Completed", "Canceled"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                statusFilter === status
                  ? "bg-[#dfb34c] text-[#111116]"
                  : "bg-[#1a1a1a] border border-white/5 text-white hover:bg-white/5"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* TABLE */}
      {loading ? (
        <div className="text-center py-12 text-[#dfb34c]">Memuat data booking...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-[#141414] border border-white/5 rounded-2xl p-12 text-center text-[#8e8e9f] text-xs">
          Tidak ada data booking yang cocok dengan filter.
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-[#141414] border border-white/5 rounded-3xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.02] text-[10px] uppercase tracking-wider text-[#dfb34c] font-black">
                    <th className="px-6 py-4">ID Booking</th>
                    <th className="px-6 py-4">Pelanggan</th>
                    <th className="px-6 py-4">Layanan</th>
                    <th className="px-6 py-4">Barber</th>
                    <th className="px-6 py-4">Jadwal</th>
                    <th className="px-6 py-4">Biaya</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.02] text-xs text-white/80">
                  {paginatedBookings.map((item) => (
                    <tr key={item.id_booking} className="hover:bg-white/[0.01] transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-[#dfb34c]">
                        #BK-{(10000 + item.id_booking)}
                      </td>
                      <td className="px-6 py-4 font-medium text-white">
                        <div>
                          <p>{item.nama_customer}</p>
                          <p className="text-[10px] text-[#8e8e9f] mt-0.5">{item.no_hp}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[#8e8e9f]">{item.layanan}</td>
                      <td className="px-6 py-4 text-[#8e8e9f] flex items-center gap-1.5 mt-2">
                        <FaUserTie className="text-[#dfb34c]/60" /> {item.barber}
                      </td>
                      <td className="px-6 py-4 text-[#8e8e9f]">{item.jadwal ? item.jadwal.replace("T", " ") : "-"}</td>
                      <td className="px-6 py-4 font-mono font-bold text-white">
                        Rp {item.harga.toLocaleString("id-ID")}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold border uppercase ${getStatusStyle(item.status_booking)}`}>
                          {item.status_booking}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="px-6 py-4 bg-[#141414] border border-white/5 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
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
      )}
    </div>
  );
}