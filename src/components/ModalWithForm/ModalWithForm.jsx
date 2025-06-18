import React, { useEffect, useRef } from "react";
import "./ModalWithForm.css";

function ModalWithForm({ title, children, onClose }) {
  const modalRef = useRef(null);

  // Trap focus inside the modal for accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && modalRef.current) {
        const focusableEls = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstEl = focusableEls[0];
        const lastEl = focusableEls[focusableEls.length - 1];
        if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    // Focus first input on open
    const timer = setTimeout(() => {
      const input = modalRef.current?.querySelector("input, select, textarea, button");
      input?.focus();
    }, 10);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [onClose]);

  // Prevent closing on modal click, allow overlay click
  const handleOverlay = (e) => {
    if (e.target.classList.contains("modal")) {
      onClose();
    }
  };

  return (
    <div className="modal" onClick={handleOverlay} role="dialog" aria-modal="true" ref={modalRef}>
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
