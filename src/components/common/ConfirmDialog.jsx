export default function ConfirmDialog({ show, title, message, onConfirm, onCancel }) {
    if (!show) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
            <div className="bg-[#0D0C0B] border border-white/10 rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl">
                <h3 className="text-white font-bold text-base tracking-wide">{title || "Konfirmasi Aksi"}</h3>
                <p className="text-xs text-white/40 mt-2 mb-6 leading-relaxed">{message}</p>
                <div className="flex gap-3">
                    <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/8 text-white/50 text-xs font-medium hover:text-white transition-all">
                        Batal
                    </button>
                    <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-[#A87C2D] hover:bg-[#c49535] text-white text-xs font-semibold transition-all">
                        Ya, Lanjutkan
                    </button>
                </div>
            </div>
        </div>
    );
}