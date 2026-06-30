import { useState, useEffect } from "react";
import { db } from "../../services/localDB";
import { bookingService, mapBooking } from "../../services/bookingService";
import { feedbackService } from "../../services/feedbackService";
import { useAuth } from "../../contexts/auth-context";
import { FaCalendarAlt, FaClock, FaCut, FaUserTie, FaCoins, FaTimes, FaStar, FaCommentAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function MemberHistory() {
  const { profile } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedbackBooking, setFeedbackBooking] = useState(null);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [submittingFeedback, setSubmittingFeedback] = useState(false);

  const fetchMemberBookings = () => {
    if (!profile) return;
    setLoading(true);
    try {
      const all = db.getBookings().map(mapBooking);
      // Filter by logged-in user email or phone
      const filtered = all.filter(b => 
        (profile.email && b.email === profile.email) || 
        (profile.phone && b.no_hp === profile.phone) ||
        (b.nama_customer === profile.full_name || b.nama_customer === profile.name)
      );
      setBookings(filtered);
    } catch (err) {
      console.error("Gagal memuat histori booking:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemberBookings();
  }, [profile]);

  const handleCancelBooking = async (id) => {
    const confirmCancel = window.confirm("Apakah Anda yakin ingin membatalkan booking ini?");
    if (!confirmCancel) return;

    try {
      await bookingService.update(id, { status_booking: "Canceled" });
      
      // Refund points/adjust stats in membership if necessary
      const memberships = db.getMemberships();
      const userMemberIndex = memberships.findIndex(m => m.Email === profile?.email);
      if (userMemberIndex !== -1) {
        const bk = bookings.find(b => b.id_booking === id);
        memberships[userMemberIndex].Total_Poin = Math.max(0, (memberships[userMemberIndex].Total_Poin || 0) - 100);
        memberships[userMemberIndex].Total_Kunjungan = Math.max(0, (memberships[userMemberIndex].Total_Kunjungan || 0) - 1);
        if (bk) {
          memberships[userMemberIndex].Total_Pengeluaran = Math.max(0, (memberships[userMemberIndex].Total_Pengeluaran || 0) - bk.harga);
        }
        db.saveMemberships(memberships);
      }

      alert("Booking berhasil dibatalkan!");
      fetchMemberBookings();
    } catch (err) {
      console.error(err);
      alert("Gagal membatalkan booking.");
    }
  };

  const handleOpenFeedback = (booking) => {
    setFeedbackBooking(booking);
    setRating(5);
    setReview("");
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    if (!feedbackBooking) return;

    setSubmittingFeedback(true);
    try {
      await feedbackService.create({
        booking_id: feedbackBooking.id_booking,
        customer_name: profile?.full_name || profile?.name || "Member",
        barber_name: feedbackBooking.barber,
        rating: rating,
        review: review
      });
      alert("Feedback berhasil dikirim! Terima kasih atas ulasan Anda.");
      setFeedbackBooking(null);
    } catch (err) {
      console.error(err);
      alert("Gagal mengirim feedback.");
    } finally {
      setSubmittingFeedback(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <FaCheckCircle className="text-[10px]" /> Selesai
          </span>
        );
      case "Canceled":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-500/10 border border-red-500/20 text-red-400">
            <FaTimesCircle className="text-[10px]" /> Dibatalkan
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 border border-amber-500/20 text-amber-400 animate-pulse">
            <FaClock className="text-[10px]" /> Menunggu
          </span>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-2 py-4">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-white font-poppins">
          MY <span className="text-[#dfb34c]">BOOKINGS</span>
        </h1>
        <p className="text-sm text-[#8e8e9f] mt-1">
          Pantau jadwal booking aktif dan riwayat potongan rambut Anda di sini.
        </p>
      </div>

      {/* BODY */}
      {loading ? (
        <div className="text-center py-12 text-[#dfb34c] text-sm">
          Memuat data booking...
        </div>
      ) : bookings.length === 0 ? (
        <div className="bg-[#141414] border border-white/5 rounded-2xl p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#dfb34c]/5 flex items-center justify-center mx-auto text-[#dfb34c] text-2xl">
            <FaCalendarAlt />
          </div>
          <h3 className="text-lg font-bold text-white">Belum Ada Booking</h3>
          <p className="text-xs text-[#8e8e9f] max-w-sm mx-auto">
            Anda belum pernah memesan layanan di GroomGold Barbershop. Buat pemesanan pertama Anda sekarang!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div 
              key={booking.id_booking} 
              className="bg-[#141414] border border-white/5 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all hover:border-white/10"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                {/* SERVICE ICON */}
                <div className="w-12 h-12 rounded-2xl bg-[#dfb34c]/10 border border-[#dfb34c]/20 flex items-center justify-center text-[#dfb34c] text-xl flex-shrink-0">
                  <FaCut />
                </div>
                
                <div className="space-y-1.5">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-white">{booking.layanan}</h3>
                    {getStatusBadge(booking.status_booking)}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#8e8e9f]">
                    <span className="flex items-center gap-1.5">
                      <FaUserTie className="text-[#dfb34c]/60" /> {booking.barber}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FaCalendarAlt className="text-[#dfb34c]/60" /> {booking.jadwal ? booking.jadwal.replace("T", " ") : "-"}
                    </span>
                    <span className="font-bold text-white">
                      Rp {booking.harga.toLocaleString("id-ID")}
                    </span>
                  </div>
                  
                  {booking.catatan && booking.catatan !== "-" && (
                    <p className="text-xs text-[#555566] italic mt-1">
                      Catatan: "{booking.catatan}"
                    </p>
                  )}
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex items-center gap-3 border-t border-white/5 pt-4 md:border-none md:pt-0">
                {booking.status_booking === "Pending" && (
                  <button
                    onClick={() => handleCancelBooking(booking.id_booking)}
                    className="flex items-center justify-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 text-red-400 font-bold text-xs px-4 py-2.5 rounded-xl transition-all w-full md:w-auto"
                  >
                    <FaTimes /> Batal Booking
                  </button>
                )}
                
                {booking.status_booking === "Completed" && (
                  <button
                    onClick={() => handleOpenFeedback(booking)}
                    className="flex items-center justify-center gap-1.5 bg-[#dfb34c]/10 hover:bg-[#dfb34c]/20 border border-[#dfb34c]/20 hover:border-[#dfb34c]/40 text-[#dfb34c] font-bold text-xs px-4 py-2.5 rounded-xl transition-all w-full md:w-auto"
                  >
                    <FaCommentAlt /> Beri Ulasan
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FEEDBACK MODAL */}
      {feedbackBooking && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#111116] border border-[#242335] rounded-3xl p-6 max-w-md w-full space-y-6 animate-in fade-in duration-200">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <h3 className="text-lg font-bold text-white font-poppins">Tulis Ulasan</h3>
              <button 
                onClick={() => setFeedbackBooking(null)}
                className="text-[#8e8e9f] hover:text-white transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmitFeedback} className="space-y-4">
              <div>
                <span className="text-xs text-[#8e8e9f] block mb-1">Layanan & Barber</span>
                <p className="text-sm font-bold text-white">{feedbackBooking.layanan} bersama {feedbackBooking.barber}</p>
              </div>

              {/* RATING */}
              <div className="space-y-2">
                <label className="text-xs uppercase text-[#dfb34c] font-bold block">Rating Anda</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="text-2xl transition-all"
                    >
                      <FaStar className={star <= rating ? "text-[#dfb34c]" : "text-gray-800"} />
                    </button>
                  ))}
                </div>
              </div>

              {/* REVIEW TEXT */}
              <div className="space-y-2">
                <label className="text-xs uppercase text-[#dfb34c] font-bold block">Komentar / Ulasan</label>
                <textarea
                  rows="4"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Ceritakan pengalaman Anda melakukan cukuran rambut di sini..."
                  className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl p-3 text-xs focus:outline-none focus:border-[#dfb34c]/60"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submittingFeedback}
                className="w-full bg-[#dfb34c] text-[#111116] font-black text-xs tracking-wider py-3.5 rounded-xl hover:opacity-90 transition-all duration-300 disabled:opacity-50"
              >
                {submittingFeedback ? "MENGIRIM..." : "KIRIM ULASAN"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
