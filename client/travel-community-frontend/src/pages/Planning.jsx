import React, { useState, useEffect } from "react";
import api from "../services/api";

const initial = { destination: "", startDate: "", endDate: "", travelers: 1, budget: 0, notes: "" };

export default function Planning() {
  const [form, setForm] = useState(initial);
  const [destinations, setDestinations] = useState([]);
  const [plans, setPlans] = useState([]);
  const [message, setMessage] = useState("");

  async function load() {
    const [d, p] = await Promise.all([api.get("/destination"), api.get("/tripplanning")]);
    setDestinations(d.data);
    setPlans(p.data);
  }

  useEffect(() => { load(); }, []);

  async function submit(e) {
    e.preventDefault();
    setMessage("");
    try {
      await api.post("/tripplanning", form);
      setForm(initial);
      setMessage("Trip plan saved.");
      load();
    } catch (err) {
      setMessage(err.response?.data?.message || "Could not save plan");
    }
  }

  return (
    <main className="container py-5">
      <div className="section-heading">
        <span className="eyebrow">TRIP PLANNING</span>
        <h2>Build your personal travel plan</h2>
      </div>
      {message && <div className="alert alert-info">{message}</div>}
      <div className="row g-4">
        <div className="col-lg-5">
          <div className="form-card">
            <form onSubmit={submit}>
              <label className="form-label">Destination</label>
              <select className="form-select mb-3" required value={form.destination} onChange={e => setForm({...form, destination:e.target.value})}>
                <option value="">Select</option>
                {destinations.map(d => <option value={d._id} key={d._id}>{d.name}</option>)}
              </select>
              <div className="row">
                <div className="col-6"><label className="form-label">Start</label><input className="form-control mb-3" type="date" required value={form.startDate} onChange={e=>setForm({...form,startDate:e.target.value})}/></div>
                <div className="col-6"><label className="form-label">End</label><input className="form-control mb-3" type="date" required value={form.endDate} onChange={e=>setForm({...form,endDate:e.target.value})}/></div>
              </div>
              <label className="form-label">Travelers</label>
              <input className="form-control mb-3" type="number" min="1" value={form.travelers} onChange={e=>setForm({...form,travelers:e.target.value})}/>
              <label className="form-label">Budget</label>
              <input className="form-control mb-3" type="number" min="0" value={form.budget} onChange={e=>setForm({...form,budget:e.target.value})}/>
              <label className="form-label">Notes</label>
              <textarea className="form-control mb-3" rows="3" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})}/>
              <button className="btn btn-primary w-100">Save Plan</button>
            </form>
          </div>
        </div>
        <div className="col-lg-7">
          {plans.length === 0 ? <div className="empty-state">No saved plans yet.</div> : plans.map(plan => (
            <div className="list-card mb-3" key={plan._id}>
              <div className="d-flex justify-content-between">
                <h5>{plan.destination?.name}</h5>
                <span className="badge text-bg-light">₹{plan.budget}</span>
              </div>
              <p className="small text-muted">{new Date(plan.startDate).toLocaleDateString()} – {new Date(plan.endDate).toLocaleDateString()}</p>
              <p className="mb-0">{plan.notes || "No additional notes."}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
