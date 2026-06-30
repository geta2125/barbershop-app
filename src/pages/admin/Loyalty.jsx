import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { rewardService } from "../../services/rewardService";
import { FaCoins, FaGift, FaPlus, FaTrash, FaEdit } from "react-icons/fa";

export default function Loyalty() {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState("");
  const [points, setPoints] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchRewards = async () => {
    setLoading(true);
    const { data } = await rewardService.getAll(true);
    setRewards(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchRewards();
  }, []);

  const handleAddReward = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await rewardService.create({
        name,
        points: Number(points),
        description
      });
      setName("");
      setPoints("");
      setDescription("");
      setShowAddForm(false);
      fetchRewards();
    } catch (e) {
      console.error(e);
      alert("Gagal menambahkan reward.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus reward ini?");
    if (!confirmDelete) return;

    try {
      await rewardService.delete(id);
      fetchRewards();
    } catch (e) {
      console.error(e);
      alert("Gagal menghapus reward.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-2 py-4 space-y-6">
      {/* TOP HEADER */}
      <div className="flex justify-between items-center border-b border-white/5 pb-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white font-poppins">
            LOYALTY <span className="text-[#dfb34c]">REWARDS</span>
          </h1>
          <p className="text-sm text-[#8e8e9f] mt-1">
            Kelola katalog reward loyalitas poin untuk para member Anda.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-[#dfb34c] text-[#111116] font-bold text-xs px-4 py-2.5 rounded-xl hover:opacity-90 transition-all flex items-center gap-1.5 shadow-[0_4px_15px_rgba(223,179,76,0.15)]"
        >
          <FaPlus /> Tambah Reward
        </button>
      </div>

      {/* ADD FORM */}
      {showAddForm && (
        <form onSubmit={handleAddReward} className="bg-[#141414] border border-white/5 rounded-3xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Tambah Catalog Reward Baru</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase text-[#dfb34c] font-bold">Nama Reward</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Free Hairwash & Styling"
                className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#dfb34c]/60"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase text-[#dfb34c] font-bold">Poin Dibutuhkan</label>
              <input 
                type="number" 
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                placeholder="Contoh: 300"
                className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#dfb34c]/60"
                required
                min="1"
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-[10px] uppercase text-[#dfb34c] font-bold">Deskripsi Reward</label>
              <textarea 
                rows="2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Deskripsi penjelasan mengenai produk/layanan reward..."
                className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl p-4 text-xs focus:outline-none focus:border-[#dfb34c]/60"
                required
              />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <button 
              type="button"
              onClick={() => setShowAddForm(false)}
              className="bg-white/[0.05] hover:bg-white/10 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all"
            >
              Batal
            </button>
            <button 
              type="submit"
              disabled={submitting}
              className="bg-[#dfb34c] text-[#111116] font-bold text-xs px-4 py-2.5 rounded-xl hover:opacity-90 transition-all"
            >
              {submitting ? "Menyimpan..." : "Simpan Reward"}
            </button>
          </div>
        </form>
      )}

      {/* CATALOG LIST */}
      {loading ? (
        <div className="text-center py-12 text-[#dfb34c]">Memuat katalog reward...</div>
      ) : rewards.length === 0 ? (
        <div className="bg-[#141414] border border-white/5 rounded-2xl p-12 text-center text-[#8e8e9f] text-xs">
          Belum ada reward terdaftar dalam katalog.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rewards.map((reward) => (
            <div 
              key={reward.id}
              className="bg-[#141414] border border-white/5 rounded-2xl p-5 flex flex-col justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-white text-base flex items-center gap-2">
                    <span className="text-[#dfb34c]"><FaGift /></span> {reward.name}
                  </h3>
                  <span className="flex items-center gap-1 text-[#dfb34c] font-black text-xs">
                    <FaCoins /> {reward.points} Poin
                  </span>
                </div>
                <p className="text-xs text-[#8e8e9f] leading-relaxed">{reward.description}</p>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/5">
                <Link
                  to={`/admin/loyalty/${reward.id}`}
                  className="bg-white/5 hover:bg-white/10 text-white p-2 rounded-lg text-xs font-bold flex items-center gap-1"
                >
                  <FaEdit /> Edit
                </Link>
                <button
                  onClick={() => handleDelete(reward.id)}
                  className="bg-red-500/10 hover:bg-red-500/20 text-red-400 p-2 rounded-lg text-xs font-bold flex items-center gap-1 border border-red-500/20"
                >
                  <FaTrash /> Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
