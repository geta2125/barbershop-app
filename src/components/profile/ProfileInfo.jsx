const inputCls = "w-full bg-[#0D0C0B] border border-white/8 text-[#D3CDC3] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#A87C2D]/60 transition-all";

export default function ProfileInfo({ user, onSave }) {
    return (
        <form onSubmit={onSave} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="text-[10px] tracking-wider uppercase text-white/40 font-semibold block mb-1.5">Nama Lengkap</label>
                    <input type="text" defaultValue={user?.name} className={inputCls} required />
                </div>
                <div>
                    <label className="text-[10px] tracking-wider uppercase text-white/40 font-semibold block mb-1.5">Nomor Telepon</label>
                    <input type="text" defaultValue={user?.phone} className={inputCls} required />
                </div>
            </div>
            <div>
                <label className="text-[10px] tracking-wider uppercase text-white/40 font-semibold block mb-1.5">Alamat Email</label>
                <input type="email" defaultValue={user?.email} className={inputCls} disabled />
            </div>
            <button type="submit" className="w-fit px-5 py-2.5 rounded-xl bg-[#A87C2D] hover:bg-[#c49535] text-white text-xs font-semibold self-end transition-all">
                Simpan Perubahan
            </button>
        </form>
    );
}