import { Navigate, Outlet } from "react-router-dom";
import Loading from "../components/Loading";
import { useAuth } from "../contexts/auth-context";

export default function BarberRoute() {
    const { session, profile, loading } = useAuth();

    if (loading) return <Loading />;

    if (!session) {
        return <Navigate to="/login" replace />;
    }

    if (profile?.role !== "barber") {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}