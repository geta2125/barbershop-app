import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { ProtectedRoute, GuestRoute } from "./routes/RouteProtection";

// Layouts
import AdminLayout from "./layouts/AdminLayout";
import MemberLayout from "./layouts/MemberLayout";
// (Asumsikan OwnerLayout dan BarberLayout juga sudah dibuat)

// Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import MemberDashboard from "./pages/member/MemberDashboard";
import Users from "./pages/admin/Users";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rute untuk Guest (tidak perlu login) */}
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Rute untuk Admin */}
          <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<Users />} />
              {/* ...rute admin lainnya */}
            </Route>
          </Route>

          {/* Rute untuk Member */}
          <Route element={<ProtectedRoute allowedRoles={["Member"]} />}>
            <Route path="/member" element={<MemberLayout />}>
              <Route path="dashboard" element={<MemberDashboard />} />
              {/* ...rute member lainnya */}
            </Route>
          </Route>

          {/* Halaman utama / Landing Page */}
          <Route path="/" element={<LandingPage />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;