import { useState, useEffect } from "react";
import { FaSearch, FaPlus, FaCrown, FaGift, FaEye, FaCalendarAlt, FaTimes, FaCoins, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { db } from "../../services/localDB";
import { membershipService, mapMembership } from "../../services/membershipService";
import Container from "../../components/Container";
import PageHeader from "../../components/PageHeader";
import EmptyState from "../../components/EmptyState";
import Table from "../../components/Table";

export default function Membership() {
  const [search, setSearch] = useState("");
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [level, setLevel] = useState("Bronze");
  const [points, setPoints] = useState(100);
  const [saving, setSaving] = useState(false);

  const fetchMemberships = () => {
    setLoading(true);
    membershipService.getAll()
      .then((res) => {
        setMemberships(res.data ? res.data.map(mapMembership) : []);
      })
      .catch((err) => setError(err.message || "Gagal memuat membership."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMemberships();
  }, []);

  const handleCreateMembership = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const list = db.getMemberships();
      const newId = list.length > 0 ? Math.max(...list.map(m => m.ID_Membership || m.id || 0)) + 1 : 1;
      
      const newRow = {
        ID_Membership: newId,
        id: newId,
        Nama_Lengkap: name,
        Email: email,
        No_HP: phone,
        Level_Membership: level,
        Status_Member: "Aktif",
        Total_Poin: Number(points),
        Total_Redeem: 0,
        Total_Kunjungan: 1,
        Total_Pengeluaran: level === "Gold" ? 1000000 : level === "Silver" ? 500000 : 100000,
        Tanggal_Daftar: new Date().toISOString().split("T")[0]
      };

      list.unshift(newRow);
      db.saveMemberships(list);
      
      // Also check if customer exists, otherwise create customer record
      const customers = db.getCustomers();
      if (!customers.some(c => c.Email === email || c.No_HP === phone)) {
        const newCustId = customers.length > 0 ? Math.max(...customers.map(c => c.ID_Customer || 0)) + 1 : 1;
        customers.unshift({
          ID_Customer: newCustId,
          Nama_Lengkap: name,
          Email: email,
          No_HP: phone,
          Jenis_Kelamin: "Laki-laki",
          Tanggal_Daftar: new Date().toISOString().split("T")[0] + " 00:00:00",
          Status_Member: "Member",
          Level_Membership: level,
          Status_Aktif: "Aktif",
          Total_Transaksi: 1,
          Total_Pengeluaran: newRow.Total_Pengeluaran
        });
        db.saveCustomers(customers);
      }

      setName("");
      setEmail("");
      setPhone("");
      setLevel("Bronze");
      setPoints(100);
      setShowModal(false);
      fetchMemberships();
      alert("Membership baru berhasil ditambahkan!");
    } catch (err) {
      console.error(err);
      alert("Gagal menambahkan membership.");
    } finally {
      setSaving(false);
    }
  };

  const filtered = memberships.filter(member =>
    (member.Nama_Lengkap && member.Nama_Lengkap.toLowerCase().includes(search.toLowerCase())) ||
    (member.Email && member.Email.toLowerCase().includes(search.toLowerCase())) ||
    (member.Level_Membership && member.Level_Membership.toLowerCase().includes(search.toLowerCase()))
  );

  const stats = [
    {
      label: "Total Member",
      value: memberships.length,
      accent: "text-white",
      color: "from-white/10 to-white/5 border-white/10"
    },
    {
      label: "Bronze Member",
      value: memberships.filter(m => m.Level_Membership === "Bronze").length,
      accent: "text-amber-600",
      color: "from-amber-500/10 to-amber-700/5 border-amber-500/20"
    },
    {
      label: "Silver Member",
      value: memberships.filter(m => m.Level_Membership === "Silver").length,
      accent: "text-gray-300",
      color: "from-gray-400/10 to-gray-500/5 border-gray-400/20"
    },
    {
      label: "Gold Member",
      value: memberships.filter(m => m.Level_Membership === "Gold").length,
      accent: "text-[#dfb34c]",
      color: "from-[#dfb34c]/10 to-[#dfb34c]/5 border-[#dfb34c]/20"
    }
  ];

  const getBadgeStyle = (tier) => {
    switch (tier) {
      case "Gold": return "bg-[#dfb34c]/10 text-[#dfb34c] border-[#dfb34c]/20";
      case "Silver": return "bg-gray-300/10 text-gray-300 border-gray-300/20";
      case "Bronze": return "bg-amber-600/10 text-amber-500 border-amber-600/20";
      default: return "bg-sky-500/10 text-sky-400 border-sky-500/20";
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] text-[#E5E5E5] space-y-6">
      <Container>
        <PageHeader title="Membership" breadcrumb={["Dashboard", "Membership"]}>
          <div className="flex items-center gap-2 bg-[#141414] border border-white/5 px-4 py-2 rounded-xl text-xs text-white/40">
            <FaCrown className="text-[#dfb34c]" />
            <span className="text-[#dfb34c] font-bold">Membership Program</span>
          </div>
        </PageHeader>

        {error && <div className="mb-4 text-xs font-bold text-red-400 bg-red-500/10 p-3 rounded-xl">⚠️ {error}</div>}
        {loading && <div className="mb-4 text-xs text-[#dfb34c] animate-pulse">Memuat data membership...</div>}

        {/* STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div
              key={s.label}
              className={`bg-gradient-to-br ${s.color} border rounded-2xl p-5 relative overflow-hidden transition-all duration-300 hover:scale-[1.02] shadow-md`}
            >
              <p className="text-[10px] uppercase tracking-widest text-[#8e8e9f] font-bold">
                {s.label}
              </p>
              <h3 className={`text-3xl font-black mt-2 ${s.accent}`}>
                {s.value}
              </h3>
            </div>
          ))}
        </div>

        {/* ACTION */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 bg-[#141414] border border-white/5 p-4 rounded-2xl shadow-md">
          <button
            onClick={() => setShowModal(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#dfb34c] hover:bg-[#BE9359] text-[#111116] font-black text-xs tracking-wider px-5 py-3.5 rounded-xl transition-all shadow-[0_4px_15px_rgba(223,179,76,0.15)]"
          >
            <FaPlus /> Tambah Membership
          </button>

          <div className="relative w-full sm:w-72">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-xs" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari member..."
              className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#dfb34c]/60"
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-[#141414] border border-white/5 rounded-3xl overflow-hidden shadow-xl">
          <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02]">
            <h3 className="text-xs uppercase tracking-widest text-[#dfb34c] font-black flex items-center gap-2">
              <FaCrown /> Membership List
            </h3>
          </div>

          <Table headers={["Member", "Level", "Points", "Redeem", "Join Date", "Status", "Aksi"]}>
            {filtered.map((member) => (
              <tr key={member.ID_Membership} className="border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-white">{member.Nama_Lengkap}</div>
                  <div className="text-[10px] text-[#8e8e9f] mt-0.5">{member.Email || member.No_HP}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase border ${getBadgeStyle(member.Level_Membership)}`}>
                    {member.Level_Membership}
                  </span>
                </td>
                <td className="px-6 py-4 font-mono font-bold text-white">
                  {(member.Total_Poin || 0).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-xs text-[#dfb34c]">
                    <FaGift />
                    <span className="font-bold">{member.Total_Redeem}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-[#8e8e9f]">
                    <FaCalendarAlt />
                    <span>{member.Tanggal_Daftar}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold border uppercase ${
                    member.Status_Member === "Aktif"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-red-500/10 text-red-400 border-red-500/20"
                  }`}>
                    {member.Status_Member}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Link
                    to={`/admin/membership/${member.ID_Membership}`}
                    className="p-2 bg-white/5 hover:bg-[#dfb34c]/10 text-white hover:text-[#dfb34c] border border-white/5 hover:border-[#dfb34c]/20 rounded-lg inline-flex transition-all"
                  >
                    <FaEye />
                  </Link>
                </td>
              </tr>
            ))}
          </Table>

          {filtered.length === 0 && <EmptyState title="Membership tidak ditemukan" />}
        </div>
      </Container>

      {/* CREATE MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#111116] border border-[#242335] rounded-3xl p-6 max-w-md w-full space-y-6 animate-in fade-in duration-200">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <h3 className="text-lg font-bold text-white font-poppins flex items-center gap-2">
                <FaUserPlus className="text-[#dfb34c]" /> Tambah Member Baru
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-[#8e8e9f] hover:text-white transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleCreateMembership} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase text-[#dfb34c] font-bold block">Nama Lengkap</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama Lengkap Customer"
                  className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#dfb34c]/60"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase text-[#dfb34c] font-bold block">Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#dfb34c]/60"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase text-[#dfb34c] font-bold block">No. HP / WhatsApp</label>
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="081234567..."
                  className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#dfb34c]/60"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase text-[#dfb34c] font-bold block">Level Membership</label>
                  <select 
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#dfb34c]/60"
                  >
                    <option value="Bronze">Bronze</option>
                    <option value="Silver">Silver</option>
                    <option value="Gold">Gold</option>
                    <option value="Platinum">Platinum</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase text-[#dfb34c] font-bold block">Poin Awal</label>
                  <input 
                    type="number" 
                    value={points}
                    onChange={(e) => setPoints(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#dfb34c]/60"
                    required
                    min="0"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-[#dfb34c] text-[#111116] font-black text-xs tracking-wider py-4 rounded-xl hover:opacity-90 transition-all disabled:opacity-50"
              >
                {saving ? "MENYIMPAN..." : "SIMPAN MEMBERSHIP"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
