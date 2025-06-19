import React, { useEffect, useRef } from "react";
import "./ModalWithForm.css";

function ModalWithForm({ title, children, onClose, animate = false }) {
  const modalRef = useRef(null);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && modalRef.current) {
        const els = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = els[0], last = els[els.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        }
      }
    }
    document.addEventListener("keydown", onKeyDown);
    setTimeout(() => {
      modalRef.current?.querySelector("input, select, textarea, button")?.focus();
    }, 10);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const handleOverlay = (e) => {
    if (e.target.classList.contains("modal")) onClose();
  };

  return (
    <div
      className={`modal${animate ? " modal--animate" : ""}`}
      onClick={handleOverlay}
      role="dialog"
      aria-modal="true"
      ref={modalRef}
    >
      <div className="modal__container">
        <button className="modal__close" onClick={onClose} type="button" aria-label="Close modal">
          &times;
        </button>
        {title && <h2 className="modal__title">{title}</h2>}
        <div className="modal__content">{children}</div>
      </div>
    </div>
  );
}

export default ModalWithForm;
