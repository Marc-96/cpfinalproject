import React from "react";
import { useEffect, useState } from "react";
import api from "../services/api";

const blank = { name:"", location:"", description:"", category:"Beach", bestTime:"", image:"" };

export default function ManageDestination() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState("");

  async function load() { const res = await api.get("/destination"); setItems(res.data); }
  useEffect(() => { load(); }, []);

  async function submit(e) {
    e.preventDefault();
    if (editing) await api.put(`/destination/${editing}`, form);
    else await api.post("/destination", form);
    setForm(blank); setEditing(null); setMessage("Saved successfully."); load();
  }

  function edit(item) {
    setEditing(item._id);
    setForm({
      name:item.name, location:item.location, description:item.description,
      category:item.category, bestTime:item.bestTime || "", image:item.image || ""
    });
  }

  async function remove(id) {
    if (window.confirm("Delete this destination?")) { await api.delete(`/destination/${id}`); load(); }
  }

  return (
    <main className="container py-5">
      <div className="section-heading"><span className="eyebrow">DESTINATION CRUD</span><h2>Manage destinations</h2></div>
      {message && <div className="alert alert-success">{message}</div>}
      <div className="row g-4">
        <div className="col-lg-5">
          <div className="form-card">
            <form onSubmit={submit}>
              <input className="form-control mb-3" placeholder="Name" required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
              <input className="form-control mb-3" placeholder="Location" required value={form.location} onChange={e=>setForm({...form,location:e.target.value})}/>
              <select className="form-select mb-3" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
                {["Beach","Mountain","Adventure","Historical","Wildlife","Cultural"].map(x=><option key={x}>{x}</option>)}
              </select>
              <input className="form-control mb-3" placeholder="Best time" value={form.bestTime} onChange={e=>setForm({...form,bestTime:e.target.value})}/>
              <textarea className="form-control mb-3" placeholder="Description" rows="4" required value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
              <button className="btn btn-primary me-2">{editing ? "Update" : "Add"} Destination</button>
              {editing && <button type="button" className="btn btn-outline-secondary" onClick={()=>{setEditing(null);setForm(blank)}}>Cancel</button>}
            </form>
          </div>
        </div>
        <div className="col-lg-7">
          {items.map(item => (
            <div className="list-card mb-3" key={item._id}>
              <div className="d-flex justify-content-between align-items-start">
                <div><h5>{item.name}</h5><p className="small text-muted">{item.location} • {item.category}</p></div>
                <div><button className="btn btn-sm btn-outline-primary me-2" onClick={()=>edit(item)}>Edit</button><button className="btn btn-sm btn-outline-danger" onClick={()=>remove(item._id)}>Delete</button></div>
              </div>
              <p className="mb-0">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
