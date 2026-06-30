import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaChevronLeft, FaStar, FaTag, FaClock, FaCoins, FaCheckCircle, FaTimesCircle, FaCut, FaEdit, FaTimes, FaSave } from "react-icons/fa";
import { serviceService, mapService } from "../../services/serviceService";
import Container from "../../components/Container";

export default function ServicesDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Edit Form State
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Haircut");
  const [duration, setDuration] = useState(30);
  const [price, setPrice] = useState(50000);
  const [status, setStatus] = useState("Aktif");
  const [saving, setSaving] = useState(false);

  const fetchService = () => {
    setLoading(true);
    serviceService.getById(id)
      .then((res) => {
        if (res.data) {
          const mapped = mapService(res.data);
          setService(mapped);
          setName(mapped.nama_service);
          setCategory(mapped.kategori);
          setDuration(mapped.durasi);
          setPrice(mapped.harga);
          setStatus(mapped.status);
        } else {
          setError("Layanan tidak ditemukan.");
        }
      })
      .catch((err) => setError(err.message || "Gagal memuat detail layanan."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchService();
  }, [id]);

  const handleUpdateService = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await serviceService.update(id, {
        nama_service: name,
        kategori: category,
        durasi: Number(duration),
        harga: Number(price),
        status: status
      });
      alert("Layanan berhasil diperbarui!");
      setIsEditing(false);
      fetchService();
    } catch (err) {
      console.error(err);
      alert("Gagal memperbarui layanan.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="w-full h-screen flex items-center justify-center bg-[#0A0A0A] text-[#dfb34c]">Memuat detail layanan...</div>;
  }

  if (error || !service) {
    return (
      <div className="w-full h-screen flex items-center justify-center px-5 bg-[#0A0A0A]">
        <div className="w-full max-w-md bg-[#141414] border border-white/5 rounded-3xl p-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center text-3xl mx-auto">
            <FaTimesCircle />
          </div>
          <h1 className="text-2xl font-black text-white">Layanan Not Found</h1>
          <p className="text-[#8e8e9f] text-sm">
            Layanan dengan ID tersebut tidak terdaftar di sistem.
          </p>
          <Link
            to="/admin/services"
            className="w-full bg-[#dfb34c] text-[#111116] font-black py-3 rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            <FaChevronLeft /> Kembali ke Layanan
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-2 py-4 space-y-6">
      {/* BACK BUTTON */}
      <div className="border-b border-white/5 pb-4">
        <Link
          to="/admin/services"
          className="inline-flex items-center gap-1.5 text-xs text-[#dfb34c] hover:underline font-bold"
        >
          <FaChevronLeft /> Kembali ke Daftar Layanan
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#141414] border border-white/5 rounded-3xl overflow-hidden shadow-xl">
        {/* LEFT — VISUAL PREVIEW */}
        <div className="md:col-span-5 relative overflow-hidden bg-[#181818] min-h-[250px] md:min-h-full flex items-center justify-center border-b md:border-b-0 md:border-r border-white/5 p-8">
          <div className="absolute inset-0 bg-gradient-to-tr from-black/85 via-black/40 to-transparent z-10" />
          <div className="w-24 h-24 rounded-3xl bg-[#dfb34c]/10 border border-[#dfb34c]/20 flex items-center justify-center text-[#dfb34c] text-5xl relative z-20 shadow-lg">
            <FaCut />
          </div>
          <div className="absolute bottom-6 left-6 z-20 space-y-1">
            <span className="px-2.5 py-0.5 rounded-full text-[8px] font-extrabold bg-[#dfb34c]/20 text-[#dfb34c] border border-[#dfb34c]/30 uppercase">
              {service.kategori}
            </span>
            <h3 className="text-lg font-black text-white">{service.nama_service}</h3>
          </div>
        </div>

        {/* RIGHT — DETAILS / FORM */}
        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
          {!isEditing ? (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] uppercase tracking-[3px] font-black text-gray-500">Service Specs</span>
                  <h2 className="text-2xl font-black text-white font-poppins mt-1">Detail Layanan</h2>
                </div>
                
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-1.5 bg-[#dfb34c]/10 hover:bg-[#dfb34c]/25 border border-[#dfb34c]/20 hover:border-[#dfb34c]/40 text-[#dfb34c] font-bold text-xs px-3 py-2 rounded-xl transition-all"
                >
                  <FaEdit /> Edit Menu
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="bg-[#1c1c1c] border border-white/5 p-4 rounded-2xl">
                  <span className="text-[9px] uppercase text-gray-500 font-bold block">Durasi Kerja</span>
                  <p className="font-mono font-bold text-white mt-1.5 flex items-center gap-1.5"><FaClock className="text-[#dfb34c]" /> {service.durasi} Menit</p>
                </div>

                <div className="bg-[#1c1c1c] border border-white/5 p-4 rounded-2xl">
                  <span className="text-[9px] uppercase text-gray-500 font-bold block">Status Menu</span>
                  <p className={`font-bold mt-1.5 flex items-center gap-1.5 ${service.status === "Aktif" ? "text-emerald-400" : "text-red-400"}`}>
                    {service.status === "Aktif" ? <FaCheckCircle /> : <FaTimesCircle />} {service.status}
                  </p>
                </div>
              </div>

              <div className="border-t border-white/5 pt-4 space-y-1">
                <span className="text-[9px] uppercase text-gray-500 font-bold block">Harga / Tarif Layanan</span>
                <h1 className="text-3xl font-black text-[#dfb34c] font-mono">Rp {service.harga.toLocaleString("id-ID")}</h1>
              </div>

              <p className="text-xs text-[#8e8e9f] leading-relaxed pt-2">
                Setiap perubahan pada durasi atau harga layanan ini akan langsung diperbarui di formulir booking baru untuk pelanggan (member) maupun walk-in kasir.
              </p>
            </div>
          ) : (
            <form onSubmit={handleUpdateService} className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <h3 className="font-bold text-white text-base">Edit Rincian Menu</h3>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="text-xs text-[#8e8e9f] hover:text-white"
                >
                  Batal
                </button>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] uppercase text-[#dfb34c] font-bold block">Nama Layanan</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#dfb34c]/60"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase text-[#dfb34c] font-bold block">Kategori</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none"
                  >
                    <option value="Haircut">Haircut</option>
                    <option value="Grooming">Grooming</option>
                    <option value="Treatment">Treatment</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase text-[#dfb34c] font-bold block">Durasi (Menit)</label>
                  <input 
                    type="number" 
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none"
                    required
                    min="5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase text-[#dfb34c] font-bold block">Tarif Layanan (Rp)</label>
                  <input 
                    type="number" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none"
                    required
                    min="0"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase text-[#dfb34c] font-bold block">Status Aktif</label>
                  <select 
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Non-Aktif">Non-Aktif</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-[#dfb34c] text-[#111116] font-black text-xs py-3.5 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                <FaSave /> {saving ? "MENYIMPAN..." : "SIMPAN PERUBAHAN"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
