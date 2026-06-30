import "./assets/tailwind.css";
import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";

const LandingPage = React.lazy(() => import("./pages/LandingPage"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const AuthLayout = React.lazy(() => import("./pages/auth/AuthLayout"));

const AdminDashboard = React.lazy(() => import("./pages/admin/AdminDashboard"));
const Booking = React.lazy(() => import("./pages/admin/Booking"));
const BookingDetail = React.lazy(() => import("./pages/admin/BookingDetail"));
const Services = React.lazy(() => import("./pages/admin/Services"));
const ServicesDetail = React.lazy(() => import("./pages/admin/ServicesDetail"));
const Customers = React.lazy(() => import("./pages/admin/Customers"));
const CustomersDetail = React.lazy(() => import("./pages/admin/CustomersDetail"));
const Membership = React.lazy(() => import("./pages/admin/Membership"));
const MembershipDetail = React.lazy(() => import("./pages/admin/MembershipDetail"));
const Feedback = React.lazy(() => import("./pages/admin/Feedback"));
const History = React.lazy(() => import("./pages/admin/History"));
const Barber = React.lazy(() => import("./pages/admin/Barber"));
const BarberDetail = React.lazy(() => import("./pages/admin/BarberDetail"));
const Loyalty = React.lazy(() => import("./pages/admin/Loyalty"));
const LoyaltyDetail = React.lazy(() => import("./pages/admin/LoyaltyDetail"));
const Transaction = React.lazy(() => import("./pages/admin/Transaction"));
const TransactionDetail = React.lazy(() => import("./pages/admin/TransactionDetail"));
const Settings = React.lazy(() => import("./pages/admin/Settings"));
const Logout = React.lazy(() => import("./pages/admin/Logout"));
const Users = React.lazy(() => import("./pages/admin/Users"));

const OwnerDashboard = React.lazy(() => import("./pages/owner/OwnerDashboard"));
const OwnerBooking = React.lazy(() => import("./pages/owner/Booking"));
const OwnerCustomers = React.lazy(() => import("./pages/owner/Customers"));
const OwnerServices = React.lazy(() => import("./pages/owner/Services"));
const OwnerBarber = React.lazy(() => import("./pages/owner/Barber"));
const OwnerMembership = React.lazy(() => import("./pages/owner/Membership"));
const OwnerFeedback = React.lazy(() => import("./pages/owner/Feedback"));

const BarberDashboard = React.lazy(() => import("./pages/barber/BarberDashboard"));
const BarberHistory = React.lazy(() => import("./pages/barber/BarberHistory"));
const BarberFeedback = React.lazy(() => import("./pages/barber/BarberFeedback"));
const BarberProfile = React.lazy(() => import("./pages/barber/BarberProfile"));

const MemberDashboard = React.lazy(() => import("./pages/member/MemberDashboard"));
const MemberBooking = React.lazy(() => import("./pages/member/MemberBooking"));
const MemberHistory = React.lazy(() => import("./pages/member/MemberHistory"));
const MemberMembership = React.lazy(() => import("./pages/member/MemberMembership"));
const MemberFeedback = React.lazy(() => import("./pages/member/MemberFeedback"));
const MemberProfile = React.lazy(() => import("./pages/member/MemberProfile"));

const GuestRoute = React.lazy(() => import("./routes/GuestRoute"));
const AdminRoute = React.lazy(() => import("./routes/AdminRoute"));
const OwnerRoute = React.lazy(() => import("./routes/OwnerRoute"));
const BarberRoute = React.lazy(() => import("./routes/BarberRoute"));
const MemberRoute = React.lazy(() => import("./routes/MemberRoute"));

const AdminLayout = React.lazy(() => import("./layouts/AdminLayout"));
const OwnerLayout = React.lazy(() => import("./layouts/OwnerLayout"));
const BarberLayout = React.lazy(() => import("./layouts/BarberLayout"));
const MemberLayout = React.lazy(() => import("./layouts/MemberLayout"));

function AdminPages() {
  return (
    <>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="booking" element={<Booking />} />
      <Route path="booking/:id" element={<BookingDetail />} />
      <Route path="services" element={<Services />} />
      <Route path="services/:id" element={<ServicesDetail />} />
      <Route path="customers" element={<Customers />} />
      <Route path="customers/:id" element={<CustomersDetail />} />
      <Route path="membership" element={<Membership />} />
      <Route path="membership/:id" element={<MembershipDetail />} />
      <Route path="feedback" element={<Feedback />} />
      <Route path="history" element={<History />} />
      <Route path="barbers" element={<Barber />} />
      <Route path="barbers/:id" element={<BarberDetail />} />
      <Route path="barber" element={<Barber />} />
      <Route path="barber/:id" element={<BarberDetail />} />
      <Route path="loyalty" element={<Loyalty />} />
      <Route path="loyalty/:id" element={<LoyaltyDetail />} />
      <Route path="transaction" element={<Transaction />} />
      <Route path="transaction/:id" element={<TransactionDetail />} />
      <Route path="settings" element={<Settings />} />
      <Route path="logout" element={<Logout />} />
      <Route path="users" element={<Users />} />
    </>
  );
}

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route element={<GuestRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
          </Route>
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            {AdminPages()}
          </Route>
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/booking/:id" element={<BookingDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServicesDetail />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers/:id" element={<CustomersDetail />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/membership/:id" element={<MembershipDetail />} />
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
        </Route>

        <Route element={<OwnerRoute />}>
          <Route path="/owner" element={<OwnerLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<OwnerDashboard />} />
            <Route path="booking" element={<OwnerBooking />} />
            <Route path="customers" element={<OwnerCustomers />} />
            <Route path="services" element={<OwnerServices />} />
            <Route path="barbers" element={<OwnerBarber />} />
            <Route path="membership" element={<OwnerMembership />} />
            <Route path="feedback" element={<OwnerFeedback />} />
            <Route path="history" element={<History />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        <Route element={<BarberRoute />}>
          <Route path="/barber" element={<BarberLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<BarberDashboard />} />
            <Route path="today-booking" element={<BarberDashboard />} />
            <Route path="history" element={<BarberHistory />} />
            <Route path="feedback" element={<BarberFeedback />} />
            <Route path="profile" element={<BarberProfile />} />
          </Route>
        </Route>

        <Route element={<MemberRoute />}>
          <Route path="/member" element={<MemberLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<MemberDashboard />} />
            <Route path="booking" element={<MemberBooking />} />
            <Route path="history" element={<MemberHistory />} />
            <Route path="membership" element={<MemberMembership />} />
            <Route path="feedback" element={<MemberFeedback />} />
            <Route path="profile" element={<MemberProfile />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
