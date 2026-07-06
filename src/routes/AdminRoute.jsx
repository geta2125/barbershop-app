import { Navigate, Outlet } from "react-router-dom";
import Loading from "../components/Loading";
import { useAuth } from "../contexts/auth-context";

export default function AdminRoute() {
    const { session, profile, loading } = useAuth();

    if (loading) return <Loading />;

    if (!session) {
        return <Navigate to="/login" replace />;
    }

    const r = String(profile?.role || "").toLowerCase();
    if (r !== "admin" && r !== "kasir" && r !== "cashier") {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}