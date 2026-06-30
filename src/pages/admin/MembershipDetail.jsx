import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaCrown, FaGift, FaCoins, FaCalendarAlt, FaStar, FaUser, FaCheckCircle, FaExchangeAlt, FaHistory, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { membershipService, mapMembership } from "../../services/membershipService";
import { db } from "../../services/localDB";
import Container from "../../components/Container";

export default function MembershipDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [redeemedList, setRedeemedList] = useState([]);

  useEffect(() => {
    setLoading(true);
    membershipService.getById(id)
      .then((res) => {
        if (res.data) {
          setMember(mapMembership(res.data));
          
          // Get redeemed rewards for this customer from local storage
          const name = res.data.Nama_Lengkap;
          const rList = db.getRedeemedRewards().filter(r => r.customer_name === name);
          setRedeemedList(rList);
        } else {
          setError("Membership tidak ditemukan.");
        }
      })
      .catch((err) => setError(err.message || "Gagal memuat detail membership."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="text-center py-12 text-[#dfb34c]">Memuat detail membership...</div>;
  }

  if (error || !member) {
    return (
      <div className="max-w-md mx-auto text-center py-12 space-y-4">
        <p className="text-[#8e8e9f]">{error || "Membership tidak ditemukan."}</p>
        <Link to="/admin/membership" className="text-[#dfb34c] hover:underline font-bold text-xs">
          Kembali ke Daftar
        </Link>
      </div>
    );
  }

  const maxPoints = 5000;
  const progressPercent = Math.min((member.Total_Poin / maxPoints) * 100, 100);

  const getTierGradient = (tier) => {
    switch (tier) {
      case "Gold": return "from-[#dfb34c] via-[#a07020] to-[#dfb34c] text-black shadow-[0_10px_35px_rgba(223,179,76,0.2)]";
      case "Silver": return "from-[#d1d5db] via-[#6b7280] to-[#e5e7eb] text-slate-950 shadow-[0_10px_35px_rgba(209,213,219,0.1)]";
      default: return "from-[#d97706] via-[#78350f] to-[#b45309] text-white shadow-[0_10px_35px_rgba(217,119,6,0.1)]";
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-2 py-4 space-y-6">
      {/* BACK BUTTON */}
      <div className="border-b border-white/5 pb-4">
        <Link
          to="/admin/membership"
          className="inline-flex items-center gap-1.5 text-xs text-[#dfb34c] hover:underline font-bold"
        >
          <FaChevronLeft /> Kembali ke Daftar Membership
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* MEMBERSHIP CARD */}
        <div className="md:col-span-2">
          <div className={`relative rounded-3xl p-6 sm:p-8 h-56 flex flex-col justify-between overflow-hidden bg-gradient-to-br ${getTierGradient(member.Level_Membership)}`}>
            {/* DECORATIVE GLOW */}
            <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-white/5 blur-xl" />

            <div className="flex justify-between items-start relative z-10">
              <div>
                <span className="text-[9px] uppercase tracking-[3px] font-black opacity-75">GroomGold Club</span>
                <h2 className="text-xl font-black tracking-wide font-poppins uppercase mt-1">
                  {member.Level_Membership} MEMBER
                </h2>
              </div>
              <FaCrown className="text-2xl opacity-90" />
            </div>

            <div className="relative z-10">
              <span className="text-[9px] uppercase tracking-wider opacity-70 block">Nama Pemegang</span>
              <p className="text-lg font-bold tracking-wide mt-0.5">{member.Nama_Lengkap}</p>
            </div>

            <div className="flex justify-between items-end border-t border-black/10 pt-4 mt-2 relative z-10">
              <div>
                <span className="text-[9px] uppercase opacity-70">ID Member</span>
                <p className="text-xs font-mono font-bold">GG-{(10000 + member.ID_Membership)}</p>
              </div>
              <div>
                <span className="text-[9px] uppercase opacity-70">Tanggal Join</span>
                <p className="text-xs font-bold">{member.Tanggal_Daftar}</p>
              </div>
            </div>
          </div>
        </div>

        {/* DETAILS INFO */}
        <div className="bg-[#141414] border border-white/5 rounded-3xl p-6 flex flex-col justify-between md:col-span-1">
          <h4 className="text-xs uppercase text-[#dfb34c] tracking-wider font-bold">Detail Kontak</h4>
          <div className="space-y-4 my-4 text-xs text-[#8e8e9f]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-white"><FaEnvelope /></div>
              <div>
                <span className="text-[9px] block text-gray-500 uppercase">Email</span>
                <span className="font-bold text-white">{member.Email || "-"}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-white"><FaPhoneAlt /></div>
              <div>
                <span className="text-[9px] block text-gray-500 uppercase">No. HP</span>
                <span className="font-bold text-white">{member.No_HP || "-"}</span>
              </div>
            </div>
          </div>
          <div className="pt-3 border-t border-white/5 text-center">
            <span className="text-[9px] text-[#8e8e9f]">Status Membership:</span>
            <span className="ml-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">
              {member.Status_Member}
            </span>
          </div>
        </div>
      </div>

      {/* PROGRESS SECTION */}
      <div className="bg-[#141414] border border-white/5 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex justify-between items-center text-xs">
          <span className="text-[#8e8e9f]">Progress Loyalitas</span>
          <span className="text-[#dfb34c] font-black">{member.Total_Poin} / {maxPoints} Pts</span>
        </div>
        <div className="w-full bg-[#1a1a1a] rounded-full h-3 overflow-hidden">
          <div 
            className="bg-[#dfb34c] h-full rounded-full transition-all duration-500" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-[10px] text-[#8e8e9f] leading-relaxed">
          Kumpulkan hingga <span className="text-white font-bold">5,000 Poin</span> untuk mencapai kualifikasi level keanggotaan tertinggi dan menukarkan kupon eksklusif salon VIP.
        </p>
      </div>

      {/* STATS SUMMARY */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#141414] border border-white/5 rounded-2xl p-5 text-center">
          <span className="text-[9px] uppercase tracking-wider text-[#8e8e9f] font-bold">Total Kunjungan</span>
          <h3 className="text-2xl font-black text-white mt-1.5">{member.Total_Kunjungan}x</h3>
          <p className="text-[10px] text-[#dfb34c] mt-1">Cukur Rambut / Treatment</p>
        </div>
        <div className="bg-[#141414] border border-white/5 rounded-2xl p-5 text-center">
          <span className="text-[9px] uppercase tracking-wider text-[#8e8e9f] font-bold">Total Redeem</span>
          <h3 className="text-2xl font-black text-white mt-1.5">{member.Total_Redeem}x</h3>
          <p className="text-[10px] text-emerald-400 mt-1">Reward Kupon Sukses</p>
        </div>
        <div className="bg-[#141414] border border-white/5 rounded-2xl p-5 text-center">
          <span className="text-[9px] uppercase tracking-wider text-[#8e8e9f] font-bold">Total Pengeluaran</span>
          <h3 className="text-2xl font-black text-[#dfb34c] mt-1.5">Rp {member.Total_Pengeluaran.toLocaleString("id-ID")}</h3>
          <p className="text-[10px] text-[#8e8e9f] mt-1">Kontribusi Finansial</p>
        </div>
      </div>

      {/* REDEEMED REWARDS LOG */}
      <div className="bg-[#141414] border border-white/5 rounded-3xl p-6 space-y-4 shadow-xl">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-white/5 pb-3">
          <FaHistory className="text-[#dfb34c]" /> Riwayat Penukaran Kupon Reward
        </h3>

        {redeemedList.length === 0 ? (
          <p className="text-xs text-[#8e8e9f] text-center py-4">Belum ada riwayat penukaran kupon.</p>
        ) : (
          <div className="space-y-3">
            {redeemedList.map((item) => (
              <div 
                key={item.id}
                className="bg-[#1c1c1c] border border-white/5 rounded-2xl p-4 flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#dfb34c]/10 text-[#dfb34c] flex items-center justify-center text-sm">
                    <FaGift />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs">{item.reward_name}</h4>
                    <p className="text-[10px] text-[#8e8e9f] mt-0.5">Ditebus pada: {item.date} | -{item.points_spent} Poin</p>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase ${
                  item.status === "Claimed"
                    ? "bg-[#1f1f2e] text-[#555566] border border-white/5"
                    : "bg-[#dfb34c]/15 text-[#dfb34c] border border-[#dfb34c]/20"
                }`}>
                  {item.status === "Claimed" ? "Sudah Klaim" : "Siap Klaim"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
