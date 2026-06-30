import Avatar from "../Avatar"; // Menyesuaikan letak komponen avatar kamu

export default function ProfileCard({ name, role, email }) {
    return (
        <div className="bg-[#0D0C0B] border border-white/6 rounded-2xl p-6 text-center flex flex-col items-center relative overflow-hidden">
            <div className="w-full h-12 bg-gradient-to-r from-[#A87C2D]/20 via-transparent to-transparent absolute top-0 left-0" />
            <div className="mt-4 mb-3">
                <Avatar name={name} size="lg" />
            </div>
            <h3 className="text-base font-bold text-white">{name}</h3>
            <p className="text-xs text-[#A87C2D] font-medium uppercase tracking-widest mt-0.5">{role}</p>
            <p className="text-xs text-white/30 mt-2 font-mono">{email}</p>
        </div>
    );
}