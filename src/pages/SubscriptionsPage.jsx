import React, { useEffect, useState } from "react";
import { fetchSubscriptions } from "../utils/thirdPartyApi";
import Preloader from "../components/Preloader/Preloader";
import "./SubscriptionsPage.css";

function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchSubscriptions()
      .then((data) => setSubscriptions(data))
      .catch(() =>
        setError(
          "Sorry, something went wrong during the request. Please try again later."
        )
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Preloader />;
  if (error) return <div className="subs-page__error">{error}</div>;
  if (subscriptions.length === 0)
    return <div className="subs-page__empty">Nothing found.</div>;

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <section className="subs-page">
      <h2 className="subs-page__title">Available Subscriptions</h2>
      <ul className="subs-page__list">
        {subscriptions.slice(0, visibleCount).map((sub) => (
          <li key={sub.id} className="subs-page__item">
            <h3 className="subs-page__plan">{sub.name}</h3>
            <div className="subs-page__details">
              <span className="subs-page__price">{sub.price}</span>
              <span
                className={`subs-page__status subs-page__status--${sub.status}`}
              >
                {sub.status === "active" ? "Active" : "Inactive"}
              </span>
            </div>
          </li>
        ))}
      </ul>
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
