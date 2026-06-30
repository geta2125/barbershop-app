import { useState, useEffect } from "react";
import { FaSearch, FaCommentDots, FaStar, FaUser, FaQuoteLeft, FaCalendarAlt } from "react-icons/fa";
import { db } from "../../services/localDB";
import { feedbackService } from "../../services/feedbackService";

export default function OwnerFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

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

  const filtered = feedbacks.filter(f => 
    f.customer_name.toLowerCase().includes(search.toLowerCase()) ||
    f.barber_name.toLowerCase().includes(search.toLowerCase()) ||
    f.review.toLowerCase().includes(search.toLowerCase())
  );

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((item) => (
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
      )}
    </div>
  );
}
