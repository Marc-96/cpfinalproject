import React from "react";
import { Link } from "react-router-dom";

export default function DestinationCard({ destination }) {
  return (
    <div className="card h-100 shadow-sm destination-card">
      <div className="destination-icon">{destination.category === "Beach" ? "🏖️" : destination.category === "Mountain" ? "⛰️" : destination.category === "Wildlife" ? "🦋" : "🏛️"}</div>
      <div className="card-body">
        <span className="badge text-bg-light mb-2">{destination.category}</span>
        <h5>{destination.name}</h5>
        <p className="text-muted small">{destination.location}</p>
        <p>{destination.description}</p>
        <Link className="btn btn-outline-primary" to={`/destinations/${destination._id}`}>Explore</Link>
      </div>
    </div>
  );
}
