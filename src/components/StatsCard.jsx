export default function StatsCard({
    title,
    value
}) {

    return (

        <div className="
            bg-[#1b1b24]
            p-5
            rounded-2xl
            border border-[#242335]
        ">

            <p className="text-gray-400 text-sm">
                {title}
            </p>

            <h2 className="text-3xl font-black mt-2">
                {value}
            </h2>

        </div>

    );

}