import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import TripCard from "../components/TripCard";

const categories = ["All", "Beach", "Mountain", "Adventure", "Historical", "Wildlife", "Cultural"];

export default function Home() {
  const [trips, setTrips] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/trip")
      .then(res => setTrips(res.data))
      .catch(() => setError("Could not load trips. Start the backend server first."));
  }, []);

  const filteredTrips = trips.filter(trip => {
    const matchesCategory = category === "All" || trip.category === category;
    const term = search.toLowerCase();
    const matchesSearch =
      trip.title.toLowerCase().includes(term) ||
      trip.destination?.name?.toLowerCase().includes(term);
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <section className="hero-section">
        <div className="container py-5">
          <div className="row align-items-center min-vh-75">
            <div className="col-lg-7">
              <span className="hero-pill">TRAVEL • CONNECT • DISCOVER</span>
              <h1 className="display-3 fw-bold mt-3">Find your next journey with a community.</h1>
              <p className="lead mt-3">Discover destinations, join trips, plan adventures and connect travelers with trusted agents.</p>
              <div className="d-flex gap-2 flex-wrap mt-4">
                <Link to="/trips" className="btn btn-primary btn-lg">Explore Trips</Link>
                <Link to="/destinations" className="btn btn-outline-dark btn-lg">Browse Destinations</Link>
              </div>
            </div>
            <div className="col-lg-5 mt-4 mt-lg-0">
              <div className="hero-card">
                <div className="hero-emoji">🌍</div>
                <h3>One platform. Many journeys.</h3>
                <p className="mb-0">A community-driven travel experience for travelers, agents and administrators.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="container py-5">
        <div className="section-heading">
          <span className="eyebrow">COMMUNITY FEED</span>
          <h2>Discover trips by category</h2>
          <p>Use the category-based feed filter to quickly find the type of trip you want.</p>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <input
              className="form-control form-control-lg"
              placeholder="Search trip or destination..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="d-flex flex-wrap gap-2 mb-4">
          {categories.map(item => (
            <button
              key={item}
              className={`btn ${category === item ? "btn-primary" : "btn-outline-secondary"}`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {error && <div className="alert alert-warning">{error}</div>}
        {!error && filteredTrips.length === 0 && (
          <div className="empty-state">No trips match the selected category or search.</div>
        )}
        <div className="row g-4">
          {filteredTrips.map(trip => (
            <div className="col-md-6 col-lg-4" key={trip._id}>
              <TripCard trip={trip} />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
