import { useState } from "react";
import { userService } from "../../services/userService";

export default function UserForm({ user, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    role: user?.role || "Member",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.password) {
      setError("Password wajib diisi untuk pengguna baru.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await userService.createUser(formData);
      alert("Pengguna baru berhasil dibuat!");
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-[#1a1a26] rounded-lg p-8 w-full max-w-md border border-[#2a2a3a]">
        <h2 className="text-xl font-bold mb-4">Tambah Pengguna Baru</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          <input type="text" name="name" placeholder="Nama Lengkap" value={formData.name} onChange={handleChange} required className="w-full bg-[#0d0d14] border border-[#2a2a3a] rounded-lg p-3 text-white focus:ring-1 focus:ring-[#dfb34c]" />
          
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full bg-[#0d0d14] border border-[#2a2a3a] rounded-lg p-3 text-white focus:ring-1 focus:ring-[#dfb34c]" />
          
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full bg-[#0d0d14] border border-[#2a2a3a] rounded-lg p-3 text-white focus:ring-1 focus:ring-[#dfb34c]" />

          <select name="role" value={formData.role} onChange={handleChange} className="w-full bg-[#0d0d14] border border-[#2a2a3a] rounded-lg p-3 text-white focus:ring-1 focus:ring-[#dfb34c]">
            <option value="Member">Member</option>
            <option value="Barber">Barber</option>
            <option value="Owner">Owner</option>
            <option value="Admin">Admin</option>
          </select>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 bg-gray-700 rounded-lg hover:bg-gray-600"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="py-2 px-4 bg-[#dfb34c] text-black font-bold rounded-lg hover:bg-[#c9a244] disabled:opacity-50"
            >
              {loading ? "Menyimpan..." : "Simpan Pengguna"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}