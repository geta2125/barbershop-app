import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../services/localDB";
import { bookingService } from "../../services/bookingService";
import { useAuth } from "../../contexts/auth-context";
import { FaCut, FaUserTie, FaCalendarAlt, FaCheckCircle, FaChevronRight, FaChevronLeft, FaClock } from "react-icons/fa";

export default function MemberBooking() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  
  const [step, setStep] = useState(1);
  const [services, setServices] = useState([]);
  const [barbers, setBarbers] = useState([]);
  
  const [selectedService, setSelectedService] = useState(null);
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setServices(db.getServices().filter(s => s.status === "Aktif"));
    setBarbers(db.getBarbers().filter(b => b.status === "Standby"));
    
    // Default date is today
    const today = new Date().toISOString().split("T")[0];
    setBookingDate(today);
  }, []);

  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", "13:00", 
    "14:00", "15:00", "16:00", "17:00", "18:00", 
    "19:00", "20:00", "21:00"
  ];

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setStep(2);
  };

  const handleBarberSelect = (barber) => {
    setSelectedBarber(barber);
    setStep(3);
  };

  const handleDateTimeSubmit = (e) => {
    e.preventDefault();
    if (!bookingDate || !bookingTime) {
      alert("Silakan pilih tanggal dan waktu!");
      return;
    }
    setStep(4);
  };

  const handleConfirmBooking = async () => {
    if (!selectedService || !selectedBarber || !bookingDate || !bookingTime) return;
    
    setSubmitting(true);
    try {
      const bookingData = {
        nama_customer: profile?.full_name || profile?.name || "Member",
        email: profile?.email || "",
        no_hp: profile?.phone || "",
        service_id: selectedService.id,
        layanan: selectedService.nama_service,
        barber_id: selectedBarber.id,
        barber: selectedBarber.name,
        durasi: selectedService.durasi,
        jadwal: `${bookingDate}T${bookingTime}`,
        harga: selectedService.harga,
        metode_pembayaran: paymentMethod,
        status_booking: "Pending",
        status_pembayaran: "Belum Lunas",
        catatan: notes || "-"
      };

      await bookingService.create(bookingData);
      
      // Add points to membership
      const memberships = db.getMemberships();
      const userMemberIndex = memberships.findIndex(m => m.Email === profile?.email);
      if (userMemberIndex !== -1) {
        memberships[userMemberIndex].Total_Poin = (memberships[userMemberIndex].Total_Poin || 0) + 100;
        memberships[userMemberIndex].Total_Kunjungan = (memberships[userMemberIndex].Total_Kunjungan || 0) + 1;
        memberships[userMemberIndex].Total_Pengeluaran = (memberships[userMemberIndex].Total_Pengeluaran || 0) + selectedService.harga;
        db.saveMemberships(memberships);
      }

      setSuccess(true);
      setTimeout(() => {
        navigate("/member/history");
      }, 2000);
    } catch (err) {
      console.error(err);
      alert("Gagal membuat booking. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <FaCheckCircle className="text-[#dfb34c] text-7xl mb-6 animate-bounce" />
        <h2 className="text-3xl font-bold text-white mb-2 font-poppins">Booking Berhasil!</h2>
        <p className="text-[#8e8e9f] max-w-md">
          Booking Anda telah dicatat dengan status <span className="text-[#dfb34c] font-bold">Pending</span>. Anda akan dialihkan ke riwayat booking Anda...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-2 py-4">
      {/* HEADER */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-black tracking-tight text-white font-poppins">
          BOOK <span className="text-[#dfb34c]">A SERVICE</span>
        </h1>
        <p className="text-sm text-[#8e8e9f] mt-1">
          Dapatkan potongan rambut terbaik dari barber profesional kami.
        </p>
      </div>

      {/* STEP PROGRESS */}
      <div className="grid grid-cols-4 gap-2 mb-8 select-none">
        {[
          { label: "Layanan", step: 1, icon: <FaCut /> },
          { label: "Barber", step: 2, icon: <FaUserTie /> },
          { label: "Jadwal", step: 3, icon: <FaCalendarAlt /> },
          { label: "Konfirmasi", step: 4, icon: <FaCheckCircle /> }
        ].map((s) => (
          <div 
            key={s.step} 
            className={`flex flex-col items-center p-3 rounded-xl border transition-all duration-300 ${
              step >= s.step 
                ? "bg-[#dfb34c]/10 border-[#dfb34c]/30 text-white" 
                : "bg-[#141414] border-white/5 text-[#8e8e9f]"
            }`}
          >
            <span className={`text-lg mb-1 ${step === s.step ? "text-[#dfb34c]" : ""}`}>{s.icon}</span>
            <span className="text-[11px] font-bold uppercase tracking-wider hidden sm:inline">{s.label}</span>
            <span className="text-[9px] font-bold uppercase tracking-wider sm:hidden">S{s.step}</span>
          </div>
        ))}
      </div>

      {/* STEP 1: SERVICES */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="border-b border-white/5 pb-4">
            <h2 className="text-xl font-bold text-white">Pilih Layanan Kami</h2>
            <p className="text-xs text-[#8e8e9f]">Pilih salah satu perawatan rambut premium di bawah ini</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service) => (
              <div 
                key={service.id}
                onClick={() => handleServiceSelect(service)}
                className={`group border rounded-2xl p-5 bg-[#141414] hover:bg-[#1a1a1a] cursor-pointer transition-all duration-300 hover:scale-[1.02] flex items-center justify-between ${
                  selectedService?.id === service.id ? "border-[#dfb34c] shadow-[0_0_15px_rgba(223,179,76,0.1)]" : "border-white/5 hover:border-white/10"
                }`}
              >
                <div className="space-y-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-extrabold tracking-wider bg-[#dfb34c]/10 text-[#dfb34c] border border-[#dfb34c]/20 uppercase">
                    {service.kategori}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#dfb34c] transition-colors">{service.nama_service}</h3>
                  <div className="flex items-center gap-4 text-xs text-[#8e8e9f]">
                    <span className="flex items-center gap-1"><FaClock className="text-[#dfb34c]/60" /> {service.durasi} Menit</span>
                    <span className="font-bold text-white">Rp {service.harga.toLocaleString("id-ID")}</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#dfb34c]/5 flex items-center justify-center group-hover:bg-[#dfb34c] text-[#dfb34c] group-hover:text-black transition-all">
                  <FaChevronRight />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2: BARBERS */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white">Pilih Barber</h2>
              <p className="text-xs text-[#8e8e9f]">Pilih barber profesional yang Anda inginkan</p>
            </div>
            <button 
              onClick={() => setStep(1)}
              className="flex items-center gap-1 text-xs font-semibold text-[#dfb34c] hover:underline"
            >
              <FaChevronLeft /> Kembali ke Layanan
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {barbers.map((barber) => (
              <div 
                key={barber.id}
                onClick={() => handleBarberSelect(barber)}
                className={`group border rounded-2xl p-5 bg-[#141414] hover:bg-[#1a1a1a] cursor-pointer transition-all duration-300 text-center flex flex-col items-center justify-between ${
                  selectedBarber?.id === barber.id ? "border-[#dfb34c] shadow-[0_0_15px_rgba(223,179,76,0.1)]" : "border-white/5 hover:border-white/10"
                }`}
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <img 
                      src={barber.image} 
                      alt={barber.name} 
                      className="w-20 h-20 rounded-full object-cover border-2 border-white/5 group-hover:border-[#dfb34c] transition-all duration-300"
                    />
                    <span className="absolute bottom-0 right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#141414] rounded-full" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#dfb34c] transition-colors">{barber.name}</h3>
                    <p className="text-xs text-[#8e8e9f] mt-0.5">{barber.specialty || "Hair Styling Specialist"}</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 w-full flex items-center justify-between text-xs text-[#8e8e9f]">
                  <span>⭐ {barber.rating}</span>
                  <span className="font-medium text-white">{barber.experience} Exp</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3: DATE & TIME */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white">Pilih Jadwal</h2>
              <p className="text-xs text-[#8e8e9f]">Tentukan tanggal dan jam kedatangan Anda</p>
            </div>
            <button 
              onClick={() => setStep(2)}
              className="flex items-center gap-1 text-xs font-semibold text-[#dfb34c] hover:underline"
            >
              <FaChevronLeft /> Kembali ke Barber
            </button>
          </div>

          <form onSubmit={handleDateTimeSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* DATE PICKER */}
            <div className="bg-[#141414] border border-white/5 rounded-2xl p-5 space-y-4 md:col-span-1">
              <label className="text-xs uppercase tracking-wider text-[#dfb34c] font-bold block">Pilih Tanggal</label>
              <input 
                type="date" 
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#dfb34c]/60 focus:ring-1 focus:ring-[#dfb34c]/30"
                required
              />
              <div className="text-[11px] text-[#8e8e9f] leading-relaxed">
                * Booking disarankan minimal 1 jam sebelum jadwal kedatangan.
              </div>
            </div>

            {/* TIME SLOTS */}
            <div className="bg-[#141414] border border-white/5 rounded-2xl p-5 space-y-4 md:col-span-2">
              <label className="text-xs uppercase tracking-wider text-[#dfb34c] font-bold block">Pilih Jam</label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setBookingTime(time)}
                    className={`py-3 rounded-xl border text-xs font-bold transition-all duration-200 ${
                      bookingTime === time
                        ? "bg-[#dfb34c] border-[#dfb34c] text-[#111116]"
                        : "bg-[#1a1a1a] border-white/5 text-white hover:bg-white/5"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="md:col-span-3 flex justify-end">
              <button 
                type="submit"
                className="bg-[#dfb34c] text-[#111116] font-bold text-sm px-6 py-3.5 rounded-xl hover:opacity-90 transition-all flex items-center gap-2 shadow-[0_4px_20px_rgba(223,179,76,0.15)]"
              >
                Lanjutkan Ke Konfirmasi <FaChevronRight />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* STEP 4: CONFIRMATION */}
      {step === 4 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white">Konfirmasi Booking</h2>
              <p className="text-xs text-[#8e8e9f]">Periksa kembali detail pemesanan Anda sebelum konfirmasi</p>
            </div>
            <button 
              onClick={() => setStep(3)}
              className="flex items-center gap-1 text-xs font-semibold text-[#dfb34c] hover:underline"
            >
              <FaChevronLeft /> Kembali ke Jadwal
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* BOOKING DETAILS */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-[#141414] border border-white/5 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm uppercase tracking-wider text-[#dfb34c] font-bold">Rincian Pemesanan</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] uppercase text-[#8e8e9f]">Layanan</span>
                    <p className="text-sm font-bold text-white">{selectedService?.nama_service}</p>
                    <span className="text-xs text-[#dfb34c]">Rp {selectedService?.harga.toLocaleString("id-ID")}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-[#8e8e9f]">Barber</span>
                    <p className="text-sm font-bold text-white">{selectedBarber?.name}</p>
                    <span className="text-xs text-[#8e8e9f]">{selectedBarber?.specialty}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-[#8e8e9f]">Tanggal</span>
                    <p className="text-sm font-bold text-white">
                      {new Date(bookingDate).toLocaleDateString("id-ID", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-[#8e8e9f]">Jam</span>
                    <p className="text-sm font-bold text-white">{bookingTime} WIB</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-3">
                  <label className="text-xs uppercase text-[#8e8e9f] block">Catatan Tambahan (Opsional)</label>
                  <textarea 
                    rows="2"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Contoh: Tolong potong tipis bagian samping..."
                    className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl p-3 text-xs focus:outline-none focus:border-[#dfb34c]/60"
                  />
                </div>
              </div>

              {/* PAYMENT METHOD */}
              <div className="bg-[#141414] border border-white/5 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm uppercase tracking-wider text-[#dfb34c] font-bold">Metode Pembayaran</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { key: "Cash", label: "Cash di Kasir", desc: "Bayar langsung setelah potong" },
                    { key: "QRIS", label: "QRIS / E-Wallet", desc: "Scan QRIS di kasir" }
                  ].map((p) => (
                    <div
                      key={p.key}
                      onClick={() => setPaymentMethod(p.key)}
                      className={`border p-4 rounded-xl cursor-pointer transition-all ${
                        paymentMethod === p.key
                          ? "bg-[#dfb34c]/10 border-[#dfb34c] text-white"
                          : "bg-[#1a1a1a] border-white/5 text-[#8e8e9f] hover:border-white/10"
                      }`}
                    >
                      <p className="text-xs font-bold text-white">{p.label}</p>
                      <p className="text-[10px] text-[#8e8e9f] mt-1">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ORDER SUMMARY */}
            <div className="bg-gradient-to-b from-[#181822] to-[#111116] border border-[#242335] rounded-2xl p-6 h-fit space-y-6">
              <h3 className="text-sm uppercase tracking-wider text-[#dfb34c] font-bold">Ringkasan Pembayaran</h3>
              
              <div className="space-y-3.5 text-xs pb-4 border-b border-white/5">
                <div className="flex justify-between text-[#8e8e9f]">
                  <span>Biaya Layanan</span>
                  <span className="text-white">Rp {selectedService?.harga.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between text-[#8e8e9f]">
                  <span>PPN (0%)</span>
                  <span className="text-white">Rp 0</span>
                </div>
                <div className="flex justify-between text-[#8e8e9f]">
                  <span>Poin Diperoleh</span>
                  <span className="text-[#dfb34c] font-bold">+100 Poin</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-white uppercase">Total Bayar</span>
                <span className="text-xl font-black text-[#dfb34c]">
                  Rp {selectedService?.harga.toLocaleString("id-ID")}
                </span>
              </div>

              <button
                onClick={handleConfirmBooking}
                disabled={submitting}
                className="w-full bg-[#dfb34c] text-[#111116] font-black text-xs tracking-wider py-4 rounded-xl hover:opacity-90 transition-all duration-300 disabled:opacity-50 flex justify-center items-center gap-2 shadow-[0_6px_25px_rgba(223,179,76,0.2)]"
              >
                {submitting ? "MEMPROSES..." : "KONFIRMASI BOOKING"}
              </button>

              <p className="text-[9px] text-[#555566] text-center leading-relaxed">
                Dengan mengonfirmasi, Anda menyetujui syarat dan ketentuan layanan GroomGold Barbershop.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
