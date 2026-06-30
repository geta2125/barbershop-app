import { FaUserGem, FaEnvelope, FaPhoneAlt, FaCalendarCheck } from "react-icons/fa";

export default function CustomerDetail({ customer }) {
    if (!customer) return null;

    return (
        <div className="bg-[#0D0C0B] border border-white/6 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 pb-6 border-b border-white/5 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#A87C2D] to-amber-900 flex items-center justify-center text-white text-xl font-black">
                    {customer.Nama_Lengkap?.[0]?.toUpperCase()}
                </div>
                <div className="text-center sm:text-left">
                    <h3 className="text-base font-bold text-white">{customer.Nama_Lengkap}</h3>
                    <p className="text-xs text-white/30 font-mono mt-0.5">ID: #{customer.ID_Customer}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="flex items-center gap-3 p-3 bg-[#080807] rounded-xl border border-white/[0.03]">
                    <FaEnvelope className="text-[#A87C2D]" />
                    <div>
                        <p className="text-white/30 text-[9px] uppercase tracking-wider">Email</p>
                        <p className="text-white font-medium mt-0.5">{customer.Email}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#080807] rounded-xl border border-white/[0.03]">
                    <FaPhoneAlt className="text-[#A87C2D]" />
                    <div>
                        <p className="text-white/30 text-[9px] uppercase tracking-wider">No. Handphone</p>
                        <p className="text-white font-medium mt-0.5">+{customer.No_HP}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#080807] rounded-xl border border-white/[0.03]">
                    <FaUserGem className="text-[#A87C2D]" />
                    <div>
                        <p className="text-white/30 text-[9px] uppercase tracking-wider">Membership</p>
                        <p className="text-white font-medium mt-0.5">{customer.Level_Membership} ({customer.Status_Member})</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#080807] rounded-xl border border-white/[0.03]">
                    <FaCalendarCheck className="text-[#A87C2D]" />
                    <div>
                        <p className="text-white/30 text-[9px] uppercase tracking-wider">Status Akun</p>
                        <p className={`font-bold mt-0.5 ${customer.Status_Aktif === "Aktif" ? "text-emerald-400" : "text-red-400"}`}>{customer.Status_Aktif}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}