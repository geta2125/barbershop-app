import './assets/tailwind.css';
import { Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import Loading from "./components/Loading";

function App() {

  // LAZY IMPORT
  const Dashboard = React.lazy(() => import("./pages/Dashboard"));
  const Booking = React.lazy(() => import("./pages/Booking"));
  const Services = React.lazy(() => import("./pages/Services"));

  const Login = React.lazy(() => import("./pages/auth/Login"));
  const Register = React.lazy(() => import("./pages/auth/Register"));
  const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

  const AuthLayout = React.lazy(() => import("./pages/auth/AuthLayout"));
  const MainLayout = React.lazy(() => import("./layouts/MainLayout"));

  return (
    <Suspense fallback={<Loading />}>
      <Routes>

        {/* AUTH */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        {/* MAIN */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/services" element={<Services />} />
        </Route>

      </Routes>
    </Suspense>
  );
}

export default App;