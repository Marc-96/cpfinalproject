import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark app-navbar sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">TravelConnect</Link>
        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/destinations">Destinations</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/trips">Trips</Link></li>
            {user && <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>}
            {user?.role === "traveler" && <li className="nav-item"><Link className="nav-link" to="/planning">Plan Trip</Link></li>}
            {user && <li className="nav-item"><Link className="nav-link" to="/bookings">Bookings</Link></li>}
            {user && <li className="nav-item"><Link className="nav-link" to="/activity">Activity</Link></li>}
            {user?.role === "agent" || user?.role === "admin" ? (
              <li className="nav-item"><Link className="nav-link" to="/admin">Manage</Link></li>
            ) : null}
            {!user ? (
              <>
                <li className="nav-item"><Link className="btn btn-light btn-sm px-3" to="/login">Login</Link></li>
                <li className="nav-item"><Link className="btn btn-outline-light btn-sm px-3" to="/register">Register</Link></li>
              </>
            ) : (
              <li className="nav-item">
                <button className="btn btn-outline-light btn-sm" onClick={logout}>
                  Logout ({user.name})
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
