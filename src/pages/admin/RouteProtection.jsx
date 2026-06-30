import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

/**
 * Komponen untuk melindungi rute yang memerlukan otentikasi dan role tertentu.
 * @param {{ allowedRoles: string[] }} props
 */
export function ProtectedRoute({ allowedRoles }) {
  const { session, userProfile, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Atau tampilkan skeleton/spinner
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userProfile?.role)) {
    // Jika role tidak diizinkan, arahkan ke halaman "unauthorized" atau dashboard default
    return <Navigate to="/" replace />; // Sebaiknya ada halaman 403 Unauthorized
  }

  return <Outlet />; // Render halaman jika otentikasi dan otorisasi berhasil
}

/**
 * Komponen untuk rute yang hanya bisa diakses oleh guest (pengguna belum login).
 * Contoh: Halaman Login, Register.
 */
export function GuestRoute() {
  const { session, userProfile, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (session) {
    const homePath = `/${userProfile?.role?.toLowerCase()}/dashboard` || "/";
    return <Navigate to={homePath} replace />;
  }

  return <Outlet />;
}