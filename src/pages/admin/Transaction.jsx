import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { transactionService } from "../../services/transactionService";
import { FaCoins, FaSearch, FaEye, FaReceipt } from "react-icons/fa";

export default function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const { data } = await transactionService.getAll();
      setTransactions(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const filtered = transactions.filter(t => 
    (t.customer_name && t.customer_name.toLowerCase().includes(search.toLowerCase())) ||
    (t.layanan && t.layanan.toLowerCase().includes(search.toLowerCase())) ||
    (t.barber && t.barber.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-5xl mx-auto px-2 py-4 space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white font-poppins">
            TRANSACTIONS <span className="text-[#dfb34c]">& INVOICES</span>
          </h1>
          <p className="text-sm text-[#8e8e9f] mt-1">
            Daftar transaksi pembayaran masuk dan invoice pelanggan barbershop.
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-xs"><FaSearch /></span>
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari transaksi..."
            className="w-full bg-[#141414] border border-white/5 text-white rounded-xl pl-9 pr-4 py-2.5 text-xs focus:outline-none"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-[#dfb34c]">Memuat data transaksi...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-[#141414] border border-white/5 rounded-2xl p-12 text-center text-[#8e8e9f] text-xs">
          Belum ada transaksi pembayaran masuk.
        </div>
      ) : (
        <div className="bg-[#141414] border border-white/5 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02] text-[10px] uppercase tracking-wider text-[#dfb34c] font-black">
                  <th className="px-6 py-4">ID Transaksi</th>
                  <th className="px-6 py-4">Pelanggan</th>
                  <th className="px-6 py-4">Layanan</th>
                  <th className="px-6 py-4">Barber</th>
                  <th className="px-6 py-4">Metode</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.02] text-xs text-white/80">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.01] transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-[#dfb34c]">
                      #TX-{(10000 + item.id)}
                    </td>
                    <td className="px-6 py-4 font-medium text-white">{item.customer_name}</td>
                    <td className="px-6 py-4 text-[#8e8e9f]">{item.layanan}</td>
                    <td className="px-6 py-4 text-[#8e8e9f]">{item.barber}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-[#dfb34c]/10 text-[#dfb34c] border border-[#dfb34c]/20 uppercase">
                        {item.payment_method}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-white">
                      Rp {item.final_amount.toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/admin/transaction/${item.id}`}
                        className="inline-flex items-center gap-1 bg-white/5 hover:bg-white/10 text-white px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all"
                      >
                        <FaEye /> Detail Invoice
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
