import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const [form, setForm] = useState({
    name: "", email: "", password: "", role: "traveler", location: "", bio: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function update(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card auth-wide">
        <span className="eyebrow">JOIN THE COMMUNITY</span>
        <h2>Create your profile</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={submit}>
          <div className="row">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input className="form-control mb-3" name="name" required value={form.name} onChange={update} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input className="form-control mb-3" type="email" name="email" required value={form.email} onChange={update} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input className="form-control mb-3" type="password" minLength="6" name="password" required value={form.password} onChange={update} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Role</label>
              <select className="form-select mb-3" name="role" value={form.role} onChange={update}>
                <option value="traveler">Traveler</option>
                <option value="agent">Agent</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Location</label>
              <input className="form-control mb-3" name="location" value={form.location} onChange={update} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Bio</label>
              <input className="form-control mb-3" name="bio" value={form.bio} onChange={update} />
            </div>
          </div>
          <button className="btn btn-primary w-100">Create Account</button>
        </form>
      </div>
    </div>
  );
}
