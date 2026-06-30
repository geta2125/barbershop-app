import { useState, useEffect } from "react";
import { db } from "../../services/localDB";
import { useAuth } from "../../contexts/auth-context";
import { FaCrown, FaCoins, FaGift, FaCheckCircle, FaStar, FaUserAlt } from "react-icons/fa";

export default function MemberMembership() {
  const { profile } = useAuth();
  const [membership, setMembership] = useState(null);
  const [rewards, setRewards] = useState([]);
  const [redeemed, setRedeemed] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMembershipData = () => {
    if (!profile) return;
    setLoading(true);
    try {
      const allMemberships = db.getMemberships();
      // Find matching membership
      let m = allMemberships.find(x => x.Email === profile.email || x.No_HP === profile.phone);
      
      // If none exists, create a default membership for them
      if (!m) {
        m = {
          ID_Membership: allMemberships.length + 1,
          Nama_Lengkap: profile.full_name || profile.name || "Member",
          Email: profile.email || "",
          No_HP: profile.phone || "08123456789",
          Level_Membership: "Bronze",
          Status_Member: "Aktif",
          Total_Poin: 150,
          Total_Redeem: 0,
          Total_Kunjungan: 1,
          Total_Pengeluaran: 50000,
          Tanggal_Daftar: new Date().toISOString().slice(0, 10)
        };
        allMemberships.push(m);
        db.saveMemberships(allMemberships);
      }
      
      setMembership(m);
      setRewards(db.getRewards());
      
      // Filter redeemed rewards for this customer
      const rRewards = db.getRedeemedRewards().filter(r => 
        r.customer_name === m.Nama_Lengkap
      );
      setRedeemed(rRewards);
    } catch (e) {
      console.error("Error loading membership details:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembershipData();
  }, [profile]);

  const handleRedeem = (reward) => {
    if (!membership) return;
    
    if (membership.Total_Poin < reward.points) {
      alert("Poin Anda tidak mencukupi untuk menukar reward ini!");
      return;
    }

    const confirmRedeem = window.confirm(`Apakah Anda yakin ingin menukarkan ${reward.points} Poin dengan ${reward.name}?`);
    if (!confirmRedeem) return;

    try {
      // 1. Deduct points
      const allMemberships = db.getMemberships();
      const idx = allMemberships.findIndex(x => x.ID_Membership === membership.ID_Membership);
      if (idx !== -1) {
        allMemberships[idx].Total_Poin -= reward.points;
        allMemberships[idx].Total_Redeem += 1;
        db.saveMemberships(allMemberships);
      }

      // 2. Add to redeemed rewards
      const allRedeemed = db.getRedeemedRewards();
      const newRedeemed = {
        id: allRedeemed.length + 1,
        customer_name: membership.Nama_Lengkap,
        reward_name: reward.name,
        points_spent: reward.points,
        date: new Date().toISOString().slice(0, 10),
        status: "Ready to Claim"
      };
      allRedeemed.unshift(newRedeemed);
      db.saveRedeemedRewards(allRedeemed);

      alert(`Sukses menukarkan reward! Silakan tunjukkan kupon "${reward.name}" ini di kasir saat kunjungan berikutnya.`);
      fetchMembershipData();
    } catch (e) {
      console.error(e);
      alert("Gagal menukarkan reward.");
    }
  };

  const getTierGradient = (tier) => {
    switch (tier) {
      case "Gold":
        return "from-[#dfb34c] via-[#a07020] to-[#dfb34c] text-[#111116] shadow-[0_10px_30px_rgba(223,179,76,0.25)]";
      case "Silver":
        return "from-[#d1d5db] via-[#6b7280] to-[#e5e7eb] text-slate-950 shadow-[0_10px_30px_rgba(209,213,219,0.15)]";
      default: // Bronze
        return "from-[#d97706] via-[#78350f] to-[#b45309] text-white shadow-[0_10px_30px_rgba(217,119,6,0.15)]";
    }
  };

  if (loading || !membership) {
    return (
      <div className="text-center py-12 text-[#dfb34c] text-sm">
        Memuat info membership...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-2 py-4 space-y-8">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-white font-poppins">
          MY <span className="text-[#dfb34c]">MEMBERSHIP</span>
        </h1>
        <p className="text-sm text-[#8e8e9f] mt-1">
          Kelola loyalitas Anda, cek poin, dan tukarkan dengan berbagai reward eksklusif.
        </p>
      </div>

      {/* MEMBERSHIP CARD & STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* CARD CONTAINER */}
        <div className="md:col-span-2">
          <div className={`relative rounded-3xl p-6 sm:p-8 h-56 flex flex-col justify-between overflow-hidden bg-gradient-to-br ${getTierGradient(membership.Level_Membership)}`}>
            {/* DECORATIVE BACKGROUND GLOW */}
            <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-white/5 blur-xl" />
            
            <div className="flex justify-between items-start relative z-10">
              <div>
                <span className="text-[9px] uppercase tracking-[3px] font-extrabold opacity-75">GroomGold Club</span>
                <h2 className="text-2xl font-black tracking-wide font-poppins uppercase mt-1">
                  {membership.Level_Membership} MEMBER
                </h2>
              </div>
              <FaCrown className="text-3xl opacity-90" />
            </div>

            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-wider opacity-75 block">Nama Pemegang</span>
              <p className="text-lg font-bold tracking-wide mt-0.5">{membership.Nama_Lengkap}</p>
            </div>

            <div className="flex justify-between items-end border-t border-black/10 pt-4 relative z-10">
              <div>
                <span className="text-[9px] uppercase opacity-70">No. Member</span>
                <p className="text-xs font-mono font-bold">GG-{(10000 + membership.ID_Membership)}</p>
              </div>
              <div>
                <span className="text-[9px] uppercase opacity-70">Tanggal Join</span>
                <p className="text-xs font-bold">{membership.Tanggal_Daftar}</p>
              </div>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="bg-[#141414] border border-white/5 rounded-3xl p-6 flex flex-col justify-between gap-4 md:col-span-1">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#dfb34c]/10 border border-[#dfb34c]/20 flex items-center justify-center text-[#dfb34c] text-xl">
              <FaCoins />
            </div>
            <div>
              <span className="text-[10px] uppercase text-[#8e8e9f]">Total Poin</span>
              <h3 className="text-2xl font-black text-white">{membership.Total_Poin} Poin</h3>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4 mt-2">
            <div>
              <span className="text-[9px] uppercase text-[#8e8e9f]">Kunjungan</span>
              <p className="text-sm font-bold text-white mt-0.5">{membership.Total_Kunjungan}x</p>
            </div>
            <div>
              <span className="text-[9px] uppercase text-[#8e8e9f]">Redeem</span>
              <p className="text-sm font-bold text-white mt-0.5">{membership.Total_Redeem}x</p>
            </div>
            <div className="col-span-2">
              <span className="text-[9px] uppercase text-[#8e8e9f]">Total Transaksi</span>
              <p className="text-sm font-bold text-[#dfb34c] mt-0.5">
                Rp {(membership.Total_Pengeluaran || 0).toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* REWARDS SECTION */}
      <div className="space-y-4">
        <div className="border-b border-white/5 pb-4">
          <h2 className="text-xl font-bold text-white">Tukarkan Poin</h2>
          <p className="text-xs text-[#8e8e9f]">Pilih reward menarik di bawah ini sesuai jumlah poin Anda</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {rewards.map((reward) => {
            const canRedeem = membership.Total_Poin >= reward.points;
            return (
              <div 
                key={reward.id}
                className={`bg-[#141414] border rounded-2xl p-5 flex flex-col justify-between gap-4 transition-all ${
                  canRedeem ? "border-white/5 hover:border-[#dfb34c]/30" : "border-white/5 opacity-75"
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-white text-base">{reward.name}</h3>
                    <span className="flex items-center gap-1 text-[#dfb34c] font-black text-xs">
                      <FaCoins /> {reward.points} Pts
                    </span>
                  </div>
                  <p className="text-xs text-[#8e8e9f] leading-relaxed">{reward.description}</p>
                </div>

                <button
                  onClick={() => handleRedeem(reward)}
                  disabled={!canRedeem}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs tracking-wider transition-all duration-200 ${
                    canRedeem
                      ? "bg-[#dfb34c] text-[#111116] hover:opacity-90 shadow-[0_4px_15px_rgba(223,179,76,0.1)]"
                      : "bg-[#1f1f2e] text-[#555566] cursor-not-allowed border border-white/5"
                  }`}
                >
                  {canRedeem ? "TUKARKAN POIN" : "POIN TIDAK CUKUP"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* REDEEMED COUPONS HISTORY */}
      {redeemed.length > 0 && (
        <div className="space-y-4 pt-4">
          <div className="border-b border-white/5 pb-4">
            <h2 className="text-lg font-bold text-white">Kupon Aktif Saya</h2>
            <p className="text-xs text-[#8e8e9f]">Tunjukkan kupon ini ke kasir untuk melakukan klaim reward Anda</p>
          </div>

          <div className="space-y-3">
            {redeemed.map((coupon) => (
              <div 
                key={coupon.id}
                className="bg-[#141414] border border-white/5 rounded-xl p-4 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#dfb34c]/10 border border-[#dfb34c]/20 flex items-center justify-center text-[#dfb34c]">
                    <FaGift />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{coupon.reward_name}</h4>
                    <p className="text-[10px] text-[#8e8e9f] mt-0.5">Ditebus pada: {coupon.date} | -{coupon.points_spent} Poin</p>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase ${
                  coupon.status === "Claimed"
                    ? "bg-[#1f1f2e] text-[#555566] border border-white/5"
                    : "bg-[#dfb34c]/15 text-[#dfb34c] border border-[#dfb34c]/20 animate-pulse"
                }`}>
                  {coupon.status === "Claimed" ? "Sudah Diklaim" : "Siap Diklaim"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
