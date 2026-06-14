import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FiEye,
    FiEyeOff,
    FiUser,
    FiMail,
    FiLock,
    FiChevronDown,
    FiShield,
} from "react-icons/fi";
import { BiError } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { usersAPI } from "../../services/usersAPI";

const ROLES = [
    { value: "admin", label: "Admin" },
    { value: "staf", label: "Staff" },
    { value: "customer", label: "Customer" },
    { value: "guest", label: "Guest" },
];

export default function Register() {
    const navigate = useNavigate();
    const selectRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSelectOpen, setIsSelectOpen] = useState(false);

    const [dataForm, setDataForm] = useState({
        nama: "",
        email: "",
        password: "",
        role: "",
    });

    useEffect(() => {
        function handleClickOutside(event) {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsSelectOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRoleSelect = (roleValue) => {
        setDataForm((prev) => ({
            ...prev,
            role: roleValue,
        }));
        setIsSelectOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!dataForm.role) {
            setError("Silakan pilih role terlebih dahulu.");
            return;
        }

        try {
            setLoading(true);
            setError("");
            const payload = { ...dataForm, status: "aktif" };
            await usersAPI.register(payload);
            navigate("/login", {
                state: {
                    successMessage: "Akun berhasil dibuat, silakan login.",
                    registeredEmail: dataForm.email,
                },
            });
        } catch (err) {
            setError(err.response?.data?.message || "Pendaftaran gagal. Silakan coba lagi.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-sm mx-auto my-auto">
            {/* HEADER */}
            <h2 className="text-3xl font-bold text-white mb-1.5 tracking-tight">
                Buat Akun Baru
            </h2>
            <p className="text-sm text-gray-400 mb-6">
                Daftar dan bergabunglah dengan ekosistem premium GroomGold.
            </p>

            {/* ERROR ALERT */}
            {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 mb-4 p-3 rounded-xl flex items-center text-xs font-medium animate-in fade-in duration-200">
                    <BiError className="mr-2 text-base flex-shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                
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
                            className="w-full pl-11 pr-4 py-3 bg-[#141414] border border-white/5 rounded-xl text-white placeholder-gray-600 focus:border-[#dfb34c] focus:ring-2 focus:ring-[#dfb34c]/10 outline-none transition disabled:opacity-50"
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
                            className="w-full pl-11 pr-4 py-3 bg-[#141414] border border-white/5 rounded-xl text-white placeholder-gray-600 focus:border-[#dfb34c] focus:ring-2 focus:ring-[#dfb34c]/10 outline-none transition disabled:opacity-50"
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
                            className="w-full pl-11 pr-12 py-3 bg-[#141414] border border-white/5 rounded-xl text-white placeholder-gray-600 focus:border-[#dfb34c] focus:ring-2 focus:ring-[#dfb34c]/10 outline-none transition disabled:opacity-50"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#dfb34c]"
                        >
                            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                        </button>
                    </div>
                </div>

                {/* HAK AKSES / ROLE */}
                <div ref={selectRef}>
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                        Hak Akses / Role
                    </label>
                    <div className="relative">
                        <button
                            type="button"
                            disabled={loading}
                            onClick={() => setIsSelectOpen(!isSelectOpen)}
                            className={`w-full pl-11 pr-12 py-3 bg-[#141414] border rounded-xl text-left text-sm transition outline-none flex items-center justify-between disabled:opacity-50
                                ${isSelectOpen 
                                    ? "border-[#dfb34c] ring-2 ring-[#dfb34c]/10" 
                                    : "border-white/5 hover:border-white/10"
                                }`}
                        >
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                                <FiShield size={16} className={dataForm.role ? "text-[#dfb34c]" : "text-gray-500"} />
                            </span>
                            <span className={dataForm.role ? "text-white" : "text-gray-600"}>
                                {ROLES.find(r => r.value === dataForm.role)?.label || "Pilih hak akses"}
                            </span>
                            <FiChevronDown className={`text-gray-500 transition-transform duration-200 ${isSelectOpen ? "rotate-180 text-[#dfb34c]" : ""}`} size={16} />
                        </button>

                        {isSelectOpen && (
                            <div className="absolute z-50 w-full mt-2 bg-[#141414] border border-white/10 rounded-xl p-1.5 shadow-2xl max-h-48 overflow-y-auto animate-in fade-in duration-150">
                                {ROLES.map((role) => {
                                    const isSelected = dataForm.role === role.value;
                                    return (
                                        <button
                                            key={role.value}
                                            type="button"
                                            onClick={() => handleRoleSelect(role.value)}
                                            className={`w-full text-left rounded-lg py-2.5 px-3 text-xs font-medium transition-all flex items-center justify-between
                                                ${isSelected 
                                                    ? "bg-[#dfb34c]/10 text-[#dfb34c] font-semibold" 
                                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                                }`}
                                        >
                                            <span>{role.label}</span>
                                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#dfb34c]" />}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* BUTTON SUBMIT */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#dfb34c] hover:opacity-90 disabled:bg-[#dfb34c]/50 text-black font-bold py-3 rounded-xl transition transform active:scale-[0.99] flex items-center justify-center shadow-lg shadow-[#dfb34c]/10 disabled:pointer-events-none text-xs uppercase tracking-wider pt-3"
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
                <p className="text-center text-xs text-gray-500 pt-1">
                    Sudah memiliki akun?
                    <Link to="/login" className="text-[#dfb34c] font-semibold hover:underline ml-1">
                        Masuk di sini
                    </Link>
                </p>
            </form>
        </div>
    );
}