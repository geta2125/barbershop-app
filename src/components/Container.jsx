export default function Container({
    children,
    className = ""
}) {

    return (

        <div className={`w-full px-6 lg:px-10 py-8 ${className}`}>
            {children}
        </div>

    );

}