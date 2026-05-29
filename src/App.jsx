import './assets/tailwind.css';
import { Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import Loading from "./components/Loading";

function App() {

  // LAZY IMPORT
  const Dashboard = React.lazy(() => import("./pages/Dashboard"));
  const Booking = React.lazy(() => import("./pages/Booking"));
  const BookingDetail = React.lazy(() => import("./pages/BookingDetail"));
  const Services = React.lazy(() => import("./pages/Services"));
  const ServicesDetail = React.lazy(() => import("./pages/ServicesDetail"));
  const Customers = React.lazy(() => import("./pages/Customers"));
  const CustomersDetail = React.lazy(() => import("./pages/CustomersDetail"));

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
          <Route path="/booking/:id" element={<BookingDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServicesDetail />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/:id" element={<CustomersDetail />} />
        </Route>

      </Routes>
    </Suspense>
  );
}

export default App;