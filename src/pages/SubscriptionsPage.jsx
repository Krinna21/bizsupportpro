import React, { useEffect, useState } from "react";
import { fetchSubscriptions } from "../utils/thirdPartyApi";
import Preloader from "../components/Preloader/Preloader";
import "./SubscriptionsPage.css";

const FEATURE_MAP = {
  "Basic Plan": [
    "Ticket support",
    "Email notifications",
    "Basic analytics"
  ],
  "Pro Plan": [
    "All Basic features",
    "Priority support",
    "Team management",
    "Custom integrations"
  ],
  "Premium Plan": [
    "All Pro features",
    "Unlimited tickets",
    "Dedicated manager",
    "SLA 24h response"
  ],
  "Enterprise": [
    "All Premium features",
    "White label",
    "Advanced reporting",
    "Custom onboarding"
  ]
};

function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [startIdx, setStartIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchSubscriptions()
      .then((data) => {
        const withFeatures = data.map(sub => ({
          ...sub,
          features: FEATURE_MAP[sub.name] || []
        }));
        setSubscriptions(withFeatures);
      })
      .catch(() =>
        setError(
          "Sorry, something went wrong during the request. Please try again later."
        )
      )
      .finally(() => setLoading(false));
  }, []);

  const visibleCount = 3;
  const endIdx = startIdx + visibleCount;
  const canScrollLeft = startIdx > 0;
  const canScrollRight = endIdx < subscriptions.length;

  if (loading) return <Preloader />;
  if (error) return <div className="subs-page__error">{error}</div>;
  if (!subscriptions.length)
    return <div className="subs-page__empty">Nothing found.</div>;

  const handleLeft = () =>
    setStartIdx((idx) => Math.max(0, idx - 1));
  const handleRight = () =>
    setStartIdx((idx) => Math.min(subscriptions.length - visibleCount, idx + 1));

  return (
    <section className="subs-page" aria-label="Subscriptions">
      <h2 className="subs-page__title">Your Subscriptions</h2>
      <div className="subs-page__carousel-controls">
        <button
          className="subs-page__carousel-arrow"
          onClick={handleLeft}
          disabled={!canScrollLeft}
          aria-label="Previous plans"
        >
          &#8592;
        </button>
        <div className="subs-page__carousel-view">
          {subscriptions.slice(startIdx, endIdx).map((sub) => (
            <div
              key={sub.id}
              className="subs-page__card"
              tabIndex="0"
              aria-label={`Plan: ${sub.name}, ${sub.status}`}
            >
              <header className="subs-page__card-header">
                <span className="subs-page__plan-name">{sub.name}</span>
              </header>
              <div className="subs-page__card-body">
                <span className="subs-page__plan-price">{sub.price}</span>
                <span
                  className={`subs-page__status subs-page__status--${sub.status}`}
                >
                  {sub.status === "active" ? "Active" : "Inactive"}
                </span>
                <ul className="subs-page__feature-list">
                  {sub.features.map((feature, idx) => (
                    <li key={idx} className="subs-page__feature-item">
                      <span className="subs-page__check">&#10003;</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <button
          className="subs-page__carousel-arrow"
          onClick={handleRight}
          disabled={!canScrollRight}
          aria-label="Next plans"
        >
          &#8594;
        </button>
      </div>
    </section>
  );
}

export default SubscriptionsPage;
