import { useState, useEffect } from "react";
import { FaSearch, FaCut, FaClock, FaCoins } from "react-icons/fa";
import { db } from "../../services/localDB";
import { mapService } from "../../services/serviceService";

export default function OwnerServices() {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    try {
      const data = db.getServices().map(mapService);
      setServices(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const filtered = services.filter(s => 
    s.nama_service.toLowerCase().includes(search.toLowerCase()) ||
    s.kategori.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-2 py-4 space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white font-poppins">
            VIEW <span className="text-[#dfb34c]">SERVICES</span>
          </h1>
          <p className="text-sm text-[#8e8e9f] mt-1">
            Daftar menu treatment dan tarif potong rambut di barbershop Anda.
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-xs"><FaSearch /></span>
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari layanan..."
            className="w-full bg-[#141414] border border-white/5 text-white rounded-xl pl-9 pr-4 py-2.5 text-xs focus:outline-none focus:border-[#dfb34c]/60"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-[#dfb34c]">Memuat data layanan...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-[#141414] border border-white/5 rounded-2xl p-12 text-center text-[#8e8e9f] text-xs">
          Tidak ada data layanan yang cocok.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((s) => (
            <div 
              key={s.id}
              className="bg-[#141414] border border-white/5 rounded-2xl p-5 flex items-center justify-between gap-4 transition-all hover:border-white/10"
            >
              <div className="space-y-2">
                <span className="px-2 py-0.5 rounded-full text-[8px] font-extrabold bg-[#dfb34c]/10 text-[#dfb34c] border border-[#dfb34c]/20 uppercase">
                  {s.kategori}
                </span>
                <h3 className="text-base font-bold text-white">{s.nama_service}</h3>
                <div className="flex items-center gap-4 text-xs text-[#8e8e9f]">
                  <span className="flex items-center gap-1"><FaClock className="text-[#dfb34c]/60" /> {s.durasi} Min</span>
                  <span className="font-bold text-white">Rp {s.harga.toLocaleString("id-ID")}</span>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[8px] font-extrabold uppercase ${
                s.status === "Aktif" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"
              }`}>
                {s.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
