import { useState, useEffect } from "react";
import { FaSearch, FaPlus, FaClock, FaCoins, FaTimes, FaCut, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { db } from "../../services/localDB";
import { serviceService, mapService } from "../../services/serviceService";
import Container from "../../components/Container";
import PageHeader from "../../components/PageHeader";
import EmptyState from "../../components/EmptyState";

export default function Services() {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Haircut");
  const [duration, setDuration] = useState(30);
  const [price, setPrice] = useState(50000);
  const [image, setImage] = useState("haircut-classic.jpg");
  const [saving, setSaving] = useState(false);

  const fetchServices = () => {
    setLoading(true);
    serviceService.getAll(true)
      .then((res) => {
        setServices(res.data ? res.data.map(mapService) : []);
      })
      .catch((err) => setError(err.message || "Gagal memuat layanan."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleCreateService = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await serviceService.create({
        nama_service: name,
        kategori: category,
        durasi: Number(duration),
        harga: Number(price),
        gambar: image,
        status: "Aktif"
      });

      setName("");
      setCategory("Haircut");
      setDuration(30);
      setPrice(50000);
      setImage("haircut-classic.jpg");
      setShowModal(false);
      fetchServices();
      alert("Layanan baru berhasil ditambahkan!");
    } catch (err) {
      console.error(err);
      alert("Gagal menambahkan layanan.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus layanan ini?");
    if (!confirmDelete) return;

    try {
      await serviceService.delete(id);
      fetchServices();
      alert("Layanan berhasil dihapus.");
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus layanan.");
    }
  };

  const filtered = services.filter(s =>
    (s.nama_service && s.nama_service.toLowerCase().includes(search.toLowerCase())) ||
    (s.kategori && s.kategori.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] text-[#E5E5E5] space-y-6">
      <Container>
        <PageHeader title="Services" breadcrumb={["Dashboard", "Services"]}>
          <div className="flex items-center gap-2 bg-[#141414] border border-white/5 px-4 py-2 rounded-xl text-xs text-white/40">
            <FaCut className="text-[#dfb34c]" />
            <span className="text-[#dfb34c] font-bold">Treatment Menu</span>
          </div>
        </PageHeader>

        {error && <div className="mb-4 text-xs font-bold text-red-400 bg-red-500/10 p-3 rounded-xl">⚠️ {error}</div>}
        {loading && <div className="mb-4 text-xs text-[#dfb34c] animate-pulse">Memuat katalog layanan...</div>}

        {/* CONTROLS */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#141414] border border-white/5 p-4 rounded-2xl shadow-md">
          <button
            onClick={() => setShowModal(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#dfb34c] hover:bg-[#BE9359] text-[#111116] font-black text-xs tracking-wider px-5 py-3.5 rounded-xl transition-all shadow-[0_4px_15px_rgba(223,179,76,0.15)]"
          >
            <FaPlus /> Tambah Layanan
          </button>

          <div className="relative w-full sm:w-72">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-xs" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari layanan..."
              className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#dfb34c]/60"
            />
          </div>
        </div>

        {/* GRID CATALOG */}
        {filtered.length === 0 ? (
          <EmptyState title="Layanan tidak ditemukan" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((s) => (
              <div 
                key={s.id}
                className="bg-[#141414] border border-white/5 rounded-3xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:border-[#dfb34c]/20"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-extrabold bg-[#dfb34c]/10 text-[#dfb34c] border border-[#dfb34c]/20 uppercase">
                      {s.kategori}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border uppercase ${
                      s.status === "Aktif" 
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                        : "bg-red-500/10 text-red-400 border-red-500/20"
                    }`}>
                      {s.status}
                    </span>
                  </div>
                  <h3 className="text-base font-black text-white">{s.nama_service}</h3>
                  
                  <div className="flex items-center gap-4 text-xs text-[#8e8e9f]">
                    <span className="flex items-center gap-1.5"><FaClock className="text-[#dfb34c]/60" /> {s.durasi} Menit</span>
                    <span className="font-bold text-white">Rp {s.harga.toLocaleString("id-ID")}</span>
                  </div>
                </div>

                <div className="flex gap-2 w-full sm:w-auto justify-end border-t border-white/5 pt-3 sm:border-none sm:pt-0">
                  <Link
                    to={`/admin/services/${s.id}`}
                    className="p-2.5 bg-white/5 hover:bg-[#dfb34c]/10 text-white hover:text-[#dfb34c] border border-white/5 hover:border-[#dfb34c]/20 rounded-xl inline-flex transition-all text-xs font-bold gap-1 items-center"
                  >
                    <FaEdit /> Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="p-2.5 bg-red-500/5 hover:bg-red-500/10 text-red-400 border border-red-500/10 hover:border-red-500/20 rounded-xl inline-flex transition-all text-xs font-bold gap-1 items-center"
                  >
                    <FaTimes /> Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>

      {/* CREATE MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#111116] border border-[#242335] rounded-3xl p-6 max-w-md w-full space-y-6 animate-in fade-in duration-200">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <h3 className="text-lg font-bold text-white font-poppins flex items-center gap-2">
                <FaPlus className="text-[#dfb34c]" /> Tambah Layanan Baru
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-[#8e8e9f] hover:text-white transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleCreateService} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase text-[#dfb34c] font-bold block">Nama Layanan</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Premium Cut & Wash"
                  className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#dfb34c]/60"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase text-[#dfb34c] font-bold block">Kategori</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#dfb34c]/60"
                  >
                    <option value="Haircut">Haircut</option>
                    <option value="Grooming">Grooming</option>
                    <option value="Treatment">Treatment</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase text-[#dfb34c] font-bold block">Durasi (Menit)</label>
                  <input 
                    type="number" 
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#dfb34c]/60"
                    required
                    min="5"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase text-[#dfb34c] font-bold block">Harga Layanan (Rp)</label>
                <input 
                  type="number" 
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#dfb34c]/60"
                  required
                  min="0"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-[#dfb34c] text-[#111116] font-black text-xs tracking-wider py-4 rounded-xl hover:opacity-90 transition-all disabled:opacity-50"
              >
                {saving ? "MENYIMPAN..." : "SIMPAN LAYANAN"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
