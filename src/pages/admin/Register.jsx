import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import AuthLayout from "../../layouts/AuthLayout";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName, // Kirim nama lengkap ke metadata
        },
      },
    });

    if (error) {
      setError(error.message);
    } else if (data.user) {
      setMessage("Registrasi berhasil! Silakan cek email Anda untuk verifikasi.");
    }

    setLoading(false);
  };

  return (
    <AuthLayout
      title="Buat Akun Baru"
      subtitle="Sudah punya akun?"
      linkTo="/login"
      linkText="Login di sini"
    >
      <form onSubmit={handleRegister} className="space-y-6">
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {message && <p className="text-green-500 text-sm text-center">{message}</p>}
        <div>
          <input type="text" placeholder="Nama Lengkap" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="w-full bg-[#0d0d14] border border-[#2a2a3a] rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#dfb34c]" />
        </div>
        <div>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-[#0d0d14] border border-[#2a2a3a] rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#dfb34c]" />
        </div>
        <div>
          <input type="password" placeholder="Password (minimal 6 karakter)" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-[#0d0d14] border border-[#2a2a3a] rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#dfb34c]" />
        </div>
        <div>
          <button type="submit" disabled={loading || message} className="w-full bg-[#dfb34c] text-black font-bold py-3 px-4 rounded-lg hover:bg-[#c9a244] transition duration-300 disabled:opacity-50">
            {loading ? "Membuat Akun..." : "Daftar"}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}