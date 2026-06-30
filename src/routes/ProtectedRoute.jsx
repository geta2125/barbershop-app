import { Navigate, Outlet } from "react-router-dom";
import Loading from "../components/Loading";
import { useAuth } from "../contexts/auth-context";

export default function ProtectedRoute() {
    const { session, loading } = useAuth();

    if (loading) return <Loading />;

    if (!session) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}