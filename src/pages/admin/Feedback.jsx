import { useEffect, useState } from "react";
import { FaCommentDots, FaStar } from "react-icons/fa";
import { dataAPI } from "../../services/dataAPI";
import Container from "../../components/Container";
import EmptyState from "../../components/EmptyState";
import PageHeader from "../../components/PageHeader";
import Table from "../../components/Table";

export default function Feedback() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        dataAPI.fetchFeedbacks()
            .then(setFeedbacks)
            .catch((err) => setError(err.message || "Gagal memuat feedback."))
            .finally(() => setLoading(false));
    }, []);

    const totalItems = feedbacks.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedFeedbacks = feedbacks.slice(startIndex, endIndex);

    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            let start = Math.max(1, currentPage - 2);
            let end = Math.min(totalPages, currentPage + 2);
            
            if (start === 1) {
                end = maxVisible;
            } else if (end === totalPages) {
                start = totalPages - maxVisible + 1;
            }
            
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
        }
        return pages;
    };

    return (
        <div className="w-full min-h-screen bg-[#080807] text-[#D3CDC3]">
            <Container>
                <PageHeader title="Feedback" breadcrumb={["Dashboard", "Feedback"]}>
                    <div className="flex items-center gap-2 bg-[#0D0C0B] border border-white/6 px-4 py-2 rounded-xl text-xs text-white/40">
                        <FaCommentDots className="text-[#A87C2D]" />
                        Customer Review
                    </div>
                </PageHeader>

                {error && <div className="mb-4 text-sm text-red-400">{error}</div>}
                {loading && <div className="mb-4 text-sm text-white/40">Memuat feedback...</div>}

                <div className="bg-[#0D0C0B] border border-white/6 rounded-2xl overflow-hidden">
                    <Table headers={["Customer", "Service", "Rating", "Review", "Tanggal"]}>
                        {paginatedFeedbacks.map((item) => (
                            <tr key={item.id} className="border-b border-white/[0.04]">
                                <td className="px-5 py-4 text-white">{item.customers?.name || "-"}</td>
                                <td className="px-5 py-4">{item.bookings?.services?.name || "-"}</td>
                                <td className="px-5 py-4">
                                    <span className="inline-flex items-center gap-1 text-[#A87C2D]">
                                        <FaStar /> {item.rating}
                                    </span>
                                </td>
                                <td className="px-5 py-4 max-w-md">{item.review || "-"}</td>
                                <td className="px-5 py-4">{item.created_at?.slice(0, 10) || "-"}</td>
                            </tr>
                        ))}
                    </Table>
                    {feedbacks.length === 0 && <EmptyState title="Belum ada feedback." />}

                    {/* PAGINATION */}
                    {totalPages > 1 && (
                        <div className="px-6 py-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/[0.01]">
                            <p className="text-xs text-[#8e8e9f]">
                                Menampilkan <span className="font-bold text-white">{startIndex + 1}</span> - <span className="font-bold text-white">{Math.min(endIndex, totalItems)}</span> dari <span className="font-bold text-white">{totalItems}</span> feedback
                            </p>
                            <div className="flex items-center gap-1.5">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(prev => prev - 1)}
                                    className="px-3 py-2 bg-[#1a1a1a] hover:bg-[#dfb34c]/10 text-white hover:text-[#dfb34c] border border-white/5 disabled:opacity-20 disabled:pointer-events-none rounded-xl text-xs font-bold transition-all"
                                >
                                    Sebelumnya
                                </button>
                                
                                {getPageNumbers().map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-9 h-9 border rounded-xl text-xs font-bold transition-all flex items-center justify-center ${
                                            currentPage === page
                                                ? "bg-[#dfb34c] text-[#111116] border-[#dfb34c] font-black"
                                                : "bg-[#1a1a1a] text-white border-white/5 hover:bg-white/5"
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}

                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(prev => prev + 1)}
                                    className="px-3 py-2 bg-[#1a1a1a] hover:bg-[#dfb34c]/10 text-white hover:text-[#dfb34c] border border-white/5 disabled:opacity-20 disabled:pointer-events-none rounded-xl text-xs font-bold transition-all"
                                >
                                    Selanjutnya
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
}
