import { useEffect, useState } from "react";
import api from "../services/api";

const blank = { title:"", destination:"", description:"", startDate:"", endDate:"", price:"", availableSeats:10, category:"Beach" };

export default function ManageTrip() {
  const [items, setItems] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState(null);

  async function load() {
    const [t, d] = await Promise.all([api.get("/trip"), api.get("/destination")]);
    setItems(t.data); setDestinations(d.data);
  }
  useEffect(() => { load(); }, []);

  async function submit(e) {
    e.preventDefault();
    if (editing) await api.put(`/trip/${editing}`, form);
    else await api.post("/trip", form);
    setForm(blank); setEditing(null); load();
  }

  function edit(item) {
    setEditing(item._id);
    setForm({
      title:item.title, destination:item.destination?._id || item.destination,
      description:item.description,
      startDate:item.startDate.slice(0,10), endDate:item.endDate.slice(0,10),
      price:item.price, availableSeats:item.availableSeats, category:item.category
    });
  }

  async function remove(id) {
    if (window.confirm("Delete this trip?")) { await api.delete(`/trip/${id}`); load(); }
  }

  return (
    <main className="container py-5">
      <div className="section-heading"><span className="eyebrow">TRIP CRUD</span><h2>Manage trips</h2></div>
      <div className="row g-4">
        <div className="col-lg-5">
          <div className="form-card">
            <form onSubmit={submit}>
              <input className="form-control mb-3" placeholder="Trip title" required value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/>
              <select className="form-select mb-3" required value={form.destination} onChange={e=>setForm({...form,destination:e.target.value})}>
                <option value="">Select destination</option>
                {destinations.map(d=><option value={d._id} key={d._id}>{d.name}</option>)}
              </select>
              <textarea className="form-control mb-3" rows="3" placeholder="Description" required value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
              <div className="row">
                <div className="col-6"><input className="form-control mb-3" type="date" required value={form.startDate} onChange={e=>setForm({...form,startDate:e.target.value})}/></div>
                <div className="col-6"><input className="form-control mb-3" type="date" required value={form.endDate} onChange={e=>setForm({...form,endDate:e.target.value})}/></div>
              </div>
              <input className="form-control mb-3" type="number" min="0" placeholder="Price" required value={form.price} onChange={e=>setForm({...form,price:e.target.value})}/>
              <input className="form-control mb-3" type="number" min="1" placeholder="Available seats" required value={form.availableSeats} onChange={e=>setForm({...form,availableSeats:e.target.value})}/>
              <select className="form-select mb-3" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
                {["Beach","Mountain","Adventure","Historical","Wildlife","Cultural"].map(x=><option key={x}>{x}</option>)}
              </select>
              <button className="btn btn-primary">{editing ? "Update" : "Add"} Trip</button>
              {editing && <button type="button" className="btn btn-outline-secondary ms-2" onClick={()=>{setEditing(null);setForm(blank)}}>Cancel</button>}
            </form>
          </div>
        </div>
        <div className="col-lg-7">
          {items.map(item=>(
            <div className="list-card mb-3" key={item._id}>
              <div className="d-flex justify-content-between">
                <div><h5>{item.title}</h5><p className="small text-muted">{item.destination?.name} • {item.category}</p></div>
                <div><button className="btn btn-sm btn-outline-primary me-2" onClick={()=>edit(item)}>Edit</button><button className="btn btn-sm btn-outline-danger" onClick={()=>remove(item._id)}>Delete</button></div>
              </div>
              <p className="mb-0">₹{item.price} • {item.availableSeats} seats • {new Date(item.startDate).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
