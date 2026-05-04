export default function PageHeader({ title, breadcrumb, children }) {
    return (
        <div className="mb-8">

            <div className="
                flex flex-col md:flex-row md:justify-between md:items-center 
                gap-4 
                px-6 py-5
                rounded-2xl
                bg-white/5 backdrop-blur-md
                border border-white/10
                shadow-md
            ">

                {/* LEFT */}
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
                        {title}
                    </h1>

                    <div className="text-[#D3CDC3]/60 text-sm mt-1">
                        {Array.isArray(breadcrumb)
                            ? breadcrumb.join(" / ")
                            : breadcrumb}
                    </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-3">
                    {children}
                </div>

            </div>

        </div>
    );
}