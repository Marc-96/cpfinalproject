
import React from "react";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function Activity() {
  const [items, setItems] = useState([]);

  async function load() {
    const res = await api.get("/notification");
    setItems(res.data);
  }

  useEffect(() => { load(); }, []);

  async function read(id) {
    await api.put(`/notification/${id}/read`);
    load();
  }

  return (
    <main className="container py-5">
      <div className="section-heading">
        <span className="eyebrow">ACTIVITY</span>
        <h2>Notifications</h2>
      </div>
      {items.length === 0 ? <div className="empty-state">No notifications yet.</div> : items.map(item => (
        <div className={`list-card mb-3 ${item.read ? "" : "unread"}`} key={item._id}>
          <div className="d-flex justify-content-between gap-3">
            <div>
              <p className="mb-1">{item.message}</p>
              <span className="small text-muted">{new Date(item.createdAt).toLocaleString()}</span>
            </div>
            {!item.read && <button className="btn btn-sm btn-outline-primary" onClick={() => read(item._id)}>Mark read</button>}
          </div>
        </div>
      ))}
    </main>
  );
}
