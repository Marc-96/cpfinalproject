import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

export default function TripDetails() {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [trip, setTrip] = useState(null);
  const [seats, setSeats] = useState(1);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get(`/trip/${id}`).then(res => setTrip(res.data));
  }, [id]);

  async function book() {
    setMessage("");
    try {
      await api.post("/booking", { trip: id, seats: Number(seats) });
      setMessage("Booking request created successfully.");
      const refreshed = await api.get(`/trip/${id}`);
      setTrip(refreshed.data);
    } catch (err) {
      setMessage(err.response?.data?.message || "Booking failed");
    }
  }

  if (!trip) return <main className="container py-5">Loading...</main>;

  return (
    <main className="container py-5">
      <div className="detail-card">
        <span className="badge text-bg-light">{trip.category}</span>
        <h1 className="mt-3">{trip.title}</h1>
        <p className="text-muted">{trip.destination?.name} • {trip.destination?.location}</p>
        <p>{trip.description}</p>
        <div className="row g-3 my-3">
          <div className="col-md-3"><div className="mini-stat"><span>Price</span><strong>₹{trip.price}</strong></div></div>
          <div className="col-md-3"><div className="mini-stat"><span>Seats</span><strong>{trip.availableSeats}</strong></div></div>
          <div className="col-md-3"><div className="mini-stat"><span>From</span><strong>{new Date(trip.startDate).toLocaleDateString()}</strong></div></div>
          <div className="col-md-3"><div className="mini-stat"><span>To</span><strong>{new Date(trip.endDate).toLocaleDateString()}</strong></div></div>
        </div>

        {user?.role === "traveler" ? (
          <div className="booking-box mt-4">
            <h5>Book this trip</h5>
            {message && <div className="alert alert-info">{message}</div>}
            <div className="input-group mb-3" style={{maxWidth: 240}}>
              <span className="input-group-text">Seats</span>
              <input className="form-control" type="number" min="1" max={trip.availableSeats} value={seats} onChange={e => setSeats(e.target.value)} />
            </div>
            <button className="btn btn-primary" disabled={trip.availableSeats < 1} onClick={book}>Create Booking</button>
          </div>
        ) : !user ? (
          <Link to="/login" className="btn btn-primary mt-3">Login to book</Link>
        ) : (
          <div className="alert alert-secondary mt-4">Only traveler accounts can book trips.</div>
        )}
      </div>
    </main>
  );
}
