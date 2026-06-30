import { Navigate, Outlet } from "react-router-dom";
import Loading from "../components/Loading";
import { useAuth } from "../contexts/auth-context";

export default function AdminRoute() {
    const { session, profile, loading } = useAuth();

    if (loading) return <Loading />;

    if (!session) {
        return <Navigate to="/login" replace />;
    }

    if (profile?.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}