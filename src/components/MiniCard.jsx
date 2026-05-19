export default function MiniCard({
    title,
    value,
    sub,
    icon,
    progressColor
}) {

    return (

        <div className="
            bg-[#1b1b24]
            border border-[#242335]
            rounded-3xl
            p-6
            flex justify-between items-center
        ">

            <div>

                <div className="
                    flex items-center gap-2
                    text-xs text-gray-400 mb-3
                ">
                    {icon}
                    <span>{title}</span>
                </div>

                <h3 className="text-3xl font-black">
                    {value}
                </h3>

                <p className="text-xs text-gray-500 mt-2">
                    {sub}
                </p>

            </div>

            <div className="w-14 h-14">

                <svg className="w-full h-full rotate-[-90deg]">

                    <circle
                        cx="28"
                        cy="28"
                        r="22"
                        className="stroke-[#111116]"
                        strokeWidth="5"
                        fill="transparent"
                    />

                    <circle
                        cx="28"
                        cy="28"
                        r="22"
                        stroke={progressColor}
                        strokeWidth="5"
                        fill="transparent"
                        strokeDasharray="138"
                        strokeDashoffset="40"
                        strokeLinecap="round"
                    />

                </svg>

            </div>

        </div>

    );

}