import React, { useEffect, useState } from "react";
import Preloader from "../Preloader/Preloader";
import { getTickets, deleteTicket } from "../../utils/api";
import "./Tickets.css";

import krisAvatar from "../../assets/avatar-kris.svg";
import apatelAvatar from "../../assets/avatar-apatel.svg";
import wuAvatar from "../../assets/avatar-wu.svg";
import defaultAvatar from "../../assets/avatar-default.svg";

const fakeUsers = [
  { name: "Kris B.", avatar: krisAvatar },
  { name: "A. Patel", avatar: apatelAvatar },
  { name: "S. Wu", avatar: wuAvatar }
];

function getUserById(id) {
  return fakeUsers[id % fakeUsers.length];
}

const STATUS_COLORS = {
  "Open": "tickets__status--open",
  "In Progress": "tickets__status--progress",
  "Closed": "tickets__status--closed"
};

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
      setTickets((prev) => [{ ...newTicket, justAdded: true }, ...prev]);
      setTimeout(() => {
        setTickets(prev => prev.map(t => ({ ...t, justAdded: false })));
      }, 1100);
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

  if (tickets.length === 0) {
    return <p className="tickets__empty">No tickets found.</p>;
  }

  return (
    <section className="tickets__board" aria-label="Tickets Board">
      {tickets.map(({ id, title, description, status, justAdded }, i) => {
        const user = getUserById(id);
        return (
          <div
            key={id}
            className={`tickets__card${justAdded ? " tickets__card--new" : ""}`}
            tabIndex="0"
            aria-label={`Ticket: ${title}, status: ${status}`}
          >
            <div className="tickets__card-header">
              <div className="tickets__user">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="tickets__avatar"
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = defaultAvatar;
                  }}
                />
                <span className="tickets__username">{user.name}</span>
              </div>
              <span className={`tickets__status ${STATUS_COLORS[status]}`}>
                {status}
              </span>
            </div>
            <h3 className="tickets__title">{title}</h3>
            <p className="tickets__desc">{description}</p>
            <button
              className="tickets__delete"
              onClick={() => handleDelete(id)}
              disabled={deleting === id}
              aria-busy={deleting === id}
              aria-label={`Delete ticket "${title}"`}
            >
              <svg className="tickets__icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path fill="currentColor" d="M9 3V4H4V6H5V19C5 20.11 5.89 21 7 21H17C18.11 21 19 20.11 19 19V6H20V4H15V3H9ZM7 6V19H17V6H7Z"/>
              </svg>
              {deleting === id ? "Deleting..." : "Delete"}
            </button>
          </div>
        );
      })}
    </section>
  );
}

export default Tickets;
