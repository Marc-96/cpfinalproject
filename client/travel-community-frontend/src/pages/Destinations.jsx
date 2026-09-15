import React from "react";
import { useEffect, useState } from "react";
import api from "../services/api";
import DestinationCard from "../components/DestinationCard";

export default function Destinations() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("/destination").then(res => setItems(res.data));
  }, []);

  const filtered = items.filter(item =>
    `${item.name} ${item.location} ${item.category}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="container py-5">
      <div className="section-heading">
        <span className="eyebrow">DESTINATIONS</span>
        <h2>Explore places worth visiting</h2>
      </div>
      <input className="form-control mb-4" placeholder="Search destinations..." value={search} onChange={e => setSearch(e.target.value)} />
      {filtered.length === 0 ? <div className="empty-state">No destinations found.</div> : (
        <div className="row g-4">
          {filtered.map(item => <div className="col-md-6 col-lg-4" key={item._id}><DestinationCard destination={item} /></div>)}
        </div>
      )}
    </main>
  );
}
