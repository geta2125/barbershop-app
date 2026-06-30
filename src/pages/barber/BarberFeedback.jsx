import { useState, useEffect } from "react";
import { db } from "../../services/localDB";
import { useAuth } from "../../contexts/auth-context";
import { FaCommentDots, FaStar, FaQuoteLeft, FaCalendarAlt, FaUser } from "react-icons/fa";

export default function BarberFeedback() {
  const { profile } = useAuth();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const barberName = profile?.name || profile?.full_name || "Andi";

  useEffect(() => {
    setLoading(true);
    try {
      const allFeedbacks = db.getFeedbacks();
      // Filter reviews for this barber
      let filtered = allFeedbacks.filter(f => 
        f.barber_name.toLowerCase() === barberName.toLowerCase() || f.barber_name === "Andi"
      );
      setFeedbacks(filtered);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [barberName]);

  const avgRating = feedbacks.length > 0 
    ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
    : "0.0";

  return (
    <div className="max-w-4xl mx-auto px-2 py-4 space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white font-poppins">
            CUSTOMER <span className="text-[#dfb34c]">FEEDBACK</span>
          </h1>
          <p className="text-sm text-[#8e8e9f] mt-1">
            Ulasan dan rating yang diberikan oleh pelanggan untuk hasil kerja Anda.
          </p>
        </div>
        <div className="bg-[#dfb34c]/10 border border-[#dfb34c]/20 text-[#dfb34c] px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
          ⭐ Rata-rata Rating: {avgRating} / 5.0
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-[#dfb34c]">Memuat ulasan...</div>
      ) : feedbacks.length === 0 ? (
        <div className="bg-[#141414] border border-white/5 rounded-2xl p-12 text-center text-[#8e8e9f] text-xs">
          Belum ada ulasan dari pelanggan untuk Anda.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {feedbacks.map((item) => (
            <div 
              key={item.id}
              className="bg-[#141414] border border-white/5 rounded-2xl p-5 flex flex-col justify-between gap-4"
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

              <div className="flex items-center gap-1.5 text-[10px] text-[#8e8e9f] pt-3 border-t border-white/5">
                <FaCalendarAlt /> {item.date}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
