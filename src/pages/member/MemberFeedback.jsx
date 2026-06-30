import { useState, useEffect } from "react";
import { db } from "../../services/localDB";
import { feedbackService } from "../../services/feedbackService";
import { useAuth } from "../../contexts/auth-context";
import { FaCommentDots, FaStar, FaUserTie, FaQuoteLeft, FaCalendarAlt } from "react-icons/fa";

export default function MemberFeedback() {
  const { profile } = useAuth();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeedbacks = () => {
    if (!profile) return;
    setLoading(true);
    try {
      const allFeedbacks = db.getFeedbacks();
      // Filter feedbacks written by this customer
      const filtered = allFeedbacks.filter(f => 
        f.customer_name === profile.full_name || 
        f.customer_name === profile.name
      );
      setFeedbacks(filtered);
    } catch (e) {
      console.error("Error loading feedbacks:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [profile]);

  return (
    <div className="max-w-4xl mx-auto px-2 py-4 space-y-6">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-white font-poppins">
          MY <span className="text-[#dfb34c]">FEEDBACK</span>
        </h1>
        <p className="text-sm text-[#8e8e9f] mt-1">
          Ulasan dan rating yang telah Anda berikan untuk layanan GroomGold Barbershop.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-[#dfb34c] text-sm">
          Memuat data feedback...
        </div>
      ) : feedbacks.length === 0 ? (
        <div className="bg-[#141414] border border-white/5 rounded-2xl p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#dfb34c]/5 flex items-center justify-center mx-auto text-[#dfb34c] text-2xl">
            <FaCommentDots />
          </div>
          <h3 className="text-lg font-bold text-white">Belum Ada Ulasan</h3>
          <p className="text-xs text-[#8e8e9f] max-w-sm mx-auto">
            Anda belum pernah memberikan ulasan. Ulasan dapat diberikan setelah Anda menyelesaikan transaksi cukur rambut di GroomGold!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {feedbacks.map((item) => (
            <div 
              key={item.id}
              className="bg-[#141414] border border-white/5 rounded-2xl p-5 flex flex-col justify-between gap-4 transition-all hover:border-white/10"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5 text-xs text-[#dfb34c] font-bold">
                    <FaUserTie /> {item.barber_name} (Barber)
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
                <FaCalendarAlt /> Diberikan pada: {item.date || "-"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
