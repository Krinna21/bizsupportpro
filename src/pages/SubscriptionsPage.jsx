import React, { useEffect, useState } from "react";
import { fetchSubscriptions } from "../utils/thirdPartyApi";
import Preloader from "../components/Preloader/Preloader";
import "./SubscriptionsPage.css";

function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchSubscriptions()
      .then(setSubscriptions)
      .catch(() =>
        setError(
          "Sorry, something went wrong during the request. Please try again later."
        )
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Preloader />;
  if (error)   return <div className="subs-page__error">{error}</div>;
  if (!subscriptions.length)
    return <div className="subs-page__empty">Nothing found.</div>;

  const handleShowMore = () => setVisibleCount((prev) => prev + 4);

  return (
    <section className="subs-page" aria-label="Subscriptions">
      <h2 className="subs-page__title">Your Subscriptions</h2>

      <div className="subs-page__grid">
        {subscriptions.slice(0, visibleCount).map((sub) => (
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
            </div>
          </div>
        ))}
      </div>

      {visibleCount < subscriptions.length && (
        <button
          className="subs-page__showmore"
          onClick={handleShowMore}
          type="button"
        >
          Show More
        </button>
      )}
    </section>
  );
}

export default SubscriptionsPage;
