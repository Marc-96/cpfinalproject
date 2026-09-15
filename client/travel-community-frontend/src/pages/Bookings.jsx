import React from "react";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function Bookings() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  async function load() {
    try {
      const res = await api.get("/booking");
      setItems(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load bookings");
    }
  }

  useEffect(() => { load(); }, []);

  async function updateStatus(id, status) {
    await api.put(`/booking/${id}`, { status });
    load();
  }

  return (
    <main className="container py-5">
      <div className="section-heading">
        <span className="eyebrow">BOOKINGS</span>
        <h2>{user?.role === "traveler" ? "My bookings" : "Booking management"}</h2>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {items.length === 0 ? <div className="empty-state">No bookings available.</div> : items.map(item => (
        <div className="list-card mb-3" key={item._id}>
          <div className="row align-items-center">
            <div className="col-lg-7">
              <h5>{item.trip?.title}</h5>
              <p className="small text-muted mb-1">{item.trip?.destination?.name} • {item.user?.name}</p>
              <p className="mb-0">{item.seats} seat(s) • ₹{item.totalAmount}</p>
            </div>
            <div className="col-lg-5 text-lg-end mt-3 mt-lg-0">
              <span className="badge text-bg-secondary me-2">{item.status}</span>
              {user?.role === "traveler" && item.status !== "Cancelled" && (
                <button className="btn btn-outline-danger btn-sm" onClick={() => updateStatus(item._id, "Cancelled")}>Cancel</button>
              )}
              {(user?.role === "agent" || user?.role === "admin") && item.status === "Pending" && (
                <>
                  <button className="btn btn-success btn-sm me-2" onClick={() => updateStatus(item._id, "Confirmed")}>Confirm</button>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => updateStatus(item._id, "Cancelled")}>Reject</button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </main>
  );
}
