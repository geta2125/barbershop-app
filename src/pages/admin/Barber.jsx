import { useEffect, useState } from "react";
import { FaPlus, FaSearch, FaTrash, FaUserTie } from "react-icons/fa";
import { dataAPI } from "../../services/dataAPI";
import Container from "../../components/Container";
import EmptyState from "../../components/EmptyState";
import Modal from "../../components/Modal";
import PageHeader from "../../components/PageHeader";
import Table from "../../components/Table";

const inputCls = "w-full bg-[#0D0C0B] border border-white/8 text-[#D3CDC3] placeholder-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#A87C2D]/60";

export default function Barber() {
    const [barbers, setBarbers] = useState([]);
    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        name: "",
        specialty: "",
        experience_year: 0,
        phone: "",
        rating: 0,
        status: true,
    });

    const loadBarbers = async () => {
        try {
            setLoading(true);
            setError("");
            setBarbers(await dataAPI.fetchBarbers());
        } catch (err) {
            setError(err.message || "Gagal memuat barber.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBarbers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dataAPI.saveBarber(form);
        setForm({ name: "", specialty: "", experience_year: 0, phone: "", rating: 0, status: true });
        setShowForm(false);
        await loadBarbers();
    };

    const filtered = barbers.filter((barber) =>
        barber.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="w-full min-h-screen bg-[#080807] text-[#D3CDC3]">
            <Container>
                <PageHeader title="Barbers" breadcrumb={["Dashboard", "Barbers"]}>
                    <div className="flex items-center gap-2 bg-[#0D0C0B] border border-white/6 px-4 py-2 rounded-xl text-xs text-white/40">
                        <FaUserTie className="text-[#A87C2D]" />
                        Barber Management
                    </div>
                </PageHeader>

                {error && <div className="mb-4 text-sm text-red-400">{error}</div>}
                {loading && <div className="mb-4 text-sm text-white/40">Memuat barber...</div>}

                <div className="flex flex-col sm:flex-row justify-between gap-3 mb-6">
                    <button onClick={() => setShowForm(true)} className="flex items-center justify-center gap-2 bg-[#A87C2D] hover:bg-[#c49535] text-white font-semibold text-sm px-5 py-2.5 rounded-xl">
                        <FaPlus className="text-xs" /> Tambah Barber
                    </button>
                    <div className="relative">
                        <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20 text-xs" />
                        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari barber..." className={`${inputCls} pl-9`} />
                    </div>
                </div>

                <Modal show={showForm}>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-[680px] max-w-[85vw]">
                        <input className={inputCls} required placeholder="Nama barber" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                        <input className={inputCls} placeholder="Specialty" value={form.specialty} onChange={(e) => setForm({ ...form, specialty: e.target.value })} />
                        <input className={inputCls} type="number" placeholder="Experience year" value={form.experience_year} onChange={(e) => setForm({ ...form, experience_year: e.target.value })} />
                        <input className={inputCls} placeholder="Phone number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                        <input className={inputCls} type="number" min="0" max="5" step="0.1" placeholder="Rating" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} />
                        <select className={inputCls} value={String(form.status)} onChange={(e) => setForm({ ...form, status: e.target.value === "true" })}>
                            <option value="true">Aktif</option>
                            <option value="false">Nonaktif</option>
                        </select>
                        <button type="button" onClick={() => setShowForm(false)} className="py-2.5 rounded-xl bg-white/5 border border-white/8 text-white/50">Batal</button>
                        <button type="submit" className="py-2.5 rounded-xl bg-[#A87C2D] text-white font-semibold">Simpan Barber</button>
                    </form>
                </Modal>

                <div className="bg-[#0D0C0B] border border-white/6 rounded-2xl overflow-hidden">
                    <Table headers={["Nama", "Specialty", "Experience", "Phone", "Rating", "Status", ""]}>
                        {filtered.map((barber) => (
                            <tr key={barber.id} className="border-b border-white/[0.04]">
                                <td className="px-5 py-4 text-white">{barber.name}</td>
                                <td className="px-5 py-4">{barber.specialty || "-"}</td>
                                <td className="px-5 py-4">{barber.experience_year} tahun</td>
                                <td className="px-5 py-4">{barber.phone || "-"}</td>
                                <td className="px-5 py-4">{barber.rating}</td>
                                <td className="px-5 py-4">{barber.status ? "Aktif" : "Nonaktif"}</td>
                                <td className="px-5 py-4 text-right">
                                    <button onClick={async () => { await dataAPI.deleteBarber(barber.id); await loadBarbers(); }} className="text-red-400">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </Table>
                    {filtered.length === 0 && <EmptyState title="Tidak ada barber ditemukan." />}
                </div>
            </Container>
        </div>
    );
}
