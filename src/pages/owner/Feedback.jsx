import { useState, useEffect } from "react";
import { FaSearch, FaCommentDots, FaStar, FaUser, FaQuoteLeft, FaCalendarAlt } from "react-icons/fa";
import { db } from "../../services/localDB";
import { feedbackService } from "../../services/feedbackService";

export default function OwnerFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setLoading(true);
    try {
      const data = db.getFeedbacks();
      setFeedbacks(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const filtered = feedbacks.filter(f => 
    f.customer_name.toLowerCase().includes(search.toLowerCase()) ||
    f.barber_name.toLowerCase().includes(search.toLowerCase()) ||
    f.review.toLowerCase().includes(search.toLowerCase())
  );

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedFeedbacks = filtered.slice(startIndex, endIndex);

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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white font-poppins">
            CUSTOMER <span className="text-[#dfb34c]">FEEDBACKS</span>
          </h1>
          <p className="text-sm text-[#8e8e9f] mt-1">
            Lihat daftar ulasan, keluhan, dan penilaian kepuasan dari pelanggan Anda.
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-xs"><FaSearch /></span>
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari feedback..."
            className="w-full bg-[#141414] border border-white/5 text-white rounded-xl pl-9 pr-4 py-2.5 text-xs focus:outline-none focus:border-[#dfb34c]/60"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-[#dfb34c]">Memuat ulasan...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-[#141414] border border-white/5 rounded-2xl p-12 text-center text-[#8e8e9f] text-xs">
          Belum ada ulasan yang cocok.
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paginatedFeedbacks.map((item) => (
              <div 
                key={item.id}
                className="bg-[#141414] border border-white/5 rounded-2xl p-5 flex flex-col justify-between gap-4 transition-all hover:border-white/10"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5 text-xs text-white font-bold">
                      <FaUser className="text-[#dfb34c]" /> {item.customer_name}
                    </div>
                    <div className="flex items-center gap-0.5 text-xs">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar 
                          key={star} 
                          className={star <= item.rating ? "text-[#dfb34c]" : "text-gray-800"} 
                        />
                      ))}
                    </div>
                  </div>

                  <div className="relative pt-2 pl-4">
                    <FaQuoteLeft className="absolute top-0 left-0 text-[#dfb34c]/10 text-xl" />
                    <p className="text-xs text-white leading-relaxed italic">
                      "{item.review}"
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-[#8e8e9f] pt-3 border-t border-white/5">
                  <span className="font-bold text-white">Barber: {item.barber_name}</span>
                  <span className="flex items-center gap-1"><FaCalendarAlt /> {item.date}</span>
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="px-6 py-4 bg-[#141414] border border-white/5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <p className="text-xs text-[#8e8e9f]">
                Menampilkan <span className="font-bold text-white">{startIndex + 1}</span> - <span className="font-bold text-white">{Math.min(endIndex, totalItems)}</span> dari <span className="font-bold text-white">{totalItems}</span> feedback
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
