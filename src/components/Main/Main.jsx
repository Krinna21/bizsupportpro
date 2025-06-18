import React from "react";
import "./Main.css";

import heroImg from "../../assets/hero-image.svg";
import featureTickets from "../../assets/feature-tickets.svg";
import featureSubscriptions from "../../assets/feature-subscriptions.svg";
import featureSecurity from "../../assets/feature-security.svg";
import featureModern from "../../assets/feature-modern.svg";
import step1 from "../../assets/step-1.svg";
import step2 from "../../assets/step-2.svg";
import step3 from "../../assets/step-3.svg";
import step4 from "../../assets/step-4.svg";

function Main({ onRegisterClick }) {
  return (
    <main className="main">
      <section className="main__hero">
        <div className="main__hero-content">
          <h1 className="main__title" tabIndex="0">
            Run Your Business <span className="main__highlight">Smarter</span>
          </h1>
          <p className="main__subtitle">
            The ultimate ticketing & subscription hub for modern teams.
          </p>
          <button
            className="main__cta"
            onClick={onRegisterClick}
            type="button"
            aria-label="Sign up for BizSupportPro"
          >
            Get Started Free
          </button>
        </div>
        <img
          src={heroImg}
          alt="Team collaborating at laptops"
          className="main__hero-img"
          loading="lazy"
        />
      </section>

      <section className="main__features">
        <h2 className="main__visually-hidden">Features</h2>
        <ul className="main__features-list" aria-label="Key Features">
          <li className="main__feature-card" tabIndex="0">
            <img
              src={featureTickets}
              alt="Ticket management illustration"
              className="main__feature-icon"
              loading="lazy"
            />
            <h3 className="main__feature-title">Ticket Management</h3>
            <p>Create, track, and resolve support issues easily.</p>
          </li>
          <li className="main__feature-card" tabIndex="0">
            <img
              src={featureSubscriptions}
              alt="Subscription viewer illustration"
              className="main__feature-icon"
              loading="lazy"
            />
            <h3 className="main__feature-title">Subscription Viewer</h3>
            <p>See your latest subscription status in real time.</p>
          </li>
          <li className="main__feature-card" tabIndex="0">
            <img
              src={featureSecurity}
              alt="Security illustration"
              className="main__feature-icon"
              loading="lazy"
            />
            <h3 className="main__feature-title">Secure Login</h3>
            <p>Protect client data and restrict access safely.</p>
          </li>
          <li className="main__feature-card" tabIndex="0">
            <img
              src={featureModern}
              alt="Modern UI illustration"
              className="main__feature-icon"
              loading="lazy"
            />
            <h3 className="main__feature-title">Modern UX</h3>
            <p>Fast, responsive, and visually stunning design.</p>
          </li>
        </ul>
      </section>

      <section className="main__how">
        <h2 className="main__how-title">How It Works</h2>
        <ul className="main__how-steps" aria-label="How BizSupportPro works">
          <li className="main__how-step">
            <img src={step1} alt="Sign up" className="main__how-icon" />
            <span className="main__how-caption">1. Register an account</span>
          </li>
          <li className="main__how-step">
            <img src={step2} alt="Submit tickets" className="main__how-icon" />
            <span className="main__how-caption">2. Submit or manage tickets</span>
          </li>
          <li className="main__how-step">
            <img src={step3} alt="Track progress" className="main__how-icon" />
            <span className="main__how-caption">3. Track progress/status</span>
          </li>
          <li className="main__how-step">
            <img src={step4} alt="Monitor subscriptions" className="main__how-icon" />
            <span className="main__how-caption">4. Monitor subscriptions</span>
          </li>
        </ul>
      </section>

      <section className="main__cta-section">
        <h3 className="main__cta-heading">Start managing support now</h3>
        <button
          className="main__cta main__cta--section"
          onClick={onRegisterClick}
          type="button"
          aria-label="Sign up free"
        >
          Sign Up Free
        </button>
      </section>
    </main>
  );
}

export default Main;
