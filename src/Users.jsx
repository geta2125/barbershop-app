import { useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import { userService } from "../../services/userService";
import { Plus, Trash2, Edit } from "lucide-react";
import UserForm from "./UserForm"; // Komponen form yang akan kita buat

export default function Users() {
  const { users, loading, error, refetch } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleAddNew = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEdit = (user) => {
    // Fungsi edit akan diimplementasikan nanti
    alert("Fungsi edit belum diimplementasikan.");
    // setEditingUser(user);
    // setIsModalOpen(true);
  };

  const handleDelete = async (userId, userName) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus pengguna "${userName}"?`)) {
      try {
        await userService.deleteUser(userId);
        alert("Pengguna berhasil dihapus.");
        refetch(); // Muat ulang data pengguna
      } catch (err) {
        alert(`Gagal menghapus pengguna: ${err.message}`);
      }
    }
  };

  const handleFormSuccess = () => {
    setIsModalOpen(false);
    refetch();
  };

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Manage Users</h1>
          <p className="text-gray-400">Tambah, edit, atau hapus data pengguna sistem.</p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-[#dfb34c] text-black font-bold py-2 px-4 rounded-lg hover:bg-[#c9a244] transition"
        >
          <Plus size={18} />
          Tambah Pengguna
        </button>
      </div>

      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="bg-[#1a1a26] border border-[#2a2a3a] rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-[#1f1f2e] text-xs text-gray-400 uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">Nama</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Role</th>
              <th scope="col" className="px-6 py-3">Tanggal Bergabung</th>
              <th scope="col" className="px-6 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-[#2a2a3a] hover:bg-[#1f1f2e]">
                <td className="px-6 py-4 font-medium text-white">{user.name}</td>
                <td className="px-6 py-4 text-gray-300">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    user.role === 'Admin' ? 'bg-red-900 text-red-300' : 
                    user.role === 'Owner' ? 'bg-yellow-900 text-yellow-300' :
                    'bg-blue-900 text-blue-300'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-400">
                  {new Date(user.created_at).toLocaleDateString("id-ID")}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button onClick={() => handleEdit(user)} className="text-blue-400 hover:text-blue-300 p-1"><Edit size={16} /></button>
                  <button onClick={() => handleDelete(user.id, user.name)} className="text-red-500 hover:text-red-400 p-1"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <UserForm
          user={editingUser}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}