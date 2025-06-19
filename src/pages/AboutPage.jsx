import React from "react";
import "./AboutPage.css";
import founderImg from "../assets/founder-photo.svg";

function AboutPage() {
  return (
    <section className="about">
      <div className="about__header">
        <h1 className="about__title">About BizSupportPro</h1>
        <p className="about__desc">
          BizSupportPro is on a mission to empower businesses with smarter support tools and transparent subscription tracking—built for teams who want speed, clarity, and control.
        </p>
      </div>
      <div className="about__team">
        <div className="about__member">
          <img
            src={founderImg}
            alt="Krinna Baskaran, founder of BizSupportPro"
            className="about__photo"
            loading="lazy"
          />
          <h3 className="about__name">Krinna Patel</h3>
          <p className="about__role">Founder & Product Lead</p>
          <p className="about__bio">
            My passion is building simple, beautiful software that solves real-world headaches for business owners. With years of experience in tech and service, she set out to make BizSupportPro the fastest, friendliest ticket system on the market.
          </p>
        </div>
      </div>
      <div className="about__values">
        <h2 className="about__subtitle">Our Core Values</h2>
        <ul className="about__values-list">
          <li> Customer-First Support</li>
          <li> Security & Privacy by Default</li>
          <li> Fast, Reliable, and Modern</li>
          <li> Simple, Delightful UX</li>
        </ul>
      </div>
    </section>
  );
}

export default AboutPage;
