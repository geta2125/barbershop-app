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

    useEffect(() => {
        dataAPI.fetchFeedbacks()
            .then(setFeedbacks)
            .catch((err) => setError(err.message || "Gagal memuat feedback."))
            .finally(() => setLoading(false));
    }, []);

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
                        {feedbacks.map((item) => (
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
                </div>
            </Container>
        </div>
    );
}
