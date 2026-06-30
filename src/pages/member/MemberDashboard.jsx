import { useMemberData } from "../../hooks/useMemberData";
import { Link } from "react-router-dom";
import { FaCrown, FaCoins, FaCut, FaChevronRight, FaClock, FaCalendarCheck, FaGift, FaArrowRight } from "react-icons/fa";

export default function MemberDashboard() {
  const { loading, member, myHistory } = useMemberData();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-[#dfb34c] text-sm">
        Membuka Kartu Membership Anda...
      </div>
    );
  }

  const getTierColor = (tier) => {
    switch (tier) {
      case "Gold": return "from-[#dfb34c] to-[#a07020] text-black shadow-[0_10px_30px_rgba(223,179,76,0.15)]";
      case "Silver": return "from-[#d1d5db] to-[#6b7280] text-slate-950 shadow-[0_10px_30px_rgba(209,213,219,0.08)]";
      default: return "from-[#d97706] to-[#78350f] text-white shadow-[0_10px_30px_rgba(217,119,6,0.08)]";
    }
  };

  const completedCount = myHistory.filter((h) => h.status_booking === "Completed").length;
  const upcomingCount = myHistory.filter((h) => h.status_booking !== "Completed" && h.status_booking !== "Canceled").length;

  return (
    <div className="space-y-6">

      {/* PAGE HEADING */}
      <div>
        <h1 className="text-2xl font-black text-white tracking-wide">
          Halo, {member?.name?.split(" ")[0] || "Pelanggan"} 👋
        </h1>
        <p className="text-[#8e8e9f] text-sm mt-1">Berikut ringkasan akun membership kamu hari ini.</p>
      </div>

      {/* TOP GRID: MEMBERSHIP CARD + QUICK STATS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* VIRTUAL MEMBERSHIP CARD */}
        <div className={`lg:col-span-2 relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden h-56 bg-gradient-to-br ${getTierColor(member?.tier)}`}>
          <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-white/5 blur-xl" />
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/10 to-transparent" />

          <div className="flex justify-between items-start relative z-10">
            <div>
              <span className="text-[9px] uppercase tracking-[3px] font-black opacity-75">GroomGold Club</span>
              <h2 className="text-xl font-black tracking-wide font-poppins uppercase mt-1">
                {member?.tier || "BRONZE"} MEMBER
              </h2>
            </div>
            <FaCrown className="text-2xl opacity-90" />
          </div>

          <div className="relative z-10">
            <p className="text-lg font-bold tracking-wide">{member?.name || "Pelanggan Setia"}</p>
            <p className="text-xs opacity-75 mt-0.5">{member?.phone || "-"}</p>
          </div>

          <div className="flex justify-between items-end border-t border-black/10 pt-4 mt-2 relative z-10">
            <div>
              <span className="text-[9px] uppercase opacity-70">Loyalty Points</span>
              <div className="flex items-center gap-1 text-lg font-black mt-0.5">
                <FaCoins /> {member?.points || 0} <span className="text-xs font-medium opacity-80">Pts</span>
              </div>
            </div>

            <Link
              to="/member/membership"
              className="bg-white/10 hover:bg-white/20 text-xs font-bold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5"
            >
              <FaGift /> Tukar Reward
            </Link>
          </div>
        </div>

        {/* QUICK STATS STACK */}
        <div className="flex flex-col gap-6">
          <div className="flex-1 bg-[#141414] border border-white/5 rounded-3xl p-5 flex items-center gap-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-lg shrink-0">
              <FaCalendarCheck />
            </div>
            <div>
              <p className="text-2xl font-black text-white leading-none">{completedCount}</p>
              <p className="text-[11px] text-[#8e8e9f] mt-1">Treatment Selesai</p>
            </div>
          </div>

          <div className="flex-1 bg-[#141414] border border-white/5 rounded-3xl p-5 flex items-center gap-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400 text-lg shrink-0">
              <FaClock />
            </div>
            <div>
              <p className="text-2xl font-black text-white leading-none">{upcomingCount}</p>
              <p className="text-[11px] text-[#8e8e9f] mt-1">Booking Mendatang</p>
            </div>
          </div>
        </div>

      </div>

      {/* QUICK ACTION: BOOK A SLOT */}
      <Link
        to="/member/booking"
        className="w-full bg-[#dfb34c] text-[#111116] font-black text-sm py-4 rounded-2xl transition-all hover:opacity-95 text-center flex items-center justify-center gap-2 shadow-[0_6px_25px_rgba(223,179,76,0.18)]"
      >
        <FaCut /> AMBIL SLOT & BOOKING SEKARANG
      </Link>

      {/* RECENT TREATMENTS */}
      <div className="bg-[#141414] border border-white/5 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            📜 Riwayat Kunjungan Anda
          </h3>
          {myHistory.length > 0 && (
            <Link
              to="/member/history"
              className="text-[11px] font-semibold text-[#dfb34c] hover:underline flex items-center gap-1"
            >
              Lihat Semua <FaArrowRight size={10} />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {myHistory.length === 0 ? (
            <p className="text-xs text-[#8e8e9f] py-4 text-center md:col-span-2">Anda belum memiliki riwayat treatment.</p>
          ) : (
            myHistory.slice(0, 6).map((h) => (
              <div
                key={h.id_booking || h.id}
                className="bg-[#1c1c1c] border border-white/5 rounded-xl p-4 flex justify-between items-center transition-all hover:border-white/10"
              >
                <div>
                  <h4 className="text-xs font-bold text-white">{h.layanan}</h4>
                  <p className="text-[10px] text-[#8e8e9f] mt-1">Groomer: {h.barber}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-[10px] text-[#dfb34c] font-mono">{h.jadwal ? h.jadwal.replace("T", " ") : "-"}</p>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase ${
                    h.status_booking === "Completed"
                      ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                      : h.status_booking === "Canceled"
                      ? "text-red-400 bg-red-500/10 border-red-500/20"
                      : "text-amber-400 bg-amber-500/10 border-amber-500/20 animate-pulse"
                  }`}>
                    {h.status_booking}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}