import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [stats, setStats] = useState({});

  useEffect(() => {
    api.get("/dashboard").then(res => setStats(res.data));
  }, []);

  return (
    <main className="container py-5">
      <div className="section-heading">
        <span className="eyebrow">MANAGEMENT</span>
        <h2>{user?.role === "admin" ? "Admin Dashboard" : "Agent Management"}</h2>
        <p>Manage destinations, trips and booking workflows.</p>
      </div>

      <div className="row g-4">
        {[
          ["Users", stats.users, "Registered platform users"],
          ["Destinations", stats.destinations, "Available travel destinations"],
          ["Trips", stats.trips, "Community trips"],
          ["Bookings", stats.bookings, "Total booking records"]
        ].map(([title, value, desc]) => (
          <div className="col-md-6 col-lg-3" key={title}>
            <div className="stat-card">
              <span>{title}</span>
              <strong>{value ?? 0}</strong>
              <small>{desc}</small>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4 mt-2">
        <div className="col-md-6">
          <div className="dashboard-panel">
            <h4>Destination Management</h4>
            <p>Add, update or remove destinations.</p>
            <Link className="btn btn-primary" to="/manage/destination">Open</Link>
          </div>
        </div>
        <div className="col-md-6">
          <div className="dashboard-panel">
            <h4>Trip Management</h4>
            <p>Create and manage community trips.</p>
            <Link className="btn btn-primary" to="/manage/trip">Open</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
