export default function PageHeader({ title, breadcrumb, children }) {
    return (
        <div className="mb-6 select-none">

            {/* - bg-[#1b1b24] mengubah background menjadi abu-hitam solid, kontras di atas bg utama dashboard.
              - border-[#242335] menyamakan warna garis pembatas dengan elemen lainnya.
              - Efek backdrop-blur dan shadow dibuang agar murni berkonsep FLAT dan bersih.
            */}
            <div className="
                flex flex-col md:flex-row md:justify-between md:items-center 
                gap-4 
                px-6 py-5
                rounded-2xl
                bg-[#1b1b24]
                border border-[#242335]
            ">

                {/* LEFT: TITLE & BREADCRUMB */}
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide">
                        {title}
                    </h1>

                    {/* Mengubah warna teks breadcrumb menjadi abu-abu redup agar hierarki visualnya pas */}
                    <div className="text-[#8e8e9f] text-xs mt-1.5 font-medium tracking-wide">
                        {Array.isArray(breadcrumb)
                            ? breadcrumb.join("  /  ")
                            : breadcrumb}
                    </div>
                </div>

                {/* RIGHT: ACTION BUTTONS (Sebut saja tombol tambah, filter, dll) */}
                <div className="flex items-center gap-3">
                    {children}
                </div>

            </div>

        </div>
    );
}