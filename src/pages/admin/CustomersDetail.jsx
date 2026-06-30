import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaEnvelope, FaPhoneAlt, FaCalendarCheck, FaCrown, FaWallet, FaUser, FaSave, FaEdit, FaHistory } from "react-icons/fa";
import { customerService, mapCustomer } from "../../services/customerService";
import { db } from "../../services/localDB";
import Container from "../../components/Container";

export default function CustomersDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookingHistory, setBookingHistory] = useState([]);

  // Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("Laki-laki");
  const [level, setLevel] = useState("Bronze");
  const [saving, setSaving] = useState(false);

  const fetchCustomer = () => {
    setLoading(true);
    customerService.getById(id)
      .then((res) => {
        if (res.data) {
          const mapped = mapCustomer(res.data);
          setCustomer(mapped);
          setName(mapped.Nama_Lengkap);
          setEmail(mapped.Email);
          setPhone(mapped.No_HP);
          setGender(mapped.Jenis_Kelamin);
          setLevel(mapped.Level_Membership);

          // Get booking history for this customer from local storage
          const bookings = db.getBookings().filter(b => 
            b.email === mapped.Email || 
            b.no_hp === mapped.No_HP || 
            b.nama_customer.toLowerCase() === mapped.Nama_Lengkap.toLowerCase()
          );
          setBookingHistory(bookings);
        } else {
          setError("Customer tidak ditemukan.");
        }
      })
      .catch((err) => setError(err.message || "Gagal memuat detail customer."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCustomer();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await customerService.update(id, {
        Nama_Lengkap: name,
        Email: email,
        No_HP: phone,
        Jenis_Kelamin: gender,
        Level_Membership: level
      });
      
      // Sync membership table too if exists
      const memberships = db.getMemberships();
      const mIdx = memberships.findIndex(m => m.Email === customer.Email || m.No_HP === customer.No_HP);
      if (mIdx !== -1) {
        memberships[mIdx].Nama_Lengkap = name;
        memberships[mIdx].Email = email;
        memberships[mIdx].No_HP = phone;
        memberships[mIdx].Level_Membership = level;
        db.saveMemberships(memberships);
      }

      alert("Profil customer berhasil diperbarui!");
      setIsEditing(false);
      fetchCustomer();
    } catch (err) {
      console.error(err);
      alert("Gagal memperbarui profil.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12 text-[#dfb34c]">Memuat detail customer...</div>;
  }

  if (error || !customer) {
    return (
      <div className="max-w-md mx-auto text-center py-12 space-y-4">
        <p className="text-[#8e8e9f]">{error || "Customer tidak ditemukan."}</p>
        <Link to="/admin/customers" className="text-[#dfb34c] hover:underline font-bold text-xs">
          Kembali ke Daftar
        </Link>
      </div>
    );
  }

  const getTierGradient = (tier) => {
    switch (tier) {
      case "Gold": return "from-[#dfb34c] via-[#a07020] to-[#dfb34c] text-black shadow-[0_10px_35px_rgba(223,179,76,0.15)]";
      case "Silver": return "from-[#d1d5db] via-[#6b7280] to-[#e5e7eb] text-slate-950 shadow-[0_10px_35px_rgba(209,213,219,0.08)]";
      default: return "from-[#d97706] via-[#78350f] to-[#b45309] text-white shadow-[0_10px_35px_rgba(217,119,6,0.08)]";
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-2 py-4 space-y-6">
      {/* BACK BUTTON */}
      <div className="border-b border-white/5 pb-4">
        <Link
          to="/admin/customers"
          className="inline-flex items-center gap-1.5 text-xs text-[#dfb34c] hover:underline font-bold"
        >
          <FaChevronLeft /> Kembali ke Daftar Customer
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* PROFILE CARD */}
        <div className="md:col-span-2 space-y-6">
          <div className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden bg-gradient-to-br ${getTierGradient(customer.Level_Membership)}`}>
            {/* GLOW DECORATOR */}
            <div className="absolute -top-10 -right-10 w-36 h-36 bg-white/5 rounded-full blur-xl" />
            
            <div className="flex justify-between items-start relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl font-black">
                  {customer.Nama_Lengkap ? customer.Nama_Lengkap.charAt(0).toUpperCase() : "C"}
                </div>
                <div>
                  <h2 className="text-xl font-black leading-tight tracking-wide">{customer.Nama_Lengkap}</h2>
                  <p className="text-[10px] uppercase tracking-widest opacity-80 mt-1">{customer.Jenis_Kelamin} | Joined</p>
                </div>
              </div>
              <FaCrown className="text-3xl opacity-80" />
            </div>

            <div className="flex justify-between items-end border-t border-black/10 pt-4 mt-6 relative z-10">
              <div>
                <span className="text-[9px] uppercase opacity-70">Membership Tier</span>
                <p className="text-xs font-black uppercase">{customer.Level_Membership} Member</p>
              </div>
              <div>
                <span className="text-[9px] uppercase opacity-70">Register Date</span>
                <p className="text-xs font-bold">{customer.Tanggal_Daftar ? customer.Tanggal_Daftar.split(" ")[0] : "-"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* DETAILS/EDIT PANEL */}
        <div className="bg-[#141414] border border-white/5 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          {!isEditing ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h4 className="text-xs uppercase text-[#dfb34c] tracking-wider font-bold">Informasi Kontak</h4>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-xs text-[#dfb34c] hover:underline flex items-center gap-1 font-bold"
                >
                  <FaEdit /> Edit
                </button>
              </div>

              <div className="space-y-4 text-xs text-[#8e8e9f]">
                <div>
                  <span className="text-[9px] block text-gray-500 uppercase">Email</span>
                  <span className="font-bold text-white flex items-center gap-2 mt-1"><FaEnvelope className="text-white/20" /> {customer.Email || "-"}</span>
                </div>
                <div>
                  <span className="text-[9px] block text-gray-500 uppercase">No. HP / WA</span>
                  <span className="font-bold text-white flex items-center gap-2 mt-1"><FaPhoneAlt className="text-white/20" /> {customer.No_HP || "-"}</span>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-[10px] uppercase text-[#dfb34c] font-black">Edit Profil</span>
                <button type="button" onClick={() => setIsEditing(false)} className="text-[10px] text-red-400">Batal</button>
              </div>

              <div className="space-y-1">
                <label className="text-[8px] uppercase text-[#dfb34c] font-bold">Nama Lengkap</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-lg px-3 py-2 text-xs focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[8px] uppercase text-[#dfb34c] font-bold">Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-lg px-3 py-2 text-xs focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[8px] uppercase text-[#dfb34c] font-bold">No. HP</label>
                <input 
                  type="text" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-lg px-3 py-2 text-xs focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[8px] uppercase text-[#dfb34c] font-bold">Gender</label>
                  <select 
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-lg p-2 text-xs focus:outline-none"
                  >
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] uppercase text-[#dfb34c] font-bold">Level</label>
                  <select 
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-lg p-2 text-xs focus:outline-none"
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
                className="w-full bg-[#dfb34c] text-black font-black text-xs py-2 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-1.5"
              >
                <FaSave /> {saving ? "Menyimpan..." : "Simpan"}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-[#141414] border border-white/5 rounded-2xl p-5 flex items-center justify-between shadow-md">
          <div className="space-y-1">
            <span className="text-[9px] uppercase tracking-wider text-[#8e8e9f] font-bold">Total Kunjungan</span>
            <h3 className="text-2xl font-black text-white">{customer.Total_Transaksi || 0}x</h3>
          </div>
          <div className="w-11 h-11 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-lg">
            <FaCalendarCheck />
          </div>
        </div>

        <div className="bg-[#141414] border border-white/5 rounded-2xl p-5 flex items-center justify-between shadow-md">
          <div className="space-y-1">
            <span className="text-[9px] uppercase tracking-wider text-[#8e8e9f] font-bold">Total Pengeluaran</span>
            <h3 className="text-2xl font-black text-[#dfb34c]">Rp {(customer.Total_Pengeluaran || 0).toLocaleString("id-ID")}</h3>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-lg">
            <FaWallet />
          </div>
        </div>
      </div>

      {/* BOOKING HISTORY */}
      <div className="bg-[#141414] border border-white/5 rounded-3xl p-6 space-y-4 shadow-xl">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-white/5 pb-3">
          <FaHistory className="text-[#dfb34c]" /> Riwayat Kunjungan & Treatment
        </h3>

        {bookingHistory.length === 0 ? (
          <p className="text-xs text-[#8e8e9f] text-center py-4">Belum ada riwayat booking untuk pelanggan ini.</p>
        ) : (
          <div className="space-y-3">
            {bookingHistory.map((item) => (
              <div 
                key={item.id}
                className="bg-[#1c1c1c] border border-white/5 rounded-2xl p-4 flex justify-between items-center"
              >
                <div>
                  <h4 className="font-bold text-white text-xs">{item.layanan}</h4>
                  <p className="text-[10px] text-[#8e8e9f] mt-0.5">Barber: {item.barber} | Jadwal: {item.jadwal ? item.jadwal.replace("T", " ") : "-"}</p>
                </div>
                <div className="text-right space-y-1">
                  <span className={`px-2.5 py-0.5 rounded-full text-[8px] font-extrabold uppercase border ${
                    item.status_booking === "Completed"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : item.status_booking === "Canceled"
                      ? "bg-red-500/10 text-red-400 border-red-500/20"
                      : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                  }`}>
                    {item.status_booking}
                  </span>
                  <p className="text-[10px] font-mono font-bold text-white">Rp {item.harga ? item.harga.toLocaleString("id-ID") : "0"}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}