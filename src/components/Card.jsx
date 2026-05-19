export default function Card({
    title,
    value,
    subValue,
    icon
}) {

    return (

        <div className="
            bg-[#1b1b24]
            border border-[#242335]
            rounded-3xl
            p-6
            hover:border-[#dfb34c]/20
            transition duration-300
        ">

            <div className="flex justify-between items-center mb-5">

                <span className="text-sm text-gray-400">
                    {title}
                </span>

                <div className="text-[#dfb34c] text-lg">
                    {icon}
                </div>

            </div>

            <h2 className="text-5xl font-black mb-2">
                {value}
            </h2>

            <p className="text-xs text-gray-500">
                {subValue}
            </p>

        </div>

    );

}