import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./CreateTicketModal.css";
import { createTicket } from "../../utils/api";

function CreateTicketModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ title: "", description: "", status: "Open" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      setError("Please enter both a title and description.");
      return;
    }
    createTicket(form)
      .then((newTicket) => {
        onAdd(newTicket);
        onClose();
      })
      .catch(() => setError("Could not create ticket. Try again."));
  };

  return (
    <ModalWithForm title="Create New Ticket" onClose={onClose}>
      <form className="create-ticket__form" onSubmit={handleSubmit} autoComplete="off">
        <input
          className="create-ticket__input"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          className="create-ticket__textarea"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          required
        />
        <select
          className="create-ticket__select"
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>
        {error && <span className="create-ticket__error">{error}</span>}
        <button className="create-ticket__btn" type="submit">
          Create Ticket
        </button>
      </form>
    </ModalWithForm>
  );
}

export default CreateTicketModal;
