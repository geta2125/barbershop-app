import { useState, useEffect } from "react";
import { FaSearch, FaCrown, FaCheck, FaUser } from "react-icons/fa";
import { db } from "../../services/localDB";
import { mapMembership, membershipService } from "../../services/membershipService";

export default function OwnerMembership() {
  const [memberships, setMemberships] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchMemberships = () => {
    setLoading(true);
    try {
      const data = db.getMemberships().map(mapMembership);
      setMemberships(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemberships();
  }, []);

  const handleApprove = async (id) => {
    const confirmApprove = window.confirm("Setujui keanggotaan/upgrade membership ini?");
    if (!confirmApprove) return;

    try {
      await membershipService.update(id, { Status_Member: "Aktif" });
      alert("Membership berhasil disetujui!");
      fetchMemberships();
    } catch (e) {
      console.error(e);
      alert("Gagal menyetujui membership.");
    }
  };

  const filtered = memberships.filter(m => 
    m.Nama_Lengkap.toLowerCase().includes(search.toLowerCase()) ||
    m.Email.toLowerCase().includes(search.toLowerCase()) ||
    m.Level_Membership.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-2 py-4 space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white font-poppins">
            MANAGE <span className="text-[#dfb34c]">MEMBERSHIP</span>
          </h1>
          <p className="text-sm text-[#8e8e9f] mt-1">
            Lihat daftar loyalitas member dan setujui status keanggotaan baru.
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-xs"><FaSearch /></span>
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari member..."
            className="w-full bg-[#141414] border border-white/5 text-white rounded-xl pl-9 pr-4 py-2.5 text-xs focus:outline-none focus:border-[#dfb34c]/60"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-[#dfb34c]">Memuat data membership...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-[#141414] border border-white/5 rounded-2xl p-12 text-center text-[#8e8e9f] text-xs">
          Tidak ada data membership yang cocok.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((m) => (
            <div 
              key={m.ID_Membership}
              className="bg-[#141414] border border-white/5 rounded-2xl p-5 flex flex-col justify-between gap-4 transition-all hover:border-white/10"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#dfb34c]/10 border border-[#dfb34c]/20 flex items-center justify-center text-[#dfb34c] text-lg">
                    <FaCrown />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{m.Nama_Lengkap}</h3>
                    <p className="text-[10px] text-[#8e8e9f] mt-0.5">{m.Email || "-"}</p>
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase ${
                  m.Status_Member === "Aktif" 
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                    : "bg-amber-500/15 text-amber-400 border border-amber-500/20 animate-pulse"
                }`}>
                  {m.Status_Member === "Aktif" ? "Aktif" : "Pending"}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/5 text-[11px] text-[#8e8e9f]">
                <div>
                  <span className="text-[8px] uppercase block text-gray-500">Tier</span>
                  <span className="font-bold text-white">{m.Level_Membership}</span>
                </div>
                <div>
                  <span className="text-[8px] uppercase block text-gray-500">Total Poin</span>
                  <span className="font-bold text-[#dfb34c]">{m.Total_Poin} Pts</span>
                </div>
                <div>
                  <span className="text-[8px] uppercase block text-gray-500">Kunjungan</span>
                  <span className="font-bold text-white">{m.Total_Kunjungan}x</span>
                </div>
              </div>

              {m.Status_Member !== "Aktif" && (
                <button
                  onClick={() => handleApprove(m.ID_Membership)}
                  className="w-full mt-2 bg-emerald-500 text-[#111116] font-bold text-xs py-2 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-1.5"
                >
                  <FaCheck /> Setujui Membership
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
