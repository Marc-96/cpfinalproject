import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
export default function DestinationDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    api.get(`/destination/${id}`).then(res => setItem(res.data));
  }, [id]);

  if (!item) return <main className="container py-5">Loading...</main>;

  return (
    <main className="container py-5">
      <div className="detail-card">
        <span className="badge text-bg-light">{item.category}</span>
        <h1 className="mt-3">{item.name}</h1>
        <p className="text-muted">{item.location}</p>
        <p className="lead">{item.description}</p>
        <p><strong>Best time:</strong> {item.bestTime || "Seasonal planning recommended"}</p>
        <Link className="btn btn-primary" to="/trips">Find trips to this destination</Link>
      </div>
    </main>
  );
}
