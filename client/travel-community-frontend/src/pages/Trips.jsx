import React, { useState, useEffect } from "react";
import api from "../services/api";
import TripCard from "../components/TripCard";

const categories = ["All", "Beach", "Mountain", "Adventure", "Historical", "Wildlife", "Cultural"];

export default function Trips() {
  const [trips, setTrips] = useState([]);
  const [category, setCategory] = useState("All");
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/trip").then(res => setTrips(res.data)).catch(() => setError("Could not load trips."));
  }, []);

  const filtered = trips.filter(trip => category === "All" || trip.category === category);

  return (
    <main className="container py-5">
      <div className="section-heading">
        <span className="eyebrow">TRIPS</span>
        <h2>Community trips</h2>
      </div>
      <div className="d-flex flex-wrap gap-2 mb-4">
        {categories.map(item => (
          <button className={`btn ${category === item ? "btn-primary" : "btn-outline-secondary"}`} key={item} onClick={() => setCategory(item)}>
            {item}
          </button>
        ))}
      </div>
      {error && <div className="alert alert-warning">{error}</div>}
      {filtered.length === 0 ? <div className="empty-state">No trips available for this category.</div> : (
        <div className="row g-4">
          {filtered.map(trip => <div className="col-md-6 col-lg-4" key={trip._id}><TripCard trip={trip} /></div>)}
        </div>
      )}
    </main>
  );
}
