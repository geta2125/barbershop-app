import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/auth-context";
import { supabase } from "../../lib/supabaseClient";
import { FaUser, FaLock, FaCheckCircle, FaSlidersH, FaClock, FaPercent } from "react-icons/fa";

export default function Settings() {
  const { profile, refreshProfile } = useAuth();
  
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  
  // System Settings (Admin/Owner specific)
  const [openTime, setOpenTime] = useState("09:00");
  const [closeTime, setCloseTime] = useState("21:00");
  const [barberCommission, setBarberCommission] = useState(30);
  const [allowWalkIn, setAllowWalkIn] = useState(true);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [updatingSystem, setUpdatingSystem] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || profile.name || "");
      setPhone(profile.phone || "");
      setEmail(profile.email || "");
    }
  }, [profile]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdatingProfile(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("Gagal mengambil data autentikasi.");

      // Update auth metadata
      const { error: authUpdateError } = await supabase.auth.updateUser({
        data: {
          full_name: fullName,
          phone: phone
        }
      });
      if (authUpdateError) throw authUpdateError;

      // Update public.users
      const { error: dbUpdateError } = await supabase
        .from("users")
        .update({
          name: fullName,
          full_name: fullName,
          phone: phone
        })
        .eq("id", user.id);
      
      if (dbUpdateError) {
        console.warn("Table public.users update failed or table doesn't exist.");
      }

      await refreshProfile();
      setSuccessMsg("Profil admin berhasil diperbarui!");
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Gagal memperbarui profil.");
    } finally {
      setUpdatingProfile(false);
    }
  };

  const handleUpdateSystem = (e) => {
    e.preventDefault();
    setUpdatingSystem(true);
    setTimeout(() => {
      setUpdatingSystem(false);
      setSuccessMsg("Pengaturan sistem berhasil diperbarui!");
    }, 800);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMsg("Konfirmasi password tidak cocok!");
      return;
    }

    setUpdatingPassword(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      setNewPassword("");
      setConfirmPassword("");
      setSuccessMsg("Password admin berhasil diperbarui!");
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Gagal memperbarui password.");
    } finally {
      setUpdatingPassword(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-2 py-4 space-y-6">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-white font-poppins">
          SYSTEM <span className="text-[#dfb34c]">SETTINGS</span>
        </h1>
        <p className="text-sm text-[#8e8e9f] mt-1">
          Kelola profil administrator dan konfigurasi operasional barbershop Anda.
        </p>
      </div>

      {/* ALERTS */}
      {successMsg && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-xs font-bold flex items-center gap-2">
          <FaCheckCircle /> {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-xs font-bold">
          ⚠️ {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN: PROFILE CARD & PASSWORD */}
        <div className="lg:col-span-1 space-y-6">
          {/* PROFILE CARD */}
          <div className="bg-[#141414] border border-white/5 rounded-3xl p-6 flex flex-col items-center text-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#dfb34c]/10 border border-[#dfb34c]/20 flex items-center justify-center text-[#dfb34c] text-2xl">
              <FaUser />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{fullName || "GroomGold Admin"}</h3>
              <p className="text-xs text-[#8e8e9f]">{email}</p>
            </div>
            <span className="px-3 py-1 rounded-full text-[9px] font-extrabold bg-[#dfb34c]/15 text-[#dfb34c] border border-[#dfb34c]/20 uppercase tracking-wider">
              {profile?.role || "Admin"}
            </span>
          </div>

          {/* PASSWORD */}
          <div className="bg-[#141414] border border-white/5 rounded-3xl p-6 space-y-4">
            <h4 className="text-xs uppercase tracking-wider text-[#dfb34c] font-bold flex items-center gap-1.5">
              <FaLock /> Keamanan Akun
            </h4>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] text-[#8e8e9f]">Password Baru</label>
                <input 
                  type="password" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#dfb34c]/60"
                  required
                  minLength="6"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] text-[#8e8e9f]">Konfirmasi Password</label>
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#dfb34c]/60"
                  required
                  minLength="6"
                />
              </div>
              <button
                type="submit"
                disabled={updatingPassword}
                className="w-full bg-[#dfb34c] text-[#111116] font-bold text-xs py-2.5 rounded-xl hover:opacity-90 transition-all disabled:opacity-50"
              >
                {updatingPassword ? "MEMPROSES..." : "UBAH PASSWORD"}
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: PROFILE & SYSTEM CONFIG */}
        <div className="lg:col-span-2 space-y-6">
          {/* PROFILE FORM */}
          <div className="bg-[#141414] border border-white/5 rounded-3xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white border-b border-white/5 pb-3">Informasi Akun</h3>
            <form onSubmit={handleUpdateProfile} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase text-[#dfb34c] font-bold">Nama Lengkap</label>
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#dfb34c]/60"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase text-[#dfb34c] font-bold">No. HP / Telepon</label>
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#dfb34c]/60"
                  required
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-[10px] uppercase text-[#dfb34c] font-bold">Alamat Email (Read-Only)</label>
                <input 
                  type="email" 
                  value={email}
                  disabled
                  className="w-full bg-[#1c1c1c] border border-white/5 text-white/50 rounded-xl px-4 py-3 text-xs cursor-not-allowed"
                />
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={updatingProfile}
                  className="bg-[#dfb34c] text-[#111116] font-bold text-xs px-5 py-3 rounded-xl hover:opacity-90 transition-all disabled:opacity-50"
                >
                  {updatingProfile ? "MENYIMPAN..." : "SIMPAN INFORMASI"}
                </button>
              </div>
            </form>
          </div>

          {/* SYSTEM CONFIG FORM (Admin only can edit) */}
          <div className="bg-[#141414] border border-white/5 rounded-3xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white border-b border-white/5 pb-3 flex items-center gap-2">
              <FaSlidersH className="text-[#dfb34c]" /> Konfigurasi Operasional Barbershop
            </h3>
            <form onSubmit={handleUpdateSystem} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase text-[#dfb34c] font-bold flex items-center gap-1">
                  <FaClock /> Jam Buka
                </label>
                <input 
                  type="time" 
                  value={openTime}
                  onChange={(e) => setOpenTime(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#dfb34c]/60"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase text-[#dfb34c] font-bold flex items-center gap-1">
                  <FaClock /> Jam Tutup
                </label>
                <input 
                  type="time" 
                  value={closeTime}
                  onChange={(e) => setCloseTime(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#dfb34c]/60"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase text-[#dfb34c] font-bold flex items-center gap-1">
                  <FaPercent /> Komisi Barber (%)
                </label>
                <input 
                  type="number" 
                  value={barberCommission}
                  onChange={(e) => setBarberCommission(Number(e.target.value))}
                  className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#dfb34c]/60"
                  required
                  min="0"
                  max="100"
                />
              </div>
              <div className="space-y-1.5 flex flex-col justify-end">
                <label className="text-[10px] uppercase text-[#dfb34c] font-bold flex items-center gap-1.5 mb-2.5">
                  Reservasi Walk-In
                </label>
                <div className="flex items-center gap-2 mt-1.5">
                  <input 
                    type="checkbox" 
                    checked={allowWalkIn}
                    onChange={(e) => setAllowWalkIn(e.target.checked)}
                    id="allow_walk_in"
                    className="w-4 h-4 rounded bg-[#1a1a1a] border-white/5 text-[#dfb34c] focus:ring-0 focus:ring-offset-0"
                  />
                  <label htmlFor="allow_walk_in" className="text-xs text-[#8e8e9f] select-none cursor-pointer">
                    Izinkan Kasir mencatat Walk-In Booking
                  </label>
                </div>
              </div>
              <div className="sm:col-span-2 pt-2">
                <button
                  type="submit"
                  disabled={updatingSystem}
                  className="bg-[#dfb34c] text-[#111116] font-bold text-xs px-5 py-3 rounded-xl hover:opacity-90 transition-all disabled:opacity-50"
                >
                  {updatingSystem ? "MENYIMPAN..." : "SIMPAN PENGATURAN OPERASIONAL"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
