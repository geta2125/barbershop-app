import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth-context";

import { FiEye, FiEyeOff, FiUser, FiMail, FiLock, FiShield, FiPhone } from "react-icons/fi";
import { BiError } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Register() {
    const navigate = useNavigate();
    const { register } = useAuth(); 

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [dataForm, setDataForm] = useState({
        nama: "",
        email: "",
        phone: "",
        password: "",
        role: "member",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            const { error: registerError } = await register(
                dataForm.nama,
                dataForm.email,
                dataForm.password,
                dataForm.phone,
                dataForm.role
            );

            if (registerError) throw registerError;

            navigate("/login", {
                state: {
                    successMessage: "Registrasi berhasil. Silakan cek email atau langsung login.",
                    registeredEmail: dataForm.email,
                },
            });

        } catch (err) {
            setError(err.message || "Terjadi kesalahan saat mendaftar.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-sm mx-auto my-auto animate-in fade-in duration-300">
            {/* HEADER */}
            <h2 className="text-3xl font-bold text-white mb-1.5 tracking-tight">
                Buat Akun Baru
            </h2>
            <p className="text-sm text-gray-400 mb-6">
                Daftar dan bergabunglah dengan ekosistem premium GroomGold.
            </p>

            {/* ERROR ALERT */}
            {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 mb-4 p-3 rounded-xl flex items-center text-xs font-medium dynamic-fade">
                    <BiError className="mr-2 text-base flex-shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* NAMA LENGKAP */}
                <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                        Nama Lengkap
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                            <FiUser size={16} />
                        </span>
                        <input
                            name="nama"
                            type="text"
                            required
                            disabled={loading}
                            value={dataForm.nama}
                            onChange={handleChange}
                            placeholder="Masukkan nama lengkap"
                            className="w-full pl-11 pr-4 py-3 bg-[#141414] border border-white/5 rounded-xl text-white placeholder-gray-600 focus:border-[#A87C2D] focus:ring-2 focus:ring-[#A87C2D]/10 outline-none transition disabled:opacity-50 text-sm"
                        />
                    </div>
                </div>

                {/* EMAIL */}
                <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                        Alamat Email
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                            <FiMail size={16} />
                        </span>
                        <input
                            name="email"
                            type="email"
                            required
                            disabled={loading}
                            value={dataForm.email}
                            onChange={handleChange}
                            placeholder="Masukkan email"
                            className="w-full pl-11 pr-4 py-3 bg-[#141414] border border-white/5 rounded-xl text-white placeholder-gray-600 focus:border-[#A87C2D] focus:ring-2 focus:ring-[#A87C2D]/10 outline-none transition disabled:opacity-50 text-sm"
                        />
                    </div>
                </div>

                {/* NOMOR HP */}
                <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                        Nomor HP
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                            <FiPhone size={16} />
                        </span>
                        <input
                            name="phone"
                            type="tel"
                            required
                            disabled={loading}
                            value={dataForm.phone}
                            onChange={handleChange}
                            placeholder="08xxxxxxxxxx"
                            className="w-full pl-11 pr-4 py-3 bg-[#141414] border border-white/5 rounded-xl text-white placeholder-gray-600 focus:border-[#A87C2D] focus:ring-2 focus:ring-[#A87C2D]/10 outline-none transition disabled:opacity-50 text-sm"
                        />
                    </div>
                </div>

                {/* PASSWORD */}
                <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                        Kata Sandi
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                            <FiLock size={16} />
                        </span>
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            required
                            disabled={loading}
                            value={dataForm.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full pl-11 pr-12 py-3 bg-[#141414] border border-white/5 rounded-xl text-white placeholder-gray-600 focus:border-[#A87C2D] focus:ring-2 focus:ring-[#A87C2D]/10 outline-none transition disabled:opacity-50 text-sm"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#A87C2D]"
                        >
                            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                        </button>
                    </div>
                </div>

                {/* HAK AKSES / ROLE */}
                <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                        Hak Akses / Role
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none z-10">
                            <FiShield size={16} className="text-[#A87C2D]" />
                        </span>
                        <select
                            name="role"
                            value={dataForm.role}
                            onChange={handleChange}
                            disabled={loading}
                            className="w-full pl-11 pr-10 py-3 bg-[#141414] border border-white/5 rounded-xl text-white outline-none transition disabled:opacity-50 text-sm focus:border-[#A87C2D] focus:ring-2 focus:ring-[#A87C2D]/10 appearance-none cursor-pointer"
                        >
                            <option value="member" className="bg-[#141414] text-white">Member</option>
                            <option value="customer" className="bg-[#141414] text-white">Customer</option>
                            <option value="barber" className="bg-[#141414] text-white">Barber</option>
                            <option value="owner" className="bg-[#141414] text-white">Owner</option>
                            <option value="admin" className="bg-[#141414] text-white">Admin</option>
                        </select>
                    </div>
                </div>

                {/* BUTTON SUBMIT */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#A87C2D] hover:opacity-90 disabled:bg-[#A87C2D]/50 text-black font-bold py-3 rounded-xl transition transform active:scale-[0.99] flex items-center justify-center shadow-lg shadow-[#A87C2D]/10 disabled:pointer-events-none text-xs uppercase tracking-wider mt-2"
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <AiOutlineLoading3Quarters className="animate-spin text-black text-sm" />
                            Memproses...
                        </span>
                    ) : (
                        "Daftar"
                    )}
                </button>

                {/* LOGIN LINK */}
                <p className="text-center text-xs text-gray-500 pt-2">
                    Sudah memiliki akun?
                    <Link to="/login" className="text-[#A87C2D] font-semibold hover:underline ml-1">
                        Masuk di sini
                    </Link>
                </p>
            </form>
        </div>
    );
}
