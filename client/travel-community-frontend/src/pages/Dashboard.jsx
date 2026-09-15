import React from "react";
 import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [stats, setStats] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/dashboard").then(res => setStats(res.data)).catch(err => {
      setError(err.response?.data?.message || "Could not load dashboard");
    });
  }, []);

  const cards = [
    ["Destinations", stats.destinations ?? 0, "/destinations"],
    ["Trips", stats.trips ?? 0, "/trips"],
    ["Bookings", stats.myBookings ?? stats.bookings ?? 0, "/bookings"],
    ...(user?.role === "traveler" ? [["Trip Plans", stats.myPlans ?? 0, "/planning"]] : [])
  ];

  return (
    <main className="container py-5">
      <div className="section-heading">
        <span className="eyebrow">DASHBOARD</span>
        <h2>Hello, {user?.name}</h2>
        <p>Your role: <strong>{user?.role}</strong></p>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row g-4">
        {cards.map(([title, value, link]) => (
          <div className="col-sm-6 col-lg-3" key={title}>
            <Link to={link} className="text-decoration-none">
              <div className="stat-card">
                <span>{title}</span>
                <strong>{value}</strong>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="dashboard-panel mt-5">
        <h4>Quick actions</h4>
        <div className="d-flex flex-wrap gap-2 mt-3">
          <Link className="btn btn-primary" to="/trips">Find a Trip</Link>
          <Link className="btn btn-outline-primary" to="/destinations">Explore Destinations</Link>
          {user?.role === "traveler" && <Link className="btn btn-outline-primary" to="/planning">Plan a Trip</Link>}
          {(user?.role === "agent" || user?.role === "admin") && <Link className="btn btn-outline-primary" to="/admin">Manage Platform</Link>}
        </div>
      </div>
    </main>
  );
}
