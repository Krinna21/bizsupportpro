import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./CreateTicketModal.css";
import { createTicket } from "../../utils/api";

const initialForm = {
  title: "",
  description: "",
  status: "Open",
  type: "Bug",
  priority: "Medium",
  tags: "",
  due: "",
};

function CreateTicketModal({ onClose, onAdd }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = "Title is required.";
    if (!form.description.trim()) errs.description = "Description is required.";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSubmitError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    const ticketToCreate = {
      ...form,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      created: new Date().toISOString().split("T")[0],
      comments: 0,
    };
    createTicket(ticketToCreate)
      .then((newTicket) => {
        onAdd(newTicket);
        onClose();
      })
      .catch(() => setSubmitError("Could not create ticket. Try again."));
  };

  return (
    <ModalWithForm title="Create New Ticket" onClose={onClose}>
      <form className="create-ticket__form" onSubmit={handleSubmit} autoComplete="off">
        <input
          className={"create-ticket__input" + (errors.title ? " create-ticket__input--error" : "")}
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />
        {errors.title && <span className="create-ticket__error">{errors.title}</span>}

        <textarea
          className={"create-ticket__textarea" + (errors.description ? " create-ticket__input--error" : "")}
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows={4}
        />
        {errors.description && <span className="create-ticket__error">{errors.description}</span>}

        <div style={{ display: 'flex', gap: '0.7rem' }}>
          <select
            className="create-ticket__select"
            name="status"
            value={form.status}
            onChange={handleChange}
            style={{ flex: 1 }}
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
          <select
            className="create-ticket__select"
            name="type"
            value={form.type}
            onChange={handleChange}
            style={{ flex: 1 }}
          >
            <option value="Bug">Bug</option>
            <option value="Feature">Feature</option>
            <option value="Task">Task</option>
            <option value="Question">Question</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '0.7rem' }}>
          <select
            className="create-ticket__select"
            name="priority"
            value={form.priority}
            onChange={handleChange}
            style={{ flex: 1 }}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <input
            className="create-ticket__input"
            name="due"
            type="date"
            value={form.due}
            onChange={handleChange}
            style={{ flex: 1 }}
            min={new Date().toISOString().split('T')[0]}
            placeholder="Due Date"
          />
        </div>

        <input
          className="create-ticket__input"
          name="tags"
          placeholder="Tags (comma separated, e.g. urgent, billing)"
          value={form.tags}
          onChange={handleChange}
        />

        {submitError && <span className="create-ticket__error">{submitError}</span>}
        <button className="create-ticket__btn" type="submit">
          Create Ticket
        </button>
      </form>
    </ModalWithForm>
  );
}

export default CreateTicketModal;
