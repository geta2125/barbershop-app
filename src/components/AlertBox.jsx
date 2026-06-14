export default function AlertBox({ type, children }) {
    const isError = type === "error";
    return (
        <div className={`p-4 mb-4 text-sm rounded-xl border ${
            isError 
                ? "bg-red-50 text-red-800 border-red-200" 
                : "bg-green-50 text-green-800 border-green-200"
        }`}>
            {children}
        </div>
    );
}