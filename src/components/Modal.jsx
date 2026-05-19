export default function Modal({
    children,
    show
}) {

    if (!show) return null;

    return (

        <div className="
            fixed inset-0
            bg-black/70
            flex items-center justify-center
            z-50
        ">

            <div className="
                bg-[#1b1b24]
                rounded-3xl
                p-6
                border border-[#242335]
            ">

                {children}

            </div>

        </div>

    );

}