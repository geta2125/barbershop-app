import './assets/tailwind.css';
import { Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import Loading from "./components/Loading";

function App() {

  // LAZY IMPORT
  const LandingPage = React.lazy(() => import("./pages/LandingPage"));

  const Dashboard = React.lazy(() => import("./pages/Dashboard"));
  const Booking = React.lazy(() => import("./pages/Booking"));
  const BookingDetail = React.lazy(() => import("./pages/BookingDetail"));
  const Services = React.lazy(() => import("./pages/Services"));
  const ServicesDetail = React.lazy(() => import("./pages/ServicesDetail"));
  const Customers = React.lazy(() => import("./pages/Customers"));
  const CustomersDetail = React.lazy(() => import("./pages/CustomersDetail"));
  const Membership = React.lazy(() => import("./pages/Membership"));
  const Feedback = React.lazy(() => import("./pages/Feedback"));
  const History = React.lazy(() => import("./pages/History.jsx"));
  const Barber = React.lazy(() => import("./pages/Barber"));
  const BarberDetail = React.lazy(() => import("./pages/BarberDetail"));
  const Loyalty = React.lazy(() => import("./pages/Loyalty"));
  const LoyaltyDetail = React.lazy(() => import("./pages/LoyaltyDetail"));
  const Transaction = React.lazy(() => import("./pages/Transaction"));
  const TransactionDetail = React.lazy(() => import("./pages/TransactionDetail"));
  const Settings = React.lazy(() => import("./pages/Settings"));
  const Logout = React.lazy(() => import("./pages/Logout"));
  const Users = React.lazy(() => import("./pages/Users"));
  const Login = React.lazy(() => import("./pages/auth/Login"));
  const Register = React.lazy(() => import("./pages/auth/Register"));
  const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

  const AuthLayout = React.lazy(() => import("./pages/auth/AuthLayout"));
  const MainLayout = React.lazy(() => import("./layouts/MainLayout"));

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* LANDING PAGE */}
        <Route
          path="/"
          element={<LandingPage />}
        />

        {/* AUTH */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        {/* MAIN */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/booking/:id" element={<BookingDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServicesDetail />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/:id" element={<CustomersDetail />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/history" element={<History />} />
          <Route path="/barber" element={<Barber />} />
          <Route path="/barber/:id" element={<BarberDetail />} />
          <Route path="/loyalty" element={<Loyalty />} />
          <Route path="/loyalty/:id" element={<LoyaltyDetail />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/transaction/:id" element={<TransactionDetail />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/users" element={<Users />} />
        </Route>

      </Routes>
    </Suspense>
  );
}

export default App;