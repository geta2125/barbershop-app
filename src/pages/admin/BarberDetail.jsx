import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { barberService } from "../../services/barberService";
import { FaUserTie, FaPhone, FaCheckCircle, FaStar, FaChevronLeft, FaTrash } from "react-icons/fa";

export default function BarberDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [phone, setPhone] = useState("");
  const [experience, setExperience] = useState("");
  const [status, setStatus] = useState("Standby");
  const [rating, setRating] = useState(4.8);
  const [image, setImage] = useState("");
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchBarber = async () => {
      setLoading(true);
      const { data, error } = await barberService.getById(id);
      if (error || !data) {
        setError("Barber tidak ditemukan.");
      } else {
        setName(data.name || data.nama_barber || "");
        setSpecialty(data.specialty || data.spesialis || "");
        setPhone(data.phone || data.no_hp || "");
        setExperience(data.experience || "");
        setStatus(data.status || "Standby");
        setRating(data.rating || 4.8);
        setImage(data.image || "");
      }
      setLoading(false);
    };

    fetchBarber();
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        name,
        specialty,
        phone,
        experience,
        status,
        rating: Number(rating),
        image
      };
      
      const { error } = await barberService.update(id, payload);
      if (error) throw error;
      
      setSuccess("Data barber berhasil diperbarui!");
      setTimeout(() => navigate("/admin/barber"), 1200);
    } catch (err) {
      console.error(err);
      setError(err.message || "Gagal menyimpan data.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus barber ini?");
    if (!confirmDelete) return;

    try {
      const { error } = await barberService.delete(id);
      if (error) throw error;
      alert("Barber berhasil dihapus.");
      navigate("/admin/barber");
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus barber.");
    }
  };

  if (loading) {
    return <div className="text-center py-12 text-[#dfb34c]">Memuat data...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-2 py-4 space-y-6">
      {/* TOP HEADER */}
      <div className="flex justify-between items-center border-b border-white/5 pb-4">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-xs text-[#dfb34c] hover:underline font-bold"
        >
          <FaChevronLeft /> Kembali ke Daftar Barber
        </button>
        <button
          onClick={handleDelete}
          className="flex items-center gap-1.5 text-xs text-red-400 hover:underline font-bold bg-red-500/10 px-3 py-1.5 rounded-xl border border-red-500/20"
        >
          <FaTrash /> Hapus Barber
        </button>
      </div>

      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-xs font-bold flex items-center gap-2">
          <FaCheckCircle /> {success}
        </div>
      )}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-xs font-bold">
          ⚠️ {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* PROFILE PREVIEW */}
        <div className="md:col-span-1 bg-[#141414] border border-white/5 rounded-3xl p-6 flex flex-col items-center text-center justify-center space-y-4 h-fit">
          <img 
            src={image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80"} 
            alt={name} 
            className="w-24 h-24 rounded-full object-cover border-2 border-[#dfb34c]/20"
          />
          <div>
            <h3 className="text-lg font-bold text-white">{name || "Barber Name"}</h3>
            <p className="text-xs text-[#8e8e9f] mt-0.5">{specialty || "Specialization"}</p>
          </div>
          <div className="flex items-center gap-1 text-xs text-[#dfb34c] font-bold">
            <FaStar /> {rating} / 5.0 Rating
          </div>
        </div>

        {/* EDIT FORM */}
        <form onSubmit={handleSave} className="md:col-span-2 bg-[#141414] border border-white/5 rounded-3xl p-6 space-y-4">
          <h3 className="text-base font-bold text-white border-b border-white/5 pb-3">Edit Informasi Barber</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase text-[#dfb34c] font-bold">Nama Lengkap</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#dfb34c]/60"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase text-[#dfb34c] font-bold">Spesialisasi</label>
              <input 
                type="text" 
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                placeholder="Contoh: Classic Cut, Fade, Hair Spa"
                className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#dfb34c]/60"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase text-[#dfb34c] font-bold">No. HP / Telepon</label>
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#dfb34c]/60"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase text-[#dfb34c] font-bold">Pengalaman Kerja</label>
              <input 
                type="text" 
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="Contoh: 3 Years"
                className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#dfb34c]/60"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase text-[#dfb34c] font-bold">Status Kerja</label>
              <select 
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#dfb34c]/60"
              >
                <option value="Standby">Standby (Aktif)</option>
                <option value="Off Duty">Off Duty (Libur)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase text-[#dfb34c] font-bold">Foto URL</label>
              <input 
                type="url" 
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#dfb34c]/60"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-white/5">
            <button
              type="submit"
              disabled={saving}
              className="bg-[#dfb34c] text-[#111116] font-bold text-xs px-5 py-3 rounded-xl hover:opacity-90 transition-all"
            >
              {saving ? "MENYIMPAN..." : "SIMPAN PERUBAHAN"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
