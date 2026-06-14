import { usersAPI } from "../services/usersAPI";
import { useEffect, useState } from "react";

import AlertBox from "../components/AlertBox";
import Container from "../components/Container";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/Loading";
import PageHeader from "../components/PageHeader";
import UserCard from "../components/UserCard";

// ── Ikon SVG inline kecil ──────────────────────────────────────────────────
const IconUser = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
);
const IconMail = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
    </svg>
);
const IconLock = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
);
const IconPlus = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);
const IconPencil = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
    </svg>
);
const IconUsers = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
    </svg>
);
const IconX = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
);

// ── Field input dengan label + icon ──────────────────────────────────────
function Field({ icon, label, children }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-[0.2em] uppercase text-[#A87C2D]/70 font-semibold flex items-center gap-1.5">
                <span className="text-[#A87C2D]/50">{icon}</span>
                {label}
            </label>
            {children}
        </div>
    );
}

const inputCls =
    "w-full bg-[#141210] border border-white/8 text-[#D3CDC3] placeholder-white/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#A87C2D]/60 focus:ring-1 focus:ring-[#A87C2D]/30 transition-all duration-200";

const selectCls =
    "w-full bg-[#141210] border border-white/8 text-[#D3CDC3] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#A87C2D]/60 focus:ring-1 focus:ring-[#A87C2D]/30 transition-all duration-200 appearance-none cursor-pointer";

// ─────────────────────────────────────────────────────────────────────────────

