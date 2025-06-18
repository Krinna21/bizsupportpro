import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";
import { register } from "../../utils/auth";

function RegisterModal({ onClose }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(form.name, form.email, form.password)
      .then((res) => {
        if (res?.data) {
          onClose();
        } else {
          setError("Registration failed. Please try again.");
        }
      })
      .catch(() => setError("Unable to register. Try again later."));
  };

  return (
    <ModalWithForm title="Register" onClose={onClose}>
      <form className="register-modal__form" onSubmit={handleSubmit} autoComplete="on">
        <input
          className="register-modal__input"
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className="register-modal__input"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className="register-modal__input"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        {error && <span className="register-modal__error">{error}</span>}
        <button className="register-modal__btn" type="submit">
          Register
        </button>
      </form>
    </ModalWithForm>
  );
}

export default RegisterModal;
