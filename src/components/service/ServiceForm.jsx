import { FaTimes } from "react-icons/fa";

const inputCls = "w-full bg-[#0D0C0B] border border-white/8 text-[#D3CDC3] placeholder-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#A87C2D]/60 focus:ring-1 focus:ring-[#A87C2D]/30 transition-all duration-200";
const selectCls = "w-full bg-[#0D0C0B] border border-white/8 text-[#D3CDC3] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#A87C2D]/60 focus:ring-1 focus:ring-[#A87C2D]/30 transition-all duration-200 appearance-none cursor-pointer";

export default function ServiceForm({ form, onChange, onSubmit, onClose, isEdit }) {
    return (
        <div className="p-1">
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h2 className="text-lg font-bold text-white tracking-wide">{isEdit ? "Edit Layanan" : "Tambah Layanan"}</h2>
                    <p className="text-xs text-white/30 mt-0.5">Kelola daftar menu treatment GroomGold</p>
                </div>
                <button onClick={onClose} className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-white/40 hover:text-white transition-all">
                    <FaTimes className="text-xs" />
                </button>
            </div>

            <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-[#A87C2D]/70 font-semibold block mb-1.5">Nama Layanan</label>
                    <input type="text" name="Nama_Service" placeholder="Contoh: Premium Haircut & Shaving" value={form.Nama_Service} onChange={onChange} required className={inputCls} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-[10px] tracking-[0.2em] uppercase text-[#A87C2D]/70 font-semibold block mb-1.5">Harga (Rp)</label>
                        <input type="number" name="Harga" placeholder="150000" value={form.Harga} onChange={onChange} required className={inputCls} />
                    </div>
                    <div>
                        <label className="text-[10px] tracking-[0.2em] uppercase text-[#A87C2D]/70 font-semibold block mb-1.5">Durasi (Menit)</label>
                        <input type="number" name="Durasi" placeholder="45" value={form.Durasi} onChange={onChange} required className={inputCls} />
                    </div>
                </div>
                <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-[#A87C2D]/70 font-semibold block mb-1.5">Status Ketersediaan</label>
                    <select name="Tersedia" value={form.Tersedia} onChange={onChange} className={selectCls}>
                        <option value={true}>Tersedia</option>
                        <option value={false}>Kosong / Nonaktif</option>
                    </select>
                </div>

                <div className="flex gap-3 pt-4 border-t border-white/5 mt-2">
                    <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/8 text-white/50 text-sm font-medium transition-all">
                        Batal
                    </button>
                    <button type="submit" className="flex-1 py-2.5 rounded-xl bg-[#A87C2D] hover:bg-[#c49535] text-white text-sm font-semibold transition-colors">
                        Simpan Layanan
                    </button>
                </div>
            </form>
        </div>
    );
}