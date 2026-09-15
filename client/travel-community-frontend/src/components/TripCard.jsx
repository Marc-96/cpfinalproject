import React from "react";
import { Link } from "react-router-dom";

export default function TripCard({ trip }) {
  return (
    <div className="card h-100 trip-card shadow-sm">
      <div className="card-body">
        <span className="badge text-bg-light mb-2">{trip.category}</span>
        <h5 className="card-title">{trip.title}</h5>
        <p className="small text-muted mb-1">{trip.destination?.name} • {trip.destination?.location}</p>
        <p className="card-text">{trip.description}</p>
        <div className="d-flex justify-content-between align-items-center">
          <strong>₹{trip.price}</strong>
          <span className="small">{trip.availableSeats} seats</span>
        </div>
        <Link className="btn btn-primary w-100 mt-3" to={`/trips/${trip._id}`}>View Details</Link>
      </div>
    </div>
  );
}
