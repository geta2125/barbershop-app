import { useState, useEffect } from "react";
import { FaSearch, FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaCrown } from "react-icons/fa";
import { db } from "../../services/localDB";
import { mapCustomer } from "../../services/customerService";

export default function OwnerCustomers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    try {
      const data = db.getCustomers().map(mapCustomer);
      setCustomers(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const filtered = customers.filter(c => 
    c.Nama_Lengkap.toLowerCase().includes(search.toLowerCase()) ||
    c.Email.toLowerCase().includes(search.toLowerCase()) ||
    String(c.No_HP).includes(search)
  );

  return (
    <div className="max-w-5xl mx-auto px-2 py-4 space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white font-poppins">
            VIEW <span className="text-[#dfb34c]">CUSTOMERS</span>
          </h1>
          <p className="text-sm text-[#8e8e9f] mt-1">
            Lihat daftar seluruh konsumen terdaftar di database barbershop Anda.
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-xs"><FaSearch /></span>
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari pelanggan..."
            className="w-full bg-[#141414] border border-white/5 text-white rounded-xl pl-9 pr-4 py-2.5 text-xs focus:outline-none focus:border-[#dfb34c]/60"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-[#dfb34c]">Memuat data customer...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-[#141414] border border-white/5 rounded-2xl p-12 text-center text-[#8e8e9f] text-xs">
          Tidak ada data customer yang cocok.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.slice(0, 50).map((c) => (
            <div 
              key={c.ID_Customer}
              className="bg-[#141414] border border-white/5 rounded-2xl p-5 flex flex-col justify-between gap-4 transition-all hover:border-white/10"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#dfb34c]/10 border border-[#dfb34c]/20 flex items-center justify-center text-[#dfb34c] text-xl flex-shrink-0">
                  <FaUser />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">{c.Nama_Lengkap}</h3>
                    <span className="px-2 py-0.5 rounded-full text-[8px] font-extrabold bg-[#dfb34c]/15 text-[#dfb34c] border border-[#dfb34c]/20 uppercase">
                      {c.Level_Membership}
                    </span>
                  </div>
                  <p className="text-xs text-[#8e8e9f] flex items-center gap-1.5"><FaEnvelope className="text-white/30" /> {c.Email || "-"}</p>
                  <p className="text-xs text-[#8e8e9f] flex items-center gap-1.5"><FaPhone className="text-white/30" /> {c.No_HP || "-"}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/5 text-xs text-[#8e8e9f]">
                <div>
                  <span className="text-[9px] uppercase block text-gray-500">Total Transaksi</span>
                  <span className="font-bold text-white">{c.Total_Transaksi || 0}x Kunjungan</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase block text-gray-500">Total Pengeluaran</span>
                  <span className="font-bold text-[#dfb34c]">Rp {(c.Total_Pengeluaran || 0).toLocaleString("id-ID")}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
