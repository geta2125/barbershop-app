export default function Avatar({ name }) {

    const initial =
        name?.charAt(0)?.toUpperCase() || "?";

    return (
        <div
            className="
                w-12 h-12
                rounded-full
                bg-[#A87C2D]
                text-white
                flex items-center justify-center
                font-bold
            "
        >
            {initial}
        </div>
    );
}