import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/auth-context";
import { supabase } from "../../lib/supabaseClient";
import { db } from "../../services/localDB";
import { FaUser, FaPhone, FaEnvelope, FaLock, FaCheckCircle } from "react-icons/fa";

export default function MemberProfile() {
  const { profile, refreshProfile } = useAuth();
  
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [updatingProfile, setUpdatingProfile] = useState(false);
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

      // 1. Update auth metadata
      const { error: authUpdateError } = await supabase.auth.updateUser({
        data: {
          full_name: fullName,
          phone: phone
        }
      });
      if (authUpdateError) throw authUpdateError;

      // 2. Update public.users table in Supabase
      const { error: dbUpdateError } = await supabase
        .from("users")
        .update({
          name: fullName,
          full_name: fullName,
          phone: phone
        })
        .eq("id", user.id);
      
      if (dbUpdateError) {
        console.warn("Table public.users update failed or table doesn't exist. Syncing locally.");
      }

      // 3. Update in local storage membership list
      const memberships = db.getMemberships();
      const mIdx = memberships.findIndex(m => m.Email === email);
      if (mIdx !== -1) {
        memberships[mIdx].Nama_Lengkap = fullName;
        memberships[mIdx].No_HP = phone;
        db.saveMemberships(memberships);
      }

      // 4. Update in local storage users list
      const localUsers = db.getUsers();
      const uIdx = localUsers.findIndex(u => u.email === email);
      if (uIdx !== -1) {
        localUsers[uIdx].name = fullName;
        db.saveUsers(localUsers);
      }

      await refreshProfile();
      setSuccessMsg("Profil berhasil diperbarui!");
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Gagal memperbarui profil.");
    } finally {
      setUpdatingProfile(false);
    }
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
      setSuccessMsg("Password berhasil diperbarui!");
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Gagal memperbarui password.");
    } finally {
      setUpdatingPassword(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-2 py-4 space-y-6">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-white font-poppins">
          MY <span className="text-[#dfb34c]">PROFILE</span>
        </h1>
        <p className="text-sm text-[#8e8e9f] mt-1">
          Kelola informasi profil pribadi Anda dan keamanan akun.
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* PROFILE CARD */}
        <div className="md:col-span-1 bg-[#141414] border border-white/5 rounded-3xl p-6 flex flex-col items-center text-center justify-center space-y-4 h-fit">
          <div className="w-20 h-20 rounded-full bg-[#dfb34c]/10 border-2 border-[#dfb34c]/20 flex items-center justify-center text-[#dfb34c] text-3xl">
            <FaUser />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{fullName || "GroomGold User"}</h3>
            <p className="text-xs text-[#8e8e9f] mt-0.5">{email}</p>
          </div>
          <span className="px-3 py-1 rounded-full text-[9px] font-extrabold bg-[#dfb34c]/10 text-[#dfb34c] border border-[#dfb34c]/20 uppercase tracking-widest">
            {profile?.role || "Member"}
          </span>
        </div>

        {/* FORMS */}
        <div className="md:col-span-2 space-y-6">
          {/* EDIT PROFILE */}
          <div className="bg-[#141414] border border-white/5 rounded-3xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white border-b border-white/5 pb-3">Informasi Profil</h3>
            
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] tracking-wider uppercase text-[#dfb34c] font-bold block">Nama Lengkap</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-xs"><FaUser /></span>
                  <input 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-[#dfb34c]/60"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] tracking-wider uppercase text-[#dfb34c] font-bold block">No. HP / Telepon</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-xs"><FaPhone /></span>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-[#dfb34c]/60"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] tracking-wider uppercase text-[#dfb34c] font-bold block">Email (Tidak Dapat Diubah)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-xs"><FaEnvelope /></span>
                  <input 
                    type="email" 
                    value={email}
                    disabled
                    className="w-full bg-[#1c1c1c] border border-white/5 text-white/50 rounded-xl pl-10 pr-4 py-3 text-xs cursor-not-allowed"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={updatingProfile}
                className="bg-[#dfb34c] text-[#111116] font-black text-xs tracking-wider px-5 py-3 rounded-xl hover:opacity-90 transition-all disabled:opacity-50"
              >
                {updatingProfile ? "MENYIMPAN..." : "SIMPAN PERUBAHAN"}
              </button>
            </form>
          </div>

          {/* CHANGE PASSWORD */}
          <div className="bg-[#141414] border border-white/5 rounded-3xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white border-b border-white/5 pb-3">Ubah Password</h3>
            
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] tracking-wider uppercase text-[#dfb34c] font-bold block">Password Baru</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-xs"><FaLock /></span>
                  <input 
                    type="password" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min. 6 Karakter"
                    className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-[#dfb34c]/60"
                    required
                    minLength="6"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] tracking-wider uppercase text-[#dfb34c] font-bold block">Konfirmasi Password Baru</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-xs"><FaLock /></span>
                  <input 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Ulangi Password Baru"
                    className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-[#dfb34c]/60"
                    required
                    minLength="6"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={updatingPassword}
                className="bg-[#dfb34c] text-[#111116] font-black text-xs tracking-wider px-5 py-3 rounded-xl hover:opacity-90 transition-all disabled:opacity-50"
              >
                {updatingPassword ? "MEMPROSES..." : "UBAH PASSWORD"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
