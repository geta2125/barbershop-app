import { Outlet } from "react-router-dom";

export default function GuestLayout() {
    return (
        <div className="min-h-screen bg-[#0E0E0E] text-white">
            <Outlet />
        </div>
    );
}