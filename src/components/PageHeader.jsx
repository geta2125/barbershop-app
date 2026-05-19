export default function PageHeader({
    title,
    breadcrumb,
    children
}) {

    return (

        <div className="mb-8">

            <div className="
                flex flex-col lg:flex-row
                lg:justify-between
                lg:items-center
                gap-5
                bg-[#1b1b24]
                border border-[#242335]
                rounded-3xl
                px-8 py-7
            ">

                <div>

                    <h1 className="text-4xl font-black">
                        {title}
                    </h1>

                    <p className="text-sm text-[#8e8e9f] mt-2">
                        {breadcrumb.join(" / ")}
                    </p>

                </div>

                <div>
                    {children}
                </div>

            </div>

        </div>

    );

}