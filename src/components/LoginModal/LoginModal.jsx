import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";
import { authorize } from "../../utils/auth";

function LoginModal({ onClose, onSwitch }) {
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
        if (res?.token) onClose();
        else setError("Invalid credentials.");
      })
      .catch(() => setError("Unable to login. Try again later."));
  };

  return (
    <ModalWithForm title="Log in to BizSupportPro" onClose={onClose} animate>
      <form className="login-modal__form" onSubmit={handleSubmit} autoComplete="on">
        <label className="login-modal__label">
          Email
          <input
            className="login-modal__input"
            type="email"
            name="email"
            placeholder="you@email.com"
            value={form.email}
            onChange={handleChange}
            required
            autoFocus
          />
        </label>
        <label className="login-modal__label">
          Password
          <input
            className="login-modal__input"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>
        {error && <div className="login-modal__error">{error}</div>}
        <button className="login-modal__btn" type="submit">Log In</button>
        <div className="login-modal__switch-row">
          <span className="login-modal__switch-text">or</span>
          <button
            type="button"
            className="login-modal__switch-btn"
            onClick={onSwitch}
            tabIndex="0"
          >
            Sign up
          </button>
        </div>
      </form>
    </ModalWithForm>
  );
}

export default LoginModal;
