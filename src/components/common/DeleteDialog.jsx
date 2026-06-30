import { FaExclamationTriangle } from "react-icons/fa";

export default function DeleteDialog({ show, title, message, onDelete, onCancel }) {
    if (!show) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-[#0D0C0B] border border-red-500/20 rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl">
                <div className="w-10 h-10 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center mx-auto mb-3 text-sm animate-bounce">
                    <FaExclamationTriangle />
                </div>
                <h3 className="text-white font-bold text-base tracking-wide">{title || "Hapus Data?"}</h3>
                <p className="text-xs text-white/40 mt-2 mb-6 leading-relaxed">{message || "Data yang dihapus tidak bisa dikembalikan lagi."}</p>
                <div className="flex gap-3">
                    <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/8 text-white/50 text-xs font-medium hover:text-white transition-all">
                        Batal
                    </button>
                    <button onClick={onDelete} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-semibold transition-all shadow-lg shadow-red-500/10">
                        Hapus Permanen
                    </button>
                </div>
            </div>
        </div>
    );
}