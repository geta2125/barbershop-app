import { FaStar, FaQuoteLeft } from "react-icons/fa";

export default function FeedbackCard({ customerName, comment, rating, date }) {
    return (
        <div className="bg-[#0D0C0B] border border-white/5 rounded-2xl p-5 relative">
            <FaQuoteLeft className="text-white/[0.02] text-5xl absolute top-3 right-4 pointer-events-none" />
            <div className="flex items-center justify-between mb-3">
                <div>
                    <h4 className="text-white font-bold text-sm">{customerName}</h4>
                    <p className="text-[10px] text-white/25">{date}</p>
                </div>
                <div className="flex items-center gap-0.5 text-amber-400 text-xs font-bold">
                    <FaStar /> <span>{rating}.0</span>
                </div>
            </div>
            <p className="text-xs text-white/60 leading-relaxed italic">"{comment}"</p>
        </div>
    );
}