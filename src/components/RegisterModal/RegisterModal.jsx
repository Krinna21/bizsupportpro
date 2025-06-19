import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";
import { register } from "../../utils/auth";

function RegisterModal({ onClose, onSwitch }) {
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
        if (res?.data) onClose();
        else setError("Registration failed. Please try again.");
      })
      .catch(() => setError("Unable to register. Try again later."));
  };

  return (
    <ModalWithForm title="Sign up for BizSupportPro" onClose={onClose} animate>
      <form className="register-modal__form" onSubmit={handleSubmit} autoComplete="on">
        <label className="register-modal__label">
          Full Name
          <input
            className="register-modal__input"
            type="text"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
        <label className="register-modal__label">
          Email
          <input
            className="register-modal__input"
            type="email"
            name="email"
            placeholder="you@email.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <label className="register-modal__label">
          Password
          <input
            className="register-modal__input"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>
        {error && <div className="register-modal__error">{error}</div>}
        <button className="register-modal__btn" type="submit">Sign Up</button>
        <div className="register-modal__switch-row">
          <span className="register-modal__switch-text">or</span>
          <button
            type="button"
            className="register-modal__switch-btn"
            onClick={onSwitch}
            tabIndex="0"
          >
            Log in
          </button>
        </div>
      </form>
    </ModalWithForm>
  );
}

export default RegisterModal;
