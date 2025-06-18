import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import LoginModal from "./components/LoginModal/LoginModal";
import RegisterModal from "./components/RegisterModal/RegisterModal";
import TicketsPage from "./pages/TicketsPage";
import SubscriptionsPage from "./pages/SubscriptionsPage";
import AboutPage from "./pages/AboutPage";
import "./App.css";

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <Router>
      <div className="app">
        <Header
          onLoginClick={() => setIsLoginOpen(true)}
          onRegisterClick={() => setIsRegisterOpen(true)}
        />
        <Navigation />

        {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}
        {isRegisterOpen && (
          <RegisterModal onClose={() => setIsRegisterOpen(false)} />
        )}

        <main className="app__main">
          <Routes>
            <Route
              path="/"
              element={<Main onRegisterClick={() => setIsRegisterOpen(true)} />}
            />
            <Route path="/tickets" element={<TicketsPage />} />
            <Route path="/subscriptions" element={<SubscriptionsPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
