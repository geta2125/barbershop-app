import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaPlus, FaCalendarAlt, FaUser, FaEye, FaTimes, FaCut, FaEdit, FaEnvelope, FaPhone } from "react-icons/fa";
import { customerService, mapCustomer } from "../../services/customerService";
import { db } from "../../services/localDB";
import Container from "../../components/Container";
import PageHeader from "../../components/PageHeader";
import EmptyState from "../../components/EmptyState";
import Table from "../../components/Table";

export default function Customers() {
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("Laki-laki");
  const [tier, setTier] = useState("Bronze");
  const [saving, setSaving] = useState(false);

  const fetchCustomers = () => {
    setLoading(true);
    customerService.getAll()
      .then((res) => {
        setCustomers(res.data ? res.data.map(mapCustomer) : []);
      })
      .catch((err) => setError(err.message || "Gagal memuat customer."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleCreateCustomer = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const list = db.getCustomers();
      const newId = list.length > 0 ? Math.max(...list.map(c => c.ID_Customer || 0)) + 1 : 1;
      
      const newRow = {
        ID_Customer: newId,
        id: newId,
        Nama_Lengkap: name,
        Email: email,
        No_HP: phone,
        Jenis_Kelamin: gender,
        Tanggal_Daftar: new Date().toISOString().split("T")[0] + " 00:00:00",
        Status_Member: "Member",
        Level_Membership: tier,
        Status_Aktif: "Aktif",
        Total_Transaksi: 0,
        Total_Pengeluaran: 0
      };

      list.unshift(newRow);
      db.saveCustomers(list);
      
      // Also add to memberships list
      const memberships = db.getMemberships();
      if (!memberships.some(m => m.Email === email || m.No_HP === phone)) {
        const newMId = memberships.length > 0 ? Math.max(...memberships.map(m => m.ID_Membership || 0)) + 1 : 1;
        memberships.unshift({
          ID_Membership: newMId,
          id: newMId,
          Nama_Lengkap: name,
          Email: email,
          No_HP: phone,
          Level_Membership: tier,
          Status_Member: "Aktif",
          Total_Poin: 100,
          Total_Redeem: 0,
          Total_Kunjungan: 0,
          Total_Pengeluaran: 0,
          Tanggal_Daftar: new Date().toISOString().split("T")[0]
        });
        db.saveMemberships(memberships);
      }

      setName("");
      setEmail("");
      setPhone("");
      setGender("Laki-laki");
      setTier("Bronze");
      setShowModal(false);
      fetchCustomers();
      alert("Customer baru berhasil ditambahkan!");
    } catch (err) {
      console.error(err);
      alert("Gagal menambahkan customer.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus customer ini?");
    if (!confirmDelete) return;

    try {
      await customerService.delete(id);
      fetchCustomers();
      alert("Customer berhasil dihapus.");
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus customer.");
    }
  };

  const filtered = customers.filter(c => 
    (c.Nama_Lengkap && c.Nama_Lengkap.toLowerCase().includes(search.toLowerCase())) ||
    (c.Email && c.Email.toLowerCase().includes(search.toLowerCase())) ||
    (c.No_HP && String(c.No_HP).includes(search))
  );

  const getTierColor = (level) => {
    switch (level) {
      case "Gold": return "bg-[#dfb34c]/10 text-[#dfb34c] border-[#dfb34c]/20";
      case "Silver": return "bg-gray-300/10 text-gray-300 border-gray-300/20";
      case "Bronze": return "bg-amber-600/10 text-amber-500 border-amber-600/20";
      default: return "bg-sky-500/10 text-sky-400 border-sky-500/20";
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] text-[#E5E5E5] space-y-6">
      <Container>
        <PageHeader title="Customers" breadcrumb={["Dashboard", "Customers"]}>
          <div className="flex items-center gap-2 bg-[#141414] border border-white/5 px-4 py-2 rounded-xl text-xs text-white/40">
            <FaUser className="text-[#dfb34c]" />
            <span className="text-[#dfb34c] font-bold">Client Directory</span>
          </div>
        </PageHeader>

        {error && <div className="mb-4 text-xs font-bold text-red-400 bg-red-500/10 p-3 rounded-xl">⚠️ {error}</div>}
        {loading && <div className="mb-4 text-xs text-[#dfb34c] animate-pulse">Memuat data customer...</div>}

        {/* CONTROLS */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#141414] border border-white/5 p-4 rounded-2xl shadow-md">
          <button
            onClick={() => setShowModal(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#dfb34c] hover:bg-[#BE9359] text-[#111116] font-black text-xs tracking-wider px-5 py-3.5 rounded-xl transition-all shadow-[0_4px_15px_rgba(223,179,76,0.15)]"
          >
            <FaPlus /> Tambah Customer
          </button>

          <div className="relative w-full sm:w-72">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-xs" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari customer..."
              className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#dfb34c]/60"
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-[#141414] border border-white/5 rounded-3xl overflow-hidden shadow-xl">
          <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02]">
            <h3 className="text-xs uppercase tracking-widest text-[#dfb34c] font-black flex items-center gap-2">
              <FaUser /> Customer List
            </h3>
          </div>

          <Table headers={["Nama Pelanggan", "Kontak", "Membership", "Total Transaksi", "Pengeluaran", "Aksi"]}>
            {filtered.map((c) => (
              <tr key={c.ID_Customer} className="border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-white flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#dfb34c]/10 text-[#dfb34c] flex items-center justify-center text-xs border border-[#dfb34c]/15">
                      {c.Nama_Lengkap ? c.Nama_Lengkap.charAt(0).toUpperCase() : "C"}
                    </div>
                    <div>
                      <p className="font-bold text-white">{c.Nama_Lengkap}</p>
                      <p className="text-[9px] text-gray-500 uppercase tracking-wider">{c.Jenis_Kelamin}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs text-[#8e8e9f] space-y-0.5">
                    <p className="flex items-center gap-1.5"><FaEnvelope className="text-white/20" /> {c.Email || "-"}</p>
                    <p className="flex items-center gap-1.5"><FaPhone className="text-white/20" /> {c.No_HP || "-"}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase border ${getTierColor(c.Level_Membership)}`}>
                    {c.Level_Membership}
                  </span>
                </td>
                <td className="px-6 py-4 font-mono font-bold text-white">
                  {c.Total_Transaksi || 0}x Kunjungan
                </td>
                <td className="px-6 py-4 font-mono font-bold text-[#dfb34c]">
                  Rp {(c.Total_Pengeluaran || 0).toLocaleString("id-ID")}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/admin/customers/${c.ID_Customer}`}
                      className="p-2 bg-white/5 hover:bg-[#dfb34c]/10 text-white hover:text-[#dfb34c] border border-white/5 hover:border-[#dfb34c]/20 rounded-lg inline-flex transition-all"
                    >
                      <FaEye />
                    </Link>
                    <button
                      onClick={() => handleDelete(c.ID_Customer)}
                      className="p-2 bg-red-500/5 hover:bg-red-500/10 text-red-400 border border-red-500/10 hover:border-red-500/20 rounded-lg inline-flex transition-all"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </Table>

          {filtered.length === 0 && <EmptyState title="Customer tidak ditemukan" />}
        </div>
      </Container>

      {/* CREATE MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#111116] border border-[#242335] rounded-3xl p-6 max-w-md w-full space-y-6 animate-in fade-in duration-200">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <h3 className="text-lg font-bold text-white font-poppins flex items-center gap-2">
                <FaPlus className="text-[#dfb34c]" /> Tambah Customer Baru
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-[#8e8e9f] hover:text-white transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleCreateCustomer} className="space-y-4">
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
                  <label className="text-[10px] uppercase text-[#dfb34c] font-bold block">Jenis Kelamin</label>
                  <select 
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none"
                  >
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase text-[#dfb34c] font-bold block">Level Membership</label>
                  <select 
                    value={tier}
                    onChange={(e) => setTier(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none"
                  >
                    <option value="Bronze">Bronze</option>
                    <option value="Silver">Silver</option>
                    <option value="Gold">Gold</option>
                    <option value="Platinum">Platinum</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-[#dfb34c] text-[#111116] font-black text-xs tracking-wider py-4 rounded-xl hover:opacity-90 transition-all disabled:opacity-50"
              >
                {saving ? "MENYIMPAN..." : "SIMPAN CUSTOMER"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}