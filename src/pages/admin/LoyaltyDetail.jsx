import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { rewardService } from "../../services/rewardService";
import { FaChevronLeft, FaCheckCircle, FaCoins, FaGift } from "react-icons/fa";

export default function LoyaltyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [points, setPoints] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Aktif");
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReward = async () => {
      setLoading(true);
      const { data } = await rewardService.getAll(true);
      const reward = data?.find(r => String(r.id) === String(id));
      if (!reward) {
        setError("Reward tidak ditemukan.");
      } else {
        setName(reward.name);
        setPoints(reward.points);
        setDescription(reward.description);
        setStatus(reward.status || "Aktif");
      }
      setLoading(false);
    };

    fetchReward();
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      await rewardService.update(id, {
        name,
        points: Number(points),
        description,
        status
      });
      setSuccess("Katalog reward berhasil diperbarui!");
      setTimeout(() => navigate("/admin/loyalty"), 1200);
    } catch (err) {
      console.error(err);
      setError("Gagal menyimpan data.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12 text-[#dfb34c]">Memuat data...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto px-2 py-4 space-y-6">
      {/* HEADER */}
      <div className="border-b border-white/5 pb-4">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-xs text-[#dfb34c] hover:underline font-bold"
        >
          <FaChevronLeft /> Kembali ke Katalog Loyalty
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

      <form onSubmit={handleSave} className="bg-[#141414] border border-white/5 rounded-3xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <span className="text-[#dfb34c]"><FaGift /></span> Edit Katalog Reward
        </h3>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase text-[#dfb34c] font-bold">Nama Reward</label>
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
              <label className="text-[10px] uppercase text-[#dfb34c] font-bold">Poin Dibutuhkan</label>
              <input 
                type="number" 
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#dfb34c]/60"
                required
                min="1"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase text-[#dfb34c] font-bold">Status Katalog</label>
              <select 
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none"
              >
                <option value="Aktif">Aktif</option>
                <option value="Nonaktif">Nonaktif</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase text-[#dfb34c] font-bold">Deskripsi Reward</label>
            <textarea 
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl p-4 text-xs focus:outline-none focus:border-[#dfb34c]/60"
              required
            />
          </div>
        </div>

        <div className="pt-4 border-t border-white/5 flex justify-end gap-2">
          <button 
            type="button"
            onClick={() => navigate(-1)}
            className="bg-white/5 hover:bg-white/10 text-white font-bold text-xs px-4 py-2.5 rounded-xl"
          >
            Batal
          </button>
          <button 
            type="submit"
            disabled={saving}
            className="bg-[#dfb34c] text-[#111116] font-bold text-xs px-4 py-2.5 rounded-xl hover:opacity-90"
          >
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
}
