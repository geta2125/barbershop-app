import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useAdminData } from "../../hooks/useAdminData";
import { bookingService } from "../../services/bookingService";
import { db } from "../../services/localDB";
import { FaUser, FaCalendarAlt, FaCut, FaUserTie, FaCoins, FaCheckCircle, FaExclamationTriangle, FaSearch, FaPlus, FaCreditCard, FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [searchPhone, setSearchPhone] = useState("");
  const { loading, todaysBookings, barbers, lowStockProducts, refetch } = useAdminData();

  const handlePayment = async (bookingId, customerName) => {
    const konfirmasi = window.confirm(`Selesaikan pembayaran untuk ${customerName}?`);
    if (!konfirmasi) return;

    try {
      await bookingService.update(bookingId, { 
        status_booking: "Completed",
        status_pembayaran: "Lunas"
      });
      alert("Pembayaran berhasil diselesaikan!");
      refetch();
    } catch (e) {
      console.error(e);
      alert("Gagal menyelesaikan pembayaran.");
    }
  };

  const handleCheckMember = () => {
    if (!searchPhone) return alert("Masukkan nomor HP!");
    
    const memberships = db.getMemberships();
    const member = memberships.find(m => m.No_HP === searchPhone);

    if (!member) {
      alert("Member tidak ditemukan!");
    } else {
      alert(`Member Ditemukan!\nNama: ${member.Nama_Lengkap}\nTier: ${member.Level_Membership}\nPoin: ${member.Total_Poin || 0}`);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed": return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "On Going": return "text-sky-400 bg-sky-500/10 border-sky-500/20";
      case "Canceled": return "text-red-400 bg-red-500/10 border-red-500/20";
      default: return "text-amber-400 bg-amber-500/10 border-amber-500/20";
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-[#dfb34c]">
        <FaSpinner className="animate-spin text-3xl mb-4" />
        <span className="text-sm font-medium">Sinkronisasi Database Lokal Berjalan...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* TOP BAR */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#dfb34c] to-[#a07020] flex items-center justify-center font-bold text-white shadow-lg">
            AD
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Admin Kasir</h1>
            <p className="text-xs text-[#8e8e9f]">Groom Gold Management</p>
          </div>
        </div>
        
        <div className="bg-[#141414] border border-white/5 rounded-xl px-4 py-2 text-xs text-[#8e8e9f] flex items-center gap-2">
          <span>{new Date().toLocaleDateString("id-ID", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <span className="text-[#dfb34c]">📅</span>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="relative overflow-hidden bg-[#141414] border border-white/5 rounded-3xl p-6 shadow-lg transition-all duration-300 hover:scale-[1.02]">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#dfb34c]" />
          <span className="text-[10px] uppercase text-[#8e8e9f] tracking-wider font-bold">Antrean Aktif</span>
          <h3 className="text-2xl font-black text-white mt-2">
            {todaysBookings.filter(b => b.status_booking !== "Completed" && b.status_booking !== "Canceled").length} Pelanggan
          </h3>
          <p className="text-[10px] text-[#dfb34c] mt-2">Sedang menunggu / dikerjakan</p>
        </div>

        <div className="relative overflow-hidden bg-[#141414] border border-white/5 rounded-3xl p-6 shadow-lg transition-all duration-300 hover:scale-[1.02]">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#dfb34c]" />
          <span className="text-[10px] uppercase text-[#8e8e9f] tracking-wider font-bold">Barber Standby</span>
          <h3 className="text-2xl font-black text-white mt-2">
            {barbers.filter(b => b.status === "Standby").length} Barber
          </h3>
          <p className="text-[10px] text-[#dfb34c] mt-2">Siap melayani pelanggan</p>
        </div>

        <div className="relative overflow-hidden bg-[#141414] border border-white/5 rounded-3xl p-6 shadow-lg transition-all duration-300 hover:scale-[1.02]">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#dfb34c]" />
          <span className="text-[10px] uppercase text-[#8e8e9f] tracking-wider font-bold">Transaksi Selesai</span>
          <h3 className="text-2xl font-black text-white mt-2">
            {todaysBookings.filter(b => b.status_booking === "Completed").length} Kepala
          </h3>
          <p className="text-[10px] text-[#dfb34c] mt-2">Selesai checkout hari ini</p>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* QUICK ACTIONS */}
          <div className="grid grid-cols-3 gap-4">
            <Link 
              to="/admin/booking"
              className="bg-[#141414] border border-white/5 hover:border-[#dfb34c]/30 rounded-2xl p-5 flex flex-col items-center gap-3 transition-all duration-300 hover:scale-[1.02] text-center"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-lg"><FaPlus /></div>
              <span className="text-xs font-bold text-white">Input Walk-In</span>
            </Link>
            
            <Link 
              to="/admin/booking"
              className="bg-[#141414] border border-white/5 hover:border-[#dfb34c]/30 rounded-2xl p-5 flex flex-col items-center gap-3 transition-all duration-300 hover:scale-[1.02] text-center"
            >
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center text-lg"><FaCalendarAlt /></div>
              <span className="text-xs font-bold text-white">Buat Booking</span>
            </Link>

            <Link 
              to="/admin/transaction"
              className="bg-[#141414] border border-white/5 hover:border-[#dfb34c]/30 rounded-2xl p-5 flex flex-col items-center gap-3 transition-all duration-300 hover:scale-[1.02] text-center"
            >
              <div className="w-10 h-10 rounded-xl bg-[#dfb34c]/10 text-[#dfb34c] flex items-center justify-center text-lg"><FaCreditCard /></div>
              <span className="text-xs font-bold text-white">Kasir POS</span>
            </Link>
          </div>

          {/* LIVE QUEUE TABLE */}
          <div className="bg-[#141414] border border-white/5 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span className="text-[#dfb34c]">⏳</span> Daftar Antrean & Booking Hari Ini
              </h3>
              <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-[#dfb34c]/15 text-[#dfb34c] border border-[#dfb34c]/20 tracking-wider">
                REALTIME
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/5 text-gray-500 font-bold uppercase tracking-wider">
                    <th className="py-3">Jam</th>
                    <th className="py-3">Customer</th>
                    <th className="py-3">Layanan</th>
                    <th className="py-3">Barber</th>
                    <th className="py-3">Status</th>
                    <th className="py-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.02]">
                  {todaysBookings.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-8 text-[#8e8e9f]">Belum ada antrean hari ini.</td>
                    </tr>
                  ) : (
                    todaysBookings.map((b) => (
                      <tr key={b.id_booking} className="hover:bg-white/[0.01] transition-colors">
                        <td className="py-4 font-bold text-[#dfb34c]">{b.jadwal ? b.jadwal.split("T")[1] || b.jadwal.split(" ")[1] || "10:00" : "-"}</td>
                        <td className="py-4 font-medium text-white">{b.nama_customer}</td>
                        <td className="py-4 text-[#8e8e9f]">{b.layanan}</td>
                        <td className="py-4 text-[#8e8e9f] flex items-center gap-1.5 mt-0.5">
                          <FaUserTie className="text-[#dfb34c]/60" /> {b.barber}
                        </td>
                        <td className="py-4">
                          <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold border uppercase ${getStatusStyle(b.status_booking)}`}>
                            {b.status_booking}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          {b.status_booking !== "Completed" && b.status_booking !== "Canceled" && (
                            <button 
                              onClick={() => handlePayment(b.id_booking, b.nama_customer)}
                              className="border border-[#dfb34c]/30 hover:border-[#dfb34c] text-[#dfb34c] hover:bg-[#dfb34c]/5 font-bold text-[10px] px-3 py-1.5 rounded-lg transition-all"
                            >
                              Bayar
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* INVENTORY ALERT */}
          <div className="bg-[#141414] border border-white/5 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="text-[#dfb34c]"><FaExclamationTriangle /></span> Peringatan Stok Produk Rendah
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {lowStockProducts.map((p) => (
                <div 
                  key={p.id} 
                  className="flex items-center justify-between bg-red-500/5 border border-red-500/10 p-4 rounded-2xl"
                >
                  <span className="text-xs font-bold text-white">{p.name}</span>
                  <span className="text-xs font-black text-red-400 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-xl">
                    Sisa {p.stock} {p.unit}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          
          {/* STATUS MONITOR BARBER */}
          <div className="bg-[#141414] border border-white/5 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="text-[#dfb34c]"><FaCut /></span> Status Barber Hari Ini
            </h3>
            <div className="space-y-3">
              {barbers.map((barber) => (
                <div 
                  key={barber.id} 
                  className="bg-[#1c1c1c] border border-white/5 rounded-2xl p-4 flex items-center justify-between transition-all hover:border-white/10"
                >
                  <div>
                    <h4 className="text-xs font-bold text-white">{barber.name}</h4>
                    <p className="text-[10px] text-[#8e8e9f] mt-0.5">{barber.specialty}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${barber.status === "Standby" ? "bg-emerald-500" : "bg-[#dfb34c]"}`} />
                    <span className="text-[11px] font-bold text-[#8e8e9f]">{barber.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* QUICK MEMBER CHECK */}
          <div className="bg-[#141414] border border-white/5 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="text-[#dfb34c]"><FaSearch /></span> Cari Data Member
            </h3>
            <div className="space-y-3">
              <input 
                type="text" 
                placeholder="Masukkan No. HP Member..."
                value={searchPhone}
                onChange={(e) => setSearchPhone(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#dfb34c]/60"
              />
              <button 
                onClick={handleCheckMember}
                className="w-full bg-[#dfb34c] text-[#111116] font-bold text-xs py-3 rounded-xl hover:opacity-90 transition-all shadow-[0_4px_15px_rgba(223,179,76,0.15)]"
              >
                Cek Membership
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
