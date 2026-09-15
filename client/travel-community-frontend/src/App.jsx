import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Destinations from "./pages/Destinations";
import DestinationDetails from "./pages/DestinationDetails";
import Trips from "./pages/Trips";
import TripDetails from "./pages/TripDetails";
import Planning from "./pages/Planning";
import Bookings from "./pages/Bookings";
import Activity from "./pages/Activity";
import AdminDashboard from "./pages/AdminDashboard";
import ManageDestination from "./pages/ManageDestination";
import ManageTrip from "./pages/ManageTrip";

function NotFound() {
  return <main className="container py-5"><div className="empty-state"><h3>Page not found</h3><p>Return to the home page and continue exploring.</p></div></main>;
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destinations/:id" element={<DestinationDetails />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/trips/:id" element={<TripDetails />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/activity" element={<Activity />} />
        </Route>

        <Route element={<ProtectedRoute roles={["traveler"]} />}>
          <Route path="/planning" element={<Planning />} />
        </Route>

        <Route element={<ProtectedRoute roles={["agent", "admin"]} />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/manage/destination" element={<ManageDestination />} />
          <Route path="/manage/trip" element={<ManageTrip />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
