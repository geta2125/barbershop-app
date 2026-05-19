export default function ChartCard({
    title,
    children
}) {

    return (

        <div className="
            bg-[#1b1b24]
            border border-[#242335]
            rounded-3xl
            p-6
        ">

            <h2 className="text-lg font-bold mb-5">
                {title}
            </h2>

            {children}

        </div>

    );

}