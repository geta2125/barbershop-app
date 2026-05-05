export default function Loading() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-[#222323]">

            {/* SPINNER */}
            <div className="relative">
                <div className="w-14 h-14 border-4 border-[#A87C2D] border-t-transparent rounded-full animate-spin"></div>

                {/* ICON */}
                <span className="absolute inset-0 flex items-center justify-center text-[#D3CDC3] text-xl">
                </span>
            </div>

            {/* TEXT */}
            <p className="text-[#D3CDC3]/70 mt-4 text-sm tracking-wide">
                Preparing your style...
            </p>

        </div>
    );
}