import { FaCalendarAlt } from "react-icons/fa";
import { useState } from "react";

export default function Header() {
    // State untuk mengontrol komponen toggle switch (on/off)
    const [isToggle, setIsToggle] = useState(false);

    return (
        /* bg-[#111116] di bawah ini bikin warna dasar Header jadi hitam pekat elegan, 
           dan border-b border-[#1a1a24] sebagai garis pembatas bawah yang tipis 
        */
        <div className="fixed top-0 left-60 right-0 h-20 bg-[#111116] border-b border-[#1a1a24] z-40 flex items-center justify-between px-8 select-none">

            {/* SISI KIRI: JUDUL HALAMAN & BADGE TANGGAL */}
            <div className="flex items-center gap-6">
                <h1 className="text-2xl font-bold text-white tracking-wide">
                    GroomGold
                </h1>

                {/* Kotak Date Picker (Warna disesuaikan jadi kontras di atas hitam) */}
                <div className="flex items-center gap-3 bg-[#1b1b24] px-3.5 py-2 rounded-lg border border-white/[0.01] text-[#8e8e9f] text-xs cursor-pointer hover:bg-[#23232f] transition">
                    <span className="font-medium">01.06.2023-31.06.2023</span>
                    <FaCalendarAlt className="text-[#8e8e9f]/80 text-xs" />
                </div>
            </div>

            {/* SISI KANAN: TOGGLE SWITCH & IDENTITAS USER */}
            <div className="flex items-center gap-8">

                {/* Toggle Switch (Warna background tombol disesuaikan jadi kontras di atas hitam) */}
                <div
                    onClick={() => setIsToggle(!isToggle)}
                    className="w-11 h-6 flex items-center bg-[#1b1b24] rounded-full p-1 cursor-pointer border border-white/[0.01]"
                >
                    <div className={`w-4 h-4 rounded-full shadow-md transform transition-all duration-200 ${isToggle ? 'translate-x-5 bg-[#dfb34c]' : 'translate-x-0 bg-gray-500'
                        }`} />
                </div>

                {/* Profil User (Jane Cooper) */}
                <div className="flex items-center gap-3">
                    <img
                        src="img/cewe.jpg"
                        alt="Jane Cooper"
                        className="w-8 h-8 rounded-full object-cover border border-white/10"
                    />
                    <span className="text-sm font-medium text-white tracking-wide">
                        Jane Cooper
                    </span>
                </div>

            </div>
        </div>
    );
}