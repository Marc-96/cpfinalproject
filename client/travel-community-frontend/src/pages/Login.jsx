
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <span className="eyebrow">WELCOME BACK</span>
        <h2>Sign in to TravelConnect</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={submit}>
          <label className="form-label">Email</label>
          <input className="form-control mb-3" type="email" required value={form.email} onChange={e => setForm({...form, email:e.target.value})} />
          <label className="form-label">Password</label>
          <input className="form-control mb-3" type="password" required value={form.password} onChange={e => setForm({...form, password:e.target.value})} />
          <button className="btn btn-primary w-100">Login</button>
        </form>
        <p className="mt-3 mb-0 text-muted">New traveler? <Link to="/register">Create an account</Link></p>
      </div>
    </div>
  );
}
