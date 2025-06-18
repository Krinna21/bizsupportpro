import React, { useState } from "react";
import Tickets from "../components/Tickets/Tickets";
import CreateTicketModal from "../components/CreateTicketModal/CreateTicketModal";
import "./TicketsPage.css";

function TicketsPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newTicket, setNewTicket] = useState(null);

  const handleAdd = (ticket) => {
    setNewTicket(ticket);
    setIsCreateOpen(false);
  };

  return (
    <section className="tickets-page">
      <div className="tickets-page__header">
        <h2 className="tickets-page__title">Your Support Tickets</h2>
        <button
          className="tickets-page__create"
          onClick={() => setIsCreateOpen(true)}
          type="button"
        >
          + New Ticket
        </button>
      </div>
      {isCreateOpen && (
        <CreateTicketModal
          onClose={() => setIsCreateOpen(false)}
          onAdd={handleAdd}
        />
      )}
      <Tickets newTicket={newTicket} />
    </section>
  );
}

export default TicketsPage;
