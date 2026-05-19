export default function Badge({
    children,
    type = "success"
}) {

    const types = {
        success: "bg-green-500/20 text-green-400",
        danger: "bg-red-500/20 text-red-400",
        warning: "bg-yellow-500/20 text-yellow-400",
    };

    return (

        <span className={`
            px-3 py-1
            rounded-full
            text-xs font-bold
            ${types[type]}
        `}>
            {children}
        </span>

    );

}