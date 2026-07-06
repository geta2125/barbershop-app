import { useState, useEffect } from "react";
import { db } from "../../services/localDB";
import { feedbackService } from "../../services/feedbackService";
import { useAuth } from "../../contexts/auth-context";
import { FaCommentDots, FaStar, FaUserTie, FaQuoteLeft, FaCalendarAlt, FaPlus, FaTimes, FaPenSquare } from "react-icons/fa";

export default function MemberFeedback() {
  const { profile } = useAuth();
  const [feedbacks, setFeedbacks] = useState([]);
  const [barbersList, setBarbersList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Form states
  const [showModal, setShowModal] = useState(false);
  const [selectedBarber, setSelectedBarber] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchFeedbacks = async () => {
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

      // Load barbers for dropdown asynchronously from Supabase
      const { barberService } = await import("../../services/barberService.js");
      const { data: allBarbers } = await barberService.getAll();
      const bList = allBarbers || [];
      
      const userBookings = db.getBookings().filter(b => 
        (profile.email && b.email === profile.email) || 
        (profile.phone && b.no_hp === profile.phone) ||
        (b.nama_customer === profile.full_name || b.nama_customer === profile.name)
      );
      
      const completedBarberNames = new Set(
        userBookings
          .filter(b => b.status_booking === "Completed")
          .map(b => b.barber)
      );
      
      const allowedBarbers = bList.filter(b => completedBarberNames.has(b.name));
      setBarbersList(allowedBarbers);
    } catch (e) {
      console.error("Error loading feedbacks:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [profile]);

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    if (!profile) return;
    if (!selectedBarber) {
      alert("Silakan pilih barber terlebih dahulu!");
      return;
    }
    if (!reviewText.trim()) {
      alert("Silakan tulis ulasan Anda!");
      return;
    }

    setSubmitting(true);
    try {
      const res = await feedbackService.create({
        customer_name: profile.full_name || profile.name || "Guest",
        barber_name: selectedBarber,
        rating: rating,
        review: reviewText
      });
      
      if (res.error) {
        alert("Gagal mengirim ulasan: " + res.error.message);
      } else {
        alert("Ulasan Anda berhasil dikirim!");
        setShowModal(false);
        setSelectedBarber("");
        setRating(5);
        setReviewText("");
        fetchFeedbacks();
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat mengirim ulasan.");
    } finally {
      setSubmitting(false);
    }
  };

  // Pagination calculations
  const totalItems = feedbacks.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedFeedbacks = feedbacks.slice(startIndex, endIndex);

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
            MY <span className="text-[#dfb34c]">FEEDBACK</span>
          </h1>
          <p className="text-sm text-[#8e8e9f] mt-1">
            Ulasan dan rating yang telah Anda berikan untuk layanan GroomGold Barbershop.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#dfb34c] hover:bg-[#BE9359] text-[#111116] font-black text-xs tracking-wider px-5 py-3.5 rounded-xl transition-all shadow-[0_4px_15px_rgba(223,179,76,0.15)]"
        >
          <FaPenSquare className="text-sm" /> Tulis Ulasan Baru
        </button>
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
            Anda belum pernah memberikan ulasan. Tekan tombol "Tulis Ulasan Baru" di atas untuk membagikan pengalaman Anda!
          </p>
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

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="px-6 py-4 bg-[#141414] border border-white/5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <p className="text-xs text-[#8e8e9f]">
                Menampilkan <span className="font-bold text-white">{startIndex + 1}</span> - <span className="font-bold text-white">{Math.min(endIndex, totalItems)}</span> dari <span className="font-bold text-white">{totalItems}</span> ulasan
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

      {/* FEEDBACK MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-[#111116] border border-[#242335] rounded-3xl p-6 max-w-md w-full space-y-6">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <h3 className="text-lg font-bold text-white font-poppins flex items-center gap-2">
                <FaPenSquare className="text-[#dfb34c]" /> Tulis Ulasan Baru
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-[#8e8e9f] hover:text-white transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmitFeedback} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase text-[#dfb34c] font-bold block">Pilih Barber</label>
                <select
                  value={selectedBarber}
                  onChange={(e) => setSelectedBarber(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#dfb34c]/60"
                  required
                >
                  <option value="">-- Pilih Kapster/Barber --</option>
                  {barbersList.map((barber) => (
                    <option key={barber.id} value={barber.name}>
                      {barber.name} ({barber.specialty || "Barber"})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase text-[#dfb34c] font-bold block">Beri Rating</label>
                <div className="flex items-center gap-2 pt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="text-2xl transition-all transform hover:scale-110 focus:outline-none"
                    >
                      <FaStar className={star <= rating ? "text-[#dfb34c]" : "text-gray-800"} />
                    </button>
                  ))}
                  <span className="text-xs text-white/50 ml-2 font-mono">{rating} / 5</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase text-[#dfb34c] font-bold block">Ulasan Anda</label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  rows="4"
                  placeholder="Ceritakan pengalaman Anda mendapatkan layanan cukur rambut..."
                  className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#dfb34c]/60 resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#dfb34c] text-[#111116] font-black text-xs tracking-wider py-4 rounded-xl hover:opacity-90 transition-all disabled:opacity-50"
              >
                {submitting ? "KIRIM..." : "KIRIM ULASAN"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