export default function Users() {
    const [loading, setLoading] = useState(false);
    const [tableLoading, setTableLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [users, setUsers] = useState([]);
    
    // State kendukung Pop-up / Modal Mode
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editUserId, setEditUserId] = useState(null);

    const initialFormState = {
        nama: "",
        email: "",
        password: "",
        role: "Admin",
        status: "Aktif",
    };

    const [dataForm, setDataForm] = useState(initialFormState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataForm((prev) => ({ ...prev, [name]: value }));
    };

    const loadUsers = async () => {
        try {
            setTableLoading(true);
            const data = await usersAPI.fetchUsers();
            setUsers(data);
        } catch (err) {
            console.log(err);
            setError("Gagal memuat data user.");
        } finally {
            setTableLoading(false);
        }
    };

    useEffect(() => { loadUsers(); }, []);

    // Buka pop-up untuk Tambah Baru
    const handleOpenAddModal = () => {
        setError("");
        setSuccess("");
        setIsEditMode(false);
        setEditUserId(null);
        setDataForm(initialFormState);
        setIsOpenModal(true);
    };

    // Buka pop-up untuk Edit Data
    const handleEditClick = (user) => {
        setError("");
        setSuccess("");
        setIsEditMode(true);
        setEditUserId(user.id);
        setDataForm({
            nama: user.nama || "",
            email: user.email || "",
            password: user.password || "",
            role: user.role || "Admin",
            status: user.status || "Aktif",
        });
        setIsOpenModal(true);
    };

    // Tutup jendela pop-up
    const handleCloseModal = () => {
        setIsOpenModal(false);
        setIsEditMode(false);
        setEditUserId(null);
        setDataForm(initialFormState);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            setLoading(true);

            if (isEditMode) {
                await usersAPI.updateUser(editUserId, dataForm);
                setSuccess("Data user berhasil diperbarui");
            } else {
                await usersAPI.createUser(dataForm);
                setSuccess("User berhasil ditambahkan");
            }

            handleCloseModal(); // Tutup modal setelah sukses
            await loadUsers(); // Sinkronkan data terbaru

        } catch (err) {
            setError(err.message || "Gagal memproses data user");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = confirm("Yakin ingin menghapus user?");
        if (!confirmDelete) return;

        try {
            setLoading(true);
            await usersAPI.deleteUser(id);
            setSuccess("User berhasil dihapus");
            
            if (editUserId === id) {
                handleCloseModal();
            }

            await loadUsers();
        } catch (err) {
            setError(err.message || "Gagal menghapus user.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            {/* ── PAGE HEADER ── */}
            <PageHeader
                title="Manajemen User"
                breadcrumb={["Dashboard", "Users"]}
            />

            {/* ── TOP ACTION BAR & ALERTS ── */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <p className="text-xs text-white/50">Kelola hak akses kontrol, tambah, modifikasi, atau hapus user sistem.</p>
                </div>
                <button
                    onClick={handleOpenAddModal}
                    className="flex items-center justify-center gap-2 bg-[#A87C2D] hover:bg-[#c49535] text-white font-semibold rounded-xl px-5 py-2.5 text-sm transition-all duration-200 shadow-lg shadow-[#A87C2D]/10 active:scale-[0.98]"
                >
                    <IconPlus />
                    Tambah User Baru
                </button>
            </div>

            {error && <AlertBox type="error">{error}</AlertBox>}
            {success && <AlertBox type="success">{success}</AlertBox>}

            {/* ── DAFTAR USER ── */}
            <div className="flex items-center justify-between mb-5 mt-2">
                <div className="flex items-center gap-2.5 text-white">
                    <span className="text-[#A87C2D]"><IconUsers /></span>
                    <h3 className="font-semibold text-sm tracking-wide">Daftar User</h3>
                    {!tableLoading && (
                        <span className="bg-[#A87C2D]/15 border border-[#A87C2D]/25 text-[#A87C2D] text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {users.length}
                        </span>
                    )}
                </div>
                <div className="flex-1 h-[1px] bg-white/5 ml-4" />
            </div>

            {tableLoading && <LoadingSpinner text="Memuat data user..." />}

            {!tableLoading && users.length === 0 && (
                <EmptyState text="Belum ada user yang terdaftar." />
            )}

            {!tableLoading && users.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {users.map((user, index) => (
                        <UserCard
                            key={user.id || index}
                            user={user}
                            onDelete={() => handleDelete(user.id)}
                            onEdit={() => handleEditClick(user)}
                        />
                    ))}
                </div>
            )}

            {/* ── JENDELA POP-UP / MODAL DI SINI ── */}
            {isOpenModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
                    {/* Backdrop Buram Hitam Transparan */}
                    <div 
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                        onClick={handleCloseModal}
                    />

                    {/* Kotak Konten Pop-up */}
                    <div className="relative w-full max-w-lg bg-[#0D0C0B] border border-white/10 rounded-2xl p-6 overflow-hidden shadow-2xl shadow-black animate-in fade-in zoom-in-95 duration-200">
                        {/* Gold/Cyan Left Accent Line */}
                        <div className={`absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-transparent ${isEditMode ? "via-cyan-500" : "via-[#A87C2D]"} to-transparent pointer-events-none`} />

                        {/* Tombol Close Pojok Kanan Atas */}
                        <button 
                            onClick={handleCloseModal}
                            className="absolute top-4 right-4 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 p-1.5 rounded-lg transition-colors"
                        >
                            <IconX />
                        </button>

                        {/* Header Pop-up */}
                        <div className="flex items-center gap-3 mb-6 pr-8">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isEditMode ? "bg-cyan-500/10 border border-cyan-500/20 text-cyan-400" : "bg-[#A87C2D]/10 border border-[#A87C2D]/20 text-[#A87C2D]"}`}>
                                {isEditMode ? <IconPencil /> : <IconPlus />}
                            </div>
                            <div>
                                <h2 className="text-sm font-semibold text-white tracking-wide">
                                    {isEditMode ? "Modifikasi / Edit Data User" : "Tambah User Baru"}
                                </h2>
                                <p className="text-[10px] text-white/40 mt-0.5">
                                    {isEditMode ? "Ubah parameter akun lalu simpan pembaruan" : "Isi form berikut untuk membuat hak akses baru"}
                                </p>
                            </div>
                        </div>

                        {/* Form Isian */}
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <Field icon={<IconUser />} label="Nama Lengkap">
                                <input
                                    type="text"
                                    name="nama"
                                    placeholder="Contoh: Budi Santoso"
                                    value={dataForm.nama}
                                    onChange={handleChange}
                                    required
                                    className={inputCls}
                                />
                            </Field>

                            <Field icon={<IconMail />} label="Email">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="budi@example.com"
                                    value={dataForm.email}
                                    onChange={handleChange}
                                    required
                                    className={inputCls}
                                />
                            </Field>

                            <Field icon={<IconLock />} label="Password">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Min. 8 karakter"
                                    value={dataForm.password}
                                    onChange={handleChange}
                                    required
                                    className={inputCls}
                                />
                            </Field>

                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Role">
                                    <select name="role" value={dataForm.role} onChange={handleChange} className={selectCls}>
                                        <option value="Admin">Admin</option>
                                        <option value="Staff">Staff</option>
                                        <option value="Customer">Customer</option>
                                    </select>
                                </Field>

                                <Field label="Status">
                                    <select name="status" value={dataForm.status} onChange={handleChange} className={selectCls}>
                                        <option value="Aktif">Aktif</option>
                                        <option value="Nonaktif">Nonaktif</option>
                                    </select>
                                </Field>
                            </div>

                            {/* Tombol Aksi di bagian bawah pop-up */}
                            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="flex-1 bg-white/5 hover:bg-white/10 text-white/80 font-medium rounded-xl py-2.5 text-sm transition-all duration-200"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`flex-[2] flex items-center justify-center gap-2 ${isEditMode ? "bg-cyan-600 hover:bg-cyan-500" : "bg-[#A87C2D] hover:bg-[#c49535]"} disabled:bg-white/10 disabled:text-white/30 text-white font-semibold rounded-xl py-2.5 text-sm transition-all duration-200`}
                                >
                                    {loading ? (
                                        <>
                                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                                            </svg>
                                            Menyimpan...
                                        </>
                                    ) : isEditMode ? (
                                        <>
                                            <IconPencil />
                                            Simpan Perubahan
                                        </>
                                    ) : (
                                        <>
                                            <IconPlus />
                                            Daftarkan User
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Container>
    );
}