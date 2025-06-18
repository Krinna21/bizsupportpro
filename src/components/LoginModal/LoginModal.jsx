import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";
import { authorize } from "../../utils/auth";

function LoginModal({ onClose }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authorize(form.email, form.password)
      .then((res) => {
        if (res?.token) {
          onClose();
        } else {
          setError("Invalid credentials. Please try again.");
        }
      })
      .catch(() => setError("Unable to login. Try again later."));
  };

  return (
    <ModalWithForm title="Login" onClose={onClose}>
      <form className="login-modal__form" onSubmit={handleSubmit} autoComplete="on">
        <input
          className="login-modal__input"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          autoFocus
        />
        <input
          className="login-modal__input"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        {error && <span className="login-modal__error">{error}</span>}
        <button className="login-modal__btn" type="submit">
          Login
        </button>
      </form>
    </ModalWithForm>
  );
}

export default LoginModal;
