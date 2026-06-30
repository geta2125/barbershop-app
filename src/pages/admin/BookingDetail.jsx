import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaChevronLeft, FaClock, FaCheckCircle, FaTimesCircle, FaCalendarAlt, FaCut, FaUserTie, FaUser, FaCoins, FaRegStickyNote, FaCreditCard, FaExchangeAlt } from "react-icons/fa";
import { bookingService, mapBooking } from "../../services/bookingService";
import Container from "../../components/Container";

export default function BookingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchBooking = () => {
    setLoading(true);
    bookingService.getById(id)
      .then((res) => {
        if (res.data) {
          setBooking(mapBooking(res.data));
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBooking();
  }, [id]);

  const handleUpdateStatus = async (newStatus) => {
    setUpdating(true);
    try {
      const payload = { status_booking: newStatus };
      if (newStatus === "Completed") {
        payload.status_pembayaran = "Lunas";
      }
      await bookingService.update(id, payload);
      alert(`Status reservasi berhasil diubah menjadi ${newStatus}`);
      fetchBooking();
    } catch (e) {
      console.error(e);
      alert("Gagal memperbarui status.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="w-full h-screen flex items-center justify-center bg-[#0A0A0A] text-[#dfb34c]">Memuat detail booking...</div>;
  }

  if (!booking) {
    return (
      <div className="w-full h-screen flex items-center justify-center px-5 bg-[#0A0A0A]">
        <div className="w-full max-w-md bg-[#141414] border border-white/5 rounded-3xl p-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center text-3xl mx-auto">
            <FaTimesCircle />
          </div>
          <h1 className="text-2xl font-black text-white">Booking Not Found</h1>
          <p className="text-[#8e8e9f] text-sm">
            Data booking tidak ditemukan pada sistem GroomGold.
          </p>
          <Link
            to="/admin/booking"
            className="w-full bg-[#dfb34c] text-[#111116] font-black py-3 rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            <FaChevronLeft /> Kembali ke Booking
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed": return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "On Going": return "text-sky-400 bg-sky-500/10 border-sky-500/20";
      case "Canceled": return "text-red-400 bg-red-500/10 border-red-500/20";
      default: return "text-amber-400 bg-amber-500/10 border-amber-500/20 animate-pulse";
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-2 py-4 space-y-6">
      {/* BACK BUTTON */}
      <div className="border-b border-white/5 pb-4">
        <Link
          to="/admin/booking"
          className="inline-flex items-center gap-1.5 text-xs text-[#dfb34c] hover:underline font-bold"
        >
          <FaChevronLeft /> Kembali ke Daftar Booking
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* DETAILS CARD */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-[#141414] border border-white/5 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[9px] uppercase tracking-[3px] font-black text-[#dfb34c]">Reservation Receipt</span>
                <h2 className="text-xl font-black text-white font-poppins mt-1">#BK-{(10000 + booking.id_booking)}</h2>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase border ${getStatusColor(booking.status_booking)}`}>
                {booking.status_booking}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/5 text-xs">
              <div className="space-y-1">
                <span className="text-[9px] uppercase text-gray-500 font-bold block">Customer</span>
                <p className="font-bold text-white flex items-center gap-1.5"><FaUser className="text-[#dfb34c]/60" /> {booking.nama_customer}</p>
                <p className="text-[#8e8e9f]">{booking.no_hp}</p>
                {booking.email && <p className="text-[#8e8e9f]">{booking.email}</p>}
              </div>

              <div className="space-y-1">
                <span className="text-[9px] uppercase text-gray-500 font-bold block">Jadwal Kedatangan</span>
                <p className="font-bold text-white flex items-center gap-1.5"><FaCalendarAlt className="text-[#dfb34c]/60" /> {booking.jadwal ? booking.jadwal.replace("T", " ") : "-"}</p>
                <p className="text-[#8e8e9f]">Durasi layanan: {booking.durasi || 30} menit</p>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] uppercase text-gray-500 font-bold block">Barber Capster</span>
                <p className="font-bold text-white flex items-center gap-1.5"><FaUserTie className="text-[#dfb34c]/60" /> {booking.barber}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] uppercase text-gray-500 font-bold block">Layanan</span>
                <p className="font-bold text-white flex items-center gap-1.5"><FaCut className="text-[#dfb34c]/60" /> {booking.layanan}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 space-y-2 text-xs">
              <span className="text-[9px] uppercase text-gray-500 font-bold block">Catatan Tambahan</span>
              <p className="bg-white/[0.02] border border-white/5 rounded-xl p-3 text-[#8e8e9f] italic">
                "{booking.catatan || "-"}"
              </p>
            </div>
          </div>
        </div>

        {/* OPERATIONS & BILLING */}
        <div className="bg-[#141414] border border-white/5 rounded-3xl p-6 h-fit space-y-6 shadow-xl">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Rincian Pembayaran</h3>

          <div className="space-y-3 pb-4 border-b border-white/5 text-xs text-[#8e8e9f]">
            <div className="flex justify-between">
              <span>Biaya Layanan</span>
              <span className="font-mono text-white">Rp {booking.harga.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between">
              <span>Metode Bayar</span>
              <span className="font-bold text-[#dfb34c] uppercase">{booking.metode_pembayaran}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Status Bayar</span>
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${
                booking.status_pembayaran === "Lunas" || booking.status_booking === "Completed"
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : "bg-red-500/10 text-red-400 border-red-500/20"
              }`}>
                {booking.status_pembayaran === "Lunas" || booking.status_booking === "Completed" ? "Lunas" : "Belum Lunas"}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-white uppercase">Total Biaya</span>
            <span className="font-mono font-black text-lg text-[#dfb34c]">
              Rp {booking.harga.toLocaleString("id-ID")}
            </span>
          </div>

          {/* STATUS TRANSITION BUTTONS */}
          {booking.status_booking !== "Completed" && booking.status_booking !== "Canceled" && (
            <div className="space-y-2.5 pt-2 border-t border-white/5">
              <span className="text-[9px] uppercase text-gray-500 font-bold block">Ubah Status Kerja</span>
              
              {booking.status_booking === "Pending" && (
                <button
                  onClick={() => handleUpdateStatus("On Going")}
                  disabled={updating}
                  className="w-full bg-sky-500 text-black font-black text-xs py-3 rounded-xl hover:opacity-90 transition-all flex justify-center items-center gap-1.5 shadow-[0_4px_15px_rgba(14,165,233,0.2)]"
                >
                  <FaExchangeAlt /> MULAI LAYANAN
                </button>
              )}

              {booking.status_booking === "On Going" && (
                <button
                  onClick={() => handleUpdateStatus("Completed")}
                  disabled={updating}
                  className="w-full bg-[#dfb34c] text-black font-black text-xs py-3 rounded-xl hover:opacity-90 transition-all flex justify-center items-center gap-1.5 shadow-[0_4px_15px_rgba(223,179,76,0.2)]"
                >
                  <FaCheckCircle /> SELESAI & CHECKOUT
                </button>
              )}

              <button
                onClick={() => handleUpdateStatus("Canceled")}
                disabled={updating}
                className="w-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 font-bold text-xs py-3 rounded-xl transition-all"
              >
                BATALKAN RESERVASI
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
