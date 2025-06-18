import React, { useEffect, useState } from "react";
import Preloader from "../Preloader/Preloader";
import { getTickets, deleteTicket } from "../../utils/api";
import "./Tickets.css";

function Tickets({ newTicket }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getTickets()
      .then((data) => setTickets(data))
      .catch(() => setError("Failed to load tickets. Please refresh."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (newTicket) {
      setTickets((prev) => [newTicket, ...prev]);
    }
  }, [newTicket]);

  const handleDelete = (id) => {
    setDeleting(id);
    deleteTicket(id)
      .then(() => setTickets((prev) => prev.filter((t) => t.id !== id)))
      .catch(() => setError("Delete failed. Try again."))
      .finally(() => setDeleting(null));
  };

  if (loading) return <Preloader />;
  if (error) return <div className="tickets__error">{error}</div>;

  return (
    <section className="tickets">
      {tickets.length === 0 ? (
        <p className="tickets__empty">No tickets found.</p>
      ) : (
        <ul className="tickets__list">
          {tickets.map(({ id, title, description, status }) => (
            <li key={id} className="tickets__item">
              <div className="tickets__info">
                <h3 className="tickets__title">{title}</h3>
                <p className="tickets__desc">{description}</p>
                <span className={`tickets__status tickets__status--${status.replace(/\s/g, "-").toLowerCase()}`}>
                  Status: <strong>{status}</strong>
                </span>
              </div>
              <button
                className="tickets__delete"
                onClick={() => handleDelete(id)}
                type="button"
                disabled={deleting === id}
                aria-busy={deleting === id}
              >
                {deleting === id ? "Deleting..." : "Delete"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Tickets;
