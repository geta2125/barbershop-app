import { FaTimes } from "react-icons/fa";

const inputCls = "w-full bg-[#0D0C0B] border border-white/8 text-[#D3CDC3] placeholder-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#A87C2D]/60 focus:ring-1 focus:ring-[#A87C2D]/30 transition-all duration-200";
const selectCls = "w-full bg-[#0D0C0B] border border-white/8 text-[#D3CDC3] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#A87C2D]/60 focus:ring-1 focus:ring-[#A87C2D]/30 transition-all duration-200 appearance-none cursor-pointer";

export default function BarberForm({ form, onChange, onSubmit, onClose }) {
    return (
        <div className="p-1">
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h2 className="text-lg font-bold text-white tracking-wide">Tambah Barber / Stylist</h2>
                    <p className="text-xs text-white/30 mt-0.5">Daftarkan team barber baru GroomGold</p>
                </div>
                <button onClick={onClose} className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200">
                    <FaTimes className="text-xs" />
                </button>
            </div>

            <div className="w-full h-[1px] bg-gradient-to-r from-[#A87C2D]/60 via-[#A87C2D]/20 to-transparent mb-6" />

            <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] tracking-[0.2em] uppercase text-[#A87C2D]/70 font-semibold">Nama Barber</label>
                    <input type="text" name="Nama_Barber" placeholder="Contoh: Rey Stylist" value={form.Nama_Barber} onChange={onChange} required className={inputCls} />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] tracking-[0.2em] uppercase text-[#A87C2D]/70 font-semibold">Spesialisasi</label>
                    <input type="text" name="Spesialisasi" placeholder="Contoh: Hair Tattoo, Classic Cut" value={form.Spesialisasi} onChange={onChange} required className={inputCls} />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] tracking-[0.2em] uppercase text-[#A87C2D]/70 font-semibold">Status Awal</label>
                    <select name="Status" value={form.Status} onChange={onChange} className={selectCls}>
                        <option value="Available">Available</option>
                        <option value="Busy">Busy</option>
                        <option value="Off">Off Duty</option>
                    </select>
                </div>

                <div className="flex gap-3 pt-4 border-t border-white/5 mt-2">
                    <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/8 text-white/50 hover:text-white text-sm font-medium transition-all duration-200">
                        Batal
                    </button>
                    <button type="submit" className="flex-1 py-2.5 rounded-xl bg-[#A87C2D] hover:bg-[#c49535] text-white text-sm font-semibold transition-colors duration-200">
                        Simpan Barber
                    </button>
                </div>
            </form>
        </div>
    );
}