import { FaTimes } from "react-icons/fa";

const inputCls  = "w-full bg-[#0D0C0B] border border-white/8 text-[#D3CDC3] placeholder-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#A87C2D]/60 focus:ring-1 focus:ring-[#A87C2D]/30 transition-all duration-200";
const selectCls = "w-full bg-[#0D0C0B] border border-white/8 text-[#D3CDC3] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#A87C2D]/60 focus:ring-1 focus:ring-[#A87C2D]/30 transition-all duration-200 appearance-none cursor-pointer";

function Field({ label, children }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-[0.2em] uppercase text-[#A87C2D]/70 font-semibold">{label}</label>
            {children}
        </div>
    );
}

export default function CustomerForm({ form, onChange, onSubmit, onClose }) {
    return (
        <div className="p-1">
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h2 className="text-lg font-bold text-white tracking-wide">Tambah Customer</h2>
                    <p className="text-xs text-white/30 mt-0.5">Tambahkan customer baru GroomGold</p>
                </div>
                <button onClick={onClose} className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200">
                    <FaTimes className="text-xs" />
                </button>
            </div>

            <div className="w-full h-[1px] bg-gradient-to-r from-[#A87C2D]/60 via-[#A87C2D]/20 to-transparent mb-6" />

            <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Full Name">
                    <input type="text" name="Nama_Lengkap" placeholder="Contoh: Budi Santoso" value={form.Nama_Lengkap} onChange={onChange} required className={inputCls} />
                </Field>
                <Field label="Email Address">
                    <input type="email" name="Email" placeholder="budi@example.com" value={form.Email} onChange={onChange} required className={inputCls} />
                </Field>
                <Field label="Phone Number">
                    <input type="text" name="No_HP" placeholder="6281234..." value={form.No_HP} onChange={onChange} required className={inputCls} />
                </Field>
                <Field label="Status Aktif">
                    <select name="Status_Aktif" value={form.Status_Aktif} onChange={onChange} className={selectCls}>
                        <option value="Aktif">Aktif</option>
                        <option value="Nonaktif">Nonaktif</option>
                    </select>
                </Field>
                <Field label="Status Member">
                    <select name="Status_Member" value={form.Status_Member} onChange={onChange} className={selectCls}>
                        <option value="Member">Member</option>
                        <option value="Non Member">Non Member</option>
                    </select>
                </Field>
                <Field label="Level Membership">
                    <select name="Level_Membership" value={form.Level_Membership} onChange={onChange} className={selectCls}>
                        <option value="Silver">Silver</option>
                        <option value="Gold">Gold</option>
                        <option value="Platinum">Platinum</option>
                    </select>
                </Field>

                <div className="md:col-span-2 flex gap-3 pt-2 border-t border-white/5 mt-2">
                    <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/8 text-white/50 hover:text-white hover:bg-white/8 text-sm font-medium transition-all duration-200">
                        Batal
                    </button>
                    <button type="submit" className="flex-1 py-2.5 rounded-xl bg-[#A87C2D] hover:bg-[#c49535] text-white text-sm font-semibold transition-colors duration-200">
                        Simpan Customer
                    </button>
                </div>
            </form>
        </div>
    );
}