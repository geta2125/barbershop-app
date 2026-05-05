import { FaSearch, FaPlus } from "react-icons/fa";
import { useState } from "react";
import dataBooking from "../data/databooking.json";
import dataServices from "../data/dataservices.json";

export default function Booking() {

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [bookings, setBookings] = useState(dataBooking);
    const [showForm, setShowForm] = useState(false);

    // fungsi ambil waktu sekarang
    const getNow = () => {
        const now = new Date();
        const offset = now.getTimezoneOffset();
        const local = new Date(now.getTime() - (offset * 60000));
        return local.toISOString().slice(0, 16);
    };

    const [form, setForm] = useState({
        nama_customer: "",
        barber: "",
        layanan: "",
        jadwal: getNow(),
        harga: "",
        status_booking: "Pending",
    });

    // HANDLE INPUT
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // HANDLE SUBMIT (FIX UTAMA)
    const handleSubmit = (e) => {
        e.preventDefault();

        const newBooking = {
            id_booking: Date.now(),
            ...form,
            harga: Number(form.harga),
        };

        console.log(newBooking); // debug

        setBookings(prev => [newBooking, ...prev]); 
        setShowForm(false);

        // reset form
        setForm({
            nama_customer: "",
            barber: "",
            layanan: "",
            jadwal: getNow(),
            harga: "",
            status_booking: "Pending",
        });
    };

    // FILTER DATA
    const filtered = bookings.filter(b => {
        const matchSearch = b.nama_customer.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === "All" || b.status_booking === statusFilter;
        return matchSearch && matchStatus;
    });

    return (
        <div className="ml-[260px] pt-[120px] px-7 pb-10 min-h-screen bg-[#0f0f0f] text-white">

            {/* HEADER */}
            <div className="mb-8 flex justify-between items-center">

                <h1 className="text-3xl font-bold">Booking</h1>

                <div className="flex gap-3">

                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="flex items-center gap-2 bg-[#A87C2D] px-4 py-2 rounded-xl"
                    >
                        <FaPlus /> Add
                    </button>

                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search..."
                        className="px-3 py-2 bg-[#1a1a1a] rounded-xl"
                    />

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 bg-[#1a1a1a] rounded-xl"
                    >
                        <option value="All">All</option>
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                        <option value="Canceled">Canceled</option>
                    </select>

                </div>
            </div>

            {/* FORM */}
            {showForm && (
                <form
                    onSubmit={handleSubmit}
                    className="mb-6 bg-[#1a1a1a] p-6 rounded-2xl grid grid-cols-2 gap-4"
                >
                    <input
                        name="nama_customer"
                        placeholder="Customer"
                        value={form.nama_customer}
                        onChange={handleChange}
                        className="p-2 bg-[#111] rounded"
                    />

                    <input
                        name="barber"
                        placeholder="Barber"
                        value={form.barber}
                        onChange={handleChange}
                        className="p-2 bg-[#111] rounded"
                    />

                    {/* SERVICE */}
                    <select
                        name="layanan"
                        value={form.layanan}
                        onChange={(e) => {
                            const selected = dataServices.find(
                                s => s.nama_service === e.target.value
                            );

                            if (!selected) return;

                            setForm(prev => ({
                                ...prev,
                                layanan: selected.nama_service,
                                harga: selected.harga
                            }));
                        }}
                        className="p-2 bg-[#111] rounded"
                    >
                        <option value="">Pilih Service</option>
                        {dataServices
                            .filter(s => s.status === "Aktif")
                            .map((s) => (
                                <option key={s.id} value={s.nama_service}>
                                    {s.nama_service}
                                </option>
                            ))}
                    </select>

                    {/* HARGA AUTO */}
                    <input
                        value={form.harga}
                        readOnly
                        className="p-2 bg-[#111] rounded text-gray-400"
                    />

                    {/* JADWAL */}
                    <input
                        type="datetime-local"
                        name="jadwal"
                        value={form.jadwal}
                        onChange={handleChange}
                        className="p-2 bg-[#111] rounded"
                    />

                    {/* STATUS */}
                    <select
                        name="status_booking"
                        value={form.status_booking}
                        onChange={handleChange}
                        className="p-2 bg-[#111] rounded"
                    >
                        <option>Pending</option>
                        <option>Completed</option>
                        <option>Canceled</option>
                    </select>

                    <button className="col-span-2 bg-[#A87C2D] py-2 rounded-xl">
                        Save Booking
                    </button>
                </form>
            )}

            {/* TABLE */}
            <table className="w-full text-sm bg-[#1a1a1a] rounded-2xl overflow-hidden">
                <thead className="bg-[#111] text-gray-400">
                    <tr>
                        <th className="p-4 text-left">Customer</th>
                        <th className="p-4 text-left">Barber</th>
                        <th className="p-4 text-left">Service</th>
                        <th className="p-4 text-left">Schedule</th>
                        <th className="p-4 text-left">Price</th>
                        <th className="p-4 text-left">Status</th>
                    </tr>
                </thead>

                <tbody>
                    {filtered.map((b) => (
                        <tr key={b.id_booking} className="border-t border-white/5">
                            <td className="p-4">{b.nama_customer}</td>
                            <td className="p-4">{b.barber}</td>
                            <td className="p-4">{b.layanan}</td>
                            <td className="p-4">{b.jadwal}</td>
                            <td className="p-4">Rp {b.harga.toLocaleString()}</td>
                            <td className="p-4">{b.status_booking}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}