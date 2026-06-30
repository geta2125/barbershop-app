import { FaTimes } from "react-icons/fa";

const inputCls = "w-full bg-[#0D0C0B] border border-white/8 text-[#D3CDC3] placeholder-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#A87C2D]/60 focus:ring-1 focus:ring-[#A87C2D]/30 transition-all duration-200";
const selectCls = "w-full bg-[#0D0C0B] border border-white/8 text-[#D3CDC3] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#A87C2D]/60 focus:ring-1 focus:ring-[#A87C2D]/30 transition-all duration-200 appearance-none cursor-pointer";

export default function BookingForm({ form, customers = [], barbers = [], services = [], onChange, onSubmit, onClose }) {
    return (
        <div className="p-1">
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h2 className="text-lg font-bold text-white tracking-wide">Buat Reservasi</h2>
                    <p className="text-xs text-white/30 mt-0.5">Jadwalkan booking treatment salon baru</p>
                </div>
                <button onClick={onClose} className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-white/40 hover:text-white transition-all">
                    <FaTimes className="text-xs" />
                </button>
            </div>

            <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Pilih Customer */}
                <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="text-[10px] tracking-wider uppercase text-[#A87C2D]/70 font-semibold">Pilih Pelanggan</label>
                    <select name="ID_Customer" value={form.ID_Customer} onChange={onChange} required className={selectCls}>
                        <option value="">-- Pilih Customer --</option>
                        {customers.map(c => <option key={c.ID_Customer} value={c.ID_Customer}>{c.Nama_Lengkap} ({c.No_HP})</option>)}
                    </select>
                </div>

                {/* Pilih Layanan */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] tracking-wider uppercase text-[#A87C2D]/70 font-semibold">Menu Layanan</label>
                    <select name="ID_Service" value={form.ID_Service} onChange={onChange} required className={selectCls}>
                        <option value="">-- Pilih Layanan --</option>
                        {services.map(s => <option key={s.ID_Service} value={s.ID_Service}>{s.Nama_Service} - Rp {Number(s.Harga).toLocaleString()}</option>)}
                    </select>
                </div>

                {/* Pilih Barber */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] tracking-wider uppercase text-[#A87C2D]/70 font-semibold">Barber / Stylist</label>
                    <select name="ID_Barber" value={form.ID_Barber} onChange={onChange} required className={selectCls}>
                        <option value="">-- Pilih Stylist --</option>
                        {barbers.map(b => <option key={b.ID_Barber} value={b.ID_Barber}>{b.Nama_Barber}</option>)}
                    </select>
                </div>

                {/* Tanggal & Jam */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] tracking-wider uppercase text-[#A87C2D]/70 font-semibold">Tanggal</label>
                    <input type="date" name="Tanggal" value={form.Tanggal} onChange={onChange} required className={inputCls} />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] tracking-wider uppercase text-[#A87C2D]/70 font-semibold">Jam Slot Waktu</label>
                    <input type="time" name="Jam" value={form.Jam} onChange={onChange} required className={inputCls} />
                </div>

                {/* Aksi tombol */}
                <div className="md:col-span-2 flex gap-3 pt-4 border-t border-white/5 mt-2">
                    <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/8 text-white/50 text-xs font-medium hover:text-white transition-all">
                        Batal
                    </button>
                    <button type="submit" className="flex-1 py-2.5 rounded-xl bg-[#A87C2D] hover:bg-[#c49535] text-white text-xs font-semibold transition-colors">
                        Konfirmasi Booking
                    </button>
                </div>
            </form>
        </div>
    );
}