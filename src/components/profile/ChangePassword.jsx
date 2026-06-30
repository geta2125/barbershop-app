const inputCls = "w-full bg-[#0D0C0B] border border-white/8 text-[#D3CDC3] placeholder-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#A87C2D]/60 transition-all";

export default function ChangePassword() {
    return (
        <form className="flex flex-col gap-4">
            <div>
                <label className="text-[10px] tracking-wider uppercase text-white/40 font-semibold block mb-1.5">Password Lama</label>
                <input type="password" placeholder="••••••••" className={inputCls} required />
            </div>
            <div>
                <label className="text-[10px] tracking-wider uppercase text-white/40 font-semibold block mb-1.5">Password Baru</label>
                <input type="password" placeholder="Min. 8 karakter" className={inputCls} required />
            </div>
            <button type="submit" className="w-fit px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-white text-xs font-semibold self-end transition-all">
                Perbarui Password
            </button>
        </form>
    );
}