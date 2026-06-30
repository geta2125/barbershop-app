import { Navigate, Outlet } from "react-router-dom";
import Loading from "../components/Loading";
import { useAuth } from "../contexts/auth-context";

export default function GuestRoute() {
    const { session, profile, loading } = useAuth();

    if (loading) return <Loading />;

    if (session && profile) {
        switch (profile.role) {
            case "admin":
                return <Navigate to="/admin/dashboard" replace />;
            case "owner":
                return <Navigate to="/owner/dashboard" replace />;
            case "barber":
                return <Navigate to="/barber/dashboard" replace />;
            case "member":
                return <Navigate to="/member/dashboard" replace />;
            default:
                return <Navigate to="/" replace />;
        }
    }

    return <Outlet />;
}