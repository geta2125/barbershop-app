import { useEffect, useState } from "react";
import { FaUserPlus, FaEnvelope, FaLock, FaUserTie, FaSearch, FaTimes, FaSave, FaUserShield, FaEdit, FaTrash } from "react-icons/fa";
import { usersAPI } from "../../services/usersAPI";
import Container from "../../components/Container";
import EmptyState from "../../components/EmptyState";
import PageHeader from "../../components/PageHeader";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");
  const [status, setStatus] = useState("Aktif");

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await usersAPI.fetchUsers();
      setUsers(data || []);
    } catch (err) {
      setError("Gagal memuat pengguna.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const openAddModal = () => {
    setIsEditMode(false);
    setEditUserId(null);
    setName("");
    setEmail("");
    setPassword("");
    setRole("Admin");
    setStatus("Aktif");
    setShowModal(true);
  };

  const openEditModal = (user) => {
    setIsEditMode(true);
    setEditUserId(user.id);
    setName(user.nama || user.name || "");
    setEmail(user.email || "");
    setPassword(""); // Keep blank unless resetting
    setRole(user.role || "Admin");
    setStatus(user.status || "Aktif");
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      if (isEditMode) {
        // Edit User
        const payload = { nama: name, email, role, status };
        if (password) {
          payload.password = password;
        }
        await usersAPI.updateUser(editUserId, payload);
        setSuccess("Pengguna berhasil diperbarui!");
      } else {
        // Add User
        if (!password) {
          setError("Password wajib diisi untuk pengguna baru!");
          setSaving(false);
          return;
        }
        await usersAPI.createUser({ nama: name, email, password, role, status });
        setSuccess("Pengguna baru berhasil ditambahkan!");
      }

      setShowModal(false);
      loadUsers();
    } catch (err) {
      setError(err.message || "Gagal menyimpan data pengguna.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus pengguna ini?");
    if (!confirmDelete) return;

    try {
      await usersAPI.deleteUser(id);
      setSuccess("Pengguna berhasil dihapus.");
      loadUsers();
    } catch (err) {
      setError("Gagal menghapus pengguna.");
    }
  };

  const filtered = users.filter(user =>
    (user.nama && user.nama.toLowerCase().includes(search.toLowerCase())) ||
    (user.email && user.email.toLowerCase().includes(search.toLowerCase())) ||
    (user.role && user.role.toLowerCase().includes(search.toLowerCase()))
  );

  const getRoleBadge = (role) => {
    switch (role) {
      case "Admin": return "bg-red-500/10 text-red-400 border border-red-500/20";
      case "Owner": return "bg-[#dfb34c]/10 text-[#dfb34c] border border-[#dfb34c]/20";
      case "Barber": return "bg-sky-500/10 text-sky-400 border border-sky-500/20";
      default: return "bg-gray-500/10 text-gray-400 border border-gray-500/20";
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] text-[#E5E5E5] space-y-6">
      <Container>
        <PageHeader title="Users Management" breadcrumb={["Dashboard", "Users"]}>
          <div className="flex items-center gap-2 bg-[#141414] border border-white/5 px-4 py-2 rounded-xl text-xs text-white/40">
            <FaUserShield className="text-[#dfb34c]" />
            <span className="text-[#dfb34c] font-bold">System Credentials</span>
          </div>
        </PageHeader>

        {error && <div className="mb-4 text-xs font-bold text-red-400 bg-red-500/10 p-3 rounded-xl">⚠️ {error}</div>}
        {success && <div className="mb-4 text-xs font-bold text-emerald-400 bg-emerald-500/10 p-3 rounded-xl">✓ {success}</div>}
        {loading && <div className="mb-4 text-xs text-[#dfb34c] animate-pulse">Memuat data pengguna...</div>}

        {/* CONTROLS */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#141414] border border-white/5 p-4 rounded-2xl shadow-md">
          <button
            onClick={openAddModal}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#dfb34c] hover:bg-[#BE9359] text-[#111116] font-black text-xs tracking-wider px-5 py-3.5 rounded-xl transition-all shadow-[0_4px_15px_rgba(223,179,76,0.15)]"
          >
            <FaUserPlus /> Tambah Pengguna
          </button>

          <div className="relative w-full sm:w-72">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-xs" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari pengguna..."
              className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#dfb34c]/60"
            />
          </div>
        </div>

        {/* GRID OF USERS */}
        {filtered.length === 0 ? (
          <EmptyState title="Pengguna tidak ditemukan" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((user) => (
              <div 
                key={user.id}
                className="bg-[#141414] border border-white/5 rounded-3xl p-5 flex flex-col justify-between gap-4 transition-all hover:border-[#dfb34c]/20"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                    {user.nama ? user.nama.charAt(0).toUpperCase() : user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white truncate">{user.nama || user.name || "N/A"}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-black tracking-wider uppercase ${getRoleBadge(user.role)}`}>
                        {user.role}
                      </span>
                    </div>
                    <p className="text-xs text-[#8e8e9f] flex items-center gap-1.5 truncate"><FaEnvelope className="text-white/20" /> {user.email}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-3 text-xs">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border uppercase ${
                    user.status === "Aktif"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-red-500/10 text-red-400 border-red-500/20"
                  }`}>
                    {user.status || "Aktif"}
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(user)}
                      className="p-2 bg-white/5 hover:bg-[#dfb34c]/10 text-white hover:text-[#dfb34c] border border-white/5 hover:border-[#dfb34c]/20 rounded-lg inline-flex transition-all text-xs"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="p-2 bg-red-500/5 hover:bg-red-500/10 text-red-400 border border-red-500/10 hover:border-red-500/20 rounded-lg inline-flex transition-all text-xs"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>

      {/* CREATE / EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#111116] border border-[#242335] rounded-3xl p-6 max-w-md w-full space-y-6 animate-in fade-in duration-200">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <h3 className="text-lg font-bold text-white font-poppins flex items-center gap-2">
                <FaUserPlus className="text-[#dfb34c]" /> {isEditMode ? "Edit Pengguna" : "Tambah Pengguna Baru"}
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-[#8e8e9f] hover:text-white transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase text-[#dfb34c] font-bold block">Nama Lengkap</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama Lengkap"
                  className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#dfb34c]/60"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase text-[#dfb34c] font-bold block">Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#dfb34c]/60"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase text-[#dfb34c] font-bold block">
                  Password {isEditMode && <span className="text-gray-500">(kosongkan jika tidak diubah)</span>}
                </label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#dfb34c]/60"
                  required={!isEditMode}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase text-[#dfb34c] font-bold block">User Role</label>
                  <select 
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Owner">Owner</option>
                    <option value="Barber">Barber</option>
                    <option value="Member">Member</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase text-[#dfb34c] font-bold block">Status Aktif</label>
                  <select 
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-white/5 text-white rounded-xl px-4 py-3 text-xs focus:outline-none"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Non-Aktif">Non-Aktif</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-[#dfb34c] text-[#111116] font-black text-xs tracking-wider py-4 rounded-xl hover:opacity-90 transition-all disabled:opacity-50"
              >
                {saving ? "MENYIMPAN..." : "SIMPAN USER"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}