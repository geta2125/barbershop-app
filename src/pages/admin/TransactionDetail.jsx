import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { transactionService } from "../../services/transactionService";
import { FaChevronLeft, FaPrint, FaCheckCircle, FaCut, FaUserTie, FaCoins } from "react-icons/fa";

export default function TransactionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransaction = async () => {
      setLoading(true);
      const { data } = await transactionService.getById(id);
      setTransaction(data);
      setLoading(false);
    };

    fetchTransaction();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return <div className="text-center py-12 text-[#dfb34c]">Memuat detail invoice...</div>;
  }

  if (!transaction) {
    return (
      <div className="max-w-md mx-auto text-center py-12 space-y-4">
        <p className="text-[#8e8e9f]">Invoice tidak ditemukan.</p>
        <button onClick={() => navigate(-1)} className="text-[#dfb34c] hover:underline font-bold text-xs">
          Kembali
        </button>
      </div>
    );
  }

  const subtotal = transaction.subtotal || transaction.final_amount;
  const tax = 0;
  const total = transaction.final_amount;

  return (
    <div className="max-w-2xl mx-auto px-2 py-4 space-y-6">
      {/* TOP ACTIONS */}
      <div className="flex justify-between items-center border-b border-white/5 pb-4 print:hidden">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-xs text-[#dfb34c] hover:underline font-bold"
        >
          <FaChevronLeft /> Kembali ke Daftar Transaksi
        </button>
        <button
          onClick={handlePrint}
          className="bg-white/5 hover:bg-white/10 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all"
        >
          <FaPrint /> Cetak Invoice
        </button>
      </div>

      {/* DIGITAL INVOICE */}
      <div className="bg-[#141414] border border-white/5 rounded-3xl p-6 sm:p-8 space-y-8 shadow-2xl relative overflow-hidden print:bg-white print:text-black print:border-none print:shadow-none">
        {/* TOP GOLD ACCENT BAR */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#dfb34c] print:hidden" />

        {/* INVOICE HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pb-6 border-b border-white/5 print:border-black/10">
          <div className="space-y-1.5">
            <span className="text-[9px] uppercase tracking-[3px] font-black text-gray-500">Official Receipt</span>
            <h1 className="text-2xl font-black text-white font-poppins print:text-black">
              Groom<span className="text-[#dfb34c]">Gold</span>
            </h1>
            <p className="text-[10px] text-[#8e8e9f] print:text-black/60">Premium Barbershop & Styling Lounge</p>
          </div>

          <div className="text-left sm:text-right space-y-1">
            <span className="px-2.5 py-1 rounded-full text-[9px] font-extrabold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 uppercase tracking-wider print:bg-transparent print:border-emerald-500 print:text-emerald-500">
              Lunas
            </span>
            <p className="text-sm font-mono font-bold text-white pt-2.5 print:text-black">#TX-{(10000 + transaction.id)}</p>
            <p className="text-[10px] text-[#8e8e9f] print:text-black/60">Tanggal: {transaction.created_at ? transaction.created_at.slice(0, 16) : "-"}</p>
          </div>
        </div>

        {/* CUSTOMER & STORE INFO */}
        <div className="grid grid-cols-2 gap-6 text-xs pb-6 border-b border-white/5 print:border-black/10">
          <div className="space-y-2">
            <span className="text-[10px] uppercase text-gray-500 font-bold block">Ditujukan Kepada</span>
            <p className="font-bold text-white print:text-black">{transaction.customer_name || "Pelanggan Guest"}</p>
            {transaction.booking?.email && <p className="text-[#8e8e9f] print:text-black/60">{transaction.booking.email}</p>}
            {transaction.booking?.no_hp && <p className="text-[#8e8e9f] print:text-black/60">{transaction.booking.no_hp}</p>}
          </div>
          <div className="space-y-2 text-right">
            <span className="text-[10px] uppercase text-gray-500 font-bold block">Outlet Pembayaran</span>
            <p className="font-bold text-white print:text-black">GroomGold Pusat</p>
            <p className="text-[#8e8e9f] print:text-black/60">Jl. Jend. Sudirman No. 25</p>
            <p className="text-[#8e8e9f] print:text-black/60">Pekanbaru, Riau</p>
          </div>
        </div>

        {/* LINE ITEMS */}
        <div className="space-y-4">
          <span className="text-[10px] uppercase text-gray-500 font-bold block">Detail Layanan</span>
          
          <div className="bg-[#1c1c1c] border border-white/5 rounded-2xl p-4 sm:p-5 flex justify-between items-center print:bg-transparent print:border-black/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#dfb34c]/10 text-[#dfb34c] flex items-center justify-center text-sm flex-shrink-0 print:hidden">
                <FaCut />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm print:text-black">{transaction.layanan}</h4>
                <p className="text-[10px] text-[#8e8e9f] flex items-center gap-1 mt-0.5 print:text-black/60">
                  <FaUserTie /> Barber: {transaction.barber}
                </p>
              </div>
            </div>
            <span className="font-mono font-bold text-white text-sm print:text-black">
              Rp {subtotal.toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        {/* PAYMENT SUMMARY */}
        <div className="flex flex-col items-end gap-3 text-xs pt-4">
          <div className="w-full sm:w-64 space-y-2.5">
            <div className="flex justify-between text-[#8e8e9f] print:text-black/60">
              <span>Subtotal</span>
              <span className="font-mono text-white print:text-black">Rp {subtotal.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between text-[#8e8e9f] print:text-black/60">
              <span>Diskon Member</span>
              <span className="font-mono text-white print:text-black">Rp 0</span>
            </div>
            <div className="flex justify-between text-[#8e8e9f] print:text-black/60 pb-2.5 border-b border-white/5 print:border-black/10">
              <span>PPN (0%)</span>
              <span className="font-mono text-white print:text-black">Rp 0</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-white print:text-black uppercase">Total Bayar</span>
              <span className="font-mono font-black text-base text-[#dfb34c] print:text-black">
                Rp {total.toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        </div>

        {/* INVOICE FOOTER */}
        <div className="text-center pt-8 border-t border-white/5 print:border-black/10 space-y-1.5">
          <p className="text-[11px] font-bold text-white print:text-black">Terima Kasih Atas Kunjungan Anda!</p>
          <p className="text-[9px] text-[#8e8e9f] leading-relaxed max-w-sm mx-auto print:text-black/50">
            Pembayaran telah divalidasi oleh sistem kasir digital GroomGold. Kunjungi website kami untuk menukarkan poin loyalitas Anda.
          </p>
        </div>
      </div>
    </div>
  );
}
