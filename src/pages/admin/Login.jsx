import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import AuthLayout from "../../layouts/AuthLayout";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    }
    // Redirect akan ditangani secara otomatis oleh GuestRoute dan useAuth

    setLoading(false);
  };

  return (
    <AuthLayout
      title="Selamat Datang Kembali"
      subtitle="Belum punya akun?"
      linkTo="/register"
      linkText="Daftar di sini"
    >
      <form onSubmit={handleLogin} className="space-y-6">
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <div>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-[#0d0d14] border border-[#2a2a3a] rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#dfb34c]" />
        </div>
        <div>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-[#0d0d14] border border-[#2a2a3a] rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#dfb34c]" />
        </div>
        <div>
          <button type="submit" disabled={loading} className="w-full bg-[#dfb34c] text-black font-bold py-3 px-4 rounded-lg hover:bg-[#c9a244] transition duration-300 disabled:opacity-50">
            {loading ? "Loading..." : "Login"}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}